/*
 * File: app/model/document/Base.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Tel100.model.document.Base', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Integer',
    'Ext.data.field.String',
    'Ext.data.field.Boolean',
    'Ext.data.field.Date'
  ],

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
      type: 'int',
      name: 'type_id'
    },
    {
      type: 'string',
      name: 'direction'
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