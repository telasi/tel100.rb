/*
 * File: app.js
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
    'document.Comment',
    'folder.Document',
    'folder.Standard',
    'document.File',
    'hr.Party',
    'bs.Customer',
    'document.ResponseType'
  ],
  stores: [
    'CustomFolders'
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
    'document.folder.Config',
    'document.motions.Panel',
    'document.motions.Properties',
    'document.file.Panel',
    'document.motions.AssigneePanel',
    'document.motions.SigneePanel',
    'document.motions.AuthorPanel',
    'document.relation.Panel',
    'document.Search',
    'document.motions.ResultPanel',
    'document.comment.Panel',
    'document.comment.Sign',
    'document.comment.Author',
    'document.motions.ReceiverPanel',
    'document.motions.SignaturesViewer'
  ],
  name: 'Tel100',

  launch: function() {
    Ext.create('Tel100.view.Main');
  }

});
