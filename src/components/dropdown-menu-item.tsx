import { DropdownMenuItem as CnDropdownMenuItem } from "@/components/ui/dropdown-menu";
import { type DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
    children,
    onClick,
    className,
    ...rest
}) => {
    return (
        <CnDropdownMenuItem
            onClick={onClick ?? undefined}
            className={`${className} cursor-pointer`}
            {...rest}
        >
            {children}
        </CnDropdownMenuItem>
    );
};
