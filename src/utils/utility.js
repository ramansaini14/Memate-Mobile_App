import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getTimeAgo = timestampInMillis => {
  const now = dayjs();
  const past = dayjs(timestampInMillis * 1000);
  return past.from(now);
};
