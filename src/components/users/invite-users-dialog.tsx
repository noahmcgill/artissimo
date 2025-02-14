"use client";

import { LuPlus } from "react-icons/lu";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { InfoTooltip } from "../info-tooltip";
import { ArtissimoSelect } from "../inputs/select";
import { UserRole, type Course } from "@prisma/client";
import { useHydrateAtoms } from "jotai/utils";
import { coursesAtom } from "@/store";
import { useAtomValue } from "jotai";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { invite } from "@/app/dash/users/actions";
import { useToast } from "@/hooks/use-toast";

const roles = [
    {
        label: "Guest",
        value: "GUEST",
    },
    {
        label: "Student",
        value: "STUDENT",
    },
    {
        label: "Instructor",
        value: "INSTRUCTOR",
    },
    {
        label: "Admin",
        value: "ADMIN",
    },
];

interface InviteUsersDialogProps {
    ssrCourses: Course[];
}

export const InviteUsersDialog: React.FC<InviteUsersDialogProps> = ({
    ssrCourses,
}) => {
    useHydrateAtoms([[coursesAtom, ssrCourses]]);

    const [placeholder, setPlaceholder] = useState<string>("");
    const [controlledValue, setControlledValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const courses = useAtomValue(coursesAtom);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        const { error } = await invite(formData);
        if (error) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive",
            });
        }
        setIsLoading(false);
    };

    useEffect(() => {
        setPlaceholder("email.one@example.com \nemail.two@example.com");
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">
                    <LuPlus className="h-4 w-4" />
                    Invite Users
                </Button>
            </DialogTrigger>
            <DialogContent
                onFocusCapture={(e) => {
                    e.stopPropagation();
                }}
            >
                <DialogHeader>
                    <DialogTitle>Let&apos;s add some users!</DialogTitle>
                    <DialogDescription>
                        You can invite one or more users by email.
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-0">
                            <Label htmlFor="emails">Email addresses</Label>
                            <InfoTooltip content="Add an email address for each user you wish to invite. Place each address on a new line." />
                        </div>
                        <Textarea
                            id="emails"
                            name="emails"
                            placeholder={placeholder}
                            required
                        />
                    </div>
                    <div className="flex w-[260px] flex-col gap-2">
                        <ArtissimoSelect
                            name="role"
                            label="Role"
                            items={roles}
                            placeholder="Select role"
                            info="Select the role invited users will be added as."
                            onValueChange={setControlledValue}
                        />
                        {controlledValue !== UserRole.ADMIN && (
                            <ArtissimoSelect
                                name="courseId"
                                label="Course"
                                items={courses.map((course) => {
                                    return {
                                        label: course.title,
                                        value: course.id,
                                    };
                                })}
                                placeholder="Select course"
                                info="Select the course invited users will be given access to."
                            />
                        )}
                    </div>
                    {controlledValue === UserRole.ADMIN && (
                        <Alert variant="warning">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Proceed with Caution!</AlertTitle>
                            <AlertDescription>
                                Selecting the <b>ADMIN</b> role gives a user
                                full access to the system, including destructive
                                actions like deleting and editing books,
                                chapters, and other users.
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="mt-4 flex w-full justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            variant="primary"
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading && <Loader2 className="animate-spin" />}
                            Invite
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
