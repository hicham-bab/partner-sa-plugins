# Demo flows: context slides, then show the thing

Read this whenever the session type is **Technical session** or **Mixed**, which is most partner sessions.

**The shape that actually works:** a short run of context slides, then a live demo broken into chapters, with
one slide before each chapter and one after. Slides set up why this matters and what they are about to see.
The product does the arguing. A demo-led session that opens with fifteen slides of platform overview has lost
the room before anything runs.

| Duration | Context slides | Demo chapters | Total slides |
|---|---|---|---|
| 60 to 90 min | 6 to 8 | 3 | 14 to 18 |
| Half day | 8 to 10 | 4 to 5 | 22 to 28 |
| Full day | 10 to 12 | 6 to 7 | 32 to 40 |

Context slides are acts 1 and 2 of the arc in `storytelling.md`, compressed. The demo carries acts 3 and 4.
Act 5 stays as it is: certifications, next steps, close.

## The chapter pattern

Every demo chapter is three parts, and the slides are the bookends:

1. **Setup slide**, on `Simple`: what you are about to see, and the one question it answers. ≤ 25 words.
2. **The demo itself.** No slide on screen. Timed, scripted, with a fallback.
3. **Payoff slide**, on `Simple` or `Content slide`: what just happened and why it mattered. The value line,
   not a feature list. ≤ 35 words.

The payoff slide is the one people photograph, so it carries the argument in one sentence. Skipping it is the
most common demo mistake: the audience sees the mechanics and misses the point.

---

## Track A: Foundations

For audiences new to either product, or where the partner's practice is being built from scratch. Answers
"what is this and why would we standardise on it".

| # | Chapter | Show | The value line | Time |
|---|---|---|---|---|
| 1 | Create a Fivetran connector | Pick the source from intake Q6, authenticate, select schemas and tables, start the first sync, show rows landing | The extraction and schema-drift code nobody has to write, own, or be on call for | 10 to 12 min |
| 2 | Managed Data Lake Service | Land the same data into their own storage as open table format, with catalog registration, then query it | One copy of the data, in an open format, in their account, queryable by more than one engine. No lock-in as the price of managed ingestion | 8 to 10 min |
| 3 | dbt basics, scaled to the room | A model as a `select` that becomes a table or view, `ref()` building the DAG, a `.yml` file carrying descriptions and tests, `dbt build`, then lineage and docs | Logic in version control, tested, documented, with lineage, in one place instead of four | 15 to 25 min |

**Chapter 3 scales by audience**, per intake Q3:

| Audience | Depth |
|---|---|
| New to dbt, mixed, or pre-sales | One model, one `ref()`, one test, one YAML file. Show the DAG and the docs. Stop there. |
| Data / analytics engineers | Add materializations, incremental with the platform's real strategy from the platform profile, and a `not_null` plus `unique` test failing then passing |
| Architects and tech leads | Add contracts, `access`, and CI, then bridge to governance in act 5 |

**MDLS naming and capability must be resolved at run time** from the Fivetran docs, per `research-protocol.md`.
Confirm the current product name, the supported table formats, and the supported storage targets before the
slide or the demo claims any of them. Do not present this from memory.

---

## Track B: Platform and AI

For partners already using both products, or an audience that needs to see where the platform is going. Answers
"what does the platform do that our hand-rolled stack does not".

Each chapter hands off to the next, so the whole track is one continuous story: authoring leads to governance,
governance leads to orchestration, orchestration leads to cost.

| # | Chapter | Show | The value line | Time |
|---|---|---|---|---|
| 1 | dbt Wizard | Ask it to build or change a model, generate the tests and the documentation, in the platform or the terminal | Lowers the barrier to authoring dbt without lowering the engineering bar. The output is still reviewable code | 10 to 12 min |
| 2 | Semantic layer | Define a metric on the model just built, then query it from two places | One definition, consumed everywhere. The end of two dashboards disagreeing about revenue | 10 min |
| 3 | Open a PR | Push the change, CI runs the tests and builds the modified models, review the diff | The governance story, made concrete. AI-authored or hand-written, everything goes through the same gate | 8 min |
| 4 | Orchestration and jobs | Merge, then the job that runs it: environments, schedule, the run log | Production is a job with an owner and a log, not a laptop | 8 to 10 min |
| 5 | dbt State | Re-run the job after a change that touches little, and show what was skipped, cloned, and built, with the time and compute saved | Rebuilding only what genuinely changed, judged semantically rather than by file diff | 10 min |
| 6 | Cost Insights | Where the compute went, which models cost the most, savings realised | The number a partner's client actually asks about, answered from the platform rather than a spreadsheet | 6 to 8 min |
| 7 | dbt MCP server | Point an agent at the project: metadata, lineage, and governed metrics as tools | Their clients' AI initiatives can read governed definitions instead of guessing at raw tables | 8 min |

