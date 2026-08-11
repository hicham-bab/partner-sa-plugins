# Layout and fit: making the deck look built, not generated

Read this at Stage 4, before writing a single slide, and run the fit check at Stage 4.5 before handing over.

These slides go in front of the partner's customers. A deck where text runs past the placeholder edge, or
where six paragraph-shaped slides sit in a row, reads as machine output no matter how good the content is.
Word budgets alone do not prevent that, because a word budget says nothing about *which* placeholder the
words landed in.

**The governing idea: the deck is not the document.** Slides carry the claim. Speaker notes carry the prose.
When something doesn't fit, it belongs in the notes, not in a smaller font.

---

## Per-placeholder budgets

Characters, not words, because placeholders are sized in characters. Counts include spaces.

| Placeholder | Budget | Shape |
|---|---|---|
| TITLE (Title slide) | ≤ 60 | One line. A claim, not a label. No terminal period. |
| TITLE (all other layouts) | ≤ 55 | One line. Must fit without wrapping. |
| TITLE (Simple - Dark, section break) | ≤ 40 | Two or three words is ideal. |
| TITLE (Simple branded, close) | ≤ 30 | "Questions?" or the equivalent. |
| SUBTITLE | ≤ 90 | One sentence, or a fragment. Never two sentences. |
| BODY as bullets | ≤ 5 bullets, ≤ 70 each, ≤ 300 total | Fragments. No terminal periods. |
| BODY as a single statement | ≤ 180 | One or two short sentences, when the slide is a statement rather than a list. |
| BODY on Text heavy slide | ≤ 420 across both BODY placeholders | The only layout allowed near this much text, and only for labs and deep explanation. |
| Table cell | ≤ 40 | 4 columns and 6 rows maximum, header included. |
| Speaker notes | No limit | Where the real prose lives. |

**Language scaling**, applied to every character budget above:

| Language | Multiplier |
|---|---|
| English | ×1.0 |
| French, Spanish, Italian | ×0.85 |
| German | ×0.7 |
| Japanese | ×0.5, and count characters rather than words throughout |

German compound nouns and Japanese glyph width are where layouts break. Both need a rendered check on the
first two slides before the rest of the deck is built.

---

## The fit check, Stage 4.5

Not optional, and not a visual guess. After the deck is populated and before you report it as ready:

1. `list_slides` to get every slide ID.
2. `get_slide` on each one. Read back the text actually in each element, not the text you intended to write.
3. For every text element, compare the real character count against its budget above.
4. Where `get_slide` returns element size, do the arithmetic rather than trusting the budget:

```
chars_per_line   ≈ (width_EMU  / 12700) / (font_pt × 0.5)
lines_available  ≈ (height_EMU / 12700) / (font_pt × 1.2)
capacity         ≈ chars_per_line × lines_available × 0.9
```

12700 EMU is one point. The 0.5 approximates average glyph width for a sans face, 1.2 the line height, and
the 0.9 is headroom for the wrap landing badly. Treat anything above capacity as overflow even if it is
inside the table budget.

5. Fix every overflow before handing over. Then say in your handover message how many slides you checked and
   how many you rewrote, so the number is visible rather than implied.

If `get_slide` returns no size information, fall back to the character budgets and say so plainly in the
handover rather than claiming a fit check that didn't happen.

---

## Fixing overflow, in this order

1. **Cut words.** Most overflow is throat-clearing. "In order to ensure that" is "to".
2. **Move the detail to speaker notes.** The presenter says it; the slide doesn't need to.
3. **Split the slide.** Two clean slides beat one crowded one, and the budget in `intake.md` has room.
4. **Promote it to a diagram.** If it's a sequence or an architecture, it was never bullet material.

Never do any of these:

- Shrink the font, or pass `font_size` to `style_text` to make something fit
- Pass `font_family` at all, which detaches the text from the brand master
- Truncate mid-thought, or end a bullet with an ellipsis to hide the cut
- Leave it overflowing and mention it in the handover as a known issue

---

## Visual rhythm

A deck that is beautiful in the way a partner-facing deck needs to be is mostly a rhythm problem, not a
decoration problem.

- **One idea per slide**, and the title states that idea as a claim. "Ingestion is not the hard part" beats
  "Ingestion overview".
- **Never two Text heavy slides in a row.** If the outline has them adjacent, one of them is really a
  diagram, a statement, or two slides.
- **At most two consecutive slides on the same layout.** Alternate deliberately.
- **A visual at least every fourth slide**: a diagram, a product screenshot, or a dark section break.
- **A section break at every act boundary**, on Simple - Dark. Five acts means four or five breaks, and they
  are what makes a long deck feel navigable.
- **Simple branded is the close only.** Using it mid-deck spends the ending.
- **The agenda slide is six lines maximum.** An agenda that needs scrolling is a timetable, and belongs in
  the run-of-show instead.

## Prohibited outright

These are what "generated" looks like, and each one is a reason a partner quietly rebuilds the deck:

- Decorative stock photography, clip art, icon sets, or emoji
- Custom fonts, custom colours, gradients, or drop shadows not already in the master
- Bullets written as full sentences with terminal periods
- A table used where a diagram belongs, or a table over 4×6
- Any Google predefined layout, per `slide-library.md`
- Placeholder text left in an unused placeholder. Delete the element instead of writing "N/A" into it.

An empty placeholder is better than a filled one nobody needed. Not every layout slot has to be used.
