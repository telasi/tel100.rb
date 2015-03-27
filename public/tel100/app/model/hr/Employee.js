/*
 * File: app/model/hr/Employee.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
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

Ext.define('Tel100.model.hr.Employee', {
  extend: 'Ext.data.TreeModel',

  entityName: 'hr.Employee',
  fields: [
    {
      name: 'user_id'
    },
    {
      name: 'first_name'
    },
    {
      name: 'last_name'
    },
    {
      calculate: function(data) {
            return !!data.user_id;
        },
      name: 'has_user'
    },
    {
      calculate: function(data) {
            return data.first_name + ' ' + data.last_name;
        },
      name: 'full_name'
    }
  ],

  toHtml: function() {
    var icon;
    if (this.get('has_user')) {
        icon = '<span class="text-success"><i class="fa fa-user"></i></span>';
    } else {
        icon = '<span class="text-danger"><i class="fa fa-circle"></i></span>';
    }
    return [icon, this.get('full_name')].join(' ');
  }

});