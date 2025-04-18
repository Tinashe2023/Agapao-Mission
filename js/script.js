document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const config = {
        // Default image URL.  This is used if the images array is empty or an error occurs.
        defaultImageUrl: 'https://placehold.co/1920x1080/000/fff?text=NGO+Banner&font=Montserrat',
        // Interval for slideshow image change (in milliseconds)
        slideshowInterval: 5000,
        // Donation processing simulation delay (in milliseconds)
        donationProcessDelay: 2000,
        // Donation success rate (as a percentage, e.g., 0.8 for 80%)
        donationSuccessRate: 0.8,
        // Static holiday data
        holidays: {
            '2025-10-02': 'Gandhi Jayanti',
            '2025-12-25': 'Christmas',
            '2025-11-14': 'Children Day',
            '2025-01-26': 'Republic Day',
            '2025-08-15': 'Independence Day',
            '2025-03-23': 'Martyrs Day',
            '2025-03-24': 'World Tuberculosis Day',
            '2025-04-07': 'World Health Day',
            '2025-04-14': 'Ambedkar Jayanti',
            '2025-04-22': 'Earth Day',
            '2025-04-04': 'Senegal Independence Day',
            '2025-04-18': 'Zimbabwe Independence Day',
            '2025-04-27': 'Togo Independence Day',
            '2025-04-24': 'Lecture Day',
        },
        images: [
            'images/happy together.jpeg',
            'images/Volunteer in Kenya with IVHQ - Lowest Fees & #1 Rated Projects.jpeg',
            'images/Donations[World].jpeg'
        ]
    };

    // --- DOM Elements ---
    const headerBackground = document.querySelector('.header-background');
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYearDisplay = document.getElementById('current-month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrevButton = document.querySelector('.testimonial-slider .prev'); // Corrected selector
    const testimonialNextButton = document.querySelector('.testimonial-slider .next'); // Corrected selector
    const donationForm = document.getElementById('donation-form');
    const processingMessage = document.getElementById('processing-message');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const transactionIdDisplay = document.getElementById('transaction-id');

    // --- Helper Functions ---

    /**
     * Sets the background image of the header with a smooth transition.
     * @param {string} imageUrl - The URL of the image to set.
     */
    function setHeaderBackground(imageUrl) {
        headerBackground.style.backgroundImage = `url('${imageUrl}')`;
        headerBackground.style.transition = 'background-image 0.5s ease-in-out'; // Add smooth transition
    }

    /**
     * Displays a message for a specified duration and then hides it.
     * @param {HTMLElement} element - The element to show/hide (e.g., message container).
     * @param {number} duration - The duration in milliseconds to display the message.
     */
    function showMessage(element, duration = 3000) {
        element.classList.remove('hidden');
        setTimeout(() => {
            element.classList.add('hidden');
        }, duration);
    }

    // --- Event Handlers ---

    /**
     * Changes the header background image every few seconds.
     */
    function changeHeaderBackground() {
        if (config.images && config.images.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % config.images.length;
            setHeaderBackground(config.images[currentImageIndex]);
        } else {
            setHeaderBackground(config.defaultImageUrl); // Fallback to default image
        }
    }

    /**
     * Renders the calendar for the current month and year.
     */
    function renderCalendar() {
        calendarGrid.innerHTML = ''; // Clear existing content
        const currentDate = new Date();
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const year = currentDate.getFullYear();
        currentMonthYearDisplay.textContent = `${month} ${year}`;

        const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1);
        const startingDay = firstDayOfMonth.getDay();
        const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

        for (let i = 0; i < startingDay; i++) {
            calendarGrid.appendChild(createCalendarCell('')); // Empty cells for leading days
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, currentDate.getMonth(), day);
            const dateString = date.toISOString().split('T')[0];
            const dayCell = createCalendarCell(day);

            if (config.holidays[dateString]) {
                dayCell.classList.add('holiday');
                dayCell.title = config.holidays[dateString];
            }
            calendarGrid.appendChild(dayCell);
        }
    }

    /**
    * Creates a calendar cell (div element) with the given content.
    * @param {string | number} content - The text content of the cell.
    * @returns {HTMLDivElement} - The created calendar cell.
    */
    function createCalendarCell(content) {
        const cell = document.createElement('div');
        cell.classList.add('calendar-grid-item');
        cell.textContent = content;
        return cell;
    }

    /**
     * Displays the previous month in the calendar.
     */
    function showPreviousMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    }

    /**
     * Displays the next month in the calendar.
     */
    function showNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    }

    /**
     * Shows a specific testimonial.
     * @param {number} index - The index of the testimonial to display.
     */
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    /**
     * Handles the donation form submission.
     * @param {Event} event - The form submit event.
     */
    function handleDonationSubmit(event) {
        event.preventDefault();
        processingMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        setTimeout(() => {
            processingMessage.classList.add('hidden');
            const isSuccess = Math.random() < config.donationSuccessRate;
            if (isSuccess) {
                successMessage.classList.remove('hidden');
                transactionIdDisplay.textContent = `SIM-${Math.floor(Math.random() * 1000000)}`;
            } else {
                errorMessage.classList.remove('hidden');
            }
        }, config.donationProcessDelay);
    }

    // --- Initialization ---

    // Set initial header background
    setHeaderBackground(config.images[0] || config.defaultImageUrl);
    setInterval(changeHeaderBackground, config.slideshowInterval);

    // Render initial calendar
    renderCalendar();

    // Initialize testimonial slider
    let currentTestimonialIndex = 0;
    showTestimonial(currentTestimonialIndex);

    // --- Event Listeners ---

    prevMonthButton.addEventListener('click', showPreviousMonth);
    nextMonthButton.addEventListener('click', showNextMonth);

    testimonialPrevButton.addEventListener('click', () => { // Corrected event listener
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    });

    testimonialNextButton.addEventListener('click', () => { // Corrected event listener
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    });

    donationForm.addEventListener('submit', handleDonationSubmit);
});

// Slideshow Logic
function startSlideshow(slideshow) {
    const slides = slideshow.querySelectorAll('.slide');
    let currentSlide = 0;

    function showNextSlide() {
        // Hide the current slide
        slides[currentSlide].classList.remove('active');

        // Move to the next slide
        currentSlide = (currentSlide + 1) % slides.length;

        // Show the next slide
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    setInterval(showNextSlide, 5000);
}

// Initialize slideshows for all campaign cards
document.querySelectorAll('.slideshow').forEach(startSlideshow);