**Release phases are not optional here.** dbt State is in Preview and dbt Wizard has Beta and Preview
surfaces. State the phase out loud when it appears, per `wizard-and-state.md` and `research-protocol.md`.
Presenting a Preview feature as GA in front of a partner creates a commitment nobody agreed to.

**Chapters 5, 6, and 7 are each strong enough to carry their own session.** For a 60 to 90 minute slot, run 1
through 4 and mention the rest in the close. Cramming seven chapters into 90 minutes is the fastest way to
demo nothing well. See `wizard-and-state.md` for the standalone shapes.

**Cost Insights, not dbt Insights.** dbt Insights is out of scope for session content per `brand-voice.md`.
Cost Insights is a different feature and is approved.

---

## Choosing the track

Asked in call 3 when the session type is Technical or Mixed, per `intake.md`:

| Answer | Track |
|---|---|
| Foundations | Track A |
| Platform and AI | Track B |
| Both, long session only | A chapters 1 and 3, then B chapters 1, 3, and 5. Half day minimum |
| Let the fluency answer decide | New to both or stronger on one, Track A. Solid on both, Track B |

If intake Q5 says "solid on both" and the audience is architects, default to Track B without asking.

---

## The demo environment

Ask before building, and put the answer in the demo flow file:

1. **Is there a repo to demo from?** Offer, in this order: a repo the user names, an existing hands-on-lab
   repo they already maintain, or a fresh minimal project built for this session. Never assume a repo exists
   and never invent a URL for one.
2. **What is actually live?** A Fivetran account with a working destination, a dbt platform project, warehouse
   credentials, and for Track B a git remote that can take a PR. List what is missing rather than discovering
   it in the room.
3. **Which platform is the demo on?** The primary platform from intake, and it must be one that is genuinely
   available. Demoing on Snowflake for a Databricks partner undoes the customisation.

**The repo is an artifact the partner keeps**, so it is worth naming in the close and in the next-steps slide.
A session that leaves behind a working project they can rerun outlasts the slides.

## Demo discipline

The gap between a demo that lands and one that dies is preparation, not talent:

- **Pre-seed everything slow.** First syncs, first builds, and warehouse warm-up happen before the room fills.
  Show the second run, not the cold start.
- **Every chapter needs a fallback**, named in the demo flow: a screenshot, a recording, or a completed
  branch to switch to. State the fallback before the chapter, not while it fails.
- **Live-type almost nothing.** One or two short edits maximum. Paste the rest from a prepared file.
- **Use a scratch schema or a dedicated warehouse**, never anything shared.
- **Platform-specific timing traps** from the platform profiles: Spark session startup on Fabric Lakehouse,
  credit consumption visibility on Snowflake, slot contention on BigQuery. Read the active profile before
  scripting the timings.
- **Never demo an out-of-scope feature**, per `brand-voice.md`, even when it demos well.

## The demo flow file

For Technical and Mixed sessions, produce a separate `demo-flow.md` alongside the deck. For hackathons it
merges into the run-of-show rather than duplicating it. Structure:

```markdown
# <Partner>: demo flow, <date>

Environment checklist, what must be true before the room fills
Pre-seeded state, what was run in advance and when

## Chapter <n>: <name>   (<wall-clock start> to <end>)
Setup slide: <slide number>
Steps: numbered, one action each, with the exact click path or command
Say: the one value line, verbatim
Watch for: the failure mode most likely here
Fallback: what to switch to, and where it lives
Payoff slide: <slide number>
```

Timings are wall-clock and must sum to the session length with the context slides and Q&A included. If they
don't sum, cut a chapter rather than compressing every chapter until none of them breathe.
