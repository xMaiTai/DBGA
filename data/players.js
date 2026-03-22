/**
 * DBGA Players Data
 * Last updated: 2023 season added (Triggs Memorial, Crystal Lake, Connecticut National)
 *
 * Course Stats:
 *   Twisted Dunes       - Slope 136, Rating 71.2, Yards 6353
 *   Prestwick CC        - Slope 138, Rating 72.2, Yards 6335
 *   TPC Myrtle          - Slope 143, Rating 70.9, Yards 6183
 *   Triggs Memorial     - Slope 128, Rating 71.1, Yards 6327
 *   Crystal Lake        - Slope 117, Rating 66.2, Yards 5498
 *   Connecticut National - Slope 121, Rating 68.7, Yards 5913
 */

export const COURSES = {
  'Twisted Dunes':        { slope: 136, rating: 71.2, yards: 6353 },
  'Prestwick CC':         { slope: 138, rating: 72.2, yards: 6335 },
  'TPC Myrtle':           { slope: 143, rating: 70.9, yards: 6183 },
  'Triggs Memorial':      { slope: 128, rating: 71.1, yards: 6327 },
  'Crystal Lake':         { slope: 117, rating: 66.2, yards: 5498 },
  'Connecticut National': { slope: 121, rating: 68.7, yards: 5913 },
};

