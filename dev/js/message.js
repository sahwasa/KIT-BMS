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
  var tmpl = `<dialog class="#p_type1">
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
                            <style>
                            @keyframes squiggly-anim {
                              0% {
                                filter: url('#squiggly-0');
                              }
                              25% {
                                filter: url('#squiggly-1');
                              }
                              50% {
                                filter: url('#squiggly-2');
                              }
                              75% {
                                filter: url('#squiggly-3');
                              }
                              100% {
                                filter: url('#squiggly-4');
                              }
                            }
                            
                            .type2 {
                              font-family: "NanumGothic";
                              font-size: 100px;
                              line-height: 100vh;
                              background: #111;
                              color: white;
                              animation: squiggly-anim 0.34s linear infinite;
                              display: inline-block;
                              vertical-align: middle;
                              width: 100%;
                              outline: none;
                              text-align: center;
                              line-height: 1;
                              overflow: hidden;
                            }
                            
                            .small {
                              font-size: 0.5em;
                            }
                            
                            .smaller {
                              font-size: 0.4em;
                            }
                            
                            p {
                              margin: 0;
                            }
                            </style>
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
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                  <div class="layer"></div>
                                </div>
                            </div>
                            <style>
                              * *, *::before, *::after { 
                                animation-play-state: running !important;
                              }
                              .type3_body{
                              min-height: 450px;
                              width: 800px;
                              margin: 0;
                              background: radial-gradient(circle, #0077ea, #1f4f96, #1b2949, #000);
                            }
                            
                            .type3 {
                              height: 300px;
                              width: 500px;
                              margin: auto;
                              position: absolute;
                              top: 0;
                              right: 0;
                              bottom: 0;
                              left: 0;
                              perspective: 9999px;
                              transform-style: preserve-3d;
                            }
                            
                            .layer {
                              width: 100%;
                              height: 100%;
                              position: absolute;
                              transform-style: preserve-3d;
                              animation: type3 5s infinite alternate ease-in-out -7.5s;
                              animation-fill-mode: forwards;
                              transform: rotateY(40deg) rotateX(33deg) translateZ(0);
                            }
                            
                            .layer:after {
                              font: 100px/0.65 "NanumGothic";
                              content: "${content}";
                              white-space: pre;
                              text-align: center;
                              height: 100%;
                              width: 100%;
                              position: absolute;
                              top: 50px;
                              color: whitesmoke;
                              letter-spacing: -2px;
                              text-shadow: 4px 0 10px rgba(0, 0, 0, 0.13);
                              line-height: 1;
                            }
                            
                            .layer:nth-child(1):after { transform: translateZ(0px); } .layer:nth-child(2):after { transform: translateZ(-1.5px); } .layer:nth-child(3):after { transform: translateZ(-3px); } .layer:nth-child(4):after { transform: translateZ(-4.5px); } .layer:nth-child(5):after { transform: translateZ(-6px); } .layer:nth-child(6):after { transform: translateZ(-7.5px); } .layer:nth-child(7):after { transform: translateZ(-9px); } .layer:nth-child(8):after { transform: translateZ(-10.5px); } .layer:nth-child(9):after { transform: translateZ(-12px); } .layer:nth-child(10):after { transform: translateZ(-13.5px); } .layer:nth-child(11):after { transform: translateZ(-15px); } .layer:nth-child(12):after { transform: translateZ(-16.5px); } .layer:nth-child(13):after { transform: translateZ(-18px); } .layer:nth-child(14):after { transform: translateZ(-19.5px); } .layer:nth-child(15):after { transform: translateZ(-21px); } .layer:nth-child(16):after { transform: translateZ(-22.5px); } .layer:nth-child(17):after { transform: translateZ(-24px); } .layer:nth-child(18):after { transform: translateZ(-25.5px); } .layer:nth-child(19):after { transform: translateZ(-27px); } .layer:nth-child(20):after { transform: translateZ(-28.5px); } .layer:nth-child(n+10):after { -webkit-text-stroke: 3px rgba(0, 0, 0, 0.25); } .layer:nth-child(n+11):after { -webkit-text-stroke: 15px dodgerblue; text-shadow: 6px 0 6px #00366b, 5px 5px 5px #002951, 0 6px 6px #00366b; } .layer:nth-child(n+12):after { -webkit-text-stroke: 15px #0077ea; } .layer:last-child:after { -webkit-text-stroke: 17px rgba(0, 0, 0, 0.1); } .layer:first-child:after { color: #fff; text-shadow: none; }
                            
                            @keyframes type3 {
                              100% {
                                transform: rotateY(-40deg) rotateX(-43deg);
                              }
                            }
                            </style>
                            <script>window.setTimeout = null;</script>
                            </dialog>
                            `;

    dialogsElement.innerHTML = htmlString;

    //실행코드
    $('#p_type3')[0].showModal();
}
function showMassage_DM4(content){
    // id가 "dialogs"인 요소를 가져옵니다.
    var dialogsElement = document.getElementById("dialogs");

// HTML 문자열을 생성합니다.
    var htmlString = `
                            <dialog id="p_type4">
                                <div class="type4_body">
                                  <div class="type4">
                                    <span id="type4">${content}</span>
                                  </div>
                                </div>
                                <style>
                                .type4_body {
                              background-color: #1a1a1a;
                              width: 500px;
                              height: 500px;
                            }
                            
                            .type4 {
                              top: 50%;
                              left: 50%;
                              width: 100%;
                              text-transform: uppercase;
                              letter-spacing: 0.2em;
                              font-size: 3.3em;
                              line-height: 2;
                              font-weight: 300;
                              text-rendering: optimizeLegibility;
                              text-align: center;
                            }
                            .type4 span {
                              -webkit-animation-name: type4;
                                      animation-name: type4;
                              -webkit-animation-duration: 50s;
                                      animation-duration: 50s;
                              -webkit-animation-iteration-count: infinite;
                                      animation-iteration-count: infinite;
                              -webkit-animation-direction: alternate;
                                      animation-direction: alternate;
                              -webkit-animation-fill-mode: forwards;
                                      animation-fill-mode: forwards;
                            }
                            @-webkit-keyframes type4 {
                              0% { color: #8dd65c; } 2% { color: #cad65c; } 4% { color: #a35cd6; } 6% { color: #d67a5c; } 8% { color: #d65c5c; } 10% { color: #5cd697; } 12% { color: #b65cd6; } 14% { color: #d6bc5c; } 16% { color: #5c62d6; } 18% { color: #5c68d6; } 20% { color: #d65ca3; } 22% { color: #d65c7e; } 24% { color: #d65c97; } 26% { color: #d65cad; } 28% { color: #5c8fd6; } 30% { color: #5c8fd6; } 32% { color: #d66e5c; } 34% { color: #8d5cd6; } 36% { color: #d6975c; } 38% { color: #ab5cd6; } 40% { color: #d67e5c; } 42% { color: #5cd6a3; } 44% { color: #d66e5c; } 46% { color: #d6d65c; } 48% { color: #d6955c; } 50% { color: #d6a35c; } 52% { color: #5c6ed6; } 54% { color: #d6a75c; } 56% { color: #9bd65c; } 58% { color: #d6605c; } 60% { color: #d6c85c; } 62% { color: #5c66d6; } 64% { color: #d65cb4; } 66% { color: #d4d65c; } 68% { color: #74d65c; } 70% { color: #5cd6a1; } 72% { color: #5cd676; } 74% { color: #5cd69f; } 76% { color: #d6d45c; } 78% { color: #d65c89; } 80% { color: #5c7ed6; } 82% { color: #be5cd6; } 84% { color: #70d65c; } 86% { color: #5ca3d6; } 88% { color: #d6b65c; } 90% { color: #5cd681; } 92% { color: #5c95d6; } 94% { color: #d65c6c; } 96% { color: #ad5cd6; } 98% { color: #5c78d6; } 100% { color: #5cbcd6; }
                            }
                            @keyframes type4 {
                              0% { color: #8dd65c; } 2% { color: #cad65c; } 4% { color: #a35cd6; } 6% { color: #d67a5c; } 8% { color: #d65c5c; } 10% { color: #5cd697; } 12% { color: #b65cd6; } 14% { color: #d6bc5c; } 16% { color: #5c62d6; } 18% { color: #5c68d6; } 20% { color: #d65ca3; } 22% { color: #d65c7e; } 24% { color: #d65c97; } 26% { color: #d65cad; } 28% { color: #5c8fd6; } 30% { color: #5c8fd6; } 32% { color: #d66e5c; } 34% { color: #8d5cd6; } 36% { color: #d6975c; } 38% { color: #ab5cd6; } 40% { color: #d67e5c; } 42% { color: #5cd6a3; } 44% { color: #d66e5c; } 46% { color: #d6d65c; } 48% { color: #d6955c; } 50% { color: #d6a35c; } 52% { color: #5c6ed6; } 54% { color: #d6a75c; } 56% { color: #9bd65c; } 58% { color: #d6605c; } 60% { color: #d6c85c; } 62% { color: #5c66d6; } 64% { color: #d65cb4; } 66% { color: #d4d65c; } 68% { color: #74d65c; } 70% { color: #5cd6a1; } 72% { color: #5cd676; } 74% { color: #5cd69f; } 76% { color: #d6d45c; } 78% { color: #d65c89; } 80% { color: #5c7ed6; } 82% { color: #be5cd6; } 84% { color: #70d65c; } 86% { color: #5ca3d6; } 88% { color: #d6b65c; } 90% { color: #5cd681; } 92% { color: #5c95d6; } 94% { color: #d65c6c; } 96% { color: #ad5cd6; } 98% { color: #5c78d6; } 100% { color: #5cbcd6; }
                            }
                            .type4 span:nth-of-type(1) { -webkit-animation-delay: -19.8s; animation-delay: -19.8s; } .type4 span:nth-of-type(2) { -webkit-animation-delay: -19.6s; animation-delay: -19.6s; } .type4 span:nth-of-type(3) { -webkit-animation-delay: -19.4s; animation-delay: -19.4s; } .type4 span:nth-of-type(4) { -webkit-animation-delay: -19.2s; animation-delay: -19.2s; } .type4 span:nth-of-type(5) { -webkit-animation-delay: -19s; animation-delay: -19s; } .type4 span:nth-of-type(6) { -webkit-animation-delay: -18.8s; animation-delay: -18.8s; } .type4 span:nth-of-type(7) { -webkit-animation-delay: -18.6s; animation-delay: -18.6s; } .type4 span:nth-of-type(8) { -webkit-animation-delay: -18.4s; animation-delay: -18.4s; } .type4 span:nth-of-type(9) { -webkit-animation-delay: -18.2s; animation-delay: -18.2s; } .type4 span:nth-of-type(10) { -webkit-animation-delay: -18s; animation-delay: -18s; } .type4 span:nth-of-type(11) { -webkit-animation-delay: -17.8s; animation-delay: -17.8s; } .type4 span:nth-of-type(12) { -webkit-animation-delay: -17.6s; animation-delay: -17.6s; } .type4 span:nth-of-type(13) { -webkit-animation-delay: -17.4s; animation-delay: -17.4s; } .type4 span:nth-of-type(14) { -webkit-animation-delay: -17.2s; animation-delay: -17.2s; } .type4 span:nth-of-type(15) { -webkit-animation-delay: -17s; animation-delay: -17s; } .type4 span:nth-of-type(16) { -webkit-animation-delay: -16.8s; animation-delay: -16.8s; } .type4 span:nth-of-type(17) { -webkit-animation-delay: -16.6s; animation-delay: -16.6s; } .type4 span:nth-of-type(18) { -webkit-animation-delay: -16.4s; animation-delay: -16.4s; } .type4 span:nth-of-type(19) { -webkit-animation-delay: -16.2s; animation-delay: -16.2s; } .type4 span:nth-of-type(20) { -webkit-animation-delay: -16s; animation-delay: -16s; } .type4 span:nth-of-type(21) { -webkit-animation-delay: -15.8s; animation-delay: -15.8s; } .type4 span:nth-of-type(22) { -webkit-animation-delay: -15.6s; animation-delay: -15.6s; } .type4 span:nth-of-type(23) { -webkit-animation-delay: -15.4s; animation-delay: -15.4s; } .type4 span:nth-of-type(24) { -webkit-animation-delay: -15.2s; animation-delay: -15.2s; } .type4 span:nth-of-type(25) { -webkit-animation-delay: -15s; animation-delay: -15s; } .type4 span:nth-of-type(26) { -webkit-animation-delay: -14.8s; animation-delay: -14.8s; } .type4 span:nth-of-type(27) { -webkit-animation-delay: -14.6s; animation-delay: -14.6s; } .type4 span:nth-of-type(28) { -webkit-animation-delay: -14.4s; animation-delay: -14.4s; } .type4 span:nth-of-type(29) { -webkit-animation-delay: -14.2s; animation-delay: -14.2s; } .type4 span:nth-of-type(30) { -webkit-animation-delay: -14s; animation-delay: -14s; } .type4 span:nth-of-type(31) { -webkit-animation-delay: -13.8s; animation-delay: -13.8s; } .type4 span:nth-of-type(32) { -webkit-animation-delay: -13.6s; animation-delay: -13.6s; } .type4 span:nth-of-type(33) { -webkit-animation-delay: -13.4s; animation-delay: -13.4s; } .type4 span:nth-of-type(34) { -webkit-animation-delay: -13.2s; animation-delay: -13.2s; } .type4 span:nth-of-type(35) { -webkit-animation-delay: -13s; animation-delay: -13s; } .type4 span:nth-of-type(36) { -webkit-animation-delay: -12.8s; animation-delay: -12.8s; } .type4 span:nth-of-type(37) { -webkit-animation-delay: -12.6s; animation-delay: -12.6s; } .type4 span:nth-of-type(38) { -webkit-animation-delay: -12.4s; animation-delay: -12.4s; } .type4 span:nth-of-type(39) { -webkit-animation-delay: -12.2s; animation-delay: -12.2s; } .type4 span:nth-of-type(40) { -webkit-animation-delay: -12s; animation-delay: -12s; } .type4 span:nth-of-type(41) { -webkit-animation-delay: -11.8s; animation-delay: -11.8s; } .type4 span:nth-of-type(42) { -webkit-animation-delay: -11.6s; animation-delay: -11.6s; } .type4 span:nth-of-type(43) { -webkit-animation-delay: -11.4s; animation-delay: -11.4s; } .type4 span:nth-of-type(44) { -webkit-animation-delay: -11.2s; animation-delay: -11.2s; } .type4 span:nth-of-type(45) { -webkit-animation-delay: -11s; animation-delay: -11s; } .type4 span:nth-of-type(46) { -webkit-animation-delay: -10.8s; animation-delay: -10.8s; } .type4 span:nth-of-type(47) { -webkit-animation-delay: -10.6s; animation-delay: -10.6s; } .type4 span:nth-of-type(48) { -webkit-animation-delay: -10.4s; animation-delay: -10.4s; } .type4 span:nth-of-type(49) { -webkit-animation-delay: -10.2s; animation-delay: -10.2s; } .type4 span:nth-of-type(50) { -webkit-animation-delay: -10s; animation-delay: -10s; } .type4 span:nth-of-type(51) { -webkit-animation-delay: -9.8s; animation-delay: -9.8s; } .type4 span:nth-of-type(52) { -webkit-animation-delay: -9.6s; animation-delay: -9.6s; } .type4 span:nth-of-type(53) { -webkit-animation-delay: -9.4s; animation-delay: -9.4s; } .type4 span:nth-of-type(54) { -webkit-animation-delay: -9.2s; animation-delay: -9.2s; } .type4 span:nth-of-type(55) { -webkit-animation-delay: -9s; animation-delay: -9s; } .type4 span:nth-of-type(56) { -webkit-animation-delay: -8.8s; animation-delay: -8.8s; } .type4 span:nth-of-type(57) { -webkit-animation-delay: -8.6s; animation-delay: -8.6s; } .type4 span:nth-of-type(58) { -webkit-animation-delay: -8.4s; animation-delay: -8.4s; } .type4 span:nth-of-type(59) { -webkit-animation-delay: -8.2s; animation-delay: -8.2s; } .type4 span:nth-of-type(60) { -webkit-animation-delay: -8s; animation-delay: -8s; } .type4 span:nth-of-type(61) { -webkit-animation-delay: -7.8s; animation-delay: -7.8s; } .type4 span:nth-of-type(62) { -webkit-animation-delay: -7.6s; animation-delay: -7.6s; } .type4 span:nth-of-type(63) { -webkit-animation-delay: -7.4s; animation-delay: -7.4s; } .type4 span:nth-of-type(64) { -webkit-animation-delay: -7.2s; animation-delay: -7.2s; } .type4 span:nth-of-type(65) { -webkit-animation-delay: -7s; animation-delay: -7s; } .type4 span:nth-of-type(66) { -webkit-animation-delay: -6.8s; animation-delay: -6.8s; } .type4 span:nth-of-type(67) { -webkit-animation-delay: -6.6s; animation-delay: -6.6s; } .type4 span:nth-of-type(68) { -webkit-animation-delay: -6.4s; animation-delay: -6.4s; } .type4 span:nth-of-type(69) { -webkit-animation-delay: -6.2s; animation-delay: -6.2s; } .type4 span:nth-of-type(70) { -webkit-animation-delay: -6s; animation-delay: -6s; } .type4 span:nth-of-type(71) { -webkit-animation-delay: -5.8s; animation-delay: -5.8s; } .type4 span:nth-of-type(72) { -webkit-animation-delay: -5.6s; animation-delay: -5.6s; } .type4 span:nth-of-type(73) { -webkit-animation-delay: -5.4s; animation-delay: -5.4s; } .type4 span:nth-of-type(74) { -webkit-animation-delay: -5.2s; animation-delay: -5.2s; } .type4 span:nth-of-type(75) { -webkit-animation-delay: -5s; animation-delay: -5s; } .type4 span:nth-of-type(76) { -webkit-animation-delay: -4.8s; animation-delay: -4.8s; } .type4 span:nth-of-type(77) { -webkit-animation-delay: -4.6s; animation-delay: -4.6s; } .type4 span:nth-of-type(78) { -webkit-animation-delay: -4.4s; animation-delay: -4.4s; } .type4 span:nth-of-type(79) { -webkit-animation-delay: -4.2s; animation-delay: -4.2s; } .type4 span:nth-of-type(80) { -webkit-animation-delay: -4s; animation-delay: -4s; } .type4 span:nth-of-type(81) { -webkit-animation-delay: -3.8s; animation-delay: -3.8s; } .type4 span:nth-of-type(82) { -webkit-animation-delay: -3.6s; animation-delay: -3.6s; } .type4 span:nth-of-type(83) { -webkit-animation-delay: -3.4s; animation-delay: -3.4s; } .type4 span:nth-of-type(84) { -webkit-animation-delay: -3.2s; animation-delay: -3.2s; } .type4 span:nth-of-type(85) { -webkit-animation-delay: -3s; animation-delay: -3s; } .type4 span:nth-of-type(86) { -webkit-animation-delay: -2.8s; animation-delay: -2.8s; } .type4 span:nth-of-type(87) { -webkit-animation-delay: -2.6s; animation-delay: -2.6s; } .type4 span:nth-of-type(88) { -webkit-animation-delay: -2.4s; animation-delay: -2.4s; } .type4 span:nth-of-type(89) { -webkit-animation-delay: -2.2s; animation-delay: -2.2s; } .type4 span:nth-of-type(90) { -webkit-animation-delay: -2s; animation-delay: -2s; } .type4 span:nth-of-type(91) { -webkit-animation-delay: -1.8s; animation-delay: -1.8s; } .type4 span:nth-of-type(92) { -webkit-animation-delay: -1.6s; animation-delay: -1.6s; } .type4 span:nth-of-type(93) { -webkit-animation-delay: -1.4s; animation-delay: -1.4s; } .type4 span:nth-of-type(94) { -webkit-animation-delay: -1.2s; animation-delay: -1.2s; } .type4 span:nth-of-type(95) { -webkit-animation-delay: -1s; animation-delay: -1s; } .type4 span:nth-of-type(96) { -webkit-animation-delay: -0.8s; animation-delay: -0.8s; } .type4 span:nth-of-type(97) { -webkit-animation-delay: -0.6s; animation-delay: -0.6s; } .type4 span:nth-of-type(98) { -webkit-animation-delay: -0.4s; animation-delay: -0.4s; } .type4 span:nth-of-type(99) { -webkit-animation-delay: -0.2s; animation-delay: -0.2s; } .type4 span:nth-of-type(100) { -webkit-animation-delay: 0s; animation-delay: 0s; }
                                </style>
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
function showMassage_DM5(content){
  content = content.replaceAll('\\n','<br>')
  $("#wrap").addClass("snow");
  var dialogsEl = document.getElementById("dialogs");
  var tmpl = `<dialog class="p_type5">
              <form method="dialog">
                <div class="p_header">
                  <strong>알림</strong>
                  <button class="btnClose ico_org cancel" aria-label="close" onclick="hideMassage_DM5();">닫기</button>
                </div>
                <div class="p_body">
                  <div class="approval_often">
                  </div>
                  <p>${content}</p>      
                  <div class="btn_wrap">
                    <button class="btn_gray_line" onclick="hideMassage_DM5();">닫기</button>
                  </div>
                </div>
              </form>
            </dialog>`;
            dialogsEl.innerHTML = tmpl;
  $('.p_type5')[0].showModal();
}
function showMassage_DM6(content){
  content = content.replace(/\\n/g, "\n");
  $("#wrap").addClass("wooz").attr('send-meow', content);
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
    $("#wrap").removeClass("snow");
    $('#p_type5').remove();
}
function hideMassage_DM6(){
  $("#wrap").removeClass("wooz");
}