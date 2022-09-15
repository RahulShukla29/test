import React from 'react';

// Returns the local user's day in ISO format
const getTodayString = setGlobalVariableValue => {
  // Get the user's current time zone
  // Format in sv-SE (which is the same as ISO) and cut off the time to get the local user date
  // Just getting the date may be off when the ISO time (UTC) is not the same calendar day as user

  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset(); // Offset in minutes and avoid using Intl
  var todayString = new Date(currentDate.getTime() - timezoneOffset * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  return todayString;
};

export default getTodayString;
