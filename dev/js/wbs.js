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
      resourceAreaWidth:'20%',
      resourceAreaColumns: [
        {
          group: true,
          field: 'building',
          headerContent: '요구사항'
        },
        {
          field: 'title',
          headerContent: '업무'
        }
      ],
      resourceGroupField: 'building',
      resources: [
        { id: 'a', building: '전자정부프레임워크 체계 전환 및 화면 개선', title: '개별시험' },
        { id: 'b', building: '전자정부프레임워크 체계 전환 및 화면 개선', title: '통합시험' },
        { id: 'c', building: '전자정부프레임워크 체계 전환 및 화면 개선', title: '시험운영' },
        { id: 'd', building: '지진가속도 계측자료에 대한 수신율 분석 및 기능개선', title: '개별시험' },
        { id: 'e', building: '지진가속도 계측자료에 대한 수신율 분석 및 기능개선', title: '통합시험' },
        { id: 'f', building: '지진가속도 계측자료에 대한 수신율 분석 및 기능개선', title: '시험운영' },
        { id: 'g', building: '지진해일 피해예측 DB구축 및 표출기능 개선, 라이프라인 시설물 DB갱신', title: '개별시험' },
        { id: 'h', building: '지진해일 피해예측 DB구축 및 표출기능 개선, 라이프라인 시설물 DB갱신', title: '통합시험' },
        { id: 'i', building: '지진해일 피해예측 DB구축 및 표출기능 개선, 라이프라인 시설물 DB갱신', title: '시험운영' },
        { id: 'j', building: '사용자 교육', title: '사용자 교육 교재 작성' },
        { id: 'k', building: '사용자 교육', title: '사용자 교육' },
        { id: 'l', building: '사용자 교육', title: '사용자 매뉴얼 작성' },
        { id: 'm', building: '운영', title: '시스템 운영' },
        { id: 'n', building: '운영', title: '운영 문제점 보완' },
        { id: 'o', building: '운영', title: '유지관리 지침 작성' },
        { id: 'p', building: '준공', title: '준공계 제출' },
        { id: 'q', building: '준공', title: '준공검사' },
        { id: 'r', building: '단계별 보고', title: '월간, 중간 및 완료보고' }
      ],
      events:[
        { id: 'a', resourceId: 'a', title:'아무튼 바쁨', start: '2023-09-07T09:00:00', end: '2023-09-07T12:00:00', className: 'cal_busy'},
        { id: 'b', resourceId: 'b', title:'출장', start: '2023-09-07T10:30:00', end: '2023-09-14T15:30:00', className: 'cal_absence'},
        { id: 'c', resourceId: 'c', title:'조기경보회의', start: '2023-09-07T12:00:00', end: '2023-09-07T13:00:00', className: 'cal_busy'}
      ],     
      slotDuration: { days: 1 },
      nowIndicator: true,
      viewRender: function (info) {
        var firstDay = info.view.currentStart.getDay(); // Get the day of the week for the first day
        var isSundayStart = firstDay === 0; // Check if Sunday is the start of the week

        if (!isSundayStart) {
          // If Sunday is not the start of the week, remove .fc-day-sun class
          var sundayCells = document.querySelectorAll('.fc-day-sun');
          sundayCells.forEach(function (cell) {
            cell.classList.remove('fc-day-sun');
          });
        }
      },
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
            { week: 'narrow'},
          ]
        }
      }
    });
    calendar.render();

  });