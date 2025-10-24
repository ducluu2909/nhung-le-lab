// Team Page Interactive Features

// Toggle bio expansion for team members
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-bio');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const teamMember = this.closest('.team-member');
            const bioExtended = teamMember.querySelector('.member-bio-extended');

            // Toggle expanded class
            bioExtended.classList.toggle('expanded');
            this.classList.toggle('active');

            // Change button text
            if (bioExtended.classList.contains('expanded')) {
                this.textContent = 'Read less';
            } else {
                this.textContent = 'Read more';
            }

            // Smooth scroll if needed
            if (bioExtended.classList.contains('expanded')) {
                setTimeout(() => {
                    const rect = teamMember.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                    if (rect.bottom > window.innerHeight) {
                        window.scrollTo({
                            top: scrollTop + rect.top - 100,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe team members for animation
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        observer.observe(member);
    });

    // Observe advisor cards for animation
    const advisorCards = document.querySelectorAll('.advisor-card');
    advisorCards.forEach(card => {
        observer.observe(card);
    });

    // Observe blog cards for animation
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        observer.observe(card);
    });

    // Add parallax effect to hero section
    const teamHero = document.querySelector('.team-hero');
    if (teamHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;

            if (scrolled < window.innerHeight) {
                teamHero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // Blog card hover effect enhancement
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Advisor card hover effect
    advisorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.advisor-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.advisor-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Add smooth transition to advisor images
    const advisorImages = document.querySelectorAll('.advisor-image img');
    advisorImages.forEach(img => {
        img.style.transition = 'transform 0.5s ease';
    });

    // Team member image hover effect
    const memberImages = document.querySelectorAll('.member-image');
    memberImages.forEach(imageContainer => {
        imageContainer.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });

        imageContainer.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Add transition to member images
    const memberImgs = document.querySelectorAll('.member-image img');
    memberImgs.forEach(img => {
        img.style.transition = 'transform 0.4s ease';
    });

    // Console log for debugging
    console.log('%cTeam Page Loaded', 'color: #4a90e2; font-size: 16px; font-weight: bold;');
    console.log(`Team members: ${teamMembers.length}`);
    console.log(`Advisors: ${advisorCards.length}`);
    console.log(`Blog posts: ${blogCards.length}`);
});

// Handle back to top functionality
let lastScrollTop = 0;
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--accent-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }

    lastScrollTop = scrollTop;
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) translateY(-3px)';
    this.style.boxShadow = '0 6px 20px rgba(74, 144, 226, 0.4)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(74, 144, 226, 0.3)';
});
