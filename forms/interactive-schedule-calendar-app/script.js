(() => {

  'use strict';

  const MONTH_NAMES = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER'
  ];

  const MONTH_NAMES_FULL = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];


  let currentYear = 2026;
  let currentMonth = 7;

  let selectedDate = {
    year:2026,
    month:7,
    day:31
  };


  const dateKey = (y,m,d) =>
    `${y}-${m}-${d}`;


  const events = {

    [dateKey(2026,7,31)]: [

      {
        id:'e1',
        title:'Design Review',
        start:'10:30 AM',
        end:'12:00 PM',
        place:'Office Room',
        notes:'Design Review with Product Team',
        done:false
      },

      {
        id:'e2',
        title:'Coffee with Sarah',
        start:'5:00 PM',
        end:'',
        place:'Blue Bottle, 5th Ave',
        notes:'Catch up and talk through the freelance project timeline',
        done:false
      }

    ]

  };


  const monthTitle =
    document.getElementById('monthTitle');

  const calendarGrid =
    document.getElementById('calendarGrid');

  const scheduleListTitle =
    document.getElementById('scheduleListTitle');

  const itemCountEl =
    document.getElementById('itemCount');

  const scheduleListEl =
    document.getElementById('scheduleList');

  const prevMonthBtn =
    document.getElementById('prevMonth');

  const nextMonthBtn =
    document.getElementById('nextMonth');

  const tabs =
    document.querySelectorAll('.tab');

  const views =
    document.querySelectorAll('.view');

  const searchInput =
    document.getElementById('searchInput');

  const noteResults =
    document.getElementById('noteResults');

  const fabAdd =
    document.getElementById('fabAdd');

  const sheetBackdrop =
    document.getElementById('sheetBackdrop');

  const sheetSubtitle =
    document.getElementById('sheetSubtitle');

  const cancelBtn =
    document.getElementById('cancelBtn');

  const saveBtn =
    document.getElementById('saveBtn');

  const titleInput =
    document.getElementById('titleInput');

  const startTimeInput =
    document.getElementById('startTimeInput');

  const endTimeInput =
    document.getElementById('endTimeInput');

  const placeInput =
    document.getElementById('placeInput');

  const notesInput =
    document.getElementById('notesInput');

  const statusTime =
    document.getElementById('statusTime');


  function updateClock(){

    const now = new Date();

    let h =
      now.getHours() % 12;

    if (h === 0) {
      h = 12;
    }

    const m =
      String(now.getMinutes())
        .padStart(2,'0');

    statusTime.textContent =
      `${h}:${m}`;

  }


  updateClock();

  setInterval(
    updateClock,
    30000
  );


  function daysInMonth(year,month){

    return new Date(
      year,
      month + 1,
      0
    ).getDate();

  }


  function renderCalendar(){

    monthTitle.textContent =
      `${MONTH_NAMES[currentMonth]} ${currentYear}`;

    calendarGrid.innerHTML = '';


    const firstWeekday =
      new Date(
        currentYear,
        currentMonth,
        1
      ).getDay();

    const totalDays =
      daysInMonth(
        currentYear,
        currentMonth
      );


    const prevMonth =
      currentMonth === 0
        ? 11
        : currentMonth - 1;

    const prevYear =
      currentMonth === 0
        ? currentYear - 1
        : currentYear;

    const prevMonthDays =
      daysInMonth(
        prevYear,
        prevMonth
      );


    const cells = [];


    for (
      let i = firstWeekday - 1;
      i >= 0;
      i--
    ){

      cells.push({
        day:prevMonthDays - i,
        otherMonth:true,
        y:prevYear,
        m:prevMonth
      });

    }


    for (
      let d = 1;
      d <= totalDays;
      d++
    ){

      cells.push({
        day:d,
        otherMonth:false,
        y:currentYear,
        m:currentMonth
      });

    }


    const nextMonth =
      currentMonth === 11
        ? 0
        : currentMonth + 1;

    const nextYear =
      currentMonth === 11
        ? currentYear + 1
        : currentYear;

    let nextDay = 1;


    while (
      cells.length % 7 !== 0
    ){

      cells.push({
        day:nextDay++,
        otherMonth:true,
        y:nextYear,
        m:nextMonth
      });

    }


    cells.forEach(
      (cell,index) => {

        const isSunday =
          index % 7 === 0;

        const key =
          dateKey(
            cell.y,
            cell.m,
            cell.day
          );

        const hasEvents =
          !!events[key] &&
          events[key].length > 0;

        const isSelected =
          !cell.otherMonth &&
          cell.y === selectedDate.year &&
          cell.m === selectedDate.month &&
          cell.day === selectedDate.day;


        const cellEl =
          document.createElement('div');

        cellEl.className =
          'day-cell';


        if (cell.otherMonth) {
          cellEl.classList.add('other-month');
        }

        if (isSunday) {
          cellEl.classList.add('sunday');
        }

        if (isSelected) {
          cellEl.classList.add('selected');
        }

        if (
          hasEvents &&
          !cell.otherMonth
        ){
          cellEl.classList.add('today-dot');
        }


        cellEl.innerHTML =
          `<span class="day-num">${cell.day}</span>`;


        cellEl.addEventListener(
          'click',
          () => {

            selectedDate = {
              year:cell.y,
              month:cell.m,
              day:cell.day
            };

            if (cell.otherMonth){

              currentYear =
                cell.y;

              currentMonth =
                cell.m;

            }

            renderCalendar();
            renderScheduleList();

          }
        );


        calendarGrid.appendChild(
          cellEl
        );

      }
    );

  }


  function goToPrevMonth(){

    currentMonth--;

    if (currentMonth < 0){

      currentMonth = 11;
      currentYear--;

    }

    renderCalendar();

  }


  function goToNextMonth(){

    currentMonth++;

    if (currentMonth > 11){

      currentMonth = 0;
      currentYear++;

    }

    renderCalendar();

  }


  prevMonthBtn.addEventListener(
    'click',
    goToPrevMonth
  );

  nextMonthBtn.addEventListener(
    'click',
    goToNextMonth
  );


  function isToday(y,m,d){

    const today =
      new Date();

    return (
      today.getFullYear() === y &&
      today.getMonth() === m &&
      today.getDate() === d
    );

  }


  function formatSelectedDateLabel(){

    const {
      year,
      month,
      day
    } = selectedDate;

    const label =
      `${MONTH_NAMES_FULL[month]} ${day}, ${year}`;

    return isToday(
      year,
      month,
      day
    )
      ? "Today's Schedule"
      : `${label}'s Schedule`;

  }


  function renderScheduleList(){

    const key =
      dateKey(
        selectedDate.year,
        selectedDate.month,
        selectedDate.day
      );

    const list =
      events[key] || [];


    scheduleListTitle.textContent =
      formatSelectedDateLabel();

    itemCountEl.textContent =
      `${list.length} ${
        list.length === 1
          ? 'item'
          : 'items'
      }`;


    scheduleListEl.innerHTML = '';


    if (list.length === 0){

      scheduleListEl.innerHTML =
        '<div class="empty-state">No schedule for this day yet.</div>';

      return;

    }


    list.forEach(
      (event,index) => {

        const isLast =
          index === list.length - 1;

        const card =
          document.createElement('div');

        card.className =
          'schedule-card';


        card.innerHTML = `

          <div class="timeline">

            <div class="dot">
              ${selectedDate.day}
            </div>

            ${
              isLast
                ? ''
                : '<div class="line"></div>'
            }

          </div>


          <div class="card-body">

            <div class="card-top">

              <span class="card-title">
                ${escapeHtml(event.title)}
              </span>

              <span
                class="checkbox ${event.done ? 'checked' : ''}"
                data-id="${event.id}">
              </span>

            </div>


            <div class="card-row">

              <span class="label">
                Time
              </span>

              <span class="value">
                ${formatTimeRange(event)}
              </span>

            </div>


            ${
              event.place
                ? `<div class="card-row">
                     <span class="label">Place</span>
                     <span class="value">${escapeHtml(event.place)}</span>
                   </div>`
                : ''
            }


            ${
              event.notes
                ? `<div class="card-row">
                     <span class="label">Notes</span>
                     <span class="value">${escapeHtml(event.notes)}</span>
                   </div>`
                : ''
            }

          </div>

        `;


        scheduleListEl.appendChild(
          card
        );

      }
    );


    scheduleListEl
      .querySelectorAll('.checkbox')
      .forEach(
        checkbox => {

          checkbox.addEventListener(
            'click',
            () => {

              const id =
                checkbox.dataset.id;

              const event =
                list.find(
                  item =>
                    item.id === id
                );

              if (event){

                event.done =
                  !event.done;

                renderScheduleList();

              }

            }
          );

        }
      );

  }


  function formatTimeRange(event){

    if (
      event.start &&
      event.end
    ){

      return `${event.start} - ${event.end}`;

    }

    return (
      event.start ||
      event.end ||
      ''
    );

  }


  function escapeHtml(string){

    const div =
      document.createElement('div');

    div.textContent =
      string;

    return div.innerHTML;

  }


  tabs.forEach(
    tab => {

      tab.addEventListener(
        'click',
        () => {

          tabs.forEach(
            item =>
              item.classList.remove('active')
          );

          views.forEach(
            view =>
              view.classList.remove('active')
          );

          tab.classList.add('active');


          const target =
            tab.dataset.tab === 'schedule'
              ? 'scheduleView'
              : 'noteView';

          document
            .getElementById(target)
            .classList.add('active');


          if (
            tab.dataset.tab === 'note'
          ){

            renderNoteResults(
              searchInput.value
            );

          }

        }
      );

    }
  );


  function getAllEventsFlat(){

    const flat = [];


    Object.keys(events)
      .forEach(
        key => {

          const [y,m,d] =
            key
              .split('-')
              .map(Number);

          events[key]
            .forEach(
              event =>
                flat.push({
                  ...event,
                  y,
                  m,
                  d
                })
            );

        }
      );


    flat.sort(
      (a,b) =>
        new Date(
          b.y,
          b.m,
          b.d
        ) -
        new Date(
          a.y,
          a.m,
          a.d
        )
    );


    return flat;

  }


  function renderNoteResults(query){

    const q =
      (query || '')
        .trim()
        .toLowerCase();


    const flat =
      getAllEventsFlat()
        .filter(
          event =>
            !q ||
            event.title
              .toLowerCase()
              .includes(q) ||
            (event.notes || '')
              .toLowerCase()
              .includes(q)
        );


    noteResults.innerHTML = '';


    if (flat.length === 0){

      noteResults.innerHTML =
        '<div class="empty-state">No results found.</div>';

      return;

    }


    let lastKey = null;


    flat.forEach(
      event => {

        const key =
          dateKey(
            event.y,
            event.m,
            event.d
          );


        if (key !== lastKey){

          const label =
            document.createElement('div');

          label.className =
            'note-date-label';

          label.textContent =
            `${MONTH_NAMES_FULL[event.m].toUpperCase()} ${event.d}, ${event.y}`;

          noteResults.appendChild(
            label
          );

          lastKey =
            key;

        }


        const card =
          document.createElement('div');

        card.className =
          'note-card';


        card.innerHTML = `

          <div class="note-card-top">

            <span class="note-card-title">
              ${escapeHtml(event.title)}
            </span>

            <span class="note-card-time">
              ${formatTimeRange(event)}
            </span>

          </div>

          <div class="note-card-notes">
            ${escapeHtml(event.notes || '')}
          </div>

        `;


        noteResults.appendChild(
          card
        );

      }
    );

  }


  searchInput.addEventListener(
    'input',
    () =>
      renderNoteResults(
        searchInput.value
      )
  );


  function openSheet(){

    const {
      year,
      month,
      day
    } = selectedDate;


    sheetSubtitle.textContent =
      `For ${MONTH_NAMES_FULL[month]} ${day}, ${year}`;


    titleInput.value = '';
    startTimeInput.value = '09:00 AM';
    endTimeInput.value = '10:00 AM';
    placeInput.value = '';
    notesInput.value = '';


    sheetBackdrop
      .classList
      .add('open');


    setTimeout(
      () =>
        titleInput.focus(),
      300
    );

  }


  function closeSheet(){

    sheetBackdrop
      .classList
      .remove('open');

  }


  fabAdd.addEventListener(
    'click',
    openSheet
  );

  cancelBtn.addEventListener(
    'click',
    closeSheet
  );


  sheetBackdrop.addEventListener(
    'click',
    event => {

      if (
        event.target ===
        sheetBackdrop
      ){

        closeSheet();

      }

    }
  );


  saveBtn.addEventListener(
    'click',
    () => {

      const title =
        titleInput.value.trim();


      if (!title){

        titleInput.focus();

        titleInput.style.borderColor =
          '#e05555';

        return;

      }


      const {
        year,
        month,
        day
      } = selectedDate;


      const key =
        dateKey(
          year,
          month,
          day
        );


      if (!events[key]) {
        events[key] = [];
      }


      events[key].push({

        id:
          'e' + Date.now(),

        title:title,

        start:
          startTimeInput.value,

        end:
          endTimeInput.value,

        place:
          placeInput.value.trim(),

        notes:
          notesInput.value.trim(),

        done:false

      });


      closeSheet();

      renderCalendar();
      renderScheduleList();

    }
  );


  function cycleTime(input){

    const presets = [
      '08:00 AM',
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '01:00 PM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
      '05:00 PM',
      '06:00 PM'
    ];


    const index =
      presets.indexOf(
        input.value
      );


    input.value =
      presets[
        (index + 1) %
        presets.length
      ] || presets[0];

  }


  startTimeInput.addEventListener(
    'click',
    () =>
      cycleTime(
        startTimeInput
      )
  );

  endTimeInput.addEventListener(
    'click',
    () =>
      cycleTime(
        endTimeInput
      )
  );


  renderCalendar();
  renderScheduleList();

})();
