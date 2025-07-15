import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createDesign = mutation({
  args: {
    title: v.string(),
    workspace: v.id("workspaces"),
    data: v.any(),
    createdBy: v.string(),
    height: v.number(),
    width: v.number(),
  },
  handler: async (ctx, args) => {
    const { title, workspace, data, createdBy, height, width } = args;

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), createdBy))
      .collect();

    if (!user) {
      throw new Error("User not found");
    }

    return await ctx.db.insert("design", {
      title,
      workspace,
      data,
      createdBy: user[0]._id,
      height,
      width,
    });
  },
});
