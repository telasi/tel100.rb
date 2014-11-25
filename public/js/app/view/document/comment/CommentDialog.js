Ext.define('Telasi.view.document.comment.CommentDialog', {
  extend: 'Ext.window.Window',
  xtype: 'document-comment-dialog',
  modal: true,
  height: 300,
  width: 450,
  border: false,
  title: '<i class="fa fa-comment-o"></i> შედეგი/კომენტარი',
  layout: 'border',
  controller: 'document-comment-dialog-controller',

  requires: [
    'Telasi.view.document.comment.CommentDialogController'
  ],

  initComponent: function() {
    var currStatus = this.doc.get('my_status');
    var statusItems = [{
      text: '<i class="fa fa-comment-o text-info"></i> კომენტარი',
      statusId: currStatus,
      pressed: true
    }];

    if (currStatus === Telasi.statuses.sent) {
      statusItems.push({
        text: '<i class="fa fa-check text-success"></i> შესრულება',
        statusId: Telasi.statuses.completed
      });
      statusItems.push({
        text: '<i class="fa fa-times text-danger"></i> გაუქმება',
        statusId: Telasi.statuses.canceled
      });
    } else {
      statusItems.push({
        text: '<i class="fa fa-undo text-danger"></i> მიმდინარეში დაბრუნება',
        statusId: Telasi.statuses.sent
      });
    }

    Ext.apply(this, {
      items: [{
        xtype: 'segmentedbutton',
        width: '100%',
        region: 'north',
        padding: 5,
        items: statusItems
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
      }],
    });
    this.callParent();
  }
});
