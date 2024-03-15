  var calendar;
  var wbs_range = { start: '2022-10-01', end: '2023-11-30'};
  var differenceInDays = (new Date(wbs_range.end).getTime() - new Date(wbs_range.start).getTime()) / (1000 * 3600 * 24);
  document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('wbs');
   

    // initialize the calendar
    // -----------------------------------------------------------------

    calendar = new FullCalendar.Calendar(calendarEl, {     
      headerToolbar: {
        left:'',// 'prev,next',
        center: 'title',
        right: 'fold unfold'
      },     
      customButtons: {
        fold: {
          text: '요구사항',
          click: function(resource, cellEls, bodyTds) {
            $('.fc-icon-minus-square').trigger('click');
          }
        },
        unfold: {
          text: '전체 작업',
          click: function() {
            $('.fc-icon-plus-square').trigger('click');
          }
        }
      },
      titleFormat: function(date){
        var start =  new Date(wbs_range.start);
        var end =  new Date(wbs_range.end);
        return `${start.getFullYear()}년 ${start.getMonth()}월 ${start.getDate()}일 - ${end.getFullYear()}년 ${end.getMonth()}월 ${end.getDate()}일 `
      },   
      validRange: wbs_range,
      fixedWeekCount: false,
      timeZone: 'local',
      editable: false,
      selectable: false,
      weekends : true,
      initialDate: wbs_range.start,
      initialView: 'custumRange',
      schedulerLicenseKey: '0328483609-fcs-1693988989',
      locale: 'ko',
      resourceAreaWidth:'40%',
      resourceAreaColumns: [
        {
          group: true,
          field: 'step',
          headerContent: '단계',
          width:'56px',
          cellClassNames:'alignC wbs_step',
        },
        {
          field: 'title',
          headerContent: '요구사항 및 하위업무'
        },
        {
          field: 'cop',
          headerContent: '담당자',
          width:'70px',
          cellClassNames:'alignC',
          cellContent:function(arg){return{html: `<i>${arg.fieldValue}</i>`}}
        },
        {
          field: 'period',
          headerContent: '기간',
          width:'57px',
          cellClassNames:'alignC'
        },
        {
          field: 'poc',
          headerContent: '진행률',
          width:'57px',
          cellClassNames:'alignR'
        },
      ],
      resourcesInitiallyExpanded:true, //초기 모두 펴기
      // resourceGroupField: 'title',
      resources: [
        { id: 'a', step:'계획', title: '전자정부프레임워크 체계 전환 및 화면 개선', cop:['홍길동'],period:'100일',poc : '100%',
          children:[
            { id: 'a1', title: '개별시험', cop:['홍길동씨'],period:'3일',poc : '100%' },
            { id: 'a2', title: '통합시험', cop:'홍길동',period:'3일',poc : '20%' },
            { id: 'a3', title: '시험운영', cop:'홍길동',period:'3일',poc : '20%' },
          ]
         },
        { id: 'a', step:'계획', title: '전자정부프레임워크 체계 전환 및 화면 개선', cop:['홍길동'],period:'100일',poc : '100%',
          children:[
            { id: 'a1', title: '개별시험', cop:['홍길동씨'],period:'3일',poc : '100%' },
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
        { id: 'g', step:'시험,운영', title: '지진해일 피해예측 DB구축 및 표출기능 개선, 라이프라인 시설물 DB갱신', cop:'홍길동',period:'3일',poc : '20%',
          children:[
            { id: 'g1', title: '개별시헝', cop:'홍길동',period:'3일',poc : '20%' },
            { id: 'g2', title: '통합시험', cop:'홍길동',period:'3일',poc : '20%' },
            { id: 'g3', title: '시험운영', cop:'홍길동',period:'3일',poc : '20%' }
          ]        
        }
      ],
      events:[
        { id: 'e1', resourceId: 'a', task:'아무튼 바쁨', title:'', start: '2022-09-07T09:00:00', end: '2024-01-07T12:00:00', className: 'cal_delay'},
        { id: 'd1', resourceIds: ['d'], task:'출장', start: '2022-09-07T10:30:00', end: '2023-10-14T15:30:00', className: 'cal_absence'},
        { id: 'g1', resourceId: 'g', task:'조기경보회의', start: '2022-09-07T12:00:00', end: '2023-09-07T13:00:00', className: 'cal_busy'}
      ],     
      nowIndicator: true,
      slotMinWidth: 10,
      views:{        
        custumRange: {
          slotDuration:{day: 1 },
          slotLabelInterval:{week:1},
          slotLabelFormat: [
            { year: 'numeric'},
            { month: 'numeric'},
            { week: 'narrow'}
          ],         
          type: 'resourceTimeline',
          duration: { week: Math.round(differenceInDays/7+2) }
        }
      }
    });
    calendar.render();

  });