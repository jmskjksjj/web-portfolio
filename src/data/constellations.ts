export interface ConstellationStar {
  id: string;
  theta: number;
  phi: number;
  brightness?: number;
}

export interface ConstellationEdge {
  from: string;
  to: string;
  order: number;
}

export interface ConstellationDef {
  id: string;
  labelEn: string;
  labelKo: string;
  centerTheta: number;
  centerPhi: number;
  stars: ConstellationStar[];
  edges: ConstellationEdge[];
}

const SCALE = 0.5;

function makeStars(
  id: string,
  centerTheta: number,
  centerPhi: number,
  offsets: { dx: number; dy: number; brightness?: number }[]
): ConstellationStar[] {
  return offsets.map((o, i) => ({
    id: `${id}-${i}`,
    theta: centerTheta + o.dx * SCALE,
    phi: centerPhi + o.dy * SCALE,
    brightness: o.brightness ?? 1,
  }));
}

// --- RUNNING (러닝) ---
const runCenter = { theta: -1.1, phi: 0.65 };
const runStars = makeStars("run", runCenter.theta, runCenter.phi, [
  { dx: 0.0, dy: -0.24, brightness: 1.0 },
  { dx: 0.0, dy: -0.16, brightness: 0.7 },
  { dx: 0.0, dy: -0.02, brightness: 1.0 },
  { dx: 0.1, dy: -0.14, brightness: 0.6 },
  { dx: 0.16, dy: -0.18, brightness: 0.8 },
  { dx: -0.08, dy: -0.1, brightness: 0.6 },
  { dx: -0.14, dy: -0.06, brightness: 0.8 },
  { dx: 0.1, dy: 0.08, brightness: 0.7 },
  { dx: 0.18, dy: 0.16, brightness: 0.9 },
  { dx: -0.06, dy: 0.1, brightness: 0.7 },
  { dx: -0.14, dy: 0.2, brightness: 0.8 },
  { dx: -0.2, dy: 0.22, brightness: 0.5 },
  { dx: 0.22, dy: 0.22, brightness: 0.5 },
]);

// --- SWIMMING (수영) ---
const swimCenter = { theta: 0.0, phi: 0.35 };
const swimStars = makeStars("swim", swimCenter.theta, swimCenter.phi, [
  { dx: -0.26, dy: -0.04, brightness: 0.9 },
  { dx: -0.18, dy: -0.06, brightness: 0.6 },
  { dx: -0.1, dy: -0.02, brightness: 0.7 },
  { dx: -0.04, dy: -0.08, brightness: 1.0 },
  { dx: 0.04, dy: 0.0, brightness: 0.8 },
  { dx: 0.12, dy: 0.02, brightness: 0.7 },
  { dx: 0.2, dy: -0.02, brightness: 0.6 },
  { dx: 0.28, dy: -0.04, brightness: 0.8 },
  { dx: 0.2, dy: 0.06, brightness: 0.6 },
  { dx: 0.28, dy: 0.1, brightness: 0.7 },
  { dx: -0.24, dy: 0.1, brightness: 0.5 },
  { dx: -0.1, dy: 0.12, brightness: 0.5 },
  { dx: 0.04, dy: 0.1, brightness: 0.5 },
  { dx: 0.18, dy: 0.12, brightness: 0.5 },
]);

// --- FISHING (낚시) ---
const fishCenter = { theta: 0.8, phi: 0.95 };
const fishStars = makeStars("fish", fishCenter.theta, fishCenter.phi, [
  { dx: -0.12, dy: -0.18, brightness: 1.0 },
  { dx: -0.1, dy: -0.1, brightness: 0.7 },
  { dx: -0.08, dy: 0.0, brightness: 0.8 },
  { dx: -0.02, dy: 0.08, brightness: 0.7 },
  { dx: -0.1, dy: 0.12, brightness: 0.6 },
  { dx: -0.04, dy: -0.08, brightness: 0.6 },
  { dx: 0.04, dy: -0.22, brightness: 0.7 },
  { dx: 0.14, dy: -0.28, brightness: 0.9 },
  { dx: 0.18, dy: -0.14, brightness: 0.5 },
  { dx: 0.2, dy: 0.02, brightness: 0.6 },
  { dx: 0.18, dy: 0.12, brightness: 0.8 },
  { dx: 0.22, dy: 0.14, brightness: 0.7 },
  { dx: 0.16, dy: 0.16, brightness: 0.6 },
  { dx: -0.16, dy: 0.14, brightness: 0.5 },
  { dx: 0.0, dy: 0.14, brightness: 0.5 },
]);

