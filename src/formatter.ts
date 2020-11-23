import { FreeGames } from "./get-free-games"
import { EmbedOptions } from "eris"

export function formatDataIntoEmbeds(freeGames: FreeGames) {
  const embeds: EmbedOptions[] = []

  for (const game of freeGames) {
    const { title, description, keyImages: images, promotions } = game
    const offers = Object.values(promotions)
      .flat()
      .flatMap(({ promotionalOffers }) => promotionalOffers)

    const embed: EmbedOptions = {
      title,
      description,
      image: images[0],
      timestamp: offers[0]?.endDate,
      footer: { text: "Ends on" },
    }

    embeds.push(embed)
  }

  return embeds
}
