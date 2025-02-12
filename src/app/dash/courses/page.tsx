import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

export default async function CoursesPage() {
    return (
        <div className="flex w-full flex-col">
            <div className="pb-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dash">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Courses</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex w-full flex-row items-center justify-between gap-4 pb-4">
                <div>
                    <h1 className="text-3xl font-bold">Courses</h1>
                </div>
                <div>
                    <Button asChild>
                        <Link href="/dash/courses/new">
                            <LuPlus className="h-4 w-4" />
                            New Course
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
