import {
  format,
  formatDistanceToNowStrict,
  millisecondsToHours,
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
  const milliseconds = now - date;

  const hours = millisecondsToHours(milliseconds);

  return { date, hours };
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
