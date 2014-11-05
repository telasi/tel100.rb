Ext.define('Telasi.view.document.authors.Editor', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-authors-editor',
  // controller: 'authorsEditorController',
  layout: 'fit',
  padding: 0,
  bodyPadding: 0,
  requires: [
    // 'Telasi.view.document.authors.EditorController',
    // 'Telasi.view.document.authors.Grid',
  ],
  border: false,
  items: [/*{
    xtype: 'document-authors-grid',
    editable: false,
    store: {
      fields: [
        'receiver_id',
        'name',
        'motion_text',
        { name: 'due_date', type: 'date' },
        'icon'
      ]
    },
    border: false,
  }*/, {
    xtype: 'label',
    text: 'authors'
  }],
  tools: [{
    type: 'plus',
    tooltip: 'ავტორების დამატება',
    callback: function (editor) {
      // TODO
    }
  }]
});
