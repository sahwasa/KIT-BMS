function showMessage(content, type) {
    if (type == null) {
        // 일반 메시지
    } else {
        const functionToCall = `showMassage_${type}`;
        if (typeof window[functionToCall] === 'function') {
            window[functionToCall](content);
        } else {
            console.log('존재하지 않는 함수')
        }
    }
}

function showMassage_DM1(content, type){
  $("main").addClass("damn");
  var dialogsEl = document.getElementById("dialogs");
  var tmpl = `<dialog id="#_type1">
              <form method="dialog">
                <div class="p_header">
                  <strong>${type}</strong>
                  <button class="btnClose ico_org cancel" aria-label="close" onclick="hideMassage_DM1();">닫기</button>
                </div>
                <div class="p_body">
                  <div class="approval_often">
                  </div>
                  <p>${content}</p>      
                  <div class="btn_wrap">
                    <button class="btn_gray_line" onclick="hideMassage_DM1();">닫기</button>
                  </div>
                </div>
              </form>
            </dialog>`;
            dialogsEl.innerHTML = tmpl;
  $('#p_type2')[0].showModal();
}
let showMessageVars = {};
function showMassage_DM2(content){
    content = content.replaceAll('\\n','<br>')
    var dialogsElement = document.getElementById("dialogs");
    var htmlString = `
                            <dialog id="p_type2">
                            <div class="type2">
                              ${content}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display:none;">
                              <defs>
                                <filter id="squiggly-0">
                                  <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="0"/>
                                  <feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="6" />
                                </filter>
                                <filter id="squiggly-1">
                                  <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="1"/>
                                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
                                </filter>
                                <filter id="squiggly-2">
                                  <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2"/>
                                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
                                </filter>
                                <filter id="squiggly-3">
                                  <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="3"/>
                                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
                                </filter>
                                <filter id="squiggly-4">
                                  <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="4"/>
                                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
                                </filter>
                              </defs> 
                            </svg>                            
                            </dialog>
                            `;
    dialogsElement.innerHTML = htmlString;
    document.body.style.overflow = 'hidden';

    var navElement = document.getElementById('nav');
    var headerElements = document.querySelectorAll('.header');
    showMessageVars.rotationSpeed = 1;
    showMessageVars.isConstantSpeed = false;

    function rotateElement() {
        if (!showMessageVars.isConstantSpeed && showMessageVars.rotationSpeed >= 360*5) {
            showMessageVars.isConstantSpeed = true;
        }

        if (showMessageVars.isConstantSpeed) {
            showMessageVars.rotationSpeed += 20;
            showMessageVars.rotationSpeed = showMessageVars.rotationSpeed % 360
        } else {
            showMessageVars.rotationSpeed *= 1.01;
            showMessageVars.rotationSpeed = parseFloat(showMessageVars.rotationSpeed.toFixed(2))
        }

        navElement.style.transform = `rotate(${showMessageVars.rotationSpeed}deg)`;
        headerElements[0].style.transform = `rotate(${showMessageVars.rotationSpeed}deg)`;

        if(showMessageVars.rotationSpeed==0)
            return;
        requestAnimationFrame(rotateElement);
    }

    //실행코드
    $('#p_type2')[0].showModal();
    showMessageVars.rotationSpeed = 1
    showMessageVars.isConstantSpeed = false
    rotateElement()
}
function showMassage_DM3(content){
    var dialogsElement = document.getElementById("dialogs");
    content = content.replaceAll('\\n','\\a')
// HTML 문자열을 생성합니다.
    var htmlString = `
                      <dialog id="p_type3">
                      <div class="type3_body">
                          <div class="type3">
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                            <div class="layer"><span>${content}</span></div>
                          </div>
                      </div>                           
                      <script>window.setTimeout = null;</script>
                      </dialog>
                      `;

    dialogsElement.innerHTML = htmlString;

    //실행코드
    $('#p_type3')[0].showModal();
}
function showMassage_DM4(content){
    var dialogsElement = document.getElementById("dialogs");

    var htmlString = `
                      <dialog id="p_type4">
                          <div class="type4_body">
                            <div class="type4">
                              <span id="type4">${content}</span>
                            </div>
                          </div>                               
                      </dialog>
                      `;

    // HTML을 추가
    dialogsElement.innerHTML = htmlString;

    //실행코드
    $('#p_type4')[0].showModal();
    $('#type4').html(function(i, html) {
        var chars = $.trim(html).split("");
        var temp = '<span>' + chars.join('</span><span>') + '</span>'
        return temp.replaceAll('<span>/</span><span>n</span>','<br>');
    });
}
function showMassage_DM5(content, type){
  var dialogsEl = document.getElementById("dialogs");
  var tmpl = `<div class="snow_wrap">
                <div class="snow"></div>
                <dialog id="p_type5">
                  <form method="dialog">
                    <button class="cancel" aria-label="close" onclick="hideMassage_DM5();">닫기</button>
                    <p>${content}</p>      
                  </form>
                </dialog>
              </div>`;
            dialogsEl.innerHTML = tmpl;
  $('#p_type5')[0].showModal();
}

function hideMessage(type){
    const functionToCall = `hideMassage_${type}`;
    if (typeof this[functionToCall] === 'function') {
        this[functionToCall](content);
    } else {
        console.log('존재하지 않는 함수')
    }

}

function hideMassage_DM1(content){
    $(".damn").removeClass("damn");
    $('#p_type1').remove();
}
function hideMassage_DM2(content){
    $('#p_type2')[0].remove();
    showMessageVars.rotationSpeed = 0
    document.body.style.overflow
}
function hideMassage_DM3(content){
    $('#p_type3').remove();
}
function hideMassage_DM4(content){
    $('#p_type4').remove();
}
function hideMassage_DM5(content){
    $('.snow_wrap').remove();
}