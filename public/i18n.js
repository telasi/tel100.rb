(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  telasi: {
    ka: 'სს თელასი',
    ru: 'AO Теласи'
  }
};

},{}],2:[function(require,module,exports){
module.exports = {
  tree: {
    title: '<i class="fa fa-bolt"></i> სს თელასის სტრუქტურა'
  }
};

},{}],3:[function(require,module,exports){
var ka = {}
  , ru = {}
  , data = {
    application: require('./application'),
    user: require('./user'),
    hr: require('./hr')
  };

var addProperties = function(ka, ru, data) {
  for(prop in data) {
    // console.log(prop, data[prop]);
    var value = data[prop];
    if (typeof value === 'string') {
      ka[prop] = value;
      ru[prop] = value;
    } else if (value.ka || value.ru) {
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

},{"./application":1,"./hr":2,"./user":4}],4:[function(require,module,exports){
module.exports = {
  username: {
    ka: 'მომხმარებელი',
    ru: 'Пользователь'
  },
  password: {
    ka: 'პაროლი',
    ru: 'Пароль'
  },
  ui: {
    login_title: {
      ka: '<i class="fa fa-user"></i> სისტემაში შესვლა',
      ru: '<i class="fa fa-user"></i> Вход в систему',
    },
    login: {
      ka: 'შესვლა &rarr;',
      ru: 'Вход &rarr;'
    },
    profile: 'მომხმარებლის პროფილი',
    logout: 'სისტემიდან გასვლა'
  }
};

},{}]},{},[3]);
