"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface ArtissimoInputProps {
    label: string;
    placeholder: string;
    name: string;
    id: string;
    type: string;
    required?: boolean;
}

export const ArtissimoInput: React.FC<ArtissimoInputProps> = ({
    label,
    placeholder,
    type,
    name,
    id,
    required,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required ?? false}
            />
        </div>
    );
};
