#!/usr/bin/env node
/*
 * bva-run.mjs
 *
 * Runs the Partner BVA model and prints its results as JSON.
 *
 * It does NOT reimplement the model. It fetches the published page, extracts
 * the script it already contains, evaluates it with minimal DOM stubs, applies
 * the scenario overrides, and calls the app's own calcRun(). Every constant,
 * rate, and formula therefore comes from the app, so this cannot drift from
 * what a partner sees in the browser. If the app is republished with a
 * different model, this picks that up on the next run.
 *
 * Usage:
 *   node bva-run.mjs                                   default scenario
 *   node bva-run.mjs --scenario '{"legacyJobs":600}'   one scenario
 *   node bva-run.mjs --scenarios scenarios.json        many, named
 *   node bva-run.mjs --lang de --currency '€'
 *   node bva-run.mjs --source ./bva.html               local copy, offline
 *   node bva-run.mjs --list-inputs                     print the input schema
 *   node bva-run.mjs --region france                   apply a regional rate card
 *   node bva-run.mjs --region dach --rate-band high    low (default), mid, or high
 *   node bva-run.mjs --list-regions                    print the regional bands and sources
 *
 * scenarios.json is either an array of {name, inputs} or an object of
 * name -> inputs.
 *
 * Exit codes: 0 ok, 2 bad usage, 3 could not fetch, 4 model did not load.
 */

import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import vm from 'vm';

const APP_URL = 'https://hicham-bab.github.io/partner-bva/index.html';
const CACHE = join(tmpdir(), 'partner-bva-cache.html');
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

/* ---------- args ---------- */
const argv = process.argv.slice(2);
function arg(name, fallback = null) {
  const i = argv.indexOf('--' + name);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback;
}
const flag = name => argv.includes('--' + name);

const lang = arg('lang', 'en');
const route = arg('route', 'calc');
const source = arg('source');

