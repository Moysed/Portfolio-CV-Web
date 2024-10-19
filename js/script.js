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

    const viewWorkBtn = document.getElementById('view-work-btn');

    viewWorkBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const currentPage = document.querySelector('.content-page.active');
      const portfolioSection = document.getElementById('portfolio');
      
      if (currentPage !== portfolioSection) {
        animatePageTransition(currentPage, portfolioSection);
        console.log("Change")
      }
    });


    function animateElements(container) {
      const elements = container.querySelectorAll('[data-animation]');
      elements.forEach(element => {
        const animation = element.dataset.animation;
        const delay = element.dataset.delay || 0;
        setTimeout(() => {
          element.style.animationDelay = `${delay}ms`;
          element.classList.add(animation);
        }, delay);
      });
    }
  
    // Animate elements when the about page is loaded
    const aboutPage = document.getElementById('about');
    if (aboutPage && aboutPage.classList.contains('active')) {
      animateElements(aboutPage);
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

  var form = document.getElementById("contact-form");
  
  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.createElement("div");
    status.classList.add("form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        status.classList.add("success");
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
          status.classList.add("error");
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form";
      status.classList.add("error");
    });
    form.appendChild(status);
  }
  form.addEventListener("submit", handleSubmit)

  const projects = document.querySelectorAll('.github-project');
  
  projects.forEach(project => {
    const expandBtn = project.querySelector('.expand-btn');
    expandBtn.addEventListener('click', () => {
      const isExpanded = project.getAttribute('data-expanded') === 'true';
      project.setAttribute('data-expanded', !isExpanded);
    });
  });


 

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