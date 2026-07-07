// ═══════════════════════════════════════════════════════════════════════════
// DBGA 2026 — Unified Apps Script
// Deploy: Extensions → Apps Script → Deploy → New Deployment
//         Execute as: Me | Who has access: Anyone
// ═══════════════════════════════════════════════════════════════════════════

// ─── TAB DEFINITIONS ──────────────────────────────────────────────────────
const HOLE_HEADERS = Array.from({length: 18}, (_, i) => `H${i + 1}`);

const TAB_CONFIG = {
  Scores_R1: {
    headers:     ['Donkey1', ...HOLE_HEADERS],
    idCol:       'Donkey1',
    description: 'R1 · The Jack · Friday Scramble (keyed by Donkey partner name)',
    color:       '#7EC8E3',  // sky blue
  },
  Scores_R2: {
    headers:     ['Name', ...HOLE_HEADERS],
    idCol:       'Name',
    description: "R2 · Owl's Nest · Saturday Best Ball",
    color:       '#F4A7C3',  // pink
  },
  Scores_R3: {
    headers:     ['Name', ...HOLE_HEADERS],
    idCol:       'Name',
    description: "R3 · Owl's Nest · Sunday Individual",
    color:       '#B88FE0',  // lavender
  },
  Scramble: {
    headers:     ['Team', 'Player1', 'Player2'],
    idCol:       'Player1',
    description: 'Scramble pair definitions — Team (donkeys/brains), Player1, Player2',
    color:       '#F4A7C3',
  },
  Pairings: {
    headers:     ['Round', 'Match', 'Donkey1', 'Donkey2', 'Brain1', 'Brain2', 'TeeTime', 'MatchType'],
    idCol:       'Round',
    description: 'Match pairings — written by site pairing builder, do not edit manually',
    color:       '#FFE156',  // yellow
  },
  Draft: {
    headers:     ['Name', 'Team', 'PickNumber', 'Captain'],
    idCol:       'Name',
    description: 'Draft results — written by draft board, do not edit manually',
    color:       '#6EDCC4',  // mint
  },
};

// Course par and stroke index data for conditional formatting reference
const COURSE_DATA = {
  Scores_R1: {
    name:  'The Jack',
    pars:  [4,4,4,4,3,4,4,3,4, 4,4,3,5,4,4,3,4,5],
    slope: 117, rating: 68.6,
  },
  Scores_R2: {
    name:  "Owl's Nest",
    pars:  [4,4,4,5,3,4,3,4,5, 3,4,4,5,3,4,4,5,4],
    slope: 133, rating: 73.0,
  },
  Scores_R3: {
    name:  "Owl's Nest",
    pars:  [4,4,4,5,3,4,3,4,5, 3,4,4,5,3,4,4,5,4],
    slope: 133, rating: 73.0,
  },
};

// ─── ROSTER (for validation dropdowns) ────────────────────────────────────
const ROSTER = [
  'Jack Lyons', 'Carson Smith', 'Josh McLeman', 'Matt Holm',
  'Ed Weaver', 'Justin Roberts', 'Justin Estrella', 'Devan Dhand',
  'Matt DiPano', 'David Resmini', 'Mitchell Rotondi', 'Jason Sulmonetti',
  'Brendan Barry', 'Trevor Ross', 'Corey DaSilva', 'David Allen',
];

// ─── COLORS ───────────────────────────────────────────────────────────────
const COLORS = {
  headerBg:    '#1A1A2E',
  headerText:  '#6EDCC4',
  altRow:      '#16162A',
  baseRow:     '#12121F',
  borderColor: '#2A2A4A',
  eagle:       { bg:'#FFE156', text:'#1A1A2E' },  // yellow
  birdie:      { bg:'#1A4A3A', text:'#6EDCC4' },  // dark green
  par:         { bg:'#12121F', text:'#FFFFFF' },  // base dark
  bogey:       { bg:'#3A1A2A', text:'#F4A7C3' },  // dark pink
  double:      { bg:'#4A1A1A', text:'#EF4444' },  // dark red
  worse:       { bg:'#5A1A1A', text:'#DC2626' },  // darker red
  noScore:     { bg:'#1A1A2E', text:'#444466' },  // dim
  descBg:      '#0E0E1A',
  descText:    '#444466',
  protectedBg: '#1A1A1A',
};

