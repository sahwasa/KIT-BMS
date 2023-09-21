  var calendar;
  document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('wbs');
   

    // initialize the calendar
    // -----------------------------------------------------------------

    calendar = new FullCalendar.Calendar(calendarEl, {     
      headerToolbar: {
        left: 'today prev,next',
        center: 'title',
        right: 'resourceTimelineWeek,resourceTimelineMonth,resourceTimelineYear'
      },
      buttonText: {
        today:'현재날자',
        resourceTimelineWeek:'주간',
        resourceTimelineMonth:'월간',
        resourceTimelineYear:'연간',
      },
      timeZone: 'local',
      editable: false,
      selectable: false,
      weekends : true,
      initialView: 'resourceTimelineYear',
      schedulerLicenseKey: '0328483609-fcs-1693988989',
      locale: 'ko',
      resourceAreaWidth:'40%',
      resourceAreaColumns: [
        {
          group: true,
          field: 'require',
          headerContent: '요구사항'
        },
        {
          field: 'task',
          headerContent: '업무'
        },
        {
          field: 'cop',
          headerContent: '담당자',
          width:'15%',
          cellClassNames:'alignC'
        },
        {
          field: 'period',
          headerContent: '기간',
          width:'10%',
          cellClassNames:'alignC'
        },
        {
          field: 'poc',
          headerContent: '진행률',
          width:'10%',
          cellClassNames:'alignR'
        },
      ],
      resourceGroupField: 'require',
      resources: [
        { id: 'a', require: '전자정부프레임워크 체계 전환 및 화면 개선', task: '개별시험', cop:'홍길동 외 1인',period:'3일',poc : '100%' },
        { id: 'b', require: '전자정부프레임워크 체계 전환 및 화면 개선', task: '통합시험', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'c', require: '전자정부프레임워크 체계 전환 및 화면 개선', task: '시험운영', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'd', require: '지진가속도 계측자료에 대한 수신율 분석 및 기능개선', task: '개별시험', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'e', require: '지진가속도 계측자료에 대한 수신율 분석 및 기능개선', task: '통합시험', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'f', require: '지진가속도 계측자료에 대한 수신율 분석 및 기능개선', task: '시험운영', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'g', require: '지진해일 피해예측 DB구축 및 표출기능 개선, 라이프라인 시설물 DB갱신', task: '개별시험', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'h', require: '지진해일 피해예측 DB구축 및 표출기능 개선, 라이프라인 시설물 DB갱신', task: '통합시험', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'i', require: '지진해일 피해예측 DB구축 및 표출기능 개선, 라이프라인 시설물 DB갱신', task: '시험운영', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'j', require: '사용자 교육', task: '사용자 교육 교재 작성', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'k', require: '사용자 교육', task: '사용자 교육', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'l', require: '사용자 교육', task: '사용자 매뉴얼 작성', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'm', require: '운영', task: '시스템 운영', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'n', require: '운영', task: '운영 문제점 보완', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'o', require: '운영', task: '유지관리 지침 작성', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'p', require: '준공', task: '준공계 제출', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'q', require: '준공', task: '준공검사', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'r', require: '단계별 보고', task: '월간, 중간 및 완료보고', cop:'홍길동',period:'3일',poc : '20%' }
      ],
      events:[
        { id: 'a', resourceId: 'a', task:'아무튼 바쁨', start: '2023-09-07T09:00:00', end: '2023-09-07T12:00:00', className: 'cal_busy'},
        { id: 'b', resourceId: 'b', task:'출장', start: '2023-09-07T10:30:00', end: '2023-09-14T15:30:00', className: 'cal_absence'},
        { id: 'c', resourceId: 'c', task:'조기경보회의', start: '2023-09-07T12:00:00', end: '2023-09-07T13:00:00', className: 'cal_busy'}
      ],     
      nowIndicator: true,
      slotDuration: { days: 1 },      
      views:{
        resourceTimelineWeek:{
          slotLabelFormat: [
            { day: 'numeric' }
          ]
        },
        resourceTimelineMonth:{
          slotLabelFormat: [
            { week: 'narrow'}, 
            { day: 'numeric' }
          ]
        },
        resourceTimelineYear:{
          slotDuration: { week: 1 },
          slotLabelFormat: [
            { month: 'numeric'},
            { week: 'numeric'},
          ]
        }
      }
    });
    calendar.render();

  });