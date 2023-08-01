//const { eventNames } = require("process");

const handleSelect = function (item) {
  if ($(item).hasClass('optionItem')) {
    // add disabled
    const isDisabled = $(item).attr('aria-disabled') === 'true';
    if (isDisabled) {
      return;
    }
    const result = $(item).closest('.select_custom').find('.label');
    const resultVal = item.dataset.value;
    result.html(item.innerHTML).attr('data-value', resultVal);
    result.parent().removeClass('active');
    console.log(resultVal);
  }
}

$(function () {
  // nav
  var $deps1 = $('.nav_lst>li'),
    $deps2 = $('.sub li'),
    preLocate,
    deps1Locate,
    deps2Locate,
    indexDeps1,
    indexDeps2,
    locate = window.location.href

  menuInit()
  function menuInit() {
    $deps1.each(function (index, item) {
      var getAttr = $(this).children('a').attr('href')
      index += 1
      indexDeps1 = $(this)
        .children('a')
        .attr('href', getAttr + '?index=' + index + ',1')
      indexDeps2 = $(this).find($deps2)
      indexDeps2.each(function (index2, item) {
        getAttr = $(this).children('a').attr('href')
        index2 += 1
        indexDeps2 = $(this)
          .children('a')
          .attr('href', getAttr + '?index=' + index + ',' + index2)
      })
    })
  }

  if (locate.indexOf('index=') > -1) {
    preLocate = locate.split('index=')[1].split(',')
    deps1Locate = preLocate[0] - 1
    deps2Locate = preLocate[1] - 1

    $deps1.eq(deps1Locate).addClass('on')
    $deps1.eq(deps1Locate).find($deps2).eq(deps2Locate).addClass('on')
  }

  function menu1Open(onItem) {
    onItem = onItem.parent('li')
    if (!onItem.hasClass('on')) {
      if (onItem.children('ul').length === 0) {
        $deps1.removeClass('on')
        onItem.addClass('on')
      }
    }
  }
  function menu2Open(onSubItem) {
    $deps1.removeClass('on')
    $deps2.removeClass('on')
    onSubItem.addClass('on').parents('li').addClass('on')
  }

  $deps1.children('a').on('click', function () {
    menu1Open($(this))
  })
  $deps2.on('click', function () {
    menu2Open($(this))
  })

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
    }
  })

  //snb
   $.editNewBox = function () {
    const editIptWrap = $(this).parent('a');
    let editedIpt = $(this).val();
    if (editedIpt === '') editedIpt = '새보관함 ';
    let html = editedIpt;
        html += '<div class="layer_tool">';
        html += '<button type="button" class="btn_ellipsis" title="더보기">더보기</button>';
        html += '<div class="btn_layer">';
        html += '<button type="button" data-clickevt="modify">수정</button>';
        html += '<button type="button" data-clickevt="del">삭제</button>';
        html += '</div></div>';

    $(editIptWrap).html(html).children('input').remove();
  }
   // add item
   const iptEvt = (ipt) => { 
    ipt.focus();
    ipt.focusout($.editNewBox);
    ipt.on('keydown', function(e){
      if((e.keyCode) == 13) ipt.focusout();
    })
  }
  $('.nav_btn_add').on('click', function () {
    const target = $(this).next('ul');
    const addLi = document.createElement("li");
    let tmpl = "";
        tmpl += "<a href='" + "#" + "'>"
        tmpl += "<input type='text' placeholder='새보관함'>"
        tmpl += "</a>"
    addLi.innerHTML = tmpl;
    const ipt = target.append(addLi).find('input');
    iptEvt(ipt);
  });
  // delete,edit item
  $(':has(.hasLayer)').on('click','[data-clickevt]',function(e){
    let btnType = e.target.dataset.clickevt;
    if(btnType == "del"){
      (!confirm('선택한 보관함을 정말 삭제하시겠습니까?\n해당 보관함의 문서는 내 보관함으로 이동합니다.')) ? alert('취소 되었습니다.') : $(this).parentsUntil('.hasLayer').remove();
    }else if(btnType == "modify"){
      const target = $(this).parents('a');
      const getTxt = target.contents().filter(function() {
          return this.nodeType === 3; // Select only text nodes
      }).text().trim();
      let editNewIpt = "<input type='text' value='"+ getTxt +"' >";
      target.html(editNewIpt);
      const editIpt = target.find('input');
      iptEvt(editIpt);
    }
  })  

  // table_row checked
  $('.row_check').on({
    click: function (e) {
      e.stopPropagation()
    },
    change: function () {
      var cur = $(this).prop('checked'),
        checkName = 'select_tr'
      if ($(this).hasClass('all_check')) {
        var childCheck = $(this)
          .parents('.tbl_wrap')
          .find('tbody')
          .find('.row_check')
        childCheck.each(function () {
          var elRow = $(this).parents('tr')
          $(this).prop('checked', cur)
          cur ? elRow.addClass(checkName) : elRow.removeClass(checkName)
        })
      } else {
        var thisRow = $(this).parents('tr')
        if ($(this).prop('type') == 'radio')
          $(this).parents('table').find('tr').removeClass(checkName)
        cur ? thisRow.addClass(checkName) : thisRow.removeClass(checkName)
      }
    },
  })

  // list all check
  $('.all_lst_ctrl').on('click change','input:checkbox',function(){
    const allCtrl =  $(this).prop('checked'),
          thisChild = $(this).closest('.all_lst_ctrl').next('.lst_ctrl').find('input:checkbox');
    thisChild.prop('checked', allCtrl);
  })
  $('.lst_ctrl').on('click change','input',function(){
      var thisP = $(this).parents('.lst_ctrl'),
          checkSize = thisP.find('input:checked').length,
          allCtrl = thisP.prev('.all_lst_ctrl').find('input:checkbox');
     (thisP.find('input:checkbox').length <= checkSize) ? allCtrl.prop('checked',true) : allCtrl.prop('checked',false);
  })

  //layer_tool
  $(":has(.hasLayer)").on('click focusin','.layer_tool',function(e){
      e.stopPropagation();
      e.preventDefault();
      $(this).addClass('on')
  }).on('focusout','.layer_tool',function(){
    $(this).removeClass('on');
  })

  //tab
  $('.tab li').first().addClass('on');
  $('.tab_container').find('.tab_contents').not(':first').hide();
  $('.tab li').on('click', function (e) {
    e.preventDefault()
    $(this).addClass('on').siblings().removeClass('on');
    var link = $(this).find('a').attr('href');
    var link_num = link.substr(link.length - 1);
    $('.m_tab option')
      .eq(link_num - 1)
      .prop('selected', 'selected')
    var findTarget = $(this).parents('.tab_wrap').next('.tab_container');
    findTarget.find('.tab_contents').hide();
    $(link).show();
  })

  //addOPT
  $('[data-checkEvt]').on('change',function(e){
    const getTarget = e.target.dataset.checkevt,
          target = $("#" + getTarget);
    ($(this).prop('checked')) ? target.show() : target.hide();
  })

  const getYear = new Date();
  $("[name='ipt_year']").val(getYear.getFullYear());

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
    $(this).prev().val(this.value.replace(/c:\\fakepath\\/i, ''))
    console.log($(this))
  })

  // toggle button
  $('.evt_tgl').off('click').on('click', function (e) { // 기존에 등록된 이벤트 리스너 제거
    e.preventDefault();
    var cur =  e.target.dataset;
    if ($(this).attr('disabled') == 'disabled') return false;
    if (cur.value == 'on') {
      $(this).attr({
        'data-value':'off',
        'title' : cur.off
      }).html(cur.off);
    } else {
      $(this).attr({
        'data-value':'on',
        'title' : cur.on
      }).html(cur.off);
    }
  });

  $('.snb_fold').on('click',function(e){
    var snbBtn =  e.target.dataset,
        snb = $('.snb'),
        snbWidth = snb[0].scrollWidth +'px',
        speed = 500;
    (snbBtn.value == 'on')?snb.animate({'width':0}, speed) : snb.animate({'width': snbWidth},speed);
  });
  
  const select_custom = $('.select_custom');
  const label = select_custom.find('.label');
  const options = select_custom.find('.optionItem');
  options.on('click',function(e){
    handleSelect(e.target);
  });
  label.on('click',function(){
    ($(this).parent().hasClass('active')) ? $(this).parent().removeClass('active') : $(this).parent().addClass('active')
  })
  $('select').on('change',function(){
    $(this).css('color','inherit');
  });
});

// editor
function setEditor() {
  ClassicEditor.create(document.querySelector('#editor'), {
    licenseKey: '',
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
}
