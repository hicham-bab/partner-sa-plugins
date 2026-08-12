# Verticals: what changes when the session is industry-specific

Read this whenever intake Q7 returns anything other than "not vertical-specific", including a free-text answer.

**The vertical changes the running example, not the product content.** Same arc, same features, same claims. What
changes is the data in the example, the metrics on the slides, the source systems in the demo, and the pain the
opening slide names. A session that says "orders" to a hospital group, or "patients" to a retailer, has lost the
only thing verticalization buys: the sense that this was built for them.

**Everything below is a starting point to confirm, not an assertion.** Metrics and source systems vary by
company, so the closing echo states the assumption and invites correction. Two hard rules still apply, from
`research-protocol.md`: exact Fivetran connector names are resolved from the docs at run time, never from the
lists here, and named customers, logos, and case studies come from internal sources only.

---

## Retail and e-commerce

| | |
|---|---|
| Running example | One day of orders, from the storefront to revenue by channel |
| Metrics that matter | Revenue by channel, average order value, conversion rate, inventory turns, return rate, margin after returns |
| Typical sources | Shopify, Salesforce Commerce, Stripe, an ERP, a loyalty platform, web events |
| The pain | Channels each carry their own definition of a sale. Returns and cancellations arrive days later and quietly invalidate yesterday's number. Peak trading is when the pipeline is least forgiving. |
| Governance angle | Restatement. When returns land late, the revenue number changes; contracts and tests are how finance learns to trust it anyway. |
| Demo hook | A connector against the storefront, then a model that reconciles gross to net after returns |

## Financial services and insurance

| | |
|---|---|
| Running example | Core banking or policy transactions, from the operational database to a risk or exposure view |
| Metrics that matter | Exposure by segment, arrears and default rates, claims ratio, cost to serve, regulatory capital inputs |
| Typical sources | An operational database (Postgres, Oracle, SQL Server), a core banking or policy system, Salesforce, a payments platform |
| The pain | The number has to be reproducible months later, and defensible to someone who was not in the room. Lineage is a regulatory requirement rather than a nice-to-have. |
| Governance angle | The strongest audience for contracts, tests, lineage, and access control. Lead act 5 with governance rather than treating it as an appendix. |
| Demo hook | A high-volume database connector, then a test failing on a rule the regulator cares about, then passing |

## Healthcare and life sciences

| | |
|---|---|
| Running example | Patient or trial-site activity, from the operational system to a cohort or capacity view |
| Metrics that matter | Cohort counts, throughput and capacity, time to result, adherence, cost per episode |
| Typical sources | An EHR or clinical system, a LIMS, an ERP, scheduling, device or sensor feeds |
| The pain | The most sensitive data with the most fragmented systems. Every pipeline decision is also a privacy decision, and consent scope constrains what may be joined. |
| Governance angle | Minimisation and access, not just quality. Show column-level lineage and access control, and be careful about what appears in a demo dataset at all. |
| Demo hook | Landing a de-identified extract, then a documented model showing which columns are restricted and why |

## Manufacturing and supply chain

| | |
|---|---|
| Running example | Production and shipment events, from the plant floor to on-time delivery |
| Metrics that matter | OEE, on-time in-full, yield and scrap, inventory days, supplier lead time variance |
| Typical sources | SAP or another ERP, an MES, a WMS, telemetry or IoT streams, supplier files |
| The pain | ERP data is slow and structurally awkward; machine data is fast and enormous. The interesting question sits exactly where those two meet. |
| Governance angle | Freshness and reconciliation. A daily ERP truth against a streaming shop-floor signal is where incremental strategy choices become visible. |
| Demo hook | An ERP connector plus a file or event source, then an incremental model reconciling the two |

## Public sector

| | |
|---|---|
| Running example | Service requests or case records, from the operational system to a service-level view |
| Metrics that matter | Caseload and backlog, time to resolution, service coverage, cost per case, take-up rates |
| Typical sources | A case management system, a CRM, open data files, a finance system |
| The pain | Long procurement, strict residency and sovereignty requirements, and a hard expectation that anything published can be audited and explained. |
| Governance angle | Residency and openness. Open table formats and catalogue choices matter more here than anywhere else, so the Managed Data Lake Service and Iceberg story lands well. |
| Demo hook | Landing into their own storage in an open format, then showing the lineage behind a published figure |

## Media, telco, and subscription

| | |
|---|---|
| Running example | Subscription and viewing or usage events, from the platform to churn and engagement |
| Metrics that matter | Active subscribers, churn and retention by cohort, ARPU, engagement per session, acquisition cost |
| Typical sources | A billing or subscription platform, Stripe, event streams, an ad or campaign platform, a CRM |
| The pain | Event volume is enormous and mostly uninteresting, the valuable signal is the aggregate, and cost per query becomes a design constraint rather than a finance problem. |
| Governance angle | Cost. This is the audience where Cost Insights and dbt State land hardest, because compute spend is a board-level line. |
| Demo hook | An event source, then an incremental model, then the cost difference between rebuilding and not |

---

## Any other vertical

For a free-text answer not covered above, build the profile at run time rather than falling back to generic
content. Resolve, in this order:

1. **The metrics.** Ask the user, or take them from internal content for that industry. Three is enough.
2. **The source systems**, then resolve their exact Fivetran connector names from the docs. If the obvious
   system has no connector, say so plainly and pick a source that does, rather than demoing something that
   cannot be demoed.
3. **The pain narrative.** One sentence on why their data is hard, in their language.
4. **The governance angle.** Which of quality, lineage, access, residency, freshness, or cost their industry
   actually loses sleep over. This decides what act 5 leads with.

If you cannot resolve the metrics or the sources, say so and offer the non-verticalized running example instead.
A wrong vertical example is worse than a neutral one, because it invites the audience to correct you rather than
listen to you.

---

## How the vertical reaches the deck

| Where | What changes |
|---|---|
| Act 1, what hurts today | The pain narrative, in their vocabulary |
| Act 2, the data journey | The running example, and the source systems in the diagram labels |
| Acts 3 and 4 | The demo hook, and the columns and tests in any code shown |
| Act 5 | Which governance angle leads |
| Throughout | The metrics named on slides, and the units they are counted in |

**Presenting the same vertical to the same partner twice should not produce the same deck**, because the
platform, fluency, and audience answers still drive the structure. The vertical dresses the story; it does not
replace the other answers.
