# -*- encoding : utf-8 -*-
module Sap::Synchronizer
  @@date = DateTime.now

  def self.sync
    mandt = '300'

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
    SQL
                 #AND OBJID <> '49999998'
                 #AND OBJID <> '49999999'
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

  def self.updatehr(date)
    # set global date for Sap classes

    Sap::Person.set_date(date)
    # Organizations

    Sap::Relation.current_structure.each do | org |
      existed_org = HR::Organization.active.where(saporg_id: org.objectid, saporg_type: org.objecttype).first
      if existed_org.present?
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
      if org.custom != 1
        if !Sap::Relation.current_structure.where(objectid: org.saporg_id, objecttype: org.saporg_type).any?
          org.is_active = 0
          org.save
        end
      end
    end
    
    # add contractors organization and position if not exists
    #contractor_org = HR::Organization.where(is_active: 1, saporg_type: 'O', saporg_id: Sap::Organization::CONTRACTOR_ORGANIZATION_ID).first
    #if contractor_org.blank?
    #  contractor_org = HR::Organization.new(is_active: 1, saporg_id: Sap::Organization::CONTRACTOR_ORGANIZATION_ID, 
    #                                        saporg_type: 'O', sapparent_id: '1', 
    #                                        name_ka: Sap::Organization::CONTRACTOR_ORGANIZATION_NAME_KA, 
    #                                        name_ru: Sap::Organization::CONTRACTOR_ORGANIZATION_NAME_RU)
    #  contractor_org.save
    #end

    #contractor_shtat = HR::Organization.where(is_active: 1, saporg_type: 'S', saporg_id: Sap::Organization::CONTRACTOR_ORGANIZATION_ID).first
    #if contractor_shtat.blank?
    # contractor_shtat = HR::Organization.new(is_active: 1, saporg_id: Sap::Organization::CONTRACTOR_ORGANIZATION_ID, 
    #                                          saporg_type: 'S', sapparent_id: Sap::Organization::CONTRACTOR_ORGANIZATION_ID, 
    #                                          name_ka: Sap::Organization::CONTRACTOR_ORGANIZATION_NAME_KA, 
    #                                          name_ru: Sap::Organization::CONTRACTOR_ORGANIZATION_NAME_RU)
    #  contractor_shtat.save
    #end

    # add temporary organization and position if not exists
    #temp_org = HR::Organization.where(is_active: 1, saporg_type: 'O', saporg_id: Sap::Organization::TEMP_ORGANIZATION_ID).first
    #if temp_org.blank?
    #  temp_org = HR::Organization.new(is_active: 1, saporg_id: Sap::Organization::TEMP_ORGANIZATION_ID, 
    #                                  saporg_type: 'O', sapparent_id: '1', 
    #                                  name_ka: Sap::Organization::TEMP_ORGANIZATION_NAME_KA, 
    #                                  name_ru: Sap::Organization::TEMP_ORGANIZATION_NAME_RU)
    #  temp_org.save
    #end

    #temp_shtat = HR::Organization.where(is_active: 1, saporg_type: 'S', saporg_id: Sap::Organization::TEMP_ORGANIZATION_ID).first
    #if temp_shtat.blank?
    #  temp_shtat = HR::Organization.new(is_active: 1, saporg_id: Sap::Organization::TEMP_ORGANIZATION_ID, 
    #                                    saporg_type: 'S', sapparent_id: Sap::Organization::TEMP_ORGANIZATION_ID, 
    #                                    name_ka: Sap::Organization::TEMP_ORGANIZATION_NAME_KA, 
    #                                    name_ru: Sap::Organization::TEMP_ORGANIZATION_NAME_RU)
    #  temp_shtat.save
    #end

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

      if per.org.shtat == Sap::Organization::CONTRACTOR_ORGANIZATION_ID
        org_id = contractor_shtat.id
      elsif per.org.shtat == Sap::Organization::TEMP_ORGANIZATION_ID
        org_id = temp_shtat.id
      else
        org_id = per.org_id
      end

      existed_per = HR::Employee.where(is_active: 1).where(person_id: per.person_id).first
      if existed_per.present?
        if existed_per.person_id     != per.person_id ||
           existed_per.first_name_ka != per.first_name_ka ||
           existed_per.last_name_ka  != per.last_name_ka ||
           existed_per.first_name_ru != per.first_name_ru || 
           existed_per.last_name_ru  != per.last_name_ru ||
           existed_per.organization_id != org_id
           existed_per.employee_status_id != per.status

           existed_per.is_active = 0
           existed_per.save

           newper = HR::Employee.new(person_id: per.person_id, is_active: 1, 
                                     first_name_ka: per.first_name_ka, last_name_ka: per.last_name_ka,
                                     first_name_ru: per.first_name_ru, last_name_ru: per.last_name_ru, 
                                     organization_id: org_id,
                                     employee_status_id: per.status)
           newper.save

           sysuser = Sys::User.where(person_id: newper.person_id).first
           if sysuser
             sysuser.employee_id = newper.id
             sysuser.save
             newper.user_id = sysuser.id
             newper.save
           end
        end
      else
        newper = HR::Employee.new(person_id: per.person_id, is_active: 1, 
                                  first_name_ka: per.first_name_ka, last_name_ka: per.last_name_ka,
                                  first_name_ru: per.first_name_ru, last_name_ru: per.last_name_ru, 
                                  organization_id: org_id,
                                  employee_status_id: per.status)
        newper.save

        sysuser = Sys::User.where(person_id: newper.person_id).first
        if sysuser.present?
          sysuser.employee_id = newper.id
          sysuser.save
          newper.user_id = sysuser.id
          newper.save
        end
      end

    end

    $hrstruct_cachedate = nil

  end

  def self.daily_sync
    Sap::Synchronizer.sync
    Sap::Synchronizer.updatehr(DateTime.now)
  end
end
