class FileMoveWorker
  include Sidekiq::Worker

  def perform(folder, act, file = nil)
  	if act == 'archive'
  		archived = 0
  	else 
  		archived = 1
  	end

  	if file.present? and file == 'history'
  		Document::History::File.where("folder = :month and archived = :archived", month: folder, archived: archived).map{ |f| f.send(act) }
    else
    	Document::File.where("folder = :month and archived = :archived", month: folder, archived: archived).map{ |f| f.send(act) }
    end
 	
  end
end