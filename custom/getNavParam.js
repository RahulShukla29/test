import React from 'react';

// Takes an entire string from the deep link and returns the value corresponding to the matching param_name
const getNavParam = (param_string, param_name) => {
  var param_value = '';
  if (param_string) {
    var myRegexp = new RegExp(param_name + '=(.+?)((&.*$)|$)');
    var param_value = param_string.match(myRegexp)[1];
  }

  return param_value;
};

export default getNavParam;
