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
    generalTabTitle: '<i class="fa fa-send"></i> ზოგადი თვისებები',
    receiversTabTitle: 'ადრესატები',
    send: {
      ka: '<i class="fa fa-send"></i> დოკუმენტის გაგზავნა',
      ru: '<i class="fa fa-send"></i> Послать документ'
    },
    contentTabTitle: '<i class="fa fa-file-text-o"></i> შინაარსი',
    motionsTabTitle: '<i class="fa fa-send"></i> მოძრაობები',
  },
  errors: {
    empty_subject: 'ჩაწერეთ დოკუმენტის სათაური.',
    empty_body: 'ჩაწერეთ დოკუმენტის შინაარსი.'
  },
  type: 'სახეობა',
  direction: 'მიმართულება',
  subject: 'სათაური',
  body: 'შინაარსი',
  subject_tooltip: 'ჩაწერეთ დოკუმენტის სათაური',
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
    current: 'მიმდინარე',
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
  motion: 'შემომავალი',
  action: 'მოქმედება',
  text: 'განმარტება',
  actions: {
    comment: '<i class="fa fa-comment"></i> კომენტარი',
    confirm: '<i class="fa fa-check"></i> დადასტურება',
    cancel: '<i class="fa fa-times"></i> გაუქმება'
  }
};
},{}],5:[function(require,module,exports){
module.exports = {
  attachments: 'მიმაგრებული ფაილები',
  addfile: '<i class="fa fa-plus"></i> დამატება'
};

},{}],6:[function(require,module,exports){
module.exports = {
  ui: {
    folder:{
      ka: 'საქაღალდე',
      ru: 'Папка'
    },
    folders: {
      ka: '<i class="fa fa-folder-open-o"></i> საქაღალდეები',
      ru: '<i class="fa fa-folder-open-o"></i> Папки'
    },
    enter_name:{
      ka: 'შეიყვანეთ სახელი',
      ru: 'Введите имя'
    },
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

},{}],7:[function(require,module,exports){
module.exports = {
  base: require('./base'),
  motion: require('./motion'),
  comment: require('./comment'),
  folder: require('./folder'),
  search: require('./search'),
  type: require('./type'),
  role: require('./role'),
  file: require('./file')
};

},{"./base":3,"./comment":4,"./file":5,"./folder":6,"./motion":8,"./role":9,"./search":10,"./type":11}],8:[function(require,module,exports){
module.exports = {
  actions: {
    delete_assignee: 'ადრესატის წაშლა'
  },
  status: 'სტატუსი',
  ordering: 'ეტაპი',
  orderingShort: '#',
  receiver: 'ადრესატი',
  sender: 'გამომგზავნი',
  receiver_role: 'როლი',
  motion_text: 'რეზოლუცია',
  response_text: 'პასუხი',
  due_date: 'ვადა',
  addReceiver: 'ადრესატის დამატება',
  outMotions: 'გაცემული რეზოლუციები',
  inMotions: 'შემოსული რეზოლუციები',
  selectToEdit: 'აარჩიეთ მოძრაობა მისი თვისებების სანახავად',
  selectReceiver: 'ადრესატების არჩევა',
  sendMotions: '<i class="fa fa-send"></i> გაგზავნა',
  sendMotionsConfirm: 'ნამდვილად გინდათ ყველა დრაფტის დაგზავნა?',
  tree: 'დოკუმენტის მოძრაობა',
  respond: '<i class="fa fa-comment"></i> კომენტარი ან შესრულება',
  properties: 'მოძრაობის თვისებები',
  general: 'ზოგადი',
  times: 'ვადები',
  comments: 'კომენტარები',
  created_at: 'შექმნილია',
  sent_at: 'გაგზავნილია',
  received_at: 'მიღებულია',
  completed_at: 'შესრულებულია',
  updated_at: 'ბოლო ცვლილება',
  assignees: '<i class="fa fa-user"></i> ადრესატები',
  signees: '<i class="fa fa-edit"></i> ვიზატორები'
};

},{}],9:[function(require,module,exports){
module.exports = {
  owner: 'მფლობელი',
  creator: 'ინიციატორი',
  author: 'ავტორი',
  signee: 'ვიზატორი',
  assignee: 'ადრესატი',
};

},{}],10:[function(require,module,exports){
module.exports = {
  ui: {
    search:{
      ka: '<i class="fa fa-filter"></i> ძებნა',
      ru: '<i class="fa fa-filter"></i> Поиск'
    },
  },
  folder: 'საქაალდე',
  type: 'სახეობა',
  direction: 'მიმართულება',
  subject: 'სათაური',
  original_number: 'დედანის #',
  original_date: 'დედანის თარიღი',
  docnumber: 'ნომერი',
  docdate: 'თარიღი',
  page_count: 'გვერდები',
  due_date: 'ვადა',
  sender: 'ინიციატორი',
  owner: 'მფლობელი',
  status: 'სტატუსი',
  from: 'დან',
  to: 'მდე',
  buttons: {
  	search: 'ძებნა',
  	reset: 'წაშლა'
  }
};

},{}],11:[function(require,module,exports){
module.exports = {
  ui: {
    types: 'სახეობები'
  },
  name: 'დასახელება',
  order_by: '#'
};

},{}],12:[function(require,module,exports){
module.exports = {
  title: {
    ka: '<i class="fa fa-times-circle"></i> შეცდომა',
    ru: '<i class="fa fa-times-circle"></i> Ошибка'
  }
};
},{}],13:[function(require,module,exports){
module.exports = {
  tree: {
    title: {
      ka: '<i class="fa fa-bolt"></i> სს თელასის სტრუქტურა',
      ru: '<i class="fa fa-bolt"></i> Структура АО Теласи'
    }
  }
};

},{}],14:[function(require,module,exports){
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

},{"./admin":1,"./application":2,"./document":7,"./errors":12,"./hr":13,"./selector":15,"./ui":16,"./user":17,"./vacation":18}],15:[function(require,module,exports){
module.exports = {
  selectedParties: 'არჩეული პირები და ორგანიზაციები',
  selectorConfirm: 'არჩევანის დადასტურება'
};
},{}],16:[function(require,module,exports){
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
  },
  properties: {
    ka: '<i class="fa fa-list-ul"></i> თვისებები',
    ru: '<i class="fa fa-list-ul"></i> Свойства'
  }
};

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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
  		ka: 'მოვალეობა შეათავსოს',
  		ru: 'Обязанность совместить'
  	},
    docview: {
      ka: 'დოკუმენტები',
      ru: 'Документы'
    }
  },
  substitude_type: {
    none: {
      title: {
        ka: 'არ დაინახოს',
        ru: 'Не показывать'
      },
      explain: {
        ka: 'არ დაინახოს',
        ru: 'Не показывать'
      }
    },
    all: {
      title: {
        ka: 'ყველა',
        ru: 'Все'
      },
      explain: {
        ka: 'ყველა',
        ru: 'Все'
      }
    },
    new: {
      title: {
        ka: 'ახალი',
        ru: 'Новые'
      },
      explain: {
        ka: 'ახალი',
        ru: 'Новые'
      }
    }
  }
};

},{}]},{},[14]);
