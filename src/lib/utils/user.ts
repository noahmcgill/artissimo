import { cookies } from "next/headers";
import { auth } from "./supabase/server";
import { USER_METADATA_COOKIES_KEY } from "../constants";
import { type ArtissimoUserMetadata, type ArtissimoUser } from "../types/user";

export const server_getUserWithMetadata = async (): Promise<ArtissimoUser> => {
    const cookieStore = await cookies();

    const { data, error } = await auth.getUser();
    const metadataStr = cookieStore.get(USER_METADATA_COOKIES_KEY);
    const metadata = JSON.parse(
        metadataStr?.value ?? "",
    ) as ArtissimoUserMetadata;

    if (error) {
        throw new Error(error.message);
    }

    return {
        email: data.user.email ?? "",
        role: metadata.role ?? "",
        name: metadata.name ?? "",
    };
};
