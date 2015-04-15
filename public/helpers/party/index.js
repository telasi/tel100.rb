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

var favouriteDecoration = function(value, record){
  var person_type = record.get('person_type');

  switch(person_type){
    case 'HR::Employee':
      return '<i class="fa fa-user"></i> ' + value;  
    case 'HR::Organization':
      return '<i class="fa fa-bank"></i> ' + value;
    case 'HR::Party':
      return '<i class="fa fa-building"></i> ' + value;
    case 'BS::Customer':
      return '<i class="fa fa-users"></i> ' + value;
  }
};

module.exports = {
  getPartyDialog: getPartyDialog,
  favouriteDecoration: favouriteDecoration
};
