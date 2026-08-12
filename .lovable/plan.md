# Update tournament details to Sri Lankan Squad Resurgence main event

## Goal
Replace the mixed tournament lineup with one featured Sri Lankan tournament using the corrected format: **Squad · Resurgence, 6 matches across 2 days, 100,000 LKR prize pool**, dropping on **24 Dec · 20:00 UTC** and **25 Dec · 20:00 UTC**. Add Sri Lankan flag branding to reinforce the local identity.

## Changes

### 1. Centralize the main event in `src/lib/site-data.ts`
- Add a `FORMAT` constant describing the event: `Squad · Resurgence · 6 matches · 2 days`.
- Update `LIVE_EVENTS` to a single featured event:
  - Name: "Holiday Resurgence Showdown" (or keep a tactical name if preferred)
  - Mode: `Squad · Resurgence`
  - Prize: `100,000 LKR`
  - Dates: `24 Dec · 20:00 UTC` and `25 Dec · 20:00 UTC`
  - Capacity: `64 squads` (default; adjust if user specifies)
  - State: `Registering`
- Trim `UPCOMING` to events that support this main event, or keep the list but highlight the main event first.

### 2. Update the homepage (`src/routes/index.tsx`)
- Replace the `TOURNAMENTS` schedule block with the main event card, showing the 2-day drop schedule and 6-match format.
- Update hero ticker text to reference the Resurgence format and LKR prize pool.
- Keep the Live Battles and Upcoming sections, but ensure the first/main card matches the corrected details.

### 3. Update registration default (`src/routes/register.tsx`)
- Set the default selected event in the form to the new main event.
- Keep the 4-step registration flow intact.

### 4. Add a format callout
- Display `6 matches · 2 days` prominently on the main event card and in the schedule section so the corrected structure is immediately visible.

## Out of scope
- No backend/schema changes (still static demo data).
- No new routes or animations beyond updating existing copy.
