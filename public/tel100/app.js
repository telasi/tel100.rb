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
    'document.Direction',
    'document.Motion',
    'hr.vacation.Type',
    'hr.vacation.Vacation',
    'folder.Base',
    'document.Type',
    'document.Base',
    'document.Comment'
  ],
  views: [
    'document.editor.Creator',
    'document.editor.General',
    'document.motions.OutGrid',
    'document.motions.InGrid',
    'document.motions.OutPanel',
    'party.Selector',
    'hr.vacation.Window',
    'document.editor.Editor',
    'document.motions.InPanel',
    'user.box.Button',
    'document.grid.Panel',
    'document.Main',
    'modules.Documents',
    'hr.tree.Panel',
    'modules.HR',
    'admin.actions.Panel',
    'admin.types.grid.Panel',
    'admin.types.AdminPanel',
    'admin.users.AdminPanel',
    'admin.Panel',
    'modules.Admin',
    'workarea.Panel',
    'user.login.Panel',
    'workarea.LocaleSelector',
    'Main',
    'document.motions.Tree',
    'document.motions.ResponseDialog',
    'document.motions.ResponsePanel',
    'document.motions.InCombo'
  ],
  name: 'Tel100',

  launch: function() {
    Ext.create('Tel100.view.Main');
  }

});
