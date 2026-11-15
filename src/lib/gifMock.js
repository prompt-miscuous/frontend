// Manifiesto simulado para búsquedas sin datos conectados todavía:
// DemoPage lo detecta por `mockGif` y muestra el GIF de épocas de SPHEREx.
const GIF_EPOCHS = [
  { obs_id: '2025W28_2A_0582_4', mjd: 60869.72 },
  { obs_id: '2026W08_2A_0229_2', mjd: 61091.69 },
  { obs_id: '2026W29_1A_0416_1', mjd: 61236.18 },
];

export function buildGifMockManifest({ ra, dec, size, band }) {
  const px = Math.round((size * 3600) / 6.15);
  const detector = Number(band.slice(1));
  return {
    simulated: true,
    mockGif: true,
    params: { ra, dec, size, band, frames: GIF_EPOCHS.length },
    grid: {
      crs: 'north-up',
      pixel_scale_arcsec: 6.15,
      width: px,
      height: px,
    },
    epochs_available: GIF_EPOCHS.length,
    frames: GIF_EPOCHS.map(({ obs_id, mjd }) => ({
      obs_id,
      mjd,
      date_obs: new Date((mjd - 40587) * 86400000).toISOString().slice(0, 19),
      detector,
      png_url: null,
      width: px,
      height: px,
      warning: null,
    })),
    warnings: [],
  };
}
