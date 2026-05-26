
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
      selectable: false,
      dateClick: function(info) {
        var allDate = document.querySelectorAll('.fc .fc-day');
        allDate.forEach(function(el){
          el.classList.remove('selected');
        })
        info.dayEl.classList.add('selected');
        console.log(info.dateStr)
      },     
      datesSet: function(info) {    
        document.querySelector('.fc .fc-day.fc-day-today').classList.add('selected');
      },
      initialView: 'dayGridMonth',   
      weekNumbers: false,
      weekNumberFormat:{week:'narrow'},
      locale: 'ko',
      dayMaxEvents: true, // allow "more" link when too many events
      displayEventTime: false,
      eventSources:[source]
    });
    calendar.render();

    // 출근 알림 샘플 (퍼블리싱용 시뮬레이션)
    setTimeout(() => {
      const attendanceSection = document.querySelector('.attendance_desc ul li:first-child');
      if (attendanceSection && attendanceSection.textContent.includes('미등록')) {
        UI.toast('금일 출근 기록이 없습니다. 출근 버튼을 눌러주세요!');
      } else {
        // 샘플 확인을 위해 강제로 띄우는 코드 (실제 운영 시에는 위 조건문만 사용)
        // UI.toast('금일 출근 기록이 없습니다. 출근 버튼을 눌러주세요!');
      }
    }, 1000);
  });