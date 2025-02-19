import { useEffect } from "react";
import { Button } from "./ui/button";
import { TbBrandNeteaseMusic } from "react-icons/tb";

interface ErrorViewProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ error, reset }) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="h-screen w-full content-center justify-items-center">
            <div className="flex max-w-[500px] flex-col gap-2 text-center">
                <div className="flex items-center justify-center gap-1">
                    <TbBrandNeteaseMusic className="text-2xl text-red-500" />
                    <h1 className="text-2xl font-medium">artissimo</h1>
                </div>
                <h2 className="text-xl font-medium">
                    Oops, something went wrong!
                </h2>
                <p>Sorry about that. Please reload the page to try again.</p>
                <div>
                    <Button
                        onClick={() => reset()}
                        variant="primary"
                        className="mt-4"
                    >
                        Reload Page
                    </Button>
                </div>
            </div>
        </div>
    );
};