export const SCORING_HISTORY = [
  // ── BRENDAN BARRY ────────────────────────────────────────────────────────
  { name: 'Brendan Barry',    year: 2025, course: 'TPC Myrtle',           round: 2, gross: 111 },
  { name: 'Brendan Barry',    year: 2025, course: 'Prestwick CC',         round: 1, gross: 111 },
  { name: 'Brendan Barry',    year: 2024, course: 'Twisted Dunes',        round: 1, gross: 115 },
  { name: 'Brendan Barry',    year: 2024, course: 'Twisted Dunes',        round: 2, gross: 112 },
  { name: 'Brendan Barry',    year: 2023, course: 'Triggs Memorial',      round: 1, gross: 114 },
  { name: 'Brendan Barry',    year: 2023, course: 'Crystal Lake',         round: 2, gross: 92  },
  { name: 'Brendan Barry',    year: 2023, course: 'Connecticut National', round: 3, gross: 105 },

  // ── CARSON SMITH ─────────────────────────────────────────────────────────
  { name: 'Carson Smith',     year: 2025, course: 'TPC Myrtle',           round: 2, gross: 94  },
  { name: 'Carson Smith',     year: 2025, course: 'Prestwick CC',         round: 1, gross: 88  },
  { name: 'Carson Smith',     year: 2024, course: 'Twisted Dunes',        round: 1, gross: 98  },
  { name: 'Carson Smith',     year: 2024, course: 'Twisted Dunes',        round: 2, gross: 102 },
  { name: 'Carson Smith',     year: 2023, course: 'Triggs Memorial',      round: 1, gross: 97  },
  { name: 'Carson Smith',     year: 2023, course: 'Crystal Lake',         round: 2, gross: 100 },
  { name: 'Carson Smith',     year: 2023, course: 'Connecticut National', round: 3, gross: 104 },

  // ── DEVAN DHAND ──────────────────────────────────────────────────────────
  { name: 'Devan Dhand',      year: 2025, course: 'TPC Myrtle',           round: 2, gross: 100 },
  { name: 'Devan Dhand',      year: 2025, course: 'Prestwick CC',         round: 1, gross: 107 },
  { name: 'Devan Dhand',      year: 2024, course: 'Twisted Dunes',        round: 1, gross: 115 },
  { name: 'Devan Dhand',      year: 2024, course: 'Twisted Dunes',        round: 2, gross: 112 },
  { name: 'Devan Dhand',      year: 2023, course: 'Triggs Memorial',      round: 1, gross: 94  },
  { name: 'Devan Dhand',      year: 2023, course: 'Crystal Lake',         round: 2, gross: 105 },
  { name: 'Devan Dhand',      year: 2023, course: 'Connecticut National', round: 3, gross: 101 },

  // ── ED WEAVER ────────────────────────────────────────────────────────────
  { name: 'Ed Weaver',        year: 2024, course: 'Twisted Dunes',        round: 1, gross: 100 },
  { name: 'Ed Weaver',        year: 2024, course: 'Twisted Dunes',        round: 2, gross: 102 },
  { name: 'Ed Weaver',        year: 2023, course: 'Triggs Memorial',      round: 1, gross: 100 },
  { name: 'Ed Weaver',        year: 2023, course: 'Crystal Lake',         round: 2, gross: 93  },
  { name: 'Ed Weaver',        year: 2023, course: 'Connecticut National', round: 3, gross: 96  },

  // ── JACK LYONS ───────────────────────────────────────────────────────────
  { name: 'Jack Lyons',       year: 2025, course: 'TPC Myrtle',           round: 2, gross: 90  },
  { name: 'Jack Lyons',       year: 2025, course: 'Prestwick CC',         round: 1, gross: 93  },
  { name: 'Jack Lyons',       year: 2024, course: 'Twisted Dunes',        round: 1, gross: 93  },
  { name: 'Jack Lyons',       year: 2024, course: 'Twisted Dunes',        round: 2, gross: 93  },
  { name: 'Jack Lyons',       year: 2023, course: 'Triggs Memorial',      round: 1, gross: 85  },
  { name: 'Jack Lyons',       year: 2023, course: 'Crystal Lake',         round: 2, gross: 87  },
  { name: 'Jack Lyons',       year: 2023, course: 'Connecticut National', round: 3, gross: 80  },

  // ── JASON SULMONETTI ─────────────────────────────────────────────────────
  { name: 'Jason Sulmonetti', year: 2024, course: 'Twisted Dunes',        round: 1, gross: 105 },
  { name: 'Jason Sulmonetti', year: 2024, course: 'Twisted Dunes',        round: 2, gross: 117 },
  { name: 'Jason Sulmonetti', year: 2023, course: 'Triggs Memorial',      round: 1, gross: 108 },
  { name: 'Jason Sulmonetti', year: 2023, course: 'Crystal Lake',         round: 2, gross: 119 },
  { name: 'Jason Sulmonetti', year: 2023, course: 'Connecticut National', round: 3, gross: 114 },

  // ── JOSH MCLEMAN ─────────────────────────────────────────────────────────
  { name: 'Josh McLeman',     year: 2025, course: 'TPC Myrtle',           round: 2, gross: 99  },
  { name: 'Josh McLeman',     year: 2025, course: 'Prestwick CC',         round: 1, gross: 106 },
  { name: 'Josh McLeman',     year: 2024, course: 'Twisted Dunes',        round: 1, gross: 91  },
  { name: 'Josh McLeman',     year: 2024, course: 'Twisted Dunes',        round: 2, gross: 93  },
  { name: 'Josh McLeman',     year: 2023, course: 'Triggs Memorial',      round: 1, gross: 93  },
  { name: 'Josh McLeman',     year: 2023, course: 'Crystal Lake',         round: 2, gross: 95  },
  { name: 'Josh McLeman',     year: 2023, course: 'Connecticut National', round: 3, gross: 95  },

  // ── JUSTIN ESTRELLA ──────────────────────────────────────────────────────
  { name: 'Justin Estrella',  year: 2025, course: 'TPC Myrtle',           round: 2, gross: 110 },
  { name: 'Justin Estrella',  year: 2025, course: 'Prestwick CC',         round: 1, gross: 106 },
  { name: 'Justin Estrella',  year: 2024, course: 'Twisted Dunes',        round: 1, gross: 100 },
  { name: 'Justin Estrella',  year: 2024, course: 'Twisted Dunes',        round: 2, gross: 98  },
  { name: 'Justin Estrella',  year: 2023, course: 'Triggs Memorial',      round: 1, gross: 93  },
  { name: 'Justin Estrella',  year: 2023, course: 'Crystal Lake',         round: 2, gross: 100 },
  { name: 'Justin Estrella',  year: 2023, course: 'Connecticut National', round: 3, gross: 105 },

  // ── MITCHELL ROTONDI ─────────────────────────────────────────────────────
  { name: 'Mitchell Rotondi', year: 2025, course: 'TPC Myrtle',           round: 2, gross: 109 },
  { name: 'Mitchell Rotondi', year: 2025, course: 'Prestwick CC',         round: 1, gross: 106 },
  { name: 'Mitchell Rotondi', year: 2024, course: 'Twisted Dunes',        round: 1, gross: 116 },
  { name: 'Mitchell Rotondi', year: 2024, course: 'Twisted Dunes',        round: 2, gross: 111 },
  { name: 'Mitchell Rotondi', year: 2023, course: 'Triggs Memorial',      round: 1, gross: 98  },
  { name: 'Mitchell Rotondi', year: 2023, course: 'Crystal Lake',         round: 2, gross: 105 },
  { name: 'Mitchell Rotondi', year: 2023, course: 'Connecticut National', round: 3, gross: 102 },

  // ── MATT DIPANO ──────────────────────────────────────────────────────────
  { name: 'Matt DiPano',      year: 2025, course: 'Prestwick CC',         round: 1, gross: 95  },
  { name: 'Matt DiPano',      year: 2025, course: 'TPC Myrtle',           round: 2, gross: 104 },
  { name: 'Matt DiPano',      year: 2024, course: 'Twisted Dunes',        round: 1, gross: 107 },
  { name: 'Matt DiPano',      year: 2024, course: 'Twisted Dunes',        round: 2, gross: 113 },
  { name: 'Matt DiPano',      year: 2023, course: 'Triggs Memorial',      round: 1, gross: 110 },
  { name: 'Matt DiPano',      year: 2023, course: 'Crystal Lake',         round: 2, gross: 112 },
  { name: 'Matt DiPano',      year: 2023, course: 'Connecticut National', round: 3, gross: 107 },

  // ── TREVOR ROSS ──────────────────────────────────────────────────────────
  { name: 'Trevor Ross',      year: 2025, course: 'TPC Myrtle',           round: 2, gross: 135 },
  { name: 'Trevor Ross',      year: 2025, course: 'Prestwick CC',         round: 1, gross: 116 },
  { name: 'Trevor Ross',      year: 2023, course: 'Triggs Memorial',      round: 1, gross: 115 },
  { name: 'Trevor Ross',      year: 2023, course: 'Crystal Lake',         round: 2, gross: 148 },
  { name: 'Trevor Ross',      year: 2023, course: 'Connecticut National', round: 3, gross: 123 },

  // ── DAVID RESMINI ────────────────────────────────────────────────────────
  { name: 'David Resmini',    year: 2025, course: 'TPC Myrtle',           round: 2, gross: 111 },
  { name: 'David Resmini',    year: 2025, course: 'Prestwick CC',         round: 1, gross: 107 },

  // ── MATT HOLM ────────────────────────────────────────────────────────────
  { name: 'Matt Holm',        year: 2025, course: 'TPC Myrtle',           round: 2, gross: 92  },
  { name: 'Matt Holm',        year: 2025, course: 'Prestwick CC',         round: 1, gross: 93  },
  { name: 'Matt Holm',        year: 2024, course: 'Twisted Dunes',        round: 1, gross: 97  },
  { name: 'Matt Holm',        year: 2024, course: 'Twisted Dunes',        round: 2, gross: 94  },
  { name: 'Matt Holm',        year: 2023, course: 'Triggs Memorial',      round: 1, gross: 87  },
  { name: 'Matt Holm',        year: 2023, course: 'Crystal Lake',         round: 2, gross: 93  },
  { name: 'Matt Holm',        year: 2023, course: 'Connecticut National', round: 3, gross: 93  },
];