// --- CYCLING (사이클) ---
const cycleCenter = { theta: -0.8, phi: 0.35 };
const cycleStars = makeStars("cycle", cycleCenter.theta, cycleCenter.phi, [
  { dx: -0.06, dy: -0.18, brightness: 0.9 },   // 0: head
  { dx: -0.12, dy: -0.06, brightness: 0.8 },   // 1: handlebar
  { dx: 0.0, dy: -0.08, brightness: 0.7 },     // 2: torso
  { dx: 0.10, dy: -0.06, brightness: 0.7 },    // 3: seat
  { dx: -0.14, dy: 0.06, brightness: 0.9 },    // 4: front hub
  { dx: -0.16, dy: 0.16, brightness: 0.7 },    // 5: front wheel btm
  { dx: 0.02, dy: 0.06, brightness: 0.6 },     // 6: pedal
  { dx: 0.14, dy: 0.06, brightness: 0.9 },     // 7: rear hub
  { dx: 0.16, dy: 0.16, brightness: 0.7 },     // 8: rear wheel btm
]);

// --- COOKING (요리) ---
const cookCenter = { theta: -0.35, phi: 0.65 };
const cookStars = makeStars("cook", cookCenter.theta, cookCenter.phi, [
  { dx: 0.0, dy: -0.24, brightness: 0.7 },     // 0: chef hat
  { dx: 0.0, dy: -0.18, brightness: 1.0 },     // 1: head
  { dx: 0.0, dy: -0.08, brightness: 0.7 },     // 2: shoulder
  { dx: -0.12, dy: -0.04, brightness: 0.7 },   // 3: left hand
  { dx: -0.20, dy: -0.02, brightness: 0.9 },   // 4: pan handle
  { dx: -0.20, dy: 0.06, brightness: 0.5 },    // 5: pan edge
  { dx: 0.04, dy: 0.04, brightness: 0.6 },     // 6: body
  { dx: -0.02, dy: 0.16, brightness: 0.5 },    // 7: left foot
  { dx: 0.08, dy: 0.16, brightness: 0.5 },     // 8: right foot
  { dx: -0.18, dy: -0.10, brightness: 0.4 },   // 9: steam
]);

// --- BOARD GAMES (보드게임) ---
const boardCenter = { theta: -0.8, phi: 0.95 };
const boardStars = makeStars("board", boardCenter.theta, boardCenter.phi, [
  { dx: -0.10, dy: -0.16, brightness: 0.7 },   // 0: top-back-left
  { dx: 0.06, dy: -0.16, brightness: 0.7 },    // 1: top-back-right
  { dx: -0.14, dy: -0.08, brightness: 0.8 },   // 2: top-front-left
  { dx: 0.02, dy: -0.08, brightness: 0.8 },    // 3: top-front-right
  { dx: -0.10, dy: 0.04, brightness: 0.6 },    // 4: bot-back-left
  { dx: 0.06, dy: 0.04, brightness: 0.6 },     // 5: bot-back-right
  { dx: -0.14, dy: 0.12, brightness: 0.7 },    // 6: bot-front-left
  { dx: 0.02, dy: 0.12, brightness: 0.7 },     // 7: bot-front-right
  { dx: -0.06, dy: 0.02, brightness: 1.0 },    // 8: center dot (die face)
]);

// --- POKER (포커) ---
const pokerCenter = { theta: 0.35, phi: 0.65 };
const pokerStars = makeStars("poker", pokerCenter.theta, pokerCenter.phi, [
  { dx: -0.08, dy: -0.18, brightness: 0.7 },   // 0: card top-left
  { dx: 0.06, dy: -0.18, brightness: 0.7 },    // 1: card top-right
  { dx: -0.08, dy: 0.10, brightness: 0.7 },    // 2: card bottom-left
  { dx: 0.06, dy: 0.10, brightness: 0.7 },     // 3: card bottom-right
  { dx: -0.01, dy: -0.10, brightness: 1.0 },   // 4: diamond top
  { dx: -0.05, dy: -0.04, brightness: 0.8 },   // 5: diamond left
  { dx: 0.03, dy: -0.04, brightness: 0.8 },    // 6: diamond right
  { dx: -0.01, dy: 0.02, brightness: 0.7 },    // 7: diamond bottom
  { dx: 0.16, dy: -0.06, brightness: 0.8 },    // 8: chip 1
  { dx: 0.18, dy: 0.02, brightness: 0.6 },     // 9: chip 2
]);

