Ext.define('Telasi.view.document.editor.Details', {
  extend: 'Ext.form.Panel',
  xtype: 'document-editor-details',
  layout: 'accordion',
  bodyPadding: 0,
  requires: [
    'Telasi.view.document.editor.General',
    'Telasi.view.document.motions.Editor',
    'Telasi.view.document.authors.Editor',
    'Telasi.view.document.signature.Editor'
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
    title: '<i class="fa fa-copyright"></i> ავტორები',
    padding: 0,
    bodyPadding: 0
  }, {
    xtype: 'document-signature-editor',
    title: '<i class="fa fa-edit"></i> ვიზირებები',
    padding: 0,
    bodyPadding: 0
  }, {
    xtype: 'document-motions-editor',
    title: '<i class="fa fa-send-o"></i> ადრესატები',
    padding: 0,
    bodyPadding: 0
  }]
});
