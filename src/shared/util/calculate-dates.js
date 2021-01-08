export const dateDifference = (date1, date2) => {
  const oneDay = 1000 * 3600 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const days = (utc2 - utc1) / oneDay;
  return Math.abs(days);
}

export const isAfterToday = (eventDate, daysQty = 1) => {
  const date = new Date(eventDate);
  return date.setDate(date.getDate() + daysQty).valueOf() > new Date().valueOf();
}