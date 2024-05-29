# syll
syllabus generation, management, and perhaps more

## Definition

a SYLLABUS contains:

Basic Course Information

* Course title (str), the title of the course 
* Instructor (str), first and last name of instructor
* Course description (str), a paragraph or more describing the topic, learning objectives, and learning modalities of the course

Meeting Pattern Information

* Term (str), e.g. Fall, Spring, Michaelmas, etc.
* Year (num)
* First meeting date (date)
* Last meeting date (date)
* Meeting days ([num]), the days of the week on which the course meets weekly, represented by the numbers 0-6
* Start time (time), when meetings begin
* End time (time), when meetings end
* Location (str), where meetings take place (optional)

Class Policies 

Any number of policy sections may be added to a syllabus, each having a heading, 0 or more subheadings, and 1 or more paragraphs of text under each (sub)heading. Common sections include: 

* Attendance and Participation
* Technology Use
* Accessibility
* Late Work 
* Assignments

Schedule 

The schedule will list every meeting of the course by week and by date, each week containing 1 or more meeting days. Each meeting day will have associated with it a list of assignments to be completed in preparation for that day, or that students will be ready to start working on following class that day. (Meetings may be grouped in titled curricular units, sometimes with each week constituting a unit in and of itself. Each week has an optional title field.)