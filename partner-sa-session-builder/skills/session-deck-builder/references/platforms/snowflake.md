# Platform profile — Snowflake

## Vocabulary

Use: warehouse (compute), database, schema, role, credits, dynamic tables, Snowpark, Iceberg tables.
Namespace: `database.schema.object`.
Avoid: catalog-as-namespace, dataset, slots, capacity units.

## Narrative spine

**Where they already are:** compute is centralized and elastic, SQL is the shared language, the platform
question is considered settled.

**The argument:** you solved consolidation. The open problem is whether the transformation layer on top is
trustworthy, tested, and cost-controlled — that's where dbt lives.

Snowflake audiences respond to reliability and credit discipline. Lead there, not with governance.

*This spine is a draft. Check internal messaging for Snowflake positioning first; internal framing wins.*

## Whole-picture boxes

`sources → Fivetran → landing database/schema → dbt models in Snowflake warehouses → marts + semantic
layer → BI` with governance, lineage, and CI/CD spanning the middle.

## Resolve at run time

| Topic | Where |
|---|---|
| Adapter configs, materializations, incremental strategies | `/reference/resource-configs/snowflake-configs` |
| Adapter behaviour flags | `/reference/global-configs/snowflake-changes` |
| Platform connection setup | `/docs/platform/connect-data-platform/connect-snowflake` |
| Quickstart | `/guides/snowflake` |
| Fivetran destination | `fivetran.com/docs/destinations/snowflake` |
| Fivetran dbt transformations | `fivetran.com/docs/transformations/dbt` |

Do not state which materializations or incremental strategies are supported, or how dynamic tables behave,
without fetching the configs page first.

## Pitfalls to verify before presenting

- Warehouse sizing and auto-suspend behaviour for dbt runs
- Transient vs permanent table defaults, including the dynamic-tables behaviour flag
- Role and grant model for dbt-managed objects
- Destination setup prerequisites on the Fivetran side

## Cross-platform Mesh

Snowflake is the best-covered platform for cross-platform Mesh — documented combinations with Databricks
(Unity), Athena (Glue), BigQuery (BigLake), and DuckDB (Horizon). Requires catalog-linked databases. See
`../data-mesh.md`, including the write-performance caveat and the multi-catalog alternative.

## Demo notes (phase 2)

Profile targets a dedicated warehouse and role. Keep credit consumption visible during the session — cost
transparency is itself a selling point for this audience.
