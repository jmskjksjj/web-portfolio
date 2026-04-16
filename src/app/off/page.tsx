"use client";

import { useLang } from "@/components/LangProvider";
import { MouseReveal } from "@/components/hero/MouseReveal";
import { FlowingNebula } from "@/components/hero/FlowingNebula";
import styles from "./off.module.css";

const hobbies = [
  { en: "Running", ko: "러닝", descEn: "Clear mind, one stride at a time. The simplest reset there is.", descKo: "한 걸음씩, 머리를 비우는 가장 단순한 방법.", geo: "circle", span: 5 },
  { en: "Swimming", ko: "수영", descEn: "Weightless in the water. No notifications, no gravity, just rhythm.", descKo: "물속에서 무중력. 알림도, 중력도 없이 리듬만.", geo: "arc", span: 7 },
  { en: "Cycling", ko: "사이클", descEn: "Exploring distances on two wheels.", descKo: "두 바퀴로 거리를 탐험하기.", geo: "line", span: 4 },
  { en: "Cooking", ko: "요리", descEn: "Building flavors from scratch.", descKo: "재료부터 맛을 만들어가는 과정.", geo: "cross", span: 4 },
  { en: "Board Games", ko: "보드게임", descEn: "Strategy, bluff, and good company.", descKo: "전략, 블러프, 그리고 좋은 사람들.", geo: "grid", span: 4 },
  { en: "Poker", ko: "포커", descEn: "Reading people beyond the cards. Probability meets psychology. The best game there is.", descKo: "카드 너머의 사람을 읽는 게임. 확률과 심리의 만남.", geo: "diamond", span: 7 },
  { en: "Soccer", ko: "축구", descEn: "Team rhythm on the pitch. Where individual skill meets collective movement.", descKo: "피치 위의 팀 리듬. 개인기와 집단 움직임의 만남.", geo: "halfCircle", span: 5 },
  { en: "Fishing", ko: "낚시", descEn: "Patience rewarded by the water.", descKo: "물가에서 보상받는 인내.", geo: "dotRing", span: 3 },
  { en: "Travel", ko: "여행", descEn: "Collecting perspectives. Every city teaches something new about how people live.", descKo: "관점을 수집하기. 모든 도시는 사람들이 사는 방식에 대해 새로운 걸 가르쳐준다.", geo: "parallel", span: 6 },
  { en: "Camping", ko: "캠핑", descEn: "Simplicity under open skies.", descKo: "하늘 아래의 단순함.", geo: "triangle", span: 3 },
];

function GeoShape({ type }: { type: string }) {
  const base = `${styles.cardGeo}`;
  switch (type) {
    case "circle": return <div className={`${base} ${styles.geoCircle}`} />;
    case "arc": return <div className={`${base} ${styles.geoArc}`} />;
    case "line": return <div className={`${base} ${styles.geoLine}`} />;
    case "cross": return <div className={`${base} ${styles.geoCross}`} />;
    case "grid": return <div className={`${base} ${styles.geoGrid}`} />;
    case "diamond": return <div className={`${base} ${styles.geoDiamond}`} />;
    case "halfCircle": return <div className={`${base} ${styles.geoHalfCircle}`} />;
    case "dotRing": return <div className={`${base} ${styles.geoDotRing}`} />;
    case "parallel": return <div className={`${base} ${styles.geoParallel}`} />;
    case "triangle": return <div className={`${base} ${styles.geoTriangle}`} />;
    default: return null;
  }
}

export default function OffPage() {
  const { lang } = useLang();
  const isKo = lang === "ko";

  return (
    <div className={styles.page}>
      {/* Grain overlay */}
      <div className={styles.grain} />

      {/* Hero */}
      <section className={`${styles.hero} ${styles.heroSpotlight}`}>
        {/* Flowing particle stream — disk on right, particles drift leftward */}
        <FlowingNebula direction="rtl" />

        {/* Inverted mouse reveal: the stream is visible by default; the cursor
            casts shadow that darkens the scene toward black as the user rubs.
            Idle → shadow fades and the stars come back. Charge to lockThreshold
            snaps into a smooth fade-in to fully opaque darkness. */}
        <MouseReveal
          invert={true}
          radius={120}
          showDot={false}
          showGlow={false}
          enableCharge={true}
          chargeGain={0.0003}
          chargeDecay={0.013}
          lockFadeSpeed={0.005}
        />

        <div className={styles.heroLabel}>
          {isKo ? "일 외의 시간" : "What I do when I'm not building"}
        </div>

        <div className={styles.titleWrap}>
          <div className={styles.titleOff}>
            <span className={styles.lettersFf}>ff</span><span className={styles.letterO}>O</span>
          </div>
        </div>

        <div className={styles.titleHours}>Hours</div>

        <div className={styles.heroMeta}>
          <div className={styles.heroMetaLabel}>
            N°10 / {isKo ? "취미" : "Interests"} —
          </div>
          <p className={styles.heroMetaText}>
            {isKo
              ? "내가 하고 싶은 것들을 모두 해볼 것"
              : "Try everything I want to try"}
          </p>
        </div>

        <div className={styles.heroFooter}>
          <span>{isKo ? "스크롤" : "SCROLL TO EXPLORE"}</span>
          <div className={styles.heroFooterLine} />
          <span className={styles.heroArrow}>↓</span>
        </div>
      </section>

      {/* Section marker */}
      <div className={styles.sectionMarker}>
        <span className={styles.markerLabel}>{isKo ? "취미" : "Interests"}</span>
        {isKo && <span className={styles.markerLabelSub}>Interests</span>}
        {!isKo && <span className={styles.markerLabelSub}>취미</span>}
        <div className={styles.markerLine} />
        <span className={styles.markerLabel}>{hobbies.length}</span>
      </div>

      {/* Grid */}
      <div className={styles.gridSection}>
        <div className={styles.grid}>
          {hobbies.map((h, i) => (
            <div
              key={h.en}
              className={`${styles.card} ${styles[`span${h.span}`]}`}
              data-large={h.span >= 6 ? "" : undefined}
            >
              <div className={styles.cardNumber}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className={styles.cardName} data-large={h.span >= 6 ? "" : undefined}>
                {isKo ? h.ko : h.en}
              </div>
              <div className={styles.cardNameSub}>
                {isKo ? h.en : h.ko}
              </div>
              <div className={styles.cardDesc}>
                {isKo ? h.descKo : h.descEn}
              </div>
              <GeoShape type={h.geo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
