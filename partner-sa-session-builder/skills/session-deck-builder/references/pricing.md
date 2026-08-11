# Pricing: dbt and Fivetran

An **optional** block. Include it only when the session genuinely needs it: a partner sizing a client
proposal, a practice lead building a business case, or a direct question in the room.

## Rules before any pricing slide

1. **Always re-fetch both pricing pages at build time.** `https://www.getdbt.com/pricing` and
   `https://www.fivetran.com/pricing`. Never build a pricing slide from this file, from memory, or from a
   previous deck. Figures below are a snapshot taken **11 August 2026** and exist to tell you what shape to
   expect, not what to present.
2. **Never use third-party pricing aggregators.** Search results surface sites that restate dbt pricing with
   stale tier names and features. They are wrong often enough to be dangerous, and being wrong about price in
   front of a partner is expensive.
3. **List price only.** Never put a partner's or client's actual/negotiated pricing on a slide. Discounts,
   bundles, and ELAs belong to the account team.
4. **Add a "list price as of DATE, confirm with your account team" footnote** on every pricing slide.
5. **Route deal questions out of the room.** An SA presenting numbers can create an expectation that becomes
   a commitment. Answer with structure, refer specifics to the account team or deal desk.

## Combined Fivetran + dbt pricing does not exist yet

The merger completed **1 June 2026** (announced October 2025). George Fraser is CEO, Tristan Handy is
President. The combined company reports 100,000+ data teams and approaching $600M ARR.

Reporting at the time was explicit that in the short term **both products continue to run independently, with
tighter integration and bundled pricing expected over time.** So:

- There are still **two pricing models and two pricing pages**. Present them as such.
- **Do not construct, estimate, or imply a bundled price.** If asked, the honest answer is that the products
  are still priced separately today and bundling is expected over time, and that the account team is the route
  for anything forward-looking.
- Do not put a combined-pricing roadmap on a slide. That's PMM and sales leadership territory, and a partner
  will treat an SA slide as a commitment.

Verify merger and org facts before stating them; leadership and messaging can move.

## dbt pricing: shape as of 11 August 2026

Four tiers, seat-based with usage limits:

| Tier | Price | Seats | Models built / month | Projects |
|---|---|---|---|---|
| Developer | Free | 1 | 3,000 | 1 |
| Starter | $100 / user / month | 5 developer seats | 15,000 | 1 |
| Enterprise | Custom | Custom | 100,000 | 30 |
| Enterprise+ | Custom | Custom | 100,000 | Unlimited |

Positioning cues, not a feature dump; pick only what the session needs:

- **Developer**: free, 14-day Starter trial, browser IDE, MFA, job scheduling, 24x5 support without SLA
- **Starter**: adds basic dbt Catalog, basic dbt Semantic Layer (5k queried metrics/month), API access
- **Enterprise**: advanced Catalog and Semantic Layer (20k metrics), **dbt Mesh**, priority support, security
  review option. This is the tier where the governance story becomes real.
- **Enterprise+**: PrivateLink, IP restrictions, rollback, hybrid projects

**Plan gating worth knowing:** the pricing page lists both *dbt Mesh cross project* and *dbt Mesh cross
platform* as Enterprise-tier features. If a session includes the cross-platform Mesh story, know that it lands
at Enterprise. See `data-mesh.md`.

**A tension to handle deliberately:** the public pricing page still lists dbt Copilot, dbt Canvas, and dbt
Insights as tier features; all three are out of scope for our content (see `brand-voice.md`). Don't screenshot
or reproduce the full feature comparison table. Build your own simplified tier table with the rows the session
actually needs, and leave those out rather than showing and then not discussing them.

### dbt State pricing

Usage-based and separate from seats; you pay for the benefit of reuse:

| Item | Value |
|---|---|
| Price | $0.094 per billable DATT |
| Billing metric | Daily active target tables (DATT) |
| Free trial | 30 days free for eligible new orgs |
| Billing | Monthly |
| Availability | dbt Core 1.7+ and the dbt platform |

DATT counts the distinct target tables for which dbt State performs a unique skip or clone, plus unique test
reuse operations, on a given calendar day. The framing that makes sense to a partner: **you pay a fraction of
what you save**, because you're billed on reuse events, and each reuse is a build you didn't pay your warehouse
for. Pair it with the Cost Insights story if the session has a FinOps angle.

Details: `/docs/platform/billing/dbt-state-usage` and `/docs/deploy/dbt-state-trial`.

## Fivetran pricing: shape as of 11 August 2026

A different model: **consumption-based, not seat-based.** Unlimited users on paid plans. This contrast is
usually the most useful thing on the slide; the two products are priced on different axes, so a client's cost
driver differs between them.

Four plans (Free, Standard, Enterprise, Business Critical), spanning three products under one consolidated
usage-based plan: **Connections, Transformations, Activations.**

| Plan | Notable inclusions |
|---|---|
| Free | 500,000 MAR connections, 3,500 MAR activations, 5,000 monthly model runs |
| Standard | Unlimited users, 15-minute syncs, 700+ managed connectors, 200+ activation destinations, RBAC, REST API |
| Enterprise | 1-minute syncs, enterprise database connectors, custom roles, SCIM, choice of cloud provider, hybrid deployment |
| Business Critical | Customer-managed encryption keys, PCI DSS Level 1, private networking |

**The billing metric is MAR (monthly active rows).** Counts inserts and updates (including deletes); excludes
unchanged rows on re-syncs and the initial bulk sync. Per-connection cost curves mean the unit rate falls as
volume rises. A $5 base charge applies to standard connections with monthly usage between 1 MAR and 1M MAR
(not on the Free plan).

**Transformations tiering**, useful if a partner is comparing where transformation runs get billed:

| Monthly model runs | List rate per run |
|---|---|
| 0 – 5,000 | $0.00 |
| 5,001 – 30,000 | $0.01 |
| 30,001 – 100,000 | $0.007 |
| 100,000+ | $0.002 |

Other levers a partner will ask about: annual contracts save up to 22% (discounts start at 5% and scale with
list price); ELAs offer a fixed annual price with no consumption limits, for clients who value predictability;
14-day trials, and every new connection gets 14 days free. Data processing runs in the US, Canada, EU, UK,
Australia, India, and Singapore, with cloud-provider choice on Enterprise and region choice on Business
Critical; worth having ready for EMEA data-residency questions. There's a startup programme for Y Combinator
companies. Use the pricing estimator at `https://fivetran.com/pricing-estimator` rather than doing arithmetic
on a slide.

One artefact to expect: Fivetran's site still carries a legacy footnote that Fivetran Transformations is not a
product of or endorsed by dbt Labs. It predates the merger. Don't quote it, don't explain it, and if a partner
raises it, note it's legacy and move on.

## Slide shapes

| Need | Shape |
|---|---|
| Partner sizing a client proposal | One slide per product: dbt tiers, Fivetran plans. Then a "different cost drivers" slide, seats and model builds vs MAR. |
| Business case for a practice | Skip tier tables. One slide on cost drivers plus the dbt State reuse-saves-compute angle. |
| Someone asks in the room | Don't improvise numbers. Show the two pricing URLs, name the two models, refer specifics to the account team. |

Where possible prefer **linking to the pricing pages over reproducing them.** A slide with the two URLs and
the shape of each model ages well; a slide full of figures is wrong within a quarter and someone will quote it
back to you.

Recommended layouts: `Simple` + `add_table` for tiers (the template has no table layout, see
`slide-library.md`), Content slide for cost drivers, and put the "confirm with your
account team" line in the speaker notes as well as on the slide.
