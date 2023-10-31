//const { eventNames } = require("process");

const handleSelect = function (item) {
  if ($(item).hasClass('optionItem')) {
    // add disabled
    const isDisabled = $(item).attr('aria-disabled') === 'true'
    if (isDisabled) {
      return
    }
    const result = $(item).closest('.select_custom').find('.label')
    const resultVal = item.dataset.value
    result.html(item.innerHTML).attr('data-value', resultVal)
    result.parent().removeClass('active')
    console.log(resultVal)
    //변경시 이벤트 발생 추가
    if (item.parentNode.onchange) {
      item.parentNode.onchange()
    }
  }
}

const handleClose = function(e, range){
  let clickTarget = e;
  let handleRange = range;
  for (let i=0; i<=handleRange.length; i++){
    if(clickTarget.parents(handleRange[i]).length < 1){
      $(handleRange[i]).removeClass('on');
    }    
  }
}
//focusout close
$('html').on('click',function(e){
  let eTarget = $(e.target);
  let range = ['.layer_tool'];
  handleClose(eTarget,range);
})
//로딩순서 때문에 수동실행
function commonInit() {
  //gnb
  $('.profile').on({
    click: function () {
      $(this).addClass('on')
    },
    focusin: function () {
      $(this).addClass('on')
    },
    focusout: function () {
      $(this).removeClass('on')
    },
  })

  //snb
  $.editNewBox = function () {
    const editIptWrap = $(this).parent('a')
    let editedIpt = $(this).val()
    if (editedIpt === '') editedIpt = '새보관함 '
    let html = editedIpt
    html += '<div class="layer_tool">'
    html +=
      '<button type="button" class="btn_ellipsis" title="더보기">더보기</button>'
    html += '<div class="btn_layer">'
    html += '<button type="button" data-clickevt="modify">수정</button>'
    html += '<button type="button" data-clickevt="del">삭제</button>'
    html += '</div></div>'

    $(editIptWrap).html(html).children('input').remove()
  }
  // add item
  const iptEvt = ipt => {
    ipt.focus()
    ipt.focusout($.editNewBox)
    ipt.on('keydown', function (e) {
      if (e.keyCode == 13) ipt.focusout()
    })
  }
  $('.nav_btn_add').on('click', function () {
    const target = $(this).next('ul')
    const addLi = document.createElement('li')
    let tmpl = ''
    tmpl += "<a href='" + '#' + "'>"
    tmpl += "<input type='text' placeholder='새보관함'>"
    tmpl += '</a>'
    addLi.innerHTML = tmpl
    const ipt = target.append(addLi).find('input')
    iptEvt(ipt)
  })
  // delete,edit item
  $(':has(.hasLayer)').on('click', '[data-clickevt]', function (e) {
    let btnType = e.target.dataset.clickevt
    if (btnType == 'del') {
      !confirm(
        '선택한 보관함을 정말 삭제하시겠습니까?\n해당 보관함의 문서는 내 보관함으로 이동합니다.'
      )
        ? alert('취소 되었습니다.')
        : $(this).parentsUntil('.hasLayer').remove()
    } else if (btnType == 'modify') {
      const target = $(this).parents('a')
      const getTxt = target
        .contents()
        .filter(function () {
          return this.nodeType === 3 // Select only text nodes
        })
        .text()
        .trim()
      let editNewIpt = "<input type='text' value='" + getTxt + "' >"
      target.html(editNewIpt)
      const editIpt = target.find('input')
      iptEvt(editIpt)
    }
  })


  // table_row checked
  $('.row_check').on({
    click: function (e) {
      e.stopPropagation()
    },
    change: function () {
      var cur = $(this).prop('checked'),
        checkName = 'select_tr',
        thisP = $(this).parents('.tbl_wrap');
        childBody = thisP.find('tbody');
      if ($(this).hasClass('all_check')) {        
        var childCheckIpt = childBody.find('.row_check');
        childCheckIpt.each(function () {
          var elRow = $(this).parents('tr')
          $(this).prop('checked', cur)
          cur ? elRow.addClass(checkName) : elRow.removeClass(checkName)
        })
      } else {
        var thisRow = $(this).parents('tr');
        if ($(this).prop('type') == 'radio') $(this).parents('table').find('tr').removeClass(checkName);
          cur ? thisRow.addClass(checkName) : thisRow.removeClass(checkName);
          var checkSize = childBody.find('.row_check:checked').length,
              allCtrl = thisP.find('.all_check');
          childBody.find('input:checkbox').length <= checkSize
            ? allCtrl.prop('checked', true)
            : allCtrl.prop('checked', false)
        }
    },
  })
  // tbl_list Handle checked
  $('.tbl_list .row_check').on({
    click: function (e) {
      e.stopPropagation()
    },
    change: function () {
      var cur = $(this).prop('checked')
      var thisLi = $(this).closest('li')
      if (cur) {
        thisLi.addClass('select_li')
      } else {
        thisLi.removeClass('select_li')
      }
    },
  })

  // list all check
  function all_check_evt(el) {
    const allCtrl = el.prop('checked'),
      thisChild = el
        .closest('.all_lst_ctrl')
        .next('.lst_ctrl')
        .find('input:checkbox')
    thisChild.prop('checked', allCtrl)
  }
  function all_check(el) {
    var thisP = el.parents('.lst_ctrl'),
      checkSize = thisP.find('input:checked').length,
      allCtrl = thisP.prev('.all_lst_ctrl').find('input:checkbox')
    thisP.find('input:checkbox').length <= checkSize
      ? allCtrl.prop('checked', true)
      : allCtrl.prop('checked', false)
  }
  $('.all_lst_ctrl').on('click change', 'input:checkbox', function () {
    all_check_evt($(this))
  })
  $('.lst_ctrl').on('click change', 'input', function () {
    all_check($(this))
  })
  $('.lst_ctrl')
    .find('input:checkbox')
    .each(function (index, item) {
      all_check($(item))
    })

  //layer_tool
  $(':has(.hasLayer)')
    .off('click').on('click focusin', '.layer_tool', function (e) {
      e.stopPropagation()
      e.preventDefault()
      $(this).addClass('on').css('z-index','100');
    })
    .on('focusout', '.layer_tool', function () {
      $(this).removeClass('on').css('z-index','0');
    });

  //tab
  $('.tab').find('li:first').addClass('on')
  $('.tab_container').find('.tab_contents:not(:first)').hide()
  $('.tab li').on('click', function (e) {
    e.preventDefault()
    $(this).addClass('on').siblings().removeClass('on')
    var link = $(this).find('a').attr('href')
    var link_num = link.substr(link.length - 1)
    $('.m_tab option')
      .eq(link_num - 1)
      .prop('selected', 'selected')
    var findTarget = $(this).parents('.tab_wrap').next('.tab_container')
    findTarget.find('.tab_contents').hide()
    $(link).show();
    if(typeof calendar !== 'undefined') calendar.updateSize();
  })

  //select_tab
  $('.seltab_wrap').find('.seltab_opt:not(:first)').hide().find('.seltab_opt:first').show();
  $('[data-seltab]').on('change',function(e){
    e.preventDefault();
    var link = $(this).val();
    $(this).next('.seltab_wrap').find('.seltab_opt').hide();
    $('#'+link).show();    
  });

  //addOPT
  $('[data-checkEvt]').on('change', function (e) {
    const getTarget = e.target.dataset.checkevt.split('!')
    let target
    if (getTarget[1]) {
      target = $('#' + getTarget[1])
      $(this).prop('checked') ? target.hide() : target.show()
    } else {
      target = $('#' + getTarget[0])
      $(this).prop('checked') ? target.show() : target.hide()
    }
  })
  $('[data-selectEvt]').on('change', function (e) {
    const getTarget = e.target.dataset.selectevt;
    const result = $(this).val();
    let target = $('#' + getTarget + result);
    $('[data-selectTarget]').hide();
    if(target.length){
      target.show();
    }
  })
  $('[data-tglwrap]').hide().first().show()
  $('[data-toggle]').off('click').on('click', function (e){
    e.stopPropagation();
    const getTarget = e.target.dataset.toggle
    target = $('#' + getTarget)
    target.show()
    $(this).closest('[data-tglwrap]').hide()
  })

  const getYear = new Date()
  $("[name='ipt_year']").val(getYear.getFullYear())

  // sortable
  function sortable() {
    $('.sortable').sortable({
      scroll: false,
      cursor: 'move',
      connectWith: '.move_sortable',
      placeholder: 'sortable_style', // drag : border style(css)
      forcePlaceholderSize: true,
      stop: function () {
        $('.tree li').removeClass('arrow')
        $('.tree li:has(li)').addClass('arrow')
      },
    })
  }
  sortable()

  // tree
  $('.tree li:has(li)').addClass('arrow')
  $('.tree').on('click', 'li>span', function () {
    var children = $(this).parent('li.arrow').find(' > ul > li')
    if (children.is(':visible')) {
      children.hide(0)
      $(this).parent('li').addClass('close')
      $(this).next('ul').removeClass('move_sortable')
    } else {
      children.show(0)
      $(this).parent('li').removeClass('close')
      $(this).next('ul').addClass('move_sortable')
    }
    return false
  })
  // add, edit, delete
  $.editOgtName = function () {
    var editInputWrap = $(this).parent('div')
    var editInput = $(this).val()
    if (editInput === '') {
      var editInput = '새 조직 '
    }
    var editInput = $('<span>' + editInput + '</span>')
    $(this).parent('div').children('input').remove()
    $(editInputWrap).prepend(editInput)
    $('.doneAddOgt, .doneEditOgt').hide()
    $('.addOgt, .editOgt').show()
  }
  // delete item
  $('.delOgt').on('click', function () {
    if ($('.tree').find('.hover').length > 0) {
      if (!confirm('선택 조직을 정말 삭제하시겠습니까?')) {
        alert('취소 되었습니다.')
      } else {
        $('.hover').parent('li').remove()
        $('.tree li').removeClass('arrow')
        $('.tree li:has(li)').addClass('arrow')
      }
    } else {
      alert('삭제할 그룹을 선택해주세요')
    }
  })
  // add item
  $('.addOgt').on('click', function () {
    $(this).hide()
    $('.doneAddOgt').show()
    var addLi = $('<li class="ui-sortable-handle">')
    var addDiv = $('<div>')
    var addUl = $('<ul class="sortable move_sortable ui-sortable">')
    var addInput = $('<input type="text" placeholder="조직명을 입력하세요">')
    var addpeople = $('<span> (0)</span>')
    addLi.append(addDiv, addUl)
    addDiv.append(addInput, addpeople)
    $('.tree').prepend(addLi)
    sortable()
    $(addLi).find('input').focus()
    $(addLi).find('input').focusout($.editOgtName)
    $(addLi)
      .find('input')
      .keydown(function (key) {
        if (key.keyCode == 13) {
          $(addLi).find('input').focusout()
        }
      })
  })
  // edit item
  $('.tree').on('click', 'div', function () {
    $('.tree div').removeClass('hover')
    $(this).addClass('hover')
  })
  $('.editOgt').on('click', function () {
    if ($('.tree').find('.hover').length > 0) {
      $(this).hide()
      $('.doneEditOgt').show()
      var editDiv = $('.hover')
      var editSpan = editDiv.children('span:first-child')
      var editInput = $(
        `<input type="text" placeholder="조직명을 입력하세요" value="${editSpan.text()}">`
      )
      editSpan.remove()
      editDiv.prepend(editInput)
      editInput.focus()
      editInput.focusout($.editOgtName)
      editInput.keydown(function (key) {
        if (key.keyCode == 13) {
          $.editOgtName()
          editInput.focusout()
        }
      })
    } else {
      alert('수정할 그룹을 선택해주세요')
    }
  })
  $('.doneAddOgt, .doneEditOgt').on('click', $.editOgtName)

  // add file
  $('.upFile').on('change', function () {
    $(this)
      .prev()
      .val(this.value.replace(/c:\\fakepath\\/i, ''))
    console.log($(this))
  })

  // toggle button
  $('.evt_tgl')
    .off('click')
    .on('click', function (e) {
      // 기존에 등록된 이벤트 리스너 제거
      e.preventDefault()
      var cur = e.target.dataset
      if ($(this).attr('disabled') == 'disabled') return false
      if (cur.value == 'on') {
        $(this)
          .attr({
            'data-value': 'off',
            title: cur.off,
          })
          .html(cur.off)
      } else {
        $(this)
          .attr({
            'data-value': 'on',
            title: cur.on,
          })
          .html(cur.off)
      }
    })

  $('.snb_fold').on('click', function (e) {
    var snbBtn = e.target.dataset,
      snb = $('.snb'),
      snbWidth = snb[0].scrollWidth + 'px',
      speed = 500
    snbBtn.value == 'on'
      ? snb.animate({ width: 0 }, speed)
      : snb.animate({ width: snbWidth }, speed)
  })

  const select_custom = $('.select_custom')
  const label = select_custom.find('.label')
  const options = select_custom.find('.optionItem')
  options.off('click').on('click', function (e) {
    const eclass = Array.prototype.slice.apply(e.target.classList)
    if (!eclass.includes('optionItem'))
      handleSelect($(this).closest('.optionItem')[0])
    else handleSelect(e.target)
  })
  label.off('click').on('click', function () {
    select_custom.removeClass('active')
    $(this).parent().hasClass('active')
      ? $(this).parent().removeClass('active')
      : $(this).parent().addClass('active')
  })
  $('select').on('change', function () {
    $(this).css('color', 'inherit')
  })
}

