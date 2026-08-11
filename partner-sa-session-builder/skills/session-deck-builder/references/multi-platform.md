# Multi-platform sessions

Many partners run practices across several data platforms. This file covers how to shape a session for that,
and where the platforms actually diverge.

## Rule one: pick a primary anyway

Even for a multi-platform session, **one platform carries the running example.** The story's protagonist
dataset moves through one platform end to end; the others appear as contrast.

Trying to tell the story simultaneously on two platforms produces a deck that is twice as long and half as
clear, and the audience loses the thread. Ask which platform has the most client work or the nearest
opportunity, and make that the primary.

Every code sample must **state which platform it targets.** An unlabelled sample in a multi-platform room is
a support ticket waiting to happen.

## Four session shapes

| Pattern | When | Shape |
|---|---|---|
| **A. Primary + contrast** *(default)* | Partner has one dominant platform and one or two secondary | Teach entirely on the primary. Insert a comparison slide only where behaviour genuinely differs. Labs on the primary. |
| **B. Neutral core + breakouts** | Genuinely even split across platforms, and you have facilitators per track | Concepts taught platform-neutrally; hands-on labs split by platform in breakout rooms. Reconverge for the recap. |
| **C. Cross-platform Mesh as the headline** | Partner runs workloads across platforms **for the same client** | The multi-platform reality *is* the story. Lead act 5 with cross-platform Mesh. See `data-mesh.md`. |
| **D. Migration framing** | Partner moves clients between platforms | The comparison content becomes the core, framed as a migration practice. See `lifecycle-and-migrations.md`. |

Pattern B costs real facilitation capacity. Don't promise breakouts unless there's a named person per track —
a split lab with one facilitator becomes two half-supported labs.

## Where the platforms actually diverge

Only three things need per-platform treatment in most sessions: **incremental strategies, constraint
enforcement, and the catalog/Iceberg story.** Everything else in dbt is genuinely portable, and saying so is
part of the value — one framework, transferable skills.

Re-verify both tables below at build time from `/docs/build/incremental-strategy` and
`/reference/resource-properties/constraints`. Values recorded 11 August 2026.

### Incremental strategies by adapter

| Adapter | `append` | `merge` | `delete+insert` | `insert_overwrite` | `microbatch` |
|---|---|---|---|---|---|
| dbt-snowflake | ✅ | ✅ | ✅ | ✅ | ✅ |
| dbt-databricks | ✅ | ✅ | ✅ | ✅ | ✅ |
| dbt-bigquery | — | ✅ | — | ✅ | ✅ |
| dbt-fabric | ✅ | ✅ | ✅ | — | ✅ |
| dbt-spark | ✅ | ✅ | — | ✅ | ✅ |
| dbt-athena | ✅ | ✅ | — | ✅ | ✅ |
| dbt-redshift | ✅ | ✅ | ✅ | — | ✅ |
| dbt-postgres | ✅ | ✅ | ✅ | — | ✅ |
| dbt-trino | ✅ | ✅ | ✅ | — | ✅ |
| dbt-teradata | ✅ | ✅ | ✅ | — | ✅ |
| dbt-duckdb | ✅ | ✅ | ✅ | — | ✅ |

**The teaching point:** Snowflake and Databricks support all five. **BigQuery supports neither `append` nor
`delete+insert`** — it's the sharpest divergence among the major platforms, and a lab written for Snowflake
will fail on BigQuery for exactly this reason. Fabric has no `insert_overwrite`.

`microbatch` is supported everywhere in the table — so for a multi-platform room, **microbatch is the safest
incremental story to teach**, and it's the right answer for large time-series data anyway.

One more constraint on Pattern B labs: **custom incremental strategies aren't supported on the BigQuery and
Spark adapters.** If a lab has partners write a custom strategy, it can't run on those tracks.

### Constraint enforcement by platform

Definable / enforced, per the docs:

| Platform | `not_null` | `primary_key` | `foreign_key` | `unique` | `check` |
|---|---|---|---|---|---|
| Postgres | ✅ / ✅ | ✅ / ✅ | ✅ / ✅ | ✅ / ✅ | ✅ / ✅ |
| Snowflake | ✅ / ✅ | ✅ / ❌ | ✅ / ❌ | ✅ / ❌ | ❌ / ❌ |
| BigQuery | ✅ / ✅ | ✅ / ❌ | ✅ / ❌ | ❌ / ❌ | ❌ / ❌ |
| Databricks | ✅ / ✅ | ✅ / ❌ | ✅ / ❌ | ❌ / ❌ | ✅ / ✅ |
| Spark | ✅ / ❌ | ✅ / ❌ | ✅ / ❌ | ✅ / ❌ | ✅ / ❌ |
| Redshift | ✅ / ✅ | ✅ / ❌ | ✅ / ❌ | ✅ / ❌ | ❌ / ❌ |
| Athena | ❌ / ❌ | ❌ / ❌ | ❌ / ❌ | ❌ / ❌ | ❌ / ❌ |

**The teaching point, and it's a good one for architects:** across analytical platforms, effectively only
`not_null` is actually enforced. Nobody enforces `unique` or `primary_key`. Databricks is the only one of the
big three that enforces `check`. Spark defines everything and enforces nothing.

So **model contracts are not a substitute for dbt tests** — you still need a `unique` test behind a
`primary_key` constraint, because the platform won't check it. This is the single most useful cross-platform
governance slide you can build, and it lands with architects because it changes what they put in their
standards.

Prerequisites worth stating: constraints work only on `table` and `incremental` materializations — never
`ephemeral` or `view` — and require an enforced contract with `data_type` declared on every column.

### Catalog and Iceberg support

This is the third divergence, and it's covered in `data-mesh.md`. Short version: documented cross-platform
Mesh combinations are Snowflake ↔ Databricks / Athena / BigQuery / DuckDB, and Databricks ↔ DuckDB. **Fabric is
not in that list.** Don't draw it into a cross-platform diagram.

## Sandbox and lab logistics

Ask early, because it constrains everything: **which platforms will actually be available in the room?**

- dbt Labs instructor-led training sandboxes have historically standardised on Snowflake, even when the
  audience runs other platforms. Verify what's available for this session rather than assuming.
- If only one platform is available for labs, that platform should be the primary — otherwise you teach on one
  and practise on another, which is the worst of both.
- If the partner brings their own environments, confirm per-platform access before finalising the run-of-show,
  and keep a fallback for a broken environment (see the hackathon recipe in `session-recipes.md`).

## Slide shapes

| Need | Shape |
|---|---|
| Two or three platforms, one dominant | One "how this differs on your other platforms" slide per real divergence — usually just incrementals and contracts |
| Even split, architect audience | A comparison table slide plus the contracts-need-tests slide |
| Cross-platform client workloads | Cross-platform Mesh block, drawn as one DAG spanning platforms |

Don't build a comparison slide for things that don't differ. A matrix of ten rows where nine are identical
tells the audience the platforms are more different than they are — and the portability of dbt is the point.
