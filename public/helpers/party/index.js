var partyApi = require('../api/party');
var partyDialog;
var employeeTip;

function openPartyTips(el, id, className) {
  partyApi.getInfo(id, className, {
    success: function(data) {
      employeeTip.setHtml(data.html);
    }
  });
  html = '<i class="fa fa-circle-o-notch fa-spin"></i> loading...';
  if (!employeeTip) {
    employeeTip = Ext.create('Ext.tip.ToolTip', { autoHide: false });
  }
  var rect = el.getBoundingClientRect();
  employeeTip.setHtml(html);
  employeeTip.showAt({ x: rect.left, y: rect.bottom });
};

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
      var id = el.attributes['data-id'].value;
      var className = el.attributes['data-class'].value;
      if (id && className) {
        openPartyTips(el, id, className);
      }
    }
  });
};

var vacationDecorations = function(record){

  var text = ['<span title="'+ i18n.hr.tree.absence_reason + record.get('vac_text')+ '" class="text-muted"><i class="fa fa-pause"></i> ',
         record.get('full_name'),
         '</span>'].join('');
         
  if (record.get('sub_id')){
    text = [text,
           ' - ',
           //'<span class="text-danger">'+ record.get('vac_text') + '</i></span> ',
           '<span class="text-success"><i class="fa fa-user"></i> <a data-sub="' + record.get('sub_id') + '"> ',
           i18n.hr.tree.substitude,
           record.get('sub_name'),
           '</a></span>']
           .join('');   
  }
         
  return text;
};

var vacationAction = function(component){
  component.getEl().on('click', function(event, el) {
    if (el && el.tagName === 'A') {
      if (el.attributes['data-sub']) {
        var sub_id = el.attributes['data-sub'].value;
        component.fireEvent('startsearch', component, sub_id);
      } else if (el.attributes['data-id']) {
        var id = el.attributes['data-id'].value;
        var className = el.attributes['data-class'].value;
        openPartyTips(el, id, className);
      }
    }
  });
};

function partyLink(id, type, name) {
  if (id) {
    return [
      '<a href="#" data-id="', id,
      '" data-class="', type, '">',
      name,
      '</a>'
    ].join('');
  } else {
    return name;
  }
};

module.exports = {
  getPartyDialog: getPartyDialog,
  favouriteDecoration: favouriteDecoration,
  convertTypeToExt: convertTypeToExt,
  convertTypeToRuby: convertTypeToRuby,
  employeeTips: employeeTips,
  vacationDecorations: vacationDecorations,
  vacationAction: vacationAction,
  partyLink: partyLink
};
