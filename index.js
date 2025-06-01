    // GitHub API Integration
        const GITHUB_USERNAME = 'anwaar12345';
        const PROJECTS_CONTAINER = document.getElementById('projects-container');
        const GITHUB_LOADER = document.getElementById('github-loader');

        // Language colors mapping
        const LANGUAGE_COLORS = {
            'PHP': '#4F5D95',
            'JavaScript': '#f1e05a',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Python': '#3572A5',
            'Java': '#b07219',
            'TypeScript': '#2b7489',
            'Shell': '#89e051',
            'Vue': '#41b883',
            'Dockerfile': '#384d54'
        };

        // Fetch GitHub data
        async function fetchGitHubData() {
            try {
                // Fetch user stats
                const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                const userData = await userResponse.json();
                
                document.getElementById('repo-count').textContent = userData.public_repos;
                document.getElementById('gist-count').textContent = userData.public_gists;
                document.getElementById('follower-count').textContent = userData.followers;
                
                // Fetch repositories
                const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
                const reposData = await reposResponse.json();
                
                // Calculate total stars
                const starCount = reposData.reduce((total, repo) => total + repo.stargazers_count, 0);
                document.getElementById('star-count').textContent = starCount;
                
                // Display projects
                PROJECTS_CONTAINER.innerHTML = reposData.map(repo => `
                    <div class="col-md-6 mb-4">
                        <div class="card h-100 github-project">
                            <div class="card-body">
                                <h5 class="card-title">${formatRepoName(repo.name)}</h5>
                                <p class="card-text">${repo.description || 'No description available'}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        ${repo.language ? `
                                            <span class="me-2">
                                                <span class="language-dot" style="background-color: ${LANGUAGE_COLORS[repo.language] || '#ccc'}"></span>
                                                ${repo.language}
                                            </span>
                                        ` : ''}
                                        <span class="me-2"><i class="bi bi-star"></i> ${repo.stargazers_count}</span>
                                        <span><i class="bi bi-diagram-2"></i> ${repo.forks_count}</span>
                                    </div>
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-sm btn-outline-dark">
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                GITHUB_LOADER.style.display = 'none';
                
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
                PROJECTS_CONTAINER.innerHTML = `
                    <div class="col-12 text-center text-danger">
                        <p>Failed to load GitHub projects. Please check <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">my GitHub profile</a> directly.</p>
                    </div>
                `;
                GITHUB_LOADER.style.display = 'none';
            }
        }

        function formatRepoName(name) {
            return name.replace(/-/g, ' ').replace(/_/g, ' ')
                      .replace(/(^\w|\s\w)/g, m => m.toUpperCase());
        }

        // Load GitHub data when page loads
        document.addEventListener('DOMContentLoaded', fetchGitHubData);
    

            // Close mobile navbar when clicking on a nav link
    document.addEventListener('DOMContentLoaded', function() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Add click event to all nav links
        navLinks.forEach(function(navLink) {
            navLink.addEventListener('click', function() {
                // Check if navbar is expanded (mobile view)
                if(navbarCollapse.classList.contains('show')) {
                    // Close the navbar
                    navbarToggler.click();
                }
            });
        });
        
        // Optional: Close navbar when clicking anywhere outside
        document.addEventListener('click', function(event) {
            const isClickInsideNavbar = document.querySelector('.navbar').contains(event.target);
            if(!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if(window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });