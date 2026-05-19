# 프로젝트 개요
회사 업무관리시스템 퍼블리싱 프로젝트

# 기술 스택
- HTML5, SCSS, Vanilla JS
- BEM 방식으로 클래스 네이밍
- IE11 지원 안 함

# 디자인 시스템 규칙
- 기본 폰트: Pretendard
- 컬러 변수는 _variables.scss 참고

# 주의사항
- 접근성 WCAG 2.1 AA 기준 준수
- 이미지 alt 텍스트 필수

# 접근성 규칙
HTML 파일 수정할 때는 항상 아래를 체크해줘:
- 아이콘 버튼에 aria-label 필수
- 열고 닫히는 UI에 aria-expanded 필수
- 장식용 이미지는 alt="" 또는 aria-hidden="true"
- 폼 에러는 role="alert" 또는 aria-live 필수

## 출력 형식 규칙 — SCSS

SCSS 코드를 출력할 때는 아래 형식을 반드시 따를 것.

### 압축 인라인 스타일
- 같은 선택자의 속성은 한 줄에 세미콜론(`;`)으로 구분하여 작성
- 여는 중괄호 `{`는 선택자와 같은 줄, 닫는 중괄호 `}`는 블록 끝에 바로 붙임
- 중첩 규칙(`&`, `@include` 등)은 들여쓰기 2칸으로 표현
- 불필요한 빈 줄 없음

### 예시
```scss
%info{margin-top:3px;color:#000;letter-spacing:-0.3px;
  &::before{@include fontello('\eb77');margin-right:5px;font-size:13px;color:#d0d0d0;vertical-align:middle;}
}
```

### 금지 사항
- 속성마다 줄바꿈하는 일반 포맷 사용 금지
- 코드블록 언어 태그 누락 금지 (항상 ` ```scss ` 명시)