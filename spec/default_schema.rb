# -*- encoding : utf-8 -*-
module DefaultSchema
  def create_organization(name, parent_id, type = 'O', manager = false)
    HR::Organization.create({
      name_ka: name,
      parent_id: parent_id,
      saporg_type: type,
      is_manager: (manager ? 1 : 0)
    })
  end

  def create_organizations
    @telasi = create_organization('სს თელასი', nil)
    @it = create_organization('IT', @telasi.id)
    @shalva_s = create_organization('დეპარტამენტის უფროსი', @it.id, 'O', true)

    @devteam = create_organization('პროგრამული დამუშავების განყოფილება', @it.id)
    @dimitri_s = create_organization('პროგრამისტი', @devteam.id, 'S')
    @nino_s = create_organization('პროგრამისტი', @devteam.id, 'S', true)
    @temo_s = create_organization('პროგრამისტი', @devteam.id, 'S')

    @adminteam = create_organization('მონაცემთა ბაზების განყოფილება', @it.id)
    @ilia_s = create_organization('ბაზის ადმინისტრატორი', @adminteam.id, 'S', true)

    @e1_s = create_organization('structure 1', @telasi.id, 'S', true)
    @e2_s = create_organization('structure 2', @telasi.id, 'S')
  end

  def create_employee(personId, firstName, lastName, organization)
    HR::Employee.create({
      first_name_ka: firstName,
      last_name_ka: lastName,
      person_id: personId,
      organization_id: organization.id
    })
  end

  def create_employees
    @dimitri_e = create_employee(3015, 'დიმიტრი', 'ყურაშვილი', @dimitri_s)
    @nino_e    = create_employee(1111, 'ნინო', 'გვაზავა', @nino_s)
    @temo_e    = create_employee(2222, 'თემო', 'ჩუთლაშვილი', @temo_s)
    @ilia_e    = create_employee(3333, 'ილია', 'ლომსაძე', @ilia_s)
    @shalva_e  = create_employee(4444, 'შალვა', 'ესაკია', @shalva_s)
    @empl1     = create_employee(5555, 'user', '1', @e1_s)
    @empl2     = create_employee(6666, 'user', '2', @e2_s)
  end

  def create_user(username, password, employee)
    Sys::User.create(username: username, password: password, employee: employee)
  end

  def create_users
    @dimitri = create_user('dimitri', 'dima123', @dimitri_e)
    @nino = create_user('nino', 'nino123', @nino_e)
    @temo = create_user('temo', 'temo123', @temo_e)
    @ilia = create_user('ilia', 'ilia123', @ilia_e)
    @shalva = create_user('shalva', 'shalva123', @shalva_e)
  end

  def create_document_types
    Document::Type.create(id: 1, name_ka: 'წერილი', order_by: 1)
    Document::Type.create(id: 2, name_ka: 'ბრძანება', order_by: 2)
  end

  module_function :create_organizations
  module_function :create_organization
  module_function :create_employees
  module_function :create_employee
  module_function :create_users
  module_function :create_user
  module_function :create_document_types
end

def create_default_schema
  DefaultSchema.create_organizations
  DefaultSchema.create_employees
  DefaultSchema.create_users
  DefaultSchema.create_document_types
end
