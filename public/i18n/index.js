var ka = {}
  , ru = {}
  , data = {
    application: require('./application')
  };

var addProperties = function(ka, ru, data) {
  for(prop in data) {
    // console.log(prop, data[prop]);
    var value = data[prop];
    if (value.ka || value.ru) {
      var value_ka = value.ka || value.ru;
      var value_ru = value.ru || value.ka;
      ka[prop] = value_ka;
      ru[prop] = value_ru;
    } else {
      ka[prop] = {};
      ru[prop] = {};
      addProperties(ka[prop], ru[prop], value);
    }
  }
};

addProperties(ka, ru, data);
window.ka = ka;
window.ru = ru;
