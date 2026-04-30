"use client";

import { useLang } from "@/components/LangProvider";
import { MouseReveal } from "@/components/hero/MouseReveal";
import { FlowingNebula } from "@/components/hero/FlowingNebula";
import styles from "./on.module.css";

// Awards — descending. The 4 month-stamped 2024 entries originated from 99Works
// projects but are surfaced here under "Awards" because they were prizes /
// selections (3rd place, winning entry, certified-product selection, partner
// selection); the 99Works Projects section below holds the non-award sales /
// contracts / exhibitions (7 entries) so nothing is duplicated across sections.
const awards = [
  { year: "2025", en: "44th Grand Korea Architecture Exhibition — Exhibition in Noeulseom", ko: "제44회 대한민국건축대전 — '대한민국건축문화제 in 노을섬' 전시", result: { en: "Selected", ko: "입선" } },
  { year: "2024", en: "Busan Design Center — Busan Brand Shop Partner Selection", ko: "부산디자인진흥원 — 부산브랜드샵 협업기업 선정", result: { en: "Selected", ko: "선정" } },
  { year: "2024", en: "Hiker Ground × Buulgyeong Pop-up Store Design Collaboration", ko: "하이커그라운드 부울경 공동 팝업스토어 디자인 협업", result: { en: "Winning Entry", ko: "현상 당선" } },
  { year: "2024", en: "Namhae German Village Souvenir Certified-Product Competition", ko: "2024 남해 독일마을 기념품 인증제 상품 공모", result: { en: "Selected", ko: "선정" } },
  { year: "2024", en: "Busan Port Singamman Wharf Architectural Facility Design Competition", ko: "부산항 신감만 감만부두 건축시설물 설계공모 디자인 협업", result: { en: "3rd Place", ko: "현상 3위" } },
  { year: "2024", en: "Busan City Brand Goods Design Competition (99Works)", ko: "부산 도시브랜드 굿즈 디자인 공모전 (99Works)", result: { en: "Silver", ko: "은상" } },
  { year: "2023", en: "BUILDNER 'The Home of Shadows' Competition", ko: "BUILDNER 'The Home of Shadows' 국제공모전", result: { en: "Shortlist", ko: "Shortlist" } },
  { year: "2023", en: "27th LH Student Housing Architecture Competition", ko: "제27회 LH 대학생 주택건축대전", result: { en: "Honorable Mention", ko: "장려상" } },
  { year: "2023", en: "BIADW Busan International Architecture Design Workshop", ko: "BIADW 부산국제디자인워크숍", result: { en: "4th Place", ko: "집행위원장상(4위)" } },
  { year: "2023", en: "Busan Youth Urban Regeneration Program (Campthon)", ko: "제5기 부산청년도시재생사 양성 심화과정 (청년캠프톤)", result: { en: "Gold", ko: "금상" } },
  { year: "2022", en: "15th Chungnam Architecture & Culture Competition", ko: "제15회 충남건축문화대전", result: { en: "Honorable Mention", ko: "장려상" } },
];

const experience = [
  {
    period: "2026–",
    en: "Tomoon Architects — R&D Lab",
    ko: "토문건축사사무소 — 기술연구소",
    descEn: "Researching AI-driven architectural automation through vibe coding at the R&D lab.",
    descKo: "기술연구소에서 바이브코딩 기반 건축 자동화 연구 중.",
  },
  {
    period: "2024",
    en: "99Works — Founder",
    ko: "99Works — 대표",
    descEn: "8 projects, 4 awards. Pop-up store design, urban model production, 3D printing services.",
    descKo: "8개 프로젝트, 4개 수상. 팝업스토어 디자인, 도시모형 제작, 3D 프린팅 서비스.",
  },
  {
    period: "2023",
    en: "JA — 3D Printing Business",
    ko: "JA(제이에이) — 3D 프린팅 사업",
    descEn: "29 printing services delivered. Architectural model production for firms and students.",
    descKo: "3D 프린팅 서비스 29회 수행. 건축사무소 및 학생 대상 건축모형 제작.",
  },
];

