
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
      setTimeout(() => getNowTime, 1000);
    })();
    var source = // 데이터
        [
          {
            title: '회의',
            start: '2023-06-21T11:00:00',
            color: '#257e4a',
            description: '2회의실',
            className: 'room2'
          },
          {
            title: '회의',
            start: '2023-06-22T11:00:00',
            color: '#05b4d9',
            description: '1회의실',
            className: 'room1'
          },
          {
            title: '월간공정보고 검토',
            start: '2023-06-28',
            end: '2023-06-30',
            color: '#05b4d9',
            description: '1회의실',
            className: 'room1'
          }];

    // initialize the calendar
    // -----------------------------------------------------------------

    var calendar = new FullCalendar.Calendar(calendarEl, {
      googleCalendarApiKey : 'AIzaSyB1FBNsPJogNcSmEZLfLDi9rEALQoTLQ_c', //APIKEY 누구꺼쓰죠,,?
      headerToolbar: {
        left: 'prevYear,prev,next,nextYear today',
        center: 'title',
        right: 'book timeGridWeek,timeGridDay'
      },
      buttonText: {
        today: '오늘',
        timeGridWeek: '주간',
        timeGridDay: '일간'
      },
      customButtons:{
        book : {
          text:'회의실 예약',
          click: function() {
            var date = selectedDate;
            if (date == null) {
              var dateStr = prompt('일정을 추가할 날자를 YYYY-MM-DD 형식으로 입력해주세요.');
              date = new Date(dateStr + 'T00:00:00'); // will be in local time
            }
            if (!isNaN(date.valueOf()) || !(date.end == null)) { // valid?
              var start = date;
              var end;
              if(date.end){
                start = date.start;
                end = date.end;
              }
              calendar.addEvent({
                title: '동적 일정추가',
                start: start,
                end: end,
                allDay: true
              });
              alert('일정을 추가했습니다.');
            } else {
              alert('날자형식이 올바르지 않습니다.');
            }
            selectedDate = null;
          }
        }
      },      
      editable: true,
      selectable: true,
      initialView: 'timeGridWeek',
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
      eventSources:[{
            googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
            className: 'gcal-holiday',
            editable:false,
            overlap: false,// 일정이 들어올 수 없음(ex.휴가 등으로 쓰이면 좋을듯)
            display: 'background',
            color: 'rgba(255, 0, 0, .25)'
          },
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
        timeGrid: {// options apply to timeGridWeek and timeGridDay views
          nowIndicator: true,
          now: nowTime
        },
        week: { // options apply to dayGridWeek and timeGridWeek views
        },
        day: { // options apply to dayGridDay and timeGridDay views
        }
      }
    });
    calendar.render();

  });
