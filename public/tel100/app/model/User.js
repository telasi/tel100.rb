/*
 * File: app/model/User.js
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

Ext.define('Tel100.model.User', {
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
      type: 'string',
      name: 'email'
    },
    {
      type: 'string',
      name: 'mobile'
    },
    {
      type: 'string',
      name: 'phone'
    },
    {
      type: 'string',
      name: 'username'
    },
    {
      type: 'boolean',
      name: 'email_confirmed'
    },
    {
      type: 'boolean',
      name: 'mobile_confirmed'
    },
    {
      type: 'boolean',
      name: 'is_active'
    },
    {
      type: 'boolean',
      name: 'is_admin'
    },
    {
      type: 'int',
      name: 'employee_id'
    },
    {
      type: 'int',
      name: 'person_id'
    },
    {
      type: 'string',
      name: 'first_name'
    },
    {
      type: 'string',
      name: 'last_name'
    },
    {
      type: 'date',
      name: 'created_at'
    },
    {
      type: 'date',
      name: 'updated_at'
    },
    {
      type: 'string',
      calculate: function(data) {
        return data.first_name + ' ' + data.last_name;
      },
      name: 'full_name'
    }
  ]
});