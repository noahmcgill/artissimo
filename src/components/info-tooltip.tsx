import { IoIosHelpCircle } from "react-icons/io";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

interface InfoTooltipProps {
    content: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button className="p-1" variant="link">
                        <IoIosHelpCircle />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="border-black bg-black text-white">
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
