// Fixed time zone keeps server and client renders identical.
const TIME_ZONE = "Europe/Paris";
const dayKey = new Intl.DateTimeFormat("fr-FR", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });
const dayMonth = new Intl.DateTimeFormat("fr-FR", { timeZone: TIME_ZONE, day: "numeric", month: "long" });

export function formatUpdatedAt(iso: string, now = new Date()) {
  const date = new Date(iso);
  return dayKey.format(date) === dayKey.format(now) ? "Aujourd’hui" : dayMonth.format(date);
}
