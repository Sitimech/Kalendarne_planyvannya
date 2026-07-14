let dateStart = document.querySelector('#start-date');
let dateEnd = document.querySelector('#end-date');
let out = document.querySelector('#out');

let holidays = [
  '2026-10-26',
  '2026-10-27',
  '2026-10-28',
  '2026-10-29',
  '2026-10-30',
  '2026-10-31',
  '2026-11-01',
  '2026-12-25',
  '2026-12-26',
  '2026-12-27',
  '2026-12-28',
  '2026-12-29',
  '2026-12-30',
  '2026-12-31',
  '2027-01-01',
  '2027-01-02',
  '2027-01-03',
  '2027-01-04',
  '2027-01-05',
  '2027-01-06',
  '2027-01-07',
  '2027-01-08',
  '2027-01-09',
  '2027-01-10',
  '2027-03-22',
  '2027-03-23',
  '2027-03-24',
  '2027-03-25',
  '2027-03-26',
  '2027-03-27',
  '2027-03-28',
];

let vacation = [];

document.querySelector('.first').onclick = function() {
  dateStart.value = '2026-09-01';
  dateEnd.value = '2026-12-24';
}

document.querySelector('.second').onclick = function() {
  dateStart.value = '2027-01-11';
  dateEnd.value = '2027-05-28';
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