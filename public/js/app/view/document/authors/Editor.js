Ext.define('Telasi.view.document.authors.Editor', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-authors-editor',
  controller: 'authorsEditorController',
  layout: 'fit',
  padding: 0,
  bodyPadding: 0,
  requires: [
    'Telasi.view.document.authors.EditorController',
    'Telasi.view.document.authors.Grid',
  ],
  border: false,
  items: [{
    xtype: 'document-authors-grid',
    editable: false,
    border: false,
    store: {
      fields: [ 'author_id', 'author_type', 'name', 'organization', 'note', 'image' ]
    },
  }],
  tools: [{
    type: 'plus',
    tooltip: 'ავტორების დამატება',
    callback: function (editor) {
      editor.controller.onEditAuthors(editor);
    }
  }]
});
