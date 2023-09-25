  var calendar;
  document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('wbs');
   

    // initialize the calendar
    // -----------------------------------------------------------------

    calendar = new FullCalendar.Calendar(calendarEl, {     
      headerToolbar: {
        left: 'today prev,next',
        center: 'title',
        right: 'resourceTimelineWeek,resourceTimelineMonth,resourceTimelineYear fold,unfold'
      },
      buttonText: {
        today:'현재날자',
        resourceTimelineWeek:'주간',
        resourceTimelineMonth:'월간',
        resourceTimelineYear:'연간',
      },
      customButtons: {
        fold: {
          text: '전체 접기',
          click: function(resource, cellEls, bodyTds) {
            console.log(resource)
          }
        },
        unfold: {
          text: '전체 펼치기',
          click: function() {
            alert('clicked the custom button!');
          }
        }
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
          field: 'step',
          headerContent: '단계',
          width:'10%',
          cellClassNames:'alignC',
        },
        {
          field: 'title',
          headerContent: '요구사항'
        },
        {
          field: 'cop',
          headerContent: '담당자',
          width:'15%',
          cellClassNames:'alignC',
          cellContent:function(arg){return{html: `<i>${arg.fieldValue}</i>`}}
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
      resourcesInitiallyExpanded:true, //초기 모두 펴기
      // resourceGroupField: 'title',
      resources: [
        { id: 'a', step:'계획', title: '전자정부프레임워크 체계 전환 및 화면 개선', cop:['홍길동'],period:'3일',poc : '100%',
          children:[
            { id: 'a1', title: '개별시험', cop:['홍길동'],period:'3일',poc : '100%' },
            { id: 'a2', title: '통합시험', cop:'홍길동',period:'3일',poc : '20%' },
            { id: 'a3', title: '시험운영', cop:'홍길동',period:'3일',poc : '20%' },
          ]
         },
        { id: 'd', step:'준비', title: '지진가속도 계측자료에 대한 수신율 분석 및 기능개선', cop:'김피엘',
          children:[
            {id:'d1', title: '개별시험', cop:'김개발',period:'3일',poc : '20%' },
            {id:'d2', title: '통합시험', cop:'박피엠',period:'3일',poc : '20%' },
            {id:'d3', title: '시험운영', cop:'최운영',period:'3일',poc : '20%' }]
        },
        { id: 'g', step:'준비', title: '지진해일 피해예측 DB구축 및 표출기능 개선, 라이프라인 시설물 DB갱신', cop:'홍길동',period:'3일',poc : '20%',
          children:[
            { id: 'g1', title: '개별시헝', cop:'홍길동',period:'3일',poc : '20%' },
            { id: 'g2', title: '통합시험', cop:'홍길동',period:'3일',poc : '20%' },
            { id: 'g3', title: '시험운영', cop:'홍길동',period:'3일',poc : '20%' }
          ]        
        },
        { id: 'j', title: '사용자 교육', task: '사용자 교육 교재 작성', cop:'홍길동',period:'3일',poc : '20%',
         },
        {id: 'j1', title: '사용자 교육', cop:'홍길동',period:'3일',poc : '20%' },
        {id: 'j2', title: '사용자 매뉴얼 작성', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'm', title: '운영', task: '시스템 운영', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'n', title: '운영', task: '운영 문제점 보완', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'o', title: '운영', task: '유지관리 지침 작성', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'p', title: '준공', task: '준공계 제출', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'q', title: '준공', task: '준공검사', cop:'홍길동',period:'3일',poc : '20%' },
        { id: 'r', title: '단계별 보고', task: '월간, 중간 및 완료보고', cop:'홍길동',period:'3일',poc : '20%' }
      ],
      events:[
        { id: 'e1', resourceId: 'a', task:'아무튼 바쁨', title:'', start: '2023-09-07T09:00:00', end: '2023-09-07T12:00:00', className: 'cal_busy'},
        { id: 'e2', resourceIds: ['b'], task:'출장', start: '2023-09-07T10:30:00', end: '2023-09-14T15:30:00', className: 'cal_absence'},
        { id: 'e3', resourceId: 'c', task:'조기경보회의', start: '2023-09-07T12:00:00', end: '2023-09-07T13:00:00', className: 'cal_busy'}
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