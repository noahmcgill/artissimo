import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { throwIfNotAdmin } from "@/lib/utils/api/auth";
import { CourseService } from "../services/course";
import { TRPCError } from "@trpc/server";
import { TRPCErrorCode } from "@/lib/constants";

const courseService = new CourseService();

export const courseRouter = createTRPCRouter({
    adminGetCourses: publicProcedure.mutation(async () => {
        await throwIfNotAdmin();

        try {
            return await courseService.adminGetCourses();
        } catch (e) {
            console.error(e);
            throw new TRPCError({
                code: TRPCErrorCode.NOT_FOUND,
                message: "There was an error retrieving the course",
            });
        }
    }),
});
