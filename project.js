//document.querySelector(): This method selects the first element that matches the specified CSS selector.
const monthYearDisplay = document.getElementById('month-year');
const prevMonthBtn = document.querySelector('.prev-month');
const nextMonthBtn = document.querySelector('.next-month');
const todayBtn = document.querySelector('.today-btn');
const gotoBtn = document.querySelector('.goto-btn');
const dateInput = document.querySelector('.date-input');
//Source: https://www.w3schools.com/jsref/met_element_queryselector.asp 
//Source: https://www.w3schools.com/jsref/met_document_queryselector.asp
//Source: https://www.shecodes.io/athena/91747-what-does-the-document-queryselector-function-do-in-javascript

//new Date(): This creates a new Date object representing the current date and time.
let currentDate = new Date();


//This array holds the names of the months, allowing for easy display in the calendar.
const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

// Function to render the calendar for a specific date
function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Display the current month and year
    monthYearDisplay.textContent = `${months[month]} ${year}`;

    // Get first and last day of the current month
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    // Clear any existing days
    daysContainer.innerHTML = '';

    // Get last date of the previous month
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    // Add days from the previous month if needed
    for (let i = firstDayOfMonth; i > 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('prev-month-day');
        dayElement.textContent = prevMonthLastDate - i + 1;
        daysContainer.appendChild(dayElement);
    }

    // Inside renderCalendar() function where we highlight today's date
    for (let i = 1; i <= lastDateOfMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('current-month-day');
        dayElement.textContent = i;
        daysContainer.appendChild(dayElement);

    // Highlight today's date with a green background
        const today = new Date();
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add('today');
        }
    }

    // Add days for the next month to complete the grid (42 total cells for a 6-week layout)
    const totalDays = daysContainer.children.length;
    const nextMonthDaysCount = 42 - totalDays;
    for (let i = 1; i <= nextMonthDaysCount; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('next-month-day');
        dayElement.textContent = i;
        daysContainer.appendChild(dayElement);
    }
}

// Navigate to the previous month
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

// Navigate to the next month
nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// Jump to today's date
todayBtn.addEventListener('click', () => {
    currentDate = new Date();
    renderCalendar(currentDate);
});

// Jump to a specific month/year based on user input
gotoBtn.addEventListener('click', () => {
    const dateValue = dateInput.value.split('/');
    const month = parseInt(dateValue[0]) - 1; // Month is 0-indexed
    const year = parseInt(dateValue[1]);

    if (!isNaN(month) && !isNaN(year) && month >= 0 && month < 12) {
        currentDate.setMonth(month);
        currentDate.setFullYear(year);
        renderCalendar(currentDate);
    } else {
        alert('Please enter a valid date in mm/yyyy format.');
    }
});

// Initial render of the calendar
renderCalendar(currentDate);
