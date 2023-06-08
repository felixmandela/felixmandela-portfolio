// navbar animation
window.addEventListener('scroll', scrollAnimation)
let currPos = window.scrollY

function scrollAnimation() {
    const nameHide = document.getElementsByClassName("name-hide")
    const nameInitialTwo = document.getElementById("name-initial-2")
    const navLinks = document.getElementById("nav-links")
    const siteTitle = document.getElementById("site-title")
    const header = document.getElementById("header")
    const containerWidth = document.getElementById("nav-container").clientWidth
    let mediaQuery1 = 650;
    const screenWidth = window.innerWidth
    const animationDelay = 0.25

    function animationNumber(n) {
        return 0 + (animationDelay * n)
    }

    function setAnimation(elementStyle, elementName, styleValue, animationDelay) {
        elementName.style[elementStyle] = styleValue
        elementName.style.transitionDelay = `${animationDelay}s`
    }

    function scrollUpAnimation() {
        // show header
        setAnimation("transform", header, "", animationNumber(0))

        // move back the text to the original place
        setAnimation("transform", siteTitle, "", animationNumber(1))
        setAnimation("transform", nameInitialTwo, "", animationNumber(2))

        // make the text visible
        setAnimation("opacity", navLinks, "1", animationNumber(2))
        for (let i = 0; i < nameHide.length; i++) {
            setAnimation("opacity", nameHide[i], "1", animationNumber(2))
        }
    }

    function scrollDownAnimation() {
        // make text invisible
        setAnimation("opacity", navLinks, "0", animationNumber(0))
        for (let i = 0; i < nameHide.length; i++) {
            setAnimation("opacity", nameHide[i], "0", animationNumber(0))
        }

        // move the text
        setAnimation("transform", nameInitialTwo, "translateX(-37px)", animationNumber(0))
        setAnimation("transform", siteTitle, `translateX(${(containerWidth / 2) - 15}px)`, animationNumber(1))

        // hide header
        setAnimation("transform", header, "translateY(-100px)", animationNumber(2))
    }
    if (window.scrollY > 450) {
        if (screenWidth >= mediaQuery1) {
            // scroll up
            if (window.scrollY < currPos) {
                scrollUpAnimation()
            } else {
                // scroll down
                scrollDownAnimation()
            }
        } else {
            // reset position
            setAnimation("transform", siteTitle, "", animationNumber(0))
            // scroll up
            if (window.scrollY < currPos) {
                // show header
                setAnimation("transform", header, "", animationNumber(0))
            } else {
                // scroll down
                // hide header
                setAnimation("transform", header, "translateY(-100px)", animationNumber(0))
            }
        }
        currPos = window.scrollY
    }
}


// burger animation
const burger = document.getElementById("burger")
const navLinks = document.getElementById("nav-links")
const navLinksWrapper = document.getElementById("nav-links-wrapper")

function hideNavLinks() {
    navLinks.style.display = "none"
}
function showNavLinks() {
    navLinks.style.display = "flex"
}
burger.addEventListener("click", () => {
    if (navLinks.style.display === "flex") {
        hideNavLinks();
    } else { showNavLinks() }
})

// click outside the burger area will close it
window.addEventListener("click", e => {
    const isClickInside = navLinksWrapper.contains(e.target)
    if (!isClickInside) {
        hideNavLinks();
    }
})

// responsive, resize screen will reset the navlinks visibility
window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
        showNavLinks();
    } else hideNavLinks();
})





// testimonials slide animation
const testimonials = [
    {
        name: "Duy Duhwee Pham",
        role: "Product Manager, Bootloader",
        message: "I admire him for always staying cool, considering everything we went through together at HReasily. You can always count on him to keep it real — he doesn't sugarcoat anything — something I think is vital in the product line of work. Felix always reliably delivers what was agreed upon, and I think you will find the same thing if you have the chance to work with him.",
        image: "Assets/Image/Duhwee.png"
    },
    {
        name: "Cheryl Chen",
        role: "Product Owner, HReasily",
        message: "I had the opportunity to work with Felix in HREasily & he definitely delivers impressive work! Felix was able to currently manage multiple key product modules very well - which benefits all users that uses the product! Felix works very well as an individual contributor to the team as well as working in a team setting! I have sat in multiple meetings that Felix has with his development team and he is able to articulate the business needs and translate it accordingly for the dev team to work on. I see Felix as a valued team player and will definitely work well and easily in any team :-)",
        image: "Assets/Image/Cheryl.jpg"
    },
    {
        name: "Kent Kent",
        role: "Fullstack Engineer, Orangekloud",
        message: "Felix has a remarkable ability to understand the needs of our customers and translate them into clear and actionable product requirements. He possesses a keen eye for detail and is adept at creating well-defined user stories, prioritizing features, and managing the product backlog. His deep understanding of agile methodologies and product development processes enables him to effectively lead cross-functional teams and deliver high-quality products on time.",
        image: "Assets/Image/Kent.jpg"
    }
]


const arrowBefore = document.getElementById("arrow-before")
const arrowNext = document.getElementById("arrow-next")
let currentSlide = 0
let testimonialsBox = document.getElementById("testimonials-box")
let testimonialsDots = document.getElementById("testimonials-dots")
let totalDots = "";


// add number of dots according to the number of testimonial
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

window.onload = updatePage;
