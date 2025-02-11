import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserService } from "../services/user";

const userService = new UserService();

export const userRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return userService.create();
        }),
});
