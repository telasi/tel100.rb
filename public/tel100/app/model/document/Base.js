Ext.define('Tel100.model.document.Base', {
  extend: 'Ext.data.Model',
  schema: 'tel100',
  entityName: 'document.Base',

  uses: [
    'Tel100.model.document.Type'
  ],

  proxy: {
    type: 'rest',
    url: '/api/documents/base',
    extraParams: {
       change_no: ''
    },
  },

  fields: ['my_status', 'my_role', 'is_new', 'is_changed', 'status', 'direction', {
    type: 'date',
    name: 'docdate'
  }, {
    type: 'date',
    name: 'original_date'
  }, {
    type: 'date',
    name: 'due_date'
  }, {
    name: 'type',
    reference: 'Tel100.model.document.Type'
  }, {
    calculate: function(data) {
      if (data.type) {
        var type = data.type;
        if (type.name) {
          return type.name;
        } else if (type.get) {
          return type.get('name');
        }
      }
    },
    name: 'typeName'
  }, {
    calculate: function(data) {
      return helpers.document.status.statusFormatted(data.my_status, data.my_role, {
        isMotion: false,
        isNew: data.is_new,
        isChanged: data.is_changed
      });
    },
    name: 'myStatusName'
  }, {
    calculate: function(data) {
      return helpers.document.status.statusFormatted(data.status);
    },
    name: 'statusName'
  }, {
    calculate: function(data) {
      return i18n.document.base.directions[data.direction];
    },
    name: 'directionName'
  }],

  toHtml: function() {
    return '<code>' + this.get('docnumber') + '</code> ' + this.get('owner') +
      ' &mdash; <span class="text-muted">' + this.get('subject') + '</span>';
  }
});
