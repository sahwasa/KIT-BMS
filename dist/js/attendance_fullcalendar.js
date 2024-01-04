
  document.addEventListener('DOMContentLoaded', function () {
    var Draggable = FullCalendar.Calendar.Draggable;
    var calendarEl = document.getElementById('cal_attendance');
    var selectedDate = null;


    // initialize the external events
    // -----------------------------------------------------------------

    var containerEl = document.getElementById('exItem');
    // new Draggable(containerEl, {
    //   itemSelector: 'li',
    //   eventData: function (eventEl) {
    //     return {
    //       title: eventEl.innerText
    //     };
    //   }
    // });

    var source = // 일정데이터 
        [
          {//출근
            title: '[출근] 10:00',
            start: '2023-12-04T10:00:00',            
            className: 'arrived'
          },
          {//연차
            title: '[외출] 14:00~15:00',
            start: '2023-12-04T14:00:00',            
            end: '2023-12-04T15:00:00',            
            className: 'leaved'
          },
          {//퇴근
            title: '[퇴근] 19:30',
            start: '2023-12-04T19:00:00',            
            className: 'leaved'
          },
          {//지각
            title: '10:10',
            start: '2023-12-05T10:00:00',            
            className: 'late'
          },
          {//퇴근
            title: '19:10',
            start: '2023-12-05T19:00:00',            
            className: 'leaved'
          },
          {
            title: '출근',
            start: '2023-12-06T10:00:00',            
            className: 'arrived'
          },
          {
            title: '퇴근',
            start: '2023-12-06T19:00:00',            
            className: 'leaved'
          },
          {
            title: '출근',
            start: '2023-12-07T10:00:00',            
            className: 'arrived'
          },
          {
            title: '퇴근',
            start: '2023-12-07T19:00:00',            
            className: 'leaved'
          },
          {
            title: '출근',
            start: '2023-12-08T10:00:00',            
            className: 'arrived'
          },
          {
            title: '퇴근',
            start: '2023-12-08T19:00:00',            
            className: 'leaved'
          },          
          {
            title: '연차',
            start: '2023-12-11',
            end: '2023-12-13'
          },
          {
            title: '출근',
            start: '2023-12-14T10:00:00',            
            className: 'arrived'
          },
          {
            title: '퇴근',
            start: '2023-12-14T15:00:00',
            className: 'leaved'
          }];

    // initialize the calendar
    // -----------------------------------------------------------------

    var calendar = new FullCalendar.Calendar(calendarEl, {
      //googleCalendarApiKey : 'AIzaSyB1FBNsPJogNcSmEZLfLDi9rEALQoTLQ_c', //APIKEY 누구꺼쓰죠,,?
      headerToolbar: {
        left: 'prevYear,prev,next,nextYear today',
        center: 'title',
        // right: 'resourceTimelineDay'
      },
      buttonText: {
        today: '오늘',
        dayGridMonth: '달력',
        list: '목록',
      },
      schedulerLicenseKey: '0328483609-fcs-1693988989',         
      initialView: 'resourceTimelineDay',
      businessHours:  {
        daysOfWeek: [ 1,2,3,4,5 ], // 유연출퇴근 때문에 다른데,,,,?? 어떻게하죠??
        startTime: '10:00',
        endTime: '20:00'
      },
      weekNumbers: false,
      locale: 'en-GB',
      contentHeight: 'auto',
      resourceAreaWidth:'50px',
      resourceAreaColumns: [{headerContent:'일자'}],
      resources:[
        {id:'0125', title:'25 일'},
        {id:'0126', title:'26 월'},
        {id:'0127', title:'27 화'},
        {id:'0128', title:'28 수'},
        {id:'0129', title:'29 목'},
        {id:'0130', title:'30 금'},
        {id:'0131', title:'31 토'},
      ],
      dayMaxEvents: true, // allow "more" link when too many events
      eventDidMount: function (el) {
      },
      eventClassNames: function (info) {
        const classNames = info.event.classNames;
        if (classNames == 'holiday') {
          info.textColor = 'red';
        }
      },
      displayEventTime: false,
      eventSources:[source],
      dateClick: function (info) {
        selectedDate = info.date;
      },
      select: function(info) {
        selectedDate = info;
      },
      views: {
        resourceTimelineDay:{
          slotDuration: '00:30',
          slotLabelFormat:{hour:'2-digit', omitZeroMinute:true, hour12: false},
          slotMinWidth: 5
        }
      }
    });
    calendar.render();

    for (var i = 0; i < filterCheck.length; i++) {
      filterCheck[i].addEventListener('change', function (e) {
        const target = e.target;
        if (target.checked) {
          if (!addedSources.includes(target.id)) {
            let source = evtSource.filter(function (event) {
              return event.groupId.includes(target.id)
            });
            calendar.addEventSource(source);
            addedSources.push(target.id);
          }
        } else {
          let events = calendar.getEvents();
          events.forEach(function (event) {
            if (event.groupId.includes(target.id)) event.remove();
          })
          addedSources = addedSources.filter(function (groupId) {
            return groupId !== target.id; // Remove the groupId from addedSources array
          });
        }
      })
    }
  });
