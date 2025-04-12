document.addEventListener("DOMContentLoaded", function () {
    const selectedCar = localStorage.getItem("selectedCar"); // Retrieve the stored car
    console.log(selectedCar)
    if (selectedCar) {
        document.querySelector(".car").style.backgroundImage = `url(../Images/Cars/car${selectedCar}.png)`; // Apply car image
    }
});

let x_axis = 0;
let y_axis = 0;

document.addEventListener('keydown', (e) => {
    // Move based on arrow keys
    if (e.keyCode === 38) { // Up arrow
        mov_car("up");
    } else if (e.keyCode === 40) { // Down arrow
        mov_car("down");
    } else if (e.keyCode === 37) { // Left arrow
        mov_car("left");
    } else if (e.keyCode === 39) { // Right arrow
        mov_car("right");
    } else if (e.keyCode === 13) { // Enter key
            document.querySelector(".information").innerHTML = "";
            document.querySelector('.information').classList.remove('extra-style');
            checkParkingCollision();
    }
});

function mov_car(direction) {
    // Get container and car dimensions
    const container = document.querySelector('.main-container');
    const car = document.querySelector('.car');
    const containerRect = container.getBoundingClientRect();
    const carRect = car.getBoundingClientRect();

    // Calculate new position
    if (direction === 'right' && (carRect.right + 10 <= containerRect.right)) {
        x_axis += 10;
        $(".car").css({
            "transform": `translate(${x_axis}px, ${y_axis}px) rotate(0deg)`
        });
    } else if (direction === 'left' && (carRect.left - 10 >= containerRect.left)) {
        x_axis -= 10;
        $(".car").css({
            "transform": `translate(${x_axis}px, ${y_axis}px) rotate(180deg)`
        });
    } else if (direction === 'up' && (carRect.top - 10 >= containerRect.top)) {
        y_axis -= 10;
        $(".car").css({
            "transform": `translate(${x_axis}px, ${y_axis}px) rotate(270deg)`
        });
    } else if (direction === 'down' && (carRect.bottom + 10 <= containerRect.bottom)) {
        y_axis += 10;
        $(".car").css({
            "transform": `translate(${x_axis}px, ${y_axis}px) rotate(90deg)`
        });
    }
}

function checkCollision(car, lot) {
    const carRect = car.getBoundingClientRect();
    const lotRect = lot.getBoundingClientRect();

    return (
        carRect.left < lotRect.right - 50 &&
        carRect.right > lotRect.left + 50 &&
        carRect.top < lotRect.bottom - 50 &&
        carRect.bottom > lotRect.top + 50
    );
}

function textTypingEffect(element, text, callback) {
    let i = 0;
    let isTyping = true; // Flag to track if typing is active

    const typingInterval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i === text.length) {
            clearInterval(typingInterval); // Stop typing effect
            isTyping = false; // Mark typing as finished
            callback(); // Trigger the next step
        }
    }, 50); // Typing speed

    // Listen for Enter key but only when typing is active
    function onKeyPress(event) {
        if (event.key === "Enter" && isTyping) {
            clearInterval(typingInterval); // Stop typing effect
            element.textContent = text; // Show full text immediately
            isTyping = false; // Mark typing as finished
            callback(); // Trigger the next step
            document.removeEventListener("keydown", onKeyPress); // Remove event listener
        }
    }

    document.addEventListener("keydown", onKeyPress);
}

function attachInternshipListeners() {
    document.querySelectorAll(".custom-btn").forEach(button => {
        button.addEventListener("click", function () {
            let id = this.getAttribute("data-id");
            let desc = document.getElementById("desc-" + id);

            // Toggle visibility
            if (desc.style.display === "block") {
                desc.style.display = "none";
            } else {
                document.querySelectorAll(".description").forEach(d => d.style.display = "none"); // Hide other descriptions
                desc.style.display = "block";
            }
        });
    });
}

