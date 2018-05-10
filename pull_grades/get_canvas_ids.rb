#############################################################################
#	Script takes a list of SIS_Id's and outputs a csv list of Canvas ID's   #
#	to use in the pull_curr_grade.rb script. Uses the sis_user_id parameter #
#	to identify HCPSS students. This data can also be the	 				#
#	integration_id or login_id, but the column header should remain SIS_Id	#
#############################################################################

# import gems
require 'typhoeus'
require 'json'
require 'csv'

$canvas_url = 'https://XXXXXX.instructure.com'   #update the url to your instance 
$canvas_token = 'XXXXXXXXXXXXXXXXXXXX'		#Enter your canvas token
output_file = "user_ids.csv" #name of export file. Will save to same folder as script
input_file = 'user_sis_ids.csv' #input file contains 2 fields: SIS_Id and User. If in a differnt directory than the script, change to the full file path


#create headers in output file
CSV.open(output_file, 'w') do |csv|
    csv << ["User", "Canvas_Id"]
end

puts "\nJob is running, please wait . . .\n"

#read input file and iterate through each sis_id
CSV.foreach(input_file, headers: true) do |row|
    sis_id = row['SIS_Id']
	student_name = row['User']
	


get_id = Typhoeus::Request.new( 
			"#{$canvas_url}/api/v1/accounts/1/users",	#search the root account 
            method: :get,
            headers: { authorization: "Bearer #{$canvas_token}" },
            params: {
				"search_term" => sis_id
            }
            )
			
	get_id.on_complete do |response|
		if response.code == 200
		data = JSON.parse(response.body)
		data.each do |users|
			puts "#{student_name}: #{users['id']}"
			
			#append data to output file
			CSV.open(output_file, 'a') do |csv|
				csv << [student_name, users['id']]
			 end
			end
		else
			puts "Error #{response.code}"
		end
	end
	
	get_id.run

	
	end
	
puts "Job complete. Data is in File: #{output_file}"
