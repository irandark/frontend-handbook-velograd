export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        alert("Скопировано в буфер обмена" + " " + text);
    } catch (error) {
        console.error("Error copying text to clipboard:", error);
    }
};
