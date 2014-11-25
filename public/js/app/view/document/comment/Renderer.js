Ext.define('Telasi.view.document.comment.Renderer', {
  extend: 'Ext.Base',

  isComment: function(operation) {
    return [ 'comment' ].indexOf(operation) !== -1;
  },

  isUndo: function(operation) {
    return [ 'unsign', 'unreject', 'uncomplete', 'uncancel', 'doc-uncomplete', 'doc-uncancel' ].indexOf(operation) !== -1;
  },

  isOk: function(operation) {
    return [ 'sign', 'complete', 'doc-complete' ].indexOf(operation) !== -1;
  },

  isCancel: function(operation) {
    return [ 'reject', 'cancel', 'doc-cancel' ].indexOf(operation) !== -1;
  },

  operationClass: function(operation) {
    if (Telasi.commentRenderer.isUndo(operation)) { return 'text-warning'; }
    else if (Telasi.commentRenderer.isOk(operation)) { return 'text-success'; }
    else if (Telasi.commentRenderer.isCancel(operation)) { return 'text-danger'; }
    else { return 'text-muted'; }
  },

  operationIcon: function(operation) {
    if (Telasi.commentRenderer.isUndo(operation)) { return 'fa-undo'; }
    else if (Telasi.commentRenderer.isOk(operation)) { return 'fa-check'; }
    else if (Telasi.commentRenderer.isCancel(operation)) { return 'fa-times'; }
    else { return 'fa-comment-o'; }
  },

  fullNameRenderer: function(value, metaInfo, record) {
    var icon, clazz;
    var operation = record.get('operation');
    var clazz = Telasi.commentRenderer.operationClass(operation);
    var icon = Telasi.commentRenderer.operationIcon(operation);
    return '<span class="' + clazz + '"><i class="fa ' + icon + '"></i> ' + value + '</span>';
  },

  textRenderer: function(value, metaInfo, record) {
    var operation = record.get('operation');
    var clazz = Telasi.commentRenderer.operationClass(operation);
    return '<span class="' + clazz + '">' + value + '</span>';
  },

  dateRenderer: function(value, metaInfo, record) {
    var operation = record.get('operation');
    var clazz = Telasi.commentRenderer.operationClass(operation);
    var date = Ext.Date.format(value, Ext.Date.defaultFormat + ' H:i:s');
    return '<span class="' + clazz + '">' + date + '</span>';
  }
}, function() {
  Telasi.commentRenderer = new Telasi.view.document.comment.Renderer();
});