// editor
function setEditor(id = 'editor') {
  ClassicEditor.create(document.querySelector('#'+id), {
    licenseKey: '',
    image: {
      toolbar: ['toggleImageCaption', 'imageTextAlternative'],
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    fontFamily: {
      options: ['나눔고딕', '맑은고딕', '굴림', '돋움', '바탕', '궁서'],
    },
    fontSize: {
      options: [13, 15, 17, 19, 21],
    },
    table: {
      tableProperties: {
        defaultProperties: {
          alignment: 'left',
          resizable: false,
        },
      },
    },
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true,
        },
      ],
      disallow: [
        /* HTML features to disallow */
      ],
    },
  })
    .then(editor => {
      window.editor = editor
    })
    .catch(error => {
      console.error('Oops, something went wrong!')
      console.warn('Build id: qwsqnzvk7hw9-unxl3nmu7n15')
      console.error(error)
    })
    .replace

  if($('#image_editor_wrap').length==0){
    // 이미지 에디터 생성
    var imageEditorWrap = document.createElement('div')
    imageEditorWrap.id = 'image_editor_wrap'
    imageEditorWrap.innerHTML = `
          <div id="image_editor"></div>
          <div class="btn_editor_wrap">
            <button type="button" class="btn btn_red" id="confirmButton">확인</button>
            <button type="button" class="btn btn_gray" id="cancelButton">취소</button>
          </div>
      `
    var editorWrap = document.getElementById(id).parentElement
    editorWrap.insertAdjacentElement('afterend', imageEditorWrap)
  }

  // 에디터를 만들어도.. 될까요?
  var checkEditor = setInterval(function () {
    if (setEditor !== null) {
      setImageEditor()
      clearInterval(checkEditor)
    }
  }, 100)
  
}

const locale_ko = {
  Crop: '자르기',
  DeleteAll: '모두 삭제',
  Delete: '삭제',
  Undo: '되돌리기',
  Redo: '다시 실행',
  Reset: '초기화',
  Flip: '뒤집기',
  Rotate: '회전',
  Draw: '그리기',
  Shape: '도형',
  Icon: '아이콘',
  Text: '텍스트',
  Mask: '마스크',
  Filter: '필터',
  Bold: '굵게',
  Italic: '기울임',
  Underline: '밑줄',
  Left: '왼쪽 정렬',
  Center: '가운데 정렬',
  Right: '오른쪽 정렬',
  Color: '색상',
  'Text size': '글자 크기',
  Custom: '사용자 설정',
  Square: '정사각형',
  Apply: '적용',
  Cancel: '취소',
  'Flip X': 'X축 뒤집기',
  'Flip Y': 'Y축 뒤집기',
  Range: '범위',
  Stroke: '외곽선',
  Fill: '채우기',
  Circle: '원',
  Triangle: '삼각형',
  Rectangle: '사각형',
  Free: '자유곡선',
  Straight: '직선',
  Arrow: '화살표',
  'Arrow-2': '화살표2',
  'Arrow-3': '화살표3',
  'Star-1': '별1',
  'Star-2': '별2',
  Polygon: '다각형',
  Location: '위치',
  Heart: '하트',
  Bubble: '말풍선',
  'Custom icon': '사용자 설정 아이콘',
  'Load Mask Image': '마스크 이미지 불러오기',
  Grayscale: '회색조',
  Blur: '블러',
  Sharpen: '선명하게',
  Emboss: '엠보스',
  'Remove White': '배경 제거',
  Distance: '거리',
  Brightness: '밝기',
  Noise: '잡음',
  'Color Filter': '색상 필터',
  Sepia: '세피아',
  Sepia2: '세피아2',
  Invert: '반전',
  Pixelate: '픽셀화',
  Threshold: '임계값',
  Tint: '색조',
  Multiply: '곱하기',
  Blend: '혼합',
  'Lock Aspect Ratio': '비율 고정',
  Resize: '크기 조정',
  History: '작업내역',
  Hand: '손 도구',
  ZoomIn: '확대',
  ZoomOut: '축소',
  Width: '너비',
  Height: '높이',
}

