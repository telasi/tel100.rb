Ext.define('Tel100.view.user.box.ButtonViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.userboxbutton',

  formulas: {
    boxtext: function(get) {
      var mainUser = get('currentUser');
      var proxyUser = get('proxyUser');
      if (proxyUser) {
        return [
          '<i class="fa fa-user"></i> ' + mainUser.get('full_name'),
          ' &rarr; ',
          '<span style="color:#fcc;"><i class="fa fa-eye"></i> ' + proxyUser.get('full_name') + '</span>'
        ].join('');
      } else {
        return '<i class="fa fa-user"></i> ' + mainUser.get('full_name');
      }
    }
  }
});
