import { TRPCError } from "@trpc/server";
import { createClient } from "../supabase/server";
import { TRPCErrorCode } from "@/lib/constants";

// Throws if the user is trying to modify a resource they are not the owner of
export const throwIfNotOwnedResource = async (email: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
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