function differential(gross, course) {
  const c = COURSES[course]; if (!c) return null;
  return ((gross - c.rating) * 113) / c.slope;
}
function calcHandicap(rounds) {
  if (!rounds.length) return null;
  const diffs = rounds.map(r => differential(r.gross, r.course)).filter(d => d !== null).sort((a, b) => a - b);
  const numBest = Math.max(1, Math.floor(diffs.length * 0.4));
  const best = diffs.slice(0, numBest);
  return Math.round((best.reduce((s, d) => s + d, 0) / best.length) * 10) / 10;
}
function avgGross(rounds) {
  if (!rounds.length) return null;
  return Math.round(rounds.reduce((s, r) => s + r.gross, 0) / rounds.length * 10) / 10;
}
function scoringTrend(rounds) {
  const years = [...new Set(rounds.map(r => r.year))].sort((a, b) => b - a);
  if (years.length < 2) return 'stable';
  const recentAvg = avgGross(rounds.filter(r => r.year === years[0]));
  const priorAvg  = avgGross(rounds.filter(r => r.year !== years[0]));
  if (!recentAvg || !priorAvg) return 'stable';
  const delta = recentAvg - priorAvg;
  if (delta < -3) return 'improving';
  if (delta > 3)  return 'declining';
  return 'stable';
}
function projectScore(rounds, handicap) {
  if (!rounds.length) return Math.round(72 + handicap * 1.1);
  const years = [...new Set(rounds.map(r => r.year))].sort((a, b) => b - a);
  let weightedSum = 0, totalWeight = 0;
  years.forEach((yr, i) => {
    const weight = Math.pow(0.7, i);
    const avg = avgGross(rounds.filter(r => r.year === yr));
    if (avg) { weightedSum += avg * weight; totalWeight += weight; }
  });
  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : Math.round(72 + handicap * 1.1);
}
function bestRound(rounds)  { return rounds.length ? Math.min(...rounds.map(r => r.gross)) : null; }
function worstRound(rounds) { return rounds.length ? Math.max(...rounds.map(r => r.gross)) : null; }

