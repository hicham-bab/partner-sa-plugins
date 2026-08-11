# Data mesh and dbt Mesh

## Keep the two apart

**data mesh** (lowercase, unbranded) is an organisational concept: domain ownership, data as a product,
self-serve platform, federated governance.

**dbt Mesh** is a dbt pattern that gives those ideas a concrete implementation.

Conflating them is the most common error in mesh content, and architects notice immediately. State the
distinction on the slide where mesh first appears: the concept describes how teams organise; dbt Mesh is
how you enforce it in code.

## dbt Mesh is a pattern, not a product

Per the dbt docs, Mesh is "not a single product — it is a pattern enabled by a convergence of several
features in dbt." Never present it as a SKU. The constituent features:

| Feature | What it does |
|---|---|
| Cross-project references | `{{ ref('other_project', 'model') }}` across dbt projects |
| dbt Catalog | Metadata-powered documentation with full cross-project lineage |
| Groups | Organise DAG nodes by logical area, each with an owner |
| Access modifiers | Control who can reference a model (private / protected / public) |
| Model versions | Treat models as stable APIs, with graceful deprecation |
| Model contracts | Explicit expectations on data shape, so upstream changes don't silently break consumers |

Cross-project `ref()` requires Enterprise or Enterprise+ plans — verify current plan requirements at
`/docs/mesh/govern/project-dependencies` before a slide implies availability. The public pricing page
corroborates this: both *dbt Mesh cross project* and *dbt Mesh cross platform* are listed as Enterprise-tier
features. If a session builds toward the mesh story, know it lands at Enterprise. See `pricing.md`.

Resolve details from: `/docs/mesh/about-mesh`, `/best-practices/how-we-mesh/mesh-1-intro`,
`/docs/mesh/govern/model-access`, `/docs/mesh/govern/model-contracts`, `/docs/mesh/govern/model-versions`,
`/docs/build/groups`, `/guides/mesh-qs`.

## Cross-platform Mesh — the differentiator

Source: `/docs/mesh/cross-platform-mesh`. Fetch it before presenting; this area moves.

**The mechanism:** models configure a `catalog_name`; each project's `catalogs.yml` maps that catalog name
to the right top-level namespace *for its own adapter*. So a model materialised to an Iceberg table in Unity
catalog by a Databricks project can be selected from by a Snowflake project — dbt resolves the reference
per platform. Requires `flags: use_catalogs_v2: true`.

**The prerequisite that gets skipped:** an automated service linking or syncing metadata across the Iceberg
catalog and the connected platforms. One of:

- Snowflake catalog-linked databases
- Databricks catalog federation
- AWS Glue catalog federation
- GCP Lakehouse runtime catalog

This is infrastructure the partner's client has to have. Presenting cross-platform Mesh without naming this
prerequisite sets up an expectation that collapses in the first implementation call.

**Supported combinations, per the docs:**

| Combination | Catalog |
|---|---|
| Snowflake ↔ Databricks | Unity |
| Snowflake ↔ Athena | Glue |
| Snowflake ↔ BigQuery | BigLake |
| Snowflake ↔ DuckDB | Horizon |
| Databricks ↔ DuckDB | Unity |

**Microsoft Fabric is not on this list.** For a Fabric-primary partner, do not imply cross-platform Mesh
support — check the docs for current status and say plainly what is and isn't supported. This matters more
than having an impressive slide.

**Performance caveat to include, not hide:** the docs note that writes to external Iceberg catalogs are
generally slower than writes to managed Iceberg tables and can hit reliability issues at scale. The
documented alternative is a multi-catalog pattern — write to the platform's own managed catalog, then use
federation to sync metadata for reads. Architects respect content that names the tradeoff; they discount
content that doesn't.

## When to include mesh content

| Situation | Treatment |
|---|---|
| Architect / tech lead audience | Full mesh block — governance features and cross-project structure |
| Multi-platform partner | **Lead with cross-platform Mesh** — it's the answer to a problem they already have |
| Partner whose clients are large enterprises | Include, framed as the scaling path |
| Practitioners new to dbt | Mention in act 5 as where this goes; do not teach it |
| Single small client base | Skip — see below |

**Do not oversell mesh.** The docs are explicit: if you're early in your dbt journey, don't build a
multi-project architecture yet, and adopt the features incrementally. A partner who leaves a session
believing every client needs a mesh on day one will produce bad architectures with your name on them.
Include the readiness signals from `/best-practices/how-we-mesh/mesh-2-who-is-dbt-mesh-for` —
model count degrading performance, teams needing decoupled workflows, governance requirements increasing.

## For multi-platform partners

This is where cross-platform Mesh reframes the whole session. A partner running client work across
Snowflake and Databricks normally treats that as two practices with two toolchains. The story becomes: one
transformation framework, one governance model, one lineage graph, spanning both — with Iceberg as the
interchange.

Draw it as a single DAG whose nodes sit on different platforms, not as two stacks side by side. Two stacks
with an arrow between them is an integration diagram; one DAG across two platforms is the point.

## Demo assets (phase 2)

The docs reference two working example projects for a Snowflake ↔ Databricks mesh:

- `github.com/dbt-labs/jaffle-shop-mesh-finance`
- `github.com/dbt-labs/jaffle-shop-mesh-marketing`

These are the natural starting point for a cross-platform Mesh demo in the `partner-sa-demos` repo. Verify
they're current before building a session around them.
