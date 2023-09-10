import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  profile: defineTable({
    userId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    imageUrl: v.optional(v.string()),
    email: v.string(),
  }),
  link: defineTable({
    userId: v.string(),
    platform: v.string(),
    url: v.string(),
  }),
});
