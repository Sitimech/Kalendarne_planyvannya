let dateStart = document.querySelector('#start-date');
let dateEnd = document.querySelector('#end-date');
let out = document.querySelector('#out');

let holidays = [
  '2025-10-27',
  '2025-10-28',
  '2025-10-29',
  '2025-10-30',
  '2025-10-31',
  '2025-11-01',
  '2025-11-02',
  '2025-12-20',
  '2025-12-21',
  '2025-12-22',
  '2025-12-23',
  '2025-12-24',
  '2025-12-25',
  '2025-12-26',
  '2025-12-27',
  '2025-12-28',
  '2025-12-29',
  '2025-12-30',
  '2025-12-31',
  '2026-01-01',
  '2026-01-02',
  '2026-01-03',
  '2026-01-04',
  '2026-01-05',
  '2026-01-06',
  '2026-01-07',
  '2026-01-08',
  '2026-01-09',
  '2026-01-10',
  '2026-01-11',
  '2026-03-21',
  '2026-03-22',
  '2026-03-23',
  '2026-03-24',
  '2026-03-25',
  '2026-03-26',
  '2026-03-27',
  '2026-03-28',
  '2026-03-29'
];

let vacation = [];

document.querySelector('.first').onclick = function() {
  dateStart.value = '2025-09-01';
  dateEnd.value = '2025-12-19';
}

document.querySelector('.second').onclick = function() {
  dateStart.value = '2026-01-12';
  dateEnd.value = '2026-05-29';
}

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  out.innerHTML = '';

  let start = Date.parse(dateStart.value);
  let end = Date.parse(dateEnd.value);
  let daysWeek = [];
  let checks = document.getElementsByName('day');

  for (let i = 0; i < checks.length; i++) {
    if (checks[i].checked) {
      daysWeek.push(+checks[i].value);
    }
  }

  let weekType = document.querySelector('input[name="week-type"]:checked').value;
  let datesOutput = [];
  let counter = 1;

  let startDate = new Date(start);
  let startWeekNumber = Math.floor((start - Date.parse(new Date(startDate.getFullYear(), 0, 1))) / (7 * 24 * 60 * 60 * 1000)) + 1;
  let isOddWeek = (startWeekNumber % 2 === 1); 
  for (let i = start; i <= end; i += 24 * 60 * 60 * 1000) {
    let date = new Date(i);
    let dateString = date.toISOString().split('T')[0];
    let weekNumber = Math.floor((i - Date.parse(new Date(date.getFullYear(), 0, 1))) / (7 * 24 * 60 * 60 * 1000)) + 1;

    let currentWeekIsOdd = (weekNumber % 2 === 1);

    if (daysWeek.includes(date.getDay()) &&
        !holidays.includes(dateString) &&
        !vacation.includes(dateString) &&
        (weekType === 'both' || 
         (weekType === 'a' && currentWeekIsOdd === isOddWeek) || 
         (weekType === 'b' && currentWeekIsOdd !== isOddWeek))) {

      let day = String(date.getDate()).padStart(2, '0');
      let month = String(date.getMonth() + 1).padStart(2, '0');
      let year = date.getFullYear();

      datesOutput.push(`${counter}. ${day}.${month}.${year}`);
      counter++;
    }
    
    if (holidays.includes(dateString)) {
      isOddWeek = !isOddWeek; 
    }
  }

  out.innerHTML = datesOutput.join('<br>');
});