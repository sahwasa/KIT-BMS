var calendar;

// =============================================
// 1. 월간 뷰 이벤트 데이터 (실제 DB 연동 시 교체)
// =============================================
var monthlyEvents = [
  { resourceId: '150', start: '2026-05-01', end: '2026-05-01',
    extendedProps: { type: '외근(09~13)',   time: '- / -' } },
  { resourceId: '150', start: '2026-05-02', end: '2026-05-02', className: 'cal_check',
    extendedProps: { type: '평일(09~18)',   time: '<span class="t_red">+3분</span> / -' } },
  { resourceId: '150', start: '2026-05-03', end: '2026-05-03', className: 'cal_modified',
    extendedProps: { type: '반차(13~19)',   time: '- / <span class="t_red">-30분</span>' } },
  { resourceId: '150', start: '2026-05-04', end: '2026-05-04',
    extendedProps: { type: '휴일',          time: '- / -' } },
  { resourceId: '150', start: '2026-05-05', end: '2026-05-05',
    extendedProps: { type: '휴일',          time: '- / -' } },
  { resourceId: '151', start: '2026-05-01', end: '2026-05-01', className: 'cal_delay',
    extendedProps: { type: '연차',          time: '- / -' } },
  { resourceId: '151', start: '2026-05-02', end: '2026-05-02', className: 'cal_delay',
    extendedProps: { type: '평일(10~19)',   time: '- / -' } },
  { resourceId: '151', start: '2026-05-03', end: '2026-05-03', className: 'cal_delay',
    extendedProps: { type: '출장',          time: '- / -' } },
  { resourceId: '151', start: '2026-05-04', end: '2026-05-04', className: 'cal_delay',
    extendedProps: { type: '휴일근무(09~18)', time: '- / -' } },
  { resourceId: '151', start: '2026-05-05', end: '2026-05-05', className: 'cal_delay',
    extendedProps: { type: '휴일',          time: '- / -' } },
];

// =============================================
// 2. 연간 뷰 이벤트 데이터 (실제 DB 연동 시 교체)
// =============================================
var yearlyEvents = [
  { resourceId: '150', start: '2026-01-01', extendedProps: { late: 0, early_leave: 0 } },
  { resourceId: '150', start: '2026-02-01', extendedProps: { late: 0, early_leave: 0 } },
  { resourceId: '150', start: '2026-03-01', extendedProps: { late: 0, early_leave: 0 } },
  { resourceId: '150', start: '2026-05-01', extendedProps: { late: 1, early_leave: 1 } },
  { resourceId: '151', start: '2026-01-01', extendedProps: { late: 0, early_leave: 0 } },
  { resourceId: '151', start: '2026-02-01', extendedProps: { late: 0, early_leave: 0 } },
  { resourceId: '151', start: '2026-03-01', extendedProps: { late: 0, early_leave: 0 } },
  { resourceId: '151', start: '2026-05-01', extendedProps: { late: 0, early_leave: 0 } },
];

// =============================================
// 3. 리소스(사원) 데이터 (실제 DB 연동 시 교체)
// =============================================
var RESOURCES = [
  { id: '150', employee_id: '150', employee_name: '꾸래핑', dept: 'IT사업본부', loc: '본사', attendance: '1 / 1' },
  { id: '151', employee_id: '151', employee_name: '바로핑', dept: 'IT사업본부', loc: '본사', attendance: '0 / 0' },
  { id: '152', employee_id: '152', employee_name: '하츄핑', dept: 'IT사업본부', loc: '본사', attendance: '0 / 0' },
  { id: '153', employee_id: '153', employee_name: '아자핑', dept: 'IT사업본부', loc: '본사', attendance: '0 / 0' },
  { id: '154', employee_id: '154', employee_name: '차차핑', dept: 'IT사업본부', loc: '본사', attendance: '0 / 0' },
];

