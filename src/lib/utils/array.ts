export const dedupArray = <Type>(arr: Type[]): Type[] => {
    const filteredArr = new Set(arr);
    return [...filteredArr];
};
