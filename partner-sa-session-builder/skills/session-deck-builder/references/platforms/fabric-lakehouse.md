# Platform profile — Microsoft Fabric (Lakehouse)

**Adapter: `dbt-fabricspark`. Spark based.** Confirm at intake that the partner means Lakehouse and not
Warehouse — the two Fabric adapters differ in materialization and incremental support.

## Vocabulary

Use: workspace, lakehouse, OneLake, Delta, Spark, notebook, semantic model, Direct Lake, capacity units
(CU), Power BI, medallion (bronze / silver / gold).
Avoid: warehouse-as-compute, T-SQL framing, credits, slots.

## Narrative spine

**Where they already are:** OneLake holds a single copy, Spark notebooks do the transformation, medallion
layering is the mental model, Power BI is the destination.

**The argument:** the medallion layers describe *where* data sits. dbt describes *how* it gets there — as
tested, versioned, reviewable logic rather than notebook cells nobody can safely change.

This is the closest Fabric audience to the Databricks story; the notebook-to-production gap resonates.
Difference is that Power BI is always the endpoint, so carry the story all the way to the report.

*This spine is a draft. Check internal messaging for Fabric positioning first; internal framing wins.*

## Whole-picture boxes

`sources → Fivetran → OneLake bronze → dbt models producing silver / gold Delta tables → semantic model →
Power BI (Direct Lake)` with workspace permissions and lineage spanning the middle.

## Resolve at run time

| Topic | Where |
|---|---|
| Adapter configs, materializations, incremental strategies | `/reference/resource-configs/fabricspark-configs` |
| dbt Core setup for Lakehouse | `/docs/local/connect-data-platform/fabricspark-setup` |
| Quickstart | `/guides/microsoft-fabric` |
| Fivetran destination | `fivetran.com/docs/destinations` — resolve the current Fabric destination page |

The Spark-based Fabric adapter has narrower support than the mainstream adapters in several areas. Check
the configs page before claiming any materialization, incremental strategy, or dbt platform capability.
State release phase for anything in preview.

## Pitfalls to verify before presenting

- Which materializations and incremental strategies `dbt-fabricspark` actually supports
- Whether the partner's intended dbt setup (dbt Core vs the dbt platform) is supported for Lakehouse
- Spark session startup time and its effect on live-demo pacing — the most common demo-killer here
- Authentication path for dbt against a lakehouse
- Capacity throttling under concurrent Spark workloads

## Cross-platform Mesh — not documented for Fabric

Fabric does **not** appear in the documented cross-platform Mesh combinations, despite OneLake's Delta and
Iceberg story making it sound plausible. Do not draw Fabric into a cross-platform Mesh diagram. Check
`/docs/mesh/cross-platform-mesh` for current status and be direct about what is and isn't documented.

## Demo notes (phase 2)

Dedicated workspace and lakehouse, medallion schema layout, Delta output. Warm the Spark session before the
session starts; cold-start latency reads as product slowness to an audience that doesn't know better.
