# canonize
syllabus generation, management, and more??

## Definition

to generate a SYLLABUS, we can specify: 

### Basic Course Information

* Course title (str), the title of the course 
* Instructor (str), first and last name of instructor
* Course description (str), a paragraph or more describing the topic, learning objectives, and learning modalities of the course

### Meeting Pattern Information

* Term (str), e.g. Fall, Spring, Michaelmas, etc.
* Year (str) 
* First meeting day (date)
* Last meeting day (date)
* Meeting days ([num]), the days of the week on which the course meets weekly, represented by the numbers 0-6
* Start time (time), when meetings begin
* End time (time), when meetings end
* Location (str), where meetings take place (optional)

### Class Policies (Policy[])

Any number of policy sections, each having a heading, 1 or more paragraphs of body text under each heading, and 0 or more sub-policy sections, defined recursively. Common sections include: 

* Attendance and Participation
* Technology Use
* Accessibility
* Late Work 
* Grading Rubric
* Assignments

### Schedule (Week[])

The schedule will list every meeting of the course by week. Each week will have an optional unit heading, optional week heading, and array of days. Each meeting day will have associated with it a list of readings to be completed in preparation for that day, a list of activities to be expected during class time, and/or a list of assignments, each with an associated due date. Each day will also have an optional heading field, and an optional unit heading field, for units beginning mid-week. 
