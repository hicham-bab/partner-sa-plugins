# dbt Wizard CLI and dbt State as standalone solutions

Both of these are **standalone in two senses**, and both matter for partner sessions:

1. **Technically standalone**: neither requires a dbt platform account. This is the wedge for partners whose
   clients aren't on the platform yet.
2. **Standalone session modules**: each has enough depth to carry its own session or half-day module, rather
   than appearing as a feature slide inside a broader platform story.

Treat them as first-class session subjects. Verify against the docs at run time; both are pre-GA and moving.

---

## dbt Wizard CLI: Beta

Docs: `/docs/dbt-ai/about-dbt-wizard-cli`, `/docs/dbt-ai/wizard-cli` (install)

**The standalone claim, stated exactly as the docs do:** you can run the dbt Wizard CLI locally from any dbt
project that uses the dbt CLI, Fusion, or dbt Core. Local development, on the developer's machine. No platform
account in the requirement.

It's built for governed data development: it understands the project, routes to the right dbt tools,
validates changes, and shows how logic evolves.

**This is also the low-code development answer.** Where a session previously would have reached for a visual
builder, Wizard is the angle: the developer describes intent, Wizard produces and validates the dbt changes.
Frame it as lowering the barrier to authoring dbt without lowering the engineering bar; the output is still
version-controlled dbt code that goes through review.

### Bring your own key

The CLI supports more providers than the in-platform experience. Worth a slide for partners with an existing
AI vendor or cloud commitment, because it removes a procurement objection.

| Provider | dbt Wizard in dbt platform | dbt Wizard CLI |
|---|---|---|
| OpenAI | Managed or BYOK | OpenAI subscription or BYOK |
| Anthropic | BYOK | BYOK |
| Azure AI Foundry / Azure OpenAI | BYOK | BYOK |
| AWS Bedrock | Not supported | BYOK |
| Google Gemini | Not supported | BYOK |
| Snowflake Cortex | Not supported | BYOK |
| Databricks Unity AI Gateway | Not supported | BYOK |

Snowflake Cortex and Databricks Unity AI Gateway are strong platform-specific hooks; the AI stays inside the
data platform the client already bought. Pair with the relevant platform profile.

**One caveat to state accurately:** per Anthropic's terms of service, Anthropic enterprise and subscription
licences (such as Claude Enterprise) aren't supported; BYOK requires an Anthropic API key. Partners will
otherwise assume their existing Claude seats carry over.

Configure with `wizard providers configure PROVIDER_NAME`.

### Extensibility: the part that lands with architects

- MCP servers: `/docs/dbt-ai/wizard-mcp`
- Skills, for reusable project-specific instructions: `/docs/dbt-ai/wizard-skills`
- Subagents, for delegating specialised work: `/docs/dbt-ai/wizard-subagents`
- Plugins and lifecycle hooks: `/best-practices/how-to-use-wizard/wizard-8-plugins-hooks`

For an SI partner this is the differentiator: their own standards, encoded as skills and subagents, shipped
across every client engagement. That's a repeatable practice asset, not just a tool. It's the strongest
partner-specific argument in the Wizard story; lead act 4 with it for architect audiences.

Review lifecycle hooks before allowing them to run (the docs make a point of this), and so should the session.

### Ready-made lab material

The `/best-practices/how-to-use-wizard/` series maps almost directly onto hands-on labs:

| Doc | Lab |
|---|---|
| `wizard-4-data-informed-tests` | Find test coverage gaps, check assumptions against warehouse data, add focused tests |
| `wizard-5-debug-failed-job` | Gather job evidence, classify a failure, find root cause, validate a fix |
| `wizard-6-production-deferral` | Reuse production state while developing and validating a subset |
| `wizard-8-plugins-hooks` | Install plugins from marketplaces, review hooks |

The debugging lab is the best single demo in the set; it's a task every practitioner in the room has lost an
afternoon to.

Telemetry and data use: `/docs/dbt-ai/wizard-telemetry`, including how to opt out. Have this ready; it comes up.

---

## dbt State: Preview

Docs: `/docs/deploy/dbt-state-about`. Labelled *Login required, usage-based*.

**The standalone claim, stated exactly as the docs do:** signing up gives two paths,

- **dbt platform account**: dbt State shares your platform credentials and can see your platform
  environments and jobs.
- **Standalone account** at `app.state.dbt.com`, independent of any dbt platform account, credentials managed
  separately, no visibility into platform environments or jobs.

The docs name three cases where standalone is the right choice, and all three are common in partner-led work:
no dbt platform account, no admin permissions to enable it, or wanting to test before connecting it.

dbt State works with dbt Core, the dbt platform, and the dbt Fusion engine, across all environments and
orchestrators, including external orchestrators. It does require authentication via one of the two paths
above; "standalone" means no platform account, not no account.

### How it works: three outcomes per node

