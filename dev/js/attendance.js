
  document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var selectedDate = null;


    // initialize the external events
    // -----------------------------------------------------------------

    var source = // 일정데이터 
        [
          {
            title: '09:00 - 18:00(+1)',
            start: '2024-04-01T08:20:20',
            end: '2024-04-02T19:30:20',
            className:'regular',
            description:'근무완료'
          },
          {
            title: '18:00 - 19:30',
            start: '2024-04-01T18:00:00',
            end: '2024-04-01T19:30:30',
            className:'overtime',
            description:'연장근무'
          },
          {
            title: '외근(기상청)',
            start: '2024-04-02T09:00:00',
            end: '2024-04-02T18:00:00',
            className:'out',
            description:'외근'
          },
          {
            title: '결근',
            start: '2024-04-03T09:00:00',
            end: '2024-04-03T18:00:00',
            className:'truancy',
            description:'무단결근'
          },
          {
            title: '09:00 - ',
            start: '2024-04-04T08:20:20',
            className:'not_entered', //출근or퇴근미입력,
            description: '퇴근 미입력'
          },       
          {
            title: '09:40 - 18:00',
            start: '2024-04-05T09:40:20',
            start: '2024-04-05T18:40:20',
            className:'late',
            description:'지각'
          },       
          {
            title: '09:00 - 18:00',
            start: '2024-04-06T09:20:20',
            end: '2024-04-06T19:30:20',
            className:'holiday_work',
            description:'휴일근무'
          },
          {
            title: '연차',
            start: '2024-04-08T09:00:00',
            end: '2024-04-08T18:00:00',
            className:'off',
            description: '연차'
          },
          {
            title: '국회의원선거',
            start: '2024-04-09',
            className:'cal_holiday',
            description: '휴일'
          },
          {
            title: '반차 (09:00 - 12:00)',
            start: '2024-04-10T09:00:20',
            end: '2024-04-10T12:00:00',
            className:'off',
            description: '반차'
          },
          {
            title: '13:00 - 15:00',
            start: '2024-04-10T13:10:20',
            end: '2024-04-10T14:55:00',
            className:'late early',
            description: '지각, 조퇴'
          },
          {
            title: '반차(15:00 - 18:00)',
            start: '2024-04-10T15:00:00',
            end: '2024-04-10T18:00:00',
            className:'off',
            description: '반차'
          },
          {
            title: '출장(세종)',
            start: '2024-04-11T09:00:00',
            end: '2024-04-12T18:00:00',
            className:'out',//외근 or 출장
            description: '출장(세종)'
          },
          // {
          //   title: '09:00 - 1:20(+1)',
          //   start: '2024-04-15T09:00:00',
          //   end: '2024-04-16T01:20:00',
          //   className:'night',
          //   description: '철야'
          // },         
          {
            title: '10:00 - 15:20',
            start: '2024-04-16T10:00:00',
            end: '2024-04-16T15:20:00',
            className : 'early',
            description: '조퇴'
          },
          {
            title: '09:00 - 18:00',
            start: '2024-04-17T08:20:20',
            end: '2024-04-17T12:00:20',
            className:'regular',
            description:'근무완료'
          },
          {
            title: '13:00 - 15:00',
            start: '2024-04-17T13:00:20',
            end: '2024-04-17T15:00:20',
            className:'off',
            description:'반차'
          },
          {
            title: '15:00 - 18:00',
            start: '2024-04-17T14:55:20',
            end: '2024-04-17T18:05:20',
            className:'regular',
            description:'근무완료'
          },
           {
            title: '09:00 - 18:00',
            start: '2024-04-18T08:20:20',
            end: '2024-04-18T19:30:20',
            className:'regular',
            description:'근무완료'
          },
          {
            title: '09:00 -',
            start: '2024-04-19T08:55:23',
            className : 'on-duty',
            description: '근무중'
          },
          {
            title: '연차',
            start: '2024-04-22T09:00:00',
            end: '2024-04-24T18:00:00',
            className : 'off',
            description: '연차'
          },
          {
            title: '09:00-18:00',
            start: '2024-04-25T09:00:00',
            end: '2024-04-25T18:00:00',
            className : 'scheduled',
            description: '근무예정'
          },
          {
            title: '09:00-18:00',
            start: '2024-04-26T09:00:00',
            end: '2024-04-26T18:00:00',
            className : 'scheduled',
            description: '근무예정'
          },
          {
            title: '09:00-18:00',
            start: '2024-04-29T09:00:00',
            end: '2024-04-29T18:00:00',
            className : 'scheduled',
            description: '근무예정'
          },
          {
            title: '09:00-18:00',
            start: '2024-04-30T09:00:00',
            end: '2024-04-30T18:00:00',
            className : 'scheduled',
            description: '근무예정'
          }
        ];

    // initialize the calendar
    // -----------------------------------------------------------------

    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prevYear,prev,next,nextYear today',
        center: 'title',
        right: 'flexTime'
      },
      buttonText: {
        today: '오늘',
      },
      customButtons:{
        flexTime : {
          text:'유연근무 신청',
          click: function() {
            document.querySelector('.p_change_flexTime').showModal();
          }
        }
      },
      schedulerLicenseKey: '0328483609-fcs-1693988989',
      selectable:false,         
      initialView: 'dayGridMonth',
      businessHours:  {
        daysOfWeek: [ 1,2,3,4,5 ],      
      },
      weekNumbers: false,
      locale: 'ko',    
      dayMaxEvents: true, // allow "more" link when too many events    
      displayEventTime: false,
      dateClick: function(info) {
        let today = new(Date);
        let sTime = `${today.getHours()}:${today.getMinutes()}`;
        let eTime = `${today.getHours() + 1}:${today.getMinutes()}`;
        document.querySelector('.p_modify_attendance').showModal();
        document.getElementById('arrival').value = info.dateStr;
        // document.getElementById('departure').value = info.dateStr;
        document.getElementById('on_time').value = sTime;
        document.getElementById('off_time').value = eTime;
        // info.dayEl.style.backgroundColor = 'red';
      },
      eventSources:[source],
      eventContent: function(info) {
        let tit = info.event.title;        
        let type = info.event.classNames;
        let tmpl;
        if(type.includes('late') || type.includes('early')){
          let split = tit.split('-');
          let start = split[0];
          let end = split[1];
          if (type.includes('late') && type.includes('early')) {
            tit = `<b>${tit}</b>`;
          } else if (type == 'late') {
            tit = `<b>${end}</b> - ${end}`;
          } else {
            tit = `${start} - <b>${start}</b>`;
          }
        }
        tmpl = `<div class="fc-event-title" title="${info.event.extendedProps.description}">${tit}</div>`;
        return {
          html : tmpl
        }
      },
      eventClick: function(info) {
        let type = info.event.classNames;        
        if(type.includes('not_entered') || type.includes('truancy')){
          document.querySelector('.p_modify_attendance').showModal();
          console.log(info.event)
          let start = info.event.startStr.split('T');
          let sDate = start[0];
          let sTime = start[1].substring(0,5);
          document.getElementById('arrival').value = sDate;
          document.getElementById('on_time').value = sTime;
          document.getElementById('departure').value = sDate;
          document.getElementById('off_time').value = null;
          if(type.includes('truancy')){
            let end = info.event.endStr.split('T');
            let eDate = end[0];
            let eTime = end[1].substring(0,5);
            document.getElementById('departure').value = eDate;
            document.getElementById('off_time').value = eTime;
          }
        }
      }     
    });
    calendar.render();
  });
