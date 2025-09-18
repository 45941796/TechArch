document.addEventListener('DOMContentLoaded', () => {
    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.querySelector('.modal-close');
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalTitle.textContent = button.parentElement.dataset.modalTitle;
            modalDescription.textContent = button.parentElement.dataset.modalDescription;
            modal.style.display = 'flex';
        });
    });
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // CTA popup
    const ctaPopup = document.getElementById('cta-popup');
    setTimeout(() => {
        ctaPopup.style.display = 'flex';
    }, 5000);
    window.closePopup = () => {
        ctaPopup.style.display = 'none';
    };

    // Feedback popup
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your feedback!');
            document.getElementById('feedback-popup').style.display = 'none';
        });
    }

    // Skill quiz
    const skillQuiz = document.getElementById('skill-quiz');
    if (skillQuiz) {
        skillQuiz.addEventListener('submit', (e) => {
            e.preventDefault();
            const interest = document.getElementById('interest').value;
            const level = document.getElementById('level').value;
            const result = document.getElementById('quiz-result');
            if (interest && level) {
                result.innerHTML = `Recommended: ${interest.charAt(0).toUpperCase() + interest.slice(1)} course for ${level} level. <a href="training.html#signup" aria-label="Join ${interest} course">Join Now</a>`;
            }
        });
    }

    // Story slider
    const stories = document.querySelectorAll('.story');
    const dots = document.querySelectorAll('.dot');
    const sliderControl = document.querySelector('.slider-control');
    let currentStory = 0;
    let isPlaying = true;
    const showStory = (index) => {
        stories.forEach((story, i) => {
            story.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
    };
    window.goToStory = (index) => {
        currentStory = index;
        showStory(currentStory);
    };
    const nextStory = () => {
        currentStory = (currentStory + 1) % stories.length;
        showStory(currentStory);
    };
    let sliderInterval = setInterval(nextStory, 5000);
    if (sliderControl) {
        sliderControl.addEventListener('click', () => {
            isPlaying = !isPlaying;
            sliderControl.textContent = isPlaying ? 'Pause' : 'Play';
            if (isPlaying) {
                sliderInterval = setInterval(nextStory, 5000);
            } else {
                clearInterval(sliderInterval);
            }
        });
    }

    // Course filter
    const courseSearch = document.getElementById('course-search');
    const courseFilterCategory = document.getElementById('course-filter-category');
    const courseFilterLevel = document.getElementById('course-filter-level');
    const courses = document.querySelectorAll('.course');
    if (courseSearch && courseFilterCategory && courseFilterLevel) {
        const filterCourses = () => {
            const search = courseSearch.value.toLowerCase();
            const category = courseFilterCategory.value;
            const level = courseFilterLevel.value;
            courses.forEach(course => {
                const matchesSearch = course.textContent.toLowerCase().includes(search);
                const matchesCategory = !category || course.dataset.category === category;
                const matchesLevel = !level || course.dataset.level === level;
                course.style.display = matchesSearch && matchesCategory && matchesLevel ? 'block' : 'none';
            });
        };
        courseSearch.addEventListener('input', filterCourses);
        courseFilterCategory.addEventListener('change', filterCourses);
        courseFilterLevel.addEventListener('change', filterCourses);
    }

    // Blog filter
    const blogFilterCategory = document.getElementById('blog-filter-category');
    const posts = document.querySelectorAll('.post');
    if (blogFilterCategory) {
        blogFilterCategory.addEventListener('change', () => {
            const category = blogFilterCategory.value;
            posts.forEach(post => {
                post.style.display = !category || post.dataset.category === category ? 'block' : 'none';
            });
        });
    }

    // FAQ search
    const faqSearch = document.getElementById('faq-search');
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqSearch) {
        faqSearch.addEventListener('input', () => {
            const search = faqSearch.value.toLowerCase();
            faqItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(search) ? 'block' : 'none';
            });
        });
    }

    // FAQ toggle
    window.toggleFAQ = (element) => {
        const answer = element.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        element.setAttribute('aria-expanded', answer.style.display === 'block');
    };

    // Newsletter form
    const newsletterForms = document.querySelectorAll('.newsletter');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.nextElementSibling.style.display = 'block';
            form.reset();
        });
    });

    // Contact form
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.nextElementSibling.style.display = 'block';
            contactForm.reset();
        });
    }

    // Share buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const text = button.dataset.text;
            if (navigator.share) {
                navigator.share({
                    title: 'TechArch',
                    text: text,
                    url: window.location.href
                });
            } else {
                alert('Share this: ' + text + ' ' + window.location.href);
            }
        });
    });

    // Add to calendar
    const calendarButtons = document.querySelectorAll('.add-to-calendar');
    calendarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const event = button.dataset.event;
            alert(`Add "${event}" to your calendar!`);
        });
    });

    // Back to top
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Particle animation
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1
        });
    }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Global map animation
    const globalMapCanvas = document.getElementById('global-map');
    if (globalMapCanvas) {
        const mapCtx = globalMapCanvas.getContext('2d');
        const locations = [
            { name: 'Nairobi', x: 600, y: 250 },
            { name: 'Minnesota', x: 300, y: 100 },
            { name: 'London', x: 400, y: 80 },
            { name: 'Singapore', x: 650, y: 200 }
        ];
        function drawMap() {
            mapCtx.clearRect(0, 0, globalMapCanvas.width, globalMapCanvas.height);
            mapCtx.fillStyle = '#1e3a8a';
            mapCtx.beginPath();
            mapCtx.arc(400, 200, 150, 0, Math.PI * 2);
            mapCtx.fill();
            locations.forEach(loc => {
                mapCtx.beginPath();
                mapCtx.arc(loc.x, loc.y, 5, 0, Math.PI * 2);
                mapCtx.fillStyle = '#10b981';
                mapCtx.fill();
                mapCtx.fillText(loc.name, loc.x + 10, loc.y);
            });
            requestAnimationFrame(drawMap);
        }
        drawMap();
    }

    // Chart.js for analytics
    if (typeof Chart !== 'undefined') {
        const impactChart = document.getElementById('impact-chart');
        if (impactChart) {
            new Chart(impactChart, {
                type: 'bar',
                data: {
                    labels: ['Youth Trained', 'Jobs Created', 'Women Empowered', 'Course Completion'],
                    datasets: [{
                        label: 'Impact Metrics',
                        data: [500, 200, 50, 75],
                        backgroundColor: '#10b981'
                    }]
                },
                options: { scales: { y: { beginAtZero: true } } }
            });
        }
        const courseProgressChart = document.getElementById('course-progress-chart');
        if (courseProgressChart) {
            new Chart(courseProgressChart, {
                type: 'pie',
                data: {
                    labels: ['Completed', 'In Progress', 'Not Started'],
                    datasets: [{
                        data: [70, 20, 10],
                        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b']
                    }]
                }
            });
        }
    }

    // Job counter animation
    const jobCount = document.getElementById('job-count');
    const jobProgress = document.getElementById('job-progress');
    if (jobCount && jobProgress) {
        let count = 0;
        const target = 200;
        const interval = setInterval(() => {
            if (count >= target) {
                clearInterval(interval);
                return;
            }
            count += 5;
            jobCount.textContent = count;
            jobProgress.style.width = `${(count / target) * 100}%`;
            jobProgress.setAttribute('aria-valuenow', (count / target) * 100);
        }, 50);
    }

    // Signup counter animation
    const signupCounter = document.getElementById('signup-counter');
    if (signupCounter) {
        let count = 0;
        const target = 500;
        const interval = setInterval(() => {
            if (count >= target) {
                clearInterval(interval);
                return;
            }
            count += 10;
            signupCounter.textContent = count + '+';
        }, 50);
    }

    // Chatbot
    const chatbot = document.getElementById('chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    if (chatbot && chatbotMessages) {
        chatbot.addEventListener('click', () => {
            chatbotMessages.style.display = chatbotMessages.style.display === 'block' ? 'none' : 'block';
            if (chatbotMessages.style.display === 'block' && !chatbotMessages.querySelector('input')) {
                chatbotMessages.innerHTML = `
                    <p>Welcome to TechArch! How can I help?</p>
                    <input type="text" placeholder="Type your question..." aria-label="Chatbot input">
                `;
                const input = chatbotMessages.querySelector('input');
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && input.value.trim()) {
                        const question = input.value.trim().toLowerCase();
                        let response = 'Thanks for your question! Contact info@techarch.org for more details.';
                        if (question.includes('training')) {
                            response = 'Check out our free courses on coding, AI, and more at <a href="training.html">Training</a>!';
                        } else if (question.includes('job')) {
                            response = 'Explore job opportunities at <a href="jobs.html">Jobs</a>!';
                        }
                        chatbotMessages.innerHTML += `<p><strong>You:</strong> ${input.value}</p><p><strong>Bot:</strong> ${response}</p>`;
                        input.value = '';
                    }
                });
            }
        });
    }
});