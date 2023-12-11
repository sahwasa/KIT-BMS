
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
          {
            title: '출근',
            start: '2023-12-04T10:00:00',            
            className: 'arrived'
          },
          {
            title: '퇴근',
            start: '2023-12-04T19:00:00',            
            className: 'leaved'
          },
          {
            title: '출근',
            start: '2023-12-05T10:00:00',            
            className: 'arrived'
          },
          {
            title: '퇴근',
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
        right: 'dayGridMonth,listYear'
      },
      buttonText: {
        today: '오늘',
        dayGridMonth: '달력',
        list: '목록',
      },
      schedulerLicenseKey: '0328483609-fcs-1693988989',         
      editable: true,
      selectable: true,
      initialView: 'dayGridMonth',
      businessHours:  {
        daysOfWeek: [ 1,2,3,4,5 ], // 유연출퇴근 때문에 다른데,,,,?? 어떻게하죠??
        startTime: '08:00',
        endTime: '19:00'
      },
      weekNumbers: false,
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
      eventSources:[source],
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
        list: {
        }
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
        start: '2023-12-29T20:00:00',
        groupId: 'my_plan',
        description : '설명'
      },
      {
        title: '저녁약속',
        start: '2023-12-29T20:00:00',
        groupId: 'my_plan'
      },
      {
        title: '팀1',
        start: '2023-12-30T13:00:00',
        groupId: 'team_plan p1'
      },
      {
        title: '팀2',
        start: '2023-12-30T20:00:00',
        groupId: 'team_plan'
      },
      {
        title: '다른팀 스케쥴',
        start: '2023-12-23',
        groupId: 'all_plan'
      }
    ];
    // const filterCheck = document.querySelectorAll('.plan .snb_lst ul label');
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
