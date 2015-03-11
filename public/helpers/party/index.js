var partyDialog;

var getPartyDialog = function(callback) {

  // create party listener if not created yet
  if (!partyDialog) {
    partyDialog = Ext.create('Tel100.view.party.Selector', {
      title: i18n.document.motion.selectReceiver
    });
  }

  // remove all listeners
  partyDialog.clearListeners();

  // adding new listener
  partyDialog.on('selectioncomplete', callback);

  // return dialog to the user
  return partyDialog;
};

module.exports = {
  getPartyDialog: getPartyDialog
};
