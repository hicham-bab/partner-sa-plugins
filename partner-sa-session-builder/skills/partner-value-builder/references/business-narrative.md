# The business-value arc

A commercial audience, mostly in a partner's leadership or practice-lead seat. They are deciding whether to
invest their people's time, so the deck answers four questions in order: is there demand, what do we make, can
we deliver it, and what do we do on Monday.

**This is not the technical five-act arc.** No first-principles data journey, no product tour, no code. Product
names appear early here rather than late, because a commercial audience already knows what they are being
pitched and hiding it wastes their patience.

| Part | Job | Slides (60 to 90 min) |
|---|---|---|
| 1 | Why their clients are buying this now | 2 to 3 |
| 2 | What the partner earns | 3 to 4 |
| 3 | What their client gets | 2 to 3 |
| 4 | Whether they can deliver it | 2 |
| 5 | How to sell it | 2 to 3 |
| 6 | What happens next | 2 |

Fourteen to eighteen slides. A business-value deck that runs to forty has stopped being an argument and become
a document, and a partner manager cannot present it in a 60-minute slot with questions.

---

## Part 1: Why their clients are buying this now

The market movement, in their clients' language rather than ours: teams consolidating fragmented pipelines,
pressure on data budgets, AI initiatives that need governed definitions to be worth anything, and legacy tools
whose renewals are getting harder to defend.

One slide of that, then one slide naming the specific trigger this partner will actually meet: a renewal, a
migration off a legacy tool, a stalled AI programme, or a cost review. Use `verticals.md` when their clients
cluster in one industry, because "retail margin after returns" lands harder than "data quality".

**No product slide yet.** This part is about their pipeline, not our roadmap.

## Part 2: What the partner earns

The core of the deck, straight from the model.

- **The workstream breakdown**, on a table: assessment, pilot, migration, parallel run, retainer, and the
  Fivetran and lake streams when in scope. Days and day rate per stream, as ranges. This is the slide a practice
  lead reads twice, because it is a statement of scope they recognise.
- **Three years per client**, as a range, with year one separated out. Retainers do not start on day one and the
  model knows it.
- **Practice revenue per year**, nominal and capacity-feasible, both. Showing only the nominal number is how a
  deck loses credibility ten minutes later during part 4.
- **The assumptions**, on the same slide as the numbers or the one immediately after: day rates, deals per year,
  the reinvest share, and anything else supplied rather than told. Whoever is going to argue with the number
  will argue with these, so put them where the argument belongs.

Every figure carries "ranges from the Partner BVA model, not a quote and not a forecast" on the slide itself.

## Part 3: What their client gets

The partner has to be able to sell this, so give them the client-side argument in one page: budget released,
capacity released, and what the client stops paying for. Netted against what the client now pays for the
platform, Fivetran, and the lake, because a gross figure invites the obvious objection.

Keep the mechanisms honest and separate:

- **Capacity released** is engineering time coming back, not headcount removed. Say it that way; a slide that
  reads as a redundancy plan will not be shown to a client.
- **Budget released** is dominated by the retired legacy licence, at the retire share, starting in the benefit
  month.
- **The lake case acts on the whole warehouse compute bill**, not the dbt-driven slice, because ingestion is not
  something dbt causes. It applies to warehouse users, not to an existing lake user. The model's own guidance is
  that this range opens a conversation and is not a finding, so present it as a proof-of-value scope with a
  solutions architect, never as a saving.

## Part 4: Whether they can deliver it

The slide that earns the rest. Straight from the capacity output: how many of these the partner can support a
year, which role runs out first, and utilisation on that role.

If the model reports over capacity, **say so on the slide**. A partner manager who presents a revenue number
their partner cannot staff has traded one meeting's applause for the relationship.

Then turn it into the ask, which is what a partner manager is there for: certify the people who exist, shadow
the first delivery, hire against the constrained role, or split the work with another partner. This is where the
certification path belongs, per `certifications.md`, framed as capacity rather than as badges.

## Part 5: How to sell it

Make the partner independent of us:

- **The three questions that qualify a client for this**, drawn from the model's own discovery fields: where
  their transformation logic lives today, what is making them look now, and when the decision or renewal lands.
- **Who to talk to**, and what each of them cares about: the sponsor who owns the budget, the platform owner who
  owns the risk, and the finance seat that checks whether the benefit starts when you said it would.
- **The two objections they will meet**, with an answer each. Usually "we already have a tool for this" and "our
  team can build it", and the model has a self-build comparison for the second.

## Part 6: What happens next

Two slides, both concrete. A dated first step, an owner on each side, and what we do rather than what they
should do. Then the enablement path: certification, the partner portal, and the technical session that follows
this one, which is where `session-deck-builder` takes over.

Name the share links here. A partner who can reopen their own scenario, change a day rate, and watch the number
move is a partner who believes it.

---

## Tone for this audience

- **Lead with their business, not our product.** Their revenue and their team, then how we help.
- **Never present a midpoint.** Ranges are the honest form and a commercial audience reads a single number as a
  promise.
- **No hedging either.** "Between 400 and 780 thousand over three years, on these four assumptions" is
  confident. "Potentially significant value" is not.
- **Nothing about a partner's own margin**, discounting, or tier benefits. Not the model's territory, and not
  yours to put on a slide.
- **One page, one number.** A slide carrying four ranges is carrying none, because nobody remembers it.
