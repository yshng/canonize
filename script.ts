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
    dayHead?: string,
    reading: Reading[],
    toDo: ToDo[],
    inClass: string[]
}

interface Week {
    unitHead?: string,
    weekHead?: string,
    days: day[]
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
    const basicInfo = document.querySelector("#basic-info");
    if (basicInfo === null) {
        console.log("No div with ID basic-info")
    } else {
        const courseTitle = document.createElement("h1");
        courseTitle.textContent = syl.courseTitle;
        basicInfo.appendChild(courseTitle);

        const meetingInfo = document.createElement("div");
        meetingInfo.classList.add("meeting-info");
        
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

        basicInfo.appendChild(meetingInfo);

        const courseDescriptionHead = document.createElement("h2");
        courseDescriptionHead.textContent = "Course Description";
        const courseDescription = document.createElement("p");
        courseDescription.textContent = syl.courseDescription;
        basicInfo.appendChild(courseDescriptionHead);
        basicInfo.appendChild(courseDescription);
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

        if (week.hasOwnProperty("weekHead")) {
            const weekHead = document.createElement("p");
            weekHead.textContent = `Week ${weekCount}: ` + week.weekHead;
            parent.appendChild(weekHead);
        }

    })
  }

  populate();