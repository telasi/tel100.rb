var i18n = {};
i18n.ka  = {};
i18n.ru  = {};

// AJAX errors

i18n.ka.errors = {
  title: 'შეცდომა',
  connection_error: 'დაკავშირების პრობლემა. გთხოვთ სცადოთ კიდევ ერთხელ. თუ ეს არ შველის, შეამოწმეთ ქსელის მდგომარეობა ან გამოუძახეთ დახმარებას.'
};

i18n.ru.errors = {
  title: 'Ошибка',
  connection_error: 'Произошла ошибка связи. Попробуйте еще раз. Если это не помогает, проверьте сеть или обратитесь за помощью.'
};

// application

i18n.ka.app = {
  telasi: 'სს თელასი'
};

i18n.ru.app = {
  telasi: 'АО Теласи'
};

// user

i18n.ka.user = {
  login:     'სისტემაში შესვლა',
  login_btn: 'შესვლა',
  username:  'მომხ. სახელი',
  password:  'პაროლი',
  language:  'სამუშაო ენა',
  full_name: 'სახელი, გვარი',
  profile:   'პროფილის მართვა',
  logout:    'სისტემიდან გასვლა'
};

i18n.ru.user = {
  login:     'Вход в систему',
  login_btn: 'Вход',
  username:  'Пользователь',
  password:  'Пароль',
  language:  'Рабочий язык',
  full_name: 'Имя, Фамилия',
  profile: 'Управление профилем',
  logout:    'Выход из системы'
};

// document

i18n.ka.document = {
  base: {
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
    grid: {
      title: 'დოკუმენტები'
    }
  }
};

i18n.ru.document = {
  base: {
    type: 'Тип',
    direction: 'Направление',
    subject: 'Тема',
    original_number: '# Оригинала',
    original_date: 'Дата Оригинала',
    docnumber: 'Номер',
    docdate: 'Дата',
    page_count: 'Страницы',
    additions_count: 'Приложения',
    due_date: 'Срок',
    sender: 'Инициатор',
    owner: 'Владелец',
    status: 'Статус',
    my_status: 'Мой Статус',
    statuses: {
      draft: 'Черновик',
      to_be_sent: 'На отправку',
      to_be_signed: 'На подписку',
      canceled: 'Отменен',
      not_signed: 'Не подписан',
      not_sent: 'Не послан',
      completed: 'Выполнено',
      signed: 'Подписано',
      current: 'Текущий'
    },
    directions: {
      in: 'Входящий',
      inner: 'Внутрений',
      out: 'Исходящий'
    },
    grid: {
      title: 'Документы'
    }
  }
};
