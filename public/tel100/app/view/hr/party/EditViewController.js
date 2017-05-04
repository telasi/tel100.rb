Ext.define('Tel100.view.hr.party.EditViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.hrpartyedit',

  onButtonClick: function(button, e, eOpts) {
    var view = this.getView();
    var id = view.getViewModel().get('id');
    this.getView().down('form').submit({
      params: {
        id: id
      },
      success: function(form, action) {
        form.owner.up('window').close();
      },
      failure: function(form, action) {
        Ext.Msg.alert('Error', action.result.error);
      }
    });
  }

});