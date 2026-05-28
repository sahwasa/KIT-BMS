/**
 * 근무 스케줄 관리 - 리팩토링 버전
 *
 * 주요 변경사항:
 *  1. excelDates 미선언 버그 수정
 *  2. window.* 전역 함수 → 이벤트 위임(event delegation) 방식으로 교체
 *  3. 상태(state) 접근을 Store 객체로 추상화
 *  4. 필터링 로직 중복 제거 → shouldShowEntry() 단일 함수로 통합
 *  5. 매직 스트링 → STATUS / TYPE 상수로 교체
 *  6. XSS 방지 → escapeHtml() 적용
 *  7. 하드코딩된 데모 날짜 제거 → getCurrentDateStr() 사용
 *  8. updateFlexCount() 전체 순회 최적화 → 변경 시에만 갱신
 *  9. UI 동기화 로직 통합 → syncUI() 도입
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 1. 상수 정의
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const STATUS = Object.freeze({
    PENDING:  'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
  });

  const TYPE = Object.freeze({
    FLEX:  'flex',
    SHIFT: 'shift',
  });

  const DOW_KO = ['일', '월', '화', '수', '목', '금', '토'];

  const CODES = [
    { code: 'C62_4',  group: '김천', shortLabel: '풀타임', label: '풀타임 (24h) 근무', time: '09–09시<sup>+1</sup>', color: '#ffe0c2', textColor: '#8a3a00' },
    { code: 'C62_5D', group: '레이더', shortLabel: '주', label: '주간근무',         time: '09–21시',              color: '#ffd6e0', textColor: '#8a0a2a' },
    { code: 'C62_5N', group: '레이더', shortLabel: '야', label: '야간근무',         time: '21–09시<sup>+1</sup>', color: '#ffd6e0', textColor: '#8a0a2a' },    
    { code: 'C62_6',  group: '행안부', shortLabel: '행안부 상황근무',    label: '상황근무',       time: '08–12시',              color: '#e8d5ff', textColor: '#4a1a8a' },
    { code: 'C62_7D', group: '격일',   shortLabel: '주 3회',  label: '주3회 근무',         time: '09–18시',              color: '#DAEDE5 ', textColor: '#164e63' }
  ];

  const GROUPS = {
    g1: {
      time: '09:00 – 18:00',
      members: [
        { name: '김선욱', dept: '경영지원실' }, { name: '최희석', dept: '인사총무팀' },
        { name: '김홍관', dept: '인사총무팀' }, { name: '이주연', dept: '재무회계팀' },
        { name: '이정서', dept: '재무회계팀' }, { name: '조재휘', dept: '전략사업실' },
        { name: '황성영', dept: '솔루션개발팀' }, { name: '강성부', dept: '솔루션개발팀' },
        { name: '임대택', dept: '솔루션개발팀' },
      ],
    },
    g2: {
      time: '10:00 – 19:00',
      members: [
        { name: '윤정진', dept: 'SI개발팀' }, { name: '반미선', dept: 'SI개발팀' },
        { name: '이광철', dept: 'SI개발팀' }, { name: '박지은', dept: 'SI개발팀' },
        { name: '민슬기', dept: 'SI개발팀' }, { name: '장그림', dept: 'SI개발팀' },
        { name: '김소담', dept: 'SI개발팀' },
      ],
    },
    g3: {
      time: '08:00 – 17:00',
      members: [
        { name: '이정현', dept: '제품개발부' },
        { name: '장서현', dept: '제품개발부' },
      ],
    },
    g4: {
      time: '08:00 – 12:00',
      members: [
        { name: '황성영', dept: '제품개발부' }
      ],
    },
    flex:   { time: '유연근무 신청',  members: [] },
    manual: { time: '근무변경 신청',  members: [] },
  };

  const STAFF_SHIFT = [
    '강민경','강성부','김민준','김선욱','김소담','김승기','김승태','김태수','김형준',
    '김홍관','류다언','문영찬','민슬기','반미선','박상진','박지은','박창현','박지호','서정헌',
    '손병권','신새미','신현기','엄용석','오지은','윤동일','윤재원','윤정진','윤종훈',
    '이광철','이병수','이정서','이주연','이홍설','임대택','장그림','정민욱','정우성',
    '조재휘','조현완','차지원','최경희','최희석','한지민','황성영','이정현','장서현'
  ];

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 2. 유틸리티
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

  /** HTML 특수문자 이스케이프 (XSS 방지) */
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[c]);
  }

  function codeInfo(code) {
    return CODES.find(c => c.code === code) ?? null;
  }

  /** 드롭다운 옵션 그룹화 생성 */
  function buildCodeOptions(selectedCode) {
    const groups = CODES.reduce((acc, c) => {
      const g = c.group || '기타';

      if (!acc[g]) acc[g] = [];
      acc[g].push(c);
      return acc;
    }, {});

    return Object.entries(groups).map(([name, members]) => {
      return `<optgroup label="${escapeHtml(name)}">
        ${members.map(c => `
          <option value="${c.code}" ${c.code === selectedCode ? 'selected' : ''}>
            ${c.group} · ${c.label} (${c.time})
          </option>`).join('')}
      </optgroup>`;
    }).join('');
  }

  /** 현재 날짜 문자열 반환 (YYYY-MM-DD) */
  function getCurrentDateStr() {
    return new Date().toISOString().split('T')[0];
  }

  function formatDateLabel(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return `${d.getMonth() + 1}월 ${d.getDate()}일 (${DOW_KO[d.getDay()]})`;
  }

  /** 달력/패널 표시 여부를 결정하는 단일 필터 함수 */
  function shouldShowEntry(entry, context = 'calendar') {
    if (entry.type === TYPE.FLEX) {
      if (context === 'calendar') {
        // 달력: 승인/반려된 유연근무는 표시 안 함 (대기 중만 표시)
        return entry.status === STATUS.PENDING;
      }
      return true; // 패널에서는 모두 표시
    }
    if (entry.modified && entry.status === STATUS.REJECTED && context === 'calendar') {
      return false; // 달력: 반려된 수동 수정은 숨김
    }
    return true;
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 3. 상태(State) Store — 데이터 접근 추상화
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const Store = (() => {
    const data = {
      '2026-05-01': [{ name: '엄용석', code: 'C62_4' }, { name: '김승기', code: 'C62_6' }],
      '2026-05-02': [{ name: '손병권', code: 'C62_4' }, { name: '윤종훈', code: 'C62_5D' }],
      '2026-05-03': [{ name: '서정헌', code: 'C62_6' }],
      '2026-05-04': [{ name: '김태수', code: 'C62_5D' }, { name: '박창현', code: 'C62_4' }, { name: '박상진', code: 'C62_7D' }],
      '2026-05-05': [{ name: '김승태', code: 'C62_6' }],
      '2026-05-06': [
        { name: '문영찬', code: null, type: 'flex', time: '11–20시', flexId: 'f1', applyDate: '2026-04-25', origTime: '09시–18시', reason: '병원 방문으로 인한 출근 지연', status: STATUS.PENDING },
        { name: '서정헌', code: 'C62_4' },
        { name: '박상진', code: 'C62_7D' },
      ],
      '2026-05-07': [{ name: '박창현', code: 'C62_5N' }],
      '2026-05-08': [{ name: '김태수', code: 'C62_4', modified: true, status: STATUS.PENDING }, { name: '손병권', code: 'C62_6' }, { name: '박상진', code: 'C62_7D' }],
      '2026-05-09': [{ name: '윤동일', code: 'C62_4' }, { name: '정민욱', code: 'C62_5N' }],
      '2026-05-10': [{ name: '엄용석', code: 'C62_5D' }, { name: '김형준', code: 'C62_6' }],
      '2026-05-11': [{ name: '이홍설', code: 'C62_4' }, { name: '박상진', code: 'C62_7D' }],
      '2026-05-12': [{ name: '김승기', code: 'C62_6' }, { name: '서정헌', code: 'C62_5D' }],
      '2026-05-13': [
        { name: '김승태', code: null, type: 'flex', time: '07–16시', flexId: 'f2', applyDate: '2026-04-28', origTime: '10–19시', reason: '자녀 학교 행사 참석', status: STATUS.APPROVED },
        { name: '박창현', code: 'C62_4' },
        { name: '박상진', code: 'C62_7D' },
      ],
      '2026-05-14': [{ name: '이홍설', code: 'C62_6' }],
      '2026-05-15': [
        { name: '신현기', code: null, type: 'flex', time: '08–17시', flexId: 'f3', applyDate: '2026-05-02', origTime: '10–19시', reason: '개인 사정', status: STATUS.REJECTED },
        { name: '손병권', code: 'C62_5D' },
        { name: '박상진', code: 'C62_7D' },
      ],
      '2026-05-16': [{ name: '정민욱', code: 'C62_4' }, { name: '윤동일', code: 'C62_6' }],
      '2026-05-17': [{ name: '서정헌', code: 'C62_4' }],
      '2026-05-18': [
        { name: '김승기', code: 'C62_5D' }, { name: '이병수', code: 'C62_6' },
        { name: '김소담', code: null, type: 'flex', time: '08–17시', flexId: 'f6', applyDate: '2026-05-10', origTime: '09시–18시', reason: '육아기 단축근무 신청', status: STATUS.APPROVED, period: '2026-05-18~2026-05-22', endDate: '2026-05-22', duration: '5일' },
        { name: '박상진', code: 'C62_7D' },
      ],
      '2026-05-19': [{ name: '박창현', code: 'C62_4' }, { name: '김태수', code: 'C62_5N' }],
      '2026-05-20': [
        { name: '윤종훈', code: null, type: 'flex', time: '10–19시', flexId: 'f4', applyDate: '2026-04-08', origTime: '09시–18시', reason: '관공서 업무 처리', status: STATUS.PENDING },
        { name: '김형준', code: 'C62_4' },
        { name: '박상진', code: 'C62_7D' },
      ],
      '2026-05-21': [{ name: '이홍설', code: 'C62_5D' }, { name: '정민욱', code: 'C62_6' }],
      '2026-05-22': [{ name: '이홍설', code: 'C62_5D' },{ name: '이홍설', code: 'C62_5N' },{ name: '엄용석', code: 'C62_4', modified: true, status: STATUS.PENDING }, { name: '박상진', code: 'C62_7D' }],
      '2026-05-23': [{ name: '서정헌', code: 'C62_5D' }, { name: '윤동일', code: 'C62_4' }],
      '2026-05-24': [{ name: '김승태', code: 'C62_6' }, { name: '박창현', code: 'C62_5N' }],
      '2026-05-25': [
        { name: '이병수', code: null, type: 'flex', time: '09–18시', flexId: 'f5', applyDate: '2026-05-12', origTime: '10–19시', reason: '자택 방문 서비스 예약', status: STATUS.APPROVED },
        { name: '김태수', code: 'C62_6' },
        { name: '박상진', code: 'C62_7D' },
      ],
      '2026-05-26': [{ name: '김형준', code: 'C62_4' }],
      '2026-05-27': [{ name: '윤종훈', code: 'C62_5N' }, { name: '김승기', code: 'C62_4' }, { name: '박상진', code: 'C62_7D' }],
      '2026-05-28': [{ name: '손병권', code: 'C62_4' }],
      '2026-05-29': [{ name: '엄용석', code: 'C62_6' }, { name: '서정헌', code: 'C62_5N' }, { name: '박상진', code: 'C62_7D' }],
      '2026-05-30': [{ name: '박창현', code: 'C62_5D' }, { name: '윤동일', code: 'C62_4', modified: true, status: STATUS.REJECTED }],
      '2026-05-31': [{ name: '김승태', code: 'C62_4' }, { name: '정민욱', code: 'C62_6' }],
    };

    function getEntries(date) { return data[date] ?? []; }
    function getEntry(date, idx) { return data[date]?.[idx] ?? null; }
    function updateEntry(date, idx, patch) {
      if (!data[date]?.[idx]) return;
      Object.assign(data[date][idx], patch);
    }
    function deleteEntry(date, idx) {
      if (!data[date]) return;
      data[date].splice(idx, 1);
      if (data[date].length === 0) delete data[date];
    }
    function addEntry(date, entry) {
      if (!data[date]) data[date] = [];
      data[date].push(entry);
    }
    function findFlexEntry(flexId) {
      for (const [date, arr] of Object.entries(data)) {
        const idx = arr.findIndex(e => e.flexId === flexId);
        if (idx !== -1) return { date, idx, entry: arr[idx] };
      }
      return null;
    }
    function forEach(cb) {
      Object.entries(data).forEach(([date, arr]) => {
        arr.forEach((entry, idx) => cb(entry, date, idx));
      });
    }

    function buildEvents() {
      const events = [];
      Object.entries(data).forEach(([date, entries]) => {
        entries.forEach((entry, i) => {
          if (!shouldShowEntry(entry, 'calendar')) return;
          const ci = codeInfo(entry.code);          
          const color     = ci ? ci.color     : (entry.type === TYPE.FLEX ? '#d97706' : undefined);
          const textColor = ci ? ci.textColor : (entry.type === TYPE.FLEX ? '#fff'    : undefined);
          let endStr;
          if (entry.endDate) {
            const next = new Date(entry.endDate);
            next.setDate(next.getDate() + 1);
            endStr = next.toISOString().split('T')[0];
          }
          events.push({
            id: `${date}-${i}`,
            title: buildEventTitle(entry),
            start: date,
            end: endStr,
            allDay: true,
            order: entry.type === TYPE.FLEX ? 0 : 1,
            classNames: buildEventClasses(entry),
            backgroundColor: color,
            borderColor: color,
            textColor,
            extendedProps: { date, idx: i, isFlex: entry.type === TYPE.FLEX, flexId: entry.flexId, ci, entry },
          });
        });
      });
      return events;
    }

    return { getEntries, getEntry, updateEntry, deleteEntry, addEntry, findFlexEntry, forEach, buildEvents };
  })();

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 4. 이벤트 타이틀 / 클래스 빌더
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function buildEventTitle(entry) {
    if (entry.type === TYPE.FLEX) {
      return `${escapeHtml(entry.name)} 유연 ${entry.time}`;
    }
    const ci = codeInfo(entry.code);
    return ci
      ? `<span>${ci.group.charAt(0)}</span> ${escapeHtml(entry.name)} ${ci.time}`
      : escapeHtml(entry.name);
  }

  function buildEventClasses(entry) {
    const classes = [];
    if (entry.type === TYPE.FLEX) {
      const map = { [STATUS.APPROVED]: 'ev_flex_approved', [STATUS.REJECTED]: 'ev_flex_rejected', [STATUS.PENDING]:  'ev_flex_pending' };
      classes.push(map[entry.status] ?? 'ev_flex_pending');
    } else {
      classes.push('ev_custom');
    }
    if (entry.modified && entry.status !== STATUS.APPROVED) classes.push('is_modified');
    return classes;
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 5. 통계 및 렌더링
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function updateFlexCount() {
    let fP = 0, fA = 0, fR = 0, mP = 0, mA = 0, mR = 0;
    const flexMembers = [], manualMembers = [];

    Store.forEach((entry, date) => {
      const d = new Date(date + 'T00:00:00');
      const dateLabel = `${d.getMonth() + 1}/${d.getDate()}`;
      const statusLabel = { [STATUS.APPROVED]: '승인', [STATUS.REJECTED]: '반려', [STATUS.PENDING]: '대기' }[entry.status] ?? '대기';

      if (entry.type === TYPE.FLEX) {
        if (entry.status === STATUS.APPROVED) fA++; else if (entry.status === STATUS.REJECTED) fR++; else fP++;
        flexMembers.push({ name: entry.name, dept: `${dateLabel} ${entry.time} · ${statusLabel}` });
      } else if (entry.modified) {
        if (entry.status === STATUS.APPROVED) mA++; else if (entry.status === STATUS.REJECTED) mR++; else mP++;
        const ci = codeInfo(entry.code);
        manualMembers.push({ name: entry.name, dept: `${dateLabel} · ${ci ? ci.group : '변경'} · ${statusLabel}` });
      }
    });

    const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
    set('flexCount', `대기 <b style="color:#f59e0b; font-weight:800;">${fP}</b> · 승인 ${fA} · 반려 ${fR}`);
    set('manualCount', `대기 <b style="color:#f59e0b; font-weight:800;">${mP}</b> · 승인 ${mA} · 반려 ${mR}`);
    GROUPS.flex.members = flexMembers;
    GROUPS.manual.members = manualMembers;
  }

  function renderCodeList() {
    const el = document.getElementById('irregularList');
    if (!el) return;
    const dateStr = getCurrentDateStr();
    const todayEntries = Store.getEntries(dateStr);
    const groupedCodes = CODES.reduce((acc, c) => {
      const gName = c.group || '기타';
      if (!acc[gName]) acc[gName] = { name: gName, details: [], allMembers: [], color: c.color, textColor: c.textColor };
      const membersByCode = todayEntries.filter(e => e.code === c.code);
      acc[gName].details.push({ code: c.code, label: c.label, shortLabel: c.shortLabel, time: c.time, members: membersByCode });
      acc[gName].allMembers.push(...membersByCode);
      return acc;
    }, {});

    el.innerHTML = Object.values(groupedCodes).map(g => {
      if (g.details.length > 1) {
        const timesLabel = g.details.map(d => `${d.shortLabel} (${d.time})`).join(' / ');
        return `<div class="group_card type_complex" data-action="open-panel" data-date="${escapeHtml(dateStr)}" style="border-color:${g.color};">
          <div class="group_tit" style="background:${g.color};color:${g.textColor};"><span class="badge">${g.name}</span><span class="time">${timesLabel}</span></div>
          <div class="shift_rows">${g.details.map(d => `<div class="shift_row"><strong>${d.label}</strong><div class="group_chips">${d.members.length > 0 ? d.members.map(m => `<span class="chip">${escapeHtml(m.name)}</span>`).join('') : '<span class="chip chip_null">근무자 없음</span>'}</div></div>`).join('')}</div>
        </div>`;
      }
      const maxShow = 3;
      const detail = g.details[0];
      return `<div class="group_card" data-action="open-panel" data-date="${escapeHtml(dateStr)}" style="border-color:${g.color};">
        <div class="group_tit" style="background:${g.color};color:${g.textColor};"><span class="badge">${g.name}</span><span class="time">${detail.label} (${detail.time})</span></div>
        <div class="group_chips">${g.allMembers.slice(0, maxShow).map(m => `<span class="chip">${escapeHtml(m.name)}</span>`).join('')}${g.allMembers.length > maxShow ? `<span class="chip chip_more">+${g.allMembers.length - maxShow}</span>` : ''}${g.allMembers.length === 0 ? '<span class="chip chip_null">근무자 없음</span>' : ''}</div>
      </div>`;
    }).join('');
  }

  const RESERVED_GROUP_KEYS = new Set(['flex', 'manual']);

  function renderRegularGroups() {
    const el = document.getElementById('regularList');
    if (!el) return;

    const regularIds = Object.keys(GROUPS).filter(id => !RESERVED_GROUP_KEYS.has(id));

    el.innerHTML = regularIds.map(id => {
      const g = GROUPS[id];
      if (!g) return '';
      const maxShow = 3;
      return `<div class="group_card" data-group-id="${id}">
        <div class="group_time">${escapeHtml(g.time)}</div>
        <div class="group_chips">
          ${g.members.slice(0, maxShow).map(m => `<span class="chip">${escapeHtml(m.name)}</span>`).join('')}
          ${g.members.length > maxShow ? `<span class="chip chip_more">+${g.members.length - maxShow}</span>` : ''}
        </div>
      </div>`;
    }).join('');
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 6. UI 동기화 및 캘린더
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function syncUI() {
    if (!calendar) return;
    calendar.removeAllEvents();
    calendar.addEventSource(Store.buildEvents());
    updateFlexCount();
    renderCodeList();
    if (panel?.classList.contains('open')) renderPanel();
  }

  let calendar;
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    calendar = new FullCalendar.Calendar(calendarEl, {
      locale: 'ko', initialView: 'dayGridMonth', initialDate: '2026-05-01',
      headerToolbar: { left: 'prev,next today', center: 'title', right: 'approveAll flexTime' },
      customButtons: {
        flexTime: { text: '유연근무 신청', click() { const modal = document.querySelector('.p_change_flexTime'); modal?.showModal?.(); } },
        approveAll: { text: '교대근무 일괄 승인', click: approveAllManualShifts }
      },
      buttonText: { today: '오늘' }, events: Store.buildEvents(), eventOrder: 'order,start', dayMaxEvents: 3,
      eventContent(arg) {
        const { ci, isFlex, entry } = arg.event.extendedProps;
        if (isFlex) return { html: `<div class="fc-event-main-frame"><span class="txt">${escapeHtml(entry.name)} ${entry.time}</span></div>` };
        if (ci) return { html: `<div class="fc-event-main-frame" style="color:${ci.textColor};"><i class="badge" style="color:${ci.textColor};">${ci.group.charAt(0)}</i><span class="txt">${escapeHtml(entry.name)} ${ci.time}</span></div>` };
        return { html: `<div class="fc-event-main-frame">${escapeHtml(arg.event.title)}</div>` };
      },
      eventClick(info) { const { isFlex, flexId, date } = info.event.extendedProps; isFlex ? openFlexModal(flexId) : openPanel(date); },
      dateClick(info) { openPanel(info.dateStr); }
    });
    calendar.render();
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 7. 관리 패널
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  let currentDate = null, selectedDayEl = null;
  const panel = document.getElementById('managementPanel'), panelDate = document.getElementById('panelDate'), panelBody = document.getElementById('panelBody');

  function openPanel(dateStr) {
    if (selectedDayEl) selectedDayEl.classList.remove('fc-day-selected');
    currentDate = dateStr;
    panelDate.textContent = formatDateLabel(dateStr);
    renderPanel();
    panel.classList.add('open');
    selectedDayEl = calendarEl?.querySelector(`[data-date="${dateStr}"]`);
    selectedDayEl?.classList.add('fc-day-selected');
    calendar?.updateSize();
  }

  function closePanel() {
    panel.classList.remove('open');
    selectedDayEl?.classList.remove('fc-day-selected');
    selectedDayEl = null;
    calendar?.updateSize();
  }

  function renderPanel() {
    const displayEntries = [];
    Store.forEach((entry, date, idx) => {
      const isToday = date === currentDate;
      const isFlexInRange = (entry.type === TYPE.FLEX && entry.endDate && date < currentDate && entry.endDate >= currentDate);
      if (isToday || isFlexInRange) displayEntries.push({ entry, date, idx });
    });
    let html = displayEntries.length === 0 ? `<p class="empty_note">이 날 예외 일정 없음 — 고정 근무 유지</p>` : displayEntries.map(({ entry, date, idx }) => buildEntryRow(entry, date, idx)).join('');
    html += buildAddRow();
    panelBody.innerHTML = html;
  }

  function buildEntryRow(entry, date, idx) {
    const isFlex = entry.type === TYPE.FLEX, ci = codeInfo(entry.code);
    let badgeHtml = isFlex ? `<span class="badge badge_flex">유연</span>` : `<span class="badge" ${ci ? `style="background:${ci.color}; color:${ci.textColor}; border-color:${ci.color};"` : ''}>${escapeHtml(ci ? ci.group : '교대')}</span>`;
    const statusHtml = buildStatusControls(entry, date, idx);

    if (isFlex) {
      return `<div class="entry_row" data-idx="${idx}" data-date="${escapeHtml(date)}">${badgeHtml}<span class="entry_name">${escapeHtml(entry.name)}</span><button type="button" class="flex_clickable" data-action="open-flex-modal" data-flex-id="${escapeHtml(entry.flexId)}">${escapeHtml(entry.origTime) || '-'} → ${escapeHtml(entry.time)} (${escapeHtml(entry.duration) || '1일'}), ${escapeHtml(entry.reason)}</button><div class="approval_status">${statusHtml}<button class="icon_btn" data-action="delete-entry" data-idx="${idx}" data-date="${escapeHtml(date)}">✕</button></div></div>`;
    }

    return `<div class="entry_row" data-idx="${idx}" data-date="${escapeHtml(date)}">${badgeHtml}<div class="entry_name_wrap"><select class="entry_select name_select" data-action="change-name" data-idx="${idx}" data-date="${escapeHtml(date)}">${STAFF_SHIFT.map(n => `<option value="${escapeHtml(n)}" ${n === entry.name ? 'selected' : ''}>${escapeHtml(n)}</option>`).join('')}</select></div><select class="entry_select code_select" data-action="change-code" data-idx="${idx}" data-date="${escapeHtml(date)}">${buildCodeOptions(entry.code)}</select><div class="approval_status">${statusHtml}${entry.modified && entry.status === STATUS.PENDING ? '<i class="badge wait">대기</i>' : ''}<button class="icon_btn" data-action="delete-entry" data-idx="${idx}" data-date="${escapeHtml(date)}">✕</button></div></div>`;
  }

  function buildStatusControls(entry, date, idx) {
    if (!(entry.type === TYPE.FLEX || entry.modified)) return '';
    if (entry.status === STATUS.PENDING) return `<div class="approval_ctrl"><button type="button" class="btn_red" data-action="set-status" data-status="approved" data-idx="${idx}" data-date="${escapeHtml(date)}">승인</button><button type="button" class="btn_red_line" data-action="set-status" data-status="rejected" data-idx="${idx}" data-date="${escapeHtml(date)}">반려</button></div>`;
    if (entry.status === STATUS.REJECTED) return `<div class="approval_ctrl"><button type="button" class="btn_red_line" data-action="set-status" data-status="pending" data-idx="${idx}" data-date="${escapeHtml(date)}">재검토</button></div><i class="badge reject">반려됨</i>`;
    if (entry.status === STATUS.APPROVED) return `<div class="approval_ctrl"><button type="button" class="btn_red_line" data-action="set-status" data-status="pending" data-idx="${idx}" data-date="${escapeHtml(date)}">승인취소</button></div><i class="badge done">승인됨</i>`;
    return '';
  }

  function buildAddRow() {
    return `<div class="add_row"><select id="addName" class="add_name"><option value="">직원 선택</option>${STAFF_SHIFT.map(n => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('')}</select><select id="addCode" class="add_code">${buildCodeOptions()}</select><button type="button" class="btn_add" data-action="add-entry">추가</button></div>`;
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 8. 이벤트 위임
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  panelBody?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]'); if (!btn) return;
    const { action, idx, date, status, flexId } = btn.dataset, i = parseInt(idx, 10), dt = date || currentDate;
    if (action === 'set-status') { Store.updateEntry(dt, i, { status }); syncUI(); }
    else if (action === 'delete-entry') { Store.deleteEntry(dt, i); syncUI(); }
    else if (action === 'open-flex-modal') { openFlexModal(flexId); }
    else if (action === 'add-entry') { const n = document.getElementById('addName').value, c = document.getElementById('addCode').value; if (n) { Store.addEntry(currentDate, { name: n, code: c, modified: true, status: STATUS.PENDING }); syncUI(); } }
  });

  panelBody?.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-action]'); if (!sel) return;
    const { action, idx, date } = sel.dataset, i = parseInt(idx, 10), dt = date || currentDate;
    if (action === 'change-name') { Store.updateEntry(dt, i, { name: sel.value, modified: true, status: STATUS.PENDING }); syncUI(); }
    else if (action === 'change-code') { const ci = codeInfo(sel.value); Store.updateEntry(dt, i, { code: sel.value, type: ci?.type ?? TYPE.SHIFT, modified: true, status: STATUS.PENDING }); syncUI(); }
  });

  document.getElementById('irregularList')?.addEventListener('click', (e) => { const card = e.target.closest('[data-action="open-panel"]'); if (card) openPanel(card.dataset.date); });
  document.getElementById('panelCloseBtn')?.addEventListener('click', closePanel);

  function approveAllManualShifts() {
    let count = 0;
    Store.forEach((e, d, i) => { if (e.type !== TYPE.FLEX && e.modified && e.status === STATUS.PENDING) { Store.updateEntry(d, i, { status: STATUS.APPROVED }); count++; } });
    if (count > 0) { alert(`${count}건의 교대근무 수정사항이 일괄 승인되었습니다.`); syncUI(); } else { alert('일괄 승인할 교대근무 수정 내역이 없습니다.'); }
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 9. 유연근무 모달
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const flexModal = document.getElementById('flexModal');
  let currentFlexEntry = null;

  function openFlexModal(flexId) {
    const found = Store.findFlexEntry(flexId); if (!found) return;
    currentFlexEntry = found; renderFlexModal(); flexModal.showModal();
  }

  function renderFlexModal() {
    const { date, entry } = currentFlexEntry, dateStr = formatDateLabel(date);
    const statusMap = { [STATUS.PENDING]: '검토 중', [STATUS.APPROVED]: '승인됨', [STATUS.REJECTED]: '반려됨' };
    const statusCls = { [STATUS.PENDING]: 'hold', [STATUS.APPROVED]: 'done', [STATUS.REJECTED]: 'apply' };
    document.getElementById('flexModalBody').innerHTML = `<dl class="set_list work_dot_wrap"><dt>신청자</dt><dd><strong>${escapeHtml(entry.name)}</strong></dd><dt>신청일</dt><dd>${escapeHtml(entry.applyDate) || '-'}</dd><dt>변경 날짜</dt><dd>${dateStr}</dd><dt>기존 근무시간</dt><dd>${escapeHtml(entry.origTime) || '-'}</dd><dt>변경 근무시간</dt><dd><strong style="color:#f08c00">${escapeHtml(entry.time)}</strong></dd><dt>변경 기간</dt><dd>${entry.period ? `${escapeHtml(entry.period)} (${escapeHtml(entry.duration) || '1일'})` : `${dateStr} (1일)`}</dd><dt>사유</dt><dd><div class="reason_box">${escapeHtml(entry.reason) || '사유 없음'}</div></dd><dt>처리 상태</dt><dd class="ico_proj"><i class="${statusCls[entry.status]}">${statusMap[entry.status]}</i></dd></dl>`;
    const footer = document.getElementById('flexModalFooter');
    footer.innerHTML = entry.status === STATUS.PENDING ? `<button type="button" class="btn_red" data-action="flex-status" data-status="${STATUS.APPROVED}">승인</button><button type="button" class="btn_red_line" data-action="flex-status" data-status="${STATUS.REJECTED}">반려</button>` : `<button type="button" class="btn_gray_line" data-action="flex-status" data-status="${STATUS.PENDING}">되돌리기</button><button type="button" class="btn_red" data-action="flex-modal-close">확인</button>`;
  }

  flexModal?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]'); if (!btn) return;
    if (btn.dataset.action === 'flex-modal-close') { flexModal.close(); return; }
    if (btn.dataset.action === 'flex-status') { const { date, idx } = currentFlexEntry; Store.updateEntry(date, idx, { status: btn.dataset.status }); currentFlexEntry.entry = Store.getEntry(date, idx); renderFlexModal(); syncUI(); }
  });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 10. 그룹 팝오버 및 엑셀
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const popover = document.getElementById('popover'), popoverTitle = document.getElementById('popover-title'), popoverCount = document.getElementById('popover-count'), popoverMembers = document.getElementById('popover-members');

  function showGroupTooltip(e, groupId) {
    const g = GROUPS[groupId]; if (!g || !popover) return;
    popoverTitle.innerHTML = escapeHtml(g.time); popoverCount.textContent = `${g.members.length}명`;
    popoverMembers.innerHTML = g.members.length === 0 ? `<div class="empty_txt">이번 달 신청 내역 없음</div>` : `<ul class="lst_user">${g.members.map(m => `<li><div class="user_module"><figure class="user_photo"><img src="../../images/ic_user.png" alt=""></figure><em>${escapeHtml(m.name)}</em><b>(${escapeHtml(m.dept)})</b></div></li>`).join('')}</ul>`;
    const rect = e.target.closest('[data-group-id]').getBoundingClientRect();
    let left = rect.right + 10, top = rect.top + window.scrollY;
    if (left + popover.offsetWidth > window.innerWidth) left = rect.left - popover.offsetWidth - 10;
    popover.style.cssText = `display:block; left:${left}px; top:${top}px;`; popover.classList.add('active');
  }

  document.querySelector('.management_sidebar')?.addEventListener('click', (e) => { const trigger = e.target.closest('[data-group-id]'); if (trigger) showGroupTooltip(e, trigger.dataset.groupId); });
  document.getElementById('popover-close')?.addEventListener('click', () => { popover.style.display = 'none'; popover.classList.remove('active'); });
  document.addEventListener('click', (e) => { if (popover && !popover.contains(e.target) && !e.target.closest('[data-group-id]')) { popover.style.display = 'none'; popover.classList.remove('active'); } });

  const fileInput = document.getElementById('fileInput'), excelDates = new Set();
  document.getElementById('uploadBtn')?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', function () {
    if (!this.files.length) return;
    const file = this.files[0], reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result), workbook = XLSX.read(data, { type: 'array' }), sheet = workbook.Sheets[workbook.SheetNames[0]], rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        rows.slice(1).forEach(([dateRaw, name, code]) => {
          if (!dateRaw || !name || !code) return;
          let dateStr = typeof dateRaw === 'number' ? new Date(Math.round((dateRaw - 25569) * 86400 * 1000)).toISOString().split('T')[0] : String(dateRaw).trim();
          if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) { Store.addEntry(dateStr, { name: String(name).trim(), code: String(code).trim() }); excelDates.add(dateStr); }
        });
        syncUI(); alert(`"${file.name}" 업로드 완료!`);
      } catch (err) { alert('파일 파싱 실패: ' + err.message); }
    };
    reader.readAsArrayBuffer(file); this.value = '';
  });

  document.getElementById('downloadBtn')?.addEventListener('click', () => {
    const wb = XLSX.utils.book_new(), ws1 = XLSX.utils.aoa_to_sheet([['날짜 (YYYY-MM-DD)', '직원명', '근무코드', '비고'], ['2026-05-01', '홍길동', 'C62_4', '예시']]);
    XLSX.utils.book_append_sheet(wb, ws1, '근무표'); XLSX.writeFile(wb, '근무표_양식.xlsx');
  });

  renderRegularGroups(); renderCodeList(); updateFlexCount();
});