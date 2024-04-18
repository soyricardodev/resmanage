import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { categories, images, menuItems } from "~/server/db/schema";
import { menuId } from "~/utils/validators";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const categoriesRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(categories).values({
        name: input.name,
      });
    }),

  getAll: protectedProcedure.input(menuId).query(({ ctx, input }) => {
    return ctx.db
      .select({
        name: categories.name,
        imageUrl: images.url,
        position: categories.position,
        menuId: categories.menuId,
        menuItem: menuItems.name,
        price: menuItems.price,
      })
      .from(categories)
      .where(eq(categories.menuId, input.menuId))
      .leftJoin(menuItems, eq(menuItems.categoryId, categories.id))
      .rightJoin(images, eq(images.id, menuItems.imageId));
  }),
});
