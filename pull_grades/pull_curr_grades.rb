#################################################################################
#	Script takes a list of student names and their Canvas Ids and generates #
#	a grade report. The input file needs 2 fields with the headers: User	#
#	and Canvas_Id. The report that is generated contains 3 columns: Name,	#
#	course and current grade.						#
#################################################################################

# import gems
require 'typhoeus'
require 'json'
require 'csv'

time = Time.new
date = "#{time.month}.#{time.day}.#{time.year}"

$canvas_url = 'https://XXXXXX.instructure.com' # put full canvas test url eg: https://school.test.instructure.com
$canvas_token = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' # put canvas API token here
output_file = "jumpstart_grades_#{date}.csv" #name of export file. Will save to same folder as script
input_file = 'user_ids.csv'  #student's Canvas Ids. If the file is not in the same directory as the script, change this to the full file path 


def get_course_name(id)
	course_name =''
	get_course = Typhoeus::Request.new(
		"#{$canvas_url}/api/v1/courses/#{id}",
		method: :get,
		headers: { authorization: "Bearer #{$canvas_token}" },
	)
	
	get_course.on_complete do |response|
		data = JSON.parse(response.body)
		course_name = data['name']
		end
		
	get_course.run
		return course_name
end


#create headers in output file
CSV.open(output_file, 'wb') do |csv|
    csv << ["Course", "Student", "Current Grade"]
end

puts "\nGrade report is running. Please wait . . .\n"

CSV.foreach(input_file, :headers => true) do |row|
    canvas_user_id = row['Canvas_Id']
	student_name = row['User']
	
	get_grades = Typhoeus::Request.new(
            "#{$canvas_url}/api/v1/users/#{canvas_user_id}/enrollments",
            method: :get,
            headers: { authorization: "Bearer #{$canvas_token}" },
            params: {
				"enrollment_state" => "active",
				"type" => "StudentEnrollment"
            }
            )
	
	get_grades.on_complete do |response|
            if response.code == 200
                data = JSON.parse(response.body)
				data.each do |enrollments|
					grade = enrollments['grades']
					if grade['current_score'] != nil
						current_grade = grade['current_score']
					else
						current_grade = 'No Grade Yet'
					end

					course_name = get_course_name(enrollments['course_id'])
					
					#append data to output file
					CSV.open(output_file, 'a') do |csv|
						csv << [course_name, student_name, current_grade]
					 end
					
				end	
			else
                puts "Response code was #{response.code}"
            end

			
           end
     
        get_grades.run
		
		end
		
		puts "Grade report is complete"
   

