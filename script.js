"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function populate() {
    return __awaiter(this, void 0, void 0, function* () {
        const requestURL = "https://yshng.github.io/canonize/sample.json";
        const request = new Request(requestURL);
        const response = yield fetch(request);
        const syllabus = yield response.json();
        populateHeader(syllabus);
        //populatePolicies(syllabus);
        //populateSchedule(syllabus);
    });
}
function populateHeader(obj) {
    const basicInfo = document.querySelector("#basic-info");
    if (basicInfo === null) {
        console.log("No div with ID basic-info");
    }
    else {
        const courseTitle = document.createElement("h1");
        courseTitle.textContent = obj.courseTitle;
        basicInfo.appendChild(courseTitle);
        const meetingInfo = document.createElement("div");
        meetingInfo.classList.add("meeting-info");
        const term = document.createElement("p");
        term.textContent = obj.termName + " " + obj.termYear;
        meetingInfo.appendChild(term);
    }
}
populate();
