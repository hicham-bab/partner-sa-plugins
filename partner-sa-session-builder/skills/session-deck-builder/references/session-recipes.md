# Session recipes

A recipe is an ordered selection of blocks from `slide-library.md`, arranged into the five acts from
`storytelling.md`. Acts never reorder except the documented act 3 / act 4 swap.

## Technical session: context then demo

The default shape, and the one most partner sessions want. Full detail, chapter patterns, both demo tracks, the
environment checklist, and the demo discipline rules live in `demo-flows.md`. Read that file rather than
improvising a demo order.

| Act | Blocks |
|---|---|
| 0 | Title · Agenda with timings |
| 1 | The world / what hurts today · Audience context |
| 2 | The data journey (introduces running example) · Whole-picture architecture |
| 3 to 4 | Demo chapters, each as setup slide, demo, payoff slide |
| 5 | Recap · Certification ladder · Partner portal · Next steps, naming the demo repo · Q&A |

Context slides are acts 1 and 2 compressed to 6 to 12 slides depending on duration. The demo carries acts 3
and 4. Deliverables are the deck plus a `demo-flow.md`.

## Partner enablement session

Default shape, 60–90 minutes, ~22 slides, 1 lab.

| Act | Blocks |
|---|---|
| 0 | Title · Agenda with timings |
| 1 | The world / what hurts today · Audience context |
| 2 | The data journey (introduces running example) · Whole-picture architecture |
| 3 | Section break · Concept explainer ×1–2 · Live-demo cue · Deep technical explanation |
| 4 | Section break · Concept explainer ×2 · Hands-on lab · Checkpoint · Common pitfalls |
| 5 | Whole picture revisited · dbt Mesh / governance (audience-dependent) · Certification ladder · Partner portal · Recap · Resources · Next steps · Q&A |

Scale by duration: half day adds a second lab plus a comparison block and more concept explainers; full day
adds exercises with solutions and a second checkpoint per act.

**The certification ladder and partner portal blocks are standard in every partner-facing session**, not
conditional on the stated outcome. See `certifications.md`. If outcome = pass certification, expand to a
full pathway with an exam-by commitment.

## Multi-platform sessions

Pick a primary platform to carry the running example, then insert contrast only where behaviour genuinely
differs; in practice that's incremental strategies, constraint enforcement, and the catalog/Iceberg story.
Full shapes and the verified divergence tables are in `multi-platform.md`.

| Situation | Adjustment to the recipe above |
|---|---|
| One dominant platform, one or two secondary | Add one contrast slide per real divergence, in act 3 or 4. Labs on the primary only. |
| Even split, facilitators per track available | Teach acts 1–3 platform-neutrally; split act 4 labs into per-platform breakouts; reconverge for act 5. |
| Cross-platform client workloads | Lead act 5 with cross-platform Mesh, the multi-platform reality is the story, not a caveat. |
| Partner migrates clients between platforms | Comparison content becomes the core; frame as a migration practice. |

For a mixed-platform room, prefer teaching **`microbatch`** for incremental models; it's the one strategy
supported across every adapter in the table, so the lab works on every track.

## Standalone subject sessions

Two subjects are deep enough to carry a session on their own rather than appearing as a feature slide inside a
broader story; see `wizard-and-state.md` for the full shapes:

| Session | Half-day shape |
|---|---|
| **dbt Wizard CLI** (Beta) | Install and BYOK → project understanding → data-informed tests, job debugging, production deferral labs → skills and subagents encoding the partner's own standards → telemetry and governance |
| **dbt State** (Preview) | The rebuild-everything problem → skip / clone / build → `lag_tolerance` → vs `state:modified` → enable in a real project → troubleshooting overeager rebuilds → security Q&A |
| **Combined, full day** | Wizard CLI in the morning (authoring), dbt State after lunch (execution). Through-line: less time writing, less compute rebuilding. |

Both work without a dbt platform account. Lead with that framing when the partner's clients aren't all on the
platform; it turns "another thing to sell" into "something you can use on Monday, on the engagement you
already have."

**Include the dbt Mesh block** for architect and tech-lead audiences, and for partners working across more
than one data platform, in which case lead act 5 with cross-platform Mesh. See `data-mesh.md`, and respect
the readiness caveats there rather than selling mesh to everyone.

## Hackathon / workshop

Half day or full day. Needs the facilitator run-of-show as a second deliverable.

| Act | Blocks |
|---|---|
| 0 | Title · Agenda with timings and checkpoint clock |
| 1 | The world / the challenge framing |
| 2 | The data journey · Whole-picture architecture (**keep visible all day**) |
| 3–4 | Environment setup · Architecture of the provided starter · Rules and judging criteria · Exercise tracks by skill level · Checkpoint slides at each time gate |
| 5 | Demo / judging · Recap · Certification ladder · Partner portal · Next steps · Q&A |

Hackathons still open at the basics. Participants arrive at mixed levels and the shared foundation is what
keeps the room together; skipping it strands the least experienced third within the first hour.

### Facilitator run-of-show (separate markdown file)

Required for every hackathon and workshop:

- Wall-clock timings for each segment, not just durations
- Checkpoint gates: what every participant must have working before the room moves on
- **Fallbacks for a broken environment**: the single most likely failure, and the thing that separates a
  recovered session from a lost one
- Support channel and escalation path
- Per-track difficulty notes so facilitators can redirect people mid-session

## Mixed session

Enablement in the morning, build in the afternoon. Run the enablement recipe through act 4, then switch to
the hackathon act 3–4 blocks for the build portion, and close with a single act 5. One deck, one arc, do
not produce two decks stitched together, and do not restate the foundation after lunch.

## Audience calibration

From intake Q3.

| Audience | Adjustment |
|---|---|
| Data / analytics engineers | Full code density; SQL and YAML on slides; labs are the centrepiece |
| Architects and tech leads | Architecture and governance blocks expand; code shown but not typed; add standards and CI/CD framing; include the dbt Mesh block and steer certification framing toward the Architect track |
| Mixed technical | Code present but always paired with a plain-language statement of what it does |
| Pre-sales / consultants | Replace labs with demo cues; add positioning and objection-handling framing; keep code illustrative |

## Slide and lab budget

| Duration | Slides | Labs / exercises |
|---|---|---|
| 60–90 min | 18–25 | 1 |
| Half day | 30–40 | 2–3 |
| Full day | 50–60 | 4–5 |
| Multi-day | One deck per day | 4–5 per day |

Multi-day sessions generate one deck per day, built one at a time; easier to deliver and easier to hand to
a co-presenter.
