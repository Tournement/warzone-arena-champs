# Squad Zone APAC Arena — rebrand, rules, About, and Scoreboard system

## 1. Rebrand

- Replace "Blackout" / "Blackout Circuit" everywhere (header, footer, page titles, meta descriptions, OG tags) with the styled mark `𝑺 𝑸 𝑼 𝑨 𝑫 𝒛𝒐𝒏𝒆 LK` using those exact stylised characters, kept in one shared constant so it stays consistent.
- Add an ® mark next to the brand in the header and footer, and "All rights reserved" plus the tagline "Compete. Dominate. Get Paid." in the footer.

## 2. Tournament detail corrections

- Prize pool: 120,000 LKR total — 1st place 80,000 LKR, 2nd place 40,000 LKR. Add a prize-split block on the homepage event card.
- Squad slots: 13 (progress bars, ticker, counters, schedule table, register page all read from the same data).
- Roster: one extra player field so a squad registers 4 players + 1 reserve; validation updated accordingly.

## 3. Rules and Regulations

- New tab/section placed between the Event step and the Squad step in the registration flow, plus a full rules section lower on the page.
- Renders the complete official ruleset (eligibility, naming, weapon/loadout restrictions incl. stim play, recording and anti-cheat, console players, substitutions, disconnections, restarts and bugs, conduct, cheating and game integrity, enforcement, legal/consent, communication, match logistics) with themed styling: section icons, accent-coloured headings, warning-coloured callouts for the disqualification and team-wide accountability blocks, monospaced sub-lists.
- Header dateline: "Resurgence Custom Lobby Tournament — Sri Lanka · December 4–5".

## 4. About Us page

- New route `/about` with the full supplied About text broken into styled sections: About Us, Where It Started, Why We Do This, Built From The Community, What We Stand For (four value cards), What's Next, closing tagline.
- Small "About us" tile linked at the bottom of every page (footer), plus an "Our Vision" tile in the footer/bottom area of the main page that links to the vision section on the About page.

## 5. Game tiles

- Blood Strike tile: use the official artwork you just uploaded (added as a CDN asset), with a "Coming soon" badge and the tile non-clickable until launch. Warzone tile stays active.


## 6. Scoreboard (new tab) + Admin

- New `/scoreboard` route: game picker (Warzone active, Blood Strike coming soon). Choosing Warzone goes to `/scoreboard/warzone` — the public read-only point table: standings per squad with per-match placement and points, and the MVP board.
- Admin area behind email/password sign-in with an admin role stored in a separate roles table (no roles on profiles). Non-admins see the public view only; all writes are validated server-side and blocked for non-admins.
- Admin panel adapts the uploaded dashboard into the site's design, keeping the four working areas: Roster (add/edit/remove squads and players), Match Entry (placement + per-player kills, redeploys, damage, assists, score across 6 matches over 2 days), Standings, MVP Board. UX improvements: sticky match/squad selector, inline saving with toasts, keyboard-friendly numeric inputs, mobile-usable tables.
- Point calculation stays exactly as in your script:
  - MVP score = (Kills×4) + (Redeploys×3) + (Damage÷80) + (Assists×1.5) + (Score÷150)
  - Placement points 1st→8th: 150, 120, 90, 60, 45, 30, 22, 15; 9th and below: 8
  - Team match score = placement points + team kills (1 pt/kill)
  - Team total = sum across all 6 matches

## Technical notes

- Data model: `tournaments`, `squads`, `squad_players`, `matches`, `match_team_entries` (placement), `match_player_stats` (kills, redeploys, damage, assists, score), `user_roles` + `has_role()` security-definer function. Public SELECT for anon on scoreboard tables; writes restricted to admins. GRANTs issued with every table.
- Scoring implemented once in a shared pure module used by both the public table and admin previews, so numbers can never diverge.
- Reads/writes go through TanStack server functions; admin routes live under the protected `_authenticated` layout with an admin-role gate.
- Registration form remains client-validated with zod; no backend submission changes unless you want registrations stored too (say the word and I'll add it).

## Waiting on you

Upload the official Blood Strike image and I'll wire it into the game tile; everything else can proceed without it.