// 99Works projects — only the non-award entries; the 4 award/selection
// items (3rd place, winning entry, two selections) live in the `awards`
// array above to avoid duplicating the same line in two sections.
const projects99Works = [
  { period: "24.11", en: "Yeongdeungpo-gu Anyangcheon Riverside Hub — Planning Collaboration", ko: "영등포구 안양천 수변활력거점 조성 기획 협업", status: { en: "Ongoing", ko: "실시 진행중" } },
  { period: "24.08", en: "BIADW BUSAN NEXT — Urban Model 3D Printing Contract", ko: "부산국제건축디자인워크숍 BUSAN NEXT 도시모형 3D 프린팅 계약", status: { en: "Exhibited / Pending", ko: "전시 완료 / 대기" } },
  { period: "24.06", en: "BIADW with MVRDV — Operations", ko: "부산국제건축디자인워크숍 with MVRDV 운영", status: { en: "Operations Closed", ko: "운영완료" } },
  { period: "24.06", en: "BIADW with MVRDV BUSAN — 3D Printing Contract", ko: "부산국제건축디자인워크숍 with MVRDV BUSAN 3D 프린팅 계약", status: { en: "Exhibited / Pending", ko: "전시 완료 / 대기" } },
  { period: "24.05", en: "Pohang Lot Development Direction — Design Service", ko: "포항 필지 개발방향성 디자인용역", status: { en: "Ongoing", ko: "실시 진행중" } },
  { period: "24.03", en: "Bansong Urban Regeneration Hub — Model Production", ko: "반송도시재생 거점시설 모형 제작", status: { en: "Permanent Exhibit", ko: "상시전시" } },
  { period: "24.03", en: "BIADW Project Steering Committee — Contract", ko: "부산국제건축디자인워크숍 프로젝트 집행위원회 계약", status: { en: "Contract Closed", ko: "계약만료" } },
];

const speaking = [
  { year: "2024", en: "University 3D Printing Tech Lecture — 4 sessions (1st–4th year students)", ko: "동아대학교 3D 프린팅 기술 강의 — 4회 (1학년–4학년)" },
  { year: "2024", en: "Busan Architecture Festival Newsletter — PEOPLE Interview", ko: "부산건축제 뉴스레터 61호 — PEOPLE 부문 인터뷰" },
  { year: "2024", en: "BIADW 3D Printing Production Guidelines", ko: "부산국제건축디자인워크숍 3D 프린팅 제작수칙" },
];

const workshops = [
  {
    period: "26.04–",
    en: "Archi-Crew",
    ko: "Archi-Crew",
    desc: { en: "Active member", ko: "활동 중" },
  },
  {
    period: "2024",
    en: "Talgeon Faculty — Architectural Computation Workshop, Cohorts 2 & 3 (Automating Architecture Services)",
    ko: "탈건학부 건축컴퓨테이션 워크숍 2,3기 — Automating Architecture Services",
    desc: { en: "Participant", ko: "참여" },
  },
];