On a run like `dbt build --select +my_model`, each selected node gets the most efficient valid treatment:

| Outcome | What happens |
|---|---|
| **Skip** (reuse from same schema) | Object exists, logic unchanged, upstream data no fresher than `lag_tolerance` allows. Node skipped as if never selected. For data tests, a previous result is reused rather than re-running the query. |
| **Clone** (reuse from different schema) | dbt State searches all environments and jobs for a matching object with identical logic and fresh data, and clones from the freshest candidate, even a CI schema, if it's fresher than production. Marked **Reused**, at a fraction of the compute cost. |
| **Normal build** | Reuse isn't possible. dbt builds as usual, automatically deferring unselected upstream nodes. |

It also auto-defers to production state without setting `--defer` or `--state` manually. It can reuse every
node type that creates a relation (models, snapshots, seeds), plus data tests.

The governing principle, which belongs on the slide: **dbt State only skips work when it can prove the
existing object is sufficiently equivalent.** If logic, relevant config, schema, or upstream freshness could
change the result, it rebuilds. Safety over cleverness. Say this explicitly; the first question from any
serious architect is "how do I know it isn't silently serving me stale data."

### `lag_tolerance` is the concept to teach

The key config. It controls how much time must pass since the last upstream *data* change before a node is
eligible for rebuild, compared against the freshness of the underlying data, not against the model's last
execution. That distinction is the substance of the improvement over state-aware orchestration's `build_after`.

### Versus `state:modified`: the comparison practitioners actually want

| `state:modified` | dbt State |
|---|---|
| Manual `manifest.json` management, error-prone | Managed, near-zero setup, no workflow change |
| File-level diff: whitespace or an alias counts as a change | Semantic understanding of SQL; meaningless changes ignored |
| Ignores upstream data changes: rerun twice, rebuilds twice | Checks sources for new data and schema changes; second run skips if nothing changed |
| No auto-defer, no auto-clone | Both |
| Breaks on seed files over 1MB | No such limit |

### Details that come up in the room

- **Incremental models** are supported. Change one and run in development, and dbt State clones from
  production if it exists, then runs the new logic on top of the clone. `--full-refresh` reverts to original
  behaviour.
- **Security and data residency**: dbt State sends only last-modified timestamps and SQL statement *hashes*
  to dbt Labs. It never connects to the warehouse, and no warehouse data is transmitted. The service runs in
  a single US multi-tenant instance. Timestamps come from the warehouse, e.g. `INFORMATION_SCHEMA`. Have this
  on hand, it's the first question from a client security team, and the honest answer is a good one.
- **Failure mode**: if dbt State servers are unavailable, dbt falls back gracefully to normal behaviour.
- **Diagnosis**: `dbt-state explain` shows why a model was rebuilt or reused. Experimental, dbt Core
  v1.7–v1.12 only, not yet in Fusion or the dbt platform. Label it as experimental if demoed.
- **Multiple projects**: set `state-org-id` under `dbt-cloud:` in `dbt_project.yml`.
- **Non-standard prod environment name**: `defer_to_target` in `profiles.yml`, self-managed deployments only.
  On the dbt platform, deferral is configured in environment settings; see `/docs/deploy/dbt-state-deferral`.
- **Overeager rebuilds**: known patterns are views with `select *`, non-deterministic Jinja templating, and
  models with external sources in BigQuery. Include these as a troubleshooting slide; they're what a partner
  will hit in week one.

### Migration from state-aware orchestration

Announced 1 June 2026 by dbt Labs and Fivetran as the successor to state-aware orchestration. Existing SAO
users can continue using it, and while dbt State is in Preview there's **no required migration timeline**, a
timeline will be communicated at GA. Trials were extended until the billing period begins on 1 September 2026.

Guide: `/docs/deploy/dbt-state-migration`. Do not present migration as urgent or forced.

### Commercials: check, don't guess

dbt State is usage-based, with its own trial and billing pages: `/docs/deploy/dbt-state-trial` and
`/docs/platform/billing/dbt-state-usage`. Fetch these before any slide implies a cost model, and prefer
pointing to the pricing docs over restating numbers that will drift.

---

## Session shapes

| Session | Shape |
|---|---|
| dbt Wizard CLI, half day | Install and BYOK → project understanding → the four best-practice labs → skills and subagents for the partner's own standards → telemetry and governance |
| dbt State, half day | The rebuild-everything problem → skip / clone / build → `lag_tolerance` → vs `state:modified` → enable in a real project → troubleshooting overeager rebuilds → security Q&A |
| Combined, full day | Wizard CLI in the morning (authoring), dbt State after lunch (execution). The through-line: less time writing, less compute rebuilding. |

For both, lead with the standalone framing when the partner's clients aren't all on the dbt platform; it
turns "another thing to sell" into "something you can use on Monday, on the engagement you already have."

Always name the release phase on the slide: dbt Wizard CLI is Beta, dbt State is Preview.