function checkParkingCollision() {
    const car = document.querySelector('.car');
    const parkingLots = document.querySelectorAll('.parking-lot');
    const informationEl = document.querySelector('.information');
    let contentToDisplay = ""; // Initialize content string

    parkingLots.forEach((lot) => {
        if (checkCollision(car, lot)) {
            const detail = lot.dataset.detail;
            if (detail === "education") {
                // Start typing the dynamic text
                textTypingEffect(informationEl, "I completed my schooling in Rose Mary. Now I am doing my bachelor's degree in NEC", () => {
                    // Once typing is done, append static content without removing previous content
                    informationEl.innerHTML += '<p>SSLC: 80%<br>HSC: 80.7%<br>CGPA: 7.8</p><div class="img-container"><img src="../Images/rosemary.jpg"><img src="../Images/national.avif"></div>';
                });
            } else if (detail === "resume") {
                document.querySelector('.information').classList.add('extra-style');
                informationEl.innerHTML = '<a href="../Images/resume.png" download="../Images/resume.png"><img src="../Images/resume.png" class="styled-image" alt="Resume Image"></a><p style="margin:0;">Click on the image to Download</p>';

            } else if (detail === "internships") {
                informationEl.innerHTML = `
                <div class="intern-btn-container">
                    <h1>Internships</h1>
                    <button class="custom-btn btn-11" data-id="1">MERN intern<div class="dot"></div></button>
                    <div class="description" id="desc-1" style="display: none;">Experience: Built a full-stack MERN application with authentication and real-time chat.</div>

                    <button class="custom-btn btn-11" data-id="2">Web Development<div class="dot"></div></button>
                    <div class="description" id="desc-2" style="display: none;">Experience: Developed responsive websites using HTML, CSS, JavaScript, and React.</div>

                    <button class="custom-btn btn-11" data-id="3">Software Developer intern<div class="dot"></div></button>
                    <div class="description" id="desc-3" style="display: none;">Experience: Worked on backend APIs, optimized databases, and implemented security best practices.</div>
                </div>
                `;
                
                attachInternshipListeners();
            } else if (detail === "about me") {
                textTypingEffect(informationEl, "A full-stack developer with a strong focus on the MERN stack. I enjoy building dynamic, scalable web applications and optimizing performance and security. Currently, I’m working on a video streaming platform while exploring Next.js to enhance user experience and efficiency.", () => {
    informationEl.innerHTML+="<p>💡 Passionate about web security, real-time applications, and API integrations<br>🛠️ Skilled in React, Node.js, Express, MongoDB, Next.js, Tailwind CSS<br>🤝 Open to collaborating on MERN projects and innovative web solutions</p>"
                });
            } else if (detail === "skills") {
                contentToDisplay = `
                <div class="skills-container">
                    <div class="technical-container">
                        <p><strong>Technical</strong></p>
                        <p><strong>Languages:</strong> C, Java, JavaScript, Python</p>
                        <p><strong>Frontend:</strong> React.js, Next.js, TailwindCSS, Figma</p>
                        <p><strong>Backend:</strong> Node.js, Express.js, GraphQL</p>
                        <p><strong>Databases:</strong> MongoDB, MySQL, Firebase</p>
                    </div>
                    <div class="soft-skills-container">
                        <p><strong>Soft-skills</strong></p>
                        <p><strong>Problem-Solving:</strong> Debugging, Performance Optimization</p>
                        <p><strong>Collaboration:</strong> Teamwork, Technical Communication</p>
                        <p><strong>Adaptability:</strong> Quick Learning, Staying Updated</p>
                        <p><strong>Leadership:</strong> Team Management, Mentorship</p>
                    </div>
                </div>
                `;
            } else if (detail === "projects") {
                contentToDisplay = `<p>Atty - Chat App<br> (React, Tailwind, Daisy UI, Socket.io)<br><br>
                Playhaven - Video Streaming Platform<br>(MERN stack, JWT authentication, user subscriptions)<br><br>
                30+ Mini JavaScript Projects<br>(Did this while learning JS) <br><br>
                Attendance Management System<br> (Java Swing + MySQL)<br><br>
                Placement Record Management System <br>(JSP, MySQL)<br><br>
                </p>`;
            } else if (detail === "contact") {
                informationEl.innerHTML= `
                <div class="contact-me">
                    <h1 class="contact">CONTACT ME</h1>
                    <p class="contact-p">----xxx----</p>
                    <p class="contact-p">I'LL BE GLAD TO ANSWER YOUR QUESTIONS!</p>
                    <form>
                        <input type="text" name="name" placeholder="Name" required>
                        <input type="email" name="email" placeholder="Email address" required>
                        <input type="text" name="subject" placeholder="Subject">
                        <textarea name="message" placeholder="Your message" required></textarea>
                        <button type="submit" class="send-message">Send Message</button>
                    </form>
                    <div class="contact-container">
                        <a href=""><img src="../Images/Logo/github.png"></a>
                        <a href=""><img src="../Images/Logo/linkedin.png"></a>
                        <a href=""><img src="../Images/Logo/gmail.png"></a>
                        <a href=""><img src="../Images/Logo/instagram.png"></a>
                        <a href=""><img src="../Images/Logo/github.png"></a>
                    </div>
                </div>
               `;
            }
            // Update content at the end of loop
            if (contentToDisplay) {
                informationEl.innerHTML = contentToDisplay;
            }
        }
    });
}

