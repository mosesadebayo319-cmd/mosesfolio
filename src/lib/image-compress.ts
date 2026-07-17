/**
 * Client-side image compression via canvas.
 * Shrinks large uploads so they fit DB / network limits.
 */
export async function compressImageFile(
  file: File,
  opts?: { maxWidth?: number; maxHeight?: number; quality?: number; maxBytes?: number }
): Promise<string> {
  const maxWidth = opts?.maxWidth ?? 1400
  const maxHeight = opts?.maxHeight ?? 1400
  const quality = opts?.quality ?? 0.78
  const maxBytes = opts?.maxBytes ?? 900_000

  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file.')
  }

  const bitmap = await createImageBitmap(file)
  let { width, height } = bitmap

  const scale = Math.min(1, maxWidth / width, maxHeight / height)
  width = Math.round(width * scale)
  height = Math.round(height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    throw new Error('Could not process image in this browser.')
  }
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  let q = quality
  let dataUrl = canvas.toDataURL('image/jpeg', q)

  // Reduce quality until under maxBytes (approx base64 length)
  while (dataUrl.length > maxBytes * 1.37 && q > 0.4) {
    q -= 0.08
    dataUrl = canvas.toDataURL('image/jpeg', q)
  }

  if (dataUrl.length > 2_000_000) {
    throw new Error(
      'Image is still too large after compression. Try a smaller photo.'
    )
  }

  return dataUrl
}
