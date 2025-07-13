import { v } from "convex/values";
import { mutation } from "./_generated/server";

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

    return await ctx.db.insert("workspaces", {
      name,
      owner: user[0]._id,
    });
  },
});
