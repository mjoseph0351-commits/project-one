// Dashboard Tab Switching
window.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.dashboard-tab');
    const tabContents = document.querySelectorAll('.dashboard-tab-content');

    // Error handling for missing elements
    if (tabs.length === 0) {
        console.error('No tabs found. Ensure elements with the class ".dashboard-tab" exist.');
        return;
    }
    if (tabContents.length === 0) {
        console.error('No tab contents found. Ensure elements with the class ".dashboard-tab-content" exist.');
        return;
    }

    // Default tab activation
    function activateDefaultTab() {
        if (tabs.length > 0) {
            tabs[0].classList.add('active');
            tabContents[0].style.display = 'block';
        }
    }

    // Function to handle tab switching
    function switchTab(tab) {
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
        const targetContent = document.getElementById('tab-' + tabName);
        if (targetContent) {
            targetContent.style.display = 'block';
        } else {
            console.warn(`No content found for tab: ${tabName}`);
        }
    }

    // Function to initialize tabs
    function initializeTabs() {
        tabs.forEach(tab => {
            tab.setAttribute('role', 'tab'); // Accessibility enhancement
            tab.addEventListener('click', debounce(() => switchTab(tab), 200)); // Debouncing for performance
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

    // Initialize tabs and activate the default tab
    initializeTabs();
    activateDefaultTab();

    // Observe for dynamic tab additions
    const observer = new MutationObserver(() => {
        console.info('DOM mutation detected. Reinitializing tabs.');
        initializeTabs();
    });
    observer.observe(document.body, { childList: true, subtree: true });
});
