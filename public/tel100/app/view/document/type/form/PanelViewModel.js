Ext.define('Tel100.view.document.type.form.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documenttypeformpanel',

  requires: [
    'Ext.app.bind.Formula'
  ],

  data: {
    doctype: null
  },

  formulas: {
    title: {
      get: function(data) {
        if (data && !data.phantom) {
          return data.get('name');
        } else {
          return Helpers.i18n().document.type.new_type;
        }
      },
      bind: '{doctype}'
    }
  }
});
