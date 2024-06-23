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
    heading?: string,
    reading: Reading[],
    toDo: ToDo[],
    inClass: string[]
}

interface Week {
    heading?: string,
    day1: Day,
    day2?: Day,
    day3?: Day,
    day4?: Day,
    day5?: Day,
    day6?: Day,
    day7?: Day
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
    const requestURL =
      "https://yshng.github.io/canonize/sample.json";
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    const syllabus = await response.json();
    
    populateHeader(syllabus);
    //populatePolicies(syllabus);
    //populateSchedule(syllabus);
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
        meetingDays.textContent = syl.
    }
  }

  populate();