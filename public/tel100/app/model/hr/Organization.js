Ext.define('Tel100.model.hr.Organization', {
  extend: 'Ext.data.TreeModel',

  entityName: 'hr.Organization',

  toHtml: function() {
    return ['<span class="text-muted"><i class="fa fa-bank"></i></span>', this.get('name')].join(' ');
  }
});
