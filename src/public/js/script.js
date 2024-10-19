document.addEventListener('DOMContentLoaded', (event) => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentWrapper = document.querySelector('.content-wrapper');
    let scrollIndicator;

    function animateElements(container) {
        const elements = container.querySelectorAll('[data-animation]');
        elements.forEach(element => {
            const animation = element.dataset.animation;
            const delay = element.dataset.delay || 0;
            setTimeout(() => {
                element.classList.add(animation);
            }, delay);
        });
    }
    function animatePageTransition(oldPage, newPage) {
      // Hide the new page initially
      newPage.style.display = 'block';
      newPage.style.opacity = '0';
      newPage.style.transform = 'translateX(100%)';

      // Fade out the old page
      oldPage.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      oldPage.style.opacity = '0';
      oldPage.style.transform = 'translateX(-30%)';

      setTimeout(() => {
          // Hide the old page and reset its styles
          oldPage.style.display = 'none';
          oldPage.style.opacity = '';
          oldPage.style.transform = '';
          oldPage.classList.remove('active');

          // Animate in the new page
          newPage.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
          newPage.style.opacity = '1';
          newPage.style.transform = 'translateX(0)';
          newPage.classList.add('active');

          // Clean up transitions
          setTimeout(() => {
              newPage.style.transition = '';
          }, 300);

          animateElements(newPage);
          if (contentWrapper) {
              contentWrapper.scrollTop = 0;
          }
          setTimeout(updateScrollIndicator, 100);
      }, 300);
  }

  function updateScrollIndicator() {
      if (!scrollIndicator || !contentWrapper) {
          console.log("Scroll indicator or content wrapper not found");
          return;
      }

      const scrollHeight = contentWrapper.scrollHeight;
      const clientHeight = contentWrapper.clientHeight;
      const scrollTop = contentWrapper.scrollTop;

      const isScrollable = scrollHeight > clientHeight;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 20; // 20px threshold

      if (isScrollable && !isScrolledToBottom) {
          scrollIndicator.style.opacity = '1';
      } else {
          scrollIndicator.style.opacity = '0';
      }
  }

  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const currentPage = document.querySelector('.content-page.active');
          const targetPage = document.getElementById(targetId);
          
          if (currentPage !== targetPage) {
              animatePageTransition(currentPage, targetPage);
          }
      });
  });
    function updateScrollIndicator() {
        if (!scrollIndicator || !contentWrapper) {
            console.log("Scroll indicator or content wrapper not found");
            return;
        }

        const scrollHeight = contentWrapper.scrollHeight;
        const clientHeight = contentWrapper.clientHeight;
        const scrollTop = contentWrapper.scrollTop;

        console.log("Scroll Height:", scrollHeight);
        console.log("Client Height:", clientHeight);
        console.log("Scroll Top:", scrollTop);

        const isScrollable = scrollHeight > clientHeight;
        const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 20; // 20px threshold

        console.log("Is Scrollable:", isScrollable);
        console.log("Is Scrolled To Bottom:", isScrolledToBottom);

        if (isScrollable && !isScrolledToBottom) {
            scrollIndicator.style.opacity = '1';
            console.log("Showing scroll indicator");
        } else {
            scrollIndicator.style.opacity = '0';
            console.log("Hiding scroll indicator");
        }
    }

  

    function initializeProfileImage() {
        const profileImg = document.getElementById('profile-img');
        if (profileImg) {
            profileImg.style.opacity = 0; 
            setTimeout(() => {
                profileImg.style.opacity = 1; 
            }, 500);
        }
    }

    const texts = ['an undergraduate', 'a game developer', 'a web developer'];
    const typewriterElement = document.querySelector('.typewriter-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(type, typingSpeed);
  }

    type(); // Start the typing effect

    const skillBars = document.querySelectorAll('.skill-progress span');
  
  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        bar.style.width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
      }
    });
  };

  const projects = document.querySelectorAll('.github-project');
  
  projects.forEach(project => {
    const expandBtn = project.querySelector('.expand-btn');
    expandBtn.addEventListener('click', () => {
      const isExpanded = project.getAttribute('data-expanded') === 'true';
      project.setAttribute('data-expanded', !isExpanded);
    });
  });


 
  function sendEmail() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
  
    // Basic form validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
  
    // Email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
  
    // Disable the submit button and show loading state
    var submitButton = document.querySelector('#contact-form button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
  
    // Send the email using an AJAX call to your server
    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Thank you for your message. I will get back to you soon!');
        document.getElementById('contact-form').reset();
      } else {
        throw new Error('Failed to send email');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Sorry, there was an error sending your message. Please try again later.');
    })
    .finally(() => {
      // Re-enable the submit button and restore its text
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    });
  
    return false;
  }
  
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); 
      sendEmail(); 
    });
  }

  window.addEventListener('scroll', animateSkillBars);
  animateSkillBars();
  
    window.onload = initializeProfileImage;

    animateElements(document.querySelector('.content-page.active'));

    if (contentWrapper) {
        scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
        document.body.appendChild(scrollIndicator);

        contentWrapper.addEventListener('scroll', updateScrollIndicator);

        setTimeout(updateScrollIndicator, 100);
    }

    window.addEventListener('resize', updateScrollIndicator);
});