/* ---------- get the page ---------- */
async function getHtml() {
  if (source) {
    if (!existsSync(source)) fail(3, `source not found: ${source}`);
    return readFileSync(source, 'utf8');
  }
  if (existsSync(CACHE) && Date.now() - statSync(CACHE).mtimeMs < CACHE_MAX_AGE_MS && !flag('fresh')) {
    return readFileSync(CACHE, 'utf8');
  }
  try {
    const res = await fetch(APP_URL, { redirect: 'follow' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const html = await res.text();
    writeFileSync(CACHE, html);
    return html;
  } catch (e) {
    if (existsSync(CACHE)) {
      warn(`fetch failed (${e.message}), using cached copy from ${statSync(CACHE).mtime.toISOString()}`);
      return readFileSync(CACHE, 'utf8');
    }
    fail(3, `could not fetch the BVA app and no cache exists: ${e.message}`);
  }
}

function fail(code, msg) { console.error('bva-run: ' + msg); process.exit(code); }
function warn(msg) { console.error('bva-run: warning: ' + msg); }

/* ---------- sandbox ---------- */
function buildContext(js, language) {
  const noop = () => {};
  const el = new Proxy({}, {
    get: (t, k) => {
      if (k === 'style' || k === 'dataset' || k === 'classList') {
        return new Proxy({}, { get: () => noop, set: () => true });
      }
      if (typeof k === 'string' && /^(appendChild|addEventListener|removeEventListener|querySelector|querySelectorAll|setAttribute|getAttribute|insertAdjacentHTML|focus|remove|contains|closest)$/.test(k)) {
        return () => el;
      }
      return '';
    },
    set: () => true
  });

  const sandbox = {
    console: { log: noop, warn: noop, error: noop },
    document: {
      documentElement: el, body: el, head: el, title: '',
      getElementById: () => el, querySelector: () => el, querySelectorAll: () => [],
      createElement: () => el, createTextNode: () => el, addEventListener: noop
    },
    location: { search: '?lang=' + language, hash: '', pathname: '/', href: 'https://local/' },
    history: { replaceState: noop, pushState: noop },
    navigator: { clipboard: null, language, userAgent: 'bva-run' },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    setTimeout, clearTimeout, setInterval, clearInterval, requestAnimationFrame: noop,
    addEventListener: noop, removeEventListener: noop,
    matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop }),
    Math, Date, JSON, parseFloat, parseInt, isNaN, isFinite, Number, String, Boolean,
    Array, Object, RegExp, Error, encodeURIComponent, decodeURIComponent,
    btoa: s => Buffer.from(s, 'binary').toString('base64'),
    atob: s => Buffer.from(s, 'base64').toString('binary')
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  sandbox.self = sandbox;

  const ctx = vm.createContext(sandbox);
  // Top-level render code touches browser APIs we don't stub. The model is
  // defined before that runs, so a late throw is expected and harmless.
  try { vm.runInContext(js, ctx, { timeout: 30000 }); } catch (e) { /* expected */ }
  if (typeof ctx.calcRun !== 'function' || typeof ctx.calcInit !== 'function' || !ctx.CALC) {
    fail(4, 'the model did not load: calcRun, calcInit, or CALC missing. The app may have been restructured; ' +
            'fall back to entering the scenario in the browser and pasting the result.');
  }
  return ctx;
}

/* ---------- regional rate presets ---------- */
/* These are inputs, not model output. They replace the app's default rate card
 * with something regionally plausible when the partner has not given theirs.
 * Sourced, dated, and deliberately conservative: see data/regional-rates.json.
 */
function loadRegions() {
  const path = new URL('../data/regional-rates.json', import.meta.url);
  try { return JSON.parse(readFileSync(path, 'utf8')); }
  catch (e) { fail(3, `could not read data/regional-rates.json: ${e.message}`); }
}

function regionPreset(regionKey, band) {
  const data = loadRegions();
  const r = data.regions[regionKey];
  if (!r) {
    fail(2, `unknown region "${regionKey}". Known: ${Object.keys(data.regions).join(', ')}`);
  }
  const pick = pair => {
    if (band === 'low') return pair[0];
    if (band === 'high') return pair[1];
    return Math.round((pair[0] + pair[1]) / 2);
  };
  return {
    inputs: {
      currency: r.currency,
      archRate: pick(r.archRate),
      senRate: pick(r.senRate),
      engRate: pick(r.engRate),
      loadedCost: pick(r.loadedCost)
    },
    meta: {
      region: regionKey, label: r.label, band, currency: r.currency,
      bands: { archRate: r.archRate, senRate: r.senRate, engRate: r.engRate, loadedCost: r.loadedCost },
      notes: r.notes, sources: r.sources,
      retrieved: data._retrieved,
      caveat: data._what_these_numbers_are.dayRate
    }
  };
}

/* ---------- run one scenario ---------- */
function runScenario(js, name, inputs, language) {
  const ctx = buildContext(js, language);
  ctx.calcInit();

  const known = Object.keys(ctx.CALC.defaults);
  const unknown = Object.keys(inputs || {}).filter(k => !known.includes(k));
  if (unknown.length) {
    warn(`scenario "${name}": ignoring unknown input(s): ${unknown.join(', ')}`);
  }
  // Region preset first, so an explicit scenario input always wins over it.
  let regionMeta = null;
  const regionKey = arg('region');
  if (regionKey) {
    const preset = regionPreset(regionKey, arg('rate-band', 'low'));
    regionMeta = preset.meta;
    for (const [k, v] of Object.entries(preset.inputs)) { ctx.calc[k] = v; }
  }

  const applied = {};
  for (const [k, v] of Object.entries(inputs || {})) {
    if (known.includes(k)) { ctx.calc[k] = v; applied[k] = v; }
  }

  // Fill the discovery fields so a shared link opens with the prospect named
  // rather than blank. Unknown field ids are dropped by the app on load.
  const account = arg('account');
  const preparedBy = arg('prepared-by');
  if ((account || preparedBy) && typeof ctx.discoInit === 'function') {
    ctx.discoInit();
    if (account) ctx.disco.account = account;
    if (preparedBy) ctx.disco.preparedBy = preparedBy;
  }

  const m = ctx.calcRun();
  const share = typeof ctx.shareState === 'function' ? ctx.shareState() : '';
  const shareUrl = share
    ? `https://hicham-bab.github.io/partner-bva/?lang=${language}#/${route}?s=${encodeURIComponent(share)}`
    : null;

  const r = n => (typeof n === 'number' ? Math.round(n) : n);
  const r1 = n => (typeof n === 'number' ? Math.round(n * 10) / 10 : n);

  return {
    scenario: name,
    language,
    currency: ctx.calc.currency,
    motion: ctx.calc.move,
    region: regionMeta,
    rateCard: { archRate: ctx.calc.archRate, senRate: ctx.calc.senRate, engRate: ctx.calc.engRate,
                loadedCost: ctx.calc.loadedCost },
    inputsApplied: applied,
    partner: {
      year1: [r(m.y1Low), r(m.y1High)],
      year2: [r(m.y2Low), r(m.y2High)],
      year3: [r(m.y3Low), r(m.y3High)],
      threeYearPerClient: [r(m.totalLow), r(m.totalHigh)],
      practicePerYear: [r(m.practiceLow), r(m.practiceHigh)],
      practiceFeasible: [r(m.feasibleLow), r(m.feasibleHigh)],
      buildDays: [r1(m.buildDaysLow), r1(m.buildDaysHigh)],
      blendedRate: r(m.blendedRate)
    },
    client: {
      year1: [r(m.valueLow), r(m.valueHigh)],
      threeYear: [r(m.value3Low), r(m.value3High)]
    },
    capacity: {
      dealsPerYearAssumed: ctx.calc.dealsPerYear,
      maxDealsSupportable: r1(m.maxDeals),
      overCapacity: !!m.overCapacity,
      constrainedBy: m.bottleneck ? m.bottleneck.name : null,
      constraintDetail: m.bottleneck ? {
        headcount: m.bottleneck.n,
        daysPerDeal: r1(m.bottleneck.perDeal),
        utilisationPct: r1(m.bottleneck.util),
        capacityDays: r(m.bottleneck.cap)
      } : null
    },
    streams: (m.streams || []).map(s => ({
      group: s.group, name: s.name, days: [r1(s.lo), r1(s.hi)], dayRate: r(s.rate), note: s.note
    })),
    shareUrl
  };
}

/* ---------- main ---------- */
const html = await getHtml();
const blocks = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
if (!blocks.length) fail(4, 'no script found in the page');
const js = blocks.join('\n;\n');

if (flag('list-regions')) {
  const data = loadRegions();
  console.log(JSON.stringify({
    retrieved: data._retrieved, reverify: data._reverify,
    whatTheseAre: data._what_these_numbers_are, modelDefaults: data._model_defaults_note,
    regions: data.regions, gaps: data._gaps
  }, null, 2));
  process.exit(0);
}

if (flag('list-inputs')) {
  const ctx = buildContext(js, lang);
  console.log(JSON.stringify({
    inputs: ctx.CALC.defaults,
    roles: ctx.CALC.ROLES,
    note: 'Every value here is a starting point to be replaced, not a benchmark. ' +
          'Levers, reinvestShare, wizardPct, and softwareMarginPct default to zero or to the partner\'s own ' +
          'assumption because no sourced figure exists for them.'
  }, null, 2));
  process.exit(0);
}

let scenarios;
const scenariosFile = arg('scenarios');
if (scenariosFile) {
  if (!existsSync(scenariosFile)) fail(2, `scenarios file not found: ${scenariosFile}`);
  const parsed = JSON.parse(readFileSync(scenariosFile, 'utf8'));
  scenarios = Array.isArray(parsed)
    ? parsed.map(s => [s.name || 'unnamed', s.inputs || {}])
    : Object.entries(parsed);
} else {
  let inputs = {};
  const raw = arg('scenario');
  if (raw) {
    try { inputs = JSON.parse(raw); } catch (e) { fail(2, `--scenario is not valid JSON: ${e.message}`); }
  }
  const currency = arg('currency');
  if (currency) inputs.currency = currency;
  scenarios = [[arg('name', 'scenario'), inputs]];
}

const results = scenarios.map(([name, inputs]) => runScenario(js, name, inputs, lang));

console.log(JSON.stringify({
  source: source || APP_URL,
  generated: new Date().toISOString().slice(0, 10),
  disclaimer: 'Ranges from the Partner BVA model. Not a quote, not a forecast. ' +
              'Present ranges as ranges and never a midpoint as the number. ' +
              'Where a region preset was applied, the rate card is a sourced regional starting point and a ' +
              'conservative floor, not the partner\'s rate card. Ask for theirs and rerun.',
  results
}, null, 2));
