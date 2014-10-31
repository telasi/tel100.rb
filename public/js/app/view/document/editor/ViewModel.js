Ext.define('Telasi.view.document.editor.ViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.base-document-view-model',
  require: [
    'Telasi.document.view.Utils'
  ],
  formulas: {
    directionIn: function(get) { return get('doc.direction') === 'in'; },
    typeName: function(get) { return window.Telasi.documentUtils.getTypeName(get('doc.type_id')); },
    typeNameGenitive: function(get) { return window.Telasi.documentUtils.getTypeNameGenitive(get('doc.type_id')); },
  }
});
