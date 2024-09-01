import {
  differenceInMilliseconds,
  format,
  formatDistanceToNowStrict,
  formatDuration,
  millisecondsToHours,
  millisecondsToMinutes,
} from "date-fns";

const convertDateTimeToHours = (dateString) => {
  if (!dateString) {
    return "Invalid date";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const milliseconds = differenceInMilliseconds(now, date);

  const hours = millisecondsToHours(milliseconds);

  return { date, hours };
};

export const convertDistanceTime = (datetimeFirst, datetimeLast) => {
  if (!datetimeFirst || !datetimeLast) {
    return "Invalid date";
  }

  const dateFirst = new Date(datetimeFirst);
  const dateLast = new Date(datetimeLast);

  const milliseconds = differenceInMilliseconds(dateLast, dateFirst);

  const minutes = millisecondsToMinutes(milliseconds) % 60;
  const hours = millisecondsToHours(milliseconds);

  return formatDuration({ hours, minutes });
};

export const formatNotification = (datetime) => {
  if (!datetime) {
    return "Invalid date";
  }

  const { date, hours } = convertDateTimeToHours(datetime);

  if (hours >= 24) {
    return format(date, "d MMMM yyyy, K:mm a");
  } else {
    return formatDistanceToNowStrict(date, {
      addSuffix: true,
    });
  }
};

export const formatChat = (datetime) => {
  if (!datetime) {
    return "Invalid date";
  }

  const { date, hours } = convertDateTimeToHours(datetime);

  if (hours >= 24) {
    if (hours < 48) {
      return "Yesterday";
    } else {
      return format(date, "dd/MM/yyyy");
    }
  } else {
    return format(date, "H:mm");
  }
};

export const formatTime = (datetime) => {
  if (!datetime) {
    return "Invalid date";
  }

  return format(datetime, "H:mm");
};

export const formatTimeFull = (datetime) => {
  if (!datetime) {
    return "Invalid date";
  }

  return format(datetime, "HH:mm");
};
