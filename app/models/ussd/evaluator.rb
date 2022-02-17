class Ussd::Evaluator
    NOTIF_HEADER_QUALITY         = 'ussd_quality_issue'
    NOTIF_HEADER_READING         = 'ussd_reading_issue'

    NOTIF_TYPE_LOW_VOLTAGE       = 'low_voltage'
    NOTIF_TYPE_FREQUENT_OUTAGES  = 'frequent_outages'
    NOTIF_TYPE_UNSTAABLE_VOLTAGE = 'unstable_voltage'
    NOTIF_TYPE_HIGH_VOLTAGE      = 'high_voltage'
    NOTIF_TYPE_INCORRECT_TARRIF  = 'incorrect_tariff'
    NOTIF_TYPE_NO_BILL           = 'no_bill'
    NOTIF_TYPE_HIGH_READING      = 'high_reading'
    NOTIF_TYPE_MAINTENANCE_FEES  = 'maintenance_fees'
    NOTIF_TYPE_DEPOSIT_BILL      = 'deposit_bill'
    NOTIF_TYPE_LOW_READING       = 'low_reading'

    DOC_GNERC_TYPE_4             = 'momxmareblis gancxadeba'
    DOC_GNERC_TYPE_5             = 'teqnikuri xarisxis shemowmeba'
    TELMICO                      = 'TELMICO MAIL'

    DOC_GNERC_SUBTYPE_1          = 'momaragebis khshiri tskveta'
    DOC_GNERC_SUBTYPE_2          = 'tanxis koreqcia'

    USER_CALCELARIA              = 'saqmis warmoeba'
    USER_BC_MANAGER              = 'BC menejeri'

    def initialize(params)
        @config = Ussd::Config.where(notif_header: params[notif_header], notif_type: params[:notif_type]).first
        raise 'Wrong parameters' unless @config

        @accnumb = params[:accnumb]
        @bc = params[:bc]
    end

    def document_type
        case self.config.teldoc_sakheoba
        when DOC_GNERC_TYPE_4 then GNERC_TYPE4
        when DOC_GNERC_TYPE_5 then GNERC_TYPE5
        end
    end

    def document_subtype
        case self.config.teldoc_qvesakheoba
        when DOC_GNERC_SUBTYPE_1 then GNERC_SUBTYPE_CUT
        when DOC_GNERC_SUBTYPE_2 then GNERC_SUBTYPE_CORRECTION
        else null
        end
    end

    def sender
        case self.config.iniciatori
            when USER_CALCELARIA then AUTO_SIGNEE
            when USER_BC_MANAGER then bc_manager
        end
    end

    def actual_sender
        case self.config.iniciatori
            when USER_CALCELARIA then AUTO_SIGNEE
            when USER_BC_MANAGER then bc_manager
        end
    end

    def signee
        case self.config.vizatori
        when USER_CALCELARIA then AUTO_SIGNEE
        when USER_BC_MANAGER then bc_manager
        end
    end

    def assignee
        case self.config.adresati
        when USER_CALCELARIA then AUTO_SIGNEE
        when USER_BC_MANAGER then bc_manager
        end
    end

    def bc_manager
        bc_hr_name = BS_BUSINESS_CENTERS_MAPPER[@bc]
        organization = HR::Organization.where(name_ka: bc_hr_name, is_active: 1).first unless bc_hr_name
        position = HR::Organization.where(parent_id: organization.id, is_active: 1, is_manager: 1).first unless organization
        employee = HR::Employee.where(organization_id: position.id, is_active: 1).first unless position
        employee.user_id unless employee
    end
end