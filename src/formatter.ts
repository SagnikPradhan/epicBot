import fetch from "node-fetch"
import Vibrant from "@livechart/sharp-vibrant"
import { differenceInDays } from "date-fns"

import { FreeGames } from "./get-free-games"
import { EmbedOptions } from "eris"

export async function formatDataIntoEmbeds(freeGames: FreeGames) {
  const embeds: EmbedOptions[] = []

  for (const game of freeGames) {
    const {
      title,
      productSlug,
      keyImages: [image],
      promotions,
      price: {
        totalPrice: { fmtPrice: price },
      },
    } = game

    const embed: EmbedOptions = {
      title,
      url: `https://www.epicgames.com/store/en-US/product/${productSlug}`,
      fields: [
        {
          name: "Original Price",
          value: price.originalPrice,
          inline: true,
        },
        {
          name: "Discount Price",
          value: price.discountPrice,
          inline: true,
        },
      ],
      image: image,
      color: image && (await getColor(image.url)),
    }

    const offer = Object.values(promotions)
      .flat()
      .flatMap(({ promotionalOffers }) => promotionalOffers)[0]

    if (offer) {
      embed.footer = { text: "Offer ends on" }
      embed.timestamp = offer.startDate

      const startDateAndTodaysDifferent = differenceInDays(
        Date.now(),
        new Date(offer.startDate)
      )

      if (startDateAndTodaysDifferent < 0)
        embed.description = "Offer already started! Hurry up!"
      else
        embed.description = `Offer starts in ${startDateAndTodaysDifferent} days!`
    }

    embeds.push(embed)
  }

  return embeds
}

async function getColor(url: string) {
  const imageRespose = await fetch(url)
  const buffer = await imageRespose.buffer()
  const { palette } = await Vibrant.from(buffer).getPalette()
  const color = palette.Vibrant!.hex
  const javascriptNotationColor = `0x${color.slice(1)}`
  return Number(javascriptNotationColor)
}
