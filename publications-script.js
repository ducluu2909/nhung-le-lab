// Publications Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Get all filter elements
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const yearFilter = document.getElementById('yearFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const journalFilter = document.getElementById('journalFilter');
    const resetBtn = document.querySelector('.reset-filters');
    const pubItems = document.querySelectorAll('.pub-item');
    const resultsCount = document.querySelector('.results-count');

    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        pubItems.forEach(item => {
            const title = item.querySelector('.pub-title').textContent.toLowerCase();
            const authors = item.querySelector('.pub-authors').textContent.toLowerCase();
            const excerpt = item.querySelector('.pub-excerpt').textContent.toLowerCase();

            const matchesSearch = searchTerm === '' ||
                                 title.includes(searchTerm) ||
                                 authors.includes(searchTerm) ||
                                 excerpt.includes(searchTerm);

            if (matchesSearch) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

        applyFilters();
        updateResultsCount();
    }

    // Filter functionality
    function applyFilters() {
        const yearValue = yearFilter.value;
        const categoryValue = categoryFilter.value;
        const journalValue = journalFilter.value;

        pubItems.forEach(item => {
            // Skip if already hidden by search
            if (item.style.display === 'none') return;

            const itemYear = item.dataset.year;
            const itemCategory = item.dataset.category;
            const itemJournal = item.dataset.journal;

            const matchesYear = yearValue === 'all' || itemYear === yearValue;
            const matchesCategory = categoryValue === 'all' || itemCategory === categoryValue;
            const matchesJournal = journalValue === 'all' || itemJournal === journalValue;

            if (matchesYear && matchesCategory && matchesJournal) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

        updateResultsCount();
    }

    // Update results count
    function updateResultsCount() {
        const visibleItems = Array.from(pubItems).filter(item => item.style.display !== 'none');
        const totalItems = pubItems.length;
        resultsCount.textContent = `Showing ${visibleItems.length} of ${totalItems}+ publications`;
    }

    // Reset all filters
    function resetFilters() {
        searchInput.value = '';
        yearFilter.value = 'all';
        categoryFilter.value = 'all';
        journalFilter.value = 'all';

        pubItems.forEach(item => {
            item.style.display = '';
        });

        updateResultsCount();
    }

    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Real-time search
    searchInput.addEventListener('input', performSearch);

    yearFilter.addEventListener('change', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    journalFilter.addEventListener('change', applyFilters);
    resetBtn.addEventListener('click', resetFilters);

    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more publications
            this.textContent = 'Loading...';
            this.disabled = true;

            setTimeout(() => {
                alert('In a real implementation, this would load more publications from the database.');
                this.textContent = 'Load More Publications';
                this.disabled = false;
            }, 1000);
        });
    }

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

    // Observe publication items
    pubItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Observe featured publications
    const featuredPubs = document.querySelectorAll('.featured-pub');
    featuredPubs.forEach(pub => {
        observer.observe(pub);
    });

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Copy citation functionality (for BibTeX and Cite links)
    document.querySelectorAll('.pub-link').forEach(link => {
        if (link.textContent === 'BibTeX' || link.textContent === 'Cite') {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const pubItem = this.closest('.pub-item') || this.closest('.featured-pub');
                const title = pubItem.querySelector('.pub-title, .pub-title-large').textContent;
                const authors = pubItem.querySelector('.pub-authors').textContent;
                const year = pubItem.querySelector('.pub-year, .pub-year-badge').textContent;

                let citation = '';
                if (this.textContent === 'BibTeX') {
                    citation = `@article{le${year},
  title={${title}},
  author={${authors}},
  year={${year}}
}`;
                } else {
                    citation = `${authors} (${year}). ${title}.`;
                }

                // Copy to clipboard
                navigator.clipboard.writeText(citation).then(() => {
                    const originalText = this.textContent;
                    this.textContent = '✓ Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    alert('Citation:\n\n' + citation);
                });
            });
        }
    });

    // Enhanced hover effects for publication cards
    pubItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for hero section
    const publicationsHero = document.querySelector('.publications-hero');
    if (publicationsHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;

            if (scrolled < window.innerHeight) {
                publicationsHero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[0-9]/g, '');

                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        target.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + suffix;
                    }
                }, 30);

                observer.unobserve(target);
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
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

    // Initialize results count
    updateResultsCount();

    // Console log for debugging
    console.log('%cPublications Page Loaded', 'color: #4a90e2; font-size: 16px; font-weight: bold;');
    console.log(`Total publications: ${pubItems.length}`);
    console.log('Search and filter functionality initialized');
});
