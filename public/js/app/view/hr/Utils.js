Ext.define('Telasi.view.hr.Utils', {
  extend: 'Ext.Base',
  renderStructure: function(record) {
    var manager = record.get('is_manager')
      , name = record.get('name')
      , org = record.get('organization')
      , text = '<i class="fa fa-' + record.get('image') + '"></i>'
      , has_user = record.get('has_user')
      ;
    text += ' ' + name;
    if (org) { text += ' <span class="text-muted">' + org + '</span>'; }
    if (manager === 1) { text = '<strong>' + text + '</strong>'; }
    if (has_user === false) { text = '<strike>' + text + '</strike>'; }
    return text;
  },

  getPerson: function(value){
    return window.Telasi.hrUtils.renderStructure( Ext.create('Ext.data.Model', value) );
  },
}, function() {
  window.Telasi.hrUtils = new Telasi.view.hr.Utils();
});
