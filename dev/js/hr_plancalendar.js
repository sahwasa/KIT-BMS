// =============================================
// 1. 근무 유형 정의 (cd_group = 'C62')
// =============================================
const SHIFT_TYPES = {
  C62_1: { cd: 'C62_1', nm: '08:00~17:00',                       color: '#d4f0e0', textColor: '#1a6b3a' },
  C62_2: { cd: 'C62_2', nm: '09:00~18:00',                       color: '#cce5ff', textColor: '#0a4a8a' },
  C62_3: { cd: 'C62_3', nm: '10:00~19:00',                       color: '#fff0c2', textColor: '#7a5500' },
  C62_4: { cd: 'C62_4', nm: '09:00~09:00<sup>+1일</sup>_(24h)', color: '#ffe0c2', textColor: '#8a3a00' },
  C62_5: { cd: 'C62_5', nm: '09:00~21:00_(12h)',                 color: '#ffd6e0', textColor: '#8a0a2a' },
  C62_6: { cd: 'C62_6', nm: '08:00~12:00_(4h)',                  color: '#e8d5ff', textColor: '#4a1a8a' },
  C62_7: { cd: 'C62_7', nm: '09:00~18:00_(격일)',                color: '#d0f5f0', textColor: '#0a5a50' },
};

// =============================================
// 2. 샘플 근무 데이터 (실제 DB 연동 시 교체)
// =============================================
const SHIFT_DATA = [
  { date: '2026-05-01', shiftCd: 'C62_1', members: ['유한아름', '이서연', '박지호', '최수빈', '정우성'] },
  { date: '2026-05-01', shiftCd: 'C62_2', members: ['한지민', '오지은', '윤재원'] },
  { date: '2026-05-01', shiftCd: 'C62_6', members: ['류다언', '조현완'] },
  { date: '2026-05-02', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '정우성', '류다언'] },
  { date: '2026-05-02', shiftCd: 'C62_3', members: ['윤재원', '강민경', '차지원'] },
  { date: '2026-05-02', shiftCd: 'C62_6', members: ['조현완'] },
  { date: '2026-05-03', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-05-03', shiftCd: 'C62_3', members: ['강민경'] },
  { date: '2026-05-03', shiftCd: 'C62_7', members: ['이서연', '박지호'] },
  { date: '2026-05-04', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-05-04', shiftCd: 'C62_3', members: ['차지원', '강민경', '윤재원', '한지민'] },
  { date: '2026-05-06', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-05-06', shiftCd: 'C62_6', members: ['조현완', '류다언'] },
  { date: '2026-05-06', shiftCd: 'C62_5', members: ['한지민', '오지은', '차지원'] },
  { date: '2026-05-07', shiftCd: 'C62_3', members: ['이서연', '박지호', '최수빈', '류다언', '조현완', '신새미'] },
  { date: '2026-05-07', shiftCd: 'C62_6', members: ['한지민', '오지은'] },
  { date: '2026-05-08', shiftCd: 'C62_6', members: ['조현완'] },
  { date: '2026-05-09', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-05-09', shiftCd: 'C62_5', members: ['한지민', '오지은', '차지원'] },
  { date: '2026-05-10', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-05-10', shiftCd: 'C62_6', members: ['윤재원', '강민경'] },
  { date: '2026-05-11', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-05-11', shiftCd: 'C62_5', members: ['한지민', '오지은', '차지원', '강민경', '윤재원', '정우성'] },
  { date: '2026-05-13', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-05-14', shiftCd: 'C62_3', members: ['이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-05-14', shiftCd: 'C62_6', members: ['한지민', '오지은'] },
  { date: '2026-05-30', shiftCd: 'C62_2', members: ['최경희', '신새미', '강민경', '윤재원', '정우성', '한지민', '오지은', '차지원', '김민준'] },
];

// =============================================
// 3. 목록 뷰 이벤트 데이터 (실제 DB 연동 시 교체)
// =============================================
var monthlyEvents = [
  { resourceId: '150', start: '2026-05-04',          end: '2026-05-04',          className: 'out',        title: '외근(09~13)'   },
  { resourceId: '150', start: '2026-05-06',          end: '2026-05-06',          className: 'regular',    title: '평일(09~18)'   },
  { resourceId: '150', start: '2026-05-07T10:00:00', end: '2026-05-07T12:00:00', className: 'out',        title: '외근(10~12)'   },
  { resourceId: '150', start: '2026-05-07T13:00:00', end: '2026-05-07T19:00:00', className: 'off',        title: '반차(13~19)'   },
  { resourceId: '150', start: '2026-05-08',          end: '2026-05-08',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '150', start: '2026-05-11',          end: '2026-05-11',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '150', start: '2026-05-12',          end: '2026-05-12',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '150', start: '2026-05-13',          end: '2026-05-13',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '150', start: '2026-05-14',          end: '2026-05-14',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '151', start: '2026-05-01',          end: '2026-05-01',          className: 'holiday_work', title: '휴일근무(09~18)' },
  { resourceId: '151', start: '2026-05-06',          end: '2026-05-06',          className: 'regular',    title: '평일(10~19)'   },
  { resourceId: '151', start: '2026-05-07',          end: '2026-05-07',          className: 'out',        title: '출장'          },
  { resourceId: '151', start: '2026-05-08',          end: '2026-05-08',          className: 'off',        title: '연차'          },
  { resourceId: '151', start: '2026-05-11',          end: '2026-05-11',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '151', start: '2026-05-12',          end: '2026-05-12',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '151', start: '2026-05-13',          end: '2026-05-13',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '151', start: '2026-05-14',          end: '2026-05-14',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '152', start: '2026-05-01',          end: '2026-05-01',          className: 'holiday_work', title: '휴일근무(09~18)' },
  { resourceId: '152', start: '2026-05-04',          end: '2026-05-04',          className: 'late early', title: '평일(09~18)'   },
  { resourceId: '152', start: '2026-05-06',          end: '2026-05-06',          className: 'regular',    title: '평일(10~19)'   },
  { resourceId: '152', start: '2026-05-07',          end: '2026-05-07',          className: 'regular',    title: '평일(10~19'    },
  { resourceId: '152', start: '2026-05-08',          end: '2026-05-08',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '152', start: '2026-05-11',          end: '2026-05-11',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '152', start: '2026-05-12',          end: '2026-05-12',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '152', start: '2026-05-13',          end: '2026-05-13',          className: 'scheduled',  title: '평일(09~18)'   },
  { resourceId: '152', start: '2026-05-14',          end: '2026-05-14',          className: 'scheduled',  title: '평일(09~18)'   },
];

// =============================================
// 4. 목록 뷰 리소스(사원) 데이터
// =============================================
const RESOURCES = [
  { id: '150', employee_id: '150', employee_name: '꾸래핑', dept: 'IT사업본부', loc: '본사' },
  { id: '151', employee_id: '151', employee_name: '바로핑', dept: 'IT사업본부', loc: '본사' },
  { id: '152', employee_id: '152', employee_name: '하츄핑', dept: 'IT사업본부', loc: '본사' },
  { id: '153', employee_id: '153', employee_name: '아자핑', dept: 'IT사업본부', loc: '본사' },
  { id: '154', employee_id: '154', employee_name: '차차핑', dept: 'IT사업본부', loc: '본사' },
  { id: '155', employee_id: '155', employee_name: '해핑',   dept: 'IT사업본부', loc: '본사' },
  { id: '156', employee_id: '156', employee_name: '짝짝핑', dept: 'IT사업본부', loc: '본사' },
  { id: '157', employee_id: '157', employee_name: '오로라핑', dept: 'IT사업본부', loc: '본사' },
  { id: '158', employee_id: '158', employee_name: '코자핑', dept: 'IT사업본부', loc: '본사' },
  { id: '159', employee_id: '159', employee_name: '말랑핑', dept: 'IT사업본부', loc: '본사' },
  { id: '160', employee_id: '160', employee_name: '마카핑', dept: 'IT사업본부', loc: '본사' },
  { id: '161', employee_id: '161', employee_name: '커핑',   dept: 'IT사업본부', loc: '본사' },
  { id: '162', employee_id: '162', employee_name: '요거핑', dept: 'IT사업본부', loc: '본사' },
  { id: '163', employee_id: '163', employee_name: '또너핑', dept: 'IT사업본부', loc: '본사' },
  { id: '164', employee_id: '164', employee_name: '달콤핑', dept: 'IT사업본부', loc: '본사' },
];

// =============================================
// 5. 유틸 함수
// =============================================

/** SHIFT_DATA → FullCalendar 이벤트 배열로 변환 */
function buildEvents(data) {
  return data.map((row, idx) => {
    const shift = SHIFT_TYPES[row.shiftCd];
    const maxShow = 3;
    const displayNames = row.members.slice(0, maxShow).join(' ');
    const extra = row.members.length > maxShow ? ` +${row.members.length - maxShow}` : '';
    return {
      id: `evt-${idx}`,
      title: shift.nm,
      start: row.date,
      allDay: true,
      backgroundColor: shift.color,
      borderColor: shift.color,
      textColor: shift.textColor,
      extendedProps: {
        shiftCd: row.shiftCd,
        shift,
        members: row.members,
        displayNames: displayNames + extra,
        count: row.members.length,
      },
    };
  });
}

/** 근무 유형 범례 렌더링 */
function renderLegend() {
  const el = document.getElementById('legend');
  Object.values(SHIFT_TYPES).forEach(s => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <div class="legend-dot" style="background:${s.color};border:1px solid ${s.textColor}33"></div>
      <span>${s.nm}</span>
    `;
    el.appendChild(item);
  });
}

// =============================================
// 6. 팝오버
// =============================================
const popover        = document.getElementById('popover');
const popoverTitle   = document.getElementById('popover-title');
const popoverCount   = document.getElementById('popover-count');
const popoverMembers = document.getElementById('popover-members');

document.getElementById('popover-close').addEventListener('click', () => popover.classList.remove('active'));
document.addEventListener('click', e => {
  if (!popover.contains(e.target) && !e.target.closest('.fc-event')) {
    popover.classList.remove('active');
  }
});

function showPopover(jsEvent, shift, members, date) {
  popoverTitle.textContent = shift.nm;
  popoverCount.textContent = `${date} | 총 ${members.length}명`;
  popoverMembers.innerHTML = '';

  members.forEach(name => {
    const div = document.createElement('div');
    div.className = 'popover-member';
    div.innerHTML = `
      <div class="popover-avatar" style="background:${shift.color};color:${shift.textColor}">${name.slice(-2)}</div>
      <span>${name}</span>
    `;
    popoverMembers.appendChild(div);
  });

  // 위치 계산 전 크기 측정
  popover.style.visibility = 'hidden';
  popover.style.display = 'block';
  const popH = popover.offsetHeight;
  const popW = popover.offsetWidth;
  popover.style.display = '';
  popover.style.visibility = '';

  const rect   = jsEvent.target.getBoundingClientRect();
  const margin = 8;

  // 오른쪽 공간 없으면 왼쪽에 표시
  let left = rect.right + margin;
  if (left + popW > window.innerWidth) left = rect.left - popW - margin;

  // 하단 넘치면 위로 올림
  let top = rect.top;
  if (top + popH > window.innerHeight - margin) top = window.innerHeight - popH - margin;
  if (top < margin) top = margin;

  popover.style.left = `${left}px`;
  popover.style.top  = `${top}px`;
  popover.classList.add('active');
}

// =============================================
// 7. FullCalendar 초기화
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  renderLegend();

  const calEl  = document.getElementById('planCalendarMng'); // 월간/주간 뷰
  const listEl = document.getElementById('planListMng');     // 목록 뷰

  // ─── 목록 뷰 헤더 정렬 상태 ───────────────────────
  const sortState = { field: null, order: 'asc' };

  /**
   * 정렬 가능한 컬럼 헤더 옵션 생성
   * @param {string} field  - 리소스 필드명
   * @param {string} label  - 헤더 표시 텍스트
   */
  function makeSortableHeader(field, label) {
    return {
      field,
      headerContent: function() {
        // sortState를 보고 화살표 결정 (헤더 재렌더링 시에도 유지)
        let arrow = '';
        if (sortState.field === field) {
          arrow = sortState.order === 'asc' ? ' ▲' : ' ▼';
        }
        const el = document.createElement('span');
        el.className = `sort-header sort-header-${field}`;
        el.textContent = `${label}${arrow}`;
        return { domNodes: [el] };
      },
      headerDidMount: function(arg) {
        arg.el.style.cursor = 'pointer';
        if (arg.el.dataset.sortBound) return; // 중복 이벤트 방지
        arg.el.dataset.sortBound = 'true';

        arg.el.addEventListener('click', function() {
          if (sortState.field === field) {
            // 같은 컬럼 재클릭 → 방향 전환
            sortState.order = sortState.order === 'asc' ? 'desc' : 'asc';
          } else {
            // 다른 컬럼 클릭 → 오름차순으로 초기화
            sortState.field = field;
            sortState.order = 'asc';
          }

          // 정렬 전 세로 스크롤 위치 저장 후 복원
          const vertScroller = listEl.querySelector('.fc-scroller-liquid-absolute');
          const savedScrollTop = vertScroller ? vertScroller.scrollTop : 0;

          calendar2.setOption('resourceOrder', sortState.order === 'asc' ? field : `-${field}`);

          requestAnimationFrame(() => {
            const vs = listEl.querySelector('.fc-scroller-liquid-absolute');
            if (vs) vs.scrollTop = savedScrollTop;
          });
        });
      },
    };
  }

  // ─── 목록 뷰 row 선택 ─────────────────────────────
  /** 리소스 id로 해당 row 전체를 선택 표시 */
  function selectResource(resourceId) {
    listEl.querySelectorAll('.fc-resource-selected')
          .forEach(el => el.classList.remove('fc-resource-selected'));
    listEl.querySelectorAll(`[data-resource-id="${resourceId}"]`)
          .forEach(el => el.classList.add('fc-resource-selected'));
  }

  // ─── 목록 뷰 오늘 날짜로 스크롤 ──────────────────
  function scrollToToday() {
    setTimeout(() => {
      calendar2.updateSize();
      requestAnimationFrame(() => {
        const scrollers = [...listEl.querySelectorAll('.fc-scroller-liquid-absolute')];
        scrollers.forEach(s => s.scrollLeft = 0);

        const today     = new Date();
        const dayOfMonth = today.getDate();
        const totalDays  = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        requestAnimationFrame(() => {
          if (!scrollers.length) return;
          const offset     = scrollers[0].scrollWidth * (dayOfMonth - 1) / totalDays;
          const viewOffset = scrollers[0].clientWidth * 0.2;
          scrollers.forEach(s => s.scrollLeft = Math.max(0, offset - viewOffset));
        });
      });
    }, 150);
  }

  // ─── 월간/주간 캘린더 (calendar) ──────────────────
  const calendar = new FullCalendar.Calendar(calEl, {
    locale: 'ko',
    schedulerLicenseKey: '0328483609-fcs-1693988989',
    initialView: 'dayGridMonth',
    initialDate: new Date(),
    headerToolbar: {
      left:   'prevYear,prev,next,nextYear today',
      center: 'title',
      right:  'dayGridMonth,dayGridWeek,monthlyList',
    },
    buttonText: {
      today: '오늘',
      month: '월간',
      week:  '주간',
    },
    customButtons: {
      monthlyList: {
        text: '목록',
        click: function() {
          calEl.closest('.calendar_wrap').style.display = 'none';
          listEl.closest('.calendar_wrap').style.display = '';
          calendar2.gotoDate(calendar.getDate());
          scrollToToday();
        },
      },
    },
    // 뷰 전환·날짜 이동 시 캘린더 사이즈 재계산
    datesSet: function() {
      requestAnimationFrame(() => calendar.updateSize());
    },
    events: buildEvents(SHIFT_DATA),
    eventMaxStack: 5,
    dayMaxEvents: false,
    eventOrder: 'shiftCd',
    businessHours: { daysOfWeek: [1, 2, 3, 4, 5] },
    eventContent(arg) {
      const { shift, count, displayNames } = arg.event.extendedProps;
      const wrapper = document.createElement('div');
      wrapper.className = 'shift-chip';
      wrapper.style.background = shift.color;
      wrapper.style.color      = shift.textColor;
      wrapper.innerHTML = `
        <div class="shift-chip-row">
          <span class="shift-chip-label" style="color:${shift.textColor}">${shift.nm}</span>
          <span class="shift-chip-count" style="color:${shift.textColor}">${count}</span>
        </div>
        <div class="shift-chip-names" style="color:${shift.textColor}">${displayNames}</div>
      `;
      return { domNodes: [wrapper] };
    },
    eventClick(info) {
      const { shift, members } = info.event.extendedProps;
      showPopover(info.jsEvent, shift, members, info.event.startStr);
      info.jsEvent.stopPropagation();
    },
  });
  calendar.render();

  // ─── 목록 뷰 캘린더 (calendar2) ───────────────────
  const calendar2 = new FullCalendar.Calendar(listEl, {
    schedulerLicenseKey: '0328483609-fcs-1693988989',
    locale: 'ko',
    initialDate: new Date(),
    initialView: 'resourceTimelineMonth',
    headerToolbar: {
      left:   'prevYear,prev,next,nextYear today',
      center: 'title',
      right:  'dayGridMonth,dayGridWeek,monthlyList',
    },
    buttonText: { today: '오늘' },
    customButtons: {
      dayGridMonth: {
        text: '월간',
        click: function() {
          listEl.closest('.calendar_wrap').style.display = 'none';
          calEl.closest('.calendar_wrap').style.display = '';
          calendar.gotoDate(calendar2.getDate());
          calendar.changeView('dayGridMonth');
          requestAnimationFrame(() => calendar.updateSize());
        },
      },
      dayGridWeek: {
        text: '주간',
        click: function() {
          listEl.closest('.calendar_wrap').style.display = 'none';
          calEl.closest('.calendar_wrap').style.display = '';
          calendar.gotoDate(calendar2.getDate());
          calendar.changeView('dayGridWeek');
          requestAnimationFrame(() => calendar.updateSize());
        },
      },
      monthlyList: {
        text: '목록',
        click: function() {},
      },
    },
    timeZone: 'local',
    weekends: true,
    editable: false,
    selectable: false,
    nowIndicator: true,
    slotMinWidth: 115,
    resourceAreaWidth: '250px',
    resourceOrder: 'dept,employee_name',
    resourceAreaColumns: [
      {
        ...makeSortableHeader('employee_name', '사원명'),
        width: '60px',
        cellClassNames: 'alignC'
      },
      {
        ...makeSortableHeader('dept', '부서'),
        width: '80px',
        cellClassNames: 'alignC'
      },
      {
        ...makeSortableHeader('loc', '근무지'),
        width: '65px',
        cellClassNames: 'alignC'
      },
    ],
    resources: RESOURCES,
    businessHours: { daysOfWeek: [1, 2, 3, 4, 5] },
    // 오른쪽 lane 클릭으로도 row 선택 가능
    resourceLaneDidMount: function(arg) {
      arg.el.style.cursor = 'pointer';
      arg.el.addEventListener('click', () => selectResource(arg.resource.id));
    },
    // 월 이동 시 오늘 날짜로 스크롤 (뷰 전환은 scrollToToday가 담당)
    datesSet: function(dateInfo) {
      const today = new Date();
      if (today >= dateInfo.start && today < dateInfo.end) {
        scrollToToday();
      }
    },
    events: monthlyEvents,
    displayEventTime: false,
    eventClick: function() {},
    slotLabelFormat: [
      { day: 'numeric' },
      { weekday: 'short' },
    ],
    slotLaneClassNames: function(arg) {
      if (!arg.date) return [];
      const day = arg.date.getDay();
      return day === 0 ? ['fc-day-sun'] : day === 6 ? ['fc-day-sat'] : [];
    },
    slotLabelClassNames: function(arg) {
      if (!arg.date) return [];
      const day = arg.date.getDay();
      return day === 0 ? ['fc-day-sun'] : day === 6 ? ['fc-day-sat'] : [];
    },
  });
  calendar2.render();

  // 이벤트 위임으로 리소스 셀 클릭 시 row 선택
  listEl.addEventListener('click', function (e) {
    const cell = e.target.closest('[data-resource-id]');
    if (cell) selectResource(cell.dataset.resourceId);
  });

  // 마우스 휠로 가로 스크롤 (세로 스크롤 차단)
  listEl.addEventListener('wheel', function(e) {
    const scroller = [...listEl.querySelectorAll('.fc-scroller-liquid-absolute')].at(-1);
    if (scroller) {
      e.preventDefault();
      scroller.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  // 초기 표시: 목록 뷰 숨김
  listEl.closest('.calendar_wrap').style.display = 'none';
});