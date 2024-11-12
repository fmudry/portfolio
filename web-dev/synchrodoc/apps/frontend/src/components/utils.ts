export function truncateString(
    str: string,
    maxLength: number = 30
): string {
    if (str.length > maxLength) {
        return str.slice(0, maxLength - 3) + "...";
    }
    return str;
}
