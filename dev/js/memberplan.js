  var calendar;
  document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar-memberplan');
   

    // initialize the calendar
    // -----------------------------------------------------------------

    calendar = new FullCalendar.Calendar(calendarEl, {     
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
      },
      buttonText: {
        resourceTimelineDay:'일간',
        resourceTimelineWeek:'주간',
        resourceTimelineMonth:'월간'
      },
      editable: false,
      selectable: false,
      initialView: 'resourceTimelineDay',
      schedulerLicenseKey: '0328483609-fcs-1693988989',
      locale: 'ko',
      resourceAreaWidth:'8%',
      resourceAreaColumns: [{headerContent:'참여자'}],
      resources:[
        {id:'김OO',title:'김OO'},
        {id:'이OO',title:'이OO'},
        {id:'박OO',title:'박OO'},
        {id:'최O',title:'최OO'},
        {id:'윤OO',title:'윤OO'},
        {id:'구OO',title:'구OO'},
      ],
      events:[
        { id: 'e1', resourceId: '김OO', title:'아무튼 바쁨', start: '2023-09-07T09:00:00', end: '2023-09-07T12:00:00', className: 'cal_busy'},
        { id: 'e2', resourceId: '이OO', title:'출장', start: '2023-09-07T10:30:00', end: '2023-09-14T15:30:00', className: 'cal_absence'},
        { id: 'e3', resourceId: '박OO', title:'조기경보회의', start: '2023-09-07T12:00:00', end: '2023-09-07T13:00:00', className: 'cal_busy'}
      ],     
      slotMinTime:"08:00:00",
      slotMaxTime:"19:00:00",
      hiddenDays: [0, 6],//일,토 숨김     
      views:{
        resourceTimelineDay: {
          slotDuration: '00:30',
          slotLabelFormat: [{hour: 'numeric'}]
        },
        resourceTimelineWeek:{
          slotDuration: '04:00',
           slotLabelFormat: [
            { month:'numeric', day: 'numeric', weekday:'narrow' }, 
            { hour: 'numeric'}
           ]
        },
        resourceTimelineMonth:{
          slotLabelFormat: [
          { day: 'numeric', weekday:'narrow' }
          ]
        }
      }
    });
    calendar.render();

  });