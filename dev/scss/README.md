# SCSS 프로젝트 구조

## 📁 폴더 구조

```
scss/
├── main.scss                 # 메인 엔트리 파일 (여기서 필요한 모듈만 import)
│
├── base/                     # 기초 스타일
│   ├── _variables.scss       # 변수 정의 (색상, breakpoint 등)
│   ├── _fonts.scss           # 폰트 정의
│   ├── _reset.scss           # CSS 리셋
│   ├── _forms.scss           # 폼 요소 기본 스타일
│   └── _common_temp.scss     # 임시 참조 파일 (원본 cmmn.scss)
│
├── utils/                    # 유틸리티
│   ├── _mixins_original.scss # 믹스인 모음 (원본 _mixin.scss)
│   └── _helpers.scss         # 헬퍼 클래스 (상태, 색상, 정렬 등)
│
├── layout/                   # 레이아웃 컴포넌트
│   ├── _base.scss            # 기본 레이아웃 (#wrap, .wrap)
│   ├── _header.scss          # 헤더
│   └── _footer.scss          # 푸터
│
├── components/               # UI 컴포넌트
│   └── _notification.scss    # 알림 컴포넌트
│
├── pages/                    # 페이지별 스타일
│   ├── _main.scss            # 메인 페이지 (원본 style.scss)
│   ├── _modal.scss           # 모달 (원본 pop.scss)
│   └── _dm.scss              # DM 페이지
│
└── vendors/                  # 외부 라이브러리
    └── _fullcalendar.scss    # Fullcalendar 스타일
```

## 🚀 사용 방법

### 1. 새 프로젝트 시작

```bash
# scss 폴더 전체 복사
cp -r scss/ new-project/scss/
```

### 2. main.scss에서 필요한 모듈만 선택

```scss
// main.scss

// 기본 설정 - 항상 포함
@import 'base/variables';
@import 'base/fonts';
@import 'base/reset';
@import 'base/forms';

// 믹스인 - 항상 포함
@import 'utils/mixins_original';

// 필요한 것만 주석 해제
// @import 'layout/base';
// @import 'components/notification';
@import 'pages/main';  // 필요한 페이지만
```

### 3. 변수 커스터마이징

```scss
// base/_variables.scss 파일을 프로젝트에 맞게 수정

$red: #e42b29;              // 메인 컬러 변경
$breakpoint-mobile: 767px;   // 브레이크포인트 조정
$columnGap: 25px;            // 간격 조정
```

## 📦 프로젝트 유형별 추천 구성

### 간단한 랜딩 페이지
```scss
@import 'base/variables';
@import 'base/fonts';
@import 'base/reset';
@import 'utils/mixins_original';
// 필요한 페이지 스타일만
```

### 관리자 대시보드
```scss
@import 'base/variables';
@import 'base/fonts';
@import 'base/reset';
@import 'base/forms';
@import 'utils/mixins_original';
@import 'layout/base';
@import 'layout/header';
@import 'layout/footer';
@import 'components/notification';
@import 'pages/main';
@import 'pages/modal';
```

### 특정 기능만 필요한 경우
```scss
@import 'base/variables';
@import 'utils/mixins_original';
@import 'components/notification';  // 필요한 컴포넌트만
```

## 💡 주요 믹스인 사용 예시

### 반응형
```scss
.element {
  width: 100%;
  
  @include tablet {
    width: 80%;
  }
  
  @include mobile_only {
    width: 100%;
  }
}
```

### 플렉스 레이아웃
```scss
.container {
  @include flex_between;  // space-between + align-items: center
}

.wrapper {
  @include flex_layout;  // space-between + gap
}
```

### 버튼
```scss
.btn-primary {
  @include btn($red);  // 기본 버튼
}

.btn-full {
  @include full_btn($blue);  // 배경 채워진 버튼
}
```

### 텍스트 말줄임
```scss
.title {
  @include text_ellipsis(2);  // 2줄 말줄임
}
```

## 🎨 상태 클래스

프로젝트에 이미 정의된 상태 클래스들:

```html
<span class="draft">접수</span>
<span class="ing">진행중</span>
<span class="fin">완료</span>
<span class="reject">반려</span>
<span class="wait">대기</span>
```

색상 헬퍼:
```html
<p class="t_red">빨간 텍스트</p>
<p class="t_blue">파란 텍스트</p>
```

정렬 헬퍼:
```html
<div class="alignC">가운데 정렬</div>
<div class="alignL">왼쪽 정렬</div>
```

## ⚙️ Gulp 설정

gulpfile.js에서 SCSS 컴파일 설정:

```javascript
function scss() {
  return src(['scss/main.scss'])
    .pipe(sass({
      outputStyle: 'expanded',  // 개발: expanded, 배포: compressed
      indentType: 'tab',
      indentWidth: 1
    }))
    .pipe(dest('dist/css'))
}
```

## 📝 파일 네이밍 규칙

- **Partials**: `_`로 시작 (예: `_variables.scss`)
- **Main files**: `_` 없이 시작 (예: `main.scss`)
- **BEM 방법론**: 클래스명은 기존 프로젝트 규칙 유지

## 🔄 마이그레이션 가이드

기존 프로젝트를 이 구조로 변경하려면:

1. 기존 scss 파일 백업
2. 새 구조의 scss 폴더 복사
3. main.scss에서 필요한 모듈만 활성화
4. 커스텀 스타일은 적절한 폴더에 추가
   - 공통 컴포넌트 → `components/`
   - 페이지별 스타일 → `pages/`
   - 유틸리티 → `utils/`

## 📚 참고사항

- 모든 class 이름은 기존 프로젝트와 **동일하게 유지**
- 구조만 모듈화하여 재사용성과 유지보수성 향상
- 필요없는 모듈은 import하지 않아 CSS 파일 크기 최적화
- 변수와 믹스인을 활용하여 일관성 있는 디자인 구현

## 🛠️ 개발 워크플로우

1. **개발 시작**: `gulp` 또는 `gulp watch` 실행
2. **스타일 수정**: 해당 SCSS 파일 수정
3. **자동 컴파일**: Gulp가 자동으로 CSS 생성
4. **배포**: `gulp build` 실행 (minified CSS 생성)

---

**Created**: 2025-01-29
**Version**: 1.0
