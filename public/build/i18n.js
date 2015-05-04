(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    documents: {
      ka: '<i class="fa fa-files-o"></i> დოკუმენტები',
      ru: '<i class="fa fa-files-o"></i> Документы'
    },
    refresh: {
      ka: '<i class="fa fa-refresh"></i> განახლება',
      ru: '<i class="fa fa-refresh"></i> Обновление'
    },
    newDocument: {
      ka: '<i class="fa fa-plus"></i> ახალი დოკუმენტი',
      ru: '<i class="fa fa-plus"></i> Новый документ'
    },
    deleteDraft: {
      ka: '<i class="fa fa-trash"></i> წაშლა',
      ru: '<i class="fa fa-trash"></i> Удалить'
    },
    confirmDeleteDraft: {
      ka: 'დაადასტურეთ დოკუმენტის წაშლა',
      ru: 'Подтвердите удаление документа'
    },
    editDraftTitle: {
      ka: '<i class="fa fa-pencil"></i> დრაფტის რედაქტირება',
      ru: '<i class="fa fa-pencil"></i> Редактирование черновика'
    },
    generalTabTitle: {
      ka: '<i class="fa fa-send"></i> ძირითადი თვისებები',
      ru: '<i class="fa fa-send"></i> Основные свойства'
    },
    receiversTabTitle: {
      ka: 'ადრესატები',
      ru: 'Адресаты'
    },
    send: {
      ka: '<i class="fa fa-send"></i> დოკუმენტის გაგზავნა',
      ru: '<i class="fa fa-send"></i> Послать документ'
    },
    card: {
      ka: '<i class="fa fa-newspaper-o"></i> ბარათი',
      ru: '<i class="fa fa-newspaper-o"></i> Карточка'
    },
    newDocumentTab: {
      ka: '<i class="fa fa-cog"></i> ახალი დოკუმენტი',
      ru: '<i class="fa fa-cog"></i> Новый документ'
    },
    contentTabTitle: {
      ka: '<i class="fa fa-file-text-o"></i> შინაარსი',
      ru: '<i class="fa fa-file-text-o"></i> Содержание'
    },
    motionsTabTitle: {
      ka: '<i class="fa fa-send"></i> მოძრაობები',
      ru: '<i class="fa fa-send"></i> Движения'
    }
  },
  errors: {
    empty_subject: {
      ka: 'ჩაწერეთ დოკუმენტის სათაური.',
      ru: 'Заполните заголовок документа'
    },
    empty_body: {
      ka: 'ჩაწერეთ დოკუმენტის შინაარსი.',
      ru: 'Заполните содержание документа'
    },
  },
  type: {
    ka: 'სახეობა',
    ru: 'Вид'
  },
  direction: {
    ka: 'მიმართულება',
    ru: 'Направление'
  },
  subject: {
    ka: 'თემა',
    ru: 'Тема'
  },
  body: {
    ka: 'შინაარსი',
    ru: 'Содержание'
  },
  doc: {
    ka: 'დოკუმენტი ',
    ru: 'Документ'
  },
  subject_tooltip: {
    ka: 'ჩაწერეთ დოკუმენტის სათაური',
    ru: 'Заполните заголовок документа'
  },
  authors: {
    ka: 'ავტორები',
    ru: 'Авторы'
  },
  signees: {
    ka: 'ვიზატორები',
    ru: 'Визаторы'
  },
  assignees: {
    ka: 'ადრესატები',
    ru: 'Адресаты'
  },
  original_number: {
    ka: 'დედანის #',
    ru: '№ внешнего документа'
  },
  original_date: {
    ka: 'დედანის თარიღი',
    ru: 'Дата внешнего документа'
  },
  docnumber: {
    ka: 'ნომერი',
    ru: 'Номер'
  },
  docdate: {
    ka: 'თარიღი',
    ru: 'Дата'
  },
  page_count: {
    ka: 'გვერდები',
    ru: 'Страницы'
  },
  additions_count: { 
    ka: 'დანართები',
    ru: 'Приложения'
  },
  due_date: {
    ka: 'ვადა',
    ru: 'Срок'
  },
  sender: {
    ka: 'ინიციატორი',
    ru: 'Инициатор'
  },
  owner: {
    ka: 'მფლობელი',
    ru: 'Владелец'
  },
  status: {
    ka: 'დოკ.სტატუსი',
    ru: 'Статус документа'
  },
  my_status: {
    ka: 'სტატუსი',
    ru: 'Статус'
  },
  response: {
    ka: 'რეზოლუცია',
    ru: 'Резолюция'
  },
  in_fields: {
    ka: 'შემოსული წერილის პარამეტრები',
    ru: 'Параметры вх. документа'
  },
  sender_name: {
    ka: 'ინიციატორი',
    ru: 'Инициатор'
  },
  actions: {
    ka: 'მოქმედება',
    ru: 'Действие'
  },
  from: {
    ka: 'ვისგან',
    ru: 'От кого'
  },
  to: {
    ka: 'ვის',
    ru: 'Кому'
  },
  answers: {
    ka: 'პასუხები',
    ru: 'Ответы'
  },
  statuses: {
    draft: {
      ka: 'დრაფტი',
      ru: 'Черновик'
    },
    to_be_sent: {
      ka: 'გასაგზავნი',
      ru: 'На отправку'
    },
    to_be_signed: {
      ka: 'ხელმოსაწერი',
      ru: 'На подпись'
    },
    canceled: {
      ka: 'გაუქმებული',
      ru: 'Отмененный'
    },
    not_signed: {
      ka: 'ხელმოუწერელი',
      ru: 'Не подписанный'
    },
    not_sent: {
      ka: 'გაუგზავნელი',
      ru: 'Не отправленный'
    },
    completed: {
      ka: 'შესრულებული',
      ru: 'Завершенный'
    },
    signed: {
      ka: 'ხელმოწერილი',
      ru: 'Подписанный'
    },
    current: {
      ka: 'მიმდინარე',
      ru: 'Текущий'
    },
    sent: {
      ka: 'გაგზავნილი',
      ru: 'Отправленный'
    },
    not_received: {
      ka: 'მიუღებელი',
      ru: 'Не полученный'
    },
  },
  directions: {
    in: {
      ka: 'შემოსული',
      ru: 'Входящий'
    },
    inner: {
      ka: 'შიდა',
      ru: 'Внутренний'
    },
    out: {
      ka: 'გასული',
      ru: 'Исходящий'
    }
  },
};

},{}],4:[function(require,module,exports){
module.exports = {
  panelTitle: {
    ka: '<i class="fa fa-comments"></i> კომენტარები',
    ru: '<i class="fa fa-comments"></i> Комментарии'
  },
  motion: {
    ka: 'მოძრაობა',
    ru: 'Движение'
  },
  result: { 
    ka: 'შედეგი',
    ru: 'Результат'
  },
  complete: {
    ka: 'დასრულება',
    ru: 'Завершение'
  },
  action: {
    ka: 'მოქმედება',
    ru: 'Действие'
  },
  text: {
    ka: 'კომენტარი',
    ru: 'Комментарий'
  },
  completed: {
    ka: '<i class="fa fa-check"></i> შესრულებულია',
    ru: '<i class="fa fa-check"></i> Завершенный'
  },
  canceled: {
    ka: '<i class="fa fa-times"></i> გაუქმებულია',
    ru: '<i class="fa fa-times"></i> Отмененный'
  },
  date: {
    ka: 'თარიღი',
    ru: 'Дата'
  },
  author: {
    ka: 'მომხმარებელი',
    ru: 'Пользователь'
  },
  actions: {
    saveComment: {
      ka: '<i class="fa fa-comment"></i> კომენტარის დამატება',
      ru: '<i class="fa fa-comment"></i> Добавление комментария'
    },
    saveResult: {
      ka: '<i class="fa fa-save"></i> შედეგის დამახსოვრება',
      ru: '<i class="fa fa-save"></i> Сохранение результата'
    },
    comment: {
      ka: '<i class="fa fa-comment"></i> კომენტარი',
      ru: '<i class="fa fa-comment"></i> Комментарий'
    },
    confirm: {
      ka: '<i class="fa fa-check"></i> დადასტურება',
      ru: '<i class="fa fa-check"></i> Подтверждение'
    },
    cancel: {
      ka: '<i class="fa fa-times"></i> გაუქმება',
      ru: '<i class="fa fa-times"></i> Отмена'
    },
    sign: {
      ka: '<i class="fa fa-edit"></i> ვიზირება',
      ru: '<i class="fa fa-edit"></i> Визирование'
    },
    sign_document: {
      ka: '<i class="fa fa-edit"></i> დოკუმენტის ვიზირება',
      ru: '<i class="fa fa-edit"></i> Визирование документа'
    },
    sign_ok: {
      ka: '<i class="fa fa-check"></i> ვავიზირება',
      ru: '<i class="fa fa-check"></i> Визирование'
    },
    sign_cancel: {
      ka: '<i class="fa fa-times"></i> არ ვავიზირებ',
      ru: '<i class="fa fa-times"></i> Не визирую'
    },
    author: {
      ka: '<i class="fa fa-legal"></i> ხელმოწერა',
      ru: '<i class="fa fa-legal"></i> Подпись'
    },
    author_document: {
      ka: '<i class="fa fa-legal"></i> დოკუმენტის ხელმოწერა',
      ru: '<i class="fa fa-legal"></i> Подпись документа'
    },
    author_ok: {
      ka: '<i class="fa fa-check"></i> ვაწერ ხელს',
      ru: '<i class="fa fa-check"></i> Подписываю'
    },
    author_cancel: {
      ka: '<i class="fa fa-times"></i> ხელს არ ვაწერ',
      ru: '<i class="fa fa-times"></i> Не подписываю'
    },
    reply: {
      ka: '<i class="fa fa-reply"></i> პასუხი',
      ru: '<i class="fa fa-reply"></i> Ответ'
    },
  },
  errors: {
    text_required_title: {
      ka: 'ჩაწერეთ ტექსტი',
      ru: 'Введите текст'
    },
    text_required: {
      ka: 'გთხოვთ ჩაწეროთ კომენტარის ტექსტი.',
      ru: 'Просьба ввести текст комментария'
    }
  }
};
},{}],5:[function(require,module,exports){
module.exports = {
  attachments: {
  	ka: '<i class="fa fa-paperclip"></i> მიმაგრებული ფაილები',
  	ru: '<i class="fa fa-paperclip"></i> Прикрепленные файлы'
  },
  addfile: {
  	ka: '<i class="fa fa-plus"></i> დამატება',
  	ru: '<i class="fa fa-plus"></i> Добавление'
  }
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
    delete_signee: {
      ka: 'ვიზატორის წაშლა',
      ru: 'Удаление визатора'
    },
    delete_assignee: {
      ka: 'ადრესატის წაშლა',
      ru: 'Удаление адресата'
    },
    delete_author: {
      ka: 'ავტორის წაშლა',
      ru: 'Удаление автора'
    },
    add_assignee: {
      ka: '<span class="text-success"><i class="fa fa-plus"></i> ადრესატის დამატება</span>',
      ru: '<span class="text-success"><i class="fa fa-plus"></i> Добавление адресата</span>'
    },
    send_assigness: {
      ka: '<i class="fa fa-send"></i> ადრესატებზე დაგზავნა',
      ru: '<i class="fa fa-send"></i> Отправка адресатам'
    }
  },
  status: {
    ka: 'სტატუსი',
    ru: 'Статус'
  },
  ordering: {
    ka: 'ეტაპი',
    ru: 'Этап'
  },
  orderingShort: '#',
  receiver: {
    ka: 'ადრესატი',
    ru: 'Адресат'
  },
  sender: {
    ka: 'გამომგზავნი',
    ru: 'Отправитель'
  },
  receiver_role: {
    ka: 'როლი',
    ru: 'Роль'
  },
  motion_text: {
    ka: 'განმარტება',
    ru: 'Пояснение'
  },
  response_text: {
    ka: 'პასუხი',
    ru: 'Ответ'
  },
  send_type: {
    ka: 'რეზოლუცია',
    ru: 'Резолюция'
  },
  due_date: {
    ka: 'ვადა',
    ru: 'Срок'
  },
  addReceiver: {
    ka: 'ადრესატის დამატება',
    ru: 'Добавление адресата'
  },
  outMotions: {
    ka: 'გაცემული რეზოლუციები',
    ru: 'Выданные резолюции'
  },
  inMotions: {
    ka: 'შემოსული რეზოლუციები',
    ru: 'Входящие резолюции'
  },
  selectToEdit: {
    ka: 'აარჩიეთ მოძრაობა მისი თვისებების სანახავად',
    ru: 'Выберите движения для просмотра свойств'
  },
  selectReceiver: {
    ka: 'ადრესატების არჩევა',
    ru: 'Выбор адресата'
  },
  sendMotions: {
    ka: '<i class="fa fa-send"></i> გაგზავნა',
    ru: '<i class="fa fa-send"></i> Отправка'
  },
  sendMotionsConfirm: {
    ka: 'ნამდვილად გინდათ ყველა დრაფტის დაგზავნა?',
    ru: 'Действительно хотите отправить все черновики?'
  },
  tree: {
    ka: '<i class="fa fa-truck"></i> დოკუმენტის მოძრაობა',
    ru: '<i class="fa fa-truck"></i> Движение документа'
  },
  respond: {
    ka: '<i class="fa fa-comment"></i> კომენტარი ან შესრულება',
    ru: '<i class="fa fa-comment"></i> Комментарий или выполнение'
  },
  properties: {
    ka: 'მოძრაობის თვისებები',
    ru: 'Свойства движения'
  },
  general: {
    ka: 'ზოგადი',
    ru: 'Основные'
  },
  times: {
    ka: 'ვადები',
    ru: 'Сроки'
  },
  comments: {
    ka: 'კომენტარები',
    ru: 'Комментарии'
  },
  created_at: {
    ka: 'შექმნილია',
    ru: 'Создано'
  },
  sent_at: {
    ka: 'გაგზავნილია',
    ru: 'Отправлено'
  },
  received_at: {
    ka: 'მიღებულია',
    ru: 'Получено'
  },
  completed_at: {
    ka: 'შესრულებულია',
    ru: 'Выполнено'
  },
  updated_at: {
    ka: 'ბოლო ცვლილება',
    ru: 'Последнее изменение'
  },
  assignees: {
    ka: '<i class="fa fa-user"></i> ადრესატები',
    ru: '<i class="fa fa-user"></i> Адресаты'
  },
  add_assignees: {
    ka: '<i class="fa fa-users"></i> ადრესატების დამატება',
    ru: '<i class="fa fa-users"></i> Добавление адресатов'
  },
  signees: {
    ka: '<i class="fa fa-edit"></i> ვიზატორები',
    ru: '<i class="fa fa-edit"></i> Визаторы'
  },
  authors: {
    ka: '<i class="fa fa-legal"></i> ავტორები',
    ru: '<i class="fa fa-legal"></i> Авторы'
  },
  resultPaneTitle: {
    ka: '<i class="fa fa-check"></i> შედეგი და კომენტარი',
    ru: '<i class="fa fa-check"></i> Результат и комментарии'
  },
  receivers: {
    ka: '<i class="fa fa-users"></i> ადრესატები',
    ru: '<i class="fa fa-users"></i> Адресаты'
  },
  signatures: {
    ka: '<i class="fa fa-edit"></i> ვიზატორები',
    ru: '<i class="fa fa-edit"></i> Визаторы'
  },
  incoming: {
    ka: 'შემომავალი',
    ru: 'Входящие'
  }
};

},{}],9:[function(require,module,exports){
module.exports = {
  relations: {
  	ka: '<i class="fa fa-files-o"></i> საფუძვლები',
  	ru: '<i class="fa fa-files-o"></i> Основания'
  }
};

},{}],10:[function(require,module,exports){
module.exports = {
  owner: {
  	ka: 'მფლობელი',
  	ru: 'Владелец'
  },
  creator: {
  	ka: 'ინიციატორი',
  	ru: 'Инициатор'
  },
  author: {
  	ka: 'ავტორი',
  	ru: 'Автор'
  },
  signee: {
  	ka: 'ვიზატორი',
  	ru: 'Визатор'
  },
  assignee: {
  	ka: 'ადრესატი',
  	ru: 'Адресат'
  }
};

},{}],11:[function(require,module,exports){
module.exports = {
  ui: {
    search:{
      ka: '<i class="fa fa-filter"></i> ძებნა',
      ru: '<i class="fa fa-filter"></i> Поиск'
    },
  },
  folder: {
    ka: 'საქაღალდე',
    ru: 'Папка'
  },
  type: {
    ka: 'სახეობა',
    ru: 'Вид'
  },
  direction: {
    ka: 'მიმართულება',
    ru: 'Направление'
  },
  subject: {
    ka: 'სათაური',
    ru: 'Заголовок'
  },
  original_number: {
    ka: 'დედანის #',
    ru: '№ внешнего документа'
  },
  original_date: {
    ka: 'დედანის თარიღი',
    ru: 'Дата внешнего документа'
  },
  docyear: {
    ka: 'წელი',
    ru: 'Год'
  },
  docnumber: {
    ka: 'ნომერი',
    ru: 'Номер'
  },
  docdate: {
    ka: 'თარიღი',
    ru: 'Дата'
  },
  page_count: {
    ka: 'გვერდები',
    ru: 'Страницы'
  },
  due_date: {
    ka: 'ვადა',
    ru: 'Срок'
  },
  sender: {
    ka: 'ინიციატორი',
    ru: 'Инициатор'
  },
  owner: {
    ka: 'მფლობელი',
    ru: 'Владелец'
  },
  author: {
    ka: 'ავტორი',
    ru: 'Автор'
  },
  assignee: {
    ka: 'ადრესატი',
    ru: 'Адресат'
  },
  signee: {
    ka: 'ვიზატორი',
    ru: 'Визатор'
  },
  customer: {
    ka: 'აბონენტის #',
    ru: '№ абонента'
  },
  status: {
    ka: 'სტატუსი',
    ru: 'Статус'
  },
  from: {
    ka: 'დან',
    ru: 'С'
  },
  to: {
    ka: 'მდე',
    ru: 'По'
  },
  buttons: {
  	search: {
      ka: 'ძებნა',
      ru: 'Поиск'
    },
  	reset: {
      ka: 'გასუფთავება',
      ru: 'Очистить'
    },
    savefilter: {
      ka: 'ფილტრის დამახსოვრება',
      ru: 'Сохранение фильтра'
    },
  },
  choseCustomer: {
    ka: 'აბონენტების არჩევა',
    ru: 'Выбор абонента'
  }
};

},{}],12:[function(require,module,exports){
module.exports = {
  ui: {
    types: {
    	ka: 'სახეობები',
    	ru: 'Виды'
    }
  },
  name: {
  	ka: 'დასახელება',
  	ru: 'Название'
  },
  order_by: '#'
};

},{}],13:[function(require,module,exports){
module.exports = {
  my_status: {
    'any.none': {
        ka: 'დრაფტი',
        ru: 'Черновик'
    },
    'owner.current':  {
        ka: 'მიმდინარე',
        ru: 'Текущий'
    },
    'owner.completed':  {
        ka: 'დასრულებული',
        ru: 'Завершенный'
    },
    'owner.canceled':  {
        ka: 'გაუქმებული',
        ru: 'Отмененный'
    },
    'author.current':  {
        ka: 'ხელმოსაწერი',
        ru: 'На подпись'
    },
    'author.completed':  {
        ka: 'ხელმოწერილი',
        ru: 'Подписанный'
    },
    'author.canceled':  {
        ka: 'ხელმოუწერელი',
        ru: 'Не подписанный'
    },
    'signee.current':  {
        ka: 'დასავიზირებელი',
        ru: 'На визирование'
    },
    'signee.completed':  {
        ka: 'დავიზირებული',
        ru: 'Визированный'
    },
    'signee.canceled':  {
        ka: 'დაუვიზირებელი',
        ru: 'Не визированный'
    },
    'assignee.current': {
        ka: 'მიღებული',
        ru: 'Принятый'
    },
    'assignee.completed': {
        ka: 'დასრულებული',
        ru: ''
    },
    'assignee.canceled': {
        ka: 'უარყოფილი',
        ru: 'Отмененный'
    }
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

},{"./admin":1,"./application":2,"./document":7,"./errors":14,"./hr":16,"./selector":17,"./ui":18,"./user":19,"./vacation":20}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
module.exports = {
  selectedParties: {
  	ka: 'არჩეული პირები და ორგანიზაციები',
  	ru: 'Выбранные лица и организации'
  },
  selectorConfirm: {
  	ka: 'არჩევანის დადასტურება',
  	ru: 'Подтверждение выбора'
  }
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
  },
  more: {
    ka: 'კიდევ: ',
    ru: 'Еще: '
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
    profile: {
      ka: 'მომხმარებლის პროფილი',
      ru: 'Профиль пользователя'
    },
    logout: {
      ka: 'სისტემიდან გასვლა',
      ru: 'Выход из системы'
    }
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
    history: {
      ka: 'ისტორია',
      ru: 'История'
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

},{}]},{},[15])