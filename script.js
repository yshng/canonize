"use strict";
// Type Definitions
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Generating HTML syllabus from JSON
function populate() {
    return __awaiter(this, void 0, void 0, function* () {
        const requestURL = "https://yshng.github.io/canonize/sample.json";
        const request = new Request(requestURL);
        const response = yield fetch(request);
        const syllabus = yield response.json();
        populateHeader(syllabus);
        populatePolicies(syllabus);
        populateSchedule(syllabus);
    });
}
function populateHeader(syl) {
    const basicInfo = document.querySelector("#basic-info");
    if (basicInfo === null) {
        console.log("No div with ID basic-info");
    }
    else {
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
function populatePolicies(syl) {
    const policies = document.createElement("div");
    policies.setAttribute("id", "policies");
    syl.policies.forEach((policy) => {
        generatePolicy(policy, policies, 2);
    });
    container === null || container === void 0 ? void 0 : container.appendChild(policies);
}
function generatePolicy(pol, parent, hlevel) {
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
function populateSchedule(syl) {
    const schedule = document.createElement("div");
    schedule.setAttribute("id", "schedule");
    const head = document.createElement("h2");
    head.textContent = "Schedule";
    schedule.appendChild(head);
    generateWeeks(syl, schedule);
    container === null || container === void 0 ? void 0 : container.appendChild(schedule);
}
function generateWeeks(syl, parent) {
    let unitCount = 0;
    let weekCount = 0;
    syl.schedule.forEach((week) => {
        if (week.hasOwnProperty("unitHead")) {
            unitCount++;
            const unitHead = document.createElement("h3");
            unitHead.textContent = `Part ${unitCount}: ` + week.unitHead;
            parent.appendChild(unitHead);
        }
        weekCount++;
        const weekDiv = document.createElement("div");
        weekDiv.classList.add("week");
        weekDiv.setAttribute("id", `week${weekCount}`);
        if (week.hasOwnProperty("weekHead")) {
            const weekHead = document.createElement("p");
            weekHead.textContent = `Week ${weekCount}: ` + week.weekHead;
            parent.appendChild(weekHead);
        }
        // generateDays(week,weekdiv);
    });
}
function generateDays(week, parent) {
    week.days.forEach((day) => {
        const head = document.createElement("p");
        head.classList.add("day-head");
        // const date = meetingDates.shift();
        // head.textContent = date;
        if (day.hasOwnProperty("dayhead")) {
            head.textContent += ": " + day.dayHead;
        }
        parent.appendChild(head);
        const assignList = document.createElement("ul");
        assignList.classList.add("assign");
        generateReading(day, assignList);
        generateToDo(day, assignList);
        generateInClass(day, assignList);
        parent.appendChild(assignList);
    });
}
function generateReading(day, parent) {
}
function generateToDo(day, parent) {
}
function generateInClass(day, parent) {
}
// create an array of the meeting dates from the beginning to end of term
// function generateDates(start: Date,end: Date, meetings: string[]): Date[] {}
populate();
