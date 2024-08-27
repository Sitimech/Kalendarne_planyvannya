let dateStart = document.querySelector('#start-date');
let dateEnd = document.querySelector('#end-date');
let out = document.querySelector('#out');

let holidays = [
  '2024-10-28',
  '2024-10-29',
  '2024-10-30',
  '2024-10-31',
  '2024-11-01',
  '2024-11-02',
  '2024-11-03',
  '2024-12-25',
  '2024-12-26',
  '2024-12-27',
  '2024-12-28',
  '2024-12-29',
  '2024-12-30',
  '2024-12-31',
  '2025-01-01',
  '2025-01-02',
  '2025-01-03',
  '2025-01-04',
  '2025-01-05',
  '2025-01-06',
  '2025-01-07',
  '2025-01-08',
  '2025-01-09',
  '2025-01-10',
  '2025-01-11',
  '2025-01-12',
  '2025-03-24',
  '2025-03-25',
  '2025-03-26',
  '2025-03-27',
  '2025-03-28',
  '2025-03-29',
  '2025-03-30'
];

let vacation = [];

document.querySelector('.first').onclick = function() {
  dateStart.value = '2024-09-02';
  dateEnd.value = '2024-12-24';
}

document.querySelector('.second').onclick = function() {
  dateStart.value = '2025-01-13';
  dateEnd.value = '2025-05-30';
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