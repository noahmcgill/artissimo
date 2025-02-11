import { TRPCErrorCode } from "@/lib/constants";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";

export class UserService {
    async getByEmail(email: string) {
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new TRPCError({
                // If no user is found, something has gone wrong on our end
                code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
                message: "The requested user was not found",
            });
        }

        return user;
    }
}
