Ext.define('Tel100.model.eflow.Motion', {
  extend: 'Ext.data.Model',
  schema: 'tel100',
  entityName: 'eflow.Motion',

  fields: [],

  toHtml: function() {
    return [
      '<code>' + (this.get('number') || this.get('number2')) + '</code>',
      this.get('name'),
      '<span class="text-muted">' + this.get('note') + '</span>'
    ].join(' ');
  }
});
