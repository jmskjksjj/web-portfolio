export type ProjectCategory = "web" | "app" | "mcp" | "other";

export interface McpTool {
  name: string;
  description: string;
  descriptionKo?: string;
  input: string;
  inputKo?: string;
  output: string;
  outputKo?: string;
}

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  type: string;
  typeKo?: string;
  description: string;
  descriptionKo?: string;
  detail: string;
  detailKo?: string;
  techStack: string[];
  metrics?: { label: string; value: string; labelKo?: string }[];
  featured?: boolean;
  status: "production" | "active" | "development";
  images?: string[];
  video?: string;
  /**
   * Optional YouTube URL. When set, the project detail page renders the video
   * as an embedded iframe (with a "Watch on YouTube" external link), taking
   * precedence over the local `video` field. The local `video` is kept as a
   * fallback for environments where the iframe can't load.
   * Accepted forms: `https://youtu.be/<id>`, `https://www.youtube.com/watch?v=<id>`,
   * `https://www.youtube.com/embed/<id>`.
   */
  youtubeUrl?: string;
  tools?: McpTool[];
}

export const projects: Project[] = [
  // ── Web ──
  {
    slug: "arch-hub",
    name: "arch-hub",
    category: "web",
    type: "AI Orchestrator · FastAPI + Next.js",
    typeKo: "AI 오케스트레이터 · FastAPI + Next.js",
    description:
      "9-phase AI orchestration platform for architectural competition design. Claude multi-agent system with wave-based parallel execution and real-time WebSocket updates.",
    descriptionKo:
      "건축 설계공모를 위한 9단계 AI 오케스트레이션 플랫폼. Claude 멀티에이전트 시스템으로 웨이브 기반 병렬 실행 및 실시간 WebSocket 업데이트.",
    detail:
      "The central nervous system of the \"Archflow\" ecosystem. arch-hub coordinates 6 MCP servers through a 9-phase pipeline, from document analysis to drawing generation. Each phase uses Claude AI agents that run in parallel waves, cross-validate results, and stream progress via WebSocket. The frontend is a full Next.js 16 app with 59 React components, real-time phase monitoring, and interactive result views.",
    detailKo:
      "\"Archflow\" 에코시스템의 중추 신경계. 6개 MCP 서버를 9단계 파이프라인으로 조율하여 문서 분석부터 도면 생성까지 수행합니다. 각 단계에서 Claude AI 에이전트가 병렬 웨이브로 실행되며, 교차 검증 후 WebSocket으로 실시간 진행 상황을 스트리밍합니다. 프론트엔드는 59개 React 컴포넌트로 구성된 Next.js 16 앱으로, 실시간 단계 모니터링과 인터랙티브 결과 뷰를 제공합니다.",
    techStack: [
      "Next.js 16",
      "React 19",
      "FastAPI",
      "Claude API",
      "WebSocket",
      "TypeScript",
      "Python",
    ],
    metrics: [
      { label: "API Endpoints", value: "41" },
      { label: "UI Components", value: "59" },
      { label: "Pipeline Phases", value: "9" },
      { label: "MCP Servers", value: "6" },
    ],
    featured: true,
    status: "production",
    video: "/projects/arch-hub/video.mp4",
    images: [
      "/projects/arch-hub/screenshot-1.png",
      "/projects/arch-hub/screenshot-2.png",
    ],
  },
  {
    slug: "arch-law-galaxy",
    name: "arch-law-galaxy",
    category: "web",
    type: "3D Law Visualization · Three.js + Express",
    typeKo: "3D 법규 시각화 · Three.js + Express",
    description:
      "131 national laws and 1,112 local ordinances visualized as an interactive 3D solar system. 47,225 articles rendered as stars in a cosmic galaxy with 614 legal relationship edges.",
    descriptionKo:
      "131개 국가법령과 1,112개 지방조례를 인터랙티브 3D 태양계로 시각화. 47,225개 조문을 우주 은하의 별로 렌더링하고 614개 법률 관계 엣지로 연결.",
    detail:
      "A 3D visualization that maps Korean architectural law as a cosmic solar system. The Building Law sits at the center as the Sun, with 8 planets representing legal domains — from fire safety to energy regulations. An asteroid belt of 162 local ordinances orbits between the inner and outer planets. Each of 47,225 articles is rendered as an individual star, with 614 relationship edges (references, delegations, amendments) connecting them. Features unified full-text search across all laws, 6 specialized legal research tools, an interactive checklist generator, and Excel export. Built with vanilla Three.js for maximum rendering performance — no framework overhead.",
    detailKo:
      "한국 건축법규를 우주 태양계로 매핑한 3D 시각화. 건축법이 태양으로 중심에 위치하고, 8개 행성이 소방·에너지·주택 등 법률 도메인을 나타냅니다. 162개 지방조례가 소행성대로 내행성과 외행성 사이를 공전합니다. 47,225개 조문 각각이 개별 별로 렌더링되며, 614개 관계 엣지(참조, 위임, 개정)가 이들을 연결합니다. 전문 검색, 6개 법률 연구 도구, 인터랙티브 체크리스트 생성기, Excel 내보내기를 지원합니다.",
    techStack: [
      "Three.js",
      "Express",
      "TypeScript",
      "SQLite",
      "FTS5",
      "WebGL Shaders",
    ],
    metrics: [
      { label: "Laws Visualized", value: "131" },
      { label: "Local Ordinances", value: "1,112" },
      { label: "Articles (Stars)", value: "47,225" },
      { label: "Legal Relationships", value: "614" },
    ],
    featured: true,
    status: "production",
    video: "/projects/arch-law-galaxy/main-video.mp4",
    images: [
      "/projects/arch-law-galaxy/screenshot-1.png",
      "/projects/arch-law-galaxy/screenshot-2.png",
    ],
  },
  {
    slug: "arch-zoning-mcp-web",
    name: "arch-zoning-mcp",
    category: "web",
    type: "MCP Server + Web App",
    typeKo: "MCP 서버 + 웹 앱",
    description:
      "AI spatial layout engine. Claude generates room arrangements with constraint solving. SVG canvas editor with DXF export.",
    descriptionKo:
      "AI 공간 배치 엔진. Claude가 제약 조건 해결로 실 배치를 생성. SVG 캔버스 에디터와 DXF 내보내기 지원.",
    detail:
      "A dual-purpose tool: an MCP server providing zoning design capabilities to arch-hub, and a standalone web application with an interactive SVG canvas where users can edit AI-generated layouts. The constraint solver handles setback regulations, floor area ratios, and building coverage automatically. Exports to DXF for use in CAD software.",
    detailKo:
      "이중 목적 도구: arch-hub에 조닝 설계 기능을 제공하는 MCP 서버이자, AI가 생성한 레이아웃을 편집할 수 있는 인터랙티브 SVG 캔버스가 있는 독립 웹 애플리케이션. 제약 조건 해결기가 건폐율, 용적률, 이격거리를 자동 처리합니다. CAD 소프트웨어용 DXF로 내보내기 지원.",
    techStack: ["Python", "Claude AI", "MCP stdio JSON-RPC", "SVG Canvas", "VWorld API", "DXF"],
    metrics: [
      { label: "Tools", value: "9", labelKo: "도구" },
      { label: "Wizard Steps", value: "2-Stage", labelKo: "Wizard 단계" },
    ],
    status: "production",
    video: "/projects/arch-zoning-mcp/video.mp4",
    images: [
      "/projects/arch-zoning-mcp/screenshot-1.png",
      "/projects/arch-zoning-mcp/screenshot-2.png",
    ],
    tools: [
      {
        name: "generate_layout",
        description: "One-shot AI auto-layout generation. Takes a list of rooms and the site boundary, returns the optimal arrangement satisfying area, setback, and adjacency constraints. Used when the architect wants the fastest end-to-end result.",
        descriptionKo: "AI 원샷 자동 레이아웃 생성. 실 목록과 대지 경계를 입력하면 면적·이격·인접 제약을 만족하는 최적 배치를 반환합니다. 가장 빠른 end-to-end 결과가 필요할 때 사용.",
        input: "Rooms list, boundaries, constraints",
        inputKo: "실 목록, 경계, 제약 조건",
        output: "Placed rooms with coordinates + validation report",
        outputKo: "좌표가 매핑된 배치 결과 + 검증 보고서",
      },
      {
        name: "generate_layout_step1",
        description: "Wizard Step 1 — generates 3 strategic alternatives for core (stairs/EV/restrooms) and corridor placement: center, eccentric, and split-end. The architect picks one before proceeding to room placement in Step 2.",
        descriptionKo: "Wizard Step 1: 코어(계단/EV/화장실) + 복도 배치. 3개 전략 대안(중앙/편심/양단)을 생성합니다. 건축가가 하나를 선택하면 Step 2로 진행.",
        input: "Rooms list, boundaries, constraints",
        inputKo: "실 목록, 경계, 제약 조건",
        output: "3 core+corridor strategic alternatives with rationale",
        outputKo: "근거가 포함된 3개 코어+복도 전략 대안",
      },
      {
        name: "generate_layout_step2",
        description: "Wizard Step 2 — given the chosen core layout, places the remaining rooms with 3 strategic alternatives: dense-pack, function-zoned, and exterior-priority. Lets the architect compare layout philosophies before committing.",
        descriptionKo: "Wizard Step 2: 코어를 고정하고 나머지 실을 배치합니다. 3개 전략 대안(밀집/기능구역/외벽우선)을 생성하여 건축가가 배치 철학을 비교 후 확정.",
        input: "Step 1 result + remaining rooms + constraints",
        inputKo: "Step 1 결과 + 잔여 실 + 제약 조건",
        output: "3 room-placement strategic alternatives",
        outputKo: "3개 실 배치 전략 대안",
      },
      {
        name: "validate_layout",
        description: "Final layout validation — runs geometric checks (overlap, boundary, area), circulation analysis (path lengths, dead-end detection), and code compliance. Returns pass/fail per check with specific issue descriptions.",
        descriptionKo: "레이아웃 최종 검증: 기하 검증(겹침/바운더리/면적) + 동선 분석(경로 길이, 막다른 길 감지) + 법규 검토. 항목별 통과/실패 + 구체 이슈 설명을 반환.",
        input: "Rooms, boundaries, placed_rooms, checklist",
        inputKo: "실, 경계, 배치 결과, 체크리스트",
        output: "Per-check pass/fail report with issue descriptions",
        outputKo: "항목별 통과/실패 보고서 + 이슈 설명",
      },
      {
        name: "get_project_data",
        description: "Extracts project data (rooms list, constraints, checklist) from an Excel file. Reads the latest file from data/ folder by default, or accepts an absolute path. Bridges arch-checklist-mcp's Excel output into the zoning pipeline.",
        descriptionKo: "엑셀 파일에서 프로젝트 데이터(실 목록, 제약조건, 체크리스트)를 추출합니다. 기본적으로 data/ 폴더의 최신 파일을 읽으며, 절대 경로 지정도 가능. arch-checklist-mcp의 Excel 출력을 조닝 파이프라인으로 연결.",
        input: "Excel file path (optional)",
        inputKo: "엑셀 파일 경로 (선택)",
        output: "Structured project data — rooms, constraints, checklist",
        outputKo: "구조화 프로젝트 데이터 — 실, 제약, 체크리스트",
      },
      {
        name: "get_site_boundary",
        description: "Resolves a Korean address to its cadastral boundary polygon via the VWorld API. Supports multi-parcel auto-merge — input '강동구 암사동 474-6, 7, 8' returns a single unified boundary.",
        descriptionKo: "주소를 VWorld API로 조회하여 지적도 대지 경계 폴리곤을 반환합니다. 다중 필지 자동 병합 지원 — 예: '강동구 암사동 474-6, 7, 8' 입력 시 통합 경계 반환.",
        input: "Korean address (single or multi-parcel)",
        inputKo: "한국 주소 (단일 또는 다중 필지)",
        output: "Cadastral boundary polygon + center coordinates",
        outputKo: "지적도 경계 폴리곤 + 중심 좌표",
      },
      {
        name: "get_nearby_parcels",
        description: "Queries surrounding cadastral parcels within a configurable square area (default 100m × 100m) around the site center. Excludes the target parcel itself. Used for context analysis and shadow studies.",
        descriptionKo: "대지 중심점(lon/lat) 기준 size × size 영역의 주변 지적도 필지를 VWorld로 조회합니다. 대상 필지는 제외 (기본 100m × 100m). 컨텍스트 분석·그림자 스터디용.",
        input: "Lon/lat center, size (m), optional offset",
        inputKo: "경도·위도 중심, 크기(m), 오프셋(선택)",
        output: "Surrounding parcel polygons with attributes",
        outputKo: "속성이 포함된 주변 필지 폴리곤",
      },
      {
        name: "generate_bubble_layout",
        description: "AI bubble-diagram auto-generation. Places circular bubbles (cx, cy, area) based on topological adjacency requirements. The bubble form lets the architect quickly grasp spatial relationships before committing to rectangular geometry.",
        descriptionKo: "AI 버블 다이어그램 자동 생성. 위상학적 근접성 기반으로 원형 버블(cx, cy, area)을 배치합니다. 직사각형 지오메트리 확정 전 공간 관계를 빠르게 파악할 수 있도록 지원.",
        input: "Rooms list, boundaries, adjacency constraints",
        inputKo: "실 목록, 경계, 인접 제약",
        output: "Circular bubbles with positions and connectivity links",
        outputKo: "위치와 연결성이 포함된 원형 버블",
      },
      {
        name: "convert_bubble_to_line",
        description: "Converts a bubble diagram into a rectangular line layout using a hybrid algorithm — geometric preprocessing for initial placement, then AI fine-tuning for boundary alignment and constraint satisfaction. Bridges the schematic and detailed design stages.",
        descriptionKo: "버블 다이어그램을 직사각형 라인 레이아웃으로 변환합니다. 알고리즘 전처리(초기 배치) + AI 정밀조정(경계 정렬·제약 충족) 하이브리드. 스케매틱 → 상세 설계 단계를 연결.",
        input: "Bubble layout result, constraints, boundaries, diagram links/zones",
        inputKo: "버블 배치 결과, 제약, 경계, 다이어그램 링크/존",
        output: "Rectangular room layout with placed coordinates",
        outputKo: "배치 좌표가 매핑된 직사각형 실 레이아웃",
      },
    ],
  },
  {
    slug: "etf-smart-manager",
    name: "ETF Smart Manager",
    category: "other",
    type: "Full-Stack Trading Platform",
    typeKo: "풀스택 트레이딩 플랫폼",
    description:
      "AI-based ETF auto-trading system with 4-stage analysis pipeline: macro scanning, chart analysis, ETF evaluation, and synthesis.",
    descriptionKo:
      "AI 기반 ETF 자동매매 시스템. 4단계 분석 파이프라인: 매크로 스캐닝, 차트 분석, ETF 평가, 종합 판단.",
    detail:
      "Applies the same systematic, multi-stage AI pipeline approach from architectural design to financial markets. The 4-stage pipeline scans macro indicators, analyzes chart patterns, evaluates individual ETFs, then synthesizes a trading decision. Built with Next.js frontend and FastAPI backend, using Claude for each analysis stage.",
    detailKo:
      "건축설계의 체계적 다단계 AI 파이프라인 접근법을 금융 시장에 적용. 4단계 파이프라인이 매크로 지표를 스캔하고, 차트 패턴을 분석하고, 개별 ETF를 평가한 뒤 매매 결정을 종합합니다. Next.js 프론트엔드와 FastAPI 백엔드로 구축, 각 분석 단계에서 Claude를 활용.",
    techStack: ["Next.js", "FastAPI", "Claude API", "Zustand", "TailwindCSS"],
    metrics: [{ label: "Analysis Stages", value: "4" }],
    status: "active",
    images: [
      "/projects/etf-smart-manager/screenshot-1.png",
      "/projects/etf-smart-manager/screenshot-2.png",
      "/projects/etf-smart-manager/screenshot-3.png",
    ],
  },
  {
    slug: "hub-website",
    name: "hub-website",
    category: "web",
    type: "Marketing Site",
    typeKo: "소개 웹사이트",
    description:
      "Public-facing information site introducing the \"Archflow\" system to potential users and stakeholders.",
    descriptionKo:
      "\"Archflow\" 시스템을 잠재 사용자와 이해관계자에게 소개하는 공개 정보 사이트.",
    detail:
      "A clean, informational site built to explain the \"Archflow\" ecosystem to non-technical audiences. Covers the 9-phase pipeline, MCP server architecture, and use cases for architectural firms. Built with Next.js 15 and TailwindCSS.",
    detailKo:
      "비기술 대상자에게 \"Archflow\" 에코시스템을 설명하기 위한 깔끔한 정보 사이트. 9단계 파이프라인, MCP 서버 아키텍처, 건축사무소 활용 사례를 다룹니다. Next.js 15와 TailwindCSS로 구축.",
    techStack: ["Next.js 15", "React 19", "TailwindCSS"],
    status: "production",
    images: [
      "/projects/hub-website/screenshot-1.png",
      "/projects/hub-website/screenshot-2.png",
    ],
  },
  {
    slug: "arch-work-hub",
    name: "arch-work-hub",
    category: "web",
    type: "Dashboard SPA",
    typeKo: "대시보드 SPA",
    description:
      "Project progress dashboard. Real-time monitoring of all \"Archflow\" ecosystem components and pipeline status.",
    descriptionKo:
      "프로젝트 진행 대시보드. \"Archflow\" 에코시스템 전체 컴포넌트와 파이프라인 상태를 실시간 모니터링.",
    detail:
      "A React SPA that provides a real-time overview of all running \"Archflow\" components. Shows pipeline execution status, server health, task queues, and completion metrics. Built with Vite for fast development and Zustand for state management.",
    detailKo:
      "실행 중인 모든 \"Archflow\" 컴포넌트의 실시간 개요를 제공하는 React SPA. 파이프라인 실행 상태, 서버 상태, 작업 대기열, 완료 메트릭을 표시합니다. Vite로 빠른 개발, Zustand로 상태 관리.",
    techStack: ["React 19", "Vite 7", "Zustand", "TailwindCSS"],
    status: "active",
    video: "/projects/arch-work-hub/video.mp4",
    images: [
      "/projects/arch-work-hub/screenshot-1.png",
      "/projects/arch-work-hub/screenshot-2.png",
    ],
  },

  // ── App ──
  {
    slug: "arco-ai",
    name: "ARCO.AI",
    category: "app",
    type: "Architecture Copilot · Electron + 6 MCP Servers",
    typeKo: "건축사–AI 협업 오케스트레이터 · Electron + 자체제작 6 MCP",
    description:
      "Architecture Copilot — a Human-in-the-Loop AI orchestrator for the entire schematic design process. 9-stage automated pipeline driven by 6 in-house MCP servers (checklist, site, law, zoning, analysis, drawing) with 39 tools total, 47,225 building-code articles visualized as a 3D galaxy, and a patent-pending sunlight optimal-height analyzer (GREEN-T).",
    descriptionKo:
      "Architecture Copilot — 계획설계 전 과정을 함께 진행하는 건축사–AI 협업형 오케스트레이터. 자체제작 6개 MCP(checklist·site·law·zoning·analysis·drawing) 39개 도구로 9단계 자동 파이프라인을 구동하며, 47,225개 법조문을 3D 갤럭시로 시각화하고 일조환경 최적높이 특허(GREEN-T)를 통합했습니다.",
    detail:
      "ARCO.AI is the Architecture Copilot a single architect built in 3 months — over 100,000 lines of feature code, 6 self-authored MCP servers (39 tools total), and 9 pipeline stages bound into one Electron desktop app. Phase 1 parses 50–100 page design-guideline PDFs into a structured checklist (8h → 30min). Phase 2 turns NGII topographic ZIPs into a Rhino 3DM site model (1day → 15min). Phase 3 cross-validates Korean Building Act + 162 municipal ordinances through a 3-tier engine (법제처 API → local DB → AI fallback), reducing legal review by ~98% (days → minutes). Phase 4 generates an address-based regional humanities profile via KOSIS national statistics + Claude-synthesized narrative (v3.0 redesign — spatial analysis moved to site_model). The in-house GREEN-T sunlight Matrix algorithm (patent registration scheduled Aug 2026) plugs in for optimal-height analysis. Phase 5 generates floor-plan candidates with an 8-criteria self-correction loop (3–7days → 1–3days), with the architect making the final design decision. Phase 6 outputs AutoCAD DXF + Rhino 3DM. Architect approval is enforced at every stage — Human-in-the-Loop is structural, not optional. Currently 32% implemented; this video demoes the live prototype.",
    detailKo:
      "ARCO.AI는 건축가 단 한 명이 3개월 만에 만든 Architecture Copilot 입니다. 10만 줄이 넘는 기능 코드, 자체제작 6 MCP(39개 도구), 9단계 파이프라인을 단일 Electron 데스크톱 앱으로 통합했습니다.\n\n• Phase 1 (문서분석): 50~100쪽 설계지침서 PDF를 2단계 추출(토큰 30~50% 절감)로 체크리스트화 — 반나절~1일 → 30분.\n• Phase 2 (부지모델링): 국토지리정보원 수치지형도 ZIP을 Rhino 3DM 모델로 자동 변환 — 1일 → 15분.\n• Phase 3 (법규검토): 「건축법」 + 162개 지자체 조례를 3-tier 구조(법제처 API → 자체 DB → AI 폴백)로 교차 검증, 47,225개 법조문을 3D Galaxy로 탐색 — 1~3일 → 반나절 (98% 절감).\n• Phase 4 (대지분석): KOSIS 국가통계(196개 데이터 항목 매트릭스) + Claude AI 합성으로 주소 기반 지역 인문 내러티브 생성 (v3.0 재설계 — 공간 분석은 site_model 로 이전). 자사 부설기술연구소 친환경팀의 「일조환경 최적높이 Matrix 알고리즘」(GREEN-T, 2026.08 특허 등록 예정)이 최적높이 분석에 결합.\n• Phase 5 (조닝설계): AI가 8개 항목 자기 채점 + 70점 미만 시 재생성 루프로 평면 대안을 만들고, 건축가가 코어·실 배치 3가지 대안 중 선택하는 Wizard 협업 방식 — 3~7일 → 1~3일.\n• Phase 6 (도면생성): AutoCAD DXF + Rhino 3DM 출력 (arch-drawing-mcp, 현재 개발 중).\n\n모든 단계에서 건축가의 검토·승인 없이 다음 Phase로 넘어가지 않는 Human-in-the-Loop 구조가 강제됩니다. 현재 구현률 32%, 본 영상은 라이브 프로토타입 데모입니다.",
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
      { label: "In-house MCP Servers", value: "6", labelKo: "자체제작 MCP" },
      { label: "MCP Tools", value: "39", labelKo: "MCP 도구" },
      { label: "Implementation", value: "32%", labelKo: "현재 구현률" },
      { label: "Lines of Code", value: "100,000+", labelKo: "기능 코드 (3개월)" },
    ],
    status: "development",
    youtubeUrl: "https://youtu.be/z-mAS1ss7_k",
    // Local backup video; the YouTube iframe takes precedence on the detail
    // page. Folder name kept as `hub-app/` per migration plan §7.1 — only the
    // slug/name changed; physical assets stay in place to avoid a rename.
    video: "/projects/hub-app/video.mp4",
    images: [
      "/projects/hub-app/screenshot-1.png",
      "/projects/hub-app/screenshot-2.png",
    ],
  },
  {
    slug: "tomoonguidebot",
    name: "tomoonguidebot",
    category: "app",
    type: "AI Guide Bot · PWA",
    typeKo: "AI 업무가이드 봇 · PWA",
    description:
      "AI-powered internal company guide bot for Tomoon Architects. 6 department workflow categories with AI chatbot assistance, interactive form filling, and real-time task guidance.",
    descriptionKo:
      "토문건축 AI 업무가이드 봇. 6개 부서별 워크플로우 카테고리와 AI 챗봇 어시스턴트, 인터랙티브 서식 작성, 실시간 업무 안내.",
    detail:
      "An AI-integrated internal guide bot that streamlines company workflows at Tomoon Architects. The main interface presents 6 department categories — IT Support, Building Permits, Overseas Projects, HR & Benefits, Project Management, and Corporate Strategy — each containing step-by-step workflow guides. An AI chatbot assistant on the right panel provides real-time guidance, answering questions and walking users through complex processes like project registration forms. The left sidebar organizes content by teams (Business Management, HR, Education, etc.) with a suggestion box for employee feedback. Built as an installable PWA for offline access on any device.",
    detailKo:
      "토문건축의 사내 업무를 효율화하는 AI 통합 업무가이드 봇. 메인 화면에 IT지원, 건축허가, 해외/공수, 인사/복지관리, 프로젝트관리, 사내전략/경영관리 6개 부서 카테고리를 제공하며, 각 카테고리에 단계별 워크플로우 가이드가 포함되어 있습니다. 오른쪽 패널의 AI 챗봇 어시스턴트가 실시간으로 업무 안내를 제공하고, 프로젝트 등록신청서 등 복잡한 서식 작성을 단계별로 안내합니다. 좌측 사이드바에서 팀별(사업관리팀, 인사팀, 교육 등) 콘텐츠를 정리하고 건의함을 통해 직원 피드백을 수집합니다. 오프라인 접근을 위한 설치형 PWA.",
    techStack: ["Vanilla JS", "Service Worker", "PWA", "Claude API"],
    metrics: [
      { label: "Workflow Categories", value: "6", labelKo: "워크플로우 카테고리" },
    ],
    status: "production",
    video: "/projects/tomoonguidebot/video.mp4",
    images: [
      "/projects/tomoonguidebot/screenshot-1.png",
      "/projects/tomoonguidebot/screenshot-2.png",
    ],
  },

  // ── MCP ──
  {
    slug: "arch-law-mcp",
    name: "arch-law-mcp",
    category: "mcp",
    type: "MCP Server · Building Code Ontology",
    typeKo: "MCP 서버 · 건축법규 온톨로지",
    description:
      "Ontology-driven building code knowledge base. Korean architectural regulations structured as a semantic graph — 162 municipal ordinances, zoning hierarchies, and legal relationships encoded into a queryable SQLite database with national law API integration.",
    descriptionKo:
      "온톨로지 기반 건축법규 지식 베이스. 한국 건축 규정을 시맨틱 그래프로 구조화 — 162개 지자체 조례, 용도지역 계층 구조, 법률 관계를 쿼리 가능한 SQLite 데이터베이스로 인코딩하고 국가법령정보센터 API와 연동.",
    detail:
      "The most data-intensive MCP server in the ecosystem, built on a domain ontology that models Korean building regulations as structured knowledge rather than raw text. The ontology defines formal relationships between legal concepts — how zoning classifications cascade into floor area ratios, how building coverage limits depend on use types, how setback rules reference parent statutes. This semantic structure lets AI agents reason about regulatory constraints instead of just searching keywords. The SQLite database indexes 162 municipal ordinances with FTS5 full-text search, while the national law API (법제처) provides real-time access to legal precedents and statute amendments. Every jurisdiction in South Korea is covered — from metropolitan cities to rural counties — each with its own regulatory parameter set.",
    detailKo:
      "에코시스템에서 가장 데이터 집약적인 MCP 서버로, 한국 건축 규정을 원문 텍스트가 아닌 구조화된 지식으로 모델링하는 도메인 온톨로지 위에 구축되었습니다. 온톨로지는 법률 개념 간의 형식적 관계를 정의합니다 — 용도지역 분류가 용적률로 연쇄되는 방식, 건폐율 제한이 용도 유형에 의존하는 방식, 이격거리 규정이 상위 법령을 참조하는 방식 등. 이 시맨틱 구조 덕분에 AI 에이전트가 단순 키워드 검색이 아닌 규제 제약 조건에 대한 추론이 가능합니다. SQLite 데이터베이스는 162개 지자체 조례를 FTS5 전문 검색으로 인덱싱하고, 법제처 API는 판례와 법령 개정 사항에 실시간으로 접근합니다. 광역시부터 군 단위까지 대한민국 전 관할구역을 커버하며, 각각 고유한 규제 파라미터 세트를 갖습니다.",
    techStack: ["TypeScript", "MCP SDK", "SQLite", "FTS5", "법제처 DRF API"],
    metrics: [
      { label: "Tools", value: "15", labelKo: "도구" },
      { label: "Ordinances", value: "162", labelKo: "지자체 조례" },
      { label: "Supplementary Laws", value: "83+", labelKo: "짜투리 법령" },
    ],
    status: "production",
    tools: [
      {
        name: "search_municipality_laws",
        description: "Lists all building-related statutes for a given municipality — national laws, provincial ordinances, and city/county ordinances combined. Returns instantly without API calls, using the local jurisdiction database.",
        descriptionKo: "지자체별 적용 건축법규를 조회합니다. 국가법령 + 도 조례 + 시/군 조례 전체 목록을 반환. API 호출 없이 즉시 응답합니다.",
        input: "Municipality code or name",
        inputKo: "지자체 코드 또는 명칭",
        output: "Categorized list of applicable statutes (national / provincial / municipal)",
        outputKo: "적용 법규 분류 목록 (국가 / 광역 / 시군구)",
      },
      {
        name: "get_building_law",
        description: "Fetches articles from national building statutes — Building Act, Enforcement Decree, National Land Planning Act, Parking Lot Act. Returns full text or specific articles via the law.go.kr DRF API.",
        descriptionKo: "국가 건축법령의 조문을 조회합니다. 건축법, 건축법 시행령, 국토계획법, 주차장법 등을 검색하고 전체 또는 특정 조문을 반환.",
        input: "Law name, optional article number",
        inputKo: "법령명, 조문 번호(선택)",
        output: "Full statute or specific article text with metadata",
        outputKo: "전체 법령 또는 특정 조문 본문 + 메타데이터",
      },
      {
        name: "get_local_ordinance",
        description: "Retrieves articles from a specific municipal ordinance. Use search_municipality_laws first to confirm the ordinance name, then this tool returns full text or specific articles.",
        descriptionKo: "지방 건축조례의 조문을 조회합니다. 조례명으로 검색하여 전체 또는 특정 조문을 반환. search_municipality_laws로 조례명을 먼저 확인.",
        input: "Ordinance name, optional article number",
        inputKo: "조례명, 조문 번호(선택)",
        output: "Full ordinance or specific article text",
        outputKo: "전체 조례 또는 특정 조문 본문",
      },
      {
        name: "check_far_coverage",
        description: "Checks Floor Area Ratio (용적률) and Building Coverage Ratio (건폐율) limits. Combines National Land Planning Act ceiling values with the municipality's actual urban planning ordinance values.",
        descriptionKo: "용적률/건폐율을 확인합니다. 국토계획법 상한 기준과 해당 지자체 도시계획조례의 실제 기준을 함께 조회.",
        input: "Municipality, zoning classification",
        inputKo: "지자체, 용도지역",
        output: "FAR/BCR limits with statutory references (national + local)",
        outputKo: "용적률·건폐율 한도 + 법적 근거 (국가법 + 조례)",
      },
      {
        name: "check_setback",
        description: "Checks building line setback (건축선 후퇴) and boundary distance (이격거리) requirements per Building Act Articles 46–47, plus additional municipality-specific setback rules from local building ordinances.",
        descriptionKo: "건축선 후퇴 및 이격거리를 확인합니다. 건축법 제46~47조 기준과 해당 지자체 건축조례의 추가 기준을 조회.",
        input: "Municipality, boundary types (road / adjacent lot / etc.)",
        inputKo: "지자체, 경계 유형 (도로 / 인접대지 등)",
        output: "Setback distances per boundary type with article citations",
        outputKo: "경계 유형별 이격 거리 + 조문 인용",
      },
      {
        name: "check_parking",
        description: "Checks attached parking installation requirements per the Parking Lot Act and the municipality's parking ordinance. Returns required spaces by use type, accessible/EV/female-priority breakdowns, and exemption rules.",
        descriptionKo: "주차장 설치 기준을 확인합니다. 주차장법 기준과 해당 지자체 주차장 조례의 부설주차장 설치기준을 조회.",
        input: "Municipality, building use, total floor area",
        inputKo: "지자체, 건물 용도, 연면적",
        output: "Required parking count, segmentation, and exemption rules",
        outputKo: "필요 주차 대수, 세분화 기준, 면제 규정",
      },
      {
        name: "check_height_limit",
        description: "Checks building height limits and daylight oblique-line restrictions (일조권 사선제한) per Building Act Articles 60–61. Combines national rules with local urban planning and building ordinance height limits.",
        descriptionKo: "건축물 높이제한과 일조권 사선제한을 확인합니다. 건축법 제60~61조 기준과 해당 지자체 도시계획조례/건축조례의 높이 관련 기준을 조회.",
        input: "Municipality, zoning, building parameters",
        inputKo: "지자체, 용도지역, 건축 파라미터",
        output: "Height limit values + sunlight restriction formulas with citations",
        outputKo: "높이 한도 + 일조권 사선 산정식 + 조문 인용",
      },
      {
        name: "check_landscape",
        description: "Checks landscape-related regulations — Landscape Act standards plus the municipality's landscape ordinance covering design review, color palettes, height in specific districts, and landscape committee requirements.",
        descriptionKo: "경관 관련 규정을 확인합니다. 경관법 기준과 해당 지자체 경관조례의 경관심의, 색채, 높이 등 관련 기준을 조회.",
        input: "Municipality, district type",
        inputKo: "지자체, 지구 유형",
        output: "Landscape review triggers, color/material rules, height in landscape districts",
        outputKo: "경관 심의 대상 여부, 색채/재료 규정, 경관지구 높이 기준",
      },
      {
        name: "search_precedents",
        description: "Searches court precedents related to building law — building permits, FAR disputes, daylight rights, setback conflicts. Returns case summaries with court rulings and cited statutes.",
        descriptionKo: "건축 관련 판례를 검색합니다. 건축허가, 용적률, 일조권, 이격거리 등 키워드로 관련 판례를 찾습니다.",
        input: "Search keywords, optional date range",
        inputKo: "검색 키워드, 날짜 범위(선택)",
        output: "Precedent summaries with court rulings and statute citations",
        outputKo: "법원 판결과 인용 법령이 포함된 판례 요약",
      },
      {
        name: "compliance_report",
        description: "Generates a comprehensive code compliance report — runs FAR/BCR, height, setback, parking, and landscape checks in one call and consolidates results into a single structured report.",
        descriptionKo: "종합 법규 적합성 보고서를 생성합니다. 용적률/건폐율, 높이제한, 건축선, 주차장, 경관 등을 한 번에 조회하여 종합 보고서를 반환.",
        input: "Project parameters (municipality, zoning, use, dimensions)",
        inputKo: "프로젝트 파라미터 (지자체, 용도지역, 용도, 치수)",
        output: "Consolidated compliance report covering all 5 core domains",
        outputKo: "5개 핵심 영역의 통합 적합성 보고서",
      },
      {
        name: "generate_pre_design_checklist",
        description: "Auto-generates a pre-design legal checklist. Filters items by use classification (29 categories per Enforcement Decree Annex 1), queries applicable standards via the law.go.kr API, and exports as Excel (.xlsx).",
        descriptionKo: "설계 전 법규 검토 체크리스트를 자동 생성합니다. 건축법 시행령 별표1 기반 29개 용도 분류에 따라 기초/규모별/용도별/지역별 검토항목을 필터링하고, 법제처 API로 적용기준을 조회하며, Excel(.xlsx) 파일로 내보냅니다.",
        input: "Use classification, project scale, region",
        inputKo: "용도 분류, 사업 규모, 지역",
        output: "Filtered checklist with applicable standards, exported as .xlsx",
        outputKo: "적용 기준이 포함된 필터링 체크리스트, .xlsx 내보내기",
      },
      {
        name: "search_supplementary_laws",
        description: "Searches the ~83 supplementary laws often referenced in building permits — Mountain Management Act, Fire Service Act, Disabled Persons Convenience Act, etc. Useful for finding niche regulations beyond the core building code.",
        descriptionKo: "건축허가 시 확인이 필요한 관련 법령(~83개)을 키워드/카테고리로 검색합니다. 산지관리법, 소방법, 장애인 관련법 등 짜투리 법령을 찾을 때 사용.",
        input: "Search keywords, optional category filter",
        inputKo: "검색 키워드, 카테고리 필터(선택)",
        output: "Matching supplementary laws with brief descriptions",
        outputKo: "일치하는 짜투리 법령과 간략 설명",
      },
      {
        name: "search_regulations",
        description: "Natural-language search of building code articles. Uses the FTS5 index of the ontology DB to find relevant articles from queries like '용적률', '일조권 사선' without exact statute knowledge.",
        descriptionKo: "건축법규 조문 내용을 키워드로 검색합니다. 온톨로지 DB의 FTS5 인덱스를 활용하여 '용적률', '일조권 사선' 등 자연어 키워드로 관련 조문을 찾습니다.",
        input: "Natural-language query",
        inputKo: "자연어 쿼리",
        output: "Ranked articles matching the query with FTS5 relevance scores",
        outputKo: "FTS5 관련도 점수 기반 일치 조문 순위",
      },
      {
        name: "find_related_regulations",
        description: "Graph-traverses cross-references and delegations from a starting article to find connected regulations. Tracks delegation chains like Building Act Art. 61 → its enforcement decree articles → related ordinance clauses.",
        descriptionKo: "특정 조문에서 출발하여 교차참조/위임 관계로 연결된 관련 조문을 그래프 탐색으로 찾습니다. 건축법 제61조의 위임 체인, 관련 시행령 조문 등을 추적.",
        input: "Starting article (law name + article number)",
        inputKo: "시작 조문 (법령명 + 조문 번호)",
        output: "Connected articles via delegation/cross-reference graph",
        outputKo: "위임/교차참조 그래프로 연결된 조문",
      },
      {
        name: "get_detailed_requirements",
        description: "Retrieves detailed specification data from the built-in Knowledge Base — parking sub-categories (accessible/EV/female-priority), accessibility facilities (Annex 1), evacuation stair specs, elevator standards, and height/setback formulas. Returns instantly without API calls.",
        descriptionKo: "내장 Knowledge Base에서 상세 규격 데이터를 조회합니다. 주차 세분화(장애인/전기차/여성우선), 장애인 편의시설(별표1), 피난계단/직통계단 규격, 승강기 설치기준, 높이/이격거리 산정 공식 등을 반환. API 호출 없이 즉시 응답.",
        input: "Topic key (e.g., 'parking_disabled', 'evacuation_stair', 'elevator')",
        inputKo: "주제 키 (예: 'parking_disabled', 'evacuation_stair', 'elevator')",
        output: "Detailed specifications, formulas, and reference table data",
        outputKo: "상세 규격, 산정 공식, 참조 표 데이터",
      },
    ],
  },
  {
    slug: "arch-analysis-mcp",
    name: "arch-analysis-mcp",
    category: "mcp",
    type: "MCP Server · KOSIS Statistics + Humanities Narrative",
    typeKo: "MCP 서버 · KOSIS 통계 + 지역 인문 내러티브",
    description:
      "Address-based regional humanities profiling engine (v3.0, 2026-04-22 redesign). Pulls KOSIS national statistics (196-item building-use matrix) for the project's municipality, then synthesizes a one-paragraph 'regional portrait' the architect reads before designing — combining demographics, household composition, cultural context. Claude AI generates the narrative, with rule-based fallback for stability.",
    descriptionKo:
      "주소 기반 지역 인문 프로필링 엔진 (v3.0, 2026-04-22 재설계). 프로젝트 지자체의 KOSIS 국가통계(건물 용도별 196개 데이터 항목)를 끌어와, 건축가가 설계 전에 읽을 한 문단의 '지역 초상'을 합성합니다. 인구·가구 구성·문화 맥락을 결합하며, Claude AI가 내러티브를 생성하고 안정성을 위한 규칙 기반 폴백을 갖춥니다.",
    detail:
      "v3.0 redesign focused on what AI does best — synthesizing demographic and cultural context into design-relevant insight. The 9 spatial analyzers (terrain/climate/context/...) were removed because the SiteAgent now repackages site_model output directly; spatial analysis is no longer Phase 2's responsibility. What remains is high-leverage: 196 KOSIS data items curated per building use type (residential prioritizes household composition, commercial prioritizes traffic flow, healthcare prioritizes elderly population, etc.), automatic municipality-code resolution from any Korean address, and a humanities narrator that turns raw statistics into a designer-readable paragraph. The narrator follows strict prompt rules — cite numbers but don't editorialize, write as objective description not opinion, adapt perspective based on building use. Outputs include a summary, use-perspective interpretation, and evidence bullets so architects can verify every claim. Phase C extension (cultural heritage + tourism APIs) is reserved but currently empty.",
    detailKo:
      "v3.0 재설계 — AI가 가장 잘하는 일(통계와 문화 맥락을 설계용 인사이트로 합성)에 집중. 9개 공간 분석기(지형/기후/주변환경/...)는 SiteAgent가 site_model 출력을 직접 재포장하게 되면서 제거됐습니다 — 공간 분석은 더 이상 Phase 2의 책임이 아닙니다. 남은 것은 고부가가치 영역입니다: 건물 용도별로 큐레이션된 196개 KOSIS 데이터 항목(주거는 가구 구성, 상업은 유동인구, 의료는 고령 인구 등 우선순위), 한국 주소에서 시군구 코드 자동 변환, 그리고 raw 통계를 건축가가 읽을 수 있는 한 문단으로 변환하는 인문 내러티브 생성기. 내러티브 생성기는 엄격한 프롬프트 규칙을 따릅니다 — 수치 인용은 하되 해석은 하지 않고, 의견이 아닌 객관 서술, 건물 용도에 따라 관점 적응. 출력은 summary + 용도별 관점 해석 + evidence bullets로 구성되어 건축가가 모든 주장을 검증할 수 있습니다. Phase C 확장(문화재청·관광 API)은 예약돼 있으나 현재 빈 리스트.",
    techStack: ["Python 3.11", "FastMCP", "Pydantic v2", "KOSIS API", "VWorld API", "Claude API"],
    metrics: [
      { label: "Tools", value: "3", labelKo: "도구" },
      { label: "KOSIS Items", value: "196", labelKo: "KOSIS 데이터 항목" },
      { label: "Building Uses", value: "20+", labelKo: "건물 용도" },
      { label: "Version", value: "v3.0", labelKo: "버전" },
    ],
    status: "production",
    tools: [
      {
        name: "get_kosis_data_matrix",
        description: "Returns a built-in matrix of KOSIS data items available for a given building use type — filtered by priority (1=must-have, 2=recommended, 3=optional). 196 items across all use types. No API calls — instant response from in-memory matrix.",
        descriptionKo: "건물 용도별 조회 가능한 KOSIS 데이터 항목 목록을 반환합니다. 우선순위 필터(1=필수, 2=권장, 3=선택), 모든 용도 합쳐 196개 항목. API 호출 없이 메모리 매트릭스에서 즉시 응답.",
        input: "Building use type, optional minimum priority (1-3)",
        inputKo: "건물 용도, 최소 우선순위(선택, 1-3)",
        output: "Filtered list of KOSIS data items with metadata (statistic ID, category, granularity)",
        outputKo: "메타데이터(통계 ID, 카테고리, 세분도)가 포함된 필터링 KOSIS 데이터 항목 목록",
      },
      {
        name: "fetch_kosis_data",
        description: "Fetches actual KOSIS statistical values via API. Auto-resolves Korean address to 5-digit municipality code for area-specific queries. Combines selected items + common items into a unified dataset for design-decision support.",
        descriptionKo: "KOSIS API로 실제 통계 값을 조회합니다. 한국 주소 → 시군구코드(5자리) 자동 변환으로 지역별 쿼리. 선택 항목 + 공통 항목을 통합 데이터셋으로 결합해 설계 의사결정 지원.",
        input: "Address, optional building use, selected items, include_common, year",
        inputKo: "주소, 건물 용도(선택), 선택 항목, include_common, 연도",
        output: "Unified KOSIS dataset with statistical values keyed by item code",
        outputKo: "항목 코드별 통계 값이 포함된 통합 KOSIS 데이터셋",
      },
      {
        name: "generate_humanities_narrative",
        description: "Generates a one-paragraph 'regional portrait' for the site. Combines KOSIS regional profile + selected statistical items + (Phase C reserved) cultural heritage and tourism APIs, then synthesizes via Claude AI into a designer-readable narrative. Falls back to rule-based template if AI is unavailable, preserving numerical evidence either way. Adapts perspective per building use (residential / commercial / healthcare / education / cultural / accommodation).",
        descriptionKo: "대지의 한 문단 '지역 초상'을 생성합니다. KOSIS 지역 프로파일 + 선택 통계 항목 + (Phase C 예약) 문화재·관광 API를 결합하여 Claude AI로 건축가가 읽을 수 있는 내러티브로 합성. AI 사용 불가 시 규칙 기반 템플릿으로 폴백하되 수치 근거는 양쪽 모두 보존. 건물 용도별로 관점을 적응(주거 / 상업 / 의료 / 교육 / 문화 / 숙박).",
        input: "Address, building use, optional KOSIS selected items",
        inputKo: "주소, 건물 용도, KOSIS 선택 항목(선택)",
        output: "summary + use_perspective + evidence_bullets + source ('ai' or 'rule_based_fallback')",
        outputKo: "summary + 용도별 관점 해석 + evidence_bullets + source ('ai' 또는 'rule_based_fallback')",
      },
    ],
  },
  {
    slug: "arch-checklist-mcp",
    name: "arch-checklist-mcp",
    category: "mcp",
    type: "MCP Server · AI Document Analysis",
    typeKo: "MCP 서버 · AI 문서분석",
    description:
      "The pipeline's entry point. Ingests architectural competition briefs (50-200 page PDFs) and uses Claude AI to decompose them into structured, machine-readable requirements — site constraints, spatial programs, evaluation criteria, and referenced regulations — that drive every downstream phase.",
    descriptionKo:
      "파이프라인의 진입점. 건축 설계공모 지침서(50-200페이지 PDF)를 입력받아 Claude AI로 구조화된 기계 판독 가능 요구사항으로 분해 — 대지 조건, 공간 프로그램, 심사 기준, 참조 법규 — 이 데이터가 모든 후속 단계를 구동합니다.",
    detail:
      "Every \"Archflow\" pipeline run begins here. Competition briefs are dense, unstructured documents mixing legal language, spatial requirements, submission rules, and evaluation criteria across hundreds of pages. This server uses pdfplumber to extract text with layout awareness (preserving tables, headers, and section hierarchy), then sends the content through Claude AI for semantic decomposition. The AI identifies and categorizes every requirement — distinguishing mandatory constraints from preferences, quantitative targets from qualitative guidelines, and explicit rules from implied expectations. It also detects cross-references between sections and extracts all cited laws and standards (building code articles, fire safety regulations, accessibility standards) for downstream legal compliance checking. The structured output becomes the single source of truth that all subsequent pipeline phases reference.",
    detailKo:
      "모든 \"Archflow\" 파이프라인 실행은 여기서 시작됩니다. 설계공모 지침서는 법률 용어, 공간 요구사항, 제출 규칙, 심사 기준이 수백 페이지에 걸쳐 혼재된 비정형 문서입니다. pdfplumber로 레이아웃을 인식하며 텍스트를 추출(표, 제목, 섹션 계층 보존)한 뒤, Claude AI를 통해 의미론적 분해를 수행합니다. AI는 모든 요구사항을 식별하고 분류 — 필수 제약과 선호 사항, 정량적 목표와 정성적 가이드라인, 명시적 규칙과 암묵적 기대를 구분합니다. 또한 섹션 간 교차 참조를 감지하고 인용된 모든 법령과 기준(건축법 조문, 소방 규정, 접근성 기준)을 추출하여 후속 법규 준수 검사에 활용합니다. 구조화된 출력은 모든 후속 파이프라인 단계가 참조하는 단일 진실 소스(single source of truth)가 됩니다.",
    techStack: ["Python", "FastMCP", "pdfplumber", "Anthropic SDK", "openpyxl"],
    metrics: [
      { label: "Tools", value: "6", labelKo: "도구" },
    ],
    status: "production",
    tools: [
      {
        name: "analyze_pdfs",
        description: "Extracts text and table data from architectural competition brief PDFs. Uses pdfplumber for layout-aware extraction — preserving tables, headers, and section hierarchy across 50–200 page documents.",
        descriptionKo: "PDF 파일에서 텍스트와 표 데이터를 추출합니다. pdfplumber로 레이아웃을 인식하며 50-200페이지 문서의 표·제목·섹션 계층을 보존.",
        input: "List of PDF file paths",
        inputKo: "PDF 파일 경로 리스트",
        output: "Extracted text + structured table data per page",
        outputKo: "페이지별 추출 텍스트 + 구조화 표 데이터",
      },
      {
        name: "extract_checklist",
        description: "Sends document data through Claude AI for semantic decomposition into checklist items. Identifies mandatory constraints, preferences, quantitative targets, and qualitative guidelines — outputting a structured JSON checklist used by all downstream pipeline phases.",
        descriptionKo: "문서 데이터를 AI 분석하여 체크리스트 항목을 추출합니다. 필수 제약·선호·정량 목표·정성 가이드를 식별하여 후속 파이프라인이 사용하는 구조화 JSON 체크리스트로 출력.",
        input: "Documents JSON (output from analyze_pdfs)",
        inputKo: "문서 JSON (analyze_pdfs 출력)",
        output: "Structured checklist (mandatory / preferences / targets / guidelines)",
        outputKo: "구조화 체크리스트 (필수 / 선호 / 목표 / 가이드)",
      },
      {
        name: "validate_checklist",
        description: "Validates the extracted checklist for consistency. Detects conflicting requirements, duplicate entries, missing critical items, and ambiguous specifications — surfacing issues before they propagate downstream.",
        descriptionKo: "체크리스트 데이터를 검증하고 상충/중복을 탐지합니다. 모순된 요구사항, 중복 항목, 누락된 핵심 항목, 모호한 명세를 식별하여 후속 단계 전 이슈를 노출.",
        input: "Checklist JSON (output from extract_checklist)",
        inputKo: "체크리스트 JSON (extract_checklist 출력)",
        output: "Validation report with conflicts, duplicates, and missing items flagged",
        outputKo: "충돌·중복·누락 항목이 표시된 검증 보고서",
      },
      {
        name: "extract_area_table",
        description: "Extracts spatial program tables (요구 시설면적표) from the document. Identifies room/zone names, required areas, ceiling heights, and special requirements per space — outputting a clean spreadsheet-ready dataset.",
        descriptionKo: "문서에서 시설면적 데이터를 추출합니다. 실/존 이름, 요구 면적, 천장고, 공간별 특수 요구사항을 식별해 스프레드시트로 바로 사용 가능한 데이터셋 출력.",
        input: "Documents JSON (output from analyze_pdfs)",
        inputKo: "문서 JSON (analyze_pdfs 출력)",
        output: "Structured area table — room/zone, area, height, special needs",
        outputKo: "구조화 면적표 — 실/존, 면적, 천장고, 특수 요구사항",
      },
      {
        name: "run_analysis_pipeline",
        description: "One-call full pipeline executor — runs analyze_pdfs → extract_checklist → validate_checklist → extract_area_table in sequence. Returns a master_data.json file consolidating all outputs for downstream consumption.",
        descriptionKo: "PDF → 체크리스트 추출 → 검증 → 면적표 추출 전체 파이프라인을 실행합니다. 모든 출력을 통합한 master_data.json을 반환하여 후속 단계에서 사용.",
        input: "List of PDF file paths",
        inputKo: "PDF 파일 경로 리스트",
        output: "master_data.json with checklist + area table + validation results",
        outputKo: "체크리스트 + 면적표 + 검증 결과 통합 master_data.json",
      },
      {
        name: "generate_excel",
        description: "Generates 4 Excel checklist files from master_data.json — split by major category (site / program / submission / regulatory). Outputs ready-to-share .xlsx files with styled formatting.",
        descriptionKo: "master_data.json으로부터 대분류별 4개 Excel 체크리스트 파일을 생성합니다 (대지 / 프로그램 / 제출물 / 법규). 스타일링된 .xlsx 파일을 즉시 공유 가능한 형태로 출력.",
        input: "master_data.json content, output directory path",
        inputKo: "master_data.json 내용, 출력 디렉토리 경로",
        output: "4 styled .xlsx files (one per major category)",
        outputKo: "4개 스타일링 .xlsx 파일 (대분류별)",
      },
    ],
  },
  {
    slug: "arch-site-mcp",
    name: "arch-site-mcp",
    category: "mcp",
    type: "MCP Server · 3D Site Modeling",
    typeKo: "MCP 서버 · 3D 대지 모델링",
    description:
      "Bridges the gap between 2D geospatial data and 3D architectural modeling. Converts GIS survey data, DEM elevation rasters, and cadastral boundaries into Rhino-compatible 3D site models — terrain meshes, legal setback surfaces, and contextual building volumes — with a built-in PyQt5 preview for visual QA.",
    descriptionKo:
      "2D 지리공간 데이터와 3D 건축 모델링 사이의 간극을 연결합니다. GIS 측량 데이터, DEM 표고 래스터, 지적 경계를 Rhino 호환 3D 대지 모델로 변환 — 지형 메쉬, 법적 이격면, 주변 건물 볼륨 — PyQt5 미리보기로 시각적 QA 내장.",
    detail:
      "Architectural design requires working in 3D, but site data arrives as flat GIS coordinates, elevation rasters, and cadastral boundaries. This server automates the conversion pipeline: DEM data becomes triangulated terrain meshes with accurate elevation mapping, cadastral polygons become 3D boundary surfaces with per-edge setback offsets computed from arch-law-mcp's zoning parameters, and surrounding buildings from GIS databases become simplified massing volumes with floor-count metadata for shadow and context studies. All geometry is generated using rhino3dm (the open-source Rhino file format library), producing standard .3dm files that architects can open directly in Rhino or import into any BIM tool. The built-in PyQt5 viewer provides interactive orbit, pan, and zoom for visual verification before committing outputs to the pipeline.",
    detailKo:
      "건축설계는 3D로 작업해야 하지만, 대지 데이터는 2D GIS 좌표, 표고 래스터, 지적 경계로 도착합니다. 이 서버는 변환 파이프라인을 자동화합니다: DEM 데이터는 정확한 표고 매핑의 삼각 지형 메쉬로, 지적 폴리곤은 arch-law-mcp의 조닝 파라미터로 계산된 변별 이격 오프셋이 적용된 3D 경계면으로, GIS 데이터베이스의 주변 건물은 그림자 및 컨텍스트 스터디를 위한 층수 메타데이터가 포함된 간략화된 매싱 볼륨으로 변환됩니다. 모든 지오메트리는 rhino3dm(오픈소스 Rhino 파일 형식 라이브러리)으로 생성되어 건축가가 Rhino에서 직접 열거나 BIM 도구로 가져올 수 있는 표준 .3dm 파일을 만듭니다. 내장 PyQt5 뷰어는 파이프라인에 출력을 전달하기 전 인터랙티브 궤도/팬/줌으로 시각적 검증을 제공.",
    techStack: ["Python", "FastMCP", "rhino3dm", "geopandas", "shapely", "VWorld API"],
    metrics: [
      { label: "Tools", value: "3", labelKo: "도구" },
      { label: "GIS Layers", value: "10+", labelKo: "GIS 레이어" },
    ],
    status: "production",
    tools: [
      {
        name: "list_layers",
        description: "Returns the catalog of supported GIS layers — buildings, roads, contours, water, vegetation, etc. — with each layer's NGII code, description, and default-enabled flag. Used as a discovery endpoint before generate_site_model.",
        descriptionKo: "사용 가능한 GIS 레이어 목록을 반환합니다 — 건물, 도로, 등고선, 수계, 식생 등. 각 레이어의 NGII 코드, 설명, 기본 활성화 여부를 포함. generate_site_model 전 발견용으로 사용.",
        input: "(no input)",
        inputKo: "(입력 없음)",
        output: "Layer catalog with code, description, and default-enabled flag",
        outputKo: "코드·설명·기본 활성화 여부가 포함된 레이어 카탈로그",
      },
      {
        name: "validate_zip",
        description: "Validates that uploaded ZIP files are valid NGII (국토지리정보원) digital topographic maps. Checks file existence, ZIP format integrity, and the presence of required .shp shapefiles inside.",
        descriptionKo: "ZIP 파일들이 유효한 NGII 수치지형도인지 검증합니다. 각 파일의 존재 여부, ZIP 포맷, 내부 .shp 파일 유무를 확인.",
        input: "List of ZIP file paths",
        inputKo: "ZIP 파일 경로 리스트",
        output: "Per-file validation result with .shp count and error details",
        outputKo: "파일별 검증 결과 + .shp 개수 + 오류 상세",
      },
      {
        name: "generate_site_model",
        description: "Converts NGII topographic ZIPs into a Rhino 3DM site model in 15 minutes. Handles building extrusion (floor-count based), road centerlines, contour terrain meshes, and water/vegetation context — all with reverse-geocoding via the VWorld API for site address resolution.",
        descriptionKo: "NGII 수치지형도 ZIP을 Rhino 3DM 대지 모델로 15분 내 변환합니다. 건물 익스트루전(층수 기반), 도로 중심선, 등고선 지형 메쉬, 수계·식생 컨텍스트를 처리하며, VWorld API 역지오코딩으로 대지 주소를 자동 해석.",
        input: "ZIP file paths, output directory, optional layer filter, VWorld API key",
        inputKo: "ZIP 파일 경로, 출력 디렉토리, 레이어 필터(선택), VWorld API 키",
        output: "Rhino 3DM site model with all enabled layers + reverse-geocoded address",
        outputKo: "활성 레이어가 포함된 Rhino 3DM 대지 모델 + 역지오코딩 주소",
      },
    ],
  },
  {
    slug: "arch-drawing-mcp",
    name: "arch-drawing-mcp",
    category: "mcp",
    type: "MCP Server · CAD Drawing Generation",
    typeKo: "MCP 서버 · CAD 도면 생성",
    description:
      "The pipeline's final output stage. Converts design data from upstream phases into production-ready architectural drawings — DXF floor plans with dimensioning, site plans with area tables, and layered 3DM models — following Korean architectural drawing standards and CAD conventions.",
    descriptionKo:
      "파이프라인의 최종 출력 단계. 상위 단계의 설계 데이터를 실무용 건축 도면으로 변환 — 치수가 표기된 DXF 평면도, 면적표가 포함된 배치도, 레이어 구조의 3DM 모델 — 한국 건축 도면 표준과 CAD 규약을 준수합니다.",
    detail:
      "Where the pipeline's analytical work becomes tangible output. This server takes the accumulated design data — zoning layouts from arch-zoning-mcp, site geometry from arch-site-mcp, and regulatory constraints from arch-law-mcp — and generates architectural drawings that conform to professional CAD standards. Floor plans include proper dimensioning chains, room labels with area callouts, door swing arcs, and wall thickness at the specified scale. Site plans incorporate legal boundary lines, setback indicators, building footprint with area calculations, parking layouts, and a north arrow with scale bar. The ezdxf library handles DXF generation with correct layer organization, line weights, and text styles that import cleanly into AutoCAD. For 3D deliverables, rhino3dm produces .3dm files with hierarchical layer structures matching architectural conventions (site, structure, envelope, interior). Currently in early development — expanding to include section drawings and elevation generation.",
    detailKo:
      "파이프라인의 분석 작업이 실체적 산출물로 변환되는 단계. arch-zoning-mcp의 조닝 레이아웃, arch-site-mcp의 대지 지오메트리, arch-law-mcp의 규제 제약 조건 등 축적된 설계 데이터를 전문 CAD 표준에 부합하는 건축 도면으로 생성합니다. 평면도에는 적절한 치수 체인, 면적 콜아웃이 포함된 실명, 문 스윙 호, 지정 축척의 벽 두께가 포함됩니다. 배치도에는 법적 경계선, 이격 표시, 면적 계산이 포함된 건물 풋프린트, 주차 레이아웃, 축척 바가 있는 방위표가 들어갑니다. ezdxf 라이브러리가 올바른 레이어 구성, 선 가중치, AutoCAD로 깔끔하게 임포트되는 텍스트 스타일로 DXF를 생성합니다. 3D 산출물의 경우 rhino3dm이 건축 관례(대지, 구조, 외피, 인테리어)에 맞는 계층적 레이어 구조의 .3dm 파일을 생산합니다. 현재 초기 개발 중 — 단면도 및 입면도 생성으로 확장 예정.",
    techStack: ["Python", "FastMCP", "ezdxf", "rhino3dm"],
    metrics: [
      { label: "Tools", value: "3", labelKo: "도구" },
    ],
    status: "development",
    tools: [
      {
        name: "generate_drawings",
        description: "Master drawing-generation tool. Takes zoning layout data and produces both DXF (2D plan) and 3DM (3D mass model) outputs in a single call. Format selection is configurable — output one or both with consistent layer organization.",
        descriptionKo: "조닝 결과를 입력받아 DXF 도면과 3DM 모델을 한 번에 생성하는 마스터 도구. 포맷 선택 가능 — 일관된 레이어 구성으로 둘 중 하나 또는 둘 다 출력.",
        input: "Zoning data (rooms + boundaries), output dir, optional formats list",
        inputKo: "조닝 데이터 (실 + 경계), 출력 디렉토리, 포맷 리스트(선택)",
        output: "DXF + 3DM file paths with metadata",
        outputKo: "DXF + 3DM 파일 경로 + 메타데이터",
      },
      {
        name: "generate_dxf_only",
        description: "Generates only the 2D DXF floor plan from zoning data. Useful when the architect already has a 3D model and needs only the dimensioned plan output for printing or AutoCAD work. Convenience wrapper over generate_drawings with format='dxf'.",
        descriptionKo: "조닝 데이터로 2D DXF 평면도만 생성합니다. 건축가가 이미 3D 모델을 보유하고 도면 출력만 필요한 경우(인쇄·AutoCAD 작업) 활용. generate_drawings(format='dxf')의 편의 래퍼.",
        input: "Zoning data, output directory",
        inputKo: "조닝 데이터, 출력 디렉토리",
        output: "DXF floor plan file path",
        outputKo: "DXF 평면도 파일 경로",
      },
      {
        name: "generate_model_only",
        description: "Generates only the Rhino 3DM 3D mass model from zoning data. Useful for architects who only need the 3D massing for further design work in Rhino or Grasshopper. Convenience wrapper over generate_drawings with format='3dm'.",
        descriptionKo: "조닝 데이터로 Rhino 3DM 3D 매스 모델만 생성합니다. Rhino/Grasshopper에서 추가 설계 작업을 위한 3D 매스만 필요한 경우 활용. generate_drawings(format='3dm')의 편의 래퍼.",
        input: "Zoning data, output directory",
        inputKo: "조닝 데이터, 출력 디렉토리",
        output: "Rhino 3DM mass model file path",
        outputKo: "Rhino 3DM 매스 모델 파일 경로",
      },
    ],
  },

  // ── Other ──
  {
    slug: "web-portfolio",
    name: "web-portfolio",
    category: "other",
    type: "This Site",
    typeKo: "이 사이트",
    description:
      "The site you're looking at. Personal portfolio with 3D hero, minimalist design.",
    descriptionKo:
      "지금 보고 있는 이 사이트. 3D 히어로와 미니멀 디자인의 개인 포트폴리오.",
    detail:
      "A minimalist portfolio site built with Next.js 15, Tailwind CSS, Three.js, and Framer Motion. Features a 3D nebula hero scene, dark/light theme toggle, and project detail pages with image and video showcases.",
    detailKo:
      "Next.js 15, Tailwind CSS, Three.js, Framer Motion으로 구축한 미니멀리스트 포트폴리오 사이트. 3D 성운 히어로 장면, 다크/라이트 테마 토글, 이미지 및 비디오 쇼케이스가 있는 프로젝트 상세 페이지를 제공합니다.",
    techStack: ["Next.js 15", "TailwindCSS", "Three.js", "Framer Motion"],
    status: "active",
  },
];

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categoryLabels: Record<ProjectCategory, string> = {
  web: "Web",
  app: "App",
  mcp: "MCP",
  other: "Other",
};

export const categoryDescriptions: Record<ProjectCategory, string> = {
  web: "Full-stack web applications and platforms",
  app: "Desktop and mobile applications",
  mcp: "Model Context Protocol servers for the \"Archflow\" ecosystem",
  other: "Miscellaneous projects",
};

export const categoryDescriptionsKo: Record<ProjectCategory, string> = {
  web: "풀스택 웹 애플리케이션 및 플랫폼",
  app: "데스크톱 및 모바일 애플리케이션",
  mcp: "\"Archflow\" 에코시스템을 위한 모델 컨텍스트 프로토콜 서버",
  other: "기타 프로젝트",
};

/**
 * Extracts the 11-char video ID from a YouTube URL. Handles short links
 * (`youtu.be/<id>`), watch URLs (`youtube.com/watch?v=<id>`), and embed URLs
 * (`youtube.com/embed/<id>`). If nothing matches, returns the input unchanged
 * so callers can decide how to fall back.
 */
export function extractYoutubeId(url: string): string {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/,
  );
  return match ? match[1] : url;
}