// --- SOCCER (축구) ---
const soccerCenter = { theta: 0.0, phi: 0.95 };
const soccerStars = makeStars("soccer", soccerCenter.theta, soccerCenter.phi, [
  { dx: -0.02, dy: -0.24, brightness: 1.0 },   // 0: head
  { dx: -0.02, dy: -0.12, brightness: 0.8 },   // 1: torso
  { dx: -0.12, dy: -0.14, brightness: 0.5 },   // 2: left arm
  { dx: 0.08, dy: -0.16, brightness: 0.5 },    // 3: right arm
  { dx: -0.02, dy: -0.02, brightness: 0.7 },   // 4: hip
  { dx: -0.08, dy: 0.10, brightness: 0.7 },    // 5: standing leg
  { dx: -0.10, dy: 0.18, brightness: 0.6 },    // 6: standing foot
  { dx: 0.08, dy: 0.04, brightness: 0.7 },     // 7: kicking thigh
  { dx: 0.16, dy: -0.02, brightness: 0.9 },    // 8: kicking foot
  { dx: 0.24, dy: -0.06, brightness: 1.0 },    // 9: ball
]);

// --- TRAVEL (여행) ---
const travelCenter = { theta: 0.8, phi: 0.35 };
const travelStars = makeStars("travel", travelCenter.theta, travelCenter.phi, [
  { dx: -0.22, dy: -0.02, brightness: 1.0 },   // 0: nose
  { dx: -0.10, dy: -0.02, brightness: 0.6 },   // 1: front body
  { dx: 0.0, dy: -0.02, brightness: 0.7 },     // 2: wing joint
  { dx: 0.02, dy: 0.12, brightness: 0.8 },     // 3: wing down
  { dx: -0.02, dy: -0.16, brightness: 0.8 },   // 4: wing up
  { dx: 0.10, dy: -0.02, brightness: 0.6 },    // 5: rear body
  { dx: 0.18, dy: -0.02, brightness: 0.7 },    // 6: tail joint
  { dx: 0.20, dy: 0.06, brightness: 0.6 },     // 7: tail down
  { dx: 0.18, dy: -0.10, brightness: 0.8 },    // 8: tail up
]);

// --- CAMPING (캠핑) ---
const campCenter = { theta: 1.1, phi: 0.65 };
const campStars = makeStars("camp", campCenter.theta, campCenter.phi, [
  { dx: 0.02, dy: -0.18, brightness: 1.0 },    // 0: tent peak
  { dx: -0.10, dy: 0.0, brightness: 0.7 },     // 1: tent left
  { dx: 0.14, dy: 0.0, brightness: 0.7 },      // 2: tent right
  { dx: 0.02, dy: 0.0, brightness: 0.5 },      // 3: tent door
  { dx: 0.02, dy: 0.10, brightness: 0.9 },     // 4: fire top
  { dx: -0.04, dy: 0.16, brightness: 0.7 },    // 5: fire left
  { dx: 0.08, dy: 0.16, brightness: 0.7 },     // 6: fire right
  { dx: 0.02, dy: 0.20, brightness: 0.5 },     // 7: log
  { dx: -0.20, dy: -0.14, brightness: 0.7 },   // 8: tree top
  { dx: -0.20, dy: -0.04, brightness: 0.6 },   // 9: tree mid
  { dx: -0.20, dy: 0.06, brightness: 0.5 },    // 10: tree trunk
]);

