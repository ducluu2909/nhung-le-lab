// Careers Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Job Filtering
    const departmentFilter = document.getElementById('departmentFilter');
    const positionTypeFilter = document.getElementById('positionType');
    const resetFiltersBtn = document.querySelector('.reset-filters-btn');
    const jobCards = document.querySelectorAll('.job-card');
    const noResults = document.getElementById('noResults');

    function filterJobs() {
        const selectedDepartment = departmentFilter.value;
        const selectedPositionType = positionTypeFilter ? positionTypeFilter.value : 'all';
        let visibleCount = 0;

        jobCards.forEach(card => {
            const cardDepartment = card.dataset.department;
            const cardPositionType = card.dataset.positionType;

            const matchesDepartment = selectedDepartment === 'all' || cardDepartment === selectedDepartment;
            const matchesPositionType = selectedPositionType === 'all' || cardPositionType === selectedPositionType;

            if (matchesDepartment && matchesPositionType) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }

    function resetFilters() {
        departmentFilter.value = 'all';
        if (positionTypeFilter) positionTypeFilter.value = 'all';
        filterJobs();
    }

    // Event listeners for filters
    departmentFilter.addEventListener('change', filterJobs);
    if (positionTypeFilter) positionTypeFilter.addEventListener('change', filterJobs);
    resetFiltersBtn.addEventListener('click', resetFilters);

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Job Apply Button Interactions
    const applyButtons = document.querySelectorAll('.job-apply-btn');

    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const jobCard = this.closest('.job-card');
            const jobTitle = jobCard.querySelector('.job-title').textContent;
            const department = jobCard.querySelector('.tag-department').textContent;
            const location = jobCard.querySelector('.tag-location').textContent;

            alert(`Application for: ${jobTitle}\nDepartment: ${department}\nLocation: ${location}\n\nThis would typically redirect to an application form or Greenhouse/Workday page.`);
        });
    });

    // Smooth scroll for anchor links
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

    // Intersection Observer for animations
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

    // Observe job cards
    jobCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(step => {
        observer.observe(step);
    });

    // Observe FAQ items
    faqItems.forEach(item => {
        observer.observe(item);
    });

    // Enhanced hover effects for job cards
    jobCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.01)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for hero image
    const heroImageBg = document.querySelector('.hero-image-bg');
    if (heroImageBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            if (scrolled < window.innerHeight) {
                heroImageBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // General Application button
    const generalAppButtons = document.querySelectorAll('.general-application .btn-primary, .careers-cta .btn-secondary');
    generalAppButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('General Application Form\n\nThis would typically open a form where candidates can:\n- Upload their resume/CV\n- Add a cover letter\n- Indicate areas of interest\n- Provide contact information\n\nWe keep all general applications on file for future opportunities.');
        });
    });

    // CTA button interactions
    const viewPositionsBtn = document.querySelector('.careers-cta .btn-primary');
    if (viewPositionsBtn) {
        viewPositionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const jobsSection = document.getElementById('jobsList');
            if (jobsSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = jobsSection.offsetTop - navbarHeight - 100;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Process step hover effects
    processSteps.forEach(step => {
        const stepNumber = step.querySelector('.step-number');

        step.addEventListener('mouseenter', function() {
            stepNumber.style.transform = 'scale(1.15)';
            stepNumber.style.boxShadow = '0 0 0 8px var(--primary-bg), 0 0 0 12px var(--accent-color)';
        });

        step.addEventListener('mouseleave', function() {
            stepNumber.style.transform = 'scale(1)';
            stepNumber.style.boxShadow = '0 0 0 6px var(--primary-bg), 0 0 0 8px var(--accent-color)';
        });

        stepNumber.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    // FAQ item tracking
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const questionText = this.querySelector('span').textContent;
            console.log(`FAQ clicked: ${questionText}`);
        });
    });

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

    // Job count display
    function updateJobCount() {
        const visibleJobs = Array.from(jobCards).filter(card => card.style.display !== 'none').length;
        const totalJobs = jobCards.length;

        // Create or update job count element
        let jobCount = document.querySelector('.job-count');
        if (!jobCount) {
            jobCount = document.createElement('div');
            jobCount.className = 'job-count';
            jobCount.style.cssText = `
                text-align: center;
                color: var(--text-secondary);
                font-size: 1rem;
                margin-bottom: 2rem;
                font-weight: 500;
            `;
            document.querySelector('.job-filters').after(jobCount);
        }

        jobCount.textContent = `Showing ${visibleJobs} of ${totalJobs} open positions`;
    }

    // Initialize job count
    updateJobCount();

    // Update job count when filters change
    departmentFilter.addEventListener('change', updateJobCount);
    if (positionTypeFilter) positionTypeFilter.addEventListener('change', updateJobCount);
    resetFiltersBtn.addEventListener('click', () => {
        setTimeout(updateJobCount, 100);
    });

    // Link interactions
    const lifeatLabLink = document.querySelector('.link-with-arrow');
    if (lifeatLabLink) {
        lifeatLabLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Life at Lab page coming soon!\n\nThis would showcase:\n- Office culture and environment\n- Team events and activities\n- Employee benefits\n- Diversity & inclusion initiatives\n- Work-life balance stories');
        });
    }

    // Console log for debugging
    console.log('%cCareers Page Loaded', 'color: #4a90e2; font-size: 16px; font-weight: bold;');
    console.log(`Total job openings: ${jobCards.length}`);
    console.log(`FAQ items: ${faqItems.length}`);
});

// Export utilities for external use
window.careersPageUtils = {
    filterByDepartment: function(department) {
        document.getElementById('departmentFilter').value = department;
        document.getElementById('departmentFilter').dispatchEvent(new Event('change'));
    },
    filterByPositionType: function(positionType) {
        const filter = document.getElementById('positionType');
        if (filter) {
            filter.value = positionType;
            filter.dispatchEvent(new Event('change'));
        }
    },
    resetFilters: function() {
        document.querySelector('.reset-filters-btn').click();
    }
};
