Ext.define('Telasi.model.document.Base', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        'id',
        'language',
        'doctype',
        'direction',
        'subject',
        { name: 'body', mapping: 'text.body' },
        'docnumber',
        'docdate',
        'due_date',
        'status',
        'author_id',
        'author_user',
        { name: 'author_first_name_ka', mapping: 'author_user.first_name_ka'},
        { name: 'author_last_name_ka', mapping: 'author_user.last_name_ka'},
        { name: 'author_first_name_ru', mapping: 'author_user.first_name_ru'},
        { name: 'author_last_name_ru', mapping: 'author_user.last_name_ru'},
        { name: 'author_first_name_en', mapping: 'author_user.first_name_en'},
        { name: 'author_last_name_en', mapping: 'author_user.last_name_en'},
        {
            name: 'author_fullname',
            convert: function(val, record){
               // return record.get('first_name_'+Telasi.app.globals.locale) + ' ' + record.get('last_name_'+Telasi.app.globals.locale);
               return record.get('author_first_name_ka') + ' ' + record.get('author_last_name_ka');
            }
        },
        'sender_user',
        { name: 'sender_first_name_ka', mapping: 'sender_user.first_name_ka'},
        { name: 'sender_last_name_ka', mapping: 'sender_user.last_name_ka'},
        { name: 'sender_first_name_ru', mapping: 'sender_user.first_name_ru'},
        { name: 'sender_last_name_ru', mapping: 'sender_user.last_name_ru'},
        { name: 'sender_first_name_en', mapping: 'sender_user.first_name_en'},
        { name: 'sender_last_name_en', mapping: 'sender_user.last_name_en'},
        {
            name: 'sender_fullname',
            convert: function(val, record){
               // return record.get('first_name_'+Telasi.app.globals.locale) + ' ' + record.get('last_name_'+Telasi.app.globals.locale);
               return record.get('sender_first_name_ka') + ' ' + record.get('sender_last_name_ka');
            }
        },
        'owner_user',
        { name: 'owner_first_name_ka', mapping: 'owner_user.first_name_ka'},
        { name: 'owner_last_name_ka', mapping: 'owner_user.last_name_ka'},
        { name: 'owner_first_name_ru', mapping: 'owner_user.first_name_ru'},
        { name: 'owner_last_name_ru', mapping: 'owner_user.last_name_ru'},
        { name: 'owner_first_name_en', mapping: 'owner_user.first_name_en'},
        { name: 'owner_last_name_en', mapping: 'owner_user.last_name_en'},
        {
            name: 'owner_fullname',
            convert: function(val, record){
               // return record.get('first_name_'+Telasi.app.globals.locale) + ' ' + record.get('last_name_'+Telasi.app.globals.locale);
               return record.get('owner_first_name_ka') + ' ' + record.get('owner_last_name_ka');
            }
        }
    ]
});