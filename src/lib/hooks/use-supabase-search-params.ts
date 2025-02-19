"use client";

import {
    type ReadonlyURLSearchParams,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useEffect } from "react";

/**
 * Retrieves client search params from a Supabase-created URL string.
 * Supabase has a bug where URLs from errors are created with a '#' instead
 * of a '?', so searchParams cannot be parsed from existing hooks.
 * e.g. http://localhost:3000/login#error_description=Email+link+is+invalid+or+has+expired
 * Issue here: https://github.com/supabase/auth-js/issues/739
 * This hook replaces the '#' and returns the searchParams.
 * @returns {ReadonlyURLSearchParams} A typed ReadonlyURLSearchParams object from next/navigation
 */
export const useSupabaseSearchParams = (): ReadonlyURLSearchParams => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const path = window.location.href;
        const validPath = path.replace(/#/, "?");
        router.push(validPath);
    }, [router]);

    return searchParams;
};
