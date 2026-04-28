
  var calendar;
  // var wbs_range = { start: '2022-10-01', end: '2023-11-30'};
  // var differenceInDays = (new Date(wbs_range.end).getTime() - new Date(wbs_range.start).getTime()) / (1000 * 3600 * 24);
  var monthlyEvents = [
    {
      resourceId: '150',
      start: '2026-04-01',
      end: '2026-04-01',
      extendedProps: {
        type: '외근(09~13)',
        time: '- / -'
      }
    },
    {
      resourceId: '150',
      start: '2026-04-02',
      end: '2026-04-02',
      className: 'cal_check',
      extendedProps: {
        type: '평일(09~18)',
        time: '<span class="t_red">+3분</span> / -'
      }
    },
    {
      resourceId: '150',
      start: '2026-04-03',
      end: '2026-04-03',
      className: 'cal_modified',      
      extendedProps: {
        type: '반차(13~19)',
        time: '- / <span class="t_red">-30분</span>'
      }
    },
    {
      resourceId: '150',
      start: '2026-04-04',
      end: '2026-04-04',
      extendedProps: {
        type: '휴일',
        time: '- / -'
      }
    },  
    {
      resourceId: '150',
      start: '2026-04-05',
      end: '2026-04-05',
      extendedProps: {
        type: '휴일',
        time: '- / -'
      }
    },
    {
      resourceId: '151',
      start: '2026-04-01',
      end: '2026-04-01',
      className: 'cal_delay',
      extendedProps: {
        type: '연차',
        time: '- / -'
      }
    },
    {
      resourceId: '151',
      start: '2026-04-02',
      end: '2026-04-02',
      className: 'cal_delay',
      extendedProps: {
        type: '평일(10~19)',
        time: '- / -'
      }
    },
    {
      resourceId: '151',
      start: '2026-04-03',
      end: '2026-04-03',
      className: 'cal_delay',
      extendedProps: {
        type: '출장',
        time: '- / -'
      }
    },
    {
      resourceId: '151',
      start: '2026-04-04',
      end: '2026-04-04',
      className: 'cal_delay',
      extendedProps: {
        type: '휴일근무(09~18)',
        time: '- / -'
      }
    },
    {
      resourceId: '151',
      start: '2026-04-05',
      end: '2026-04-05',
      className: 'cal_delay',
      extendedProps: {
        type: '휴일',
        time: '- / -'
      }
    },
  ];
  var yearlyEvents = [
    { resourceId: '150', start: '2026-01-01', extendedProps: { late: 0, early_leave: 0 } },
    { resourceId: '150', start: '2026-02-01', extendedProps: { late: 0, early_leave: 0 } },
    { resourceId: '150', start: '2026-03-01', extendedProps: { late: 0, early_leave: 0 } },
    { resourceId: '150', start: '2026-04-01', extendedProps: { late: 1, early_leave: 1 } },
    { resourceId: '151', start: '2026-01-01', extendedProps: { late: 0, early_leave: 0 } },
    { resourceId: '151', start: '2026-02-01', extendedProps: { late: 0, early_leave: 0 } },
    { resourceId: '151', start: '2026-03-01', extendedProps: { late: 0, early_leave: 0 } },
    { resourceId: '151', start: '2026-04-01', extendedProps: { late: 0, early_leave: 0 } },
  ];
  document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('hrAttendance');
   

    // initialize the calendar
    // -----------------------------------------------------------------

    calendar = new FullCalendar.Calendar(calendarEl, {     
      headerToolbar: {
        left: 'prevYear,prev,next,nextYear todayBtn',
        center: 'title',
        right: 'monthly,yearly'
      },     
      customButtons: {
        monthly: {
          text: '월간',
          click: function() {
            calendar.changeView('monthlyView');
            document.querySelector('.fc-todayBtn-button').textContent = '당월';
          }
        },
        yearly: {
          text: '연간',
          click: function() {
            calendar.changeView('yearlyView');
            document.querySelector('.fc-todayBtn-button').textContent = '당해';
          }
        },
        todayBtn: {
          text: '당월',
          click: function() {
            calendar.today();
          }
        },
      },
      fixedWeekCount: false,
      timeZone: 'local',
      editable: false,
      selectable: false,
      weekends : true,
      initialDate: new Date(),
      initialView: 'monthlyView',
      // schedulerLicenseKey: '0328483609-fcs-1693988989',
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      locale: 'ko',
      resourceAreaWidth:'420px',
      resourceAreaColumns: [            
        {
          field: 'employee_name',
          headerContent: '사원명',
          width:'60px',
          cellClassNames:'alignC',
          cellContent:function(arg){return{html: `<i>${arg.fieldValue}</i>`}}
        },
        {
          field: 'dept',
          headerContent: '부서',
          width:'80px',
          cellClassNames:'alignC'
        },
        {
          field: 'loc',
          headerContent: '근무지',
          width:'65px',
          cellClassNames:'alignC'
        },
        {
          field: 'attendance',
          headerContent: '지각/조퇴',
          width:'65px',
          cellClassNames:'alignC'
        },
      ],   
      resources: [
        {id:'150', employee_id:'150', employee_name:'꾸래핑',dept:'IT사업본부',loc : '본사', attendance : ' 1 / 1'},      
        {id:'151', employee_id:'151', employee_name:'바로핑',dept:'IT사업본부',loc : '본사', attendance : ' 0 / 0'},      
        {id:'152', employee_id:'152', employee_name:'하츄핑',dept:'IT사업본부',loc : '본사', attendance : ' 0 / 0'},      
        {id:'153', employee_id:'153', employee_name:'아자핑',dept:'IT사업본부',loc : '본사', attendance : ' 0 / 0'},      
        {id:'154', employee_id:'154', employee_name:'차차핑',dept:'IT사업본부',loc : '본사', attendance : ' 0 / 0'}
      ],
      nowIndicator: true,
      slotMinWidth: 90,
      eventMinWidth : 0,  
      events: monthlyEvents,
      datesSet: function(arg) {
        calendar.removeAllEvents();
        if (arg.view.type === 'yearlyView') {
          calendar.addEventSource(yearlyEvents);
        } else {
          calendar.addEventSource(monthlyEvents);
        }
      },
      eventContent: function(arg) {
        if (arg.view.type === 'yearlyView') {
          return {
            html: `${arg.event.extendedProps.late} / ${arg.event.extendedProps.early_leave}`
          };
        }
        return {
          html: `${arg.event.extendedProps.type}<br/>${arg.event.extendedProps.time}`
        };
      },      
      eventClick: function(info) {
        if (info.view.type === 'monthlyView') {
          let PopDaily = document.querySelector('.p_dailyAttendance');          
          PopDaily.showModal();
        } else if (info.view.type === 'yearlyView') {
          let PopMonthly = document.querySelector('.p_monthlyAttendance');          
          PopMonthly.showModal();
        }
      },
      datesSet: function(arg) {
        calendar.removeAllEvents();
        if (arg.view.type === 'yearlyView') {
          calendar.addEventSource(yearlyEvents);
        } else {
          calendar.addEventSource(monthlyEvents);
        }
      },
      views:{        
        monthlyView: {
          slotDuration:{day: 1 },
          slotLabelInterval:{day:1},
          slotLabelFormat: [
            // { month: 'long' },
            { day: 'numeric' }       // "1", "2", ... "31" 형태
          ],
          type: 'resourceTimeline',          
          duration : {month:1},
          slotLaneClassNames: function(arg) {
            if (!arg.date) return [];
            var day = arg.date.getDay(); // 0:일, 6:토
            if (day === 0) return ['fc-day-sun'];
            if (day === 6) return ['fc-day-sat'];
            return [];
          },
          slotLabelClassNames: function(arg) {
            if (!arg.date) return [];
            var day = arg.date.getDay();
            if (day === 0) return ['fc-day-sun'];
            if (day === 6) return ['fc-day-sat'];
            return [];
          },
        },
        yearlyView: {
          type: 'resourceTimeline',
          duration: { year: 1 },
          slotDuration: { month: 1 },
          slotLabelInterval: { month: 1 },
          slotLabelFormat: [
            // { year: 'numeric' },   // 상단: "2025년"
            { month: 'short' }     // 하단: "1월", "2월" ...
          ]        
        }
      }
    });
    calendar.render();

  });