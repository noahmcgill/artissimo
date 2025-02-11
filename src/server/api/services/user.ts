import { db } from "@/server/db";

export class UserService {
    async getByEmail(email: string) {
        return await db.user.findUnique({
            where: { email },
        });
    }
}
