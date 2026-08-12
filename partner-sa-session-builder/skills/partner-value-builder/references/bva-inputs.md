# BVA inputs, in business language

The model takes about thirty inputs. A partner manager should never be asked for thirty things, so this file
maps the four discovery answers onto them and states which defaults are being borrowed.

**Get the current schema from the model rather than trusting this list:**

```bash
node scripts/bva-run.mjs --list-inputs
```

That prints the live defaults and the role definitions. If it disagrees with anything below, it wins.

---

## What each input means, without the jargon

**The partner's own business**

| Input | In plain terms | Notes |
|---|---|---|
| `archN`, `senN`, `engN` | How many architects, senior engineers, engineers | Drives both the rate and the capacity check |
| `archRate`, `senRate`, `engRate` | What each bills per day | Their real rates if they will share them |
| `billableDays` | Billable days a year per person | 200 is the model's default |
| `dealsPerYear` | How many clients like this they expect to do a year | The number the capacity check tests |
| `reinvestShare` | Of the budget the client frees up, what share the partner wins as services | Their assumption. No benchmark exists |
| `softwareMarginPct` | Margin on resold software, if any | Zero unless they tell you |
| `currency` | Their currency | Symbol only. Nothing is converted except the dbt State price |

**The client's estate**

| Input | In plain terms | Notes |
|---|---|---|
| `move` | The motion: replacing a legacy tool, or building on the platform | Changes which workstreams exist |
| `engineers` | Data engineers on the client side | With `loadedCost`, sets the capacity released |
| `loadedCost` | Fully loaded cost per engineer per year | Salary plus everything |
| `legacyJobs` | Jobs or workflows in the legacy tool | The volume line, and most of the partner's revenue |
| `legacySpend` | What the legacy licence costs a year | The largest cash line on the client side |
| `timeOnLegacy` | Share of the team's time spent on that estate | Caps how much capacity can come back |
| `retireShare` | Share of the legacy estate genuinely retired | Default 75, deliberately not 100 |
| `sources` | Data sources to ingest | Drives the Fivetran workstreams |
| `ftMaintDays` | Days a month maintaining hand-built pipelines today | Their figure, not a benchmark |
| `models`, `runsPerDay` | Size and cadence of the dbt project | Feeds the dbt State estimate |
| `warehouseSpend` | The dbt-driven slice of warehouse compute | Not the whole bill |
| `totalWarehouseSpend` | The whole warehouse compute bill | Used for the lake case, since ingestion is not caused by dbt |
| `newSoftwareSpend` | What they will pay for the platform, Fivetran, and the lake | Netted off, which is what makes the released figure defensible |
| `benefitMonth` | Month the client's benefit starts | Default 9, because a licence cannot be retired before a parallel run finishes |
| `dataBudget` | Their whole data budget, if known | Zero means derive it |
| `lakeToday` | Warehouse or lake today | An existing lake user has no ingestion bill to release |
| `ftOn`, `swOn`, `lakeOn` | Which workstreams are in scope | Lake is off by default |
| `wizardPct` | Share of reading, documenting, and test writing that dbt Wizard compresses | Their assumption. The app refuses to supply a figure |

**The four partnership levers**, all zero by default: `partnerWonDeals`, `juniorShiftPct`, `extensionPct`,
`rampDaysSaved`. Every one is the partner's own assumption about their own business. Leave them at zero unless
the partner manager gives a figure, and label them as the partner's estimate when they do.

---

## Mapping the discovery answers

**Team size** sets the role mix. Rates stay at the model's defaults unless the partner manager knows better,
and get labelled as assumptions when they don't.

| Answer | `archN` | `senN` | `engN` | `dealsPerYear` |
|---|---|---|---|---|
| 1 to 3 | 1 | 1 | 1 | 2 |
| 4 to 10 | 1 | 2 | 3 | 3 |
| 11 to 30 | 2 | 5 | 8 | 4 |
| More than 30 | 4 | 8 | 12 | 6 |

**Client profile** sets the estate. These are deliberately round starting points, not benchmarks.

| Answer | `engineers` | `legacyJobs` | `sources` | `legacySpend` | `warehouseSpend` | `totalWarehouseSpend` | `models` |
|---|---|---|---|---|---|---|---|
| Small | 3 | 60 | 5 | 120,000 | 150,000 | 250,000 | 120 |
| Mid-market | 8 | 250 | 12 | 400,000 | 600,000 | 1,100,000 | 500 |
| Large enterprise | 30 | 1,200 | 40 | 1,500,000 | 2,200,000 | 4,000,000 | 2,500 |
| A mix | Run all three as separate scenarios | | | | | | |

Mid-market matches the model's own defaults, so that scenario borrows nothing extra.

**Goal** sets the motion and what the deck leads with.

| Goal | `move` | Lead with |
|---|---|---|
| Grow an existing practice | `legacy` | Practice revenue per year, and the capacity ceiling |
| Recruit a new partner | `legacy` | Three-year value per client, and how little is needed to start |
| One named prospect | Whatever fits that prospect | That prospect's numbers, with the two others as context |
| Re-engage a quiet partner | `platform` | The client-side story, since their problem is usually a stalled client conversation |

**Currency** follows the language: euro for French, German, Spanish, and Italian, dollar for English unless the
partner is European, yen for Japanese. Ask if it matters, and remember the symbol does not convert anything.

---

## The capacity output, which is the one to lead with

The model returns `maxDealsSupportable`, `overCapacity`, and `constrainedBy`, and this is usually the most
valuable slide in the deck for a partner manager. It answers "can they actually deliver this", and it names the
role that runs out first.

A partner whose nominal practice revenue is four times their feasible revenue does not have a demand problem,
they have a hiring and enablement problem. That is a certification conversation, a shadowing conversation, and
sometimes a reason to bring in another partner. Read it as an opportunity rather than a limit, and put the
number on the slide.

If the model reports `overCapacity: true`, say so on the slide. Presenting a revenue number the partner cannot
staff is the fastest way to lose their trust.

---

## Scenario file format

```json
{
  "small client":   { "engineers": 3,  "legacyJobs": 60,   "sources": 5 },
  "typical client": { "engineers": 8,  "legacyJobs": 250,  "sources": 12 },
  "large client":   { "engineers": 30, "legacyJobs": 1200, "sources": 40 }
}
```

Only the inputs that differ from the defaults need listing. Unknown keys are reported and ignored rather than
silently dropped, so a typo shows up as a warning instead of a wrong number.
