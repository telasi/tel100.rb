(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  actions: {
    title: '<i class="fa fa-cog"></i> მოქმედებები',
    selectAction: 'აარჩიეთ მოქმედება მარცხენა სიიდან'
  },
  documents: {
    title: 'დოკუმენტები',
    types: 'სახეობები'
  },
  sys: {
    title: 'სისტემური',
    users: 'მომხმარებლები'
  }
};
},{}],2:[function(require,module,exports){
module.exports = {
  telasi: {
    ka: 'სს თელასი',
    ru: 'AO Теласи'
  }
};

},{}],3:[function(require,module,exports){
module.exports = {
  ui: {
    documents: '<i class="fa fa-files-o"></i> დოკუმენტები',
    creatorTitle: '<i class="fa fa-plus"></i> ახალი დოკუმენტი'
  },
  type: 'სახეობა',
  direction: 'მიმართულება',
  subject: 'სათაური',
  original_number: 'დედანის #',
  original_date: 'დედანის თარიღი',
  docnumber: 'ნომერი',
  docdate: 'თარიღი',
  page_count: 'გვერდები',
  additions_count: 'დანართები',
  due_date: 'ვადა',
  sender: 'ინიციატორი',
  owner: 'მფლობელი',
  status: 'სტატუსი',
  my_status: 'ჩემი სტატუსი',
  general: 'ზოგადი თვისებები',
  statuses: {
    draft: 'დრაფტი',
    to_be_sent: 'გასაგზავნი',
    to_be_signed: 'ხელმოსაწერი',
    canceled: 'გაუქმებული',
    not_signed: 'ხელმოუწერელი',
    not_sent: 'გაუგზავნელი',
    completed: 'შესრულებული',
    signed: 'ხელმოწერილი',
    current: 'მიმდინარე'
  },
  directions: {
    in: 'შემოსული',
    inner: 'შიდა',
    out: 'გასული'
  },
};

},{}],4:[function(require,module,exports){
module.exports = {
  ui: {
    folders: {
      ka: '<i class="fa fa-folder-open-o"></i> საქაღალდეები',
      ru: '<i class="fa fa-folder-open-o"></i> Папки'
    }
  },
  categories: {
    a: {
      ka: 'სტანდარტული',
      ru: 'Стандатные'
    },
    b: {
      ka: 'საკუთარი',
      ru: 'Собственные'
    }
  }
};

},{}],5:[function(require,module,exports){
module.exports = {
  base: require('./base'),
  folder: require('./folder'),
  type: require('./type')
};

},{"./base":3,"./folder":4,"./type":6}],6:[function(require,module,exports){
module.exports = {
  ui: {
    types: 'სახეობები'
  },
  name: 'დასახელება',
  order_by: '#'
};

},{}],7:[function(require,module,exports){
module.exports = {
  title: {
    ka: 'შეცდომა',
    ru: 'Ошибка'
  }
};
},{}],8:[function(require,module,exports){
module.exports = {
  tree: {
    title: {
      ka: '<i class="fa fa-bolt"></i> სს თელასის სტრუქტურა',
      ru: '<i class="fa fa-bolt"></i> Структура АО Теласи'
    }
  }
};

},{}],9:[function(require,module,exports){
var ka = {}
  , ru = {}
  , data = {
    application: require('./application'),
    admin: require('./admin'),
    'document': require('./document'),
    errors: require('./errors'),
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

},{"./admin":1,"./application":2,"./document":5,"./errors":7,"./hr":8,"./user":10}],10:[function(require,module,exports){
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

},{}]},{},[9]);
