"use client";

import { ErrorView } from "@/components/error-view";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return <ErrorView error={error} reset={reset} />;
}
