import "source-map-support/register"
import "dotenv/config"

import { getFreeGames } from "./get-free-games"
import { formatDataIntoEmbeds } from "./formatter"
import { sendEmbeds } from "./send-embeds"

async function main() {
  const data = await getFreeGames()
  const embeds = await formatDataIntoEmbeds(data)
  await sendEmbeds(embeds)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