function setImageEditor() {
  // 이미지 업로드 팝업 관련 요소 선택
  var imageEditor = null // Initialize Image Editor variable
  const imageEditorWrap = document.getElementById('image_editor_wrap')

  // "확인" 버튼 클릭 시 이미지 업로드 및 Markdown 형식으로 삽입
  const confirmButton = document.getElementById('confirmButton')
  confirmButton.addEventListener('click', function () {
    if (imageEditor) {
      const editedImage = imageEditor.toDataURL().split(',')[1] // 수정된 이미지의 Data URL 가져오기
      const markdownImage = `![이미지](data:image/png;base64,${editedImage})`
      const cancelButton = document.getElementById('cancelButton')
      cancelButton.addEventListener('click', function () {
        imageEditorWrap.style.display = 'none'
      })

      // CKEditor의 내용에 Markdown 이미지 추가
      const editorData = editor.getData().split('\n')
      const row_num = editor.model.document.selection.getFirstPosition().path[0]
      editorData[row_num] = editorData[row_num] + markdownImage
      editor.setData(editorData.join('\n'))
      // 이미지 에디터 팝업 닫기
      imageEditorWrap.style.display = 'none'
    }
  })

  cancelButton.addEventListener('click', function () {
    imageEditorWrap.style.display = 'none'
  })

  var editableDiv = document.querySelector('.ck-editor__editable')
  editableDiv.addEventListener('paste', function (event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items
    for (var index in items) {
      var item = items[index]
      if (item.type === 'image/png') {
        var blob = item.getAsFile()
        var reader = new FileReader()
        reader.onload = function (event) {
          imageEditorWrap.style.display = 'block'
          if (!imageEditor) {
            imageEditor = new tui.ImageEditor('#image_editor', {
              includeUI: {
                loadImage: {
                  path: event.target.result,
                  name: 'PastedImage',
                },
                initMenu: 'draw',
                menuBarPosition: 'bottom',
                locale: locale_ko,
              },
              usageStatistics: false,
            })
            window.onresize = function () {
              imageEditor.ui.resizeEditor()
            }
          } else {
            imageEditor.loadImageFromURL(event.target.result, 'PastedImage')
          }
        }
        reader.readAsDataURL(blob)
        editor.execute('undo')
      }
    }
  })
}

