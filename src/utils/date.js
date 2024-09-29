import {
  differenceInMilliseconds,
  format,
  formatDistanceToNowStrict,
  formatDuration,
  millisecondsToHours,
  millisecondsToMinutes,
} from "date-fns";

const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

const convertDateTimeToHours = (dateString) => {
  const date = parseDate(dateString);
  if (!date) return "Invalid date";

  const now = new Date();
  const milliseconds = differenceInMilliseconds(now, date);
  const hours = millisecondsToHours(milliseconds);

  return { date, hours };
};

export const convertDistanceTime = (datetimeFirst, datetimeLast) => {
  const dateFirst = parseDate(datetimeFirst);
  const dateLast = parseDate(datetimeLast);
  if (!dateFirst || !dateLast) return "Invalid date";

  const milliseconds = differenceInMilliseconds(dateLast, dateFirst);
  const hours = millisecondsToHours(milliseconds);
  const minutes = millisecondsToMinutes(milliseconds) % 60;

  return formatDuration({ hours, minutes });
};

export const formatNotification = (datetime) => {
  const { date, hours } = convertDateTimeToHours(datetime);
  if (date === "Invalid date") return "Invalid date";

  return hours >= 24
    ? format(date, "d MMMM yyyy, K:mm a")
    : formatDistanceToNowStrict(date, { addSuffix: true });
};

export const formatChat = (datetime) => {
  const { date, hours } = convertDateTimeToHours(datetime);
  if (date === "Invalid date") return "Invalid date";

  if (hours >= 24) {
    return hours < 48 ? "Yesterday" : format(date, "dd/MM/yyyy");
  }

  return format(date, "H:mm");
};

export const formatTime = (datetime) => {
  const date = parseDate(datetime);
  if (!date) return "Invalid date";

  return format(date, "H:mm");
};

export const formatTimeFull = (datetime) => {
  const date = parseDate(datetime);
  if (!date) return "Invalid date";

  return format(date, "HH:mm");
};

export const formatScheduleDate = (datetime) => {
  const date = parseDate(datetime);
  if (!date) return "Invalid date";

  return format(date, "EEEE, d MMMM y");
};

export const formatOrderDate = (datetime) => {
  const date = parseDate(datetime);
  if (!date) return "Invalid date";

  return format(date, "EEEE, dd MMMM `yy - HH:mm");
};
