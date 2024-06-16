import { format } from 'date-fns';

const formatDateTime = (dateTime) => {
  return format(new Date(dateTime), 'dd MMM yyyy, HH:mm');
};

export default formatDateTime;
