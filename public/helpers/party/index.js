var partyDialog;
var employeeTip;

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

var convertTypeToExt = function(type){
  switch(type){
    case 'HR::Employee':     return 'hr.Employee';
    case 'HR::Organization': return 'hr.Organization';
    case 'HR::Party':        return 'hr.Party';
    case 'BS::Customer':     return 'bs.Customer';
  }
};

var convertTypeToRuby = function(type){
  switch(type){
    case 'hr.Employee':     return 'HR::Employee';
    case 'hr.Organization': return 'HR::Organization';
    case 'hr.Party':        return 'HR::Party';
    case 'bs.Customer':     return 'BS::Customer';
  }
};

var employeeTips = function(component) {
  component.getEl().on('click', function(event, el) {
    if (el && el.tagName === 'A') {
      var html = el.attributes['data-html'].value;
      if (html) {
        html = decodeURIComponent(html);
        if (!employeeTip) {
          employeeTip = Ext.create('Ext.tip.ToolTip', { autoHide: false });
        }
        var rect = el.getBoundingClientRect();
        employeeTip.setHtml(html);
        employeeTip.showAt({ x: rect.left, y: rect.bottom });
      }
    }
  });
};

module.exports = {
  getPartyDialog: getPartyDialog,
  favouriteDecoration: favouriteDecoration,
  convertTypeToExt: convertTypeToExt,
  convertTypeToRuby: convertTypeToRuby,
  employeeTips: employeeTips
};
