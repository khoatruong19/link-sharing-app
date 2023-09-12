import { query, action, internalMutation, mutation } from './_generated/server';
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

export const updateProfile = mutation({
  args: {
    userId: v.string(),
    profileId: v.id('profile'),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const { profileId, userId, ...rest } = args;
    const existingProfile = await ctx.db.get(profileId);

    if (!existingProfile) throw new Error('Profile not found');

    if (existingProfile.userId !== userId)
      throw new Error('Not authenticated!');

    await ctx.db.patch(profileId, rest);
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

export const generateUploadImageUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const savedImageToProfile = mutation({
  args: {
    userId: v.string(),
    profileId: v.id('profile'),
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const { profileId, userId, storageId } = args;
    const existingProfile = await ctx.db.get(profileId);

    if (!existingProfile) throw new Error('Profile not found');

    if (existingProfile.userId !== userId)
      throw new Error('Not authenticated!');

    await ctx.db.patch(profileId, {
      imageUrl: (await ctx.storage.getUrl(storageId)) ?? '',
    });
  },
});
