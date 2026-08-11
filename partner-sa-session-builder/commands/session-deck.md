---
description: Build a branded session deck for a partner enablement session, hackathon, or workshop
---

Launch the `session-deck-builder` skill now and run it from the beginning.

If the user supplied text after the command, treat it as the session brief: parse it for session type,
data platform, audience, duration, vertical, Fivetran sources, and desired outcome, then ask only the
discovery questions those answers leave open.

If the user supplied nothing, go straight to the Tier A discovery questions.

Do not skip the outline approval gate, and do not begin building slides before the user approves the
outline.
