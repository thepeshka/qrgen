export const grayscaleVal = (colorHex) => {
  colorHex = colorHex.slice(1);
  const [r, g, b] = colorHex.match(/.{1,2}/g).map(c => parseInt(c, 16));
  return (r + g + b) / 3;
}

export const qrReadabilityLevel = (color0, color1) =>
  Math.abs(grayscaleVal(color0) - grayscaleVal(color1)) / 2.55;

export const warningTagColor = (level) => ["red", "volcano", "orange", "gold", "lime", "green"][Math.round(5 * (level / 100))];
