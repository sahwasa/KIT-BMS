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
        {id:'A',title:'회의실A',event},
        {id:'B',title:'회의실B'},
        {id:'C',title:'회의실C'},
        {id:'D',title:'회의실D'},
        {id:'E',title:'회의실E'}
      ],
      events:[
        { id: 'e1', resourceId: 'A', title:'조기경보회의', start: '2023-09-15', end: '2023-09-15', className:'roomA'},
        { id: 'e2', resourceId: 'B', title:'업무관리시스템회의', start: '2023-09-15T13:00:00', end: '2023-09-15T14:30:00',className:'roomB'},
        { id: 'e3', resourceId: 'C', title:'개발자 면접', start: '2023-09-15T09:00:00', end: '2023-09-15T16:00:00',className:'roomC'},
        { id: 'e4', resourceId: 'D', title:'퍼블리셔 면접', start: '2023-09-15T09:00:00', end: '2023-09-15T16:00:00',className:'roomD'},
        { id: 'e5', resourceId: 'E', title:'인사총무 면접', start: '2023-09-15T09:00:00', end: '2023-09-15T16:00:00',className:'roomE'},
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
        dayHeaderFormat:{weekday:'narrow'}
        }, 
        resourceTimelineMonth:{
          slotLabelFormat: [
            { day: 'numeric', weekday:'narrow' }
          ]
        }
      }     
    });
    cal_roombook.render();
  });