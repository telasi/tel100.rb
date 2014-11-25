Ext.define('Telasi.view.document.comment.CommentDialog', {
  extend: 'Ext.window.Window',
  xtype: 'document-comment-dialog',
  modal: true,
  height: 300,
  width: 450,
  border: false,
  title: '<i class="fa fa-comments"></i> შედეგი/კომენტარი',
  layout: 'border',
  controller: 'document-comment-dialog-controller',

  requires: [
    'Telasi.view.document.comment.CommentDialogController'
  ],

  initComponent: function() {
    console.log();

    // Ext.apply(this, {
    //   items: XXXX,
    // });
    this.callParent();
  },

  items:[{
    xtype: 'segmentedbutton',
    width: '100%',
    region: 'north',
    padding: 5,
    items: [{
      text: '<i class="fa fa-comment-o text-info"></i> კომენტარი',
      statusId: Telasi.statuses.sent,
      pressed: true
    }, {
      text: '<i class="fa fa-check text-success"></i> შესრულება',
      statusId: Telasi.statuses.completed
    }, {
      text: '<i class="fa fa-times text-danger"></i> გაუქმება',
      statusId: Telasi.statuses.canceled
    }],
  }, {
    xtype: 'textarea',
    region: 'center',
    padding: "0, 5"
  }, {
    xtype: 'container',
    region: 'south',
    padding: 5,
    border: false,
    items: [{
      xtype: 'button',
      text: 'გაგზავნა',
      width: '100%',
      handler: 'onSendComment'
    }]
  }]
});
