document.addEventListener("DOMContentLoaded", function () {
    const selectedCar = localStorage.getItem("selectedCar"); // Retrieve the stored car
    console.log(selectedCar);
    
    if (selectedCar) {
        const carImagePath = `../Images/Cars/car${selectedCar}.png`;

        // Set the background image of the car div
        document.querySelector(".car").style.backgroundImage = `url(${carImagePath})`;

        // Set the mouse cursor to the same image
        document.body.style.cursor = `url(${carImagePath}), auto`;
    }
});

document.addEventListener('click', () => {
    // Change cursor to gear-shift on click
    body.style.cursor = "url('../Images/gear-shift.png') 16 16, auto";

    // Restore cursor after 300ms
    setTimeout(() => {
      body.style.cursor = "url('../Images/transmission.png') 16 16, auto";
    }, 100);
  });

  let x_axis = 0;
  let y_axis = 0;
  let rotationAngle = 0; // Rotation in degrees
  
  const car = document.querySelector('.car');
  
  document.addEventListener('keydown', (e) => {
      if (e.keyCode === 38) { // Up arrow
          moveCarForward();
      } else if (e.keyCode === 40) { // Down arrow (optional reverse)
          moveCarBackward();
      } else if (e.keyCode === 37) { // Left arrow
          rotateCarLeft();
      } else if (e.keyCode === 39) { // Right arrow
          rotateCarRight();
      } else if (e.key.toLowerCase() === 'd') { // Full 360 spin
          rotateCar360();
      } else if (e.keyCode === 13) { // Enter
          document.querySelector(".information").innerHTML = "";
          document.querySelector('.information').classList.remove('extra-style');
          checkParkingCollision();
      }
  });
  
  function moveCarForward() {
      const speed = 10; // Distance to move each time
      const angleInRadians = rotationAngle * (Math.PI / 180);
  
      // Calculate x and y based on the rotation angle
      x_axis += speed * Math.cos(angleInRadians);
      y_axis += speed * Math.sin(angleInRadians);
  
      updateCarTransform();
  }
  
  function moveCarBackward() {
      const speed = 10; 
      const angleInRadians = rotationAngle * (Math.PI / 180);
  
      // Move backwards
      x_axis -= speed * Math.cos(angleInRadians);
      y_axis -= speed * Math.sin(angleInRadians);
  
      updateCarTransform();
  }
  
  function rotateCarLeft() {
      rotationAngle -= 10; // Turn left by 10 degrees
      updateCarTransformSmooth();
  }
  
  function rotateCarRight() {
      rotationAngle += 10; // Turn right by 10 degrees
      updateCarTransformSmooth();
  }
  
  function rotateCar360() {
      car.style.transition = "transform 0.5s ease-in-out";
      rotationAngle -= 360;
      updateCarTransform();
      setTimeout(() => {
          car.style.transition = "none";
      }, 500);
  }
  
  function updateCarTransform() {
      car.style.transition = "none"; // No smooth movement
      car.style.transformOrigin = "50% 5%";
      car.style.transform = `translate(${x_axis}px, ${y_axis}px) rotate(${rotationAngle}deg)`;
  }
  
  function updateCarTransformSmooth() {
      car.style.transition = "transform 0.2s ease"; // Smooth rotation for left/right
      car.style.transformOrigin = "50% 5%";
      car.style.transform = `translate(${x_axis}px, ${y_axis}px) rotate(${rotationAngle}deg)`;
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
    let isTyping = true;

    const typingInterval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i === text.length) {
            clearInterval(typingInterval);
            isTyping = false;
            document.removeEventListener("keydown", onKeyPress); // Clean up
            callback();
        }
    }, 50);

    function onKeyPress(event) {
        if (event.key === "Enter" && isTyping) {
            clearInterval(typingInterval);
            element.textContent = text; // Show full text
            isTyping = false;
            document.removeEventListener("keydown", onKeyPress); // Clean up
            callback();
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
    let contentToDisplay = "";

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
                    <button class="custom-btn btn-11" data-id="1">MERN intern @WSA<div class="dot"></div></button>
                    <div class="description" id="desc-1" style="display: none;text-align:center;padding:0;">Completed a 2-month WSA internship, developing Homely Hub, a full-stack MERN room booking application with authentication and dynamic user interfaces.</div>

                    <button class="custom-btn btn-11" data-id="2">Web Development @Codsoft<div class="dot"></div></button>
                    <div class="description" id="desc-2" style="display: none;text-align:center;padding:0;">Completed a 1-month CodSoft internship, building responsive web projects including a landing page, portfolio, and calculator using HTML, CSS, and JavaScript.</div>

                    <button class="custom-btn btn-11" data-id="3">Software Developer intern @HBS<div class="dot"></div></button>
                    <div class="description" id="desc-3" style="display: none;text-align:center;padding:0;">Experience: Worked on backend APIs, optimized databases, and implemented security best practices.</div>
                </div>
                `;
                
                attachInternshipListeners();
            } else if (detail==="about me"){
                informationEl.innerHTML = `
                    <div id="about-container" style="text-align: center;">
                        <h3 style="margin-bottom: 20px;">About Me</h3>
                        <p id="typing-text" style="text-align: justify; font-size: 25px; display: inline-block; max-width: 800px;"></p>
                    </div>
                    `;

                    const typingTextEl = document.getElementById("typing-text");

                    textTypingEffect(
                    typingTextEl,
                    "I'm a full-stack developer with expertise in the MERN stack — MongoDB, Express.js, React, and Node.js. I enjoy crafting scalable web applications and solving real-world problems through clean, efficient code.",
                    () => {
                        typingTextEl.innerHTML += `
                        <div style="margin-top: 20px; font-size: 22px; line-height: 1.6; text-align: left;">
                            <p>
                            🚀 Proficient in building responsive interfaces with React and RESTful APIs using Node.js & Express.<br>
                            🌐 Experienced in PHP and JSP, with additional knowledge in Java and C.<br>
                            🎯 Currently developing a video streaming platform while exploring MERN for SSR and better UX.<br>
                            🤝 Always open to collaborating on MERN stack projects and creative web solutions.
                            </p>
                        </div>
                        `;
                    }
                );
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
                contentToDisplay = `
                <div class="projects" style="height: 95%; position: relative; padding: 20px; background: linear-gradient(to bottom, #333 0%, #222 100%); border-radius: 15px;">
                <!-- Road Track Frame -->
                <div style="width: 100%; height: 95%; border: 6px dashed #555; border-radius: 15px; background: #111; position: relative; overflow: hidden;">
                    <!-- Iframe Road Content -->
                    <iframe id="scrollFrame" width="98%" height="98%" style="margin: 1%; border: none; border-radius: 10px; background: #f5f5f5; overflow: auto;"
                        src="projects-content.html">
                    </iframe>
                </div>
            </div>

            <script>
                const interval = setInterval(() => {
                    const iframe = document.querySelector('#scrollFrame');
                    const car = document.querySelector('#carScroller');
                    if (iframe && iframe.contentWindow && iframe.contentDocument.readyState === 'complete') {
                        const iframeBody = iframe.contentDocument.body;

                        iframe.contentWindow.addEventListener('scroll', () => {
                            const scrollTop = iframe.contentWindow.scrollY;
                            const scrollHeight = iframeBody.scrollHeight - iframe.offsetHeight;
                            const percent = scrollTop / scrollHeight;

                            const trackHeight = iframe.offsetHeight - car.offsetHeight;
                            car.style.top = (percent * trackHeight) + 'px';
                        });

                        clearInterval(interval);
                    }
                }, 100);
            </script>

                `;
                
            } else if (detail === "contact") {
                informationEl.innerHTML = `
                <div class="contact-me">
                    <h1 class="contact">CONTACT ME</h1>
                    <p class="contact-p">----xxx----</p>
                    <p class="contact-p">I'LL BE GLAD TO ANSWER YOUR QUESTIONS!</p>
                    <form id="contact-form">
                        <input type="text" name="name" placeholder="Name" required>
                        <input type="email" name="from_email" placeholder="Email address" required>
                        <input type="text" name="subject" placeholder="Subject">
                        <textarea name="message" placeholder="Your message" required></textarea>
                        <button type="submit" class="send-message">Send Message</button>
                    </form>
                    <div class="contact-container">
                        <a href="https://github.com/AjayPeter582"><img src="../Images/Logo/github.png"></a>
                        <a href="https://www.linkedin.com/in/ajay-peter-r/"><img src="../Images/Logo/linkedin.png"></a>
                        <a href="#"><img src="../Images/Logo/gmail.png"></a>
                        <a href="https://www.instagram.com/_ajay_peter_005/"><img src="../Images/Logo/instagram.png"></a>
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

