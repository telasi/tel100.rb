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

    var me = component;
    window.onmessage = function(ev){
      if (ev.data.message == 'documentopen'){
        var view = this.getView();
        var dm = view.down('documentmain');
        var doc = { id: ev.data.document_id };
        dm.getController().openDocument(doc);
        var b = view.down('#tel100');
        b.toggle();
      }
     }.bind(this);
  }

  // window.onmessage = function(ev){
  //   debugger;
  //   if (ev.data == 'message') {
        
  //   }
  // }
});
