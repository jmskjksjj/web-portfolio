# web-portfolio · hub-app → ARCO.AI 마이그레이션 계획서

## 1. 배경 (Context)

`C:\Users\sjkim01\Desktop\web-portfolio` 의 포트폴리오 사이트에는 14개 프로젝트가 등록되어 있고, 그중 **`hub-app`** (App 카테고리)이 현재 **"Archflow 에코시스템 데스크톱 클라이언트"** 라는 옛 브랜드·옛 포지셔닝으로 작성되어 있습니다.

이 프로젝트를 **`ARCO.AI`** 브랜드로 전면 교체하고, 메인 영상을 새로 업로드된 YouTube 영상(`https://youtu.be/z-mAS1ss7_k`)으로 변경합니다. 콘텐츠는 2026년 인공지능 챔피언 대회용 **영상**과 **구현제안서**의 메시지(건축사–AI 협업, 9단계 자동 파이프라인, 자체제작 5 MCP, 47,225 법조문 3D, GREEN-T 일조 특허 등)에 정합시킵니다.

본 계획은 **데이터 파일(`projects.ts`) 텍스트 교체 + 미디어 폴더 정비 + 작은 코드 보강(YouTube iframe 분기)** 을 단계적으로 정리합니다.

---

## 2. 현재 상태 (Source files)

### 2.1 데이터 파일
- **`src/lib/projects.ts`** (Lines 198–223) — `hub-app` 프로젝트 객체 정의
- Project 인터페이스: Lines 13–30 (`youtubeUrl` 필드 **없음**, `video` 만 존재)

### 2.2 렌더링 파일
- **`src/app/projects/[slug]/page.tsx`** — 상세 페이지. Line 72–82에서 `<video>` 로컬 mp4를 렌더. **YouTube 임베드 분기 없음**.

### 2.3 미디어 폴더
- `public/projects/hub-app/`
  - `video.mp4` (자동재생 hero 비디오)
  - `screenshot-1.png`
  - `screenshot-2.png`

### 2.4 라우팅
- 자동 라우팅: `/projects/hub-app` (Next.js App Router · `generateStaticParams` 가 `slug`로 자동 생성)
- 카테고리 라우팅: `/projects/app` 에 listed

---

## 3. 정답 콘텐츠 (영상 + 계획서 기준)

### 3.1 영상 (`C:\...\AI_Competition\video\`)
- **브랜드**: ARCO.AI / Architecture Copilot
- **태그라인**: "건축가의 모든 작업을 하나로"
- **6 핵심 자산**: 47,225 법조문 3D / 1,402 법령·조례 온톨로지 / 1 자사 특허 / 5 정부 API / 9 자동 파이프라인 / 자체제작 5 MCP
- **현재 구현률**: 32%
- **팀**: 6명 (0 Dev + 1 Vibe Coder + 1 Director + 2 Architect + 2 Green Architect)
- **개발 기간**: 3개월, 100,000+ LOC
- **YouTube**: `https://youtu.be/z-mAS1ss7_k` (Video ID: `z-mAS1ss7_k`)

### 3.2 구현제안서 (`11_구현제안서_초안.md`)
- **기술명**: Architecture Copilot — 건축사와 AI가 협업하는 건축설계 전과정 AI 플랫폼
- **법규 검토 시간**: 수일 → 수분 (98% 절감)
- **계획설계 기간**: 2-4주 → 5-10일 (65-80% 절감)
- **3-tier 법규 검증**: 법제처 API + 자체 DB + AI 폴백
- **GREEN-T 특허**: 일조환경 최적높이 Matrix (2026.08 등록 예정)

---

## 4. 변경 항목 요약 (Diff Summary)

