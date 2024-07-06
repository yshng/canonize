// Type Definitions

interface Reading {
    biblio: string,             // full citation, 
    // biblio will probably get its own type later
    pages?: number[] | string,   // [first page, last page]
    location?: string,           // where students can access the document
    required?: boolean
}

interface ToDo {
    assignment: string,
    dueDate: Date
}

interface Day {
    unitHead?: string,
    dayHead?: string,
    reading: Reading[],
    toDo: ToDo[],
    inClass: string[]
}

interface Week {
    unitHead?: string,
    weekHead?: string,
    days: Day[]
}

interface Policy {
    heading: string,
    body: string,
    subpolicy?: Policy[]
}

interface Syllabus {
    courseTitle: string,
    instructor: string,
    courseDescription: string,
    termName: string,
    termYear: string,
    firstDay: Date,
    lastDay: Date,
    meetingDays: string[],
    startTime: Date,
    endTime: Date,
    location: string,
    policies: Policy[],
    schedule: Week[]
}

// Generating HTML syllabus from JSON

async function populate() {
    const requestURL = "https://yshng.github.io/canonize/sample.json";
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    const syllabus = await response.json();
    
    populateHeader(syllabus);
    populatePolicies(syllabus);
    populateSchedule(syllabus);
  }

  function populateHeader(syl: Syllabus) {
    const header = document.querySelector("header");
    if (header === null) {
        console.log("No header div");
    } else {
        const courseTitle = document.createElement("h1");
        courseTitle.textContent = syl.courseTitle;
        header.appendChild(courseTitle);

        const meetingInfo = document.createElement("div");
        meetingInfo.classList.add("meeting-info");

        const instructor = document.createElement("p");
        instructor.textContent = syl.instructor;
        meetingInfo.appendChild(instructor);
        
        const term = document.createElement("p");
        term.textContent = syl.termName + " " + syl.termYear;
        meetingInfo.appendChild(term);

        const meetingDays = document.createElement("p");
        meetingDays.textContent = syl.meetingDays.join(" and ");
        meetingDays.textContent += ", " + syl.startTime + "–" + syl.endTime;
        meetingInfo.appendChild(meetingDays);

        const location = document.createElement("p");
        location.textContent = syl.location;
        meetingInfo.appendChild(location);

        header.appendChild(meetingInfo);

        const courseDescriptionHead = document.createElement("h2");
        courseDescriptionHead.textContent = "Course Description";
        const courseDescription = document.createElement("p");
        courseDescription.textContent = syl.courseDescription;
        header.appendChild(courseDescriptionHead);
        header.appendChild(courseDescription);
    }
  }

  const container = document.querySelector("main");

  function populatePolicies(syl: Syllabus) {
    const policies = document.createElement("div");
    policies.setAttribute("id","policies");
    syl.policies.forEach( (policy) => { 
        generatePolicy(policy, policies, 2);
        })
    container?.appendChild(policies);
    
  }

  function generatePolicy(pol: Policy, parent: Element, hlevel: number) {
    const policy = document.createElement("div");
    const Head = document.createElement(`h${hlevel}`);
    Head.textContent = pol.heading;
    const Body = document.createElement("p");
    Body.textContent = pol.body;
    policy.appendChild(Head);
    policy.appendChild(Body);
    parent.appendChild(policy);

    if (pol.hasOwnProperty("subpolicy") && pol.subpolicy !== undefined) {
        hlevel++;
        pol.subpolicy.forEach((subpolicy) => generatePolicy(subpolicy, policy, hlevel));
    }
  }

  function populateSchedule(syl: Syllabus) {
    const schedule = document.createElement("div");
    schedule.setAttribute("id","schedule");
    const head = document.createElement("h2");
    head.textContent = "Schedule";
    schedule.appendChild(head);
    generateWeeks(syl,schedule);
    container?.appendChild(schedule);
  }

  function generateWeeks(syl: Syllabus, parent: Element) {

    let unitCount = 0;
    let weekCount = 0;
    syl.schedule.forEach( (week) => {

        if (week.hasOwnProperty("unitHead")){
            unitCount++;
            const unitHead = document.createElement("h3");
            unitHead.textContent = `Part ${unitCount}: ` + week.unitHead;
            parent.appendChild(unitHead);
        }

        weekCount++;

        const weekDiv = document.createElement("div");
        weekDiv.classList.add("week");
        weekDiv.setAttribute("id",`week${weekCount}`);

        const weekHead = document.createElement("p");
        weekHead.classList.add("week-head");
        weekHead.textContent = `Week ${weekCount}`;

        if (week.hasOwnProperty("weekHead")) {
            weekHead.textContent += `: ${week.weekHead}`;
        }
        weekDiv.appendChild(weekHead);
        generateDays(week,weekDiv);
        parent.append(weekDiv);

    })
  }


function generateDays(week: Week, parent: Element) {

    
    let dayCount = 0;
    week.days.forEach( (day) => {
        
        if (day.hasOwnProperty("unitHead")){
            unitCount++;
            const unitHead = document.createElement("h3");
            unitHead.textContent = `Part ${unitCount}: ` + week.unitHead;
            parent.appendChild(unitHead);
        }
        
        dayCount++;
        const head = document.createElement("p");
        head.classList.add("day-head");
        // const date = meetingDates.shift();
        // head.textContent = date;
        head.textContent = `Day ${dayCount}`;
        if (day.hasOwnProperty("dayHead")) {
            head.textContent += ": " + day.dayHead;   
        }
        parent.appendChild(head);

        const assignList = document.createElement("ul");
        assignList.classList.add("assign");
        generateReading(day,assignList);
        generateToDo(day,assignList);
        generateInClass(day,assignList);
        parent.appendChild(assignList);
        
    })
}

function generateReading(day: Day, parent: Element) {
    day.reading.forEach( (reading) => {
        const li = document.createElement("li");
        li.classList.add("read");
        if (reading.required) {li.classList.add("required");}
        li.textContent = reading.biblio;
        if(reading.hasOwnProperty("pages")) {
            li.textContent += ", " + reading.pages;
        }
        if(reading.hasOwnProperty("location")) {
            li.textContent += ` [${reading.location}]`;
        }
        parent.appendChild(li);
    })
}

function generateToDo(day: Day, parent: Element) {
    day.toDo.forEach ( (todo) => {
        const li = document.createElement("li");
        li.classList.add("do");
        li.textContent = todo.assignment + " ";
        const due = document.createElement("span");
        due.classList.add("due-date");
        const dueDate = new Date(todo.dueDate);
        due.textContent = `Due: ${dueDate.toLocaleString()}`;
        li.appendChild(due);
        parent.appendChild(li);
        
    })

}

function generateInClass(day: Day, parent: Element) {
    day.inClass.forEach ( (activity) => {
        const li = document.createElement("li");
        li.classList.add("in-class");
        li.textContent = activity;
        parent.appendChild(li);
    })


}

// create an array of the meeting dates from the beginning to end of term
// function generateDates(start: Date,end: Date, meetings: string[]): Date[] {}

  populate();
