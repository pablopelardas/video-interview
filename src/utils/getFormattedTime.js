export const getFormattedTime = (seconds = 0) => {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().slice(14, 19);
};