export const CONSTELLATIONS: ConstellationDef[] = [
  {
    id: "running",
    labelEn: "Running",
    labelKo: "러닝",
    centerTheta: runCenter.theta,
    centerPhi: runCenter.phi,
    stars: runStars,
    edges: [
      { from: "run-0", to: "run-1", order: 0 },
      { from: "run-1", to: "run-2", order: 1 },
      { from: "run-1", to: "run-3", order: 2 },
      { from: "run-3", to: "run-4", order: 3 },
      { from: "run-1", to: "run-5", order: 4 },
      { from: "run-5", to: "run-6", order: 5 },
      { from: "run-2", to: "run-7", order: 6 },
      { from: "run-7", to: "run-8", order: 7 },
      { from: "run-2", to: "run-9", order: 8 },
      { from: "run-9", to: "run-10", order: 9 },
      { from: "run-10", to: "run-11", order: 10 },
      { from: "run-8", to: "run-12", order: 11 },
    ],
  },
  {
    id: "swimming",
    labelEn: "Swimming",
    labelKo: "수영",
    centerTheta: swimCenter.theta,
    centerPhi: swimCenter.phi,
    stars: swimStars,
    edges: [
      { from: "swim-0", to: "swim-1", order: 0 },
      { from: "swim-1", to: "swim-2", order: 1 },
      { from: "swim-2", to: "swim-3", order: 2 },
      { from: "swim-2", to: "swim-4", order: 3 },
      { from: "swim-4", to: "swim-5", order: 4 },
      { from: "swim-5", to: "swim-6", order: 5 },
      { from: "swim-6", to: "swim-7", order: 6 },
      { from: "swim-5", to: "swim-8", order: 7 },
      { from: "swim-8", to: "swim-9", order: 8 },
      { from: "swim-10", to: "swim-11", order: 9 },
      { from: "swim-11", to: "swim-12", order: 10 },
      { from: "swim-12", to: "swim-13", order: 11 },
    ],
  },
  {
    id: "fishing",
    labelEn: "Fishing",
    labelKo: "낚시",
    centerTheta: fishCenter.theta,
    centerPhi: fishCenter.phi,
    stars: fishStars,
    edges: [
      { from: "fish-0", to: "fish-1", order: 0 },
      { from: "fish-1", to: "fish-2", order: 1 },
      { from: "fish-2", to: "fish-3", order: 2 },
      { from: "fish-3", to: "fish-4", order: 3 },
      { from: "fish-1", to: "fish-5", order: 4 },
      { from: "fish-5", to: "fish-6", order: 5 },
      { from: "fish-6", to: "fish-7", order: 6 },
      { from: "fish-7", to: "fish-8", order: 7 },
      { from: "fish-8", to: "fish-9", order: 8 },
      { from: "fish-9", to: "fish-10", order: 9 },
      { from: "fish-10", to: "fish-11", order: 10 },
      { from: "fish-11", to: "fish-12", order: 11 },
      { from: "fish-13", to: "fish-14", order: 12 },
    ],
  },
  {
    id: "cycling",
    labelEn: "Cycling",
    labelKo: "사이클",
    centerTheta: cycleCenter.theta,
    centerPhi: cycleCenter.phi,
    stars: cycleStars,
    edges: [
      { from: "cycle-0", to: "cycle-1", order: 0 },
      { from: "cycle-1", to: "cycle-2", order: 1 },
      { from: "cycle-2", to: "cycle-3", order: 2 },
      { from: "cycle-1", to: "cycle-4", order: 3 },
      { from: "cycle-4", to: "cycle-5", order: 4 },
      { from: "cycle-2", to: "cycle-6", order: 5 },
      { from: "cycle-6", to: "cycle-3", order: 6 },
      { from: "cycle-3", to: "cycle-7", order: 7 },
      { from: "cycle-7", to: "cycle-8", order: 8 },
    ],
  },
  {
    id: "cooking",
    labelEn: "Cooking",
    labelKo: "요리",
    centerTheta: cookCenter.theta,
    centerPhi: cookCenter.phi,
    stars: cookStars,
    edges: [
      { from: "cook-0", to: "cook-1", order: 0 },
      { from: "cook-1", to: "cook-2", order: 1 },
      { from: "cook-2", to: "cook-3", order: 2 },
      { from: "cook-3", to: "cook-4", order: 3 },
      { from: "cook-4", to: "cook-5", order: 4 },
      { from: "cook-2", to: "cook-6", order: 5 },
      { from: "cook-6", to: "cook-7", order: 6 },
      { from: "cook-6", to: "cook-8", order: 7 },
      { from: "cook-4", to: "cook-9", order: 8 },
    ],
  },
  {
    id: "boardgames",
    labelEn: "Board Games",
    labelKo: "보드게임",
    centerTheta: boardCenter.theta,
    centerPhi: boardCenter.phi,
    stars: boardStars,
    edges: [
      { from: "board-0", to: "board-1", order: 0 },
      { from: "board-1", to: "board-3", order: 1 },
      { from: "board-3", to: "board-2", order: 2 },
      { from: "board-2", to: "board-0", order: 3 },
      { from: "board-4", to: "board-5", order: 4 },
      { from: "board-5", to: "board-7", order: 5 },
      { from: "board-7", to: "board-6", order: 6 },
      { from: "board-6", to: "board-4", order: 7 },
      { from: "board-0", to: "board-4", order: 8 },
      { from: "board-1", to: "board-5", order: 9 },
      { from: "board-2", to: "board-6", order: 10 },
      { from: "board-3", to: "board-7", order: 11 },
    ],
  },
  {
    id: "poker",
    labelEn: "Poker",
    labelKo: "포커",
    centerTheta: pokerCenter.theta,
    centerPhi: pokerCenter.phi,
    stars: pokerStars,
    edges: [
      { from: "poker-0", to: "poker-1", order: 0 },
      { from: "poker-1", to: "poker-3", order: 1 },
      { from: "poker-3", to: "poker-2", order: 2 },
      { from: "poker-2", to: "poker-0", order: 3 },
      { from: "poker-4", to: "poker-5", order: 4 },
      { from: "poker-4", to: "poker-6", order: 5 },
      { from: "poker-5", to: "poker-7", order: 6 },
      { from: "poker-6", to: "poker-7", order: 7 },
      { from: "poker-8", to: "poker-9", order: 8 },
    ],
  },
  {
    id: "soccer",
    labelEn: "Soccer",
    labelKo: "축구",
    centerTheta: soccerCenter.theta,
    centerPhi: soccerCenter.phi,
    stars: soccerStars,
    edges: [
      { from: "soccer-0", to: "soccer-1", order: 0 },
      { from: "soccer-1", to: "soccer-2", order: 1 },
      { from: "soccer-1", to: "soccer-3", order: 2 },
      { from: "soccer-1", to: "soccer-4", order: 3 },
      { from: "soccer-4", to: "soccer-5", order: 4 },
      { from: "soccer-5", to: "soccer-6", order: 5 },
      { from: "soccer-4", to: "soccer-7", order: 6 },
      { from: "soccer-7", to: "soccer-8", order: 7 },
      { from: "soccer-8", to: "soccer-9", order: 8 },
    ],
  },
  {
    id: "travel",
    labelEn: "Travel",
    labelKo: "여행",
    centerTheta: travelCenter.theta,
    centerPhi: travelCenter.phi,
    stars: travelStars,
    edges: [
      { from: "travel-0", to: "travel-1", order: 0 },
      { from: "travel-1", to: "travel-2", order: 1 },
      { from: "travel-2", to: "travel-3", order: 2 },
      { from: "travel-2", to: "travel-4", order: 3 },
      { from: "travel-2", to: "travel-5", order: 4 },
      { from: "travel-5", to: "travel-6", order: 5 },
      { from: "travel-6", to: "travel-7", order: 6 },
      { from: "travel-6", to: "travel-8", order: 7 },
    ],
  },
  {
    id: "camping",
    labelEn: "Camping",
    labelKo: "캠핑",
    centerTheta: campCenter.theta,
    centerPhi: campCenter.phi,
    stars: campStars,
    edges: [
      { from: "camp-0", to: "camp-1", order: 0 },
      { from: "camp-0", to: "camp-2", order: 1 },
      { from: "camp-1", to: "camp-3", order: 2 },
      { from: "camp-3", to: "camp-2", order: 3 },
      { from: "camp-4", to: "camp-5", order: 4 },
      { from: "camp-4", to: "camp-6", order: 5 },
      { from: "camp-5", to: "camp-7", order: 6 },
      { from: "camp-6", to: "camp-7", order: 7 },
      { from: "camp-8", to: "camp-9", order: 8 },
      { from: "camp-9", to: "camp-10", order: 9 },
    ],
  },
];

export function getAllConstellationStars(): ConstellationStar[] {
  return CONSTELLATIONS.flatMap((c) => c.stars);
}

export function sphericalToCartesian(
  theta: number,
  phi: number,
  radius: number
): [number, number, number] {
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}
