import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserService } from "../services/user";

const userService = new UserService();

export const userRouter = createTRPCRouter({
    getByEmail: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .mutation(async ({ input }) => {
            return userService.getByEmail(input.email);
        }),
});