export default function AboutPage() {
  const { t, lang } = useLang();
  const isKo = lang === "ko";

  return (
    <>
      {/* Grain overlay */}
      <div className={styles.grain} />

      {/* Hero */}
      <section className={`${styles.hero} ${styles.heroSpotlight}`}>
        {/* Flowing particle stream — disk on left, particles drift rightward */}
        <FlowingNebula direction="ltr" />

        {/* Mouse-tracked spotlight: rubbing the darkness reveals the stream */}
        <MouseReveal
          radius={120}
          showDot={false}
          enableCharge={true}
          chargeGain={0.0003}
          chargeDecay={0.013}
        />

        <div className={styles.heroLabel}>
          {isKo ? "내가 작업하는 시간" : "What I build when I'm on"}
        </div>

        <div className={styles.titleWrap}>
          <div className={styles.titleOn}>
            <span className={styles.letterO}>O</span><span className={styles.letterN}>n</span>
          </div>
        </div>

        <div className={styles.titleHours}>Hours</div>

        <div className={styles.heroMeta}>
          <div className={styles.heroMetaLabel}>
            — N°{awards.length.toString().padStart(2, "0")} /{" "}
            {isKo ? "수상" : "Award"}
          </div>
          <p className={styles.heroMetaText}>
            {isKo
              ? "좋아하는 일에 대한 도전을 멈추지 않을 것"
              : "Never stop taking on what I love"}
          </p>
        </div>

        <div className={styles.heroFooter}>
          <span>{isKo ? "스크롤" : "SCROLL TO EXPLORE"}</span>
          <div className={styles.heroFooterLine} />
          <span className={styles.heroArrow}>↓</span>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 md:px-6 py-16 md:py-20">

      {/* A. Identity Statement */}
      <div className="mb-10 md:mb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted mb-3">
          {t("about.title")}
        </p>
        <h1 className="text-2xl md:text-4xl font-light tracking-tight mb-4 flex items-baseline gap-3 md:gap-4">
          <span>{isKo ? "김 선 재" : "Kim Seon Jae"}</span>
          <span className="text-xs md:text-sm font-light text-text-muted tracking-wide">Vibe Coder</span>
        </h1>
        <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed max-w-2xl">
          {t("about.oneliner")}
        </p>
      </div>

      {/* B. Thesis */}
      <div className="pb-10 md:pb-16 border-b border-border">
        <h2 className="text-xs md:text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium mb-3 md:mb-4">
          {t("about.thesis.label")}
        </h2>
        <p className="text-[15px] text-text-secondary font-light leading-[1.85] max-w-3xl">
          {t("about.thesis")}
        </p>
      </div>

      {/* C. Awards */}
      <div className="py-10 md:py-16 border-b border-border">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xs md:text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium">
            {isKo ? "수상" : "Awards"}
          </h2>
          <span className="font-mono text-[11px] text-text-muted">
            {isKo ? `총 ${awards.length}회 수상` : `${awards.length} total`}
          </span>
        </div>

        <div className="flex flex-col">
          {awards.map((a, i) => (
            <div
              key={i}
              className="grid grid-cols-[40px_1fr_auto] gap-x-3 md:gap-x-4 py-2.5 md:py-3 border-b border-border last:border-b-0 items-baseline"
            >
              <span className="font-mono text-[13px] text-text-muted">{a.year}</span>
              <span className="text-sm text-text-primary font-light">
                {isKo ? a.ko : a.en}
              </span>
              <span className="font-mono text-[12px] text-text-muted">
                {isKo ? a.result.ko : a.result.en}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* D. Business & Internship */}
      <div className="py-10 md:py-16 border-b border-border">
        <h2 className="text-xs md:text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium mb-6">
          {isKo ? "경력 & 인턴" : "Business & Internship"}
        </h2>

        <div className="flex flex-col">
          {experience.map((exp, i) => (
            <div
              key={i}
              className="grid grid-cols-[40px_1fr] gap-x-3 md:gap-x-4 py-2.5 md:py-3 border-b border-border last:border-b-0"
            >
              <span className="font-mono text-[13px] text-text-muted">{exp.period}</span>
              <div>
                <span className="text-sm text-text-primary font-light">
                  {isKo ? exp.ko : exp.en}
                </span>
                {(isKo ? exp.descKo : exp.descEn) && (
                  <p className="text-[13px] text-text-muted font-light mt-1 leading-relaxed">
                    {isKo ? exp.descKo : exp.descEn}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* E. 99Works Projects */}
      <div className="py-10 md:py-16 border-b border-border">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xs md:text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium">
            {isKo ? "99Works 프로젝트" : "99Works Projects"}
          </h2>
          <span className="font-mono text-[11px] text-text-muted">
            {isKo ? `총 ${projects99Works.length}건` : `${projects99Works.length} total`}
          </span>
        </div>

        <div className="flex flex-col">
          {projects99Works.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-[60px_1fr_auto] gap-x-3 md:gap-x-4 py-2.5 md:py-3 border-b border-border last:border-b-0 items-baseline"
            >
              <span className="font-mono text-[13px] text-text-muted">{p.period}</span>
              <span className="text-sm text-text-primary font-light">
                {isKo ? p.ko : p.en}
              </span>
              <span className="font-mono text-[12px] text-text-muted">
                {isKo ? p.status.ko : p.status.en}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* F. Lectures & Interviews */}
      <div className="py-10 md:py-16 border-b border-border">
        <h2 className="text-xs md:text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium mb-6">
          {isKo ? "강의 & 인터뷰" : "Lectures & Interviews"}
        </h2>

        <div className="flex flex-col">
          {speaking.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-[40px_1fr] gap-x-3 md:gap-x-4 py-2.5 md:py-3 border-b border-border last:border-b-0"
            >
              <span className="font-mono text-[13px] text-text-muted">{s.year}</span>
              <span className="text-sm text-text-primary font-light">
                {isKo ? s.ko : s.en}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* G. Workshops */}
      <div className="py-10 md:py-16 border-b border-border">
        <h2 className="text-xs md:text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium mb-6">
          {isKo ? "워크숍" : "Workshops"}
        </h2>

        <div className="flex flex-col">
          {workshops.map((w, i) => (
            <div
              key={i}
              className="grid grid-cols-[80px_1fr_auto] gap-x-3 md:gap-x-4 py-2.5 md:py-3 border-b border-border last:border-b-0 items-baseline"
            >
              <span className="font-mono text-[13px] text-text-muted">{w.period}</span>
              <span className="text-sm text-text-primary font-light">
                {isKo ? w.ko : w.en}
              </span>
              <span className="font-mono text-[12px] text-text-muted">
                {isKo ? w.desc.ko : w.desc.en}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* H. Background */}
      <div className="py-10 md:py-16 border-b border-border">
        <h2 className="text-xs md:text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium mb-6">
          {t("about.background.label")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: t("about.bg.domain"), value: t("about.bg.domain.val") },
            { label: t("about.bg.status"), value: t("about.bg.status.val") },
            { label: t("about.bg.tool"), value: t("about.bg.tool.val") },
            { label: t("about.bg.location"), value: t("about.bg.location.val") },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-[11px] uppercase tracking-[0.06em] text-text-muted mb-1.5">
                {item.label}
              </div>
              <div className="text-sm font-medium text-text-primary whitespace-pre-line">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* I. Contact */}
      <div className="pt-10 md:pt-16">
        <h2 className="text-xs md:text-[11px] uppercase tracking-[0.08em] text-text-muted font-medium mb-4">
          {t("about.contact.label")}
        </h2>
        <div className="flex justify-between">
          <a
            href="mailto:jmskjksjj@gmail.com"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            jmskjksjj@gmail.com
          </a>
          <a
            href="https://github.com/jmskjksjj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
      </div>
    </>
  );
}