function buildPlayer({ name, nickname, funFact, overrideHandicap = null }) {
  const rounds = SCORING_HISTORY.filter(r => r.name === name);
  const hcp    = overrideHandicap !== null ? overrideHandicap : calcHandicap(rounds);
  const avg    = avgGross(rounds);
  const proj   = projectScore(rounds, hcp ?? 18);
  return { name, nickname, funFact, handicap: hcp, avgGross: avg, bestRound: bestRound(rounds), worstRound: worstRound(rounds), projectedScore: proj, trend: scoringTrend(rounds), roundsPlayed: rounds.length, history: rounds, team: null, draftRank: null };
}

const rosterDefs = [
  { name: 'Jack Lyons',        nickname: 'The Surgeon',     funFact: 'Has never recorded a snowman. Probably.' },
  { name: 'Carson Smith',      nickname: 'Steady Eddie',    funFact: 'The most consistent donkey brain on the course.' },
  { name: 'Josh McLeman',      nickname: 'The Grinder',     funFact: 'Will out-grind you on every single hole.' },
  { name: 'Matt Holm',         nickname: 'Silent Assassin', funFact: 'Says nothing. Shoots low. Leaves.' },
  { name: 'Ed Weaver',         nickname: 'The Weave',       funFact: 'Fairways and greens, no drama.' },
  { name: 'Justin Estrella',   nickname: 'El Capitan',      funFact: 'Always in contention, never wins. A true DBGA story.' },
  { name: 'Devan Dhand',       nickname: 'The Philosopher', funFact: 'Will analyze your swing mid-backswing.' },
  { name: 'Matt DiPano',       nickname: 'DiPaNo Bogeys',   funFact: 'Bogeys only. Doubles are beneath him (in theory).' },
  { name: 'David Resmini',     nickname: 'The Closer',      funFact: 'Clutch on the back nine. Front nine is another story.' },
  { name: 'Mitchell Rotondi',  nickname: 'Roto-Rooter',     funFact: "Finds trouble in places that shouldn't have trouble." },
  { name: 'Jason Sulmonetti',  nickname: 'Big Swing Sul',   funFact: 'Biggest swing on the course. Results vary.' },
  { name: 'Brendan Barry',     nickname: 'Double B',        funFact: 'Will describe his one good shot for the entire back nine.' },
  { name: 'Trevor Ross',       nickname: 'Wild Card',       funFact: 'Could shoot 90 or 148. Nobody knows. Not even Trevor.' },
  { name: 'Justin Roberts',    nickname: 'JRob',            funFact: 'Newcomer with a 20 handicap and something to prove.', overrideHandicap: 20 },
  { name: 'Corey DaSilva',     nickname: 'Da Wild Card',    funFact: 'A 35 handicap who plays with the heart of a scratch.', overrideHandicap: 35 },
];

