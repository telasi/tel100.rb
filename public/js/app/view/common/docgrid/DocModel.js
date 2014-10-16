Ext.define('Telasi.view.common.docgrid.DocModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        'id',
        'language',
        'doctype',
        'direction',
        'subject',
        'docnumber',
        'docdate',
        'due_date',
        'status',
        'author_id',
        'author_user',
        { name: 'first_name_ka', mapping: 'author_user.first_name_ka'},
        { name: 'last_name_ka', mapping: 'author_user.last_name_ka'},
        { name: 'first_name_ru', mapping: 'author_user.first_name_ru'},
        { name: 'last_name_ru', mapping: 'author_user.last_name_ru'},
        { name: 'first_name_en', mapping: 'author_user.first_name_en'},
        { name: 'last_name_en', mapping: 'author_user.last_name_en'},
        {
            name: 'fullname',
            convert: function(val, record){
               // return record.get('first_name_'+Telasi.app.globals.locale) + ' ' + record.get('last_name_'+Telasi.app.globals.locale);
               return record.get('first_name_ka') + ' ' + record.get('last_name_ka');
            }
        }
    ]
});