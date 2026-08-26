export default function formatDateString(date: string) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date string format");
    }

    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const month = dateObj.toLocaleString('en-US', { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const suffix = (() => {
        switch (day) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    })();

    return `${hours}:${minutes}, ${month} ${day}${suffix}, ${year}`
}