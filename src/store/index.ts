import { type Course } from "@prisma/client";
import { atom } from "jotai";

export const coursesAtom = atom<Course[]>([]);
