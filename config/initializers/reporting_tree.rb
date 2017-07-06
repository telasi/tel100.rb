ReportingTree = { root: true, :children => [{
									:name_ka =>	"რუსული დოკუმენტების მიბმა",
									:name_ru =>	"Загрузка русских документов",
									:operation => "rus_doc_attach",
									:leaf => true,
								   },{
									 :name_ka => "ატვირთული დოკუმენტების სია",
									 :name_ru =>	"Список загруженных документов",
									 :operation => "attached_docs",
									 :leaf => true
							       },
								 ]}


							 #   ,{
								# name:	"ატვირთული დოკუმენტების სია",
								# operation: "attached_docs",
								# leaf: true
							 #   },{
								# name:	"სემეკი",
								# children: {{ name: "დოკუმენტები",
								# 			 operation: "gnerc_report",
								# 			 leaf: true }}
							 #   },{ 
								# name: "Резолюции",
								# children: {{  name: "Резолюции",
								# 		      operation: "resolution_by_user",
								# 		      leaf: true },
								# 			{ name: "Резолюции 2",
								# 		      operation: "resolution_by_doc",
								# 		      leaf: true }} 
							 #   }} }