var calendar;
var plan_data = // 일정데이터 
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
            title: '일정1',
            start: '2023-08-10',
            editable: false,
            className: 'businessHours'
          },
          {
            title: '일정1-1',
            start: '2023-08-10',
            editable: false,
            className: 'businessHours'
          },
          {
            title: '일정1-2',
            start: '2023-08-10T20:00:00',
            editable: false,
            className: 'businessHours'
          },
          {
            title: '일정2',
            start: '2023-08-11T20:00:00',
            editable: false,
            className: 'businessHours'
          },
          {
            title: '일정2-1',
            start: '2023-08-11',
            editable: false,
            className: 'businessHours'
          },
          {
            title: '일정2-2',
            start: '2023-08-11T20:00:00',
            editable: false,
            className: 'businessHours'
          },
          {
            title: 'Business Lunch',
            start: '2023-06-03T13:00:00',
            constraint: 'businessHours'
          },
          {
            title: '회의',
            start: '2023-06-19T11:00:00',
            constraint: 'availableForMeeting', // defined below
            color: '#257e4a',
            description: '1회의실'
          },
          {
            title: '월간공정보고 검토',
            start: '2023-06-18',
            end: '2023-06-20'
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
          {// 그룹 아이디가 같다면 해당 영역에만 들어올 수 있음(회의가능일자가 예시인데 쓸일이 있을까...?)
            //groupId: 'availableForMeeting',
            //start: '2023-06-19T10:00:00',
            //end: '2023-06-23T16:00:00',
            //display: 'background',
            //color: '#ff0000'
          }];
		  
