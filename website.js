// Dynamic Header Background
const headerBackground = document.querySelector('.header-background');
const images = [
    'C:/Users/TinasheHando/Documents/Agapao Mission/happy together.jpeg',
    'C:/Users/TinasheHando/Documents/Agapao Mission/Volunteer in Kenya with IVHQ - Lowest Fees & #1 Rated Projects.jpeg',
    'C:/Users/TinasheHando/Documents/Agapao Mission/Donations[World].jpeg'
];

let currentImageIndex = 0;

function changeBackground() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    headerBackground.style.backgroundImage = `url('${images[currentImageIndex]}')`;
}

setInterval(changeBackground, 5000); // Change image every 5 seconds

// Holiday Data (Static)
const holidays = {
    '2025-10-02': 'Gandhi Jayanti',
    '2025-12-25': 'Christmas',
    '2025-11-14': 'Children Day',
    '2025-01-26': 'Republic Day',
    '2025-08-15': 'Independence Day',
    '2025-03-23' : 'Martyrs Day',
    '2025-03-24' : 'World Tuberculosis Day',
    '2025-04-07' : 'World Health Day',
    '2025-04-14' : 'Ambedkar Jayanti',
    '2025-04-22' : 'Earth Day',
    '2025-04-04' : 'Senegal Independence Day',
    '2025-04-18' : 'Zimbabwe Independence Day',
    '2025-04-27' : 'Togo Independence Day',	
};

// Calendar Logic
const calendarGrid = document.getElementById('calendar-grid');
const currentMonthYear = document.getElementById('current-month-year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();

function renderCalendar() {
    // Clear the calendar
    calendarGrid.innerHTML = '';

    // Set the current month and year
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    currentMonthYear.textContent = `${month} ${year}`;

    // Get the first day of the month
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startingDay = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Get the number of days in the month
    const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // Add empty cells for days before the first day
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;

        // Check if the day is a holiday
        if (holidays[dateString]) {
            dayElement.classList.add('holiday');
            dayElement.title = holidays[dateString]; // Show holiday name on hover
        }

        calendarGrid.appendChild(dayElement);
    }
}

// Event Listeners for Month Navigation
prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial Render
renderCalendar();

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

// Testimonial Slider
let testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

document.querySelector('.prev').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

document.querySelector('.next').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Donation Form Simulation
document.getElementById('donation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show processing message
    document.getElementById('processing-message').classList.remove('hidden');
    document.getElementById('success-message').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');
    
    // Simulate a donation processing delay
    setTimeout(() => {
        document.getElementById('processing-message').classList.add('hidden');
        
        // Simulate success or error
        const isSuccess = Math.random() > 0.2; // 80% success rate
        if (isSuccess) {
            document.getElementById('success-message').classList.remove('hidden');
            document.getElementById('transaction-id').textContent = `SIM-${Math.floor(Math.random() * 1000000)}`;
        } else {
            document.getElementById('error-message').classList.remove('hidden');
        }
    }, 2000); // 2 seconds delay
});