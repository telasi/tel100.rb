Ext.define('Telasi.view.document.comment.CommentDialog', {
  extend: 'Ext.window.Window',
  xtype: 'document-comment-dialog',
  modal: true,
  height: 300,
  width: 450,
  border: false,
  // bodyPadding: 5,
  title: '<i class="fa fa-comments"></i> შედეგი/კომენტარი',
  layout: 'border',

  items:[{
    xtype: 'segmentedbutton',
    width: '100%',
    region: 'north',
    padding: 5,
    items: [{
      text: '<i class="fa fa-comments text-info"></i> კომენტარი',
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
      handler: function(button, evt) {
        var dialog = this.up('document-comment-dialog');
        var segment = dialog.down('segmentedbutton');
        var status = segment.items.filterBy(function(x){ return x.pressed; }).getAt(0).statusId;
        var comment = dialog.down('textarea').getRawValue();
        dialog.fireEvent('document-comment-send', status, comment);
      },
    }]
  }]
});
