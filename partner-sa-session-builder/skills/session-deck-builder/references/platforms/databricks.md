# Platform profile — Databricks

## Vocabulary

Use: catalog, schema, table, Unity Catalog, Delta Lake, SQL warehouse, cluster, notebook, volume, Photon.
Namespace: `catalog.schema.table` — three levels.
Avoid: database-as-namespace, dataset, slots, credits.

## Narrative spine

**Where they already are:** the lakehouse is in place, Unity Catalog governs, notebooks do the work.

**The argument:** notebooks got you the platform. dbt turns transformation into a reviewable, tested,
version-controlled product — so analysts aren't queued behind engineers.

Lead with the notebook-to-production gap. It's the pain this audience feels weekly and rarely names.

*This spine is a draft. Check internal messaging for Databricks positioning first; internal framing wins.*

## Whole-picture boxes

`sources → Fivetran → landing catalog.schema → dbt models on SQL warehouses → marts + semantic layer →
BI / AI` with Unity Catalog governance and lineage spanning the middle.

## Resolve at run time

| Topic | Where |
|---|---|
| Adapter configs, materializations, incremental strategies | `/reference/resource-configs/databricks-configs` |
| Adapter behaviour flags | `/reference/global-configs/databricks-changes` |
| Platform connection setup | `/docs/platform/connect-data-platform/connect-databricks` |
| Quickstart | `/guides/databricks` |
| Fivetran destination | `fivetran.com/docs/destinations/databricks` |
| Fivetran Databricks setup guide | `fivetran.com/docs/destinations/databricks/databricks-setup-guide` |

## Known constraint — verify currency, but check this one

Per Fivetran's Databricks destination docs: **Azure Databricks destinations using OAuth authentication do
not support Transformations for dbt Core or Quickstart data models.** Confirm this still holds before the
session, and if the partner is on Azure Databricks with OAuth, plan the demo around it rather than
discovering it live.

## Pitfalls to verify before presenting

- Three-level namespace implications for dbt project configuration
- Unity Catalog grants required for dbt-managed objects
- SQL warehouse vs all-purpose cluster for dbt runs
- Delta merge behaviour for incremental models
- Weekly table maintenance windows and their effect on sync timing

## Cross-platform Mesh

Documented combinations: Databricks ↔ Snowflake (Unity) and Databricks ↔ DuckDB (Unity). Requires
Databricks catalog federation or Snowflake catalog-linked databases. Working example projects exist —
see `../data-mesh.md`.

## Demo notes (phase 2)

Unity Catalog enabled, dedicated catalog for the demo, SQL warehouse sized small. Show lineage in Unity
Catalog alongside dbt lineage — the pairing is the point.
