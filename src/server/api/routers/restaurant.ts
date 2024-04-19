import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { restaurants } from "~/server/db/schema";
import { id, restaurantId, restaurantInput } from "~/utils/validators";
import { and, eq } from "drizzle-orm";

export const restaurantRouter = createTRPCRouter({
  createRestaurant: protectedProcedure
    .input(restaurantInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(restaurants).values({
        name: input.name,
        userId: ctx.userId,
        location: input.location,
        email: input.email,
        phone: input.phone,
        isPublished: input.isPublished,
      });
    }),

  getMyRestaurants: protectedProcedure.input(id).query(async ({ ctx }) => {
    return await ctx.db
      .select({
        name: restaurants.name,
        userId: restaurants.userId,
        location: restaurants.location,
        email: restaurants.email,
        phone: restaurants.phone,
        isPublished: restaurants.isPublished,
        description: restaurants.description,
      })
      .from(restaurants)
      .where(eq(restaurants.userId, ctx.userId));
  }),

  getRestaurant: publicProcedure
    .input(restaurantId)
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({
          id: restaurants.id,
          name: restaurants.name,
          userId: restaurants.userId,
          location: restaurants.location,
          email: restaurants.email,
          phone: restaurants.phone,
          isPublished: restaurants.isPublished,
          description: restaurants.description,
        })
        .from(restaurants)
        .where(and(eq(restaurants.id, input.restaurantId)));
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        id: restaurants.id,
        name: restaurants.name,
        userId: restaurants.userId,
        location: restaurants.location,
        email: restaurants.email,
        phone: restaurants.phone,
        isPublished: restaurants.isPublished,
        description: restaurants.description,
      })
      .from(restaurants);
  }),
});
