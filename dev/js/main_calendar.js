
  document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('main_plan');
    var source = // 일정데이터 
        [ ];

    // initialize the calendar
    // -----------------------------------------------------------------

    var calendar = new FullCalendar.Calendar(calendarEl, {
      //googleCalendarApiKey : 'AIzaSyB1FBNsPJogNcSmEZLfLDi9rEALQoTLQ_c', //APIKEY 누구꺼쓰죠,,?
      headerToolbar: {
        left:'today',
        center: 'prevYear,prev,title,next,nextYear',
        right: null
      },
      buttonText: {
        today: '오늘'       
      },
      titleFormat: function(date){
        var date = date.date;
        return `${date.year}.${date.month + 1}`
      },       
      dayCellContent:function(date, cell){
        var date = date.date;
        return `${date.getDate()}`
      },
      schedulerLicenseKey: '0328483609-fcs-1693988989',         
      editable: false,
      selectable: true,
      initialView: 'dayGridMonth',   
      weekNumbers: false,
      weekNumberFormat:{week:'narrow'},
      locale: 'ko',
      dayMaxEvents: true, // allow "more" link when too many events
      displayEventTime: false,
      eventSources:[source],
    });
    calendar.render();
  });