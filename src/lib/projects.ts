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
      "The central nervous system of the TAI ecosystem. arch-hub coordinates 6 MCP servers through a 9-phase pipeline, from document analysis to drawing generation. Each phase uses Claude AI agents that run in parallel waves, cross-validate results, and stream progress via WebSocket. The frontend is a full Next.js 16 app with 59 React components, real-time phase monitoring, and interactive result views.",
    detailKo:
      "TAI 에코시스템의 중추 신경계. 6개 MCP 서버를 9단계 파이프라인으로 조율하여 문서 분석부터 도면 생성까지 수행합니다. 각 단계에서 Claude AI 에이전트가 병렬 웨이브로 실행되며, 교차 검증 후 WebSocket으로 실시간 진행 상황을 스트리밍합니다. 프론트엔드는 59개 React 컴포넌트로 구성된 Next.js 16 앱으로, 실시간 단계 모니터링과 인터랙티브 결과 뷰를 제공합니다.",
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
    techStack: ["Python", "FastAPI", "Claude AI", "SVG Canvas", "DXF"],
    metrics: [{ label: "Layout Engine", value: "AI" }],
    status: "production",
    video: "/projects/arch-zoning-mcp/video.mp4",
    images: [
      "/projects/arch-zoning-mcp/screenshot-1.png",
      "/projects/arch-zoning-mcp/screenshot-2.png",
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
      "Public-facing information site introducing the TAI system to potential users and stakeholders.",
    descriptionKo:
      "TAI 시스템을 잠재 사용자와 이해관계자에게 소개하는 공개 정보 사이트.",
    detail:
      "A clean, informational site built to explain the TAI ecosystem to non-technical audiences. Covers the 9-phase pipeline, MCP server architecture, and use cases for architectural firms. Built with Next.js 15 and TailwindCSS.",
    detailKo:
      "비기술 대상자에게 TAI 에코시스템을 설명하기 위한 깔끔한 정보 사이트. 9단계 파이프라인, MCP 서버 아키텍처, 건축사무소 활용 사례를 다룹니다. Next.js 15와 TailwindCSS로 구축.",
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
      "Project progress dashboard. Real-time monitoring of all TAI ecosystem components and pipeline status.",
    descriptionKo:
      "프로젝트 진행 대시보드. TAI 에코시스템 전체 컴포넌트와 파이프라인 상태를 실시간 모니터링.",
    detail:
      "A React SPA that provides a real-time overview of all running TAI components. Shows pipeline execution status, server health, task queues, and completion metrics. Built with Vite for fast development and Zustand for state management.",
    detailKo:
      "실행 중인 모든 TAI 컴포넌트의 실시간 개요를 제공하는 React SPA. 파이프라인 실행 상태, 서버 상태, 작업 대기열, 완료 메트릭을 표시합니다. Vite로 빠른 개발, Zustand로 상태 관리.",
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
    slug: "hub-app",
    name: "hub-app",
    category: "app",
    type: "Desktop App · Electron",
    typeKo: "데스크톱 앱 · Electron",
    description:
      "Electron desktop wrapper for arch-hub. Native Windows app with NSIS installer, bundling the full Next.js frontend.",
    descriptionKo:
      "arch-hub의 Electron 데스크톱 래퍼. NSIS 설치 프로그램을 포함한 네이티브 Windows 앱으로 Next.js 프론트엔드 번들링.",
    detail:
      "Packages the arch-hub web application as a native desktop experience. Built with Electron 34, it provides native window management, system tray integration, and automatic updates. The NSIS installer handles clean installation and uninstallation on Windows.",
    detailKo:
      "arch-hub 웹 애플리케이션을 네이티브 데스크톱 경험으로 패키징. Electron 34로 구축하여 네이티브 창 관리, 시스템 트레이 통합, 자동 업데이트를 제공합니다. NSIS 설치 프로그램이 Windows에서 설치/제거를 처리.",
    techStack: ["Electron 34", "TypeScript", "Next.js", "NSIS"],
    status: "production",
    images: [
      "/projects/hub-app/screenshot-1.png",
    ],
  },
  {
    slug: "tomoonguidebot",
    name: "tomoonguidebot",
    category: "app",
    type: "PWA",
    description:
      "Internal company guide. Task workflows and contact directory as an installable progressive web app.",
    descriptionKo:
      "사내 업무 가이드. 업무 워크플로우와 연락처를 설치형 프로그레시브 웹 앱으로 제공.",
    detail:
      "A lightweight PWA built with vanilla JavaScript and Service Workers. Provides offline-capable task workflow guides and a searchable company phone directory. Designed for quick access on mobile devices without app store distribution.",
    detailKo:
      "바닐라 JavaScript와 Service Worker로 구축한 경량 PWA. 오프라인 지원 업무 워크플로우 가이드와 검색 가능한 사내 전화번호부를 제공합니다. 앱스토어 배포 없이 모바일에서 빠르게 접근 가능하도록 설계.",
    techStack: ["Vanilla JS", "Service Worker", "PWA"],
    status: "production",
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
    techStack: ["TypeScript", "MCP SDK", "SQLite", "FTS5", "Express"],
    metrics: [
      { label: "Ordinances", value: "162" },
      { label: "Ontology Concepts", value: "340+", labelKo: "온톨로지 개념" },
    ],
    status: "production",
    tools: [
      {
        name: "check_building_code",
        description: "Cross-references building parameters against the ontology-structured regulation graph. Traverses zoning classification → use type → applicable statutes to determine compliance, returning the specific articles that apply and whether each constraint is satisfied.",
        descriptionKo: "건축 파라미터를 온톨로지 구조의 규정 그래프와 대조 검사. 용도지역 → 용도 유형 → 적용 법령을 순회하여 준수 여부를 판단하고, 적용되는 조문과 각 제약 충족 여부를 반환합니다.",
        input: "Jurisdiction code, building parameters (use, area, height, floors)",
        inputKo: "관할구역 코드, 건축 파라미터 (용도, 면적, 높이, 층수)",
        output: "Per-constraint compliance verdict with traced article references",
        outputKo: "제약 조건별 준수 판정 및 추적된 조문 참조",
      },
      {
        name: "search_ordinances",
        description: "Full-text search powered by SQLite FTS5 across all 162 municipal building ordinances. Returns matched articles with surrounding context, highlighting which jurisdiction each result belongs to. Supports boolean operators and phrase matching for precise legal research.",
        descriptionKo: "SQLite FTS5 기반 162개 지자체 건축 조례 전문 검색. 각 결과가 어느 관할구역에 속하는지 표시하며 주변 컨텍스트와 함께 일치 조문을 반환합니다. 정밀한 법률 연구를 위한 불리언 연산자와 구문 매칭을 지원.",
        input: "Search query (supports AND/OR/phrase), optional jurisdiction filter",
        inputKo: "검색 쿼리 (AND/OR/구문 지원), 관할구역 필터 (선택)",
        output: "Ranked ordinance articles with context snippets and jurisdiction tags",
        outputKo: "컨텍스트 스니펫과 관할구역 태그가 포함된 순위별 조례 조문",
      },
      {
        name: "get_zoning_regulations",
        description: "Queries the ontology for a specific zoning classification and returns the full regulatory parameter set — FAR, building coverage ratio, setback distances per boundary type, height limits, and any special conditions or exceptions defined by the municipality.",
        descriptionKo: "온톨로지에서 특정 용도지역 분류를 쿼리하여 전체 규제 파라미터 세트를 반환 — 용적률, 건폐율, 경계 유형별 이격거리, 높이 제한, 해당 지자체가 정의한 특별 조건이나 예외 사항 포함.",
        input: "District ID, zoning classification code",
        inputKo: "지구 ID, 용도지역 분류 코드",
        output: "Complete parameter set: FAR, BCR, setbacks, height, special conditions",
        outputKo: "완전한 파라미터 세트: 용적률, 건폐율, 이격거리, 높이, 특별 조건",
      },
      {
        name: "search_legal_precedents",
        description: "Connects to the national law information center (법제처) API for real-time legal precedent search. Filters by building law domain and returns case summaries with court decisions, applicable statutes, and relevance to current design constraints.",
        descriptionKo: "국가법령정보센터(법제처) API에 실시간 연결하여 판례를 검색합니다. 건축법 분야 필터링 후 법원 결정, 적용 법령, 현재 설계 제약 조건과의 관련성이 포함된 사건 요약을 반환.",
        input: "Search keywords, legal domain filter, date range",
        inputKo: "검색 키워드, 법률 분야 필터, 날짜 범위",
        output: "Precedent summaries with court ruling, cited statutes, and relevance score",
        outputKo: "법원 판결, 인용 법령, 관련성 점수가 포함된 판례 요약",
      },
      {
        name: "get_jurisdiction_profile",
        description: "Retrieves the complete regulatory profile for a municipality — all zoning types available, their parameter ranges, local exceptions to national law, and any municipality-specific building incentives or restrictions. Useful as a pre-check before detailed compliance analysis.",
        descriptionKo: "지자체의 전체 규제 프로파일을 조회합니다 — 가용 용도지역 유형, 파라미터 범위, 국가법에 대한 지역 예외 조항, 지자체 고유의 건축 인센티브나 제한 사항. 상세 준수 분석 전 사전 확인에 유용.",
        input: "Municipality code",
        inputKo: "지자체 코드",
        output: "Full jurisdiction profile with zoning types, parameter ranges, local exceptions",
        outputKo: "용도지역 유형, 파라미터 범위, 지역 예외가 포함된 전체 관할구역 프로파일",
      },
    ],
  },
  {
    slug: "arch-analysis-mcp",
    name: "arch-analysis-mcp",
    category: "mcp",
    type: "MCP Server · Geospatial Analysis",
    typeKo: "MCP 서버 · 지리공간 분석",
    description:
      "Geospatial intelligence engine for architectural site evaluation. Combines GIS data processing with environmental analysis — terrain profiling, solar exposure modeling, wind pattern assessment, and noise mapping — all computed from raw coordinate data using GeoPandas and Shapely.",
    descriptionKo:
      "건축 대지 평가를 위한 지리공간 인텔리전스 엔진. GIS 데이터 처리와 환경 분석을 결합 — 지형 프로파일링, 일조 노출 모델링, 바람 패턴 평가, 소음 매핑을 GeoPandas와 Shapely를 사용하여 원시 좌표 데이터로부터 계산.",
    detail:
      "Transforms raw geospatial data into actionable site intelligence. Given only a site boundary polygon, it computes precise area calculations, analyzes terrain slope gradients from DEM elevation data, models year-round solar exposure with hour-by-hour shadow casting, and aggregates environmental factors within configurable radii. The analysis accounts for Korean geographic specifics — latitude-adjusted sun angles, local wind rose data, and proximity to noise sources. All outputs are structured as JSON that downstream pipeline phases (zoning, layout) can directly consume for constraint-aware design decisions. Runs as a stdio-based MCP server, processing spatial computations entirely in-memory with GeoPandas for vector operations and Shapely for geometric analysis.",
    detailKo:
      "원시 지리공간 데이터를 실행 가능한 대지 인텔리전스로 변환합니다. 대지 경계 폴리곤만으로 정밀 면적 계산, DEM 표고 데이터의 지형 경사도 분석, 시간별 그림자 투사를 통한 연간 일조 노출 모델링, 설정 가능한 반경 내 환경 요인 집계를 수행합니다. 한국 지리 특성을 반영한 분석 — 위도 보정 태양 각도, 지역 바람장미 데이터, 소음원 근접도. 모든 출력은 후속 파이프라인 단계(조닝, 레이아웃)가 제약 조건 기반 설계 의사결정에 직접 사용할 수 있는 JSON으로 구조화됩니다. stdio 기반 MCP 서버로 실행되며, GeoPandas의 벡터 연산과 Shapely의 기하학 분석으로 공간 계산을 메모리 내에서 처리.",
    techStack: ["Python", "FastMCP", "GeoPandas", "Shapely"],
    status: "production",
    tools: [
      {
        name: "analyze_site",
        description: "Runs the full site analysis pipeline from a single GeoJSON boundary input. Computes land area, identifies optimal building orientation, classifies surrounding land use, and generates a structured report that subsequent pipeline phases consume for design constraints.",
        descriptionKo: "단일 GeoJSON 경계 입력으로 전체 대지분석 파이프라인을 실행합니다. 대지 면적 계산, 최적 건축 방향 식별, 주변 토지 이용 분류를 수행하고 후속 파이프라인 단계가 설계 제약 조건으로 사용할 구조화된 보고서를 생성.",
        input: "Site boundary coordinates (GeoJSON polygon)",
        inputKo: "대지 경계 좌표 (GeoJSON 폴리곤)",
        output: "Structured site analysis report (area, slope, orientation, context)",
        outputKo: "구조화된 대지분석 보고서 (면적, 경사, 방향, 주변 환경)",
      },
      {
        name: "calculate_sun_path",
        description: "Models solar exposure by computing the sun's position at configurable intervals throughout the year. Casts shadows from surrounding context geometry to identify permanently shaded zones, optimal daylight corridors, and areas meeting Korean building law daylight requirements (minimum 2 hours continuous winter sun).",
        descriptionKo: "연중 설정 가능한 간격으로 태양 위치를 계산하여 일조 노출을 모델링합니다. 주변 건물 지오메트리에서 그림자를 투사하여 영구 음영 구역, 최적 일조 통로, 한국 건축법 일조 요건(동지 기준 연속 2시간 이상)을 충족하는 영역을 식별.",
        input: "Site coordinates, date range, time intervals",
        inputKo: "대지 좌표, 날짜 범위, 시간 간격",
        output: "Sun path diagram data, shadow duration per zone, daylight compliance map",
        outputKo: "일조 경로 다이어그램 데이터, 구역별 그림자 지속 시간, 일조 준수 맵",
      },
      {
        name: "assess_terrain",
        description: "Processes DEM (Digital Elevation Model) data to evaluate terrain characteristics. Generates slope gradient classifications, elevation cross-section profiles along user-defined axes, and identifies areas requiring cut-fill earthwork — critical for foundation planning and accessibility compliance.",
        descriptionKo: "DEM(수치표고모델) 데이터를 처리하여 지형 특성을 평가합니다. 경사도 분류, 사용자 정의 축을 따른 표고 단면 프로파일을 생성하고 절성토가 필요한 영역을 식별 — 기초 계획과 접근성 준수에 핵심적인 정보.",
        input: "Site boundary, DEM data source reference",
        inputKo: "대지 경계, DEM 데이터 소스 참조",
        output: "Slope classification map, elevation cross-section profiles, cut-fill estimates",
        outputKo: "경사 분류 맵, 표고 단면 프로파일, 절성토 추정치",
      },
      {
        name: "aggregate_environment",
        description: "Collects and scores environmental factors within a configurable analysis radius around the site. Evaluates prevailing wind patterns, ambient noise levels from nearby roads and rail, green space coverage percentage, and proximity to public infrastructure (transit, utilities, amenities).",
        descriptionKo: "대지 주변 설정 가능한 분석 반경 내 환경 요인을 수집하고 점수화합니다. 주풍향 패턴, 인근 도로 및 철도의 소음 수준, 녹지 비율, 대중교통·유틸리티·편의시설 등 공공 인프라 근접성을 평가.",
        input: "Site center point, analysis radius (meters)",
        inputKo: "대지 중심점, 분석 반경 (미터)",
        output: "Environmental scores — wind, noise, green coverage, infrastructure proximity",
        outputKo: "환경 점수 — 바람, 소음, 녹지율, 인프라 근접성",
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
      "Every TAI pipeline run begins here. Competition briefs are dense, unstructured documents mixing legal language, spatial requirements, submission rules, and evaluation criteria across hundreds of pages. This server uses pdfplumber to extract text with layout awareness (preserving tables, headers, and section hierarchy), then sends the content through Claude AI for semantic decomposition. The AI identifies and categorizes every requirement — distinguishing mandatory constraints from preferences, quantitative targets from qualitative guidelines, and explicit rules from implied expectations. It also detects cross-references between sections and extracts all cited laws and standards (building code articles, fire safety regulations, accessibility standards) for downstream legal compliance checking. The structured output becomes the single source of truth that all subsequent pipeline phases reference.",
    detailKo:
      "모든 TAI 파이프라인 실행은 여기서 시작됩니다. 설계공모 지침서는 법률 용어, 공간 요구사항, 제출 규칙, 심사 기준이 수백 페이지에 걸쳐 혼재된 비정형 문서입니다. pdfplumber로 레이아웃을 인식하며 텍스트를 추출(표, 제목, 섹션 계층 보존)한 뒤, Claude AI를 통해 의미론적 분해를 수행합니다. AI는 모든 요구사항을 식별하고 분류 — 필수 제약과 선호 사항, 정량적 목표와 정성적 가이드라인, 명시적 규칙과 암묵적 기대를 구분합니다. 또한 섹션 간 교차 참조를 감지하고 인용된 모든 법령과 기준(건축법 조문, 소방 규정, 접근성 기준)을 추출하여 후속 법규 준수 검사에 활용합니다. 구조화된 출력은 모든 후속 파이프라인 단계가 참조하는 단일 진실 소스(single source of truth)가 됩니다.",
    techStack: ["Python", "FastMCP", "pdfplumber", "Anthropic SDK"],
    status: "production",
    tools: [
      {
        name: "extract_requirements",
        description: "Parses the entire competition brief PDF and produces a categorized requirement checklist. Uses pdfplumber for layout-aware text extraction, then Claude AI for semantic classification — separating site constraints, spatial program tables, submission deliverables, and regulatory mandates into structured JSON.",
        descriptionKo: "설계공모 지침서 PDF 전체를 파싱하여 분류된 요구사항 체크리스트를 생성합니다. pdfplumber로 레이아웃 인식 텍스트 추출 후, Claude AI로 의미론적 분류 — 대지 제약, 공간 프로그램표, 제출 산출물, 법규 의무사항을 구조화된 JSON으로 분리.",
        input: "PDF file path or document URL",
        inputKo: "PDF 파일 경로 또는 문서 URL",
        output: "Categorized requirement checklist (site, program, submission, regulatory)",
        outputKo: "분류된 요구사항 체크리스트 (대지, 프로그램, 제출물, 법규)",
      },
      {
        name: "parse_evaluation_criteria",
        description: "Identifies evaluation criteria sections within the brief and computes normalized scoring weights. Handles various formats — point-based systems, percentage allocations, ranked priority lists — and outputs a standardized matrix that the orchestrator uses to prioritize design decisions.",
        descriptionKo: "지침서 내 심사 기준 섹션을 식별하고 정규화된 배점 가중치를 산출합니다. 다양한 형식 처리 — 점수 기반, 백분율 배분, 우선순위 목록 — 오케스트레이터가 설계 의사결정 우선순위에 사용하는 표준화된 매트릭스를 출력.",
        input: "Brief text content or PDF section reference",
        inputKo: "지침서 텍스트 또는 PDF 섹션 참조",
        output: "Weighted evaluation criteria matrix with scoring breakdown",
        outputKo: "배점 분석이 포함된 가중치 심사 기준 매트릭스",
      },
      {
        name: "extract_regulatory_refs",
        description: "Scans the document for all referenced laws, regulations, standards, and guidelines. Resolves abbreviated citations to full statute names, identifies the specific articles cited, and flags any regulatory requirements that will need cross-checking with arch-law-mcp during the compliance phase.",
        descriptionKo: "문서에서 참조된 모든 법령, 규정, 기준, 가이드라인을 스캔합니다. 약어 인용을 전체 법령명으로 매핑하고, 인용된 구체적 조문을 식별하며, 준수 단계에서 arch-law-mcp와 교차 검증이 필요한 규제 요구사항을 플래그 처리.",
        input: "Document text or PDF content",
        inputKo: "문서 텍스트 또는 PDF 내용",
        output: "Regulatory reference list with full statute names, article numbers, and compliance flags",
        outputKo: "전체 법령명, 조문 번호, 준수 플래그가 포함된 법규 참조 목록",
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
    techStack: ["Python", "FastMCP", "rhino3dm", "PyQt5"],
    status: "production",
    tools: [
      {
        name: "generate_terrain_mesh",
        description: "Converts DEM (Digital Elevation Model) raster data into a triangulated 3D mesh within the site boundary. Each vertex carries its real-world elevation, producing terrain geometry that accurately represents the ground surface for foundation planning, grading analysis, and landscape design.",
        descriptionKo: "DEM(수치표고모델) 래스터 데이터를 대지 경계 내 삼각 3D 메쉬로 변환합니다. 각 정점이 실제 표고를 가지며, 기초 계획, 정지 작업 분석, 조경 설계를 위한 지표면을 정확히 재현하는 지형 지오메트리를 생성.",
        input: "DEM raster data, site boundary polygon",
        inputKo: "DEM 래스터 데이터, 대지 경계 폴리곤",
        output: "3DM terrain mesh with elevation-mapped vertices",
        outputKo: "표고 매핑된 정점의 3DM 지형 메쉬",
      },
      {
        name: "build_site_boundary",
        description: "Generates the buildable area as a 3D surface by applying legal setback offsets to each cadastral boundary edge. Setback distances come from arch-law-mcp's zoning data, and the resulting inset polygon defines the maximum building footprint envelope within which the zoning engine can place structures.",
        descriptionKo: "각 지적 경계 변에 법적 이격 오프셋을 적용하여 건축 가능 영역을 3D 면으로 생성합니다. 이격 거리는 arch-law-mcp의 조닝 데이터에서 가져오며, 생성된 내부 폴리곤이 조닝 엔진이 구조물을 배치할 수 있는 최대 건축 풋프린트 영역을 정의.",
        input: "Cadastral boundary coordinates, setback parameters per edge",
        inputKo: "지적 경계 좌표, 변별 이격 파라미터",
        output: "3DM site boundary with setback offset surfaces and buildable area",
        outputKo: "이격 오프셋 면과 건축 가능 영역이 포함된 3DM 대지 경계",
      },
      {
        name: "create_context_volumes",
        description: "Queries surrounding building data from GIS databases and generates simplified massing volumes (extruded footprints) with floor count metadata. These context volumes are essential for shadow studies, view corridor analysis, and understanding the spatial relationship between the new design and its urban environment.",
        descriptionKo: "GIS 데이터베이스에서 주변 건물 데이터를 쿼리하여 층수 메타데이터가 포함된 간략화된 매싱 볼륨(돌출 풋프린트)을 생성합니다. 이 컨텍스트 볼륨은 그림자 스터디, 조망 통로 분석, 신규 설계와 도시 환경 간의 공간적 관계 이해에 필수적.",
        input: "Site center coordinates, context radius (meters)",
        inputKo: "대지 중심 좌표, 컨텍스트 반경 (미터)",
        output: "3DM contextual building volumes with floor count and use type metadata",
        outputKo: "층수 및 용도 메타데이터가 포함된 3DM 주변 건물 볼륨",
      },
      {
        name: "preview_site_model",
        description: "Opens an interactive 3D viewer window (PyQt5 + OpenGL) displaying the assembled site model — terrain, boundary, setbacks, and context volumes in a single scene. Supports orbit, pan, zoom, and layer toggling for visual QA before pipeline output is finalized.",
        descriptionKo: "조합된 대지 모델을 표시하는 인터랙티브 3D 뷰어 창(PyQt5 + OpenGL)을 실행합니다 — 지형, 경계, 이격선, 컨텍스트 볼륨을 단일 장면으로. 파이프라인 출력 확정 전 시각적 QA를 위한 궤도/팬/줌/레이어 토글 지원.",
        input: "3DM file path or in-memory geometry data",
        inputKo: "3DM 파일 경로 또는 메모리 내 지오메트리 데이터",
        output: "PyQt5 interactive 3D viewer window with layer controls",
        outputKo: "레이어 컨트롤이 포함된 PyQt5 인터랙티브 3D 뷰어 창",
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
    status: "development",
    tools: [
      {
        name: "generate_floor_plan",
        description: "Generates a complete architectural floor plan from the zoning engine's spatial layout data. Produces proper CAD output with dimensioning chains between walls, room labels with area callouts, door swing arcs, window symbols, and wall hatch patterns — all organized on standard architectural layers at the specified drawing scale.",
        descriptionKo: "조닝 엔진의 공간 레이아웃 데이터로 완전한 건축 평면도를 생성합니다. 벽체 간 치수 체인, 면적 콜아웃이 포함된 실명, 문 스윙 호, 창호 심볼, 벽체 해치 패턴이 포함된 적절한 CAD 출력을 생산 — 모두 지정 도면 축척의 표준 건축 레이어에 정리.",
        input: "Room layout data, drawing scale, annotation preferences",
        inputKo: "실 배치 데이터, 도면 축척, 주석 설정",
        output: "DXF floor plan with dimensions, room labels, door swings, and layer organization",
        outputKo: "치수, 실명, 문 스윙, 레이어 구성이 포함된 DXF 평면도",
      },
      {
        name: "generate_site_plan",
        description: "Creates a site plan drawing combining legal boundaries, building placement, and site data. Includes setback lines with distance annotations, an area calculation table (building area, floor area ratio, building coverage ratio), parking space count and layout, landscaping zones, and standard drawing elements like north arrow and scale bar.",
        descriptionKo: "법적 경계, 건물 배치, 대지 데이터를 결합한 배치도를 생성합니다. 거리 주석이 포함된 이격선, 면적 계산표(건축면적, 용적률, 건폐율), 주차 대수 및 레이아웃, 조경 구역, 방위표와 축척 바 등 표준 도면 요소를 포함.",
        input: "Site model data, drawing conventions, scale",
        inputKo: "대지 모델 데이터, 도면 규약, 축척",
        output: "DXF site plan with setback lines, area table, parking layout, north arrow",
        outputKo: "이격선, 면적표, 주차 레이아웃, 방위표가 포함된 DXF 배치도",
      },
      {
        name: "export_3dm",
        description: "Exports all design geometry to Rhino 3DM format with a hierarchical layer structure following architectural conventions — top-level categories (site, structure, envelope, interior) with sub-layers for individual elements. Includes material assignments and display colors for immediate visualization in Rhino or Grasshopper workflows.",
        descriptionKo: "건축 관례에 따른 계층적 레이어 구조로 모든 설계 지오메트리를 Rhino 3DM 형식으로 내보냅니다 — 최상위 카테고리(대지, 구조, 외피, 인테리어)와 개별 요소의 하위 레이어. Rhino 또는 Grasshopper 워크플로우에서 즉시 시각화를 위한 재질 할당과 표시 색상을 포함.",
        input: "Design geometry data, layer naming structure",
        inputKo: "설계 지오메트리 데이터, 레이어 명명 구조",
        output: "3DM file with hierarchical layers, material assignments, and display colors",
        outputKo: "계층적 레이어, 재질 할당, 표시 색상이 포함된 3DM 파일",
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
  mcp: "Model Context Protocol servers for the TAI ecosystem",
  other: "Miscellaneous projects",
};

export const categoryDescriptionsKo: Record<ProjectCategory, string> = {
  web: "풀스택 웹 애플리케이션 및 플랫폼",
  app: "데스크톱 및 모바일 애플리케이션",
  mcp: "TAI 에코시스템을 위한 모델 컨텍스트 프로토콜 서버",
  other: "기타 프로젝트",
};
