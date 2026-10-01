type ToneDefinition = {
  // read by jev to match the typed tone
  description: string
  // base and accent
  colors: readonly [string, string]
}

export const TONES = {
  horror: {
    description:
      "horror, fear, dread, slashers, monsters, ghosts, gore, scary nights",
    colors: ["#323242", "#D24D6E"],
  },
  noir: {
    description: "crime, thrillers, heists, detectives, mafia, noir, suspense",
    colors: ["#323242", "#F7C600"],
  },
  romance: {
    description: "love, romance, date night, romcoms, heartbreak, valentine",
    colors: ["#D24D6E", "#FC96FF"],
  },
  comedy: {
    description: "comedy, laughs, silly, feel-good, sitcoms, stand-up",
    colors: ["#F7C600", "#FF7F4B"],
  },
  family: {
    description: "kids, family night, animation, cartoons, pixar, disney",
    colors: ["#FF9E00", "#5B94FF"],
  },
  scifi: {
    description: "science fiction, space, aliens, future, robots, cyberpunk",
    colors: ["#0B2A12", "#C6F26B"],
  },
  dystopia: {
    description:
      "dystopia, post-apocalyptic, wasteland, totalitarian, surveillance, end of the world",
    colors: ["#6B6B78", "#ED7005"],
  },
  fantasy: {
    description: "fantasy, magic, dragons, fairy tales, myths, wizards",
    colors: ["#71387D", "#C96FDD"],
  },
  action: {
    description:
      "action, explosions, superheroes, adventure, war, martial arts",
    colors: ["#ED7005", "#2C6FCF"],
  },
  melancholy: {
    description: "sad, tearjerkers, grief, slow drama, rainy day, lonely",
    colors: ["#3D1E44", "#9882FF"],
  },
  nature: {
    description: "nature, animals, wildlife, outdoors, hiking, earth",
    colors: ["#7A4E2D", "#91CB89"],
  },
  documentary: {
    description:
      "documentaries, true stories, true crime, history, investigative, real events",
    colors: ["#6B6B78", "#C8C8D0"],
  },
  spring: {
    description: "spring, blossoms, fresh starts, first warm days, april, may",
    colors: ["#91CB89", "#FC96FF"],
  },
  springBreak: {
    description:
      "spring break, college trips, party week, wild getaways with friends",
    colors: ["#35B0A6", "#FF7F4B"],
  },
  summer: {
    description:
      "summer, summer holidays, summer break, beach, vacation, travel, sunshine, road trips",
    colors: ["#F7C600", "#90B6FF"],
  },
  autumn: {
    description: "autumn, fall, falling leaves, harvest, october, rainy season",
    colors: ["#ED7005", "#F7C600"],
  },
  winter: {
    description: "winter, snow, cold nights, ice, skiing, winter break",
    colors: ["#90B6FF", "#C8C8D0"],
  },
  cozy: {
    description: "cozy, comfort, sunday afternoon, blankets, tea",
    colors: ["#71387D", "#F7B175"],
  },
  christmas: {
    description: "christmas, xmas, advent, santa, festive, christmas holidays",
    colors: ["#09974C", "#D24D6E"],
  },
  newYear: {
    description:
      "new year's eve, new year, silvester, countdown, fireworks, midnight party",
    colors: ["#2C6FCF", "#F7C600"],
  },
  easter: {
    description: "easter, easter holidays, easter bunny, easter eggs",
    colors: ["#9882FF", "#F7C600"],
  },
  thanksgiving: {
    description: "thanksgiving, gratitude, family feast, turkey",
    colors: ["#FF7F4B", "#1B5034"],
  },
  halloween: {
    description: "halloween, spooky season, pumpkins, witches",
    colors: ["#FF9E00", "#3D1E44"],
  },
  chill: {
    description: "chill, relaxing, background watching, calm, lazy evening",
    colors: ["#35B0A6", "#91CB89"],
  },
  weird: {
    description:
      "weird, trippy, cult classics, arthouse, surreal, mind-bending",
    colors: ["#C96FDD", "#F7C600"],
  },
  retro: {
    description:
      "80s, 90s, retro, nostalgia, neon, synthwave, childhood classics",
    colors: ["#FC96FF", "#5B94FF"],
  },
  music: {
    description: "music, musicals, concerts, dance, bands",
    colors: ["#9882FF", "#FC96FF"],
  },
  neutral: {
    description:
      "no clear mood, a person or place name, generic list, to-do, misc",
    colors: ["#2C6FCF", "#90B6FF"],
  },
} as const satisfies Record<string, ToneDefinition>

export type Tone = keyof typeof TONES

export type ToneSuggestion = {
  tone: Tone
  colors: readonly [string, string]
  probability: number
}
