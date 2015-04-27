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
    generalTabTitle: '<i class="fa fa-send"></i> ძირითადი თვისებები',
    receiversTabTitle: 'ადრესატები',
    send: {
      ka: '<i class="fa fa-send"></i> დოკუმენტის გაგზავნა',
      ru: '<i class="fa fa-send"></i> Послать документ'
    },
    card: {
      ka: '<i class="fa fa-newspaper-o"></i> ბარათი',
      ru: '<i class="fa fa-newspaper-o"></i> Карточка'
    },
    newDocumentTab: '<i class="fa fa-cog"></i> ახალი დოკუმენტი',
    contentTabTitle: '<i class="fa fa-file-text-o"></i> შინაარსი',
    motionsTabTitle: '<i class="fa fa-send"></i> მოძრაობები',
  },
  errors: {
    empty_subject: 'ჩაწერეთ დოკუმენტის სათაური.',
    empty_body: 'ჩაწერეთ დოკუმენტის შინაარსი.'
  },
  type: 'სახეობა',
  direction: 'მიმართულება',
  subject: 'თემა',
  body: 'შინაარსი',
  doc: 'დოკუმენტი ',
  subject_tooltip: 'ჩაწერეთ დოკუმენტის სათაური',
  authors: 'ავტორები',
  signees: 'ვიზატორები',
  assignees: 'ადრესატები',
  original_number: 'დედანის #',
  original_date: 'დედანის თარიღი',
  docnumber: 'ნომერი',
  docdate: 'თარიღი',
  page_count: 'გვერდები',
  additions_count: 'დანართები',
  due_date: 'ვადა',
  sender: 'ინიციატორი',
  owner: 'მფლობელი',
  status: 'დოკ.სტატუსი',
  my_status: 'სტატუსი',
  response: 'რეზოლუცია',
  in_fields: 'შემოსული წერილის პარამეტრები',
  sender_name: 'ინიციატორი',
  actions: 'მოქმედება',
  from: 'ვისგან',
  to: 'ვის',
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
  panelTitle: '<i class="fa fa-comments"></i> კომენტარები',
  motion: 'მოძრაობა',
  result: 'შედეგი',
  complete: 'დასრულება',
  action: 'მოქმედება',
  text: 'კომენტარი',
  completed: '<i class="fa fa-check"></i> შესრულებულია',
  canceled: '<i class="fa fa-times"></i> გაუქმებულია',
  date: 'თარიღი',
  author: 'მომხმარებელი',
  actions: {
    saveComment: '<i class="fa fa-comment"></i> კომენტარის დამატება',
    saveResult: '<i class="fa fa-save"></i> შედეგის დამახსოვრება',
    comment: '<i class="fa fa-comment"></i> კომენტარი',
    confirm: '<i class="fa fa-check"></i> დადასტურება',
    cancel: '<i class="fa fa-times"></i> გაუქმება',
    sign: '<i class="fa fa-edit"></i> ვიზირება',
    sign_document: '<i class="fa fa-edit"></i> დოკუმენტის ვიზირება',
    sign_ok: '<i class="fa fa-check"></i> ვავიზირებ',
    sign_cancel: '<i class="fa fa-times"></i> არ ვავიზირებ',
    author: '<i class="fa fa-legal"></i> ხელმოწერა',
    author_document: '<i class="fa fa-legal"></i> დოკუმენტის ხელმოწერა',
    author_ok: '<i class="fa fa-check"></i> ვაწერ ხელს',
    author_cancel: '<i class="fa fa-times"></i> ხელს არ ვაწერ',
  },
  errors: {
    text_required_title: 'ჩაწერეთ ტექსტი',
    text_required: 'გთხოვთ ჩაწეროთ კომენტარის ტექსტი.'
  }
};
},{}],5:[function(require,module,exports){
module.exports = {
  attachments: '<i class="fa fa-paperclip"></i> მიმაგრებული ფაილები',
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
    move_to:{
      ka: 'საქაღალდეში გადატანა',
      ru: 'Перенос в папку'
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
  file: require('./file'),
  relation: require('./relation'),
  user: require('./user')
};

},{"./base":3,"./comment":4,"./file":5,"./folder":6,"./motion":8,"./relation":9,"./role":10,"./search":11,"./type":12,"./user":13}],8:[function(require,module,exports){
module.exports = {
  actions: {
    delete_signee: 'ვიზატორის წაშლა',
    delete_assignee: 'ადრესატის წაშლა',
    delete_author: 'ავტორის წაშლა',
    add_assignee: '<span class="text-success"><i class="fa fa-plus"></i> ადრესატის დამატება</span>',
    send_assigness: '<i class="fa fa-send"></i> ადრესატებზე დაგზავნა'
  },
  status: 'სტატუსი',
  ordering: 'ეტაპი',
  orderingShort: '#',
  receiver: 'ადრესატი',
  sender: 'გამომგზავნი',
  receiver_role: 'როლი',
  motion_text: 'განმარტება',
  response_text: 'პასუხი',
  send_type: 'რეზოლუცია',
  due_date: 'ვადა',
  addReceiver: 'ადრესატის დამატება',
  outMotions: 'გაცემული რეზოლუციები',
  inMotions: 'შემოსული რეზოლუციები',
  selectToEdit: 'აარჩიეთ მოძრაობა მისი თვისებების სანახავად',
  selectReceiver: 'ადრესატების არჩევა',
  sendMotions: '<i class="fa fa-send"></i> გაგზავნა',
  sendMotionsConfirm: 'ნამდვილად გინდათ ყველა დრაფტის დაგზავნა?',
  tree: '<i class="fa fa-truck"></i> დოკუმენტის მოძრაობა',
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
  add_assignees: '<i class="fa fa-users"></i> ადრესატების დამატება',
  signees: '<i class="fa fa-edit"></i> ვიზატორები',
  authors: '<i class="fa fa-legal"></i> ავტორები',
  resultPaneTitle: '<i class="fa fa-check"></i> შედეგი და კომენტარი',
  receivers: '<i class="fa fa-users"></i> ადრესატები',
  signatures: '<i class="fa fa-edit"></i> ვიზატორები',
  incoming: 'შემომავალი'
};

},{}],9:[function(require,module,exports){
module.exports = {
  relations: '<i class="fa fa-files-o"></i> საფუძვლები'
};

},{}],10:[function(require,module,exports){
module.exports = {
  owner: 'მფლობელი',
  creator: 'ინიციატორი',
  author: 'ავტორი',
  signee: 'ვიზატორი',
  assignee: 'ადრესატი',
};

},{}],11:[function(require,module,exports){
module.exports = {
  ui: {
    search:{
      ka: '<i class="fa fa-filter"></i> ძებნა',
      ru: '<i class="fa fa-filter"></i> Поиск'
    },
  },
  folder: 'საქაღალდე',
  type: 'სახეობა',
  direction: 'მიმართულება',
  subject: 'სათაური',
  original_number: 'დედანის #',
  original_date: 'დედანის თარიღი',
  docyear: 'წელი',
  docnumber: 'ნომერი',
  docdate: 'თარიღი',
  page_count: 'გვერდები',
  due_date: 'ვადა',
  sender: 'ინიციატორი',
  owner: 'მფლობელი',
  author: 'ავტორი',
  assignee: 'ადრესატი',
  signee: 'ვიზატორი',
  customer: 'აბონენტის #',
  status: 'სტატუსი',
  from: 'დან',
  to: 'მდე',
  buttons: {
  	search: 'ძებნა',
  	reset: 'გასუფთავება',
    savefilter: 'ფილტრის დამახსოვრება'
  },
  choseCustomer: {
    ka: 'აბონენტების არჩევა',
    ru: 'Выбор абонента'
  }
};

},{}],12:[function(require,module,exports){
module.exports = {
  ui: {
    types: 'სახეობები'
  },
  name: 'დასახელება',
  order_by: '#'
};

},{}],13:[function(require,module,exports){
module.exports = {
  my_status: {
    'any.none': 'დრაფტი',
    'owner.current': 'მიმდინარე',
    'owner.completed': 'დასრულებული',
    'owner.canceled': 'გაუქმებული',
    'author.current': 'ხელმოსაწერი',
    'author.completed': 'ხელმოწერილი',
    'author.canceled': 'ხელმოუწერელი',
    'signee.current': 'დასავიზირებელი',
    'signee.completed': 'დავიზირებული',
    'signee.canceled': 'დაუვიზირებელი',
    'assignee.current':   'მიღებული',
    'assignee.completed': 'დასრულებული',
    'assignee.canceled':  'უარყოფილი',
  }
};

},{}],14:[function(require,module,exports){
module.exports = {
  title: {
    ka: '<i class="fa fa-times-circle"></i> შეცდომა',
    ru: '<i class="fa fa-times-circle"></i> Ошибка'
  }
};
},{}],15:[function(require,module,exports){
module.exports = {
  tree: {
    title: {
      ka: '<i class="fa fa-bolt"></i> სს თელასის სტრუქტურა',
      ru: '<i class="fa fa-bolt"></i> Структура АО Теласи'
    },
    absence_reason:{
      ka: 'არყოფნის მიზეზი: ',
      ru: 'Причина отсутствия: '
    },
    substitude:{
      ka: 'შემცვლელი: ',
      ru: 'Заменяющий: '
    }
  },
  party: {
  	title: {
  		ka: '<i class="fa fa-building "></i> გარე ორგანიზაციები',
  		ru: '<i class="fa fa-building "></i> Внешние огранизации'
  	},
  	fields: {
  		identity: {
  			ka: 'საინდეტიფიკაციო ნომერი',
  			ru: 'Идентификационный номер'
  		},
  		name: {
  			ka: 'დასახელება/სახელი, გვარი',
  			ru: 'Название/Фамилия, имя'
  		},
  		address: {
  			ka: 'მისამართი',
  			ru: 'Адрес'
  		},
  		phones: {
  			ka: 'ტელეფონები',
  			ru: 'Телефоны'
  		},
  		account: {
  			ka: 'ანგარიში',
  			ru: 'Счет'
  		},
      contact: {
        ka: 'საკონტაქტო პირი',
        ru: 'Контактное лицо'
      }
  	},
    newparty: {
      ka: 'ახალი ორგნიზაცია',
      ru: 'Новая организация'
    },
    add: {
      ka: '<i class="fa fa-plus-circle"></i> დამატება',
      ru: '<i class="fa fa-plus-circle"></i> Добавление'
    }
  },
  customer: {
    title: {
      ka: '<i class="fa fa-users "></i> აბონენტები',
      ru: '<i class="fa fa-users "></i> Абоненты'
    },
    fields: {
      accnumb: {
        ka: 'აბონენტის #',
        ru: '# абонента'
      }
    }
  },
  favourites: {
    title: {
      ka: '<i class="fa fa-star"></i> ფავორიტები',
      ru: '<i class="fa fa-star"></i> Фавориты'
    },
    add_to: {
      ka: 'ფავორიტებში დამატება',
      ru: 'Добавить в фавориты'
    },
    delete: {
      ka: 'წაშლა',
      ru: 'Удалить'
    }
  }
};

},{}],16:[function(require,module,exports){
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

},{"./admin":1,"./application":2,"./document":7,"./errors":14,"./hr":15,"./selector":17,"./ui":18,"./user":19,"./vacation":20}],17:[function(require,module,exports){
module.exports = {
  selectedParties: 'არჩეული პირები და ორგანიზაციები',
  selectorConfirm: 'არჩევანის დადასტურება'
};
},{}],18:[function(require,module,exports){
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
    ka: '<i class="fa fa-times"></i> დახურვა',
    ru: '<i class="fa fa-times"></i> Закрыть'
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
  print: {
      ka: '<i class="fa fa-print"></i> ბეჭდვა',
      ru: '<i class="fa fa-print"></i> Печать'
  },
  properties: {
    ka: '<i class="fa fa-list-ul"></i> თვისებები',
    ru: '<i class="fa fa-list-ul"></i> Свойства'
  },
  page : {
    ka: 'გვერდი',
    ru: 'Страница'
  },
  pages : {
    ka: 'გვერდები',
    ru: 'страницы'
  },
  emptyMsg : {
    ka: 'ვერ მოიძებნა ჩანაწერი',
    ru: 'Записей не найдено'
  },
  displayMsg : {
    ka: 'ნაჩვენებია {0}-დან {1}-მდე. სულ {2}',
    ru: 'Показано с {0} по {1} стр. Всего {2}'
  }
};

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
module.exports = {
  ui: {
    title: {
      ka: 'შვებულება',
      ru: 'Отсутствие'
    },
    button: {
      ka: 'ახალი',
      ru: 'Новое'
    },
    save: {
      ka: 'შენაზვა',
      ru: 'Сохранить'
    },
    cancel: {
      ka: 'გაუქმება',
      ru: 'Отмена'
    },
    substitude_mode: {
      title: {
        ka: 'თქვენ ათვალიერებთ დოკუმენტები: ',
        ru: 'Вы просматриваете документы: '
      }
    },
    grid_title: {
      ka: 'შეთავსება',
      ru: 'Замена'
    },
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
    signees:{
      ka: 'ვიზატორები',
      ru: 'Визаторы'
    },
    head_of_group: {
      ka: 'სამსახურის ხელმძღვანელი',
      ru: 'Руководитель службы'
    },
    head_of_division: {
      ka: 'განყოფილების ხელმძღვანელი',
      ru: 'Руководитель отдела'
    },
    head_of_department: {
      ka: 'დეპარტაენტის ხელმძღვანელი',
      ru: 'Руководитель департамента'
    },
    director: {
      ka: 'დირექტორი',
      ru: 'Директор'
    },
    head_of_hr: {
      ka: 'პერსონალის მართვის დეპარტამენტის ხელმძღვანელი',
      ru: 'Руководитель департамента управления персоналом'
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

},{}]},{},[16]);
