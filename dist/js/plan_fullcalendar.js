
  document.addEventListener('DOMContentLoaded', function () {
    var Draggable = FullCalendar.Calendar.Draggable;
    var calendarEl = document.getElementById('calendar');
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

    (function getNowTime() {
      const date = new Date()
      nowTime = date.toISOString();
      nowYear = date.getFullYear();
      setTimeout(() => getNowTime, 1000);
    })();
    var source = // 일정데이터 
        [
          //기념일
          {
            title: '창립기념일',
            start: '1998-10-10',
            editable: false,
            overlap: false,
            className: 'anniv'
          },
          {
            title: '개천절',
            start: '2023-10-03',
            editable: false,
            overlap: false,
            className: 'holyday-event',
            display:'background'
          },
          {
            title: '광복절',
            start: '2023-08-15',
            editable: false,
            overlap: false,
            className: 'holyday-event'
          },
          {
            title: 'Business Lunch',
            start: '2023-06-03T13:00:00',
            constraint: 'businessHours'
          },
          {
            title: '회의',
            start: '2023-10-03T11:00:00',
            constraint: 'availableForMeeting', // defined below
            color: '#257e4a',
            description: '1회의실'
          },
          {
            title: '개인일정',
            start: '2023-08-22',
            end: '2023-08-25',
            className : 'personal'
          },
          {
            title: '생일파티1',
            start: '2023-06-29T20:00:00'
          },
          {
            title: '생일파티2',
            start: '2023-06-29T20:00:00'
          },
          {
            title: '생일파티3',
            start: '2023-06-29T20:00:00'
          },
          {
            title: '생일파티4',
            start: '2023-06-29T20:00:00'
          },
          {
            title: '[반차]김길동',
            start: '2023-09-01T09:00:00',
            end:'2023-09-01T10:00:00'
          },
          {
            title: '[연차]홍길동',
            start: '2023-09-01T20:00:00',
            end:'2023-09-02T20:00:00'
          },
          {
            title: '연차',
            start: '2023-09-01T20:00:00'
          },
          {
            title: '연차',
            start: '2023-09-01T20:00:00'
          },
          {
            title: '연차',
            start: '2023-09-01T20:00:00'
          },
          {
            title: '연차',
            start: '2023-09-01T20:00:00'
          },
          {
            title: '연차',
            start: '2023-09-01T20:00:00'
          },
          {
            title: '연차',
            start: '2023-09-01T20:00:00'
          },
          {
            title: '연차',
            start: '2023-09-01T20:00:00'
          },
          {
            title: '연차',
            start: '2023-09-01T20:00:00'
          },
          {// 그룹 아이디가 같다면 해당 영역에만 들어올 수 있음(회의가능일자가 예시인데 쓸일이 있을까...?)
            //groupId: 'availableForMeeting',
            //start: '2023-06-19T10:00:00',
            //end: '2023-06-23T16:00:00',
            //display: 'background',
            //color: '#ff0000'
          }];

    // initialize the calendar
    // -----------------------------------------------------------------

    var calendar = new FullCalendar.Calendar(calendarEl, {
      // googleCalendarApiKey : 'AIzaSyB1FBNsPJogNcSmEZLfLDi9rEALQoTLQ_c', //APIKEY 누구꺼쓰죠,,?
      headerToolbar: {
        left: 'prevYear,prev,next,nextYear today',
        center: 'title',
        right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listYear'
      },
      buttonText: {
        today: '오늘',
        multiMonthYear: '연간',
        dayGridMonth: '월간',
        timeGridWeek: '주간',
        timeGridDay: '일간',
        list: '목록',
      },
      // customButtons:{
      //   gcalSync : {
      //     text:'구글 동기화(예정)',
      //     click: function() {
      //       alert('구글동기화 하나요???');
      //     }
      //   }
      // },
      schedulerLicenseKey: '0328483609-fcs-1693988989',         
      editable: true,
      selectable: true,
      initialView: 'dayGridMonth',
      businessHours:  {
        daysOfWeek: [ 1,2,3,4,5 ], // 유연출퇴근 때문에 다른데,,,,?? 어떻게하죠??
        startTime: '08:00',
        endTime: '19:00'
      },
      weekNumbers: true,
      locale: 'ko',
      droppable: true, // this allows things to be dropped onto the calendar
      drop: function (info) {
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      },
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
      eventSources:[
        // {
        //     googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
        //     className: 'gcal-holiday',
        //     editable:false,
        //     overlap: false,// 일정이 들어올 수 없음(ex.휴가 등으로 쓰이면 좋을듯)
        //     display: 'background',
        //     color: 'rgba(255, 0, 0, .25)'
        //   },
          source],
      dateClick: function (info) {
        selectedDate = info.date;
      },
      select: function(info) {
        selectedDate = info;
      },
      eventClick: function(info) {
        alert('Event: ' + info.event.title);
        alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        alert('View: ' + info.view.type);

        // change the border color just for fun
        info.el.style.borderColor = 'red';
      },
      views: {
        multiMonthYear: {
          // multiMonthMaxColumns: 1
        },
        dayGrid: {// options apply to dayGridMonth, dayGridWeek, and dayGridDay views
        },
        timeGrid: {// options apply to timeGridWeek and timeGridDay views
          nowIndicator: true,
          now: nowTime
        },
        week: { // options apply to dayGridWeek and timeGridWeek views
        },
        day: { // options apply to dayGridDay and timeGridDay views
        },
        // list: {
        //   type: 'listYear',
        //   buttonText: 'List',
        //   visibleRange: {            
        //     start: `${nowYear}-01-01`,
        //     end: `${nowYear}-12-31`
        //   }
        // }
      }
    });
    calendar.render();

    // var addBtn = document.getElementById('addEvt');
    // addBtn.addEventListener('click', function (e) {
    //   var date = selectedDate;
    //   if (date == null) {
    //     var dateStr = prompt('일정을 추가할 날자를 YYYY-MM-DD 형식으로 입력해주세요.');
    //     date = new Date(dateStr + 'T00:00:00'); // will be in local time
    //   }
    //   if (!isNaN(date.valueOf()) || !(date.end == null)) { // valid?
    //     var start = date;
    //     var end;
    //     if(date.end){
    //       start = date.start;
    //       end = date.end;
    //     }
    //     calendar.addEvent({
    //       title: '동적 일정추가',
    //       start: start,
    //       end: end,
    //       allDay: true
    //     });
    //     alert('일정을 추가했습니다.');
    //   } else {
    //     alert('날자형식이 올바르지 않습니다.');
    //   }
    //   selectedDate = null;
    // });

    var evtSource = [
      {
        title: '생일파티',
        start: '2023-06-29T20:00:00',
        groupId: 'my_plan',
        description : '설명'
      },
      {
        title: '저녁약속',
        start: '2023-06-29T20:00:00',
        groupId: 'my_plan'
      },
      {
        title: '팀1',
        start: '2023-06-30T13:00:00',
        groupId: 'team_plan p1'
      },
      {
        title: '팀2',
        start: '2023-06-30T20:00:00',
        groupId: 'team_plan'
      },
      {
        title: '다른팀 스케쥴',
        start: '2023-06-23',
        groupId: 'all_plan'
      }
    ];
    const filterCheck = document.querySelectorAll('.plan .snb_lst ul label');
    var addedSources = [];

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
