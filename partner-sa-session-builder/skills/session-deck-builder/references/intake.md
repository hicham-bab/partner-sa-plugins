# Intake: discovery questions

Run this at Stage 1. Use the AskUserQuestion tool, grouped into the three calls below.

**Design target: two rounds of clicking, under 60 seconds, then straight to the outline.** A third short
round is fine when follow-ups genuinely apply. Every question
has to earn its place by changing the output. If an answer wouldn't change a slide, it isn't a question,
it's a default.

---

## Governing rules

1. **Parse before asking.** If the opening message already contains a brief, extract everything inferable
   and ask only the gaps. Never re-ask what was already stated.
2. **Multiple choice, not free text.** Clicking beats typing and produces cleaner routing. Free text only
   where the answer is genuinely open (platform "Other", specific connector, final catch-all).
3. **Respect the tool's shape: 4 questions per call, 4 options per question.** AskUserQuestion accepts a
   maximum of four questions in one call and four options per question, and it appends its own "Other"
   option. Send five questions and one is lost. Send six options and the tail is lost. This is not a style
   preference, it is the reason an earlier version silently never asked about language. Never pad a call to
   four for symmetry either, ask what applies.
4. **Three calls, fixed membership.** Call 1 always asked, call 2 asked unless already parsed, call 3 only
   the follow-ups that apply. Tier C is inferred and merely confirmed in the closing echo.
5. **Confirm platforms, never infer them.** The only field exempt from rule 1. Platform is multi-select; if
   more than one is chosen, always establish which is primary.
6. **Every question leads with a recommended option**, so the fast path is click-accept-accept.
7. **Stop when you have enough.** If call 1 settles call 2, skip it. Asking questions you can already
   answer is the opposite of sharp.

---

## The three calls

Fixed membership. Follow this table rather than regrouping on the fly, because regrouping is how a question
gets dropped.

| Call | Questions | Always? |
|---|---|---|
| 1 | Q1 session type · Q2 platforms · Q2b **deck language** · Q4 duration | Always, even with a detailed brief, minus anything already stated |
| 2 | Q3 audience · Q5 dbt/Fivetran fluency · Q6 Fivetran source · Q7 vertical | Unless the brief already settles them |
| 3 | Primary platform · Fabric adapter · speaker-notes language · Q8 outcome | Only the ones that apply, batched into a single call |

**Q2b is never dropped, never merged, never inferred from the partner's country.** A French partner may well
want an English deck for reuse, and a deck in the wrong language is a total loss rather than a rough edge. If
you can only ask one question, ask that one.

---

## Call 1: always asked (Q1, Q2, Q2b, Q4, one screen)

**Q1. What kind of session is this?**
- Partner enablement session *(recommended)*: technical training for partner staff
- Hackathon / workshop: hands-on build, needs a run-of-show
- Mixed: enablement then build

**Q2. Which data platforms does the partner work with?** (**multi-select**)
- Snowflake
- Databricks
- BigQuery
- Microsoft Fabric

Four options, and the automatic "Other" takes free text for Redshift, Synapse, Postgres, Athena, Teradata,
ClickHouse, MotherDuck, and the rest. Do not add a fifth option of your own; see governing rule 3.

Many partners run practices across several platforms. Let them pick all that apply.

→ *If more than one selected:* **ask which is primary**, "which one has the most client work, or the nearest
opportunity?" One platform must carry the running example, or the story fragments and the deck doubles in
length. Then read `multi-platform.md` for the session shape and the real divergences. Do not simply load two
profiles and concatenate them.

→ *If Fabric:* **Warehouse (T-SQL, `dbt-fabric`)** or **Lakehouse (Spark, `dbt-fabricspark`)**? Always ask;
the two adapters differ in materialization and incremental support.

→ *If Other:* the skill builds an **ad-hoc platform profile at run time** from the dbt adapter docs and the
matching Fivetran destination page, rather than falling back to generic content. If no dbt adapter or
Fivetran destination exists for what they name, say so plainly instead of improvising.

→ *If the session has hands-on labs:* ask **which platforms will actually be available in the room.** If only
one is, that one should be the primary; teaching on one platform and practising on another is the worst of
both. See the sandbox notes in `multi-platform.md`.

**Q2b. What language should the deck be in?**
- English *(recommended default)*
- French
- German
- Spanish

Four options plus the automatic "Other", which is where **Italian** and **Japanese** arrive. All six are fully
supported in `languages.md`; the four listed are the ones EMEA partner sessions actually ask for. Do not
expand this list to six, the tool would silently drop the tail and Japanese would vanish.

→ *If not English:* read `languages.md` before building. Ask in call 3 whether **speaker notes** should match
the slides or stay in English; both are common, depending on who presents. Write in the target language from
the start rather than translating a finished English deck.

→ *If not English:* the research step changes too, not just the writing. Follow the target-language sourcing
procedure in `research-protocol.md`: find the best existing internal material in that language first, and only
translate where it genuinely doesn't exist.

→ *Always:* verify certification language availability for that audience before the certification slide claims
anything. Availability differs by exam and language and has changed recently.

**Q4. How long is the session?**
- 60–90 minutes
- Half day (3–4 h)
- Full day
- Multi-day

---

## Call 2: asked unless already known (Q3, Q5, Q6, Q7)

**Q3. Who's actually in the room?**
- Data / analytics engineers: hands-on builders
- Architects and tech leads: design and standards decisions
- Mixed technical audience
- Pre-sales / consultants: need to position and demo, not build

**Q5. Which are they stronger on today, dbt or Fivetran?**
This sets the story's entry point, so it matters more than any other single answer.
- Stronger on dbt: they transform well, ingestion is their bottleneck
- Stronger on Fivetran: they land data reliably, transformation is the gap
- Solid on both: skip fundamentals pacing, go integrated and deeper
- New to both *(recommended default when unknown)*: build from first principles

