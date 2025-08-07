import moment from 'moment';
import TimeAgo from 'javascript-time-ago';

export function FormatNumber(value, prec, def) {
  if (!isNaN(def)) {
    const val = value ? value - 4.9 * Math.pow(10, 0 - (def + 1)) : 0;
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: def,
      minimumFractionDigits: def,
    }).format(isNaN(val) || val < 0 ? 0 : val);
  }
  const val = value ? value - 4.9 * Math.pow(10, 0 - (prec + 1)) : 0;
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: prec,
    minimumFractionDigits: prec,
  }).format(isNaN(val) || val < 0 ? 0 : val);
}

export function FormatCurrency(value = 0, coin = 'USD', def) {
  if (def && !isNaN(def)) {
    return FormatNumber(value, def);
  }
  if (
    typeof coin === 'string' &&
    (coin?.toUpperCase() === 'BTC' || coin?.toUpperCase() === 'ETH')
  ) {
    if (value < 10) {
      return FormatNumber(value, 4);
    } else {
      return FormatNumber(value, 3);
    }
  }
  return FormatNumber(value, 2);
}

export function YesterdayToday(timestamp, format = 'MMMM Do YYYY') {
  if (moment(timestamp).format('MMDDYYYY') === moment().format('MMDDYYYY')) {
    return 'Today';
  } else if (
    moment(timestamp).format('MMDDYYYY') ===
    moment().add(-1, 'day').format('MMDDYYYY')
  ) {
    return 'Yesterday';
  } else {
    return moment(timestamp).format(format);
  }
}
export function IsValidURL(str) {
  const urlRegex = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return urlRegex.test(str) ? str : false;
}

export const timeAgoFormatter = (timestamp) => {
  let text = '';

  try {
    const timeAgo = new TimeAgo('en-US');
    text = timeAgo.format(timestamp);
  } catch (error) {}

  return text;
};
