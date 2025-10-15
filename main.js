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

// Enhanced Dropdown Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        // Toggle dropdown visibility on click
        dropdown.addEventListener('click', (e) => {
            e.preventDefault();
            const isVisible = dropdownMenu.style.display === 'block';
            closeAllDropdowns(); // Close other open dropdowns
            dropdownMenu.style.display = isVisible ? 'none' : 'block';
            dropdownMenu.style.opacity = isVisible ? '0' : '1';
            dropdownMenu.style.transform = isVisible ? 'translateY(-10px)' : 'translateY(0)';
        });

        dropdown.setAttribute('aria-haspopup', 'true');
            dropdown.setAttribute('aria-expanded', isVisible ? 'true' : 'false');


        // Close dropdown if clicked outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdownMenu.style.display = 'none';
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.transform = 'translateY(-10px)';
            }
        });

        // Close dropdown on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdownMenu.style.display = 'none';
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.transform = 'translateY(-10px)';
            }
        });

        // Keyboard navigation within dropdown
        const dropdownItems = dropdownMenu.querySelectorAll('a');
        dropdown.addEventListener('keydown', (e) => {
            const currentIndex = Array.from(dropdownItems).indexOf(document.activeElement);
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % dropdownItems.length;
                dropdownItems[nextIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + dropdownItems.length) % dropdownItems.length;
                dropdownItems[prevIndex].focus();
            } else if (e.key === 'Enter') {
                document.activeElement.click();
            }
        });
    });

    // Helper function to close all dropdowns
    function closeAllDropdowns() {
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            menu.style.display = 'none';
            menu.style.opacity = '0';
            menu.style.transform = 'translateY(-10px)';
        });
    }
});

// JavaScript to toggle the right sidebar visibility
const widgetIcon = document.querySelector('.widget-icon');
const rightSide = document.querySelector('.right-side');

if (widgetIcon && rightSide) {
    widgetIcon.addEventListener('click', () => {
        rightSide.classList.toggle('open'); // Toggle the 'open' class to show/hide the sidebar
    });
}
