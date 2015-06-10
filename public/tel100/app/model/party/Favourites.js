Ext.define('Tel100.model.party.Favourites', {
  extend: 'Ext.data.Model',

  requires: [
    'Tel100.model.Tel100',
    'Ext.data.proxy.Rest',
    'Ext.data.field.Field'
  ],

  schema: 'tel100',

  proxy: {
    type: 'rest',
    url: '/api/party/favourites'
  },

  fields: [
    {
      name: 'id'
    },
    {
      name: 'person_id'
    },
    {
      name: 'person_type'
    },
    {
      name: 'name'
    },
    'vac_text',
    'sub_id',
    'sub_name',
    'vacation',
    {
      calculate: function(data) {
        return helpers.party.convertTypeToExt(data.person_type);
      },
      name: 'ext_type'
    }
  ],

  toHtml: function() {
    return helpers.party.favouriteDecoration(this);
  }

});