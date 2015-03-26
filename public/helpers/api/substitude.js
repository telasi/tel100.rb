var ajax = require('../ajax');

var setSubstitude = function(substitude){
  ajax.setExtraParams('substitude', substitude);
};

module.exports = {
  setSubstitude: setSubstitude
};