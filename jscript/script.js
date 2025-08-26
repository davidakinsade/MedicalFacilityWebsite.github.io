document.addEventListener("DOMContentLoaded", function () {
  // ========================== SEARCH TOGGLE ==========================
  const searchBtn = document.querySelector('.search-btn');
  const searchContainer = document.querySelector('.search-container');
  if (searchBtn && searchContainer) {
    searchBtn.addEventListener('click', () => {
      searchContainer.style.display = searchContainer.style.display === 'block' ? 'none' : 'block';
    });
  }


  // ========================== FEATURES SECTION FADE-IN ==========================
const featureCards = document.querySelectorAll('.feature-card');

const featureObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 150); // Delay between cards for staggered effect
    }
  });
}, { threshold: 0.2 });

featureCards.forEach(card => {
  featureObserver.observe(card);
});


  // ========================== SCROLL TO TOP BUTTON ==========================
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================== SLIDE-IN ON LOAD ==========================
  const screen = document.getElementById("slidingScreen");
  if (screen) screen.classList.add("slide-down");
  document.body.classList.add("fade-in");

  // ========================== FADE/SLIDE ON SCROLL ==========================
  const fadeUpItems = document.querySelectorAll(".fade-up");
  const fadeSlideItems = document.querySelectorAll(".fade-slide-in");
  const fadeInOnScrollItems = document.querySelectorAll(".fade-in-on-scroll");

  function showOnScroll() {
    const triggerBottom = window.innerHeight - 100;

    fadeUpItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < triggerBottom && rect.bottom > 0) {
        item.style.opacity = "1";
        item.classList.add("animate");
      } else {
        item.style.opacity = "0";
        item.classList.remove("animate");
      }
    });

    fadeSlideItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      item.classList.toggle("visible", rect.top < triggerBottom && rect.bottom > 0);
    });

    fadeInOnScrollItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      item.classList.toggle("visible", rect.top < triggerBottom && rect.bottom > 0);
    });

    // Scroll text bar
    const scrollText = document.getElementById("scrollText");
    if (scrollText) {
      scrollText.style.display = window.scrollY > 100 ? "block" : "none";
    }

    // Show scroll-up button
    if (scrollBtn) {
      scrollBtn.classList.toggle("show", window.scrollY > 100);
    }
  }

  window.addEventListener("scroll", showOnScroll);
  showOnScroll(); // initial call

  // ========================== SCROLL PROGRESS BAR + BULLETS ==========================
  function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scrollProgressBar");
    if (progressBar) progressBar.style.width = scrolled + "%";

    const bullets = document.querySelectorAll('.scroll-bullet');
    const totalBullets = bullets.length;
    const activeIndex = Math.floor((scrolled / 100) * totalBullets);

    bullets.forEach((bullet, index) => {
      bullet.classList.toggle('active', index <= activeIndex);
    });
  }

  window.addEventListener("scroll", updateScrollProgress);
  updateScrollProgress(); // initial call




  // ========================== FADE-IN ON SCROLL (IntersectionObserver version) ==========================
const fadeInElements = document.querySelectorAll('.fade-in-on-scroll');
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const fadeInObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeInElements.forEach(el => fadeInObserver.observe(el));


  // ========================== ANIMATED COUNTERS ==========================
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      let start = 0;
      const duration = 2000;
      const stepTime = Math.max(Math.floor(duration / target), 10);

      const updateCounter = () => {
        start += Math.ceil(target / (duration / stepTime));
        if (start < target) {
          counter.textContent = start;
          setTimeout(updateCounter, stepTime);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
      observer.unobserve(counter);
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ========================== QUOTE ROTATION ==========================
  const quoteText = document.getElementById("quoteText");
  const quotes = [
    "🌟 Thank you for visiting! Stay tuned for updates. 🌟",
    "💡 Did you know? We're here to help and support our community.",
    "🤝 Making a difference, one step at a time.",
    "📍 Based in Offaly — serving with heart!",
    "📞 Contact us today and get involved!"
  ];

  let quoteIndex = 0;
  if (quoteText) {
    setInterval(() => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      quoteText.textContent = quotes[quoteIndex];
    }, 6000);
  }

  // ========================== POLICY SIDEBAR HIGHLIGHTING ==========================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".policy-sidebar a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 160) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // ========================== DROPDOWN TOGGLES ==========================
  document.querySelectorAll('.dropdown-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
      button.innerHTML = content.style.display === 'block' ? "Hide Details ▲" : "Show Details ▼";
    });
  });

  // ========================== FEEDBACK WIDGET ==========================
  const feedbackBtn = document.getElementById("feedbackBtn");
  const feedbackPanel = document.getElementById("feedbackPanel");
  const feedbackOptions = document.querySelectorAll(".feedback-option");
  const feedbackMessage = document.getElementById("feedbackMessage");
  const feedbackWidget = document.getElementById("feedbackWidget");

  if (feedbackBtn && feedbackPanel && feedbackOptions && feedbackMessage) {
    feedbackBtn.addEventListener("click", () => {
      feedbackPanel.style.display = feedbackPanel.style.display === "block" ? "none" : "block";
      feedbackMessage.style.display = "none";
    });

    feedbackOptions.forEach(option => {
      option.addEventListener("click", () => {
        const response = option.dataset.response;
        feedbackMessage.textContent = response === "yes"
          ? "Thank you for your feedback!"
          : "We're sorry to hear that. We'll work to improve this page.";
        feedbackMessage.style.display = "block";
        setTimeout(() => feedbackPanel.style.display = "none", 2500);
      });
    });

    document.addEventListener("click", (event) => {
      if (!feedbackPanel.contains(event.target) && !feedbackBtn.contains(event.target)) {
        feedbackPanel.style.display = "none";
      }
    });

    window.addEventListener("scroll", () => {
      feedbackWidget?.classList.toggle("visible", window.scrollY > 100);
    });
  }

    // ========================== FEATURE PROFILE CONTACT TOGGLE ==========================
  document.querySelectorAll('.feature-toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
      const contactBox = button.nextElementSibling;
      const isOpen = contactBox.style.display === "block";
      contactBox.style.display = isOpen ? "none" : "block";
      button.classList.toggle("open", !isOpen);
    });
  });





});