| 항목 | 현재 (hub-app) | 변경 후 (ARCO.AI) |
|---|---|---|
| **slug** | `hub-app` | `arco-ai` |
| **name** | `hub-app` | `ARCO.AI` |
| **type** | "Desktop App · Electron + Next.js" | "Architecture Copilot · Electron + 5 MCP" |
| **typeKo** | "데스크톱 앱 · Electron + Next.js" | "건축사–AI 협업 오케스트레이터 · Electron + 자체제작 5 MCP" |
| **description** | "Archflow 7 modules" | "건축사–AI 협업형 9단계 파이프라인" |
| **techStack** | 5종 (Electron 34, TS, Next.js, Three.js, NSIS) | 8–10종 (+ Claude API, MCP, Python, FastAPI, Rhino3dm) |
| **metrics (현재 2종)** | "Integrated Modules: 7" / "Pipeline Phases: 9" | **6종으로 확장** — 47,225 / 162 / 9 / 5 MCP / 32% / 100k+ LOC |
| **status** | `production` | **`development`** (32% 구현 중) |
| **video** | 로컬 `.mp4` | YouTube iframe + 로컬 백업 mp4 |
| **폴더명** | `public/projects/hub-app/` | **변경 없음** (그대로 유지) |
| **URL** | `/projects/hub-app` | `/projects/arco-ai` |
| **이미지 경로** | `/projects/hub-app/screenshot-*.png` | **경로 그대로** (파일 내용만 사용자가 교체) |

---

## 5. 권장 코드 보강 (작은 추가 1건)

YouTube 영상을 자연스럽게 임베드하려면 작은 코드 보강이 가장 깔끔합니다. 우선순위 권장안 → 비권장안 순서로 정리합니다.

### 5.1 [권장] Project 인터페이스에 `youtubeUrl` 필드 추가

**`src/lib/projects.ts` Line 28 부근**
```diff
  images?: string[];
  video?: string;
+ youtubeUrl?: string;  // 예: "https://youtu.be/z-mAS1ss7_k"
  tools?: McpTool[];
```

