var fIndex = 0;
var totalfSize = 0;
var fList = [];
var fSizeList = [];
var uploadSize = 10 * 1024 * 1024; //MB
var maxUploadSize = 200 * 1024 * 1024; //MB
var fLenthList = []; //구분할 필요가??
var maxFileLength = 10; //첨부최대갯수
var lastElementId = null; //마지막 접근 파일 업로드 요소 id

function fileDropEvt(){
  var file_drop = $('.drop_zone');
  $('[data-attach]').off('change').on('change',function(e){
    var files = e.target.files;
    var thisEl = e.target.dataset.attach;
    selectFile(e,files,thisEl);
  });
  
  file_drop.on("dragover",function drop(e){
    e.stopPropagation();
    e.preventDefault();
  });
  file_drop.on("drop",function(e){
    e.stopPropagation();
    e.preventDefault();
    var files = e.originalEvent.dataTransfer.files; //filelist obj.
    if(files != null){
      if(files.length < 1){
          alert("폴더 업로드 불가"); //ie
          return;
      }else{
        for(var i = 0; i < files.length; i++){
          var fType = files[i].type;
          if(fType == ""){
            alert("폴더 업로드 불가"); //chrome
            return;
          }
        }
      }
      selectFile(e,files,thisEl);
    }else{
        alert("ERROR");
    }
  });
}

//파일목록 초기화
function resetSelectFile(){
  fList = []
  fIndex = 0;
  $(".attach_list:not(.file_attached .attach_list)").html(''); //file_attached 아래에 있는 경우는 이미 등록된 파일이어서 제외
}
function selectFile(event,fileObject,thisEl){
  let files = null;
  const file = event.target.files[0];
  console.log(thisEl)

  //다른 파일 업로드창 접근시 파일목록 초기화
  if(lastElementId !== thisEl){
    resetSelectFile()
    lastElementId = thisEl
  }

  // 파일첨부개수 지정
  if(thisEl.includes('cmt')||thisEl.includes('reply')){
    maxFileLength = 3
    console.log('댓글창이 있군요!')
  }
  if(fileObject != null){
    files = fileObject;
  }else{
    files = $('#multipaartFileList_' + fIndex)[0].files; //직접등록
  }
  if (files != null){
    if(files.length > maxFileLength){ // =제거
      alert("파일첨부갯수 초과1");
      return
    }
    for(var i = 0; i < files.length; i++){
      var fName = files[i].name; //파일명
      var fNameArr = fName.split("\."); //경로
      var fExt = fNameArr[fNameArr.length - 1]; //확장자
      var fSize = files[i].size / 1024; //사이즈
      const fileArr = Array.prototype.slice.call(event.target.files);  
      var fSrc = URL.createObjectURL(fileArr[i]);
      var type = files[i].type.split("/")[0];
    
      if($.inArray(fExt, ['exe', 'bat', 'sh', 'java', 'jsp', 'html', 'js', 'css', 'xml']) >= 0){
        // 확장자 체크
        alert("등록 불가 확장자");
        break;
      }else if(fSize > uploadSize){
        // 파일 사이즈 체크
        alert("용량 초과\n업로드 가능 용량 : " + uploadSize + " KB");
        break;
      }else if(fList.length >= maxFileLength){
        alert("파일첨부갯수 초과");
        break;
      }else{       
        totalfSize += fSize;// 전체 파일 사이즈
        fList[fIndex] = files[i];// 파일 배열에 넣기
        fSizeList[fIndex] = fSize;// 파일 사이즈 배열에 넣기
        fLenthList.push(files[i]);
        addFileList(fIndex, fName, fSize, fExt, fSrc, type, thisEl);// 업로드 파일 목록 생성
        fIndex++;// 파일 번호 증가
      }
    }
  }else{
    alert("ERROR");
  }
}
function addFileList(fIndex, fName, fSize, fExt, fSrc, type, thisEl){
  var thisEl = thisEl;
  var viewList =  $('#'+thisEl);
  var html = "";
  var fUnit = "KB";
  if(fSize > 1024){
    fSize = fSize / 1024;
    fUnit = "MB";
  }
  fSize = Math.floor(fSize*100)/100;
  html += "<li id='fItem_" + fIndex + "'>";  
  //html += "<i class='ico_ext ext_" + fExt + "'></i>";
  html += fName;
  //html += "<span class='file_size'>" + fSize + fUnit + "</span>";
  html += "<a href='#' onclick='deleteFile(" + fIndex + "); return false;' class='file_del' title='삭제'>삭제</a>";
  if (type === "image") html += "<img src='"+fSrc+"' class='attach_thumb'>";
  html += "</li>";
  viewList.append(html);
  infoView();
}

function deleteFile(fIndex){
  totalfSize -= fSizeList[fIndex];// 전체 파일 사이즈 수정
  delete fList[fIndex];// 파일 배열에서 삭제
  delete fSizeList[fIndex];// 파일 사이즈 배열 삭제
  //fLenthList.splice(fIndex,1);
  $("#fItem_" + fIndex).remove();// 업로드 파일 테이블 목록에서 삭제
  infoView();
}
function infoView(){
  var fileList = $('.attach_list li').length;
  var info = $('.drop_info');
  (fileList == 0) ? info.show() : info.hide();
}