// Cutting a solid background off a generated image.
//
// This exists to make sprite art usable. Libby's wardrobe (and any character
// portrait laid over the app) needs a transparent PNG, but a diffusion model will
// only ever hand back an opaque rectangle. Generating against a flat backdrop and
// removing it afterwards is the practical route — no segmentation model to install,
// nothing to run on the generator box, and it works on any image the server serves.
//
// It is deliberately a *solid* background remover, not a subject matte. It flood
// fills inward from the edges and stops at anything that is not the backdrop, so it
// keeps holes it never reached — the gap under an arm stays opaque unless it touches
// the border. That is the right trade for this job: it can never eat the subject,
// which is the failure that would matter.

/** How far a pixel may drift from the backdrop colour and still count as backdrop. */
export interface CutoutOptions {
  /** 0–160ish. Squared-distance threshold is derived from this. */
  tolerance: number;
}

/** Straight RGB distance. Good enough against a flat backdrop, and cheap per pixel. */
function distance(data: Uint8ClampedArray, at: number, r: number, g: number, b: number): number {
  const dr = data[at] - r, dg = data[at + 1] - g, db = data[at + 2] - b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * The backdrop colour, averaged over the four corners.
 *
 * Corners rather than a histogram: on a portrait the subject is centred and the
 * corners are the pixels most reliably *not* it. Averaging four of them rides out a
 * little noise or a gentle vignette without needing a real mode.
 */
function backdropColor(data: Uint8ClampedArray, width: number, height: number): [number, number, number] {
  const corners = [
    0,
    (width - 1) * 4,
    (height - 1) * width * 4,
    ((height - 1) * width + (width - 1)) * 4,
  ];
  let r = 0, g = 0, b = 0;
  for (const at of corners) { r += data[at]; g += data[at + 1]; b += data[at + 2]; }
  return [r / 4, g / 4, b / 4];
}

/**
 * Returns a canvas holding the image with its solid background made transparent.
 *
 * The image must be same-origin (everything here is served by OppaiLib itself), or
 * the canvas is tainted and cannot be read back.
 */
export function cutOutBackground(image: HTMLImageElement, options: CutoutOptions): HTMLCanvasElement {
  const width = image.naturalWidth, height = image.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return canvas;
  context.drawImage(image, 0, 0);

  const frame = context.getImageData(0, 0, width, height);
  const data = frame.data;
  const [keyR, keyG, keyB] = backdropColor(data, width, height);
  const tolerance = Math.max(1, options.tolerance);
  // Anything within `tolerance` is background outright; the band above it fades out,
  // which is what keeps the anti-aliased rim of the subject from turning into a hard
  // jagged edge or a halo of backdrop-coloured pixels.
  const feather = tolerance * 0.75;

  // Iterative flood fill over an explicit stack. A recursive one blows the call
  // stack on anything above a thumbnail — a 1024×1024 backdrop is a million pixels.
  const seen = new Uint8Array(width * height);
  const stack: number[] = [];
  for (let x = 0; x < width; x++) {
    stack.push(x, x + (height - 1) * width);
  }
  for (let y = 0; y < height; y++) {
    stack.push(y * width, width - 1 + y * width);
  }

  while (stack.length) {
    const pixel = stack.pop() as number;
    if (seen[pixel]) continue;
    if (distance(data, pixel * 4, keyR, keyG, keyB) > tolerance) continue;
    seen[pixel] = 1;
    const x = pixel % width, y = (pixel - x) / width;
    if (x > 0) stack.push(pixel - 1);
    if (x < width - 1) stack.push(pixel + 1);
    if (y > 0) stack.push(pixel - width);
    if (y < height - 1) stack.push(pixel + width);
  }

  for (let pixel = 0; pixel < seen.length; pixel++) {
    const at = pixel * 4;
    if (seen[pixel]) { data[at + 3] = 0; continue; }
    // Soften only where the cut actually runs. A pixel deep inside the subject can
    // happen to sit near the backdrop colour — white skin against white — and must
    // keep its alpha, so proximity to a removed pixel is what qualifies it.
    const x = pixel % width, y = (pixel - x) / width;
    const touchesCut =
      (x > 0 && seen[pixel - 1]) || (x < width - 1 && seen[pixel + 1]) ||
      (y > 0 && seen[pixel - width]) || (y < height - 1 && seen[pixel + width]);
    if (!touchesCut) continue;
    const drift = distance(data, at, keyR, keyG, keyB) - tolerance;
    data[at + 3] = Math.max(0, Math.min(255, Math.round((drift / feather) * 255)));
  }

  context.putImageData(frame, 0, 0);
  return canvas;
}

/** Loads a same-origin image and waits for it to decode. */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Couldn't load that image."));
    image.src = url;
  });
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Couldn't encode the PNG.")), "image/png");
  });
}
