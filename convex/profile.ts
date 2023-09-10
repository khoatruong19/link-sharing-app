import {
  internalQuery,
  internalAction,
  query,
  action,
  internalMutation,
} from './_generated/server';
import { api, internal } from './_generated/api';
import { v } from 'convex/values';

export const checkProfileExist = action({
  args: {
    userId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId, ...rest } = args;

    const existingProfile = await ctx.runQuery(api.profile.getProfileByUserId, {
      userId,
    });

    if (existingProfile) return;

    await ctx.scheduler.runAfter(0, internal.profile.createProfile, args);
  },
});

export const getProfileByUserId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query('profile')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .first();

    return profile;
  },
});

export const createProfile = internalMutation({
  args: {
    userId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('profile', args);
  },
});
