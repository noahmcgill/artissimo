import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { throwIfNotAdmin } from "@/lib/utils/api/auth";
import { CourseService } from "../services/course";

const courseService = new CourseService();

export const courseRouter = createTRPCRouter({
    getByEmail: publicProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ input }) => {
            await throwIfNotAdmin();

            return await courseService.getCourseById(input.id);
        }),
});
