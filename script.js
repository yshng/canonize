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
        //populateSchedule(syllabus);
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
function populatePolicies(syl) {
    const container = document.querySelector("main");
    if (container !== null) {
        syl.policies.forEach((policy) => {
            generatePolicy(policy, container, 2);
        });
    }
}
function generatePolicy(pol, parent, hlevel) {
    const policy = document.createElement("div");
    policy.classList.add("policy");
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
populate();
