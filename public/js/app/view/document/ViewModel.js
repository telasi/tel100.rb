Ext.define('Telasi.view.document.ViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.base-document-view-model',
  require: [
    'Telasi.document.view.Utils'
  ],
  formulas: {
    directionIn: function(get) { return get('doc.direction') === 'in'; },
    typeName: function(get) { return documentUtils.getTypeName(get('doc.typeId')); },
    typeNameGenitive: function(get) { return documentUtils.getTypeNameGenitive(get('doc.typeId')); },
  }
});