// ═══════════════════════════════════════════════════════════════════════════
// doGET — read all data, OR handle ?action=saveScore writes
// scores.html saves via GET+params (avoids CORS preflight on Apps Script)
// ═══════════════════════════════════════════════════════════════════════════
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const action = e && e.parameter && e.parameter.action;
  if (action === 'saveScore') {
    let data;
    try { data = JSON.parse(e.parameter.data); }
    catch(err) { return jsonResponse({ status: 'error', error: 'Invalid JSON in data param' }); }
    const result = upsertScore(ss, data.round, data.name, data.holes || []);
    return jsonResponse(result.ok ? { status: 'ok' } : { status: 'error', error: result.error });
  }

  if (action === 'savePairings') {
    let rows;
    try { rows = JSON.parse(e.parameter.data); }
    catch(err) { return jsonResponse({ status: 'error', error: 'Invalid JSON in data param' }); }
    rows = rows || [];
    const sheet = getOrCreateSheet(ss, 'Pairings');
    const frozenRows = sheet.getFrozenRows();
    // Determine which rounds are in this payload
    const rounds = [...new Set(rows.map(r => Number(r[0])).filter(n => n > 0))];
    if (rounds.length > 0) {
      // Delete only rows belonging to the rounds being saved (bottom-to-top to avoid row-index shifting)
      const allData = sheet.getDataRange().getValues();
      const toDelete = [];
      for (let i = allData.length - 1; i >= frozenRows; i--) {
        if (rounds.includes(Number(allData[i][0]))) toDelete.push(i + 1);
      }
      toDelete.forEach(rowNum => sheet.deleteRow(rowNum));
    } else {
      // Empty payload — clear all data rows (reset)
      const lastRow = sheet.getLastRow();
      if (lastRow > frozenRows) sheet.deleteRows(frozenRows + 1, lastRow - frozenRows);
    }
    rows.forEach(row => sheet.appendRow(row));
    return jsonResponse({ status: 'ok' });
  }

  if (action === 'saveDraft') {
    let picks;
    try { picks = JSON.parse(e.parameter.data); }
    catch(err) { return jsonResponse({ status: 'error', error: 'Invalid JSON in data param' }); }
    const sheet = getOrCreateSheet(ss, 'Draft');
    const frozenRows = sheet.getFrozenRows();
    const lastRow    = sheet.getLastRow();
    if (lastRow > frozenRows) sheet.deleteRows(frozenRows + 1, lastRow - frozenRows);
    const seen = {};
    (picks || []).forEach((p, i) => {
      const key = p.name;
      if (!seen[key] || (p.pickNumber || i+1) > (seen[key].pickNumber || 0)) {
        seen[key] = Object.assign({}, p, { pickNumber: p.pickNumber || (i + 1) });
      }
    });
    Object.values(seen)
      .sort((a, b) => a.pickNumber - b.pickNumber)
      .forEach(p => sheet.appendRow([p.name, p.team, p.pickNumber, p.captain ? 'YES' : '']));
    return jsonResponse({ status: 'ok' });
  }

  ensureAllTabs(ss); // auto-scaffold missing tabs on every read
  const result = {};
  Object.keys(TAB_CONFIG).forEach(name => {
    const sheet = ss.getSheetByName(name);
    result[name] = sheet ? sheetToObjects(sheet, TAB_CONFIG[name].headers) : [];
  });
  return jsonResponse(result);
}

