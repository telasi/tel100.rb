Ext.define('Telasi.view.hr.Utils', {
  extend: 'Ext.Base',
  renderStructure: function(record) {
    var manager = record.get('is_manager')
      , name = record.get('name')
      , org = record.get('organization')
      , text = '<i class="fa fa-' + record.get('image') + '"></i>'
      ;
    text += ' ' + name;
    if (org) { text += ' <span class="text-muted">' + org + '</span>'; }
    if (manager === 1) { return '<strong class="text-info">' + text + '</strong>'; }
    else { return text; }
  }
}, function() {
  window.Telasi.hrUtils = new Telasi.view.hr.Utils();
});