const seen = new Set();
export const PLAYERS = rosterDefs
  .filter(p => { if (seen.has(p.name)) return false; seen.add(p.name); return true; })
  .map(buildPlayer)
  .sort((a, b) => a.projectedScore - b.projectedScore)
  .map((p, i) => ({ ...p, draftRank: i + 1 }));

export const TEAMS = {
  donkeys: { name: 'The Donkeys', emoji: '🫏', color: '#8B7355', players: [] },
  brains:  { name: 'The Brains',  emoji: '🧠', color: '#B88FE0', players: [] },
};

export const DRAFT_ORDER = [
  { pick: 1,  team: 'donkeys' }, { pick: 2,  team: 'brains'  }, { pick: 3,  team: 'brains'  },
  { pick: 4,  team: 'donkeys' }, { pick: 5,  team: 'donkeys' }, { pick: 6,  team: 'brains'  },
  { pick: 7,  team: 'brains'  }, { pick: 8,  team: 'donkeys' }, { pick: 9,  team: 'donkeys' },
  { pick: 10, team: 'brains'  }, { pick: 11, team: 'brains'  }, { pick: 12, team: 'donkeys' },
  { pick: 13, team: 'donkeys' }, { pick: 14, team: 'brains'  }, { pick: 15, team: 'donkeys' },
];

export const PUBLISHED_SHEET_ID = '2PACX-1vQbkalSJfOSnGTs0DEumVMMSbRwhTVIHF-4SYsRNsXrMgQC1N181zItgCRCxV5rnfoDV3Upy2tyFI69';

export async function fetchSheetTab(gid) {
  const url = `https://docs.google.com/spreadsheets/d/e/${PUBLISHED_SHEET_ID}/pub?gid=${gid}&single=true&output=csv`;
  const resp = await fetch(url);
  const text = await resp.text();
  const rows = text.trim().split('\n').map(r => r.split(',').map(c => c.trim()));
  const headers = rows[0];
  return rows.slice(1).filter(row => row.some(c => c.length > 0))
    .map(row => Object.fromEntries(headers.map((h, i) => [h, row[i] ?? ''])));
}

export const SHEET_GIDS = { players: '0', historicalScores: '953456908', trip2026: null };
export function getPlayer(name)         { return PLAYERS.find(p => p.name === name); }
export function getPlayersByDraftRank() { return [...PLAYERS].sort((a, b) => a.draftRank - b.draftRank); }
export function getTeamPlayers(teamKey) { return PLAYERS.filter(p => p.team === teamKey); }
export function getProjectedTeamScore(teamKey) {
  const players = getTeamPlayers(teamKey);
  if (!players.length) return null;
  return players.reduce((s, p) => s + (p.projectedScore || 0), 0);
}
