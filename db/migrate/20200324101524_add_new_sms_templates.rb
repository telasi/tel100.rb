class AddNewSmsTemplates < ActiveRecord::Migration
  def up
  	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 50, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom abonentad registratsiis shesakheb ganatskhadis shevsebis miznit unda mimartot ss ,,telasis" satao ofiss, vanis q.#3 an sheavsot ganatskhadi ss "telasis" veb gverdze')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 50, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna saabonento baratis #/-----/ gaaqtiurebis shesakheb dakmaqhophilda.momkhmareblad daregistrirda /sakheli gvari/sakheldsodeba/')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 53, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom /tarighi/ telassa da momkhmarebels shoris gaphormda el.energiis qhidva-gaqhidvis khelshekruleba')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 54, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom motkhovna dakmaqhophilda gantskhadeba #number gauqmebulia')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 55, 'სიმძლავრის დადგენა', 'Tqveni #date clis gancxadeba #number dakmayofilebulia, aqti #/________/')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 55, 'ინფორმაცია დავალიანების შესახებ', 'Tqveni #date clis gantsxadeba #number pasuxad gatsnobebt, rom ab.#/----/ davalianeba date mdgomareobit sheadgens /---/ lars')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 55, 'ბრუნვის ისტორიის მოთხოვნის შემთხვევაში', 'Tqveni #date clis gantskhadeba #number pasukhad gatsemul iqna ab #/----/brunvis istoria')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 56, 'დავალიანების გადანაწილება', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom ab.# /----/ davalianeba gadanadsilda')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 56, 'დავალიანების გადანაწილების გრაფიკის შეცვლა', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom ab.# /----/ davalianebis gadanadsilebis grafiki sheitsvala')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 57, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna dakmaqhophilda. Davalianebis restruqturizatsiis shesakheb khelshekruleba gauqmebulia')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 58, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna #/----/ saabonento baratze ritskhuli davalianebis koreqtirebis shesakheb dakmaqhophilda / dakmaqhophilda nadsilobriv. Koreqtirebis shedegebi asakhul iqneba dsarmodgenil qvitarshi')
     SQL
         execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 58, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna dakmaqhophilda. Tanxa gadairitsxa carmodgenil sabanko angarishze')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 58, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna el.energiis tranzitis safasuris anazghaurebis shesakheb dakmaqhophilda. Khelshekrulebis gaformebis miznit gtkhovt mimartot ss "telasis" satao ofiss vanis q.#3')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 58, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna materialuri zianis anasghaurebis shesakheb dakmaqhophilda. Kompensatsiis tankhis charitskhva ganxortsieldeba tqvens mier carmodgenil sabanko angarishze')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 58, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number saphudzvelze gaitsa ab. # /----/ sagadasakhado angarish-faqtura')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 58, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number saphudzvelze daphiqsirda #date chveneba da gamoicera shesabamisi sagadasaxado angarishfaqtura angarishscorebis miznit')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 66, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna dakmaqhophilda. El.qselis dazianeba aghmopxvrilia')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 59, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna el.energiis sheckvetastan dakavshirebit dakmaqhophilda aqtis #/-----/ shedgenis tarighi /-----/')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 59, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna el.energiis aghdgenastan dakavshirebit dakmaqhophilda')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 61, 'აღრიცვხის კვანძის ადგილზე შემოწმების შემთხვევაში (აღრიცხვის კვანძი წესრიგშია)', 'Tqveni #date clis gantskhadeba #number safudzvelze shemocmda aghricxvis kvandzi. Aghricxvis kvandzi cesrigshia. Shemocmebis aqti  #/-----/ shedgenis tarighi /-----/')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 61, 'აღრიცვხის კვანძის შემოწმების შემთხვევა, როცა აღრიცხვის კვანძი დაზიანებულია მრიცხველის გარდა', 'Tqveni #date clis gantskhadeba #number safudzvelze shemocmda aghricxvis kvandzi. Aghricxvis kvandzis dazianeba aghmofkhvrilia. Shemocmebis aqti #/-----/ shedgenis tarighi /-----/')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 61, 'აღრიცვხის კვანძის შემოწმების შემთხვევა, როცა მრიცხველი საჭიროებს ლაბორატორიულ შემოწმებას', 'Tqveni #date clis gantskhadeba #number safudzvelze shemocmda aghricxvis kvandzi. Sheitsvala mritsxveli. Mritsxvelis dadgmis chveneba /tarighi. Moxsnili mricxveli dailuqa da gaigzavna laboratoriashi shesamocmeblad. Laboratoriuli shemocmebis tarighi da dro getcnobebat damatebit')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 61, 'მრიცხველის დაყენების შემთხვევაში (აბონენტის განცხადება მრიცხველის დაყენების შესახებ)', 'Tqveni #date clis gantskhadeba #number dakmaqhophilda. Daidga mritsxveli, mritsxvelis dadgmis chveneba/tarighi')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 61, 'Gatsnobebt, rom #date ganxortsielda tqveni mritsxvelis laboratoriuli cesit shemocmeba. Mritsxveli dazianebulia')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 61, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna gamanacilebel qselze droebit miertebastan dakavshirebit dakmaqhophilda')
     SQL
  end
end
