---
name: currency-check
description: Re-verify every fact the session-deck-builder skill depends on (product naming, release phases, feature availability, certification details, pricing, and end-of-life dates), then update the plugin's reference files and rebuild the .plugin. Use when the user asks to check for updates, refresh the plugin, run the monthly currency check, verify naming or EOL changes, or asks whether anything in the plugin has gone stale.
---

# Currency check

Audits every time-sensitive claim in this plugin against its live source, updates what changed, rebuilds the
packaged plugin, and writes a dated change report.

Designed to be run monthly, unattended. Assume nobody is watching; be conservative, and never guess.

## Working location

The plugin source lives in the connected folder. Find it before starting:

1. Look for `partner-sa-session-builder/` in the connected folder.
2. If there are several copies, use the one with the most recent `skills/currency-check/references/source-registry.md`.
3. If you can't find it, stop and report that rather than rebuilding from scratch.

## Step 1: Read the registry

Read `references/source-registry.md`. It lists eleven areas, each with sources and the value recorded at last
verification. That table is the contract: check every row.

Note the baseline date. If it's more than about six weeks old, expect more drift and check more carefully.

## Step 2: Verify each area

For dbt product facts use the dbt docs MCP tools (`search_product_docs`, `get_product_doc_pages`). For
pricing, Fivetran, and merger facts use WebFetch against the URLs in the registry. For certifications, search
internal sources as well as the public certification pages.

Rules:

- **Fetch every source.** Don't reason from what you remember about dbt; the whole point is catching change.
- **Record the release phase** every time: GA, Preview, Beta, experimental. Phase changes are the most common
  and most consequential drift.
- **Never use third-party pricing aggregators.** Official pricing pages only.
- **A missing page is a signal, not an error.** If a documented feature's page 404s, that may be a
  retirement, flag it as a finding; don't quietly drop it.

Highest-value things to catch, in order:

1. **Bundled Fivetran + dbt pricing appearing**: rewrites `pricing.md` and changes the partner conversation
2. **Any Preview or Beta reaching GA**, especially dbt State (which would introduce an SAO migration
   timeline) and dbt Wizard CLI
3. **Fabric being added to cross-platform Mesh**: both Fabric profiles currently forbid showing it
4. **Census "to be confirmed" dates becoming concrete**
5. **Canvas / Insights / Copilot being publicly deprecated**: would relax the internal-only caveat
6. **A company rename replacing "Fivetran + dbt Labs"**
7. **The dbt Core version the AE certification tracks**

Also scan `fivetran.com/docs/changelog` and the dbt release notes for EOL announcements not yet in the
registry. Fivetran posts EOL notices 12 months ahead, so new ones will appear there first.

## Step 3: Apply changes

For each difference found, update **both** the affected reference file and the registry baseline. The files
and what they own:

| File | Owns |
|---|---|
| `brand-voice.md` | Naming, product naming currency, out-of-scope features |
| `wizard-and-state.md` | dbt Wizard CLI and dbt State detail and release phases |
| `data-mesh.md` | Mesh features, cross-platform combinations, plan gating |
| `certifications.md` | Exams, logistics, prices, partner portal |
| `pricing.md` | dbt tiers, Fivetran plans, dbt State pricing, merger/bundling status |
| `lifecycle-and-migrations.md` | EOL dates, in-flight migrations |
| `platforms/*.md` | Per-platform behaviour and cross-platform Mesh support |
| `multi-platform.md` | Incremental strategy and constraint enforcement matrices, multi-platform session shapes |
| `languages.md` | Exam language availability, localised source availability, per-language layout rules |
| `slide-library.md` | Template ID and layout IDs |

Then set the baseline date in `source-registry.md` to today.

**Preserve the owner's standing instructions.** Canvas, dbt Insights, and dbt Copilot stay out of scope even
if the docs change, unless the user says otherwise. Cost Insights stays in scope. A currency check updates
facts; it does not overrule editorial decisions.

**Don't rewrite prose that didn't change.** Targeted edits only, so the diff is reviewable.

## Step 4: Rebuild the plugin

Bump the `version` in `.claude-plugin/plugin.json` first: patch for fact corrections, minor if a reference
file gained or lost a section.

**`claude plugin validate` only checks the manifest, not the skills.** Install-time validation is stricter, so
lint the skill and command frontmatter yourself before packaging or a broken package ships silently:

```bash
python3 - <<'PY'
import re, glob
bad = False
for f in glob.glob('skills/*/SKILL.md') + glob.glob('commands/*.md'):
    t = open(f).read()
    m = re.match(r'^---\n(.*?)\n---\n', t, re.S)
    if not m:
        print("NO FRONTMATTER:", f); bad = True; continue
    fm = m.group(1)
    if re.search(r'<[A-Za-z/!?]', fm):
        print("XML-LIKE TAG in frontmatter:", f); bad = True
    if 'description' not in fm:
        print("NO DESCRIPTION:", f); bad = True
    if f.startswith('skills/') and not re.search(r'^name:', fm, re.M):
        print("NO NAME:", f); bad = True
print("FRONTMATTER CLEAN" if not bad else "PROBLEMS FOUND, fix before packaging")
PY
```

Angle-bracket placeholders are the trap: a description containing something like `<partner>` reads as an XML
tag and is rejected on install. Use plain wording instead.

Then validate the manifest and package. Zip to `/tmp` first, writing a zip directly into the mounted folder
fails with a permissions error:

```bash
claude plugin validate .claude-plugin/plugin.json
rm -f /tmp/psb.plugin
zip -r /tmp/psb.plugin . -x "*.DS_Store" -q
cp /tmp/psb.plugin ../partner-sa-session-builder.plugin
```

If the lint or validation fails, report and stop rather than shipping.

## Step 5: Write the report

Write `currency-report-YYYY-MM-DD.md` next to the plugin, in this shape:

```markdown
# Currency check: YYYY-MM-DD

Previous baseline: YYYY-MM-DD. Sources checked: N. Changes found: N.

## Needs your attention
<Only things with a decision attached, a naming transition to confirm with PMM, a
 feature moving GA that changes a session's framing, a new EOL date. Empty is fine.>

## Changed
| Area | Was | Now | Files updated |

## Unchanged
<One line per area. Terse; this section exists to prove coverage.>

## Could not verify
<Sources that failed to load, with the URL. Never silently skip one.>

## Plugin
Version X.Y.Z → X.Y.Z. Validation passed. Repackaged at <path>.
```

Lead with **Needs your attention**, and keep it genuinely short. A monthly report that reads as noise stops
being read, and then the whole mechanism is worthless. If nothing material changed, say so in one line.

## Step 6: Report back

Summarise in two or three sentences: what changed, whether anything needs a decision, and the new version.
Mention the report file and the rebuilt `.plugin` so the user can reinstall.

If nothing changed, say that plainly; "checked 10 areas, nothing moved" is a good outcome, not a failed run.