// ═══════════════════════════════════════════════════════════════════════════
// doPOST — handle all write operations
// ═══════════════════════════════════════════════════════════════════════════
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch(err) {
    return jsonResponse({ status: 'error', error: 'Invalid JSON' });
  }

  const type = data.type;

  // ── PAIRINGS ────────────────────────────────────────────────────────────
  if (type === 'pairings') {
    const rows = data.rows || [];
    const sheet = getOrCreateSheet(ss, 'Pairings');
    const frozenRows = sheet.getFrozenRows();
    const rounds = [...new Set(rows.map(r => Number(r[0])).filter(n => n > 0))];
    if (rounds.length > 0) {
      const allData = sheet.getDataRange().getValues();
      const toDelete = [];
      for (let i = allData.length - 1; i >= frozenRows; i--) {
        if (rounds.includes(Number(allData[i][0]))) toDelete.push(i + 1);
      }
      toDelete.forEach(rowNum => sheet.deleteRow(rowNum));
    } else {
      const lastRow = sheet.getLastRow();
      if (lastRow > frozenRows) sheet.deleteRows(frozenRows + 1, lastRow - frozenRows);
    }
    rows.forEach(row => sheet.appendRow(row));
    return jsonResponse({ status: 'ok' });
  }

  // ── SCORE UPSERT ────────────────────────────────────────────────────────
  if (type === 'score') {
    const { round, name, holes } = data;
    const result = upsertScore(ss, round, name, holes || []);
    return jsonResponse(result.ok ? { status: 'ok' } : { status: 'error', error: result.error });
  }

  // ── SCRAMBLE PAIR DEFINITION ────────────────────────────────────────────
  if (type === 'scramble_pair') {
    const { team, player1, player2 } = data;
    const sheet = getOrCreateSheet(ss, 'Scramble');
    const existingRowNum = findRowByIdCol(sheet, 'Player1', player1);
    if (existingRowNum > 0) {
      sheet.getRange(existingRowNum, 1, 1, 3).setValues([[team, player1, player2]]);
    } else {
      sheet.appendRow([team, player1, player2]);
    }
    return jsonResponse({ status: 'ok' });
  }

  // ── DRAFT RESULTS ────────────────────────────────────────────────────────
  // data.picks: [{name, team, pickNumber, captain}]
  if (type === 'draft') {
    const sheet = getOrCreateSheet(ss, 'Draft');
    const frozenRows = sheet.getFrozenRows();
    const lastRow    = sheet.getLastRow();
    if (lastRow > frozenRows) sheet.deleteRows(frozenRows + 1, lastRow - frozenRows);
    const seen = {};
    (data.picks || []).forEach((p, i) => {
      const key = p.name;
      if (!seen[key] || (p.pickNumber || i+1) > (seen[key].pickNumber || 0)) {
        seen[key] = { ...p, pickNumber: p.pickNumber || (i + 1) };
      }
    });
    Object.values(seen)
      .sort((a, b) => a.pickNumber - b.pickNumber)
      .forEach(p => {
        sheet.appendRow([p.name, p.team, p.pickNumber, p.captain ? 'YES' : '']);
      });
    return jsonResponse({ status: 'ok' });
  }

  // ── SCAFFOLD — force-create/style all tabs ──────────────────────────────
  if (type === 'scaffold') {
    ensureAllTabs(ss);
    return jsonResponse({ status: 'ok', message: 'All tabs scaffolded' });
  }

  return jsonResponse({ status: 'error', error: `Unknown type: ${type}` });
}

// ═══════════════════════════════════════════════════════════════════════════
// SCORE UPSERT — shared by doGet(?action=saveScore) and doPost(type=score)
// ═══════════════════════════════════════════════════════════════════════════
function upsertScore(ss, round, name, holes) {
  const tabName = `Scores_${round}`;
  const cfg     = TAB_CONFIG[tabName];
  if (!cfg) return { ok: false, error: `Unknown round: ${round}` };

  const sheet   = getOrCreateSheet(ss, tabName);

  // If the sheet exists but was never properly scaffolded (no recognisable header row),
  // prepend a header row so findRowByIdCol can upsert instead of blindly appendRow-ing.
  const knownKeywords = ['Name','Donkey1','Round','Team','Player1'];
  const topRows = sheet.getLastRow() > 0
    ? sheet.getRange(1, 1, Math.min(sheet.getLastRow(), 4), 1).getValues().flat()
    : [];
  const hasHeader = topRows.some(v => knownKeywords.includes(String(v).trim()));
  if (!hasHeader && sheet.getLastRow() > 0) {
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, cfg.headers.length).setValues([cfg.headers]);
    sheet.setFrozenRows(Math.max(sheet.getFrozenRows(), 1));
  }

  const rowData = [name, ...holes.map(h => (h === null || h === undefined) ? '' : Number(h))];
  const existingRowNum = findRowByIdCol(sheet, cfg.idCol, name);

  if (existingRowNum > 0) {
    sheet.getRange(existingRowNum, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return { ok: true };
}

// ═══════════════════════════════════════════════════════════════════════════
// SHEET HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function ensureAllTabs(ss) {
  Object.keys(TAB_CONFIG).forEach(name => getOrCreateSheet(ss, name));
}

function getOrCreateSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    scaffoldSheet(ss, sheet, name);
  }
  return sheet;
}

function scaffoldSheet(ss, sheet, name) {
  const cfg = TAB_CONFIG[name];
  if (!cfg) return;

  // ── Description row (no merge — conflicts with setFrozenColumns) ────────
  sheet.appendRow([name + ' — ' + cfg.description]);
  sheet.getRange(1, 1, 1, Math.max(cfg.headers.length, 10))
    .setFontColor(COLORS.descText).setBackground(COLORS.descBg)
    .setFontStyle('italic').setFontSize(9);

  // ── Header row ───────────────────────────────────────────────────────
  sheet.appendRow(cfg.headers);
  styleHeaderRow(sheet, cfg.headers.length, COLORS.headerBg, cfg.color || COLORS.headerText);
  sheet.setFrozenRows(2);    // freeze description + header
  sheet.setFrozenColumns(1); // freeze name/id column

  // ── Column widths ────────────────────────────────────────────────────
  sheet.setColumnWidth(1, 160); // name column wider
  for (let i = 2; i <= cfg.headers.length; i++) {
    sheet.setColumnWidth(i, name === 'Pairings' ? 120 : 48);
  }

  // ── Tab color ────────────────────────────────────────────────────────
  sheet.setTabColor(cfg.color || '#6EDCC4');

  // ── Par row for score tabs ────────────────────────────────────────────
  if (COURSE_DATA[name]) {
    const courseInfo = COURSE_DATA[name];
    const parRow = ['PAR', ...courseInfo.pars];
    sheet.appendRow(parRow);
    const parRange = sheet.getRange(3, 1, 1, parRow.length);
    parRange.setBackground('#1A2A1A').setFontColor('#6EDCC4')
      .setFontWeight('bold').setFontSize(9);
    sheet.setFrozenRows(3); // freeze description + header + par row

    // ── Course name note in A3 ──────────────────────────────────────
    sheet.getRange(3, 1).setValue(`PAR (${courseInfo.name})`);
  }

  // ── Data validation ──────────────────────────────────────────────────
  applyValidation(sheet, name, cfg);

  // ── Protection ───────────────────────────────────────────────────────
  applyProtection(ss, sheet, name);

  // ── Sheet-level formatting ────────────────────────────────────────────
  sheet.setHiddenGridlines(true);
  const fullRange = sheet.getRange(1, 1, sheet.getMaxRows(), cfg.headers.length);
  fullRange.setVerticalAlignment('middle').setHorizontalAlignment('center');
  // Name column left-aligned
  sheet.getRange(1, 1, sheet.getMaxRows(), 1).setHorizontalAlignment('left');
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLING
// ═══════════════════════════════════════════════════════════════════════════

function styleHeaderRow(sheet, numCols, bg, fg) {
  const headerRowNum = sheet.getFrozenRows() >= 2 ? 2 : 1;
  const range = sheet.getRange(headerRowNum, 1, 1, numCols);
  range.setBackground(bg || COLORS.headerBg)
    .setFontColor(fg || COLORS.headerText)
    .setFontWeight('bold')
    .setFontSize(10)
    .setHorizontalAlignment('center');
  sheet.getRange(headerRowNum, 1).setHorizontalAlignment('left');
}

function styleDataRows(sheet, numCols, startRow, endRow) {
  const frozenRows = sheet.getFrozenRows();
  const dataStart = startRow || (frozenRows + 1);
  const dataEnd   = endRow   || sheet.getLastRow();
  if (dataStart > dataEnd) return;

  for (let r = dataStart; r <= dataEnd; r++) {
    const bg = r % 2 === 0 ? COLORS.altRow : COLORS.baseRow;
    sheet.getRange(r, 1, 1, numCols).setBackground(bg).setFontColor('#FFFFFF').setFontSize(10);
    sheet.getRange(r, 1).setFontWeight('bold'); // name col bold
  }
}

// ─── CONDITIONAL FORMATTING for score tabs ────────────────────────────────
function applyScoreConditionalFormatting(sheet, pars) {
  sheet.clearConditionalFormatRules();
  const rules = [];
  const lastRow = Math.max(sheet.getLastRow(), 30);
  const frozenRows = sheet.getFrozenRows();

  for (let col = 2; col <= 19; col++) {
    const holeIdx = col - 2;
    const par     = pars[holeIdx];
    if (!par) continue;

    const colLetter = columnToLetter(col);
    const range     = sheet.getRange(`${colLetter}${frozenRows + 1}:${colLetter}${lastRow}`);

    // ConditionalFormatRuleBuilder uses .setBold(bool), NOT .setFontWeight()
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThanOrEqualTo(par - 2)
      .setBackground(COLORS.eagle.bg).setFontColor(COLORS.eagle.text).setBold(true)
      .setRanges([range]).build());

    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberEqualTo(par - 1)
      .setBackground(COLORS.birdie.bg).setFontColor(COLORS.birdie.text).setBold(true)
      .setRanges([range]).build());

    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberEqualTo(par)
      .setBackground(COLORS.par.bg).setFontColor(COLORS.par.text)
      .setRanges([range]).build());

    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberEqualTo(par + 1)
      .setBackground(COLORS.bogey.bg).setFontColor(COLORS.bogey.text)
      .setRanges([range]).build());

    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberEqualTo(par + 2)
      .setBackground(COLORS.double.bg).setFontColor(COLORS.double.text).setBold(true)
      .setRanges([range]).build());

    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThanOrEqualTo(par + 3)
      .setBackground(COLORS.worse.bg).setFontColor(COLORS.worse.text).setBold(true)
      .setRanges([range]).build());
  }

  if (rules.length > 0) sheet.setConditionalFormatRules(rules);
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA VALIDATION
// ═══════════════════════════════════════════════════════════════════════════

