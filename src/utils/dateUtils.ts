export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString();
  }
  return date.toLocaleDateString();
};

export const formatTime = (date: Date | string): string => {
  if (typeof date === 'string') {
    return new Date(date).toLocaleTimeString();
  }
  return date.toLocaleTimeString();
};

export const formatDateTime = (date: Date | string): string => {
  if (typeof date === 'string') {
    return new Date(date).toLocaleString();
  }
  return date.toLocaleString();
};
