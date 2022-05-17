'use strict';

// fullcalendar library
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        timeZone: 'local',
        selectable: true, //선택 할 수 있음
        // locale: "ko",

        header: {
            center: 'title',
            left: 'prev',
            right: 'next today',
        },
        titleFormat: function (date) {
            return date.date.year + '년' + ' ' + (date.date.month + 1) + '월';
        },
        events: [
            {
                title: '원격협진',
                start: '2021-12-10T10:00:00',
                constraint: 'businessHours',
            },
            {
                title: '원격협진',
                start: '2021-12-15T10:00:00',
                constraint: 'businessHours',
            },

            {
                title: '원격협진',
                start: '2021-12-16T10:00:00',
                constraint: 'businessHours',
            },
        ],
    });
    calendar.render();
});

//   년도 선택
const yearLabel = document.querySelector('.year_label');
const yearOptions = document.querySelectorAll('.year_option');

const yearSelect = (item) => {
    yearLabel.parentNode.classList.remove('active');
    yearLabel.innerHTML = item.textContent;
};

yearOptions.forEach((option) => {
    option.addEventListener('click', () => yearSelect(option));
});

yearLabel.addEventListener('click', () => {
    if (yearLabel.parentNode.classList.contains('active')) {
        yearLabel.parentNode.classList.remove('active');
    } else {
        yearLabel.parentNode.classList.add('active');
    }
});

// 월 선택
const monthLabel = document.querySelector('.month_label');
const monthOptions = document.querySelectorAll('.month_option');

const monthSelect = (item) => {
    monthLabel.parentNode.classList.remove('active');
    monthLabel.innerHTML = item.textContent;
};

monthOptions.forEach((option) => {
    option.addEventListener('click', () => monthSelect(option));
});

monthLabel.addEventListener('click', () => {
    if (monthLabel.parentNode.classList.contains('active')) {
        monthLabel.parentNode.classList.remove('active');
    } else {
        monthLabel.parentNode.classList.add('active');
    }
});
