# Source registry and baseline

Every claim in this plugin that can go stale, with its source and the value recorded at last verification.
The currency check diffs live sources against this table and reports differences. **Eleven areas.**

**Baseline verified: 2026-08-11.** Update this date and the values below on every run.

---

## 1. Product naming

| Claim | Source | Baseline value |
|---|---|---|
| dbt State is current name; state-aware orchestration retired | `/docs/deploy/dbt-state-about`, `/faqs/Runs/what-happened-to-sao` | dbt State, **Preview**. SAO not available to new customers. Announced 1 Jun 2026 by dbt Labs + Fivetran. No forced migration timeline while in Preview. |
| dbt Wizard exists, is the AI story | `/docs/platform/wizard-overview`, `/docs/dbt-ai/about-dbt-wizard-cli` | dbt Wizard in platform (**Preview**) and dbt Wizard CLI (**Beta**) |
| dbt platform, not dbt Cloud | Org brand guidelines + Fusion GA messaging framework | Transition active. Flag "dbt Cloud" in platform/Fusion content. |
| Coalesce retired | Org brand guidelines | Retired 31 Jan 2026. Current event naming: **dbt Summit**. |

**Check for:** any of these moving from Preview/Beta to GA, and any new product name appearing in
`/docs/dbt-versions/product-lifecycles` or recent release notes.

## 2. Out-of-scope features

| Feature | Source | Baseline |
|---|---|---|
| dbt Canvas | `/docs/platform/canvas` | Still fully documented publicly. Excluded by owner instruction. |
| dbt Insights | `/docs/explore/dbt-insights` | Beta. Still documented. Excluded. |
| dbt Copilot (all surfaces) | `/docs/dbt-ai/*`, `/docs/dbt-ai/analyst-agent` | Still documented. Excluded. |
| Cost Insights — **in scope** | `/docs/explore/cost-insights` | Separate feature, approved for use. |

**Check for:** whether the public docs have caught up and now mark Canvas / Insights / Copilot as deprecated
or removed. If so, flag it — the internal-only caveat in `brand-voice.md` can then relax to a public one.
Also check the dbt pricing page, which currently still lists all three as tier features.

## 3. Cross-platform Mesh

| Claim | Source | Baseline |
|---|---|---|
| Supported combinations | `/docs/mesh/cross-platform-mesh` | Snowflake ↔ Databricks (Unity), ↔ Athena (Glue), ↔ BigQuery (BigLake), ↔ DuckDB (Horizon), Databricks ↔ DuckDB (Unity) |
| Fabric not supported | same | **Fabric absent from the list** |
| Catalog sync prerequisite | same | Snowflake catalog-linked databases, Databricks catalog federation, AWS Glue catalog federation, GCP Lakehouse runtime catalog |
| Required flag | same | `use_catalogs_v2: true` |
| Plan gating | `getdbt.com/pricing`, `/docs/mesh/govern/project-dependencies` | dbt Mesh cross project and cross platform both listed as Enterprise tier |

**Check for:** new platform combinations, especially **Fabric** — if Fabric is added, update both Fabric
platform profiles, which currently forbid showing it.

## 4. dbt Wizard CLI

| Claim | Source | Baseline |
|---|---|---|
| Release phase | `/docs/dbt-ai/about-dbt-wizard-cli` | **Beta** |
| Runs standalone | same | Locally, from any project using dbt CLI, Fusion, or dbt Core |
| BYOK providers (CLI) | same | OpenAI, Anthropic, Azure AI Foundry/Azure OpenAI, AWS Bedrock, Google Gemini, Snowflake Cortex, Databricks Unity AI Gateway |
| Anthropic caveat | same | Claude Enterprise / subscription licences not supported; BYOK requires an Anthropic API key |
| Extensibility | `/docs/dbt-ai/wizard-mcp`, `-skills`, `-subagents`, `/best-practices/how-to-use-wizard/wizard-8-plugins-hooks` | MCP servers, skills, subagents, plugins and hooks |
| Best-practice guides | `/best-practices/how-to-use-wizard/*` | wizard-4 tests, wizard-5 debug, wizard-6 deferral, wizard-8 plugins |

**Check for:** Beta → GA, new providers, new guides in the series (currently at least 8 parts).

## 5. dbt State

| Claim | Source | Baseline |
|---|---|---|
| Release phase | `/docs/deploy/dbt-state-about` | **Preview**. Login required, usage-based. |
| Standalone account | same | `app.state.dbt.com`, independent of any dbt platform account |
| Works with | same | dbt Core, dbt platform, Fusion, external orchestrators |
| Key config | `/reference/resource-configs/lag-tolerance` | `lag_tolerance`, compares against underlying data freshness |
| Price | `getdbt.com/pricing` | **$0.094 per billable DATT**, 30-day free trial for eligible new orgs, billed monthly |
| Diagnosis command | `/docs/deploy/dbt-state-about` | `dbt-state explain` — experimental, dbt Core v1.7–v1.12, not in Fusion or platform |
| Billing start after SAO trial | same | 1 Sep 2026 |

**Check for:** Preview → GA (which would also introduce a migration timeline for SAO users), price change,
`dbt-state explain` leaving experimental, and the trial/billing dates passing.

## 6. Certifications

