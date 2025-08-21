const timeAgo = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const seconds = Math.floor(diffMs / 1000);

  if (seconds < 86400) {
    // within 24h → show relative
    let value, unit;

    if (seconds < 60) {
      value = -seconds;
      unit = "second";
    } else if (seconds < 3600) {
      value = -Math.floor(seconds / 60);
      unit = "minute";
    } else {
      value = -Math.floor(seconds / 3600);
      unit = "hour";
    }

    return {
        isToday:true,
        time:new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(value, unit)};
  }

  // older than 24h → show normal date
  return {
    isToday:false,
    time: new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
};

export default timeAgo;