**`src/app/projects/[slug]/page.tsx` Line 72–82 영역에 분기 추가**
```diff
- ) : project.video ? (
+ ) : project.youtubeUrl ? (
+   <div className="space-y-3">
+     <div className="rounded-lg overflow-hidden border border-border bg-black" style={{ aspectRatio: "16 / 9" }}>
+       <iframe
+         src={`https://www.youtube.com/embed/${extractYoutubeId(project.youtubeUrl)}?rel=0`}
+         title={project.name}
+         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
+         allowFullScreen
+         className="w-full h-full"
+       />
+     </div>
+     <a
+       href={project.youtubeUrl}
+       target="_blank"
+       rel="noopener noreferrer"
+       className="inline-flex items-center gap-2 text-sm font-mono text-text-secondary hover:text-text-primary transition-colors"
+     >
+       ▶  Watch on YouTube  ↗
+     </a>
+   </div>
+ ) : project.video ? (
    <div className="rounded-lg overflow-hidden border border-border bg-black" style={{ aspectRatio: "16 / 9" }}>
      <video src={project.video} autoPlay loop muted playsInline className="w-full h-full object-contain" />
    </div>
```

**`extractYoutubeId` 헬퍼 함수**(`projects.ts` 하단 또는 `lib/utils.ts` 신규):
```typescript
export function extractYoutubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/);
  return match ? match[1] : url;
}
```

**효과:**
- 영상이 페이지 안에 임베드되어 바로 재생 가능
- "Watch on YouTube ↗" 버튼으로 YouTube로 이동 가능
- 기존 `video` 필드는 그대로 유지(다른 프로젝트들 영향 없음)

---

### 5.2 [차선] 코드 변경 없이 description 안에 YouTube 링크만 텍스트로

`description` 끝에 `"📺 영상 보기: https://youtu.be/z-mAS1ss7_k"` 추가하고 `video.mp4` 는 로컬 파일 그대로 유지.

→ 임베드는 안 되지만 코드 수정 0건. 단, 사용자 경험은 떨어짐.

---

### 5.3 [비권장] `video` 필드를 URL 감지로 재해석

기존 `video` 필드에 YouTube URL을 넣으면 `<video src="https://youtu.be/...">` 가 깨지므로 [slug]/page.tsx에서 URL 감지 로직 필요. 5.1보다 분기 코드가 복잡해지고 의미 모호해짐.

---

## 6. `projects.ts` 데이터 객체 — 새 ARCO.AI 항목 (전문)

기존 `hub-app` 객체(Line 198–223)를 아래로 **전면 교체**합니다.

```typescript
{
  slug: "arco-ai",
  name: "ARCO.AI",
  category: "app",
  type: "Architecture Copilot · Electron + 5 MCP Servers",
  typeKo: "건축사–AI 협업 오케스트레이터 · Electron + 자체제작 5 MCP",
  description:
    "Architecture Copilot — a Human-in-the-Loop AI orchestrator for the entire schematic design process. 9-stage automated pipeline driven by 5 in-house MCP servers (checklist, site, law, analysis, zoning), with 47,225 building-code articles visualized as a 3D galaxy and a patent-pending sunlight optimal-height analyzer (GREEN-T).",
  descriptionKo:
    "Architecture Copilot — 계획설계 전 과정을 함께 진행하는 건축사–AI 협업형 오케스트레이터. 자체제작 5개 MCP(checklist·site·law·analysis·zoning)로 9단계 자동 파이프라인을 구동하며, 47,225개 법조문을 3D 갤럭시로 시각화하고 일조환경 최적높이 특허(GREEN-T)를 통합했습니다.",
  detail:
    "ARCO.AI is the Architecture Copilot a single architect built in 3 months — over 100,000 lines of feature code, 5 self-authored MCP servers, and 9 pipeline stages bound into one Electron desktop app. Phase 1 parses 50–100 page design-guideline PDFs into a structured checklist (8h → 30min). Phase 2 turns NGII topographic ZIPs into a Rhino 3DM site model (1day → 15min). Phase 3 cross-validates Korean Building Act + 162 municipal ordinances through a 3-tier engine (법제처 API → local DB → AI fallback), reducing legal review by ~98% (days → minutes). Phase 4 fuses VWorld cadastral, KOSIS demographics, and Open-Meteo climate data, then calls the in-house GREEN-T sunlight Matrix algorithm (patent registration scheduled Aug 2026) to compute the optimal-height grid. Phase 5 generates floor-plan candidates with an 8-criteria self-correction loop (3–7days → 1–3days), with the architect making the final design decision. Phase 6 outputs AutoCAD DXF + Rhino 3DM. Architect approval is enforced at every stage — Human-in-the-Loop is structural, not optional. Currently 32% implemented; this video demoes the live prototype.",
  detailKo:
    "ARCO.AI는 건축가 단 한 명이 3개월 만에 만든 Architecture Copilot 입니다. 10만 줄이 넘는 기능 코드, 자체제작 5 MCP, 9단계 파이프라인을 단일 Electron 데스크톱 앱으로 통합했습니다.\n\n• Phase 1 (문서분석): 50~100쪽 설계지침서 PDF를 2단계 추출(토큰 30~50% 절감)로 체크리스트화 — 반나절~1일 → 30분.\n• Phase 2 (부지모델링): 국토지리정보원 수치지형도 ZIP을 Rhino 3DM 모델로 자동 변환 — 1일 → 15분.\n• Phase 3 (법규검토): 「건축법」 + 162개 지자체 조례를 3-tier 구조(법제처 API → 자체 DB → AI 폴백)로 교차 검증, 47,225개 법조문을 3D Galaxy로 탐색 — 1~3일 → 반나절 (98% 절감).\n• Phase 4 (대지분석): VWorld 지적·KOSIS 통계·Open-Meteo 기상 데이터를 통합하고, 자사 부설기술연구소 친환경팀이 개발한 「일조환경 최적높이 Matrix 알고리즘」(GREEN-T, 2026.08 특허 등록 예정)을 호출 — 2~3일 → 반나절.\n• Phase 5 (조닝설계): AI가 8개 항목 자기 채점 + 70점 미만 시 재생성 루프로 평면 대안을 만들고, 건축가가 코어·실 배치 3가지 대안 중 선택하는 Wizard 협업 방식 — 3~7일 → 1~3일.\n• Phase 6 (도면생성): AutoCAD DXF + Rhino 3DM 출력.\n\n모든 단계에서 건축가의 검토·승인 없이 다음 Phase로 넘어가지 않는 Human-in-the-Loop 구조가 강제됩니다. 현재 구현률 32%, 본 영상은 라이브 프로토타입 데모입니다.",
  techStack: [
    "Electron 34",
    "Next.js 16",
    "TypeScript",
    "Python 3.11",
    "FastAPI",
    "Claude Sonnet / Haiku",
    "MCP (Model Context Protocol)",
    "Three.js",
    "rhino3dm",
    "ezdxf",
  ],
  metrics: [
    { label: "Building-code Articles (3D)", value: "47,225", labelKo: "법조문 3D 시각화" },
    { label: "Municipal Ordinances", value: "162", labelKo: "지자체 조례" },
    { label: "Pipeline Phases", value: "9", labelKo: "자동 파이프라인" },
    { label: "In-house MCP Servers", value: "5", labelKo: "자체제작 MCP" },
    { label: "Implementation", value: "32%", labelKo: "현재 구현률" },
    { label: "Lines of Code", value: "100,000+", labelKo: "기능 코드 (3개월)" },
  ],
  status: "development",
  youtubeUrl: "https://youtu.be/z-mAS1ss7_k",
  video: "/projects/hub-app/video.mp4",  // 로컬 백업 (YouTube 우선 렌더). 폴더명은 그대로 hub-app/ 유지
  images: [
    "/projects/hub-app/screenshot-1.png",  // 폴더명 유지, 파일 내용만 ARCO.AI 화면으로 교체 예정
    "/projects/hub-app/screenshot-2.png",
  ],
},
```

---

## 7. 미디어 폴더 작업

### 7.1 폴더 이름 변경 — ❌ **하지 않음** (사용자 확정)
> 사유: 폴더 이름까지 바꾸면 대공사. slug 만 `arco-ai` 로 변경하고 미디어 폴더는 `public/projects/hub-app/` 그대로 둔다. 데이터 파일의 `video` / `images` 경로는 모두 `/projects/hub-app/...` 를 가리킨다.

### 7.2 파일 정리 — ✅ 진행
- `video.mp4` — **유지** (사용자 확정, YouTube 우선 렌더 + 로컬 백업)
- `screenshot-1.png` / `screenshot-2.png` — **사용자가 직접 교체 예정** (파일명·경로는 그대로, 내용만 ARCO.AI 화면으로)
- 추천 스크린샷 후보 (사용자 참고용):
  - 영상의 03_showcase.html 6개 자산 orbital 화면 캡처
  - 영상의 phase_intro_cards.html PIPELINE/STUDIO/GREEN-T 3 시스템 카드 캡처
  - 실제 데스크톱 앱의 Workspace / Phase Detail / Law Galaxy 3D 화면 캡처

---

## 8. 추가로 바꿀 것 권고 — ❌ **하지 않음** (사용자 확정)

> 사유: 다른 항목(`arch-hub`, `arch-*-mcp` 5종 등)까지 손대면 대공사. 본 작업은 **`hub-app` 항목 단 1개에만 집중** 한다. 아래 항목들은 향후 별도 작업으로 분리.

- ~~§8.1 `arch-hub` 항목 용어 정리 ("Archflow" → "ARCO.AI")~~ — 보류
- ~~§8.2 `arch-*-mcp` 5종 description prepend~~ — 보류
- ~~§8.3 메인 페이지 brand 일관성·`featured: true` 플래그~~ — 보류

> 단, **`featured: true` 플래그**는 신규 `arco-ai` 객체에 한 줄 추가하는 정도라 대공사 아님. 사용자 의향에 따라 선택 가능.

---

## 9. 작업 순서 (Execution Order) — 최종 확정

### A. 코드 보강 (단 1회)
1. `src/lib/projects.ts` Project 인터페이스에 `youtubeUrl?: string` 추가 (Line 28 부근)
2. `src/lib/projects.ts` 하단 또는 `src/lib/utils.ts` 에 `extractYoutubeId()` 헬퍼 추가
3. `src/app/projects/[slug]/page.tsx` 의 미디어 영역(Line 72–82)에 YouTube iframe 분기 추가

### B. 데이터 교체
4. `src/lib/projects.ts` Line 198–223 의 `hub-app` 객체를 §6의 `arco-ai` 객체로 전면 교체
   - **주의**: `video` / `images` 경로는 모두 `/projects/hub-app/...` (폴더명 그대로 유지)

### C. 미디어 파일 작업 (사용자 직접)
5. ~~폴더명 변경~~ — 하지 않음
6. `public/projects/hub-app/screenshot-1.png` / `screenshot-2.png` 두 파일을 사용자가 ARCO.AI 화면 캡처로 직접 덮어쓰기

### D. ~~동반 정리~~ — 보류
- ~~arch-hub / arch-*-mcp 항목들 정리~~ → 별도 작업으로 분리

### E. 검증
7. `npm run dev` 또는 `npm run build` 로 빌드 정상 여부 확인
8. `/projects/arco-ai` 라우트가 생성되는지 확인 (404 없는지)
9. `/projects/hub-app` 은 의도적으로 404가 되어야 함 (구 URL 폐기)
10. `/projects/app` 카테고리 페이지에서 ARCO.AI 카드 정상 노출 확인
11. YouTube iframe 자동 재생 + "Watch on YouTube" 외부 링크 동작 확인
12. 한글/영문 토글 시 양쪽 모두 자연스러운지 확인

---

## 10. 확정 결정 사항 (Confirmed by User)

| 항목 | 결정 |
|---|---|
| **Q1. 코드 보강** | ✅ **OK** — Project 인터페이스에 `youtubeUrl?: string` 추가 + `[slug]/page.tsx` iframe 분기 추가 |
| **Q2. slug 변경** | ✅ **OK** — `hub-app` → `arco-ai` (URL: `/projects/arco-ai`) |
| **폴더 이름 변경** | ❌ **NO** — 대공사 회피. `public/projects/hub-app/` 그대로 유지. 데이터 경로는 `/projects/hub-app/...` 사용 |
| **Q3. arch-hub 등 동반 정리** | ❌ **NO** — `hub-app` 항목 1개만 변경. 다른 항목은 보류 |
| **Q4. 로컬 video.mp4** | ✅ **유지** — 백업 용도. YouTube가 우선 렌더 |
| **Q5. 스크린샷 교체** | ✅ **사용자 직접 교체 예정** — 파일명/경로는 그대로 |

---

## 11. 변경 영향 범위 (Risk)

| 영역 | 영향 | 대응 |
|---|---|---|
| **URL 깨짐** | 기존 `/projects/hub-app` 외부 링크 모두 404 | SEO 영향 거의 없음 (로컬 포트폴리오), 무시 가능 |
| **빌드 실패** | `youtubeUrl` 필드 추가 시 TypeScript 타입 에러 가능성 | §5.1 코드 보강을 먼저 적용한 뒤 데이터 교체 |
| **이미지 깨짐** | 폴더명 변경 시 경로 동기화 필요 | §6의 `images` 경로가 `arco-ai/` 로 이미 반영됨 |
| **메인 hero 영역** | featured 노출 정책 변경 시 다른 프로젝트 순서 변동 | `featured: true` 미설정 권장 (현 hub-app 도 미설정) |
| **검색엔진 인덱싱** | sitemap.xml 등 외부 SEO 자산 | 본 포트폴리오는 그런 자산 미사용 추정, 무시 가능 |

---

## 12. 핵심 파일 경로 정리

| 역할 | 파일 |
|---|---|
| Project 데이터 (텍스트 교체) | `C:\Users\sjkim01\Desktop\web-portfolio\src\lib\projects.ts` |
| 상세 페이지 (YouTube 분기 추가) | `C:\Users\sjkim01\Desktop\web-portfolio\src\app\projects\[slug]\page.tsx` |
| 미디어 폴더 | `C:\Users\sjkim01\Desktop\web-portfolio\public\projects\hub-app\` → `arco-ai\` |
| 본 계획서 | `C:\Users\sjkim01\Desktop\web-portfolio\PLAN_arco_ai_migration.md` |

---

**계획 완료. 위 Q1–Q5 결정과 함께 실행 단계로 진입하면 됩니다.**
