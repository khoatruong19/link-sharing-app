import { v } from 'convex/values';
import { internal } from './_generated/api';
import { action, internalMutation, query } from './_generated/server';

export const saveLinks = action({
  args: {
    userId: v.string(),
    links: v.array(
      v.object({
        platform: v.string(),
        url: v.string(),
      })
    ),
    updateLinks: v.array(
      v.object({
        platform: v.string(),
        url: v.string(),
        _id: v.id('link'),
      })
    ),
    deleteLinksId: v.array(v.id('link')),
  },
  handler: async (ctx, args) => {
    const { userId, links, updateLinks, deleteLinksId } = args;

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Unauthenticated!');
    }

    await Promise.all(
      deleteLinksId.map((linkId) =>
        ctx.runMutation(internal.link.deleteLink, { linkId })
      )
    );

    await Promise.all(
      updateLinks.map((link) =>
        ctx.runMutation(internal.link.updateLink, {
          linkId: link._id,
          platform: link.platform,
          url: link.url,
        })
      )
    );

    await Promise.all(
      links.map((link) =>
        ctx.runMutation(internal.link.addLink, { userId, ...link })
      )
    );
  },
});

export const getLinksByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('link')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .collect();
  },
});

export const addLink = internalMutation({
  args: {
    userId: v.string(),
    platform: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const existingLinkWithSamePlatform = await ctx.db
      .query('link')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .filter((q) => q.eq(q.field('platform'), args.platform))
      .first();

    if (existingLinkWithSamePlatform) {
      await ctx.db.patch(existingLinkWithSamePlatform._id, {
        url: args.url,
      });

      return;
    }

    await ctx.db.insert('link', args);
  },
});

export const updateLink = internalMutation({
  args: {
    linkId: v.id('link'),
    platform: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const { linkId, ...rest } = args;
    await ctx.db.patch(linkId, rest);
  },
});

export const deleteLink = internalMutation({
  args: {
    linkId: v.id('link'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.linkId);
  },
});
