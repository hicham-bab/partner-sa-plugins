# Platform profile: Microsoft Fabric (Warehouse)

**Adapter: `dbt-fabric`. T-SQL based.** Confirm at intake that the partner means Warehouse and not
Lakehouse, the two Fabric adapters differ in materialization and incremental support, and content built
for the wrong one is wrong throughout.

## Vocabulary

Use: workspace, warehouse, OneLake, T-SQL, semantic model, Direct Lake, capacity units (CU), Power BI.
Avoid: cluster, Spark, credits, slots.

## Narrative spine

**Where they already are:** Microsoft-native stack, OneLake holds a single copy, Power BI is where the work
lands and where business users live.

**The argument:** Fabric unified the storage. dbt unifies the *logic*, so the semantics behind every
Power BI report are versioned, tested, and reviewable rather than living in scattered measures.

This audience often has strong BI maturity and thinner engineering-workflow maturity. The version control,
testing, and CI/CD story is the differentiator; lead there.

*This spine is a draft. Check internal messaging for Fabric positioning first; internal framing wins.*

## Whole-picture boxes

`sources → Fivetran → OneLake / landing warehouse → dbt models in Fabric Warehouse → semantic model →
Power BI (Direct Lake)` with workspace permissions and lineage spanning the middle.

## Resolve at run time

| Topic | Where |
|---|---|
| Adapter configs, materializations, incremental strategies, cross-warehouse refs | `/reference/resource-configs/fabric-configs` |
| dbt Core setup | `/docs/local/connect-data-platform/fabric-setup` |
| Platform connection setup | `/docs/platform/connect-data-platform/connect-microsoft-fabric` |
| Quickstart | `/guides/microsoft-fabric` |
| Private Link (note release phase) | `/docs/platform/secure/private-connectivity/azure/azure-fabric` |
| Fivetran destination | `fivetran.com/docs/destinations`, resolve the current Fabric destination page |

Fabric feature availability moves quickly and several capabilities are in preview. Always state release
phase, and never present a preview capability as generally available.

## Pitfalls to verify before presenting

- Which materializations the `dbt-fabric` adapter supports, do not assume parity with other adapters
- Cross-warehouse reference behaviour
- Authentication path (service principal vs user) for dbt
- Capacity sizing and throttling effects on dbt runs
- Whether the Fivetran destination path the partner needs is supported and its release phase

## Cross-platform Mesh: not documented for Fabric

Fabric does **not** appear in the documented cross-platform Mesh combinations. Do not show Fabric in a
cross-platform Mesh diagram or imply it works. Check `/docs/mesh/cross-platform-mesh` for current status; if
a Fabric partner asks, say plainly what is documented and what isn't. Single-platform dbt Mesh (cross-project
references and governance) is a separate question, verify plan and adapter support before including it.

## Demo notes (phase 2)

Dedicated workspace, warehouse destination, service-principal auth. End the demo in Power BI, for this
audience the story isn't finished until it reaches a report.
