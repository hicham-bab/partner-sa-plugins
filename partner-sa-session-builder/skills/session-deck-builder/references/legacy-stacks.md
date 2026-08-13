# What they're using today, and what that changes

Read this whenever intake Q9 returns anything. Where a partner's clients are coming *from* decides the whole
session: the pain in act 1, the comparison in acts 3 and 4, the demo, and what the partner can actually sell.

**Nothing here is a product claim.** These are narrative starting points and known migration mechanics. Anything
specific about dbt or Fivetran behaviour still resolves from docs at run time, per `research-protocol.md`, and
nothing here is a competitive teardown to put on a slide. Say what dbt does, not what a competitor fails at.

**Vocabulary matches the Partner BVA's own `today` field**, so the technical session and the business case
categorise the same client the same way:

| Intake answer | BVA `today` value |
|---|---|
| Legacy ETL tool | `legacyEtl` |
| Stored procedures and notebooks | `storedProcs` |
| Cloud ELT tool | `legacyEtl`, since it is still a tool-based transformation layer being replaced |
| Self-hosted dbt Core | `coreSelfHost` |
| A mixture, or not established | `mixed` or `unknown` |

---

## Legacy ETL tools

### Talend

Job-based, often Studio-built, frequently with a large estate of similar jobs. Teams leave over licence cost at
renewal, the shortage of people who still want to work in it, and the difficulty of reviewing a job in a pull
request.

**The story:** jobs become models, and the graph becomes something you can read. The migration lands as
domain-by-domain rather than big-bang, which is also how the partner sells it.

**Demo:** take one job, show the equivalent model with a test and lineage. Job count is the scoping unit, and it
is what the BVA's `legacyJobs` input wants.

**Careful:** Talend estates usually contain orchestration and file movement as well as transformation. Only the
transformation part becomes dbt. Say where the rest goes, or the migration estimate is wrong.

### Informatica

The heaviest incumbent, usually PowerCenter or IDMC, usually with a dedicated team and a governance story of its
own. Renewals are large, so the trigger is commercial more often than technical.

**The story:** the same governance outcomes, expressed as code and tests, on the platform they already pay for.
Do not open on cost with an Informatica team in the room; open on the mapping-to-model reading experience and let
the sponsor raise cost.

**Careful:** their existing metadata and lineage tooling is often the emotional attachment, not the mappings.
Address lineage and catalog directly rather than avoiding it.

### DataStage, SSIS, Pentaho, Alteryx

Same shape, smaller blast radius, and often no owner left. SSIS in particular tends to sit next to stored
procedures on SQL Server, so treat it as a mixed estate rather than a pure ETL one. Alteryx is usually analyst-
owned rather than engineering-owned, which changes who is in the room and makes the low-code and Wizard angle
land harder.

## Stored procedures and notebooks

The most common answer and the least likely to be volunteered, since nobody calls it a stack. Logic lives in the
warehouse as procedures, or in notebooks on a schedule.

**The story:** the logic is already SQL, so this is the shortest distance to dbt of any starting point. What they
gain is dependency order, tests, documentation, and the ability to review a change. What they lose is the
2,000-line procedure nobody will touch.

**Demo:** the best of the set. Take one procedure, split it into two or three models, add a `not_null` and a
`unique`, show the DAG. It converts in the room because the audience wrote the procedure.

**Careful:** procedural constructs do not all have a declarative equivalent. Cursors, loops, and multi-step
transactions need a rethink rather than a translation, and saying so early buys credibility. Notebooks scheduled
ad hoc also usually hide ordering assumptions that only surface under a real DAG.

## Cloud ELT tools

### Matillion

Visual, warehouse-native, often bought as the friendly alternative to Informatica. Teams outgrow it on version
control, testing, and code review rather than on capability, and the people who bought it are usually still
there, so the conversation needs care.

**The story:** they already believe in pushing work to the warehouse, so ELT is not the argument. The argument is
engineering practice on top of it: git, tests, CI, environments, and lineage that comes from the code.

**Careful:** Matillion does ingestion as well as transformation for some clients, which makes this a Fivetran
conversation as much as a dbt one. Ask which parts they use before scoping either.

### Azure Data Factory and AWS Glue

Usually orchestration plus some transformation, and usually staying for the orchestration. Position dbt as the
transformation layer inside what they already run rather than as a replacement, and expect the platform
relationship to matter more than the tool.

## Self-hosted dbt Core

They already believe in dbt, so never sell dbt. The subject is everything around it: what they maintain that
they do not have to, and what they cannot do today.

**The story:** the platform, Fusion, dbt State, orchestration they do not run, and governance features that only
exist above Core. Track B in `demo-flows.md` is built for this audience.

**Careful:** this room knows the product, so a fundamentals opening insults them, and a feature they can already
build themselves lands as a sales pitch. Lead with cost and operational burden, and be exact about which features
require which plan.

## A mixture, or not established

The mixture is the most common truth in a large estate, so ask which part hurts most and build the running example
from that one. Trying to address three starting points at once produces a deck with no protagonist.

Where nothing is established, this is a greenfield conversation: skip the migration narrative entirely, and use
the platform motion rather than the legacy one.

---

## How this reaches the deck

| Where | What changes |
|---|---|
| Act 1, what hurts today | The pain, named in their tooling's own vocabulary |
| Act 2 | Whether the diagram shows a replacement or an addition |
| Acts 3 and 4 | The before-and-after comparison, and what the demo converts |
| Act 5 | Migration as an engagement, sized by the estate |
| Scoping | Job or procedure count, which is also the BVA's volume input |

**Ask what is actually driving the change too**, per intake Q11, because the trigger decides the urgency slide:
a licence renewal has a date, an AI initiative has a deadline, cost pressure has a sponsor in finance, and a
throughput problem has a team that will tell you the truth. No trigger usually means no deadline.

**Migration mechanics beyond the narrative** are a separate body of work with its own tooling. Point the partner
at it rather than improvising a migration plan on a slide.
