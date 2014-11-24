Ext.define('Telasi.view.document.comment.Grid', {
  extend: 'Ext.panel.Panel',
  xtype: 'document-comments-grid',
  layout: 'border',
  border: false,

  items: [{
    xtype: 'label',
    text: 'comments'
  }]
});