function setCalendar() {
    // var Draggable = FullCalendar.Calendar.Draggable;
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
<<<<<<< HEAD
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
=======
    
>>>>>>> main

    // initialize the calendar
    // -----------------------------------------------------------------

<<<<<<< HEAD
    var calendar = new FullCalendar.Calendar(calendarEl, {
      // googleCalendarApiKey : 'AIzaSyB1FBNsPJogNcSmEZLfLDi9rEALQoTLQ_c', //APIKEY 누구꺼쓰죠,,?
=======
    calendar = new FullCalendar.Calendar(calendarEl, {
>>>>>>> main
      headerToolbar: {
        left: 'prevYear,prev,next,nextYear today',
        center: 'title',
        right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,list'
      },
      buttonText: {
        today: '오늘',
        multiMonthYear: '연간',
        dayGridMonth: '월간',
        timeGridWeek: '주간',
        timeGridDay: '일간',
        list: '목록',
      },
<<<<<<< HEAD
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
=======
      customButtons:{
        gcalSync : {
          text:'구글 동기화(예정)',
          click: function() {
            alert('구글동기화 하나요???');
          }
        }
      },
      schedulerLicenseKey: '0328483609-fcs-1693988989',
      editable: false,
>>>>>>> main
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
<<<<<<< HEAD
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
=======
      events: function(fetchInfo, successCallback, failureCallback) {
      				var start = fetchInfo.startStr;
                    var end = fetchInfo.endStr;
                    var empl_ids_arr = []
                    for (const empl of selected_empl_search) {
                        empl_ids_arr.push(empl.empl_id)
                    }
                    var tempString = JSON.stringify(empl_ids_arr);
                    var empl_ids = '{' + tempString.slice(1, -1) + '}';

                    var type_ids_arr = []
                    var type_checkbox = ["C21_1","C21_2","C21_3","C21_4","C37_20"]
                    for (const type of type_checkbox) {
                        if ($('#' + type).is(':checked')) {
                            type_ids_arr.push(type);
                        }
                    }
                    var javaString = JSON.stringify(type_ids_arr);
                    var type_ids = '{' + javaString.slice(1, -1) + '}';

                    var all_emp_dclz_yn = $('#all_ta_cal').is(':checked')?'Y':'N'
                    var prjct_ids="{}"
                    // $.ajax({
                    //     url: '/planner/baseData.do',
                    //     method: 'POST',
                    //     data: {
                    //         start: start.substring(0,10),
                    //         end: end.substring(0,10)
                    //     },
                    //     dataType: 'json',
                    //     success: function(data) {
                    //     	//휴일 및 전사일정
                    //         var events = data.map(function(item) {
                    //             return {
                    //                 start: item.start,
                    //                 title: item.title,
                    //                 className : item.classname
                    //             };
                    //         });
                    //         successCallback(events);
                    //     },
                    //     error: function() {
                    //         failureCallback();
                    //     }
                    // });
                    function getEndDate(str){
                        if(str.length===10){
                            var date = new Date(str);
                            date.setDate(date.getDate() + 1);
                            return date.toISOString().split('T')[0];
                        }
                        else
                            return str
                    }

                      function setTitle(title,id, name){
                          if(id===myId){
                              return title;
                          }
                          else
                              return title+'['+name+']'
                      }

                    $.ajax({
                        url: '/planner/getPannerData.do',
                        method: 'POST',
                        data: {
                            start: start.substring(0,10),
                            end: end.substring(0,10),
                            empl_ids : empl_ids,
                            type_ids : type_ids,
                            all_emp_dclz_yn : all_emp_dclz_yn,
                            prjct_ids : prjct_ids,
                        },
                        dataType: 'json',
                        success: function(data) {
                            //개인일정, 다른사원 근태일정
                            var events = data.map(function(item) {
                                if (item.work_hldy_se_cd != null) { // work_hldy_se_cd가 null이 아닌 경우에만 이벤트 추가
                                    return {
                                        start: item.start_dt,
                                        end: (item.allday_yn === 'Y' ? getEndDate(item.end_dt) : item.end_dt),
                                        title: item.issue_nm,
                                        className: (item.work_hldy_se_cd === '1' ? 'personal' : 'holyday-event'),
                                        display: (item.work_hldy_se_cd === '1' ? '' : 'background'),
                                        color: (item.work_hldy_se_cd === '1' ? '' : 'rgba(255, 0, 0, .25)'),
                                    };
                                }else if(item.work_hldy_se_nm=='연차'){
                                    if(item.allday_yn=='Y'){
                                        return {//연차인 경우
                                            start: item.start_dt.split(" ")[0],
                                            end: getEndDate(item.end_dt),
                                            title: '['+item.issue_nm+']'+item.empl_nm,
                                            color: '#673ab7'
                                        };
                                    }else{//반차인 경우
                                        return {
                                            start: item.start_dt.replace(" ","T"),
                                            end: item.end_dt.replace(" ","T"),
                                            title: '['+item.issue_nm+']'+item.empl_nm,
                                            color: '#673ab7'
                                        };
                                    }
                                }else{
                                    return {
                                        schdul_no:item.schdul_no,
                                        start: item.start_dt.replace(" ","T"),
                                        end: item.end_dt?.replace(" ","T"),
                                        title: setTitle(item.issue_nm,item.empl_id, item.empl_nm),
                                        color: '#257e4a'
                                    };
                                }
                            });
                            successCallback(events);
                        },
                        error: function() {
                            failureCallback();
                        }
                    });
                },
>>>>>>> main
      dateClick: function (info) {
        selectedDate = info.date;
      },
      select: function(info) {
        selectedDate = info;
      },
      eventClick: function(info) {
      	console.log('schdul_no : '+info.event.extendedProps.schdul_no)
      	console.log('title : '+info.event.title)
      	console.log('start : '+getDateTime(info.event.start))
      	console.log('end : '+getDateTime(info.event.end))
        //alert('Event: ' + info.event.title);
        //alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        //alert('View: ' + info.view.type);

        // change the border color just for fun
        //info.el.style.borderColor = 'red';
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
        }
      }
    });
    calendar.render();
    

    function addPlan() {
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

    var evtSource = [
      {
        title: '생일파티',
        start: '2023-08-29T20:00:00',
        groupId: 'my_plan',
        description : '설명'
      },
      {
        title: '저녁약속',
        start: '2023-08-29T20:00:00',
        groupId: 'my_plan'
      },
      {
        title: '팀1',
        start: '2023-08-30T13:00:00',
        groupId: 'team_plan p1'
      },
      {
        title: '팀2',
        start: '2023-08-30T20:00:00',
        groupId: 'team_plan'
      },
      {
        title: '다른팀 스케쥴',
        start: '2023-06-23',
        groupId: 'all_plan'
      }
    ];
    const filterCheck = document.querySelectorAll('.plan .lst_ctrl ul label');
    var addedSources = [];

    for (var i = 0; i < filterCheck.length; i++) {
      filterCheck[i].addEventListener('change', function (e) {
        const target = e.target;
        if (target.checked) {
          if (!addedSources.includes(target.id)) {
            let source = plan_data.filter(function (event) {
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
}
