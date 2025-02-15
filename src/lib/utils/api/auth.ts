import { TRPCError } from "@trpc/server";
import { createClient } from "../supabase/server";
import { TRPCErrorCode } from "@/lib/constants";
import { UserService } from "@/server/api/services/user";
import { UserRole } from "@prisma/client";

// Throws if the user is trying to modify a resource they are not the owner of
export const throwIfNotOwnedResource = async (email: string, jwt?: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser(jwt);
    if (error) {
        throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }

    if (data.user.email !== email) {
        throw new TRPCError({
            code: TRPCErrorCode.FORBIDDEN,
            message:
                "The authorized user does not have permission to access this resource",
        });
    }
};

// Throws if the authenticated user's role is not ADMIN
export const throwIfNotAdmin = async () => {
    const supabase = await createClient();
    const userService = new UserService();

    const { data, error } = await supabase.auth.getUser();
    if (error) {
        if (error.code === "user_not_found") {
            throw new TRPCError({
                code: TRPCErrorCode.NOT_FOUND,
                message: error.message,
            });
        }

        throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }

    const metadata = await userService.getByEmail(data.user.email ?? "");
    if (!metadata) {
        throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message:
                "An unexpected error occurred while attemping to verify the user's admin status",
        });
    }

    if (metadata?.role !== UserRole.ADMIN) {
        throw new TRPCError({
            code: TRPCErrorCode.FORBIDDEN,
            message:
                "The authorized user does not have permission to access this resource",
        });
    }
};
