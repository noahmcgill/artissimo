import { type UserRole } from "@prisma/client";

export interface ArtissimoUser {
    email: string;
    role: UserRole;
    name: string;
}

export interface ArtissimoUserMetadata {
    name: string;
    role: UserRole;
}
