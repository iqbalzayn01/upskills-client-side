import { format } from 'date-fns';

export const formatDateTime = (dateTime) => {
  return format(new Date(dateTime), 'dd MMM yyyy, HH:mm');
};

export const formatDate = (dateTime) => {
  return format(new Date(dateTime), 'dd MMM yyyy');
};

export const formatTime = (dateTime) => {
  return format(new Date(dateTime), 'HH:mm');
};
