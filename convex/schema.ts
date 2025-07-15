import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    avatar: v.optional(v.string()),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  workspaces: defineTable({
    name: v.string(),
    owner: v.id("users"),
    isActive: v.boolean(),
  }),
  design: defineTable({
    title: v.string(),
    createdBy: v.id("users"),
    data: v.any(),
    workspace: v.id("workspaces"),
    width: v.number(),
    height: v.number()
  }),
});
