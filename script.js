/* =========================================
   SLIDESHOW / IMAGE SLIDER
========================================= */

// Select all slides and navigation dots
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");

// Track current slide
let current = 0;

/*
Function: showSlide(index)
Purpose: Display a specific slide and activate the correct dot
*/
function showSlide(index){

  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  // Activate selected slide and dot
  slides[index].classList.add("active");
  dots[index].classList.add("active");

  current = index;
}


/* NEXT BUTTON */
document.querySelector(".next").onclick = function(){

  current++;

  if(current >= slides.length){
    current = 0;
  }

  showSlide(current);
};


/* PREVIOUS BUTTON */
document.querySelector(".prev").onclick = function(){

  current--;

  if(current < 0){
    current = slides.length - 1;
  }

  showSlide(current);
};


/* DOT CLICK NAVIGATION */
dots.forEach((dot,index)=>{

  dot.addEventListener("click",function(){
    showSlide(index);
  });

});


/* AUTO SLIDE EVERY 4 SECONDS */
setInterval(function(){

  current++;

  if(current >= slides.length){
    current = 0;
  }

  showSlide(current);

},4000);

// Show first slide on page load
showSlide(current);



/* =========================================
   MOBILE MENU TOGGLE
========================================= */

const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('active');
});



/* =========================================
   SCROLL ANIMATION
   Elements with data-animate will fade in
========================================= */

const animatedSections = document.querySelectorAll('[data-animate]');

function checkInView() {

  const triggerBottom = window.innerHeight * 0.85;

  animatedSections.forEach(section => {

    const sectionTop = section.getBoundingClientRect().top;

    if(sectionTop < triggerBottom){
      section.classList.add('in-view');
    }

  });
}

// Run animation check
window.addEventListener('scroll', checkInView);
window.addEventListener('load', checkInView);



/* =========================================
   COPY SINGLE QUESTION
========================================= */

function copyText(id) {

  const text = document.getElementById(id)?.innerText;

  if (text) {
    navigator.clipboard.writeText(text);
    alert("Question copied!");
  }

}


/* =========================================
   COPY ALL QUESTIONS
========================================= */

function copyAll() {

  const questions = document.querySelectorAll(".question-box p");
  let allText = "";

  questions.forEach((q) => {
    allText += q.innerText + "\n\n";
  });

  if (allText.trim() !== "") {
    navigator.clipboard.writeText(allText);
    alert("All questions copied!");
  }

}


/* =========================================
   SEARCH QUESTIONS
========================================= */

function searchQuestions() {

  const input = document.getElementById("search").value.toLowerCase();
  const boxes = document.querySelectorAll(".question-box");

  boxes.forEach((box) => {

    const text = box.innerText.toLowerCase();

    box.style.display = text.includes(input) ? "block" : "none";

  });

}


/* =========================================
   ADMIN MODE
   Allows admin to approve questions
========================================= */

function adminMode() {

  const pass = prompt("Admin password:");

  if (pass !== "ADMIN2026") {
    alert("Access denied");
    return;
  }

  const pendingDiv = document.getElementById("pending");
  pendingDiv.innerHTML = "<h3>Pending Questions</h3>";

  const submissions = JSON.parse(localStorage.getItem("submissions")) || [];

  submissions.forEach((item, index) => {

    if (!item.approved) {

      const div = document.createElement("div");
      div.className = "question-box";

      div.innerHTML = `
        <strong>${item.subject}</strong><br>
        ${item.question}<br>
        <em>By ${item.teacher}</em><br><br>
        <button onclick="approveQuestion(${index})">Approve</button>
      `;

      pendingDiv.appendChild(div);

    }

  });

  alert("Admin mode active");
}



/* =========================================
   TEACHER QUESTION SUBMISSION
========================================= */

document.getElementById("teacherForm")?.addEventListener("submit", function (e) {

  e.preventDefault();

  const submission = {

    teacher: teacherName.value,
    subject: subject.value,
    question: questionText.value,
    approved: false

  };

  const submissions = JSON.parse(localStorage.getItem("submissions")) || [];

  submissions.push(submission);

  localStorage.setItem("submissions", JSON.stringify(submissions));

  alert("Question submitted for approval.");

  this.reset();

});


/* =========================================
   APPROVE QUESTION
========================================= */

function approveQuestion(index) {

  const submissions = JSON.parse(localStorage.getItem("submissions"));

  submissions[index].approved = true;

  localStorage.setItem("submissions", JSON.stringify(submissions));

  alert("Question approved. Refresh page.");

}