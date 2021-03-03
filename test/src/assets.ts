/* eslint-disable @typescript-eslint/naming-convention */

export const assets = {
  images: {
    "constructor/btn-close-up.png": require("../assets/images/constructor/btn-close-up.png")
      .default,
    "constructor/btn-retry-up.png": require("../assets/images/constructor/btn-retry-up.png")
      .default,
    "constructor/hand.png": require("../assets/images/constructor/hand.png")
      .default,
    "bg-tile.png": require("../assets/images/bg-tile.png").default,
    "icon.png": require("../assets/images/icon.png").default,
    "road-tile.png": require("../assets/images/road-tile.png").default,
    "tree-01.png": require("../assets/images/tree-01.png").default,
    "tree-02.png": require("../assets/images/tree-02.png").default,
    "tree-03.png": require("../assets/images/tree-03.png").default,
    "vignette.png": require("../assets/images/vignette.png").default,
  },
  images_localized: {
    "retry.png": {
      en: require("../assets/images_localized/retry.png/en.png").default,
      ru: require("../assets/images_localized/retry.png/ru.png").default,
    },
    "subtitle.png": {
      en: require("../assets/images_localized/subtitle.png/en.png").default,
      ru: require("../assets/images_localized/subtitle.png/ru.png").default,
    },
    "title.png": {
      en: require("../assets/images_localized/title.png/en.png").default,
      ru: require("../assets/images_localized/title.png/ru.png").default,
    },
  },
  particles: { confetti: require("../assets/particles/confetti.json") },
  sounds: {
    lose: require("../assets/sounds/lose.mp3").default,
    tap: require("../assets/sounds/tap.mp3").default,
    theme: require("../assets/sounds/theme.mp3").default,
    win: require("../assets/sounds/win.mp3").default,
  },
  spines: {},
  atlases: {},
};

export const Images = {
  "constructor/btn-close-up": "constructor/btn-close-up.png",
  "constructor/btn-retry-up": "constructor/btn-retry-up.png",
  "constructor/hand": "constructor/hand.png",
  "bg-tile": "bg-tile.png",
  icon: "icon.png",
  "road-tile": "road-tile.png",
  "tree-01": "tree-01.png",
  "tree-02": "tree-02.png",
  "tree-03": "tree-03.png",
  vignette: "vignette.png",
  retry: "retry.png",
  subtitle: "subtitle.png",
  title: "title.png",
};

export const Sounds = { lose: "lose", tap: "tap", theme: "theme", win: "win" };

export const Particles = { confetti: assets.particles["confetti"] };

export const Spines = {};
