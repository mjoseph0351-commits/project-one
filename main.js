// Dashboard Tab Switching
window.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.dashboard-tab');
    const tabContents = document.querySelectorAll('.dashboard-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Hide all tab contents
            tabContents.forEach(tc => tc.style.display = 'none');
            // Activate clicked tab
            tab.classList.add('active');
            const tabName = tab.getAttribute('data-tab');
            document.getElementById('tab-' + tabName).style.display = 'block';
        });

    // Error handling for missing elements
    if (tabs.length === 0 || tabContents.length === 0) {
        console.error('Tabs or tab contents are missing.');
        return;
    }

    // Default tab activation
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
        tabContents[0].style.display = 'block';
    }

    // Function to initialize tabs
    function initializeTabs() {
        tabs.forEach(tab => {
            tab.setAttribute('role', 'tab'); // Accessibility enhancement
            tab.addEventListener('click', debounce(function() {
                // Remove active from all tabs
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false'); // Accessibility enhancement
                });
                // Hide all tab contents
                tabContents.forEach(tc => tc.style.display = 'none');
                // Activate clicked tab
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true'); // Accessibility enhancement
                const tabName = tab.getAttribute('data-tab');
                document.getElementById('tab-' + tabName).style.display = 'block';
            }, 200)); // Debouncing for performance
        });
    }

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Initialize tabs
    initializeTabs();

    // Observe for dynamic tab additions
    const observer = new MutationObserver(initializeTabs);
    observer.observe(document.body, { childList: true, subtree: true });
});