| Answer | Entry point the deck uses |
|---|---|
| Stronger on dbt | Open on the transformation layer they already own, then reveal how much hand-built extraction work disappears |
| Stronger on Fivetran | Open on reliably landed data, then the trust-and-logic gap that sits immediately after it |
| Solid on both | Open on the integrated picture; spend the recovered time on governance, Fusion, dbt Mesh, dbt Catalog |
| New to both | Open on the data journey end to end, conceptually, before any product name appears |

**Q6. Which Fivetran source should the story use?**
Uses Fivetran's own connector categories, verbatim from their docs.
- **Applications** *(recommended)*: Salesforce, HubSpot, NetSuite SuiteAnalytics, Workday HCM, Shopify, Stripe…
- **Databases**: PostgreSQL, MySQL, Oracle, SQL Server, MongoDB (incl. High-Volume Agent variants)
- **Events**: Apache Kafka, Confluent Cloud, Azure Event Hubs, Amazon Kinesis Firehose
- **Files**: Amazon S3, Azure Blob Storage, Google Cloud Storage, SFTP, SharePoint

Exactly four categories, so the automatic "Other" carries "not sure". On "not sure" or no answer, pick the
most credible source for their vertical and state the choice in the closing echo rather than asking again.

→ Optional follow-up: name the specific connector, so the demo and screenshots are exact.

**Connector-naming guardrail.** Fivetran's catalogue does not contain a plain "SAP", "NetSuite", or
"Workday" connector; the real names are `SAP ERP on HANA`, `SAP ECC on Oracle`, `NetSuite SuiteAnalytics`,
`Workday HCM`, and so on. Fivetran's docs also never label a category "CDC" or "log-based"; high-volume
database connectors are named `High-Volume Agent Oracle`, `High-Volume Agent SQL Server`. The skill must
resolve exact connector names from the docs and never invent one. Wrong connector names in front of a
Fivetran-strong partner are an instant credibility loss.

**Q7. Should this be verticalized?**
- Not vertical-specific *(recommended)*: use a generally credible example
- Retail / e-commerce
- Financial services
- Manufacturing / supply chain

Healthcare and life sciences, public sector, media, and anything else arrive through the automatic "Other" as
free text, and are equally well supported. Four listed, not seven, for the reason in governing rule 3.

Vertical changes the running example (the metrics, the source systems, and the pain narrative), not the
product content. Customer names, logos, and case studies must come from internal sources only; the skill
never invents a reference.

---

## Call 3: conditional follow-ups (only what applies)

Batch these into one call. Skip any that don't apply, and skip the call entirely if none do. Never exceed four;
if five would apply, drop Q8 and infer the outcome from the session type instead.

| Ask | Only when | Options |
|---|---|---|
| Which platform is primary? | Q2 returned more than one | The selected platforms, up to four |
| Fabric adapter? | Fabric is in Q2 | Warehouse (T-SQL, `dbt-fabric`) · Lakehouse (Spark, `dbt-fabricspark`) |
| Speaker notes language? | Q2b is not English | Match the slides · Keep notes in English |
| Q8, see below | Not inferable from the session type | The four below |

**Q8. What should they be able to do afterward?**
- Position dbt + Fivetran to their own clients
- Build and deploy independently
- Pass certification: adds a certification-path close
- Ship a working prototype: hackathon default

Hackathons default to shipping a prototype and enablement sessions to positioning, so this is usually
inferable. Say the inference in the closing echo instead of spending a question on it.

---

## Tier C: inferred, confirmed not asked

Stated in the closing echo so you can correct them in passing, never as separate questions.

| Field | How it's inferred |
|---|---|
| Consumption layer | Fabric → Power BI; otherwise from internal partner context, else left generic |
| dbt / Fivetran balance | **Defaults to an even split** unless Q5 or the brief pushes one way |
| Slide + lab budget | From Q4 duration |
| Code density | From Q3 audience |

### Slide and lab budget by duration

| Duration | Slides | Labs / exercises |
|---|---|---|
| 60–90 min | 18–25 | 1 |
| Half day | 30–40 | 2–3 |
| Full day | 50–60 | 4–5 |
| Multi-day | One deck per day | 4–5 per day |

---

## Optional final prompt

> "Anything else? Partner name, prior sessions, sensitivities, topics they specifically asked for, or a
> transcript / notes / past deck to draw from."

Offered once, explicitly skippable. An attached transcript or past deck is the highest-value input
available, mine it before general search.

---

## The running example is assembled from the answers

Q7 (vertical) + Q6 (Fivetran source) + Q2 (**primary** platform) together select the story's protagonist
dataset, which then appears on **every** slide from ingestion through to consumption. Secondary platforms never
enter the running example, they appear only in contrast slides.

> Retail + Shopify + Snowflake → "one day of Shopify orders, from API to a revenue-by-channel dashboard"
> Financial services + PostgreSQL + Databricks → "core banking transactions, from Postgres to a
> regulatory-reporting mart"

This is the mechanism that turns a topic tour into a single continuous story, and it's the main reason Q6
and Q7 are worth asking at all.

---

## Closing echo

One paragraph back for confirmation before any research spend:

> "90-minute enablement session for a Databricks-primary partner, mixed technical audience, stronger on
> Fivetran than dbt, so I'll open from reliably landed data and build toward the transformation layer.
> Retail vertical, Shopify as the running source, Power BI at the end. ~22 slides, one hands-on lab,
> even dbt/Fivetran split. Researching now, shall I go?"

One line, one confirmation. Correcting a sentence is free; correcting a researched deck is not.
