"use client";

import { ErrorView } from "@/components/error-view";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <ErrorView error={error} reset={reset} />
            </body>
        </html>
    );
}
