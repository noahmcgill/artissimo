import Image from "next/image";
import { TbBrandNeteaseMusic } from "react-icons/tb";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a
                        href="/login"
                        className="flex items-center gap-2 font-medium"
                    >
                        <div className="flex h-6 w-6 items-center justify-center text-primary-foreground">
                            <TbBrandNeteaseMusic className="size-6 text-red-500" />
                        </div>
                        artissimo
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">{children}</div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    src="/placeholder.svg"
                    width={200}
                    height={200}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
