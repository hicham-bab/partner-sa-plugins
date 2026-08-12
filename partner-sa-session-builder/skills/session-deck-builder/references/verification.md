# Verification: the gate before a deck is called ready

**Run this on every deck, every time, and report the result as a table.** These decks go in front of the
partner's customers, so "ready" is a claim that has to be checked rather than assumed. Nothing here is
optional, and a deck is never described as ready, finished, or presentation-ready until the table shows every
check passing or an explicitly accepted exception.

Order: build the deck, run this, fix what fails, run it again, report both passes.

---

## Check 1: nothing overlaps

The failure that ruins a deck in the room: text sitting on top of other text, or over an image edge.

For each slide, `get_slide` and compute every element's box from its `transform` and `size`:

```
left   = transform.translateX
top    = transform.translateY
width  = size.width.magnitude  × (transform.scaleX or 1)
height = size.height.magnitude × (transform.scaleY or 1)
right  = left + width
bottom = top + height
```

Two elements overlap when all four hold:

```
left_a < right_b   and   left_b < right_a   and   top_a < bottom_b   and   top_b < bottom_a
```

Rules for judging what an overlap means:

- **Flag only pairs where at least one element holds text.** Template layouts legitimately stack decorative
  shapes, and a background panel behind a text box is the design, not a defect.
- **Ignore contact under 45,000 EMU** (about 0.05 inch) on either axis. Boxes that merely touch are fine.
- **Text over text is always a defect.** Fix it, never accept it.
- **Text over an image is a defect unless the layout is built for it**, which for this template means the
  Photo slide layouts only.
- **Anything outside the canvas is a defect**: a 16:9 slide is 9,144,000 by 5,143,500 EMU, so flag any box
  with a negative left or top, or a right or bottom beyond those bounds.

## Check 2: no text overflows its own box

Geometry gives the box, not the rendered glyphs, so this is an estimate and must be reported as one. Per text
element, using the capacity formula from `layout-and-fit.md`:

```
chars_per_line  ≈ (width_EMU  / 12700) / (font_pt × 0.5)
lines_available ≈ (height_EHU / 12700) / (font_pt × 1.2)
capacity        ≈ chars_per_line × lines_available × 0.9
```

Read `height_EHU` as the element's height in EMU. Flag any element whose actual character count exceeds
capacity, plus any element over its per-placeholder budget in `layout-and-fit.md` even when the geometry looks
survivable. Fix by the remedies in that file, in order, and never by shrinking the font.

**Where font size isn't returned**, fall back to the character budgets alone and record that check 2 ran
degraded for those slides. Do not silently claim a fit you could not compute.

## Check 3: no wording repeats across slides

Two different failures, both of which read as carelessness:

- **The same sentence or phrase on two slides.** Compare the text of every slide against every other. Flag any
  shared run of six or more consecutive words. Bridge lines in speaker notes are exempt, since continuity is
  their job.
- **The same title twice**, or two titles differing only by a word. A deck with "Ingestion that maintains
  itself" and "Ingestion that maintains itself, continued" needs one slide or two real titles.

Reused slides from the corpus are the usual cause, per `slide-selection.md`. The fix is to cut the weaker of
the two, not to reword one slightly.

## Check 4: the content is correct

- Every substantive claim has a resolved source in the speaker notes
- No connector name, customer, logo, or case study that isn't resolved from docs or internal content
- Release phase stated wherever a Beta or Preview feature appears, per `research-protocol.md`
- Every number traces to its source, and any BVA figure is a range presented as a range, never a midpoint
- No pricing figure older than this build
- Nothing from the out-of-scope list in `brand-voice.md`
- No placeholder text, no "TBD", no "lorem", no empty filled placeholder saying "N/A"

## Check 5: the language is consistent

- Every slide is in the requested language, with product names, code, config keys, and official exam names in
  English per `languages.md`
- dbt is lowercase everywhere, including sentence starts and German nouns
- No English sentence left in a non-English deck, and no untranslated reused slide
- Speaker notes are in whichever language was agreed, consistently across all slides

## Check 6: the deck is on template

- Every slide's layout resolves to one of the eleven template layouts in `slide-library.md`
- No Google predefined layout anywhere
- No font family set by the build, and no colour outside the master
- Speaker notes present on every slide

---

## The report

Print this, and put the same summary in the handover message:

```
Verification, pass 1 of 2
| Check | Slides checked | Flagged | Fixed | Remaining |
|---|---|---|---|---|
| 1 Overlap            | 24 | 3 | 3 | 0 |
| 2 Text fit           | 24 | 5 | 5 | 0 |
| 3 Repeated wording   | 24 | 1 | 1 | 0 |
| 4 Content correct    | 24 | 0 | 0 | 0 |
| 5 Language           | 24 | 0 | 0 | 0 |
| 6 On template        | 24 | 0 | 0 | 0 |
Degraded checks: none
```

Then re-run and report pass 2. **Pass 2 must show zero remaining**, or the deck is reported as not ready with
the specific slides named.

## What this cannot prove

Say this in the handover rather than leaving it implied. The Slides API returns box geometry, not rendered
text, so checks 1 and 6 are exact while check 2 is an estimate: a heading one character under the computed
capacity can still wrap onto a second line in the browser and push the layout. So:

- **Name the slides that came closest to their limit**, at most five, as the ones worth a human glance.
- For a non-English deck, name the German or Japanese slides specifically, since those are where wrapping
  breaks first.
- Never write "presentation ready" without that list attached. "Verified, with these five slides worth a
  glance" is true. "Ready to present" on its own is a claim about pixels nobody has looked at.
