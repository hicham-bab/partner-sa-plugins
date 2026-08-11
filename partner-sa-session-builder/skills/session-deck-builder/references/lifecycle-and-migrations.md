# Lifecycle, end-of-life, and in-flight migrations

Building a session around something being retired is one of the few mistakes a partner will remember. This
file tracks what's moving on both sides of the merged company.

**Facts below were verified 11 August 2026. Re-check before every session** — lifecycle dates move, and the
Census migration in particular has several dates still marked "to be confirmed".

## Public versus internal — the distinction that governs how you say it

| Category | Examples | How to handle |
|---|---|---|
| **Publicly documented lifecycle** | HVR 5.7 EOL, Census Store sunset, state-aware orchestration → dbt State | Safe and helpful to present. Partners need these dates to plan client work. |
| **Internal direction ahead of the docs** | dbt Canvas, dbt Insights, dbt Copilot (see `brand-voice.md`) | Do not tell a partner these are being retired. Build around them silently, raise with PMM. |

The test: if a customer could read the retirement date on a public docs page, you can say it. If the only
source is internal, you can't.

---

## Fivetran side

### HVR — a version end-of-life, not a product sunset

This is the correction most people need. **HVR is not going away. HVR 5 is.**

Source: `https://fivetran.com/docs/hvr5/introduction/hvr-5-release-life-cycle`

| Fact | Detail |
|---|---|
| HVR 5.7 end of life | **31 December 2026** |
| Extended support for 5.7 | Ended 31 December 2025 |
| All HVR 5.x releases | Support ended |
| Current supported line | **HVR 6** — `https://fivetran.com/docs/hvr6` |
| Transitional Extended support | Only for specific customers migrating to HVR 6 before 1 January 2027. Best-efforts only — no bug fixes, patches, enhancements, or SLAs. |

Two things follow for partner sessions:

1. **This is close.** As of August 2026 the HVR 5.7 EOL is roughly five months out. Any partner with clients
   on HVR 5 has a live migration conversation, and that is *partner services revenue* — frame it as an
   engagement opportunity, not a problem.
2. **HVR technology remains central.** High-Volume Agent (HVA) connectors are Fivetran's enterprise database
   connectors, available on the Enterprise plan. Don't let "HVR 5 is EOL" become "HVR is dead" in a partner's
   notes. Say "HVR 5.7 reaches end of life on 31 December 2026; HVR 6 is the current release."

Other HVR lifecycle mechanics if a session goes deep: GA versions since 5.6.0 are supported three years from
release; EA and patch releases don't extend a GA support window; EOL announcements are posted 12 months
ahead; versions are network-compatible with the two previous GA versions but not across a different initial
number. The docs also carry long OS and DBMS support tables with many vendor-sunset entries — check them
before promising a client's legacy platform is supported.

### Census → Fivetran Activations — a live migration with real sunsets

Census joined Fivetran and is being absorbed into **Activations**. Source:
`https://fivetran.com/docs/activations/census-migration-faq`

**Actually sunset:**

- **Census Store, CSV Uploads, and Mesh Datasets** — Census Store sunset **1 August 2026** (already passed as
  of this writing). Do not demo or reference these.
- **Workspace cloning, templates, and variables** — recommended path is Terraform.
- **Workspaces as a core organisational concept** — being removed. Functionality moves onto individual
  activation sources; new accounts are created without workspaces. Existing workspaces keep working during the
  transition, and the UI shifts to a source-centric view.
- **API endpoints** — workspace, workspace token, and workspace permission endpoints are deprecated. There's a
  stated plan to eventually deprecate `api.getcensus.com` and the Activations V1 API, dates to be confirmed.

**Naming and plan changes:**

- A Census "sync" is now an **activation sync**. An **activation** is the set of syncs between one activation
  source and one destination. Use the Fivetran vocabulary.
- Census Embedded is now **Activations in Powered by Fivetran**.
- All month-to-month Census plans **ended March 2026**. Paid annual plans run to contract end, then move to
  MAR-based consumption pricing.
- Plan mapping: Free → Free, Professional → Standard, Enterprise & Enterprise Lite → Enterprise. Exceptions:
  PrivateLink is Business Critical only; the Enterprise connector list changed to match Fivetran's; access
  controls are on all plans, with custom roles remaining Enterprise-only.

**The operational detail that breaks pipelines**, worth a slide for any partner running Census in production:
outbound IP addresses and cloud account IDs are changing. Legacy Census IPs must be supplemented with the new
Fivetran ranges, and AWS IAM policies referencing the Census account ID `341876425553` need Fivetran's
`834469178297` added alongside it. Get this into a migration checklist rather than a bullet.

**Watch the naming collision.** Census "Mesh Datasets" has nothing to do with dbt Mesh. If a session covers
both Activations and dbt Mesh, disambiguate explicitly — an architect hearing "mesh is being sunset" will
draw exactly the wrong conclusion. See `data-mesh.md`.

---

## dbt side

### state-aware orchestration → dbt State

Announced 1 June 2026. Publicly documented, safe to present, and **not urgent** — existing users can continue,
and there's no required migration timeline while dbt State is in Preview. Trials were extended until billing
begins 1 September 2026. Full detail in `wizard-and-state.md`; migration guide at
`/docs/deploy/dbt-state-migration`.

### Naming transitions

dbt Cloud → **dbt platform**, and Coalesce → **dbt Summit**. See `brand-voice.md`.

---

## Session guidance

**Migration content is partner revenue.** SI partners bill for migrations. A slide that names HVR 5.7's
December 2026 date, or the Census-to-Activations checklist, is more useful to a partner than another feature
tour — it's a scoped engagement they can sell this quarter. Internal partner messaging already frames
readiness and migration practices as repeatable engagements; this is the concrete version of that.

**Before finalising any deck, check nothing in it is being retired.** Specifically: HVR 5 screenshots or
version-specific instructions, Census UI or Census Store, workspace-based Census configuration, and anything
from `brand-voice.md`'s out-of-scope list.

**Recommended slide, when relevant:** one "what's moving and when" table with the publicly documented dates,
plus a next-steps slide framing migration as an engagement. Table slide, ≤ 70 words. Always footnote with the
date you verified, because someone will screenshot it.
