export function formatToIST(dateString) {
  if (!dateString) return "N/A";

  try {
    // Ensure the date is treated as UTC
    const utcDate = new Date(dateString.endsWith("Z") ? dateString : dateString + "Z");

    // Convert to IST and format nicely
    return utcDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch (error) {
    console.error("Invalid date:", dateString, error);
    return dateString;
  }
}
