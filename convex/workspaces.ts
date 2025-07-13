import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    owner: v.string(),
  },
  handler: async (ctx, args) => {
    const { name, owner } = args;

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), owner))
      .collect();

    if (!user) {
      throw new Error("User not found");
    }
    name;

    return await ctx.db.insert("workspaces", {
      name,
      owner: user[0]._id,
      isActive: true,
    });
  },
});

export const getActiveWorkspace = query({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkUserId))
      .collect();

    if (!user) {
      throw new Error("User not found");
    }

    const workspace = await ctx.db
      .query("workspaces")
      .filter(
        (q) =>
          q.eq(q.field("owner"), user[0]._id) && q.eq(q.field("isActive"), true)
      )
      .collect();

    return workspace[0];
  },
});

export const getWorkspaces = query({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkUserId))
      .collect();

    if (!user) {
      throw new Error("User not found");
    }

    const workspaces = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("owner"), user[0]._id))
      .collect();

    return workspaces;
  },
});
