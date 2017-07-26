class AddSmsTextTable < ActiveRecord::Migration
  def up
  	execute <<-SQL
      create table SMS_TEMPLATES (
        TYPE_ID number(5, 0) not null,
        SUBTYPE_ID number(5, 0),
        DESCRIPTION varchar2(150),
        TEXT varchar2(500)
      )
    SQL

    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 10, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom abonentad registratsiis shesakheb ganatskhadis shevsebis miznit unda mimartot ss ,,telasis" satao ofiss, vanis q.#3 an sheavsot ganatskhadi ss "telasis" veb gverdze')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 11, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna saabonento baratis #/-----/ gaaqtiurebis shesakheb dakmaqhophilda.momkhmareblad daregistrirda /sakheli gvari/sakheldsodeba/')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 12, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom /tarighi/ telassa da momkhmarebels shoris gaphormda el.energiis qhidva-gaqhidvis khelshekruleba')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 13, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom motkhovna dakmaqhophilda gantskhadeba #number gauqmebulia')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 14, 'ინფორმაცია დავალიანების შესახებ', 'Tqveni #date clis gantsxadeba #number pasuxad gatsnobebt, rom ab.#/----/ davalianeba date mdgomareobit sheadgens /---/ lars')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 14, 'ბრუნვის ისტორიის მოთხოვნის შემთხვევაში', 'Tqveni #date clis gantskhadeba #number pasukhad gatsemul iqna ab #/----/brunvis istoria')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 15, 'დავალიანების გადანაწილება', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom ab.# /----/ davalianeba gadanadsilda')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 15, 'დავალიანების გადანაწილების გრაფიკის შეცვლა', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom ab.# /----/ davalianebis gadanadsilebis grafiki sheitsvala')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 16, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna dakmaqhophilda. Davalianebis restruqturizatsiis shesakheb khelshekruleba gauqmebulia')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 17, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna #/----/ saabonento baratze ritskhuli davalianebis koreqtirebis shesakheb dakmaqhophilda / dakmaqhophilda nadsilobriv. Koreqtirebis shedegebi asakhul iqneba dsarmodgenil qvitarshi')
     SQL
         execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 17, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna dakmaqhophilda. Tanxa gadairitsxa carmodgenil sabanko angarishze')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 17, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna el.energiis tranzitis safasuris anazghaurebis shesakheb dakmaqhophilda. Khelshekrulebis gaformebis miznit gtkhovt mimartot ss "telasis" satao ofiss vanis q.#3')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 17, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna materialuri zianis anasghaurebis shesakheb dakmaqhophilda. Kompensatsiis tankhis charitskhva ganxortsieldeba tqvens mier carmodgenil sabanko angarishze')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 17, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number saphudzvelze gaitsa ab. # /----/ sagadasakhado angarish-faqtura')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 17, 'თანხის კორექცია', 'Tqveni #date clis gantskhadeba #number saphudzvelze daphiqsirda #date chveneba da gamoicera shesabamisi sagadasaxado angarishfaqtura angarishscorebis miznit')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 19, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna dakmaqhophilda. El.qselis dazianeba aghmopxvrilia')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 20, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna el.energiis sheckvetastan dakavshirebit dakmaqhophilda aqtis #/-----/ shedgenis tarighi /-----/')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 20, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna el.energiis aghdgenastan dakavshirebit dakmaqhophilda')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 30, 'აღრიცვხის კვანძის ადგილზე შემოწმების შემთხვევაში (აღრიცხვის კვანძი წესრიგშია)', 'Tqveni #date clis gantskhadeba #number safudzvelze shemocmda aghricxvis kvandzi. Aghricxvis kvandzi cesrigshia. Shemocmebis aqti  #/-----/ shedgenis tarighi /-----/')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 30, 'აღრიცვხის კვანძის შემოწმების შემთხვევა, როცა აღრიცხვის კვანძი დაზიანებულია მრიცხველის გარდა', 'Tqveni #date clis gantskhadeba #number safudzvelze shemocmda aghricxvis kvandzi. Aghricxvis kvandzis dazianeba aghmofkhvrilia. Shemocmebis aqti #/-----/ shedgenis tarighi /-----/')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 30, 'აღრიცვხის კვანძის შემოწმების შემთხვევა, როცა მრიცხველი საჭიროებს ლაბორატორიულ შემოწმებას', 'Tqveni #date clis gantskhadeba #number safudzvelze shemocmda aghricxvis kvandzi. Sheitsvala mritsxveli. Mritsxvelis dadgmis chveneba /tarighi. Moxsnili mricxveli dailuqa da gaigzavna laboratoriashi shesamocmeblad. Laboratoriuli shemocmebis tarighi da dro getcnobebat damatebit')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, DESCRIPTION, TEXT) 
       VALUES (13, 30, 'მრიცხველის დაყენების შემთხვევაში (აბონენტის განცხადება მრიცხველის დაყენების შესახებ)', 'Tqveni #date clis gantskhadeba #number dakmaqhophilda. Daidga mritsxveli, mritsxvelis dadgmis chveneba/tarighi')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 30, 'Gatsnobebt, rom #date ganxortsielda tqveni mritsxvelis laboratoriuli cesit shemocmeba. Mritsxveli dazianebulia')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, SUBTYPE_ID, TEXT) 
       VALUES (13, 30, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom tqveni motkhovna gamanacilebel qselze droebit miertebastan dakavshirebit dakmaqhophilda')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, DESCRIPTION, TEXT) 
       VALUES (14, 'ლაბორატორიის მიერ შემოწმების თარიღის და დროის შეტყობინება მომხმარებლისათვის', 'Gtkhovt, /tarighi. dro/ st-ze mobrdzandet ss "telasis" laboratoriashi mricxvelis laboratoriuli cesit shemotsmebastan dakavshirebit mis.: vanis q.#3')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, DESCRIPTION, TEXT) 
       VALUES (14, 'მრიცხველის ლაბორატორიული შემოწმების შედეგების შეტყობინება მომხამრებლისათვის (მრიცხველი წესრიგშია)', 'Gatsnobebt, rom #date ganxorcielda tqveni mricxvelis laboratoriuli cesit shemodsmeba. Mricxveli cesrigshia laboratoriis daskvnis #number tarighi')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, DESCRIPTION, TEXT) 
       VALUES (14, 'მრიცხველის ლაბორატორიული შემოწმების შედეგების შეტყობინება მომხამრებლისათვის (მრიცხველი არ არის წესრიგშია)', 'gatsnobebt, rom #date gankhorcielda tqveni mricxvelis laboratoriuli cesit shemocmeba/chaiceros dazianebis tipis mokle agcera/. Laboratoris daskvnis /#number date/')
     SQL
	execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, DESCRIPTION, TEXT) 
       VALUES (14, 'მრიცხველის შემოწმება აკრედიტირებულ ლაბორატორიაში', 'Gatsnobebt, rom tqveni mricxveli shesamocmeblad gadagzavnil iqna akreditirebul laboratoriashi. laboratiis saxelcodeba, misamarti. Mricxvelis shemocmebis tarighi da dro getsnobebat damatebit')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, TEXT) 
       VALUES (15, 'Tqveni #date clis ganckhadeba #number abonentad registratsiis shesaxeb dakmaqhophilda ab.#/number, saxeli da gvari/ saxelcodeba')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, TEXT) 
       VALUES (15, 'Tqveni #date clis ganckhadeba #number pasuxad gacnobebt, rom saabonento baratze #number /abonentis misamarti/telefonis nomeri/ eleqtronuli fostis misamarti/binis nomeri sheitsvala carmodgenili informatsiis safudzvelze')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, TEXT) 
       VALUES (15, 'Tqveni #date clis ganckhadeba #number pasuxad gatsnobebt, rom ab. #number mienitcha saqhofacxovrebo/arasaqhofacxovrebo momxmareblis kategoria')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, TEXT) 
       VALUES (16, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom ganxortsielda el.energiit momaragebis teqnikuri xarisxis adgilze shemocmeba, rac shesabamisobashia dadgenil standartebtan.Shemocmebis aqti #/-----/ shedgenis tarighi /-----/')
     SQL
    execute <<-SQL
       insert into SMS_TEMPLATES(TYPE_ID, TEXT) 
       VALUES (16, 'Tqveni #date clis gantskhadeba #number pasukhad gatsnobebt, rom ganxortsielda el.energiit momaragebis teqnikuri xarisxis adgilze shemocmeba, xarvezi aghmopxvrilia. Shemodsmebis aqti #/-----/ shedgenis tarighi /-----/')
     SQL
  end

  def down
  	execute "drop table SMS_TEMPLATES"
  end
end
