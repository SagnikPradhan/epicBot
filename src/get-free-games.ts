import fetch from "node-fetch"
import { FreeGamesDateSchema } from "./free-games-data-schema"

const FREE_GAMES_ENDPOINT =
  "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions"

type Awaited<T> = T extends PromiseLike<infer U> ? U : T
export type FreeGames = Awaited<ReturnType<typeof getFreeGames>>

export async function getFreeGames() {
  const freeGames = await requestAPIFreeGames()
  return FreeGamesDateSchema.parseAsync(freeGames)
}

async function requestAPIFreeGames(): Promise<unknown> {
  const freeGamesResponse = await fetch(FREE_GAMES_ENDPOINT)
  const freeGamesJSONBody = await freeGamesResponse.json()
  const freeGames = freeGamesJSONBody?.data?.Catalog?.searchStore?.elements
  return freeGames
}
