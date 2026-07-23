export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US').format(value);
