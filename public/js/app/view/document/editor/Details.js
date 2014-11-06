Ext.define('Telasi.view.document.editor.Details', {
  extend: 'Ext.form.Panel',
  xtype: 'document-editor-details',
  layout: 'accordion',
  bodyPadding: 0,
  requires: [
    'Telasi.view.document.motions.Editor',
    'Telasi.view.document.editor.General',
    'Telasi.view.document.authors.Editor',
  ],
  defaults: {
    bodyPadding: 5,
    bodyBorder: false,
    hideCollapseTool: true
  },
  items: [{
    xtype: 'document-editor-general',
    title: '<i class="fa fa-bookmark-o"></i> ძირითადი',
    autoScroll: true
  }, {
    xtype: 'document-authors-editor',
    // title: '<i class="fa fa-edit"></i> ავტორები',
    padding: 0,
    bodyPadding: 0,
    bind: {
      title: '<i class="fa fa-edit"></i> ავტორები {store.length}'
    }
  }, {
    xtype: 'document-motions-editor',
    title: '<i class="fa fa-send-o"></i> ადრესატები',
    padding: 0,
    bodyPadding: 0
  }]
});