| Claim | Source | Baseline |
|---|---|---|
| Two exams and ladder | Internal enablement material, `getdbt.com/dbt-certification` | dbt Fundamentals badge → dbt Analytics Engineering Certification → dbt Architect Certification |
| AE exam format | Study guide | 2 hours, 65 questions, 65% pass |
| Price | Study guide | $200 per attempt; SI partner discount commonly 20% |
| Validity | Study guide | 2 years |
| Voucher / code terms | Partner support | Vouchers $200, expire 1 year; discount codes one cert each, redeem within 90 days |
| dbt Core version tracked | FY27 study guide | **Verify every run — this changes** |
| Exam language availability | Internal partner support + certification pages | AE exam localised in **Japanese**; Architect exam available in **French** (AE not, as of Feb 2026). No evidence for Spanish, Italian, German. Older study guides saying "English only" are stale. |
| Registration | Talview | `pages.talview.com/dbtlabs/certifications/` |
| Partner portal | — | `partners.getdbt.com`, credentials dashboard at `/px/-/credentials-dashboard` |

**Check for:** the dbt Core version the exam tracks, price changes, any new certification or retirement of an
existing one, and **new exam language localisations** — this is actively expanding and feeds `languages.md`.

## 7. Pricing

| Claim | Source | Baseline |
|---|---|---|
| dbt tiers | `getdbt.com/pricing` | Developer free (3,000 models, 1 project); Starter $100/user/mo (5 seats, 15,000 models); Enterprise custom (100,000 models, 30 projects); Enterprise+ custom (unlimited projects) |
| Fivetran plans | `fivetran.com/pricing` | Free, Standard, Enterprise, Business Critical. Consumption-based on MAR. |
| Fivetran transformations tiering | same | 0–5,000 $0.00; 5,001–30,000 $0.01; 30,001–100,000 $0.007; 100,000+ $0.002 per model run |
| Annual discount | same | Up to 22%, starting at 5% |
| Combined pricing | Merger reporting | **Does not exist yet.** Products priced separately; bundling expected over time. |

**Check for:** any bundled Fivetran + dbt pricing appearing — that is the single highest-value change to catch,
and it would rewrite `pricing.md`. Also watch for the dbt pricing page dropping Canvas / Insights / Copilot
rows.

## 8. Lifecycle and EOL

| Claim | Source | Baseline |
|---|---|---|
| HVR 5.7 EOL | `fivetran.com/docs/hvr5/introduction/hvr-5-release-life-cycle` | **31 Dec 2026.** Extended support ended 31 Dec 2025. |
| HVR current line | `fivetran.com/docs/hvr6` | HVR 6 |
| Transitional Extended support | HVR 5 lifecycle page | Only for customers migrating to HVR 6 before 1 Jan 2027; best-efforts, no bug fixes or SLAs |
| Census Store sunset | `fivetran.com/docs/activations/census-migration-faq` | **1 Aug 2026** (passed) |
| Census month-to-month plans | same | Ended Mar 2026 |
| Census V1 API / `api.getcensus.com` | same | Deprecation planned, **date to be confirmed** |
| Workspace API multi-source | same | Will be removed, date to be confirmed |
| Account ID migration | same | Census `341876425553` → add Fivetran `834469178297` |

**Check for:** the several "to be confirmed" dates becoming concrete — these are the highest-churn items in the
whole registry. Also check `fivetran.com/docs/changelog` for new EOL announcements, and note that Fivetran
posts EOL notices 12 months ahead.

## 9. Platform divergences (multi-platform content)

| Claim | Source | Baseline |
|---|---|---|
| Incremental strategies by adapter | `/docs/build/incremental-strategy` | Snowflake and Databricks support all five (`append`, `merge`, `delete+insert`, `insert_overwrite`, `microbatch`). BigQuery lacks `append` and `delete+insert`. Fabric lacks `insert_overwrite`. `microbatch` supported on every listed adapter. |
| Custom strategy support | same | Not supported on BigQuery and Spark adapters |
| Constraint enforcement | `/reference/resource-properties/constraints` | Only `not_null` broadly enforced. No platform enforces `unique` or `primary_key` except Postgres. Databricks enforces `check`; Snowflake and BigQuery don't support it. Spark defines all, enforces none. Athena supports none. |
| Constraint prerequisites | same | `table` and `incremental` materializations only; requires enforced contract with `data_type` on every column |

**Check for:** any adapter gaining or losing a strategy, and any change in constraint enforcement — both feed
the comparison tables in `multi-platform.md`, which are the substance of multi-platform sessions.

## 10. Deck template

| Claim | Source | Baseline |
|---|---|---|
| Template and layouts | Google Slides template ID in `slide-library.md` | Verified accessible; layout IDs recorded |

**Check for:** template still accessible, layout names and IDs unchanged. If dbt Labs issues a new partner
template, that supersedes this and needs a fresh layout audit.

## 11. Merger and org facts

| Claim | Source | Baseline |
|---|---|---|
| Merger completed | Fivetran press release | 1 Jun 2026 (announced Oct 2025) |
| Leadership | same | George Fraser CEO, Tristan Handy President |
| Scale | same | 100,000+ data teams, approaching $600M ARR |

**Check for:** leadership changes, a unified company name replacing "Fivetran + dbt Labs", and updated scale
figures. A rename would ripple through every deck.
