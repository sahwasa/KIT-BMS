document.addEventListener('DOMContentLoaded', () => {
  /* ── 공통 근무 코드 ── */
  const CODES = [
    { code: 'C62_4', desc: 'Full Day(24h)', shortCode: 'FD', label: '풀타임 (24h) 근무', time: '09:00–09:00<sup>+1</sup>', type: 'shift', color: '#ffe0c2', textColor: '#8a3a00' },
    { code: 'C62_5', desc: 'Half Day(12h)', shortCode: 'HD', label: '반일 (12h) 근무',   time: '09:00–21:00',              type: 'shift', color: '#ffd6e0', textColor: '#8a0a2a' },
    { code: 'C62_6', desc: 'Part Time(4h)',  shortCode: 'PT', label: '단시간 (4h) 근무',  time: '08:00–12:00',              type: 'shift', color: '#e8d5ff', textColor: '#4a1a8a' },
    { code: 'C62_7', desc: 'Alternate(격일)', shortCode: 'AL', label: '(격일) 교대 근무',    time: '09:00–18:00',              type: 'shift', color: '#cffafe', textColor: '#164e63' },
  ];

  /* ── 그룹 데이터 ── */
  const GROUPS = {
    g1: {
      time: '09:00 – 18:00',
      members: [
        { name: '김선욱', dept: '경영지원실' },
        { name: '최희석', dept: '인사총무팀' },
        { name: '김홍관', dept: '인사총무팀' },
        { name: '이주연', dept: '재무회계팀' },
        { name: '이정서', dept: '재무회계팀' },
        { name: '조재휘', dept: '전략사업실' },
        { name: '황성영', dept: '솔루션개발팀' },
        { name: '강성부', dept: '솔루션개발팀' },
        { name: '임대택', dept: '솔루션개발팀' },
      ]
    },
    g2: {
      time: '10:00 – 19:00',
      members: [
        { name: '윤정진', dept: 'SI개발팀' },
        { name: '반미선', dept: 'SI개발팀' },
        { name: '이광철', dept: 'SI개발팀' },
        { name: '박지은', dept: 'SI개발팀' },
        { name: '민슬기', dept: 'SI개발팀' },
        { name: '장그림', dept: 'SI개발팀' },
        { name: '김소담', dept: 'SI개발팀' },
      ]
    },
    flex: {
      time: '유연근무 신청',
      members: []
    },
    manual: {
      time: '근무변경 신청',
      members: []
    }
  };

  /* ── 샘플 교대 데이터 ── */
  let scheduleData = {
    '2026-05-01': [{ name: '엄용석', code: 'C62_4' }, { name: '김승기', code: 'C62_6' }],
    '2026-05-02': [{ name: '손병권', code: 'C62_4' }, { name: '윤종훈', code: 'C62_5' }],
    '2026-05-03': [{ name: '서정헌', code: 'C62_6' }, { name: '정민욱', code: 'C62_7' }],
    '2026-05-04': [{ name: '김태수', code: 'C62_5' }, { name: '박창현', code: 'C62_4' }],
    '2026-05-05': [{ name: '윤동일', code: 'C62_7' }, { name: '김승태', code: 'C62_6' }],
    '2026-05-06': [
      { name: '문영찬', code: null, type: 'flex', time: '11:00–20:00', flexId: 'f1', applyDate: '2026-04-25', origTime: '09:00–18:00', reason: '병원 방문으로 인한 출근 지연', status: 'pending' },
      { name: '서정헌', code: 'C62_4' },
    ],
    '2026-05-07': [{ name: '이병수', code: 'C62_7' }, { name: '박창현', code: 'C62_7' }],
    '2026-05-08': [{ name: '김태수', code: 'C62_4', modified: true, status: 'pending' }, { name: '손병권', code: 'C62_6' }],
    '2026-05-09': [{ name: '윤동일', code: 'C62_4' }, { name: '정민욱', code: 'C62_5' }],
    '2026-05-10': [{ name: '엄용석', code: 'C62_5' }, { name: '김형준', code: 'C62_6' }],
    '2026-05-11': [{ name: '이홍설', code: 'C62_4' }, { name: '윤종훈', code: 'C62_7' }],
    '2026-05-12': [{ name: '김승기', code: 'C62_6' }, { name: '서정헌', code: 'C62_5' }],
    '2026-05-13': [
      { name: '김승태', code: null, type: 'flex', time: '07:00–16:00', flexId: 'f2', applyDate: '2026-04-28', origTime: '10:00–19:00', reason: '자녀 학교 행사 참석', status: 'approved' },
      { name: '박창현', code: 'C62_4' },
    ],
    '2026-05-14': [{ name: '이홍설', code: 'C62_6' }, { name: '김형준', code: 'C62_7', modified: true, status: 'approved' }],
    '2026-05-15': [
      { name: '신현기', code: null, type: 'flex', time: '08:00–17:00', flexId: 'f3', applyDate: '2026-05-02', origTime: '10:00–19:00', reason: '개인 사정', status: 'rejected' },
      { name: '손병권', code: 'C62_5' },
    ],
    '2026-05-16': [{ name: '정민욱', code: 'C62_4' }, { name: '윤동일', code: 'C62_6' }],
    '2026-05-17': [{ name: '엄용석', code: 'C62_7' }, { name: '서정헌', code: 'C62_4' }],
    '2026-05-18': [
      { name: '김승기', code: 'C62_5' }, { name: '이병수', code: 'C62_6' },
      { name: '김소담', code: null, type: 'flex', time: '08:00–17:00', flexId: 'f6', applyDate: '2026-05-10', origTime: '09:00–18:00', reason: '육아기 단축근무 신청', status: 'approved', period: '2026-05-18~2026-05-22', endDate: '2026-05-22', duration: '5일' }
    ],
    '2026-05-19': [{ name: '박창현', code: 'C62_4' }, { name: '김태수', code: 'C62_7' }],
    '2026-05-20': [
      { name: '윤종훈', code: null, type: 'flex', time: '10:00–19:00', flexId: 'f4', applyDate: '2026-05-08', origTime: '09:00–18:00', reason: '관공서 업무 처리', status: 'pending' },
      { name: '김형준', code: 'C62_4' },
    ],
    '2026-05-21': [{ name: '이홍설', code: 'C62_5' }, { name: '정민욱', code: 'C62_6' }],
    '2026-05-22': [{ name: '손병권', code: 'C62_7' }, { name: '엄용석', code: 'C62_4', modified: true, status: 'pending' }],
    '2026-05-23': [{ name: '서정헌', code: 'C62_5' }, { name: '윤동일', code: 'C62_4' }],
    '2026-05-24': [{ name: '김승태', code: 'C62_6' }, { name: '박창현', code: 'C62_5' }],
    '2026-05-25': [
      { name: '이병수', code: null, type: 'flex', time: '09:00–18:00', flexId: 'f5', applyDate: '2026-05-12', origTime: '10:00–19:00', reason: '자택 방문 서비스 예약', status: 'approved' },
      { name: '김태수', code: 'C62_6' },
    ],
    '2026-05-26': [{ name: '김형준', code: 'C62_4' }, { name: '정민욱', code: 'C62_7' }],
    '2026-05-27': [{ name: '윤종훈', code: 'C62_5' }, { name: '김승기', code: 'C62_4' }],
    '2026-05-28': [{ name: '이홍설', code: 'C62_7' }, { name: '손병권', code: 'C62_4' }],
    '2026-05-29': [{ name: '엄용석', code: 'C62_6' }, { name: '서정헌', code: 'C62_7' }],
    '2026-05-30': [{ name: '박창현', code: 'C62_5' }, { name: '윤동일', code: 'C62_4', modified: true, status: 'rejected' }],
    '2026-05-31': [{ name: '김승태', code: 'C62_4' }, { name: '정민욱', code: 'C62_6' }],
  };

  const excelDates = new Set();
  const STAFF_SHIFT = [
    '장미호','강성부','강종우','고재우','고훈','권기봉','김광은','김동순','김민수','김봉식',
    '김선욱','김소담','김수호','김승기','김승태','김예슬','김정열','김종인','김태수','김태형',
  ];
  const DOW_KO = ['일', '월', '화', '수', '목', '금', '토'];

  /* ── 유틸 ── */
  function codeInfo(code) { return CODES.find(c => c.code === code); }
  function evType(entry) {
    if (entry.type === 'flex') return 'flex';
    const ci = codeInfo(entry.code);
    return ci ? ci.type : 'shift';
  }
  function evLabel(entry) {
    if (entry.type === 'flex') return `${entry.name} 유연 ${entry.time}`;
    const ci = codeInfo(entry.code);
    return ci ? `<span>${ci.shortCode}</span> ${entry.name}  ${ci.time}` : entry.name;
  }
  function flexEvClass(status) {
    if (status === 'approved') return 'ev_flex_approved';
    if (status === 'rejected') return 'ev_flex_rejected';
    return 'ev_flex_pending';
  }
  function evClass(entry) {
    const type = evType(entry);
    const classes = [];
    if (type === 'flex') classes.push(flexEvClass(entry.status));
    else classes.push('ev_custom');

    if (entry.modified) classes.push('is_modified');
    return classes;
  }

  /* ── 그룹 팝오버 (Popover) ── */
  const popover = document.getElementById('popover');
  const popoverTitle = document.getElementById('popover-title');
  const popoverCount = document.getElementById('popover-count');
  const popoverMembers = document.getElementById('popover-members');
  const popoverClose = document.getElementById('popover-close');

  window.showGroupTooltip = function (e, groupId) {
    e.stopPropagation();
    updateFlexCount();
    const g = GROUPS[groupId];
    if (!g || !popover) return;
    
    popoverTitle.innerHTML = `${g.time}`;
    popoverCount.textContent = `${g.members.length}명`;
    
    popoverMembers.innerHTML = g.members.length === 0
      ? `<div class="empty_txt">이번 달 신청 내역 없음</div>`
      : `<ul class="lst_user">
          ${g.members.map((m, i) => `
            <li>
              <div class="user_module">
                <figure class="user_photo"><img src="../../images/ic_user.png" alt="" loading="lazy"></figure> 
                <em>${m.name}</em><b>(${m.dept})</b>
              </div>
            </li>`).join('')}
        </ul>`;

    // 위치 계산
    const rect = e.currentTarget.getBoundingClientRect();
    popover.style.display = 'block';
    popover.style.visibility = 'hidden'; // 크기 계산을 위해 잠시 숨김
    
    const popW = popover.offsetWidth;
    const popH = popover.offsetHeight;
    let left = rect.right + 10;
    let top = rect.top;

    if (left + popW > window.innerWidth) left = rect.left - popW - 10;
    if (top + popH > window.innerHeight) top = window.innerHeight - popH - 10;

    popover.style.left = left + 'px';
    popover.style.top = top + 'px';
    popover.style.visibility = 'visible';
    if (typeof popover.show === 'function') popover.show(); // dialog 지원 시
    popover.classList.add('active');
  };

  window.hideGroupTooltip = function () {
    if (popover) {
      if (typeof popover.close === 'function') popover.close();
      popover.style.display = 'none';
      popover.classList.remove('active');
    }
  };

  if (popoverClose) {
    popoverClose.onclick = (e) => {
      e.stopPropagation();
      hideGroupTooltip();
    };
  }

  document.addEventListener('click', (e) => {
    if (popover && !popover.contains(e.target)) {
      hideGroupTooltip();
    }
  });
  function badgeClass(type) {
    return type === 'flex' ? 'badge_flex' : 'badge_night';
  }
  function badgeText(type) {
    return type === 'flex' ? '유연' : '교대';
  }

  function updateFlexCount() {
    let fP = 0, fA = 0, fR = 0;
    let mP = 0, mA = 0, mR = 0;
    const flexMembers = [], manualMembers = [];

    Object.entries(scheduleData).forEach(([date, arr]) => {
      arr.forEach(e => { 
        const d = new Date(date + 'T00:00:00');
        const dateLabel = `${d.getMonth() + 1}/${d.getDate()}`;
        const statusLabel = e.status === 'approved' ? '승인' : e.status === 'rejected' ? '반려' : '대기';

        if (e.type === 'flex') {
          if (e.status === 'approved') fA++;
          else if (e.status === 'rejected') fR++;
          else fP++;
          flexMembers.push({ name: e.name, dept: dateLabel + ' ' + e.time + ' · ' + statusLabel });
        } else if (e.modified) {
          if (e.status === 'approved') mA++;
          else if (e.status === 'rejected') mR++;
          else mP++;
          const ci = codeInfo(e.code);
          manualMembers.push({ name: e.name, dept: dateLabel + ' · ' + (ci ? ci.shortCode : '변경') + ' · ' + statusLabel });
        }
      });
    });

    const flexCountEl = document.getElementById('flexCount');
    if (flexCountEl) {
      flexCountEl.innerHTML = `대기 <b style="color:#f59e0b; font-weight:800;">${fP}</b> · 승인 ${fA} · 반려 ${fR}`;
    }
    const manualCountEl = document.getElementById('manualCount');
    if (manualCountEl) {
      manualCountEl.innerHTML = `대기 <b style="color:#f59e0b; font-weight:800;">${mP}</b> · 승인 ${mA} · 반려 ${mR}`;
    }

    GROUPS.flex.members = flexMembers;
    GROUPS.manual.members = manualMembers;
  }

  function renderCodeList() {
    const el = document.getElementById('codeList');
    if (!el) return;

    // 오늘 날짜 (데모 기준 2026-05-18)
    const todayStr = new Date().toISOString().split('T')[0];
    const dateStr = todayStr.startsWith('2026-05') ? todayStr : '2026-05-18';
    const todayEntries = scheduleData[dateStr] || [];

    el.innerHTML = CODES.map(c => {
      const members = todayEntries.filter(e => e.code === c.code);
      const maxShow = 3;
      const displayMembers = members.slice(0, maxShow);
      const extraCount = members.length > maxShow ? members.length - maxShow : 0;

      return `
        <div class="group_card" onclick="openPanel('${dateStr}')">
          <div class="group_time">
            <span class="badge" style="background:${c.color}; color:${c.textColor}; ">${c.shortCode}</span>
            ${c.label} (${c.time})
          </div>
          <div class="group_chips">
            ${displayMembers.map(m => `<span class="chip">${m.name}</span>`).join('')}
            ${extraCount > 0 ? `<span class="chip chip_more">+${extraCount}</span>` : ''}
            ${members.length === 0 ? '<span class="chip chip_null">근무자 없음</span>' : ''}
          </div>
        </div>`;
    }).join('');
  }

  function buildEvents() {
    const events = [];
    Object.entries(scheduleData).forEach(([date, entries]) => {
      entries.forEach((entry, i) => {
        const ci = codeInfo(entry.code);
        const color = ci ? ci.color : (entry.type === 'flex' ? '#d97706' : undefined);
        const textColor = ci ? ci.textColor : (entry.type === 'flex' ? '#fff' : undefined);

        // FullCalendar 종료일은 exclusive이므로 종료일 익일로 설정
        let endStr = undefined;
        if (entry.endDate) {
          const nextDay = new Date(entry.endDate);
          nextDay.setDate(nextDay.getDate() + 1);
          endStr = nextDay.toISOString().split('T')[0];
        }

        events.push({
          id: `${date}-${i}`,
          title: evLabel(entry),
          start: date,
          end: endStr,
          allDay: true,
          classNames: [evClass(entry)],
          backgroundColor: color,
          borderColor: color,
          textColor: textColor,
          extendedProps: { 
            date, idx: i, 
            isFlex: entry.type === 'flex', 
            flexId: entry.flexId,
            ci: ci,
            entry: entry
          },
        });
      });
    });
    return events;
  }

  /* ── 캘린더 초기화 ── */
  let calendar;
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    calendar = new FullCalendar.Calendar(calendarEl, {
      locale: 'ko',
      initialView: 'dayGridMonth',
      initialDate: '2026-05-01',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'flexTime',
      },
      customButtons: {
        flexTime: {
          text: '유연근무 신청',
          click: function () {
            const modal = document.querySelector('.p_change_flexTime');
            if (modal) {
              if (typeof modal.showModal === 'function') modal.showModal();
              else modal.style.display = 'block';
            }
          }
        }
      },
      buttonText: { today: '오늘' },     
      events: buildEvents(),
      dayMaxEvents: 3,
      eventContent(arg) {
        const { ci, isFlex, entry } = arg.event.extendedProps;
        let html = '';
        
        if (isFlex) {
          html = `<div class="fc-event-main-frame">                   
                    <span class="txt">${entry.name} ${entry.time}</span>
                  </div>`;
        } else if (ci) {
          let modIcon = '';
          if (entry.modified) {
            if (entry.status === 'pending') {
              modIcon = '<i class="ic_modified" title="수동 수정됨(대기)">수동 수정됨</i>';
            } else if (entry.status === 'rejected') {
              modIcon = '<i class="ic_modified is_rejected" title="반려됨">반려됨</i>';
            }
            // approved인 경우 연필 아이콘 없음
          }

          html = `<div class="fc-event-main-frame" style="color:${ci.textColor};">
            <i class="badge" style="color:${ci.textColor};" title="${ci.desc}">${ci.shortCode}</i>
            <span class="txt">${entry.name} ${ci.time} ${modIcon}</span>
          </div>`;
        } else {
          html = `<div class="fc-event-main-frame">${arg.event.title}</div>`;
        }
        
        return { html };
      },
      eventClick(info) {
        if (info.event.extendedProps.isFlex) {
          openFlexModal(info.event.extendedProps.flexId);
        } else {
          openPanel(info.event.extendedProps.date);
        }
      },
      dateClick(info) {
        openPanel(info.dateStr);
      },
    });
    calendar.render();
  }

  function refreshCalendar() {
    if (calendar) {
      calendar.removeAllEvents();
      calendar.addEventSource(buildEvents());
    }
    renderCodeList();
  }

  /* ── 패널 ── */
  let currentDate = null;
  const panel = document.getElementById('managementPanel');
  const panelDate = document.getElementById('panelDate');
  const panelBody = document.getElementById('panelBody');
  let selectedDayEl = null;

  window.openPanel = function (dateStr) {
    // 이전 선택 해제
    if (selectedDayEl) selectedDayEl.classList.remove('fc-day-selected');

    currentDate = dateStr;
    const d = new Date(dateStr + 'T00:00:00');
    panelDate.textContent = `${d.getMonth() + 1}월 ${d.getDate()}일 (${DOW_KO[d.getDay()]})`;
    renderPanel();
    panel.classList.add('open');

    // 선택된 날짜 셀에 클래스 추가
    selectedDayEl = calendarEl.querySelector(`[data-date="${dateStr}"]`);
    if (selectedDayEl) selectedDayEl.classList.add('fc-day-selected');

    calendar.updateSize();
  }

  window.closePanel = function() {
    panel.classList.remove('open');
    if (selectedDayEl) {
      selectedDayEl.classList.remove('fc-day-selected');
      selectedDayEl = null;
    }
    calendar.updateSize();
  }
  function renderPanel() {
    // 현재 날짜에 해당하거나, 기간 내에 포함된 모든 항목 수집
    const displayEntries = [];
    Object.entries(scheduleData).forEach(([date, arr]) => {
      arr.forEach((entry, idx) => {
        const isToday = (date === currentDate);
        const isFlexInRange = (entry.type === 'flex' && entry.endDate && date < currentDate && entry.endDate >= currentDate);
        
        if (isToday || isFlexInRange) {
          displayEntries.push({ entry, date, idx });
        }
      });
    });

    let html = '';
    if (displayEntries.length === 0) {
      html += `<p class="empty_note">이 날 예외 일정 없음 — 고정 근무 유지</p>`;
    } else {
      html += displayEntries.map(({ entry, date, idx }) => {
        const type = evType(entry);        
        let statusHtml = '';
        let modIcon = '';

        if (entry.type === 'flex' || entry.modified) {
          if (entry.status === 'pending') {
            statusHtml = `
              <div class="approval_ctrl">
                <button type="button" class="btn_red" onclick="setManualStatus(${idx}, 'approved', '${date}')">승인</button>
                <button type="button" class="btn_red_line" onclick="setManualStatus(${idx}, 'rejected', '${date}')">반려</button>
              </div>`;
          } else if (entry.status === 'rejected') {
            if (entry.modified) modIcon = '<i class="ic_modified is_rejected t_red" title="반려됨">반려됨</i>';
            statusHtml = `
              <div class="approval_ctrl">
                <button type="button" class="btn_red_line" onclick="setManualStatus(${idx}, 'pending', '${date}')">재검토</button>
              </div>
              <i class="badge reject">반려됨</i>`;
          } else if (entry.status === 'approved') {
            statusHtml = `
              <div class="approval_ctrl">
                <button type="button" class="btn_red_line" onclick="setManualStatus(${idx}, 'pending', '${date}')">취소</button>
              </div>
              <i class="badge done">승인됨</i>`;
          }
        }

        if (entry.type === 'flex') {
          return `
          <div class="entry_row" data-idx="${idx}">
            <span class="badge ${badgeClass(type)}">${badgeText(type)}</span>
            <span class="entry_name">${entry.name}</span>
            <button type="button" class="flex_clickable" onclick="openFlexModal('${entry.flexId}')" title="신청 상세 보기">
              ${entry.origTime || '-'} → ${entry.time} (${entry.duration || '1일'}), ${entry.reason}
            </button>
            <div class="approval_status">
              ${statusHtml}
              <button class="icon_btn" onclick="deleteEntry(${idx}, '${date}')" title="삭제">✕</button>
            </div>
          </div>`;
        }

        // 수동 수정/입력 건 (manual/shift)
        if (entry.modified && !modIcon && entry.status === 'pending') {
          modIcon = '<i class="ic_modified" title="수동 수정됨(대기)">수동 수정됨</i>';
        }

        return `
        <div class="entry_row" data-idx="${idx}">          
            <span class="badge ${badgeClass(type)}">${badgeText(type)}</span>
            <span class="entry_name">${entry.name}${modIcon}</span>                     
            <select class="entry_select" onchange="changeCode(${idx}, this.value, '${date}')">
              ${CODES.map(c =>
            `<option value="${c.code}" ${c.code === entry.code ? 'selected' : ''}>
                  ${c.shortCode} · ${c.label} (${c.time})
                </option>`).join('')}
            </select>
            <div class="approval_status">
              ${statusHtml}
              <button class="icon_btn" onclick="deleteEntry(${idx}, '${date}')" title="삭제">✕</button>          
            </div>
        </div>`;
      }).join('');
    }

    html += `
      <div class="add_row">
        <select id="addName">
          <option value="">직원 선택</option>
          ${STAFF_SHIFT.map(n => `<option>${n}</option>`).join('')}
        </select>
        <select id="addCode" class="add_code">
          ${CODES.map(c => `<option value="${c.code}">${c.shortCode} · ${c.label} (${c.time})</option>`).join('')}
        </select>
        <button type="button" class="btn_add" onclick="addEntry()">추가</button>
      </div>`;
    panelBody.innerHTML = html;
  }

  window.setManualStatus = function (idx, status, date) {
    const targetDate = date || currentDate;
    if (!scheduleData[targetDate] || !scheduleData[targetDate][idx]) return;
    scheduleData[targetDate][idx].status = status;
    refreshCalendar();
    renderPanel();
    updateFlexCount();
  }

  window.changeCode = function (idx, code, date) {
    const targetDate = date || currentDate;
    scheduleData[targetDate][idx].code = code;
    const ci = codeInfo(code);
    if (ci) scheduleData[targetDate][idx].type = ci.type;
    scheduleData[targetDate][idx].modified = true;
    scheduleData[targetDate][idx].status = 'pending'; // 수정 시 대기로 초기화
    refreshCalendar();
    updateFlexCount();
  }

  window.deleteEntry = function (idx, date) {
    const targetDate = date || currentDate;
    scheduleData[targetDate].splice(idx, 1);
    if (scheduleData[targetDate].length === 0) delete scheduleData[targetDate];
    refreshCalendar();
    renderPanel();
    updateFlexCount();
  }

  window.addEntry = function () {
    const name = document.getElementById('addName').value;
    const code = document.getElementById('addCode').value;
    if (!name) return;
    if (!scheduleData[currentDate]) scheduleData[currentDate] = [];
    scheduleData[currentDate].push({ 
      name, 
      code, 
      modified: true,
      status: 'pending' // 신규 추가 시 대기 상태
    });
    refreshCalendar();
    renderPanel();
    updateFlexCount();
  }

  /* ── 유연근무 모달 ── */
  const flexModal = document.getElementById('flexModal');
  let currentFlexEntry = null;

  function findFlexEntry(flexId) {
    for (const [date, arr] of Object.entries(scheduleData)) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].flexId === flexId) return { date, idx: i, entry: arr[i] };
      }
    }
    return null;
  }

  window.openFlexModal = function (flexId) {
    const found = findFlexEntry(flexId);
    if (!found) return;
    currentFlexEntry = found;
    renderFlexModal();
    flexModal.showModal();
  }

  window.closeFlexModal = function () {
    flexModal.close();
  }

  function renderFlexModal() {
    const { date, entry } = currentFlexEntry;
    const d = new Date(date + 'T00:00:00');
    const dateStr = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${DOW_KO[d.getDay()]})`;
    const statusMap = { pending: '검토 중', approved: '승인됨', rejected: '반려됨' };
    const statusClass = { pending: 'hold', approved: 'done', rejected: 'apply' };
    
    const body = document.getElementById('flexModalBody');
    body.innerHTML = `
      <dl class="set_list work_dot_wrap">
        <dt>신청자</dt>
        <dd><strong>${entry.name}</strong></dd>
        <dt>신청일</dt>
        <dd>${entry.applyDate || '-'}</dd>
        <dt>변경 날짜</dt>
        <dd>${dateStr}</dd>
        <dt>기존 근무시간</dt>
        <dd>${entry.origTime || '-'}</dd>
        <dt>변경 근무시간</dt>
        <dd><strong style="color:#f08c00">${entry.time}</strong></dd>
        <dt>변경 기간</dt>
        <dd>${entry.period ? `${entry.period} (${entry.duration || '1일'})` : `${dateStr} (1일)`}</dd>
        <dt>사유</dt>
        <dd><div class="reason_box">${entry.reason || '사유 없음'}</div></dd>
        <dt>처리 상태</dt>
        <dd class="ico_proj"><i class="${statusClass[entry.status]}">${statusMap[entry.status]}</i></dd>
      </dl>`;
    
    const footer = document.getElementById('flexModalFooter');
    if (entry.status === 'pending') {
      footer.innerHTML = `
        <button type="button" class="btn_red" onclick="setFlexStatus('approved')">승인</button>
        <button type="button" class="btn_red_line" onclick="setFlexStatus('rejected')">반려</button>`;
    } else {
      footer.innerHTML = `
        <button type="button" class="btn_gray_line" onclick="setFlexStatus('pending')">되돌리기</button>
        <button type="button" class="btn_red" onclick="closeFlexModal()">확인</button>`;
    }
  }

  window.setFlexStatus = function (status) {
    const { date, idx } = currentFlexEntry;
    scheduleData[date][idx].status = status;
    currentFlexEntry.entry = scheduleData[date][idx];
    renderFlexModal();
    refreshCalendar();
    updateFlexCount();
    if (currentDate === date) renderPanel();
  }

  /* ── 엑셀 업로드 ── */
  const fileInput = document.getElementById('fileInput');
  window.triggerUpload = function() {
    fileInput.click();
  }

  fileInput.addEventListener('change', function() {
    if (!this.files.length) return;
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        
        let imported = 0;
        rows.slice(1).forEach(row => {
          const [dateRaw, name, code] = row;
          if (!dateRaw || !name || !code) return;
          
          let dateStr = '';
          if (typeof dateRaw === 'number') {
            const d = new Date(Math.round((dateRaw - 25569) * 86400 * 1000));
            const y = d.getUTCFullYear();
            const m = String(d.getUTCMonth()+1).padStart(2,'0');
            const day = String(d.getUTCDate()).padStart(2,'0');
            dateStr = `${y}-${m}-${day}`;
          } else {
            dateStr = String(dateRaw).trim();
          }
          
          if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return;
          if (!scheduleData[dateStr]) scheduleData[dateStr] = [];
          scheduleData[dateStr].push({ name: String(name).trim(), code: String(code).trim() });
          excelDates.add(dateStr);
          imported++;
        });
        
        refreshCalendar();
        updateFlexCount();
        alert(`"${file.name}" 업로드 완료!\n${imported}건이 추가되었습니다.`);
      } catch(err) {
        alert('파일 파싱 실패: ' + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
    this.value = '';
  });

  /* ── 엑셀 다운로드 ── */
  window.downloadTemplate = function() {
    const header = [['날짜 (YYYY-MM-DD)', '직원명', '근무코드', '비고']];
    const sample = [
      ['2026-05-01', '홍길동', 'D1', '예시 데이터'],
      ['2026-05-01', '김철수', 'N1', ''],
      ['2026-05-02', '이영희', 'D2', ''],
    ];
    const codeSheet = [
      ['코드', '설명', '근무시간'],
      ...CODES.map(c => [c.code, c.label, c.time])
    ];
    
    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.aoa_to_sheet([...header, ...sample]);
    ws1['!cols'] = [{ wch: 20 }, { wch: 14 }, { wch: 10 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, ws1, '근무표');
    
    const ws2 = XLSX.utils.aoa_to_sheet(codeSheet);
    ws2['!cols'] = [{ wch: 8 }, { wch: 12 }, { wch: 16 }];
    XLSX.utils.book_append_sheet(wb, ws2, '근무코드 참고');
    
    XLSX.writeFile(wb, '근무표_양식.xlsx');
  }

  /* 초기 실행 */
  renderCodeList();
  updateFlexCount();
});
