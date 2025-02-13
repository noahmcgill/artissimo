import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserService } from "../services/user";
import { throwIfNotAdmin, throwIfNotOwnedResource } from "@/lib/utils/api/auth";
import { UserRole } from "@prisma/client";

const userService = new UserService();

export const userRouter = createTRPCRouter({
    getByEmail: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .mutation(async ({ input }) => {
            await throwIfNotOwnedResource(input.email);

            return await userService.getByEmail(input.email);
        }),

    beginInvitationProcessing: publicProcedure
        .input(
            z.object({
                emails: z.array(z.string()),
                courseId: z.string().uuid(),
                role: z.nativeEnum(UserRole),
            }),
        )
        .mutation(async ({ input }) => {
            await throwIfNotAdmin();

            return await userService.beginInvitationProcessing(
                input.emails,
                input.courseId,
                input.role,
            );
        }),

    // @leftoff: if not batch requester, return forbidden?
    getBatchInvitationStatus: publicProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ input }) => {
            await throwIfNotAdmin();

            return await userService.getBatchInvitationStatus(input.id);
        }),
});
