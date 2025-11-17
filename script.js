// script for js
document.addEventListener('DOMContentLoaded', () => {

    const rightColumn = document.querySelector('.right-column-wrapper');
    const navLinks = document.querySelectorAll('.left-content nav a.nav-link');
    // Get the static content and footer elements
    const defaultSplash = document.getElementById('splash-content'); 
    const staticFooter = document.getElementById('static-footer');
    
    // --- UTILITY FUNCTIONS ---
    function removeActiveClasses() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    // Function to hide the static content when a link is clicked
    function hideDefaultContent() {
        if (defaultSplash) defaultSplash.style.display = 'none';
        if (staticFooter) staticFooter.style.display = 'none'; 
        // Clear any content that might have been loaded dynamically previously
        // We use innerHTML = '' on the rightColumn before insertion, but this ensures safety
        rightColumn.innerHTML = ''; 
    }

    // Function to load content dynamically via fetch
    async function loadContent(fileName) {
        // 1. Hide the static splash content before loading new content
        hideDefaultContent(); 
        
        try {
            const response = await fetch(fileName);
            if (!response.ok) {
                throw new Error(`Failed to load content file: ${fileName}`);
            }
            const htmlContent = await response.text();

            // 2. Insert new HTML
            rightColumn.innerHTML = htmlContent;
            window.scrollTo(0, 0); 

            // 3. Re-attach event listeners (especially for the gallery)
            //attachGalleryTriggers(); 

        } catch (error) {
            console.error('Content loading error:', error);
            rightColumn.innerHTML = `<h2>Error</h2><p>Could not load content for ${fileName}. Please ensure <code>${fileName}</code> exists in the same directory.</p>`;
        }
    }

    // --- NAV LINK CLICK HANDLER ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const contentFile = this.getAttribute('data-content-file');
            if (contentFile) {
                loadContent(contentFile);
                
                removeActiveClasses();
                this.classList.add('active');
            }
        });
    });

