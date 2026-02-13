import { defineCollection, z } from "astro:content";

const sourceLinkSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  source: z.enum(["official", "community", "video"]),
  note: z.string().optional(),
});

const guides = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    dutyType: z.enum(["ultimate", "savage", "extreme"]),
    patch: z.string().min(1),
    encounter: z.string().min(1),
    itemLevel: z.number().int().positive().optional(),
    summary: z.string().min(40).max(260),
    tags: z.array(z.string().min(1)).min(1),
    lastVerifiedAt: z
      .string()
      .refine((value) => !Number.isNaN(Date.parse(value)), "lastVerifiedAt must be a valid date"),
    status: z.enum(["published", "draft", "archived"]),
    coverImage: z.string().optional(),
    sources: z.array(sourceLinkSchema).min(1),
    videos: z.array(z.string().url()).optional(),
  }),
});

export const collections = {
  guides,
};
