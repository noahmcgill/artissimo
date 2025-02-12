import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserService } from "../services/user";
import { throwIfNotOwnedResource } from "@/lib/utils/api/auth";

const userService = new UserService();

export const userRouter = createTRPCRouter({
    getByEmail: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .mutation(async ({ input }) => {
            await throwIfNotOwnedResource(input.email);

            return await userService.getByEmail(input.email);
        }),
});
