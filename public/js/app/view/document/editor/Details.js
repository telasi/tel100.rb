Ext.define('Telasi.view.document.editor.Details', {
  extend: 'Ext.form.Panel',
  xtype: 'document-editor-details',
  layout: 'accordion',
  bodyPadding: 0,
  requires: [
    'Telasi.view.document.motions.Editor',
    'Telasi.view.document.editor.General',
  ],
  defaults: {
    bodyPadding: 5,
    bodyBorder: false,
    hideCollapseTool: true
  },
  items: [{
    xtype: 'document-editor-general',
    title: '<i class="fa fa-bookmark-o"></i> ძირითადი',
    autoScroll: true,
  }, {
    xtype: 'documentMotionsEditor',
    title: '<i class="fa fa-users"></i> ადრესატები',
    padding: 0,
    bodyPadding: 0,
  }]
});
