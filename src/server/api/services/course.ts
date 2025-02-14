import { db } from "@/server/db";
import { type Course } from "@prisma/client";

export class CourseService {
    static instance: CourseService | null = null;

    constructor() {
        if (!CourseService.instance) {
            CourseService.instance = this;
        }
        return CourseService.instance;
    }

    // Retrieves all courses
    async adminGetCourses(): Promise<Course[]> {
        return await db.course.findMany();
    }
}
