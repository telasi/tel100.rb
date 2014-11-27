Ext.define('Telasi.view.document.comment.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'document-comments-grid',
  controller: 'document-comments-controller',
  layout: 'border',
  border: false,
  scroll: 'vertical',
  listeners: {
    afterrender: 'refresh',
  },

  requires: [
    'Telasi.view.document.comment.GridController',
    'Telasi.view.document.comment.Renderer'
  ],

  initComponent: function() {
    Ext.apply(this, {
      columns: [{
        text: 'თარიღი',
        width: 120,
        sortable: false,
        dataIndex: 'created_at',
        renderer: Telasi.commentRenderer.dateRenderer
      }, {
        text: 'მომხმარებელი',
        width: 180,
        dataIndex: 'full_name',
        sortable: false,
        renderer: Telasi.commentRenderer.fullNameRenderer
      }, {
        text: 'კომენტარი',
        flex: 1,
        sortable: false,
        dataIndex: 'text',
        renderer: Telasi.commentRenderer.textRenderer
      }],
      tools: [{
        type: 'refresh',
        tooltip: 'კომენტარების განახლება',
        callback: function (grid) {
          grid.controller.refresh();
        }
      }],
    });
    this.callParent();
  }
});
