import { TRPCErrorCode } from "@/lib/constants";
import { db } from "@/server/db";
import { type Course } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export class CourseService {
    static instance: CourseService | null = null;

    constructor() {
        if (!CourseService.instance) {
            CourseService.instance = this;
        }
        return CourseService.instance;
    }

    // @todo: make sure the user has access to the course
    async getCourseById(id: string): Promise<Course> {
        const course = await db.course.findUnique({
            where: { id },
        });

        if (!course) {
            throw new TRPCError({
                code: TRPCErrorCode.NOT_FOUND,
                message: "The requested course was not found",
            });
        }

        return course;
    }
}
