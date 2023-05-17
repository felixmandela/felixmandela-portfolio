const testimonials = [
    {
        name: "Felix Mandela",
        role: "Product Owner, Employment Hero",
        message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        image: "#"
    },
    {
        name: "Felix Mandela 2",
        role: "Product Owner, Employment Hero",
        message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        image: "#"
    },
    {
        name: "Felix Mandela 3",
        role: "Product Owner, Employment Hero",
        message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        image: "#"
    },
    {
        name: "Felix Mandela 4",
        role: "Product Owner, Employment Hero",
        message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum loremlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        image: "#"
    }
]


const arrowBefore = document.getElementById("arrow-before")
const arrowNext = document.getElementById("arrow-next")
let currentSlide = 0
let testimonialsBox = document.getElementById("testimonials-box")
let testimonialsDots = document.getElementById("testimonials-dots")
let totalDots = "";


// add numbe of dots according to the number of testimonial
for (let i = 0; i < testimonials.length; i++) {
    totalDots += `<span class="dot"></span>`
}
testimonialsDots.innerHTML = totalDots

// get the HTML colletion from the created dot before
let dots = document.getElementsByClassName("dot")

// add event listener for each dot, when clicked -> update the page to have the slide and active dot updated
for (let i = 0; i < testimonials.length; i++) {
    dots[i].addEventListener("click", () => { currentSlide = i; updatePage() })
}

//add event listener for the prev and next arrow button
arrowBefore.addEventListener("click", () => { currentSlide -= 1; updatePage() })
arrowNext.addEventListener("click", () => { currentSlide += 1; updatePage() })


function getCurrentSlide() {
    if (currentSlide >= testimonials.length) {
        currentSlide = 0
    }
    if (currentSlide < 0) {
        currentSlide = testimonials.length - 1
    }
}

function getCurrentTestimonial() {
    testimonialsBox.style.opacity = 0
    setTimeout(() => {
        testimonialsBox.style.opacity = 1
        testimonialsBox.innerHTML = `<div class="testimonial-quote"></div>
    <p id="testimonial-message">${testimonials[currentSlide].message}</p>
    <img src="${testimonials[currentSlide].image}" id="testimonial-image">
    <h3 id="testimonial-name">${testimonials[currentSlide].name}</h3>
    <p id="testimonial-role">${testimonials[currentSlide].role}</p>`
    }, 400);
}

function getActiveDot() {
    for (let i = 0; i < testimonials.length; i++) {
        dots[i].classList.remove("active")
    }
    dots[currentSlide].classList.add("active")
}

function updatePage() {
    getCurrentSlide()
    getCurrentTestimonial()
    getActiveDot()
}

window.addEventListener('scroll', scrollAnimation1)


function scrollAnimation1() {
    if (window.scrollY <= 200) {
        document.getElementById("header").style.transform = ""
        document.getElementById("nav-links").style.transform = ""
    }
    if (window.scrollY > 300) {
        document.getElementById("header").style.transform = "translateY(-30px)"
        document.getElementById("nav-links").style.transform = "translateX(120px)"
    }
    if (window.scrollY > 450) {
        document.getElementById("header").style.transform = "translateY(-70px)"
    }
}

function scrollAnimation2() {
    if (window.scrollY <= 200) {
        document.getElementById("nav-links").style.transform = ""
    }
    if (window.scrollY > 300) {
        document.getElementById("nav-links").style.transform = "translateX(120px)"
    }
}

function runScrollAnimation() {

}

window.onload = updatePage;