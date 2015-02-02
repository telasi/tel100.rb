/*
 * File: app.js
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

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({
  models: [
    'User',
    'document.Type',
    'document.Base',
    'document.Direction',
    'document.Motion'
  ],
  views: [
    'Main',
    'user.login.Panel',
    'workarea.Panel',
    'workarea.LocaleSelector',
    'user.box.Button',
    'modules.Documents',
    'modules.HR',
    'modules.Admin',
    'hr.tree.Panel',
    'admin.Panel',
    'admin.actions.Panel',
    'admin.types.AdminPanel',
    'admin.users.AdminPanel',
    'admin.types.grid.Panel',
    'document.Main',
    'document.folder.Panel',
    'document.grid.Panel',
    'document.editor.Creator',
    'document.editor.General',
    'document.motions.OutGrid',
    'document.motions.OutPanel',
    'party.Selector',
    'hr.vacation.Window',
    'document.editor.Editor',
    'document.motions.InPanel'
  ],
  name: 'Tel100',

  launch: function() {
    Ext.create('Tel100.view.Main');
  }

});
