import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { InviteUsersDialog } from "@/components/users/invite-users-dialog";
import { api } from "@/trpc/server";

// @todo: only allow access to this page to admins
export default async function UsersPage() {
    const courses = await api.course.adminGetCourses();

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
                            <BreadcrumbPage>Users</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex w-full flex-row items-center justify-between gap-4 pb-4">
                <div>
                    <h1 className="text-3xl font-bold">Users</h1>
                </div>
                <div>
                    <InviteUsersDialog ssrCourses={courses} />
                </div>
            </div>
        </div>
    );
}