function applyValidation(sheet, name, cfg) {
  if (name === 'Scores_R2' || name === 'Scores_R3') {
    applyIndividualScoreValidation(sheet);
  } else if (name === 'Scores_R1') {
    applyScrambleScoreValidation(sheet);
  } else if (name === 'Scramble') {
    applyScrambleDefValidation(sheet);
  }
}

function applyIndividualScoreValidation(sheet) {
  const frozenRows = sheet.getFrozenRows();
  const lastRow    = sheet.getMaxRows();

  const nameRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(ROSTER, true)
    .setAllowInvalid(false)
    .setHelpText('Select a player from the DBGA roster')
    .build();
  sheet.getRange(frozenRows + 1, 1, lastRow - frozenRows, 1).setDataValidation(nameRule);

  const scoreRule = SpreadsheetApp.newDataValidation()
    .requireNumberBetween(1, 15)
    .setAllowInvalid(false)
    .setHelpText('Enter gross score for this hole (1-15)')
    .build();
  sheet.getRange(frozenRows + 1, 2, lastRow - frozenRows, 18).setDataValidation(scoreRule);
}

function applyScrambleScoreValidation(sheet) {
  const frozenRows = sheet.getFrozenRows();
  const lastRow    = sheet.getMaxRows();

  const nameRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(ROSTER, true)
    .setAllowInvalid(false)
    .setHelpText('Enter the Donkey partner name (key for this scramble pair)')
    .build();
  sheet.getRange(frozenRows + 1, 1, lastRow - frozenRows, 1).setDataValidation(nameRule);

  const scoreRule = SpreadsheetApp.newDataValidation()
    .requireNumberBetween(1, 12)
    .setAllowInvalid(false)
    .setHelpText('Enter gross scramble score for this hole (1-12)')
    .build();
  sheet.getRange(frozenRows + 1, 2, lastRow - frozenRows, 18).setDataValidation(scoreRule);
}

