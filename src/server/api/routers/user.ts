import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserService } from "../services/user";
import { throwIfNotAdmin, throwIfNotOwnedResource } from "@/lib/utils/api/auth";
import { UserRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { TRPCErrorCode } from "@/lib/constants";

const userService = new UserService();

export const userRouter = createTRPCRouter({
    getByEmail: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .mutation(async ({ input }) => {
            await throwIfNotOwnedResource(input.email);

            try {
                const user = await userService.getByEmail(input.email);
                if (!user) {
                    throw new TRPCError({
                        // If no user is found, something has gone wrong on our end
                        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
                        message: "The requested user was not found",
                    });
                }

                return user;
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
                    message:
                        "There was an unexpected error retrieving the user",
                });
            }
        }),

    createBatchInvitationRequest: publicProcedure
        .input(
            z.object({
                emails: z.array(z.string()),
                role: z.nativeEnum(UserRole),
                courseId: z.string().uuid().optional(),
            }),
        )
        .mutation(async ({ input }) => {
            await throwIfNotAdmin();

            if (input.role !== UserRole.ADMIN && !input.courseId) {
                throw new TRPCError({
                    code: TRPCErrorCode.BAD_REQUEST,
                    message:
                        "A courseId must be given if the given role is not ADMIN",
                });
            }

            try {
                return await userService.createBatchInvitationRequest(
                    input.emails,
                    input.role,
                    input.courseId,
                );
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
                    message: "There was an unexpected error creating the batch",
                });
            }
        }),

    // @leftoff: if not batch requester, return forbidden?
    getBatchInvitationRequestStatus: publicProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ input }) => {
            await throwIfNotAdmin();

            try {
                const batch = await userService.getBatchInvitationRequestStatus(
                    input.id,
                );

                if (!batch) {
                    throw new TRPCError({
                        code: TRPCErrorCode.NOT_FOUND,
                        message: "The requested batch was not found",
                    });
                }

                return batch;
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
                    message:
                        "There was an unexpected error retrieving the batch",
                });
            }
        }),
});
