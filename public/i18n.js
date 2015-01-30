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
    refresh: '<i class="fa fa-refresh"></i> განახლება',
    newDocument: '<i class="fa fa-plus"></i> ახალი დოკუმენტი',
    deleteDraft: '<i class="fa fa-trash"></i> წაშლა',
    confirmDeleteDraft: 'დაადასტურეთ დოკუმენტის წაშლა',
    editDraftTitle: '<i class="fa fa-pencil"></i> დრაფტის რედაქტირება',
    generalTabTitle: 'ზოგადი თვისებები',
    receiversTabTitle: 'ადრესატები',
    send: {
      ka: '<i class="fa fa-send"></i> დოკუმენტის გაგზავნა',
      ru: '<i class="fa fa-send"></i> Послать документ'
    }
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
  in_fields: 'შემოსული წერილის პარამეტრები',
  statuses: {
    draft: 'დრაფტი',
    to_be_sent: 'გასაგზავნი',
    to_be_signed: 'ხელმოსაწერი',
    canceled: 'გაუქმებული',
    not_signed: 'ხელმოუწერელი',
    not_sent: 'გაუგზავნელი',
    completed: 'შესრულებული',
    signed: 'ხელმოწერილი',
    current: 'მიღებული',
    sent: 'გაგზავნილი',
    not_received: 'მიუღებელი'
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
  motion: require('./motion'),
  folder: require('./folder'),
  type: require('./type'),
  role: require('./role')
};

},{"./base":3,"./folder":4,"./motion":6,"./role":7,"./type":8}],6:[function(require,module,exports){
module.exports = {
  ordering: 'ეტაპი',
  orderingShort: '#',
  receiver: 'ადრესატი',
  sender: 'გამგზავნი',
  receiver_role: 'როლი',
  motion_text: 'რეზოლუცია',
  due_date: 'ვადა',
  addReceiver: 'ადრესატის დამატება',
  outMotions: 'ადრესატები',
  inMotions: 'გამომგზავნები',
  selectToEdit: 'აარჩიეთ მოძრაობა მისი თვისებების სანახავად',
  selectReceiver: 'ადრესატების არჩევა'
};

},{}],7:[function(require,module,exports){
module.exports = {
  owner: 'მფლობელი',
  creator: 'ინიციატორი',
  author: 'ავტორი',
  signee: 'ვიზატორი',
  assignee: 'ადრესატი',
};

},{}],8:[function(require,module,exports){
module.exports = {
  ui: {
    types: 'სახეობები'
  },
  name: 'დასახელება',
  order_by: '#'
};

},{}],9:[function(require,module,exports){
module.exports = {
  title: {
    ka: 'შეცდომა',
    ru: 'Ошибка'
  }
};
},{}],10:[function(require,module,exports){
module.exports = {
  tree: {
    title: {
      ka: '<i class="fa fa-bolt"></i> სს თელასის სტრუქტურა',
      ru: '<i class="fa fa-bolt"></i> Структура АО Теласи'
    }
  }
};

},{}],11:[function(require,module,exports){
var ka = {}
  , ru = {}
  , data = {
    application: require('./application'),
    admin: require('./admin'),
    'document': require('./document'),
    errors: require('./errors'),
    user: require('./user'),
    hr: require('./hr'),
    ui: require('./ui'),
    vacation: require('./vacation'),
    selector: require('./selector')
  };

var addProperties = function(ka, ru, data) {
  for(prop in data) {
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

},{"./admin":1,"./application":2,"./document":5,"./errors":9,"./hr":10,"./selector":12,"./ui":13,"./user":14,"./vacation":15}],12:[function(require,module,exports){
module.exports = {
  selectedParties: 'არჩეული პირები და ორგანიზაციები',
  selectorConfirm: 'არჩევანის დადასტურება'
};
},{}],13:[function(require,module,exports){
module.exports = {
  confirmTitle: {
    ka: 'დადასტურება',
    ru: 'Подтверждение'
  },
  save: {
    ka: '<i class="fa fa-save"></i> შენახვა',
    ru: '<i class="fa fa-save"></i> Сохранить'
  },
  saved: {
    ka: '<i class="fa fa-save"></i> შენახულია',
    ru: '<i class="fa fa-save"></i> Сохранен'
  },
  saving: {
    ka: '<i class="fa fa-circle-o-notch fa-spin"></i> ინახება...',
    ru: '<i class="fa fa-circle-o-notch fa-spin"></i> Сохраняется...'
  },
  cancel: {
    ka: '<i class="fa fa-times"></i> გაუქმება',
    ru: '<i class="fa fa-times"></i> Отмена'
  },
  refresh: {
    ka: '<i class="fa fa-refresh"></i> განახლება',
    ru: '<i class="fa fa-refresh"></i> Обновить',
  },
  refresh_short: '<i class="fa fa-refresh"></i>',
  add: {
    ka: '<i class="fa fa-plus"></i> დამატება',
    ru: '<i class="fa fa-plus"></i> Добавить',
  },
  add_short: '<i class="fa fa-plus"></i>',
  destroy: {
    ka: '<i class="fa fa-trash"></i> წაშლა',
    ru: '<i class="fa fa-trash"></i> Удалить',
  },
  destroy_short: '<i class="fa fa-trash"></i>',
  destroyConfirm: {
    ka: 'ნამდვილად გინდათ წაშლა?',
    ru: 'Вы действительно хотите удалить?',
  }
};

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
module.exports = {
  ui: {
    button: {
      ka: 'შვებულება',
      ru: 'Отсутствие'
    },
    save: {
      ka: 'შენაზვა',
      ru: 'Сохранить'
    },
    cancel: {
      ka: 'გაუქმება',
      ru: 'Отмена'
    }
  },
  fields: {
  	period: {
  		ka: 'პერიოდი',
  		ru: 'Период'
  	},
  	type: {
  		ka: 'ტიპი',
  		ru: 'тип'
  	},
  	from: {
  		ka: 'დასაწყისი',
  		ru: 'С'
  	},
  	to: {
  		ka: 'დამთავრება',
  		ru: 'По'
  	},
  	substitude: {
  		ka: 'მოვალეობა შეეთავსოს',
  		ru: 'Обязанность совместить'
  	}
  }
};

},{}]},{},[11]);
