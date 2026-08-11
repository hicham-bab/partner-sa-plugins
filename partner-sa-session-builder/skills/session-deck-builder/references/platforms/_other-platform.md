# Platform profile: other platforms (built at run time)

Use when the partner's platform isn't one of the five profiled: Redshift, Synapse, Postgres, Athena,
Teradata, ClickHouse, MotherDuck, DuckDB, SingleStore, Trino / Starburst, and others.

Do not fall back to generic content. Build a real profile at run time in four steps.

## Step 1: Confirm a dbt adapter exists

Search the dbt docs for the platform name. Check:

- `/docs/connect-adapters`: supported adapter landscape
- `/docs/community-adapters`: community-maintained adapters
- `/reference/resource-configs/<platform>-configs`: the configs page, if one exists

**Note whether the adapter is dbt Labs-maintained, partner-maintained, or community-maintained, and say so
plainly in the deck.** A community adapter is a genuinely different support conversation from a maintained
one, and a partner planning client work needs to know which they're dealing with. Do not blur this.

If no adapter exists, tell the user before building anything. A deck that implies support that doesn't
exist is worse than no deck.

## Step 2: Confirm a Fivetran destination exists

Check `fivetran.com/docs/destinations` for the platform. Record supported deployment models and any
constraints. If the platform isn't a supported destination, the whole-picture story changes materially,
raise it with the user rather than drawing a diagram that implies a path Fivetran doesn't offer.

## Step 3: Assemble the vocabulary

From the adapter configs page and the platform's own docs, capture:

- Namespace shape (two-level, three-level, project-qualified)
- Compute unit name and cost unit
- Governance and permissions model naming
- Supported materializations and incremental strategies

Never label a diagram box with a term the platform doesn't use.

## Step 4: Write the narrative spine

Answer these three questions from internal content and the platform's positioning, then draft the spine:

1. What does this platform's community consider already solved?
2. What do they experience as the actual constraint?
3. Where does the dbt + Fivetran combination sit relative to that constraint?

Lead from what they consider solved, then move to the constraint. That's the same pattern the five profiled
platforms use.

## Step 5: Check cross-platform Mesh coverage

If the partner is multi-platform, check `/docs/mesh/cross-platform-mesh` for the specific combination. Athena
(Glue) and DuckDB (Horizon / Unity) are documented; most other platforms are not. Never assume a combination
works because both platforms support Iceberg, the documented requirement is an automated catalog
metadata-sync service, not Iceberg support alone.

## Honesty requirement

Ad-hoc profiles carry more uncertainty than the maintained ones. Say so where relevant, flag to the user
which claims are thinly sourced, and prefer leaving a slide out over filling it with plausible inference.
An SA presenting on an unfamiliar platform needs to know exactly which ground is firm.
