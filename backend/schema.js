import zod from "zod"

export const genarateNewShortUrlSchema = zod.object({
    url: zod.string(),
})

export const idInputSchema = zod.object({
    id: zod.string(),
})
