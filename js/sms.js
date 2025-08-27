document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.getElementById('isToggle');
    const navigationMenu = document.getElementById('navigation');
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    if (navbarToggle && navigationMenu) {
        navbarToggle.addEventListener('click', () => {
            // Toggle display of the main navigation menu
            if (navigationMenu.style.display === 'block') {
                navigationMenu.style.display = 'none';
            } else {
                navigationMenu.style.display = 'block';
            }
        });
    }

    // Handle submenu toggling for mobile view if applicable
    // This assumes the submenu toggle logic (showing/hiding .submenu)
    // is managed by a class or display property directly
    hasSubmenus.forEach(submenuParent => {
        const submenuLink = submenuParent.querySelector('a.cursor-pointer'); // The link that triggers submenu
        const submenu = submenuParent.querySelector('.submenu'); // The actual submenu ul

        if (submenuLink && submenu) {
            // This is a basic toggle. Original Angular app likely has more sophisticated logic.
            // On mobile, clicking the parent link should open/close the submenu.
            // On desktop, it's typically CSS :hover based.
            submenuLink.addEventListener('click', (event) => {
                // Prevent navigation if it's just a toggle
                event.preventDefault();

                // Only toggle if we're in a mobile-like context (where the main nav is shown by JS)
                // This is a heuristic; more robust would be checking window width or a CSS media query match.
                if (window.getComputedStyle(navigationMenu).display === 'block') {
                     if (submenu.style.display === 'block') {
                        submenu.style.display = 'none';
                    } else {
                        submenu.style.display = 'block';
                    }
                }
            });
        }
    });

    // Optional: Close mobile menu if window is resized to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992 && navigationMenu) { // 992px is a common breakpoint for desktop nav
            navigationMenu.style.display = ''; // Reset display, let CSS handle it
        }
    });

    // Scroll to top button (if any, not explicitly in the HTML snippet but common)
    // You would need to add a button with ID 'scrollTopBtn' for this to work
    // const scrollTopBtn = document.getElementById('scrollTopBtn');
    // if (scrollTopBtn) {
    //     window.addEventListener('scroll', () => {
    //         if (window.scrollY > 300) { // Show button after scrolling down 300px
    //             scrollTopBtn.style.display = 'block';
    //         } else {
    //             scrollTopBtn.style.display = 'none';
    //         }
    //     });
    //     scrollTopBtn.addEventListener('click', () => {
    //         window.scrollTo({
    //             top: 0,
    //             behavior: 'smooth'
    //         });
    //     });
    // }

    // Enterprise banner close functionality
    const closeBannerBtn = document.querySelector('.fixed.bottom-0.left-0.right-0.z-50 button');
    const enterpriseBanner = document.querySelector('.fixed.bottom-0.left-0.right-0.z-50');

    if (closeBannerBtn && enterpriseBanner) {
        closeBannerBtn.addEventListener('click', () => {
            enterpriseBanner.style.transform = 'translateY(100%)'; // Move banner off-screen
            enterpriseBanner.style.opacity = '0'; // Fade it out
            setTimeout(() => {
                enterpriseBanner.style.display = 'none'; // Remove from flow after animation
            }, 300); // Match CSS transition duration
        });
    }
});