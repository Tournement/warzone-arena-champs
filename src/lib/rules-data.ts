export type RuleSection = {
  icon: string;
  title: string;
  intro?: string;
  items: (string | { text: string; sub: string[]; note?: string })[];
  callout?: string;
};

export const RULES_DATELINE = "Resurgence Custom Lobby Tournament — Sri Lanka · December 4–5";

export const RULE_SECTIONS: RuleSection[] = [
  {
    icon: "✅",
    title: "Eligibility",
    items: [
      "Players must be 16 years or older as of the tournament start date.",
      "Players must be in good standing on their platform account (PSN/Activision) — no active bans or unresolved violations.",
      "A player may only be registered to one squad for the duration of the tournament — no playing across multiple teams.",
    ],
  },
  {
    icon: "🏷️",
    title: "Team & Player Naming",
    items: [
      "No offensive, toxic, or discriminatory names/tags — in-game name, team name, and Discord handle.",
      "Team names may not include sponsor names/logos without prior written approval from Squad Zone APAC Arena.",
      "No political statements or purely commercial names.",
    ],
  },
  {
    icon: "🔫",
    title: "Weapon & Loadout Restrictions",
    items: [
      "ONLY Call of Duty Warzone season-relevant weapons",
      "No snipers",
      "No shotguns",
      "No incendiary ammo",
      "No special/heavy weapons (crossbows, RPGs, launchers, etc.)",
      {
        text: "No stim play — intentionally surviving inside the gas/circle by stacking multiple Stim Shots (to offset gas damage) combined with an Ammo Box (to resupply Stims) rather than rotating out normally. This includes:",
        sub: [
          "Sitting in the gas for an extended period, Stim after Stim, to negate the damage tick",
          "Using an Ammo Box specifically to keep resupplying Stims while remaining in the gas",
          "Holding a late-game position, denying rotations, or avoiding confrontation using this tactic",
        ],
        note: "Still allowed: briefly taking a tick or two of gas damage while rotating normally; using a Stim for its normal purpose (quick heal after a fight, before rotating).",
      },
    ],
  },
  {
    icon: "🎥",
    title: "Recording & Anti-Cheat",
    items: [
      "All players must screen record their full gameplay for every match, no exceptions.",
      {
        text: "On-screen telemetry overlay is mandatory, showing:",
        sub: [
          "Latency (ping) — required for all players",
          "In-game clock/time — required for all players",
          "FPS counter — required for PC players; optional for PlayStation players",
        ],
      },
      "VODs must be kept until the tournament is fully concluded.",
      "Suspected cheating must be reported to admins immediately, with match/time details; reporting parties should have their own recording as supporting evidence.",
      "Admins may request VODs from any player at any time — refusal or missing required overlay = automatic disqualification.",
      "Our verdict is final — no appeals beyond admin discretion.",
    ],
  },
  {
    icon: "🖥️",
    title: "Console Players (PlayStation)",
    items: [
      "PC-based scan tools are not required.",
      "Must still screen-share/record gameplay, with latency + time visible (FPS optional).",
      "May be asked to briefly show controller/console setup via camera to confirm no unauthorized input-modifying devices (e.g. Cronus Zen, XIM).",
    ],
  },
  {
    icon: "🔄",
    title: "Substitutions",
    items: [
      "Only the pre-registered reserve may substitute in.",
      "Substitutions allowed only between matches — never mid-match.",
      "Team leader must inform admins before the match begins if subbing in the reserve.",
      "Rosters (including reserve) are locked once the tournament begins — no new/unregistered players at any point.",
    ],
  },
  {
    icon: "📡",
    title: "Disconnections",
    items: [
      "Disconnections during a match are not Squad Zone APAC Arena's responsibility — matches will not be paused, replayed, or rescheduled for a lost connection.",
      "Teams are expected to manage their own connection stability.",
      "Repeated/suspicious disconnections (e.g., consistently dropping at advantageous moments) will be reviewed by admins as a team-level integrity issue — the whole team may be penalized.",
    ],
  },
  {
    icon: "⚠️",
    title: "Match Restarts & Bugs",
    items: [
      "Once all squads have loaded into the map, the match is considered live and will not be restarted — except at admin discretion in extraordinary cases (e.g., a mass disconnect affecting multiple squads, or a bug that critically altered the match outcome).",
      "Minor bugs (inconvenience only) — play through it, no restart.",
      "Major bugs (critically affects multiple squads/outcome) — admins may restart the match at their sole discretion.",
      "Exploiting bugs, glitches, or moving outside normal map boundaries for unfair advantage is treated as cheating.",
    ],
  },
  {
    icon: "🤝",
    title: "Conduct",
    items: [
      "Respect other players, admins, and staff — no toxicity, threats, or harassment (race, gender, religion, orientation, or otherwise) tolerated.",
      "No offensive names, tags, or chat — lobby, voice, and stream chat.",
      "Show up on time, ready to play — no-shows/forfeits without valid reason = match loss.",
      "Settle disputes through admins only — no threats, drama, or violence, on or off platform.",
      "No public statements attacking the integrity or competence of admins/referees — raise disagreements directly with admins.",
      "Don't leak lobby codes, internal admin discussions, or confidential tournament info to outside parties.",
    ],
  },
  {
    icon: "🎮",
    title: "Cheating & Game Integrity",
    intro:
      "Participants must always compete on their own skill and merit. This includes (not exhaustive):",
    items: [
      "Match fixing / collusion",
      "DDoS or connection interference",
      "Account sharing",
      "Bots, macros, or scripts (automated aim, recoil, or movement assistance)",
      "Wintrading or drophacking",
      "Ghosting / stream sniping",
      "Sabotaging your own teammates to affect the outcome",
      "Using leaked footage or confidential info from another team",
      "Server exploits, hacking, or boundary/map exploits",
      "Restricted items/weapons (see Weapon Restrictions)",
      "Threats, violence, or harassment toward any player, admin, or staff",
      "Misuse of tournament resources (lobby access, admin trust, etc.)",
      "Betting or gambling on match outcomes, encouraging others to do so, or accepting anything of value in exchange for influencing a match result",
      "Failing to report known cheating or misconduct by another player when you're aware of it",
      "Any other behavior undermining fair competition, at admin discretion",
    ],
    callout:
      "Team-wide accountability: if any player on a squad is found cheating, the entire team is disqualified — not just the individual. This applies retroactively to that match and, at admin discretion, the team's full standing. Prize money already earned may be forfeited entirely.",
  },
  {
    icon: "⚖️",
    title: "Enforcement",
    items: [
      "Admin decisions on scoring, disputes, and penalties are final.",
      {
        text: "Referees oversee each match, responsible for:",
        sub: [
          "Confirming each participant is on their correct squad before the match",
          "Checking and monitoring participant broadcasts",
          "Escalating penalties for rule violations during the match",
          "Communicating gameplay/equipment issues to admins",
        ],
      },
      "Escalation path: match forfeit → full disqualification + prize forfeiture, based on severity.",
      "Illegal activity (threats, harassment, etc.) may be reported to relevant authorities, in addition to match forfeiture.",
    ],
  },
  {
    icon: "📜",
    title: "Legal / Consent",
    items: [
      "Media consent: by registering, players agree their gameplay, name, and voice may be used in Squad Zone APAC Arena's highlights, YouTube content, social posts, and sponsor content.",
      "Liability waiver: Squad Zone APAC Arena is not liable for a player's personal equipment, internet connection, or other issues outside our control.",
    ],
  },
  {
    icon: "📡",
    title: "Communication",
    items: [
      "Discord is mandatory for all registered teams — no exceptions.",
      "All official communication (lobby codes, match updates, disputes, admin calls) happens through Discord only.",
      "Teams must be reachable on Discord throughout their scheduled match window.",
    ],
  },
  {
    icon: "⏱️",
    title: "Match Logistics",
    items: [
      "Lobby codes distributed 10 minutes after the scheduled match start time.",
      "Punctuality window: teams have a maximum of 10 minutes to join once the code is sent — after that, it's a no-show/forfeit, no exceptions.",
      "No warm-up/practice games once the map's first game has begun — if a match starts early, it counts as the official result, not a warm-up.",
    ],
  },
];
