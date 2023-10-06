  let cal_roombook;

  document.addEventListener('DOMContentLoaded', function () {
    let cal_roombookEl = document.getElementById('cal-roombook');   

    // initialize the calendar
    // -----------------------------------------------------------------

    cal_roombook = new FullCalendar.Calendar(cal_roombookEl, {     
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimeGridWeek,resourceTimelineMonth'
      },
      buttonText: {
        resourceTimelineDay:'일간',
        resourceTimeGridWeek:'주간',
        resourceTimelineMonth:'월간'
      },
      editable: false,
      selectable: false,
      initialView: 'resourceTimelineDay',
      schedulerLicenseKey: '0328483609-fcs-1693988989',
      locale: 'ko',
      resourceAreaWidth:'100px',
      resourceAreaColumns: [{headerContent:'참여자'}],
      resources:[
        {id:'A',title:'회의실A',eventClassNames:'roomA'},
        {id:'B',title:'회의실B',eventClassNames:'roomB'},
        {id:'C',title:'회의실C',eventClassNames:'roomC'},
        {id:'D',title:'회의실D',eventClassNames:'roomD'},
        {id:'E',title:'회의실E',eventClassNames:'roomE'}
      ],
      events:[
        { id: 'e1', resourceId: 'A', title:'조기경보회의', start: '2023-09-18', end: '2023-09-18'},
        { id: 'e2', resourceId: 'B', title:'업무관리시스템회의', start: '2023-09-18T13:00:00', end: '2023-09-18T14:30:00'},
        { id: 'e3', resourceId: 'C', title:'개발자 면접', start: '2023-09-18T09:00:00', end: '2023-09-18T16:00:00'},
        { id: 'e4', resourceId: 'D', title:'퍼블리셔 면접', start: '2023-09-18T09:00:00', end: '2023-09-18T16:00:00'},
        { id: 'e5', resourceId: 'E', title:'인사총무 면접', start: '2023-09-18T09:00:00', end: '2023-09-18T16:00:00'},
      ],      
      businessHours: {
        dow: [1, 2, 3, 4, 5], // Monday - Friday
        start: '08:00',      // Start time for business hours (AM)
        end: '07:00'         // End time for business hours (PM)
      },   
      slotMinTime:"08:00:00",
      slotMaxTime:"19:00:00",     
      hiddenDays: [0, 6],//일,토 숨김
      nowIndicator : true,
      views:{
        resourceTimelineDay: {
          slotDuration: '00:30',
          slotLabelFormat: [{hour: 'numeric'}]
        },
        resourceTimeGridWeek:{
          dayHeaderFormat:{weekday:'narrow'},
          eventContent: function(arg) {
            return {
              html: `<div class="fc-event-title" title="${arg.event.title}">${arg.event.title}</div>`
            }
          }
        }, 
        resourceTimelineMonth:{
          slotLabelFormat: [{ day: 'numeric', weekday:'narrow' }],
          eventContent: function(arg) {
            return {
              html: `<div class="fc-event-time" title="${arg.event.title}">${arg.event.title}</div>`
            }
          }
        }
      }     
    });
    cal_roombook.render();
  });