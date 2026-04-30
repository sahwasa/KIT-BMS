// =============================================
// 1. DB 데이터 정의 (cd_group = 'C62')
// =============================================
const SHIFT_TYPES = {
  C62_1: { cd: 'C62_1', nm: '08:00~17:00', color: '#d4f0e0', textColor: '#1a6b3a' },
  C62_2: { cd: 'C62_2', nm: '09:00~18:00', color: '#cce5ff', textColor: '#0a4a8a' },
  C62_3: { cd: 'C62_3', nm: '10:00~19:00', color: '#fff0c2', textColor: '#7a5500' },
  C62_4: { cd: 'C62_4', nm: '09:00~09:00<sup>+1일</sup>_(24h)', color: '#ffe0c2', textColor: '#8a3a00' },
  C62_5: { cd: 'C62_5', nm: '09:00~21:00_(12h)', color: '#ffd6e0', textColor: '#8a0a2a' },
  C62_6: { cd: 'C62_6', nm: '08:00~12:00_(4h)', color: '#e8d5ff', textColor: '#4a1a8a' },
  C62_7: { cd: 'C62_7', nm: '09:00~18:00_(격일)', color: '#d0f5f0', textColor: '#0a5a50' },
};

// =============================================
// 2. 샘플 근무 데이터 (실제 DB 연동 시 교체)
//    groupKey: 같은 날짜+근무유형을 묶는 키
// =============================================

