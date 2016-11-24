Ext.define('Tel100.model.document.Gnerc_subtypes', {
  extend: 'Ext.data.Model',
  schema: 'tel100',

  proxy: {
    type: 'rest',
    url: '/api/documents/types/gnerc_subtypes'
  }
});
