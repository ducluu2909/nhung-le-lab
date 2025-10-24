// Research Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
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

    // Observe pillar cards
    const pillarCards = document.querySelectorAll('.pillar-card');
    pillarCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe area cards
    const areaCards = document.querySelectorAll('.area-card');
    areaCards.forEach(card => {
        observer.observe(card);
    });

    // Observe project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        observer.observe(item);
    });

    // Observe tech categories
    const techCategories = document.querySelectorAll('.tech-category');
    techCategories.forEach(category => {
        observer.observe(category);
    });

    // Learn More button functionality
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const areaType = this.dataset.area;
            const areaCard = this.closest('.area-card');
            const areaTitle = areaCard.querySelector('.area-title').textContent;

            // In a real implementation, this would open a modal or navigate to a detail page
            alert(`Learn more about "${areaTitle}"\n\nThis would typically open a detailed view with:\n- Research methodology\n- Current publications\n- Team members\n- Funding sources\n- Collaboration opportunities`);
        });
    });

    // Project link interactions
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            const projectTitle = this.closest('.project-item').querySelector('.project-title').textContent;

            // Simulate different actions based on link type
            if (linkText.includes('Publications')) {
                alert(`Viewing publications for "${projectTitle}"\n\nThis would navigate to the filtered publications page.`);
            } else if (linkText.includes('Team Members')) {
                alert(`Viewing team members for "${projectTitle}"\n\nThis would show the researchers working on this project.`);
            } else if (linkText.includes('Contact PI')) {
                alert(`Contact form for the Principal Investigator\n\nThis would open a contact form or email client.`);
            } else if (linkText.includes('Clinical Trial')) {
                alert(`Clinical trial information for "${projectTitle}"\n\nThis would link to ClinicalTrials.gov or internal trial page.`);
            } else if (linkText.includes('Join')) {
                alert(`Application form for "${projectTitle}"\n\nThis would open a form to join the project team.`);
            } else {
                alert(`Opening: ${linkText}\n\nProject: ${projectTitle}`);
            }
        });
    });

    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Enhanced hover effects for area cards
    areaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced hover effects for pillar cards
    pillarCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.pillar-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.pillar-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Parallax effect for hero section
    const researchHero = document.querySelector('.research-hero');
    if (researchHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;

            if (scrolled < window.innerHeight) {
                researchHero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // Tech item hover effects
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.tech-icon');
            icon.style.transform = 'scale(1.3)';
            icon.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.tech-icon');
            icon.style.transform = 'scale(1)';
        });
    });

    // Filter/search functionality (for future expansion)
    window.filterResearchAreas = function(category) {
        areaCards.forEach(card => {
            const cardCategory = card.dataset.area;
            if (category === 'all' || cardCategory.includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Back to top button
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
        if (window.pageYOffset > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
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

    // Project item expand/collapse (for mobile optimization)
    projectItems.forEach((item, index) => {
        const details = item.querySelector('.project-details');

        // Add collapse functionality for mobile
        if (window.innerWidth <= 768) {
            details.style.display = 'none';

            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Show Details';
            toggleBtn.className = 'toggle-details-btn';
            toggleBtn.style.cssText = `
                margin: 1rem 0;
                padding: 0.8rem 2rem;
                background: var(--accent-color);
                color: white;
                border: none;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
            `;

            item.querySelector('.project-description').after(toggleBtn);

            toggleBtn.addEventListener('click', function() {
                if (details.style.display === 'none') {
                    details.style.display = 'grid';
                    this.textContent = 'Hide Details';
                } else {
                    details.style.display = 'none';
                    this.textContent = 'Show Details';
                }
            });
        }
    });

    // CTA button tracking
    const ctaButtons = document.querySelectorAll('.cta-buttons a');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.textContent.trim();
            alert(`Navigating to: ${buttonText}\n\nThis would typically:\n- Open positions page\n- Show collaboration form\n- Display contact information`);
        });
    });

    // Console log for debugging
    console.log('%cResearch Page Loaded', 'color: #4a90e2; font-size: 16px; font-weight: bold;');
    console.log(`Research areas: ${areaCards.length}`);
    console.log(`Current projects: ${projectItems.length}`);
    console.log(`Technology categories: ${techCategories.length}`);
});

// Export function for external use
window.researchPageUtils = {
    filterByArea: function(category) {
        window.filterResearchAreas(category);
    },
    scrollToProjects: function() {
        const projectsSection = document.querySelector('.current-projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
