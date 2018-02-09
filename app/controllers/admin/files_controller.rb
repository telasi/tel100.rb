# -*- encoding : utf-8 -*-
class Admin::FilesController < AdminController
  def index
    @title = 'ფაილების მართვა'

    @busyfolders = []
    
    workers = Sidekiq::Workers.new
    if workers.present?
      workers.each do |process_id, thread_id, work|
        if work["payload"]["class"] == 'FileMoveWorker'
          @busyfolders << work["payload"]["args"][0]
        end
      end
    end

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

  def move
    FileMoveWorker.perform_async(params[:folder], params[:act], params[:file])
    redirect_to admin_files_url
  end

  private

  def folders_array(year = nil)
    if year.present?
      query = "select * from ( select to_char(created_at, 'YYYYMM') as gfolder, archived, 'file' as fi
                                 from document_file f 
                                 where to_char(created_at, 'YYYY') = '#{year}')
                                 pivot (count(*) for archived in (1 as archived, 0 as notarchived))
               union 
               select * from ( select to_char(created_at, 'YYYYMM') as gfolder, archived, 'file_history' as fi
                                 from document_file_history f 
                                 where to_char(created_at, 'YYYY') = '#{year}')
                                 pivot (count(*) for archived in (1 as archived, 0 as notarchived))"
    else
      query = "select * from ( select to_char(created_at, 'YYYYMM') as gfolder, archived, 'file' as fi
                                from document_file f )
                                pivot (count(*) for archived in (1 as archived, 0 as notarchived))
                union select *  from ( select to_char(created_at, 'YYYYMM') as gfolder, archived, 'file_history' as fi
                                         from document_file_history f )
                                         pivot (count(*) for archived in (1 as archived, 0 as notarchived))"
    end
    array = ActiveRecord::Base.connection.exec_query(query).to_a
    array.sort_by{ |x| [x['fi'], x['gfolder']] }
  end

end