Ext.define('Tel100.model.document.Base', {
  extend: 'Ext.data.Model',

  requires: [
    'Tel100.model.Tel100',
    'Ext.data.field.Integer',
    'Ext.data.field.String',
    'Ext.data.field.Boolean',
    'Ext.data.field.Date'
  ],
  uses: [
    'Tel100.model.document.Type'
  ],

  schema: 'tel100schema',

  proxy: {
    type: 'rest',
    url: '/api/documents/base'
  },

  fields: [
    {
      type: 'int',
      name: 'id'
    },
    {
      type: 'int',
      name: 'my_status'
    },
    {
      type: 'string',
      calculate: function(data) {
        return Helpers.statusFormatted(data.my_status, data.my_role, {
          isMotion: false,
          isNew: data.is_new,
          isChanged: data.is_changed
        });
      },
      name: 'myStatusName'
    },
    {
      type: 'string',
      name: 'my_role'
    },
    {
      type: 'boolean',
      name: 'is_new'
    },
    {
      type: 'boolean',
      name: 'is_changed'
    },
    {
      type: 'int',
      name: 'parent_id'
    },
    {
      name: 'type',
      reference: 'document.Type'
    },
    {
      type: 'string',
      name: 'direction'
    },
    {
      type: 'string',
      calculate: function(data) {
        return Helpers.i18n().document.base.directions[data.direction];
      },
      name: 'directionName'
    },
    {
      type: 'string',
      name: 'subject'
    },
    {
      type: 'string',
      name: 'original_number'
    },
    {
      type: 'date',
      name: 'original_date'
    },
    {
      type: 'string',
      name: 'docnumber'
    },
    {
      type: 'date',
      name: 'docdate'
    },
    {
      type: 'int',
      name: 'docyear'
    },
    {
      type: 'int',
      name: 'page_count'
    },
    {
      type: 'int',
      name: 'additions_count'
    },
    {
      type: 'date',
      name: 'due_date'
    },
    {
      type: 'int',
      name: 'status'
    },
    {
      type: 'string',
      calculate: function(data) {
        return Helpers.statusFormatted(data.status);
      },
      name: 'statusName'
    },
    {
      type: 'int',
      name: 'sender_user_id'
    },
    {
      type: 'int',
      name: 'sender_id'
    },
    {
      type: 'string',
      name: 'sender_type'
    },
    {
      type: 'int',
      name: 'owner_user_id'
    },
    {
      type: 'int',
      name: 'owner_id'
    },
    {
      type: 'string',
      name: 'owner_type'
    },
    {
      type: 'int',
      name: 'motions_total'
    },
    {
      type: 'int',
      name: 'motions_completed'
    },
    {
      type: 'int',
      name: 'motions_canceled'
    },
    {
      type: 'int',
      name: 'comments_total'
    },
    {
      type: 'date',
      name: 'created_at'
    },
    {
      type: 'date',
      name: 'updated_at'
    }
  ]
});