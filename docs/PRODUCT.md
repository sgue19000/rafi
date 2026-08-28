# Termline product record

## Executive summary
Termline is a mobile-first web product for household commitments that renew or expire: subscriptions, leases, warranties, memberships, utilities, and documents. It annualizes spend, opens a review queue in a notice window, and records keep / review / switch / cancel. No bank link. No AI core.

## Problem
FACT: Widely cited C+R Research figures put average US subscription spend near $219/month versus an $86 estimate. West Monroe: 89% underestimate spend; 42% forgot a live subscription. Auto-renew enforcement is active (FTC and state AGs, 2025-2026).
FACT: Bank-linked trackers miss cash/SEPA invoices, App Store bundles, leases, passports, warranties, and most non-US rails. Bobby-style apps are often iOS-only and subscription-only.
INFERENCE: The object is any dated commitment, not a streaming row.
ASSUMPTION: People will type 8-20 terms if the first session is under five minutes.

## Ideas scored (weights: severity 1.2, prevalence 1.2, gap 1.3, value 1.2, uniqueness 0.9, adoption 1.1, feasibility 1.3, simplicity 1.2, scale 0.8, global 1.2, competition 1.0, sustainability 1.0)
1 Termline 112 — winner
2 Handoff Desk 101
3 Quiet Ledger 99
4 Promise Queue 94
5 Warranty Drawer 93 (subset)
6 Care Shift Board 92
7 Decision Log 88
8 Trip Pack Share 84
9 Form Once 83
10 Waitline 82
11 Neighbor Shelf 80
12 Receipt Span 79
13 School Gate 78
14 Rent Clause 77 (subset)
15 Domain Watch 76 (subset)
16 Club Seat 75 (subset)
17 Shared Menu 74
18 Timebox Family 73
19 Vendor Score 71
20 Gift Orbit 68
21 Desk Swap 64
22 Pet Handover 63

Winner because subsets collapse into one term object, no bank rails, and a decision state machine competitors split across fintech / iOS list / family calendar.

## Competitors
Rocket Money: finds card charges, US-centric, privacy cost.
Bobby/Chronicle: private, iOS, no household, no contracts.
TrackMySubs: web lists, subscription-only, caps.
Cozi: calendar, no money model.
Splitwise: settlements, no upcoming terms.

Gap: one household board for money + legal + document dates with an explicit decision.

## Features
P0 board, add/edit/delete, notice windows, review queue, decisions, annualize, empty states, export/import, mobile nav.
P1 household members, cancel playbook, multi-currency display, demo seed.
P2 email digest, Postgres sync, PIN, ICS.
P3 optional regional bank import, invite links.

## Audit
Shipped: P0+P1 client app, tests, CI, schema, API contracts.
Blocked on credentials: live Postgres, SMTP, OAuth. Isolated behind DATABASE_URL / SMTP_*.
Known limit: single-device until DB.
