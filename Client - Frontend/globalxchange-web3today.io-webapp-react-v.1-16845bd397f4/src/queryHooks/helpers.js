const checkAppColor = (appColor) =>
  appColor?.[0] === '#' ? appColor : `#${appColor}`;

export const setBackgroundColor = (appColor) => ({
  background: checkAppColor(appColor),
});
