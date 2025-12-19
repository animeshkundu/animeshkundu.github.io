// Portfolio App - Dynamic Functionality

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initDemoTabs();
    initRepoFilters();
    fetchRepositories();
    initSmoothScroll();
});

// ============================================
// Theme Management
// ============================================

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    
    updateThemeIcons();
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                htmlElement.classList.add('dark');
            } else {
                htmlElement.classList.remove('dark');
            }
            updateThemeIcons();
        }
    });
}

function toggleTheme() {
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains('dark');
    
    if (isDark) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    
    updateThemeIcons();
}

function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    
    // Desktop icons
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    
    // Mobile icons
    const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
    const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');
    
    if (isDark) {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
        darkIconMobile.classList.remove('hidden');
        lightIconMobile.classList.add('hidden');
    } else {
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
        darkIconMobile.classList.add('hidden');
        lightIconMobile.classList.remove('hidden');
    }
}

// ============================================
// Mobile Menu
// ============================================

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ============================================
// Interactive Demo Tabs
// ============================================

function initDemoTabs() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoIframe = document.getElementById('demo-iframe');
    const demoUrl = document.getElementById('demo-url');
    const demoExternalLink = document.getElementById('demo-external-link');
    
    const demoUrls = {
        'mermaid-editor': 'https://animeshkundu.github.io/mermaid-editor',
        'gist-preview': 'https://animeshkundu.github.io/gist-preview',
        'saz-viewer': 'https://animeshkundu.github.io/saz-viewer',
        'har-viewer': 'https://animeshkundu.github.io/har-viewer'
    };
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            demoTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get the demo name
            const demoName = tab.getAttribute('data-demo');
            const url = demoUrls[demoName];
            
            // Update iframe and URL display
            if (url) {
                demoIframe.src = url;
                demoUrl.textContent = url;
                demoExternalLink.href = url;
            }
        });
    });
}

// ============================================
// Repository Fetching and Filtering
// ============================================

let allRepositories = [];
let currentFilter = 'all';

async function fetchRepositories() {
    const reposGrid = document.getElementById('repos-grid');
    const reposLoading = document.getElementById('repos-loading');
    const reposError = document.getElementById('repos-error');
    
    // Check cache first
    const cachedData = getCachedRepos();
    if (cachedData) {
        allRepositories = cachedData;
        displayRepositories(allRepositories);
        reposLoading.classList.add('hidden');
        return;
    }
    
    try {
        reposLoading.classList.remove('hidden');
        reposError.classList.add('hidden');
        
        const response = await fetch('https://api.github.com/users/animeshkundu/repos?per_page=100&sort=updated');
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        allRepositories = repos;
        
        // Cache the results
        cacheRepos(repos);
        
        // Display repositories
        displayRepositories(repos);
        reposLoading.classList.add('hidden');
        
    } catch (error) {
        console.error('Error fetching repositories:', error);
        reposLoading.classList.add('hidden');
        reposError.classList.remove('hidden');
    }
}

function displayRepositories(repos) {
    const reposGrid = document.getElementById('repos-grid');
    reposGrid.innerHTML = '';
    
    const filteredRepos = filterRepositories(repos);
    
    if (filteredRepos.length === 0) {
        reposGrid.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-600 dark:text-gray-400">
                No repositories found for this filter.
            </div>
        `;
        return;
    }
    
    filteredRepos.forEach(repo => {
        const card = createRepoCard(repo);
        reposGrid.appendChild(card);
    });
}

function createRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300';
    
    const languageColor = getLanguageColor(repo.language);
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    // Check if repo has GitHub Pages
    const hasPages = repo.has_pages;
    const pagesUrl = `https://animeshkundu.github.io/${repo.name}`;
    
    card.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            ${repo.language ? `
                <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: ${languageColor}20; color: ${languageColor};">
                    ${repo.language}
                </span>
            ` : '<span></span>'}
            <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                ${repo.stargazers_count > 0 ? `
                    <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        ${repo.stargazers_count}
                    </span>
                ` : ''}
                ${repo.forks_count > 0 ? `
                    <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        ${repo.forks_count}
                    </span>
                ` : ''}
            </div>
        </div>
        <h4 class="text-xl font-bold mb-2">${repo.name}</h4>
        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            ${repo.description || 'No description available'}
        </p>
        <div class="text-sm text-gray-500 dark:text-gray-500 mb-4">
            Updated: ${updatedDate}
        </div>
        <div class="flex gap-3">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="flex-1 text-center px-4 py-2 bg-gray-900 dark:bg-slate-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-slate-600 transition-colors">
                GitHub
            </a>
            ${hasPages ? `
                <a href="${pagesUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Live Demo
                </a>
            ` : ''}
        </div>
    `;
    
    return card;
}

function getLanguageColor(language) {
    const colors = {
        'TypeScript': '#3178c6',
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C': '#555555',
        'C++': '#f34b7d',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Ruby': '#701516',
        'PHP': '#4F5D95',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Shell': '#89e051'
    };
    
    return colors[language] || '#8b5cf6';
}

// ============================================
// Repository Filtering
// ============================================

function initRepoFilters() {
    const filterButtons = document.querySelectorAll('.repo-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            currentFilter = button.getAttribute('data-filter');
            
            // Display filtered repositories
            displayRepositories(allRepositories);
        });
    });
}

function filterRepositories(repos) {
    if (currentFilter === 'all') {
        return repos;
    }
    
    if (currentFilter === 'other') {
        return repos.filter(repo => {
            const lang = repo.language;
            return lang && lang !== 'TypeScript' && lang !== 'Python' && lang !== 'JavaScript';
        });
    }
    
    return repos.filter(repo => repo.language === currentFilter);
}

// ============================================
// Cache Management
// ============================================

const CACHE_KEY = 'github_repos_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

function cacheRepos(repos) {
    const cacheData = {
        timestamp: Date.now(),
        data: repos
    };
    
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Failed to cache repositories:', error);
    }
}

function getCachedRepos() {
    try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (!cached) return null;
        
        const cacheData = JSON.parse(cached);
        const age = Date.now() - cacheData.timestamp;
        
        // Return cached data if it's less than 1 hour old
        if (age < CACHE_DURATION) {
            return cacheData.data;
        }
        
        // Clear expired cache
        sessionStorage.removeItem(CACHE_KEY);
        return null;
    } catch (error) {
        console.error('Failed to retrieve cached repositories:', error);
        return null;
    }
}

// ============================================
// Smooth Scrolling
// ============================================

function initSmoothScroll() {
    // Already handled by CSS scroll-behavior: smooth
    // This function is here for potential future enhancements
    
    // Close mobile menu on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            // Scrolling down
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
}

// ============================================
// Expose fetchRepositories globally for retry button
// ============================================
window.fetchRepositories = fetchRepositories;
