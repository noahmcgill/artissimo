import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserService } from "../services/user";
import { verifyAuth } from "@/lib/utils/api/auth";

const userService = new UserService();

export const userRouter = createTRPCRouter({
    getByEmail: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .mutation(async ({ input }) => {
            await verifyAuth(input.email);

            return userService.getByEmail(input.email);
        }),
});
