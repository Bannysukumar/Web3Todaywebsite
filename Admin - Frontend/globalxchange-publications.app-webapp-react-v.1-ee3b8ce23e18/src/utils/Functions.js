export function renameFile(originalFile, newName) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}

export function FormatNumber(value, prec) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: prec,
    minimumFractionDigits: prec,
  }).format(isNaN(value) ? 0 : value);
}

export function FormatCurrency(value = 0, coin = "USD") {
  if (coin.toUpperCase() === "BTC" || coin.toUpperCase() === "ETH") {
    if (value < 10) {
      return FormatNumber(value, 4);
    } else {
      return FormatNumber(value, 3);
    }
  }
  return FormatNumber(value, 2);
}

export function IsValidURL(str) {
  const urlRegex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return urlRegex.test(str) ? str : false;
}

export function TimeAgo(date) {
  //ts in ms

  // get total seconds between the times
  let delta = Math.abs(Date.now() - date) / 1000;

  // calculate (and subtract) whole days
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  let seconds = delta % 60; // in theory the modulus is not required
  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