// 업무범주 태그(색상 제거)
function addTag(selectedName, divId, selectId) {
  if (selectedName) {
    const tags = document.getElementById(divId)
    const existingTags = new Set()
    const existingTagSpans = tags.getElementsByClassName('tags')
    for (const tagSpan of existingTagSpans) {
      const tagName = tagSpan.querySelector('i').textContent
      existingTags.add(tagName)
    }
    // 중복 체크
    if (!existingTags.has(selectedName)) {
      const tag = document.createElement('span')
      tag.className = 'tags'
      const i = document.createElement('i')
      i.appendChild(document.createTextNode(selectedName))
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'btn_deltag'
      button.textContent = '삭제'
      button.addEventListener('click', () => tags.removeChild(tag))
      tag.appendChild(i)
      tag.appendChild(button)
      tags.appendChild(tag)
    }else{
      alert('이미 선택된 항목입니다')
    }
  }
}

function initializeTagManager(divId, selectId, initialNames) {
  const select = document.getElementById(selectId)
  initialNames.forEach(name => {
    const option = document.createElement('option')
    option.value = name
    option.textContent = name
    select.appendChild(option)
  })
  select.addEventListener('change', function () {
    const selectedName = select.value
    addTag(selectedName, divId, selectId)
    select.value = '' // 선택 초기화
  })
}

// top scroll
const createScrollButton = () => {
  const scrollBtn = document.createElement('button')
  scrollBtn.innerHTML = '상단으로 이동'
  scrollBtn.classList.add('btn_scroll')
  document.body.appendChild(scrollBtn)
  return scrollBtn
}
const toggleScrollButton = () => {
  const scrollBtn = document.querySelector('.btn_scroll')
  scrollBtn.classList.toggle('show', window.scrollY * 2 > window.innerHeight)
}
const scrollToTop = () => {
  if (window.scrollY > 0) {
    window.scrollTo(0, window.scrollY - 50)
    setTimeout(scrollToTop, 10)
  }
}
const initScrollToTop = () => {
  const scrollBtn = createScrollButton()
  scrollBtn.addEventListener('click', scrollToTop)
  window.addEventListener('scroll', toggleScrollButton)
}
initScrollToTop()