const SHIFT_DATA = [
  // 2026년 4월 예시
  { date: '2026-04-01', shiftCd: 'C62_1', members: ['유한아름', '이서연', '박지호', '최수빈', '정우성'] },
  { date: '2026-04-01', shiftCd: 'C62_2', members: ['한지민', '오지은', '윤재원'] },
  { date: '2026-04-01', shiftCd: 'C62_6', members: ['류다언', '조현완'] },

  { date: '2026-04-02', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '정우성', '류다언'] },
  { date: '2026-04-02', shiftCd: 'C62_3', members: ['윤재원', '강민경', '차지원'] },
  { date: '2026-04-02', shiftCd: 'C62_6', members: ['조현완'] },

  { date: '2026-04-03', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-04-03', shiftCd: 'C62_3', members: ['강민경'] },
  { date: '2026-04-03', shiftCd: 'C62_7', members: ['이서연', '박지호'] },

  { date: '2026-04-04', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-04-04', shiftCd: 'C62_3', members: ['차지원', '강민경', '윤재원', '한지민'] },

  { date: '2026-04-06', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-04-06', shiftCd: 'C62_6', members: ['조현완', '류다언'] },
  { date: '2026-04-06', shiftCd: 'C62_5', members: ['한지민', '오지은', '차지원'] },

  { date: '2026-04-07', shiftCd: 'C62_3', members: ['이서연', '박지호', '최수빈', '류다언', '조현완', '신새미'] },
  { date: '2026-04-07', shiftCd: 'C62_6', members: ['한지민', '오지은'] },

  { date: '2026-04-08', shiftCd: 'C62_6', members: ['조현완'] },

  { date: '2026-04-09', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-04-09', shiftCd: 'C62_5', members: ['한지민', '오지은', '차지원'] },

  { date: '2026-04-10', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-04-10', shiftCd: 'C62_6', members: ['윤재원', '강민경'] },

  { date: '2026-04-11', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-04-11', shiftCd: 'C62_5', members: ['한지민', '오지은', '차지원', '강민경', '윤재원', '정우성'] },

  { date: '2026-04-13', shiftCd: 'C62_2', members: ['김민준', '이서연', '박지호', '최수빈', '류다언', '조현완'] },

  { date: '2026-04-14', shiftCd: 'C62_3', members: ['이서연', '박지호', '최수빈', '류다언', '조현완'] },
  { date: '2026-04-14', shiftCd: 'C62_6', members: ['한지민', '오지은'] },
  { date: '2026-04-30', shiftCd: 'C62_2', members: ['최경희', '신새미', '강민경', '윤재원', '정우성', '한지민', '오지은', '차지원', '김민준'] },
];
var monthlyEvents = [
  {resourceId:'150',start:'2026-04-01',end:'2026-04-01',className:'out',title:'외근(09~13)'},
  {resourceId:'150',start:'2026-04-02',end:'2026-04-02',className:'regular',title:'평일(09~18)'},
  {resourceId:'150',start:'2026-04-03T10:00:00',end:'2026-04-03T12:00:00',className:'out',title:'외근(10~12)'},
  {resourceId:'150',start:'2026-04-03T13:00:00',end:'2026-04-03T19:00:00',className:'off',title:'반차(13~19)'},
  {resourceId:'150',start:'2026-04-06',end:'2026-04-06',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'150',start:'2026-04-07',end:'2026-04-07',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'150',start:'2026-04-08',end:'2026-04-08',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'150',start:'2026-04-09',end:'2026-04-09',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'150',start:'2026-04-10',end:'2026-04-10',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'151',start:'2026-04-01',end:'2026-04-01',className:'off',title:'연차'},
  {resourceId:'151',start:'2026-04-02',end:'2026-04-02',className:'regular',title:'평일(10~19)'},
  {resourceId:'151',start:'2026-04-03',end:'2026-04-03',className:'out',title:'출장'},
  {resourceId:'151',start:'2026-04-04',end:'2026-04-04',className:'holiday_work',title:'휴일근무(09~18)'},
  {resourceId:'151',start:'2026-04-06',end:'2026-04-06',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'151',start:'2026-04-07',end:'2026-04-07',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'151',start:'2026-04-08',end:'2026-04-08',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'151',start:'2026-04-09',end:'2026-04-09',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'151',start:'2026-04-10',end:'2026-04-10',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'152',start:'2026-04-01',end:'2026-04-01',className:'late early',title:'평일(09~18)'},
  {resourceId:'152',start:'2026-04-02',end:'2026-04-02',className:'regular',title:'평일(10~19)'},
  {resourceId:'152',start:'2026-04-03',end:'2026-04-03',className:'regular',title:'평일(10~19'},
  {resourceId:'152',start:'2026-04-04',end:'2026-04-04',className:'holiday_work',title:'휴일근무(09~18)'},
  {resourceId:'152',start:'2026-04-06',end:'2026-04-06',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'152',start:'2026-04-07',end:'2026-04-07',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'152',start:'2026-04-08',end:'2026-04-08',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'152',start:'2026-04-09',end:'2026-04-09',className:'scheduled',title:'평일(09~18)'},
  {resourceId:'152',start:'2026-04-10',end:'2026-04-10',className:'scheduled',title:'평일(09~18)'},
];

// =============================================
// 3. 데이터 → FullCalendar 이벤트 변환
// =============================================
function buildEvents(data) {
  return data.map((row, idx) => {
    const shift = SHIFT_TYPES[row.shiftCd];
    const displayNames = row.members.slice(0, 2).join(' ');
    const extra = row.members.length > 2 ? ` +${row.members.length - 2}` : '';

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
      }
    };
  });
}

// =============================================
// 4. 범례 렌더링
// =============================================
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
// 5. 팝오버
// =============================================
const popover = document.getElementById('popover');
const popoverTitle = document.getElementById('popover-title');
const popoverCount = document.getElementById('popover-count');
const popoverMembers = document.getElementById('popover-members');
document.getElementById('popover-close').addEventListener('click', () => popover.classList.remove('active'));
document.addEventListener('click', e => {
  if (!popover.contains(e.target) && !e.target.closest('.fc-event')) {
    popover.classList.remove('active');
  }
});

function showPopover(jsEvent, shift, members, date) { 
  popoverTitle.textContent = `${shift.nm}`;
  popoverCount.textContent = `${date} | 총 ${members.length}명`;
  popoverMembers.innerHTML = '';
  members.forEach(name => {
    const initials = name.slice(-2);
    const div = document.createElement('div');
    div.className = 'popover-member';
    div.innerHTML = `
      <div class="popover-avatar" style="background:${shift.color};color:${shift.textColor}">${initials}</div>
      <span>${name}</span>
    `;
    popoverMembers.appendChild(div);
  });
  // 실제 높이 측정을 위해 잠깐 invisible 상태로 렌더
  popover.style.visibility = 'hidden';
  popover.style.display = 'block';
  const popH = popover.offsetHeight;
  const popW = popover.offsetWidth;
  popover.style.display = '';
  popover.style.visibility = '';

  const rect = jsEvent.target.getBoundingClientRect();
  const margin = 8;

  // 좌우: 오른쪽에 공간 있으면 오른쪽, 없으면 왼쪽
  let left = rect.right + margin;
  if (left + popW > window.innerWidth) left = rect.left - popW - margin;

  // 상하: 클릭 위치 기준으로 top 설정, 바닥 넘치면 위로 올림
  let top = rect.top;
  if (top + popH > window.innerHeight - margin) {
    top = window.innerHeight - popH - margin;
  }
  if (top < margin) top = margin;

  popover.style.left = left + 'px';
  popover.style.top = top + 'px';
  popover.classList.add('active');
}

// =============================================
// 6. FullCalendar 초기화
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  renderLegend();

  const calEl = document.getElementById('planCalendarMng');
  const calendar = new FullCalendar.Calendar(calEl, {
    locale: 'ko',
    schedulerLicenseKey: '0328483609-fcs-1693988989',
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prevYear,prev,next,nextYear today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,monthlyList'
    },
    buttonText: {
      today: '오늘',
      month: '월간',
      week:  '주간',
    },
    customButtons: {
      monthlyList: {
        text: '목록',
        click: function(){
          // calendar 섹션 숨기고 calendar2 섹션 보이기
          calEl.closest('.calendar_wrap').style.display = 'none';
          document.getElementById('planListMng').closest('.calendar_wrap').style.display = '';
          // 날짜 동기화
          calendar2.gotoDate(calendar.getDate());           
        }
      },
    },
    initialDate: new Date(),
    events: buildEvents(SHIFT_DATA),
    eventMaxStack: 5,
    dayMaxEvents: false,
    businessHours:  {
      daysOfWeek: [ 1,2,3,4,5 ]
    },
    eventOrder: 'shiftCd',    
    eventContent(arg) {
      const ep = arg.event.extendedProps;
      const shift = ep.shift;
      const wrapper = document.createElement('div');
      wrapper.className = 'shift-chip';
      wrapper.style.background = shift.color;
      wrapper.style.color = shift.textColor;

      wrapper.innerHTML = `
        <div class="shift-chip-row">
          <span class="shift-chip-label" style="color:${shift.textColor}">${shift.nm}</span>
          <span class="shift-chip-count" style="color:${shift.textColor}">${ep.count}</span>
        </div>
        <div class="shift-chip-names" style="color:${shift.textColor}">${ep.displayNames}</div>
      `;

      return { domNodes: [wrapper] };
    },

    // 클릭 시 팝오버
    eventClick(info) {
      const ep = info.event.extendedProps;
      showPopover(info.jsEvent, ep.shift, ep.members, info.event.startStr);
      info.jsEvent.stopPropagation();
    } 
  });
  calendar.render();

  const listEl = document.getElementById('planListMng');  
  const calendar2 = new FullCalendar.Calendar(listEl, {
    schedulerLicenseKey: '0328483609-fcs-1693988989',
    locale: 'ko',
    initialDate: new Date(),
    initialView: 'resourceTimelineMonth',
    headerToolbar: {
      left: 'prevYear,prev,next,nextYear today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,monthlyList'
    },
    buttonText: {
      today: '오늘'
    },
    customButtons: {
      dayGridMonth: {
        text: '월간',
        click: function() {
          document.getElementById('planListMng').closest('.calendar_wrap').style.display = 'none';
          calEl.closest('.calendar_wrap').style.display = '';
          calendar.gotoDate(calendar2.getDate());
          calendar.changeView('dayGridMonth');
        }
      },
      dayGridWeek: {
        text: '주간',
        click: function() {
          document.getElementById('planListMng').closest('.calendar_wrap').style.display = 'none';
          calEl.closest('.calendar_wrap').style.display = '';
          calendar.gotoDate(calendar2.getDate());
          calendar.changeView('dayGridWeek');
        }
      },
      monthlyList: {
        text: '목록',
        click: function() {}
      },
    },
    timeZone: 'local',
    weekends: true,
    editable: false,
    selectable: false,
    nowIndicator: true,
    slotMinWidth: 115,
    resourceAreaWidth: '250px',
    resourceAreaColumns: [
      {field:'employee_name', headerContent:'사원명', width:'60px', cellClassNames:'alignC', cellContent:function(arg){return{html:`<i>${arg.fieldValue}</i>`}}},
      {field:'dept',          headerContent:'부서',   width:'80px', cellClassNames:'alignC'},
      {field:'loc',           headerContent:'근무지', width:'65px', cellClassNames:'alignC'},
    ],
    resources: [
      {id:'150', employee_id:'150', employee_name:'꾸래핑', dept:'IT사업본부', loc:'본사'},
      {id:'151', employee_id:'151', employee_name:'바로핑', dept:'IT사업본부', loc:'본사'},
      {id:'152', employee_id:'152', employee_name:'하츄핑', dept:'IT사업본부', loc:'본사'},
      {id:'153', employee_id:'153', employee_name:'아자핑', dept:'IT사업본부', loc:'본사'},
      {id:'154', employee_id:'154', employee_name:'차차핑', dept:'IT사업본부', loc:'본사'},
    ],
    businessHours:  {
      daysOfWeek: [ 1,2,3,4,5 ]
    },
    datesSet: function(dateInfo) {
      // 현재 보이는 월에 오늘이 포함되어 있을 때만 스크롤
      const today = new Date();
      if (today >= dateInfo.start && today < dateInfo.end) {
        setTimeout(() => {
          const scroller = [...listEl.querySelectorAll('.fc-scroller-liquid-absolute')].at(-1);
          if (!scroller) return;
          // 오늘이 월의 며칠째인지 계산
          const dayOfMonth = today.getDate();
          const totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
          const scrollRatio = (dayOfMonth - 1) / totalDays;
          // 전체 스크롤 너비에서 오늘 위치로 이동, 약간 앞에서 보이도록 offset
          const offset = scroller.scrollWidth * scrollRatio;
          const viewOffset = scroller.clientWidth * 0.2; // 왼쪽 여백 20%
          scroller.scrollLeft = Math.max(0, offset - viewOffset);
        }, 50); // 렌더링 완료 후 실행
      }
    },
    events: monthlyEvents,
    displayEventTime: false,
    eventClick: function(info) {},
    slotLabelFormat: [
      { day: 'numeric' },
      { weekday: 'short' }
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
  listEl.addEventListener('wheel', function(e) {
    const scroller = [...listEl.querySelectorAll('.fc-scroller-liquid-absolute')].at(-1);
    if (scroller) {
      e.preventDefault();
      scroller.scrollLeft += e.deltaY;
    }
  }, { passive: false });
  // listEl.closest('.calendar_wrap').style.display = 'none';
  calEl.closest('.calendar_wrap').style.display = 'none';
});