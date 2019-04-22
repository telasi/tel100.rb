class AddExchangeInfo < ActiveRecord::Migration
  def up
  	execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC 
      ADD ( WATER_CUSTOMER VARCHAR2(50) )
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC 
      ADD ( GAS_CUSTOMER VARCHAR2(50) )
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC 
      ADD ( GAS_PROVIDER number(10) )
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC 
      ADD ( AGREE_WATER number(1) )
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC 
      ADD ( AGREE_GAS number(1) )
    SQL

    execute <<-SQL
      create table GAS_PROVIDERS (
        ID          number(10, 0) not null,
        NAME    	varchar2(50),
        DESCRIPTION varchar2(1000),

        CREATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        UPDATED_AT   TIMESTAMP WITH TIME ZONE default SYSTIMESTAMP not null,
        constraint GAS_PROVIDERS_PRIMARYKEY primary key ( id ) enable
      )
    SQL

    execute <<-SQL
      insert into GAS_PROVIDERS(ID, NAME, DESCRIPTION) VALUES ('205129617', q'[სს "საქორგგაზი"]', q'[ქ. თბილისი, (ყოფილი სს "თბილგაზის"" კუთვნილი გამანაწილებელი ქსელი)]')
    SQL
    execute <<-SQL
      insert into GAS_PROVIDERS(ID, NAME, DESCRIPTION) VALUES ('204962825', q'[შპს "დიდი დიღომი"]', q'[ქ. თბილისის დიდი დიღმის დასახლება]')
    SQL
    execute <<-SQL
      insert into GAS_PROVIDERS(ID, NAME, DESCRIPTION) VALUES ('206149522', q'[შპს "ვარკეთილაირი"]', q'[ქ. თბილისის ვარკეთილის დასახლების 1, მე-2, 3, 3ა და მე-4 მიკრორაიონები]')
    SQL
    execute <<-SQL
      insert into GAS_PROVIDERS(ID, NAME, DESCRIPTION) VALUES ('200095887', q'[სს "ენერგოკავშირი"]', q'[ქ. თბილისის მუხიანის დასახლება და გლდანის მე-5,6,7,8, მიკრორაიონები]')
    SQL
    execute <<-SQL
      insert into GAS_PROVIDERS(ID, NAME, DESCRIPTION) VALUES ('200260207', q'[შპს "ყამარი მ"]', q'[მუხიანის აგარაკები]')
    SQL
    execute <<-SQL
      insert into GAS_PROVIDERS(ID, NAME, DESCRIPTION) VALUES ('208208198', q'[შპს "გამა"]', q'[ქ. თბილისი - ავტომანქანების გაზით გასამართი საკომპრესორო სადგური (აგგსს) აეროპორტის ტერიტორიაზე, გლდანის აგგსს, შპს "გამწვანება სამგორი", საყოფაცხოვრებო მომსახურების ობიექტები გლდანის ბაზრობის მიმდებარე ტერიტორიაზე]')
    SQL
    execute <<-SQL
      insert into GAS_PROVIDERS(ID, NAME, DESCRIPTION) VALUES ('200213697', q'[შპს "ჩირაღდანი - XXI საუკუნე"]', q'[სოფელი დიღომი]')
    SQL
    execute <<-SQL
      insert into GAS_PROVIDERS(ID, NAME, DESCRIPTION) VALUES ('206037215', q'[შპს "გაზმშენი"]', q'[ქ. თბილისში სს "თბილავიამშენის"" საფრენ-საცდელი საწარმო, მოსკოვის გამზირი N31ა, ქინძმარაულის ქ. გაზოგასამართი სადგური, ქინძმარაულის ქ. გაზოგასამართი სადგურიდან ნავთლუღის აგრს-დან გასამართ სადგურამდე]')
    SQL
    execute <<-SQL
      insert into GAS_PROVIDERS(ID, NAME, DESCRIPTION) VALUES ('202403121', q'[შპს "სოკარ ჯორჯია გაზი"]', q'[აჭარის, გურიის, იმერეთის, სამეგრელო-ზემო სვანეთის, შიდა ქართლის, ქვემო ქართლის, კახეთის, მცხეთა-მთიანეთის რეგიონებში და დაბა კოჯორში მის მფლობელობაში არსებული ბუნებრივი გაზის გამანაწილებელი ქსელის ფარგლებში]')
    SQL
  end

  def down
    execute "drop table GAS_PROVIDERS"

  	execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC  
      DROP COLUMN WATER_CUSTOMER
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC  
      DROP COLUMN GAS_CUSTOMER
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC  
      DROP COLUMN GAS_PROVIDER
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC  
      DROP COLUMN AGREE_WATER
    SQL

    execute <<-SQL
      ALTER TABLE DOCUMENT_GNERC  
      DROP COLUMN AGREE_GAS
    SQL
  end
end
