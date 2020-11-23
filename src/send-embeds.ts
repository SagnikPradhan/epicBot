import fetch from "node-fetch"
import { EmbedOptions } from "eris"

export async function sendEmbeds(embeds: EmbedOptions[]) {
  const webhookURL = process.env.WEBHOOK_URL

  if (typeof webhookURL !== "string") throw new Error("Invalid WEBHOOK_URL")

  await fetch(webhookURL, {
    method: "POST",
    body: JSON.stringify({ embeds }),
    headers: { "Content-Type": "application/json" },
  })
}
