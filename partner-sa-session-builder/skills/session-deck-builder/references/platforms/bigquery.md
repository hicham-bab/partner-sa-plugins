# Platform profile: BigQuery

## Vocabulary

Use: project, dataset, table, slots, on-demand pricing, partitioning, clustering, reservation, IAM.
Namespace: `project.dataset.table`.
Avoid: warehouse, catalog-as-namespace, credits, capacity units.

## Narrative spine

**Where they already are:** serverless scale, trivial to start, no infrastructure to manage, and sprawl
that arrived quietly.

**The argument:** scale was never your problem. Trust, lineage, and query-cost discipline are. dbt adds
structure without adding infrastructure.

Lead with cost and trust. Governance-first framing loses a BigQuery room in the first five minutes,
because they don't experience infrastructure as the constraint.

*This spine is a draft. Check internal messaging for BigQuery positioning first; internal framing wins.*

## Whole-picture boxes

`sources → Fivetran → landing dataset → dbt models in BigQuery → marts + semantic layer → Looker / BI`
with IAM, lineage, and CI/CD spanning the middle.

## Resolve at run time

| Topic | Where |
|---|---|
| Adapter configs, materializations, incremental strategies | `/reference/resource-configs/bigquery-configs` |
| Adapter behaviour flags | `/reference/global-configs/bigquery-changes` |
| Platform connection setup | `/docs/platform/connect-data-platform/connect-bigquery` |
| Quickstart | `/guides/bigquery` |
| Fivetran destination | `fivetran.com/docs/destinations/bigquery` |

Do not assert which incremental strategy is default or preferred without fetching the configs page.

## Pitfalls to verify before presenting

- Partitioning and clustering configuration for incremental models
- Slots vs on-demand cost implications of dbt run patterns
- IAM roles and service-account setup for dbt
- Dataset location and region constraints against the Fivetran destination

## Cross-platform Mesh

Documented combination: BigQuery ↔ Snowflake using BigLake catalog. GCP Lakehouse runtime catalog is the
metadata-sync mechanism. See `../data-mesh.md`.

## Demo notes (phase 2)

Dedicated project or dataset, service-account auth. Show a query-cost figure before and after a
partitioning change, the cheapest way to make the trust-and-cost argument concrete.
