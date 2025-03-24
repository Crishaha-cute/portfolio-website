// Theme switcher
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme');
    
    // Function to update theme
    function setTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark-theme');
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        } else {
            document.documentElement.classList.remove('dark-theme');
            document.body.setAttribute('data-theme', 'light');
            themeToggle.checked = false;
        }
    }

    // Set initial theme
    if (storedTheme) {
        setTheme(storedTheme === 'dark');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark);
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('change', function() {
        setTheme(this.checked);
        localStorage.setItem('theme', this.checked ? 'dark' : 'light');
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    const socialIcons = document.querySelectorAll('.social-links .social-icon');
    
    const urls = {
        'fa-github': 'https://github.com/Crishaha-cute',
        'fa-facebook': 'https://facebook.com/gl.manzano',
        'fa-tiktok': 'https://www.tiktok.com/@cris_manzano06',
        'fa-instagram': 'https://www.instagram.com/crismnzno/'
    };
    
    socialIcons.forEach(icon => {
        const iconClass = Array.from(icon.querySelector('i').classList)
            .find(cls => cls.startsWith('fa-'));
        
        if (iconClass && urls[iconClass]) {
            icon.href = urls[iconClass];
            icon.target = '_blank';
            icon.rel = 'noopener noreferrer';
        }
    });
    
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    
    
    // Skill progress bars animation
    const progressBars = document.querySelectorAll('.progress');
    if (progressBars.length > 0) {
        const animateProgress = () => {
            progressBars.forEach(progress => {
                const level = progress.getAttribute('data-level');
                progress.style.width = level;
            });
        };
        
        // Use Intersection Observer for triggering on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgress();
                    observer.disconnect();
                }
            });
        });
        
        observer.observe(document.querySelector('.skills-container'));
    }
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.animate-slide-in');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateX(0)';
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = 1;
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = 0;
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});