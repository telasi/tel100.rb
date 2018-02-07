# -*- encoding : utf-8 -*-
class Admin::FilesController < AdminController
  def index
    @title = 'ფაილების მართვა'
    query = "select *
              from ( select to_char(created_at, 'YYYYMM') as gfolder, archived
                      from document_file f )
              pivot (count(*) for archived in (1 as archived, 0 as notarchived))
              order by gfolder"
    @array = folders_array
  end

  def distribute(year)
    months = folders_array(year)
    months.each do |month|
      new_folder = File.join(FILES_REPOSITORY, month["gfolder"])
      FileUtils.mkdir_p(new_folder)

      files = Document::File.where("TO_CHAR(created_at, 'YYYYMM') = :month", month: month["gfolder"])
      files.each do |file|
        old_path = file.full_path
        file.folder = month["gfolder"]
        new_path = file.full_path
        begin
           FileUtils.move(old_path, new_path)
        rescue
        end
        file.save
      end
    end
  end

  private

  def folders_array(year = nil)
    if year.present?
      query = "select *
                from ( select to_char(created_at, 'YYYYMM') as gfolder, archived
                        from document_file f 
                        where to_char(created_at, 'YYYY') = '#{year}')
                pivot (count(*) for archived in (1 as archived, 0 as notarchived))
                order by gfolder"
    else
      query = "select *
                from ( select to_char(created_at, 'YYYYMM') as gfolder, archived
                        from document_file f )
                pivot (count(*) for archived in (1 as archived, 0 as notarchived))
                order by gfolder"
    end
    ActiveRecord::Base.connection.exec_query(query).to_a
  end

end