export const getAvatarFallback = (name: string, fallbackChar = "W") => {
    const [first, last] = name.split(" ");

    if (last?.toLowerCase() === "workspace") return name[0];
    return first && last
        ? (first[0] ?? "") + (last[0] ?? "")
        : (name[0] ?? fallbackChar);
};
