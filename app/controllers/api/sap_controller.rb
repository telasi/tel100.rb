# -*- encoding : utf-8 -*-
class Api::SapController < ApiController
  def sync
    mandt = '240'

    sql = 'DELETE FROM SAP_ORGANIZATIONS'
    ActiveRecord::Base.connection.execute(sql)

    sql = <<-SQL
      INSERT INTO SAP_ORGANIZATIONS ( OBJECTID, OBJECTTYPE, BEGIN_DATE, END_DATE, LANGUAGE, SHORT_NAME)
           SELECT OBJID, OTYPE, TO_DATE(BEGDA,'yyyymmdd'), TO_DATE(ENDDA,'yyyymmdd'),
           case when LANGU = CHR(15446401)
                 then 'KA'
                 when LANGU = 'R'
                 then 'RU'
                 else LANGU
            end, STEXT
           FROM SAPSR3.HRP1000@SAP
           WHERE PLVAR = '01'
             AND OTYPE in ('O','S')
             AND ISTAT = '1'
             AND MANDT = #{mandt}
             AND OBJID <> '49999997'
             AND OBJID <> '49999998'
             AND OBJID <> '49999999'
    SQL
    ActiveRecord::Base.connection.execute(sql)

    sql = 'DELETE FROM SAP_ORGANIZATION_TEXTS'
    ActiveRecord::Base.connection.execute(sql)

    sql = <<-SQL
      INSERT INTO SAP_ORGANIZATION_TEXTS ( OBJECTID, OBJECTTYPE, BEGIN_DATE, END_DATE, LANGUAGE, NAME)
             SELECT OBJID, OTYPE, TO_DATE(BEGDA,'yyyymmdd'),TO_DATE(ENDDA,'yyyymmdd'),
              case when LANGU = CHR(15446401)
                   then 'KA'
                   when LANGU = 'R'
                   then 'RU'
                   else LANGU
              end, NAME
             FROM SAPSR3.HRP1002@SAP P,
                  ( SELECT TABNR,
                           LISTAGG(TLINE, ' ') WITHIN GROUP (ORDER BY TABSEQNR) AS NAME
                      FROM SAPSR3.HRT1002@SAP
                      WHERE MANDT = #{mandt}
                      GROUP BY TABNR) T
             WHERE P.PLVAR = '01'
               AND P.OTYPE in ('O','S')
               AND P.ISTAT = '1'
               AND P.SUBTY = '0120'
               AND P.MANDT = #{mandt}
               AND P.TABNR = T.TABNR
    SQL
    ActiveRecord::Base.connection.execute(sql)

    sql = 'DELETE FROM SAP_RELATIONS'
    ActiveRecord::Base.connection.execute(sql)

    sql = <<-SQL
      INSERT INTO SAP_RELATIONS ( OBJECTID, OBJECTTYPE, BEGIN_DATE, END_DATE, RELATION, VARYF, PRIORITY, REL_OBJ_ID, REL_OBJ_TYPE )
               SELECT OBJID,OTYPE, TO_DATE(BEGDA,'yyyymmdd'), TO_DATE(ENDDA,'yyyymmdd'), RSIGN || RELAT as RELATION, VARYF, PRIOX, SOBID, SUBSTR(VARYF,1,1)
               FROM SAPSR3.HRP1001@SAP
               WHERE PLVAR = '01'
                 AND OTYPE in ('O','S','P')
                 AND ISTAT = '1'
                 AND MANDT = #{mandt}
                 AND RELAT in ('002','003','008', '012')
    SQL
    ActiveRecord::Base.connection.execute(sql)

    sql = 'DELETE FROM SAP_PERSONS'
    ActiveRecord::Base.connection.execute(sql)

    sql = <<-SQL
      INSERT INTO SAP_PERSONS( PERSON_ID, BEGIN_DATE, END_DATE,STATUS )
                 SELECT PERNR, TO_DATE(BEGDA,'yyyymmdd'), TO_DATE(ENDDA,'yyyymmdd'), STAT2
                   FROM SAPSR3.PA0000@SAP
                 WHERE MANDT = #{mandt}
    SQL
    ActiveRecord::Base.connection.execute(sql)

    sql = 'DELETE FROM SAP_PERSON_ORG'
    ActiveRecord::Base.connection.execute(sql)

    sql = <<-SQL
      INSERT INTO SAP_PERSON_ORG ( PERSON_ID, BEGIN_DATE, END_DATE, ORGANIZATION, SHTAT )
       SELECT PERNR, TO_DATE(BEGDA,'yyyymmdd'), TO_DATE(ENDDA,'yyyymmdd'), ORGEH, PLANS
         FROM SAPSR3.PA0001@SAP
       WHERE MANDT = #{mandt}
    SQL
    ActiveRecord::Base.connection.execute(sql)

    sql = 'DELETE FROM SAP_PERSON_NAME'
    ActiveRecord::Base.connection.execute(sql)

    sql = <<-SQL
      INSERT INTO SAP_PERSON_NAME ( PERSON_ID, BEGIN_DATE, END_DATE, LANGUAGE, FIRSTNAME, LASTNAME, MIDDLENAME )
                 SELECT PERNR, TO_DATE(BEGDA,'yyyymmdd'), TO_DATE(ENDDA,'yyyymmdd'),'KA', VORNA, NACHN, MIDNM
                   FROM SAPSR3.PA0002@SAP
                 WHERE MANDT = #{mandt}
    SQL
    ActiveRecord::Base.connection.execute(sql)

    sql = <<-SQL
      INSERT INTO SAP_PERSON_NAME ( PERSON_ID, BEGIN_DATE, END_DATE, LANGUAGE, FIRSTNAME, LASTNAME, MIDDLENAME )
       SELECT PERNR, TO_DATE(BEGDA,'yyyymmdd'), TO_DATE(ENDDA,'yyyymmdd'), 'RU', FNAMR, LNAMR, NAME2
     FROM SAPSR3.PA0002@SAP
     WHERE MANDT = #{mandt}
    SQL
    ActiveRecord::Base.connection.execute(sql)
  end

  def hrupdate
    date = Date.parse(params[:date]) || DateTime.now

    updatehr(date)

    render json: { success: true }
  end

  def updatehr(date)
    # set global date for Sap classes

    Sap::Person.set_date(date)
    # Organizations

    Sap::Relation.current_structure.each do | org |
      existed_org = HR::Organization.active.where(saporg_id: org.objectid, saporg_type: org.objecttype).first
      if existed_org
        if existed_org.sapparent_id != org.rel_obj_id || 
           existed_org.name_ka      != org.organization.name_ka ||
           existed_org.name_ru      != org.organization.name_ru ||
           existed_org.is_manager   != org.organization.is_manager? ||
           existed_org.priority     != org.priority

           # update old record
           existed_org.is_active = 0
           existed_org.save

           # insert changes
           neworg = HR::Organization.new(is_active: 1, saporg_id: org.objectid, saporg_type: org.objecttype, sapparent_id: org.rel_obj_id, 
                                         name_ka: org.organization.name_ka, name_ru: org.organization.name_ru, 
                                         is_manager: org.organization.is_manager?, priority: org.priority)
           neworg.save
        end
      else
        neworg = HR::Organization.new(is_active: 1, saporg_id: org.objectid, saporg_type: org.objecttype, sapparent_id: org.rel_obj_id, 
                                      name_ka: org.organization.name_ka, name_ru: org.organization.name_ru, 
                                      is_manager: org.organization.is_manager?, priority: org.priority)
        neworg.save
      end
    end

    # delete old organizations
    HR::Organization.active.each do | org |
      if !Sap::Relation.current_structure.where(objectid: org.saporg_id, objecttype: org.saporg_type).any?
        org.is_active = 0
        org.save
      end
    end
    
    # update parent ID's
    HR::Organization.active.each do | org |
      relorg = HR::Organization.where(saporg_id: org.sapparent_id, is_active: 1).first
      if relorg
        org.parent_id = relorg.id
        org.save
      end
    end

    #Employees
    Sap::Person.current.each do | per |
      next unless per.org

      existed_per = HR::Employee.active.where(person_id: per.person_id).first
      if existed_per
        if existed_per.person_id     != per.person_id ||
           existed_per.first_name_ka != per.first_name_ka ||
           existed_per.last_name_ka  != per.last_name_ka ||
           existed_per.first_name_ru != per.first_name_ru || 
           existed_per.last_name_ru  != per.last_name_ru ||
           existed_per.organization_id != per.org_id
           existed_per.employee_status_id != per.status

           existed_per.is_active = 0
           existed_per.save

           newper = HR::Employee.new(person_id: per.person_id, is_active: 1, 
                                     first_name_ka: per.first_name_ka, last_name_ka: per.last_name_ka,
                                     first_name_ru: per.first_name_ru, last_name_ru: per.last_name_ru, 
                                     organization_id: per.org_id,
                                     employee_status_id: per.status)
           newper.save
        end
      else
        newper = HR::Employee.new(person_id: per.person_id, is_active: 1, 
                                  first_name_ka: per.first_name_ka, last_name_ka: per.last_name_ka,
                                  first_name_ru: per.first_name_ru, last_name_ru: per.last_name_ru, 
                                  organization_id: per.org_id,
                                  employee_status_id: per.status)
        newper.save       
      end
    end

  end
end
