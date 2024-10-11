export function formatDate(str, locale = "ru-Ru") {
  const date = new Date(str);
  const dateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric'

  }
  const newDate = new Intl.DateTimeFormat(locale, dateOptions).format(date);
  const newTime = new Intl.DateTimeFormat(locale, timeOptions).format(date);

  return `${newDate} ${newTime}`;
}
