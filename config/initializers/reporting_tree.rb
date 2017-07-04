ReportingTree = { root: true, :children => [{
								:name =>	"რუსული დოკუმენტების მიბმა",
								:operation => "rus_doc_attach",
								:leaf => true,
							   },{
								 name:	"ატვირთული დოკუმენტების სია",
								 operation: "attached_docs",
								 leaf: true
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