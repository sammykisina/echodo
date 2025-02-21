import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.extend(isoWeek); 

export const globalFormatter = 'YYYY-MM-DD';
export const localFormatter = 'MMMM, DD YYYY';
export const weekDayFormatter = 'dddd';
export const weekDays = [...Array(5).keys()].map((key) =>
  dayjs().startOf('isoWeek').add(key, 'day').format(globalFormatter)
);
