Ext.define('Tel100.model.hr.Employee', {
  extend: 'Ext.data.TreeModel',

  entityName: 'hr.Employee',
  fields: [
    'user_id',
    'first_name',
    'last_name',
    'vac_text',
    'sub_id',
    'sub_name',
    'vacation',
    {
      calculate: function(data) {
        return !!data.user_id;
      },
      name: 'has_user'
    }, {
      calculate: function(data) {
        return data.first_name + ' ' + data.last_name;
      },
      name: 'full_name'
    }, {
      calculate: function(data) {
        return data.first_name + ' ' + data.last_name;
      },
      name: 'name'
    }, {
      calculate: function(data){
        return !!data.vacation;
      },
      name: 'on_vacation'
    }
  ],

  toHtml: function() {
    var text;

    if(this.get('on_vacation')) {
      return helpers.party.vacationDecorations(this);
    } else  if (this.get('has_user')) {
      text = '<span class="text-success"><i class="fa fa-user"></i> '+ this.get('full_name') +'</span>';
    } else {
      text = '<span class="text-muted"><i class="fa fa-user"></i> ' + this.get('full_name') + '</span>';
    }

    var position = this.get('position');
    text = text + ' &mdash;';
    if (position) {
      text = text + ' <span class="text-muted">' + position + '</span>';
    }

    return text;
  }
});
