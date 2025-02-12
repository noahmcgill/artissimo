"use client";

import { Label } from "../ui/label";
import {
    Select as ShadSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { InfoTooltip } from "../info-tooltip";

interface SelectItem {
    label: string;
    value: string;
}

interface ArtissimoSelectProps {
    label: string;
    placeholder: string;
    items: SelectItem[];
    info?: string;
}

export const ArtissimoSelect: React.FC<ArtissimoSelectProps> = ({
    items,
    label,
    placeholder,
    info,
}) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center gap-0">
                <Label htmlFor="roles" className="text-sm">
                    {label}:
                </Label>
                {info && <InfoTooltip content={info} />}
            </div>
            <ShadSelect>
                <SelectTrigger id={label}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {items.map((item) => (
                        <SelectItem value={item.value} key={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </ShadSelect>
        </div>
    );
};
