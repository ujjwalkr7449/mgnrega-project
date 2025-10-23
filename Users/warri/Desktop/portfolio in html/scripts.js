// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero animations
gsap.from(".hero-content h1", {
  y: -50,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".hero-content p", {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.3,
  ease: "power3.out"
});

gsap.from(".hero-buttons", {
  y: 30,
  opacity: 0,
  duration: 1,
  delay: 0.6,
  ease: "power3.out"
});

// Navigation functionality
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.querySelector('.nav-toggle');
const navContainer = document.querySelector('.nav-links');

// Change navbar on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.style.background = 'rgba(15, 32, 39, 0.98)';
    nav.style.boxShadow = '0 2px 20px rgba(0, 255, 204, 0.1)';
  } else {
    nav.style.background = 'rgba(15, 32, 39, 0.95)';
    nav.style.boxShadow = 'none';
  }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      // Update active link
      navLinks.forEach(link => link.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navContainer.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    navContainer.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Update active navigation link on scroll
const sections = document.querySelectorAll('section');
const observerOptions = {
  threshold: 0.3,
  rootMargin: '-70px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// Skill tags animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
  gsap.from(tag, {
    scale: 0,
    rotation: -180,
    duration: 0.5,
    delay: index * 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: tag,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

// Project cards hover effect enhancement
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
});

// Stats counter animation
const stats = document.querySelectorAll('.stat h3');
stats.forEach(stat => {
  const target = parseInt(stat.textContent);
  let current = 0;
  const increment = target / 100;

  const counter = () => {
    current += increment;
    if (current < target) {
      stat.textContent = Math.floor(current) + '+';
      requestAnimationFrame(counter);
    } else {
      stat.textContent = target + '+';
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counter();
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(stat);
});

// Contact form (EmailJS integration)
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const status = document.getElementById("form-status");

  // Show loading state
  status.innerText = "⏳ Sending message...";
  status.style.color = "#00ffcc";

  // Using EmailJS (no backend needed)
  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "your_service_id", // Replace with your EmailJS service ID
        template_id: "your_template_id", // Replace with your EmailJS template ID
        user_id: "your_public_key", // Replace with your EmailJS public key
        template_params: {
          from_name: name,
          from_email: email,
          message: message,
          to_email: "ujjwalkr7449@gmail.com",
        },
      }),
    });
    if (response.ok) {
      status.innerText = "✅ Message sent successfully!";
      status.style.color = "#00ffcc";
      e.target.reset();

      // Success animation
      gsap.from(status, {
        scale: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
    } else {
      throw new Error("Failed to send");
    }
  } catch (err) {
    status.innerText = "❌ Failed to send. Try again later.";
    status.style.color = "#ff6b6b";

    // Error animation
    gsap.from(status, {
      x: -10,
      duration: 0.5,
      ease: "power2.out",
      yoyo: true,
      repeat: 3
    });
  }
});

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-content p');
const originalText = heroSubtitle.textContent;
heroSubtitle.textContent = '';

let i = 0;
const typeWriter = () => {
  if (i < originalText.length) {
    heroSubtitle.textContent += originalText.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
};

// Start typing effect after initial animations
setTimeout(() => {
  typeWriter();
}, 1000);

// Parallax effect for background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  document.body.style.backgroundPosition = `center ${rate}px`;
});

// Prevent form submission on enter in textarea
document.querySelector('textarea').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    document.getElementById('contact-form').dispatchEvent(new Event('submit'));
  }
});