function applyScrambleDefValidation(sheet) {
  const frozenRows = sheet.getFrozenRows();
  const lastRow    = sheet.getMaxRows();

  const teamRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['donkeys', 'brains'], true)
    .setAllowInvalid(false)
    .setHelpText('Enter team: donkeys or brains')
    .build();
  sheet.getRange(frozenRows + 1, 1, lastRow - frozenRows, 1).setDataValidation(teamRule);

  const nameRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(ROSTER, true)
    .setAllowInvalid(false)
    .setHelpText('Select a player from the DBGA roster')
    .build();
  sheet.getRange(frozenRows + 1, 2, lastRow - frozenRows, 2).setDataValidation(nameRule);
}

// ═══════════════════════════════════════════════════════════════════════════
// PROTECTION
// ═══════════════════════════════════════════════════════════════════════════

function applyProtection(ss, sheet, name) {
  if (name === 'Pairings') {
    const protection = sheet.protect()
      .setDescription('Written by site pairing builder — do not edit manually');
    protection.removeEditors(protection.getEditors());
    if (protection.canDomainEdit()) protection.setDomainEdit(false);
    return;
  }

  const frozenRows = sheet.getFrozenRows();
  if (frozenRows > 0) {
    const headerProtection = sheet.getRange(1, 1, frozenRows, sheet.getMaxColumns()).protect()
      .setDescription('Header rows — do not edit');
    headerProtection.removeEditors(headerProtection.getEditors());
    if (headerProtection.canDomainEdit()) headerProtection.setDomainEdit(false);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function sheetToObjects(sheet, defaultHeaders) {
  const data = sheet.getDataRange().getValues();
  let headerRowIdx = -1;
  for (let i = 0; i < Math.min(data.length, 4); i++) {
    const firstCell = String(data[i][0]).trim();
    if (['Name','Donkey1','Round','Team','Player1'].includes(firstCell)) {
      headerRowIdx = i;
      break;
    }
  }
  let headers, dataStart;
  if (headerRowIdx >= 0) {
    headers = data[headerRowIdx].map(h => String(h).trim());
    dataStart = headerRowIdx + 1;
  } else if (defaultHeaders) {
    headers = defaultHeaders;
    dataStart = 0;
  } else {
    return [];
  }
  return data.slice(dataStart)
    .filter(row => {
      const firstCell = String(row[0]).trim();
      return firstCell !== '' && firstCell !== 'PAR' && !firstCell.startsWith('PAR (');
    })
    .map(row => Object.fromEntries(headers.map((h, i) => [h, row[i] ?? ''])));
}

function findRowByIdCol(sheet, idCol, idVal) {
  const data = sheet.getDataRange().getValues();
  let headerRowIdx = -1;
  for (let i = 0; i < Math.min(data.length, 4); i++) {
    if (['Name','Donkey1','Round','Team','Player1'].includes(String(data[i][0]).trim())) {
      headerRowIdx = i;
      break;
    }
  }
  let colIdx, startIdx;
  if (headerRowIdx >= 0) {
    colIdx   = data[headerRowIdx].indexOf(idCol);
    if (colIdx < 0) return -1;
    startIdx = headerRowIdx + 1;
  } else {
    // No recognisable header row — the id column is always first (col 0) on all score tabs.
    colIdx   = 0;
    startIdx = 0;
  }
  for (let i = startIdx; i < data.length; i++) {
    const cellVal = String(data[i][colIdx]).trim();
    if (cellVal === String(idVal).trim()) return i + 1;
  }
  return -1;
}

function columnToLetter(col) {
  let letter = '';
  while (col > 0) {
    const mod = (col - 1) % 26;
    letter = String.fromCharCode(65 + mod) + letter;
    col = Math.floor((col - 1) / 26);
  }
  return letter;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ═══════════════════════════════════════════════════════════════════════════
// MANUAL TRIGGER — run once from Apps Script editor to set up the sheet
// ═══════════════════════════════════════════════════════════════════════════
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureAllTabs(ss);

  Object.keys(COURSE_DATA).forEach(tabName => {
    const sheet = ss.getSheetByName(tabName);
    if (sheet) applyScoreConditionalFormatting(sheet, COURSE_DATA[tabName].pars);
  });

  Object.keys(TAB_CONFIG).forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (sheet) styleDataRows(sheet, TAB_CONFIG[name].headers.length);
  });

  SpreadsheetApp.getUi().alert('DBGA sheet setup complete! All tabs created and formatted.');
}
