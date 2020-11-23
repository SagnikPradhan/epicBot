import * as z from "zod"

export const FreeGamesDateSchema = z.array(
  z
    .object({
      title: z.string(),
      id: z.string(),
      description: z.string(),

      keyImages: z.array(
        z
          .object({
            type: z.string(),
            url: z.string(),
          })
          .nonstrict()
      ),

      price: z
        .object({
          totalPrice: z
            .object({
              fmtPrice: z
                .object({
                  originalPrice: z.string(),
                  discountPrice: z.string(),
                })
                .nonstrict(),
            })
            .nonstrict(),
        })
        .nonstrict(),

      promotions: z.record(
        z.array(
          z
            .object({
              promotionalOffers: z.array(
                z
                  .object({
                    startDate: z.string(),
                    endDate: z.string(),
                  })
                  .nonstrict()
              ),
            })
            .nonstrict()
        )
      ),
    })
    .nonstrict()
)
