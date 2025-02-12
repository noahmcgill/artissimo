"use client";

import { LuPlus } from "react-icons/lu";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { InfoTooltip } from "../info-tooltip";
import { ArtissimoSelect } from "../inputs/select";

const dummyCourses = [
    {
        label: "MUSC-598",
        value: "musc-598",
    },
    {
        label: "MUSC-590",
        value: "musc-590",
    },
];

const roles = [
    {
        label: "Guest",
        value: "guest",
    },
    {
        label: "Student",
        value: "student",
    },
    {
        label: "Instructor",
        value: "instructor",
    },
    {
        label: "Admin",
        value: "admin",
    },
];

export const InviteUsersDialog = () => {
    const [placeholder, setPlaceholder] = useState<string>("");
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
                    <DialogTitle>Let's add some users!</DialogTitle>
                    <DialogDescription>
                        You can invite one or more users by email.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
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
                            label="Role"
                            items={roles}
                            placeholder="Select role"
                            info="Select the role invited users will be added as."
                        />
                        <ArtissimoSelect
                            label="Course"
                            items={dummyCourses}
                            placeholder="Select course"
                            info="Select the course invited users will be given access to."
                        />
                    </div>
                </div>
                <DialogFooter className="justify-end">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="primary">Invite</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
