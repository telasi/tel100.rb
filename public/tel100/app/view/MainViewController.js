Ext.define('Tel100.view.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.main',

  onLoggedin: function(user) {
    // set current user
    var user = helpers.user.getCurrentUser();
    this.getViewModel().set('currentUser', user);

    // open UI
    var view = this.getView();
    var layout = view.getLayout();
    layout.setActiveItem('workarea');
  },

  onBeforeRender: function(component, eOpts) {
    var locale = helpers.i18n.getCurrentLocale();
    var i18n = window[locale];
    window.i18n = i18n;
    var viewModel = this.getViewModel();
    viewModel.set('i18n', i18n);
  }
});