// =============================================
// 4. FullCalendar 초기화
// =============================================
document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('hrAttendance');

  // ─── 헤더 정렬 상태 ───────────────────────────────
  const sortState = { field: null, order: 'asc' };

  /**
   * 정렬 가능한 컬럼 헤더 옵션 생성
   * @param {string} field - 리소스 필드명
   * @param {string} label - 헤더 표시 텍스트
   */
  function makeSortableHeader(field, label) {
    return {
      field,
      headerContent: function () {
        // 렌더링 시마다 sortState 보고 화살표 결정
        let arrow = '';
        if (sortState.field === field) {
          arrow = sortState.order === 'asc' ? ' ▲' : ' ▼';
        }
        const el = document.createElement('span');
        el.className = `sort-header sort-header-${field}`;
        el.textContent = `${label}${arrow}`;
        return { domNodes: [el] };
      },
      headerDidMount: function (arg) {
        arg.el.style.cursor = 'pointer';
        if (arg.el.dataset.sortBound) return; // 중복 이벤트 방지
        arg.el.dataset.sortBound = 'true';

        arg.el.addEventListener('click', function () {
          if (sortState.field === field) {
            // 같은 컬럼 재클릭 → 방향 전환
            sortState.order = sortState.order === 'asc' ? 'desc' : 'asc';
          } else {
            // 다른 컬럼 클릭 → 오름차순 초기화
            sortState.field = field;
            sortState.order = 'asc';
          }

          // 정렬 전 세로 스크롤 위치 저장 후 복원
          const vertScroller = calendarEl.querySelector('.fc-scroller-liquid-absolute');
          const savedScrollTop = vertScroller ? vertScroller.scrollTop : 0;

          calendar.setOption('resourceOrder', sortState.order === 'asc' ? field : `-${field}`);

          requestAnimationFrame(() => {
            const vs = calendarEl.querySelector('.fc-scroller-liquid-absolute');
            if (vs) vs.scrollTop = savedScrollTop;
          });
        });
      },
    };
  }

  // ─── row 선택 ─────────────────────────────────────
  /** 리소스 id로 해당 row 전체 선택 표시 */
  function selectResource(resourceId) {
    calendarEl.querySelectorAll('.fc-resource-selected')
      .forEach(el => el.classList.remove('fc-resource-selected'));
    calendarEl.querySelectorAll(`[data-resource-id="${resourceId}"]`)
      .forEach(el => el.classList.add('fc-resource-selected'));
  }

  // ─── 캘린더 초기화 ────────────────────────────────
  calendar = new FullCalendar.Calendar(calendarEl, {
    schedulerLicenseKey: '0328483609-fcs-1693988989',
    locale: 'ko',
    initialDate: new Date(),
    initialView: 'monthlyView',
    timeZone: 'local',
    weekends: true,
    editable: false,
    selectable: false,
    nowIndicator: true,
    headerToolbar: {
      left:   'prevYear,prev,next,nextYear todayBtn',
      center: 'title',
      right:  'monthly,yearly',
    },
    customButtons: {
      monthly: {
        text: '월간',
        click: function () {
          calendar.changeView('monthlyView');
          document.querySelector('.fc-todayBtn-button').textContent = '당월';
        },
      },
      yearly: {
        text: '연간',
        click: function () {
          calendar.changeView('yearlyView');
          document.querySelector('.fc-todayBtn-button').textContent = '당해';
        },
      },
      todayBtn: {
        text: '당월',
        click: function () { calendar.today(); },
      },
    },
    resourceAreaWidth: '420px',
    resourceAreaColumns: [
      {
        ...makeSortableHeader('employee_name', '사원명'),
        width: '60px',
        cellClassNames: 'alignC',
        cellContent: function (arg) {
          return { html: `<i>${arg.fieldValue}</i>` };
        },
      },
      {
        ...makeSortableHeader('dept', '부서'),
        width: '80px',
        cellClassNames: 'alignC',
      },
      {
        field: 'loc',
        headerContent: '근무지',
        width: '65px',
        cellClassNames: 'alignC',
      },
      {
        field: 'attendance',
        headerContent: '지각/조퇴/결근',
        width: '65px',
        cellClassNames: 'alignC',
      },
    ],
    resources: RESOURCES,
    slotMinWidth: 90,
    eventMinWidth: 0,
    // 뷰 전환 시 이벤트 소스 교체
    datesSet: function (arg) {
      calendar.removeAllEvents();
      if (arg.view.type === 'yearlyView') {
        calendar.addEventSource(yearlyEvents);
      } else {
        calendar.addEventSource(monthlyEvents);
      }
    },
    eventContent: function (arg) {
      if (arg.view.type === 'yearlyView') {
        return { html: `${arg.event.extendedProps.late} / ${arg.event.extendedProps.early_leave}` };
      }
      return { html: `${arg.event.extendedProps.type}<br/>${arg.event.extendedProps.time}` };
    },
    eventClick: function (info) {
      if (info.view.type === 'monthlyView') {
        document.querySelector('.p_dailyAttendance').showModal();
      } else if (info.view.type === 'yearlyView') {
        document.querySelector('.p_monthlyAttendance').showModal();
      }
    },
    // 오른쪽 lane 클릭으로도 row 선택
    resourceLaneDidMount: function (arg) {
      arg.el.style.cursor = 'pointer';
      arg.el.addEventListener('click', () => selectResource(arg.resource.id));
    },
    views: {
      monthlyView: {
        type: 'resourceTimeline',
        duration: { month: 1 },
        slotDuration: { day: 1 },
        slotLabelInterval: { day: 1 },
        slotLabelFormat: [{ day: 'numeric' }], // "1", "2" ... "31"
        slotLaneClassNames: function (arg) {
          if (!arg.date) return [];
          const day = arg.date.getDay();
          return day === 0 ? ['fc-day-sun'] : day === 6 ? ['fc-day-sat'] : [];
        },
        slotLabelClassNames: function (arg) {
          if (!arg.date) return [];
          const day = arg.date.getDay();
          return day === 0 ? ['fc-day-sun'] : day === 6 ? ['fc-day-sat'] : [];
        },
      },
      yearlyView: {
        type: 'resourceTimeline',
        duration: { year: 1 },
        slotDuration: { month: 1 },
        slotLabelInterval: { month: 1 },
        slotLabelFormat: [{ month: 'short' }], // "1월", "2월" ...
      },
    },
  });

  calendar.render();

  // 이벤트 위임으로 리소스 셀 클릭 시 row 선택
  calendarEl.addEventListener('click', function (e) {
    const cell = e.target.closest('[data-resource-id]');
    if (cell) selectResource(cell.dataset.resourceId);
  });

  // 마우스 휠로 가로 스크롤 (세로 스크롤 차단)
  // calendarEl.addEventListener('wheel', function (e) {
  //   const scroller = [...calendarEl.querySelectorAll('.fc-scroller-liquid-absolute')].at(-1);
  //   if (scroller) {
  //     e.preventDefault();
  //     scroller.scrollLeft += e.deltaY;
  //   }
  // }, { passive: false });

});