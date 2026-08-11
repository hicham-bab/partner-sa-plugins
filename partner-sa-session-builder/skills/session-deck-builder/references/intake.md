# Intake: discovery questions

Run this at Stage 1. Use the AskUserQuestion tool, grouped by tier.

**Design target: two rounds of clicking, under 60 seconds, then straight to the outline.** Every question
has to earn its place by changing the output. If an answer wouldn't change a slide, it isn't a question,
it's a default.

---

## Governing rules

1. **Parse before asking.** If the opening message already contains a brief, extract everything inferable
   and ask only the gaps. Never re-ask what was already stated.
2. **Multiple choice, not free text.** Clicking beats typing and produces cleaner routing. Free text only
   where the answer is genuinely open (platform "Other", specific connector, final catch-all).
3. **Three tiers, two visible rounds.** Tier A always asked, Tier B asked unless parsed, Tier C inferred
   and merely confirmed in the closing echo.
4. **Confirm platforms, never infer them.** The only field exempt from rule 1. Platform is multi-select; if
   more than one is chosen, always establish which is primary.
5. **Every question leads with a recommended option**, so the fast path is click-accept-accept.
6. **Stop when you have enough.** If Tier A settles Tier B, skip it. Asking questions you can already
   answer is the opposite of sharp.

---

## Tier A: always asked (4 questions, one screen)

**Q1. What kind of session is this?**
- Partner enablement session *(recommended)*: technical training for partner staff
- Hackathon / workshop: hands-on build, needs a run-of-show
- Mixed: enablement then build

**Q2. Which data platforms does the partner work with?** (**multi-select**)
- Snowflake
- Databricks
- BigQuery
- Microsoft Fabric
- **Other** → free text (Redshift, Synapse, Postgres, Athena, Teradata, ClickHouse, MotherDuck…)

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
- Spanish
- Italian
- German
- Japanese

→ *If not English:* read `languages.md` before building. Ask whether **speaker notes** should match the slides
or stay in English; both are common, depending on who presents. Write in the target language from the start
rather than translating a finished English deck.

→ *Always:* verify certification language availability for that audience before the certification slide claims
anything. Availability differs by exam and language and has changed recently.

**Q3. Who's actually in the room?**
- Data / analytics engineers: hands-on builders
- Architects and tech leads: design and standards decisions
- Mixed technical audience
- Pre-sales / consultants: need to position and demo, not build

**Q4. How long is the session?**
- 60–90 minutes · Half day (3–4 h) · Full day · Multi-day

---

## Tier B: asked unless already known (4 questions)

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
- **Applications**: Salesforce, HubSpot, NetSuite SuiteAnalytics, Workday HCM, Shopify, Zendesk Support, Stripe…
- **Databases**: PostgreSQL, MySQL, Oracle, SQL Server, MongoDB (incl. High-Volume Agent variants)
- **Events**: Apache Kafka, Confluent Cloud, Azure Event Hubs, Amazon Kinesis Firehose
- **Files**: Amazon S3, Azure Blob Storage, Google Cloud Storage, SFTP, SharePoint
- Not sure: pick the most credible source for their vertical

→ Optional follow-up: name the specific connector, so the demo and screenshots are exact.

**Connector-naming guardrail.** Fivetran's catalogue does not contain a plain "SAP", "NetSuite", or
"Workday" connector; the real names are `SAP ERP on HANA`, `SAP ECC on Oracle`, `NetSuite SuiteAnalytics`,
`Workday HCM`, and so on. Fivetran's docs also never label a category "CDC" or "log-based"; high-volume
database connectors are named `High-Volume Agent Oracle`, `High-Volume Agent SQL Server`. The skill must
resolve exact connector names from the docs and never invent one. Wrong connector names in front of a
Fivetran-strong partner are an instant credibility loss.

**Q7. Should this be verticalized?**
- Not vertical-specific *(recommended)*: use a generally credible example
- Retail / e-commerce · Financial services · Healthcare / life sciences · Manufacturing / supply chain ·
  Public sector · Media · Other → free text

Vertical changes the running example (the metrics, the source systems, and the pain narrative), not the
product content. Customer names, logos, and case studies must come from internal sources only; the skill
never invents a reference.

**Q8. What should they be able to do afterward?**
- Position dbt + Fivetran to their own clients
- Build and deploy independently
- Pass certification: adds a certification-path close
- Ship a working prototype: hackathon default

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
