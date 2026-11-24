[![make.fun](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![rank](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/Hasanrdp/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/rank.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![reward](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/Hasanrdp/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/reward.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)

# Second-Wave Scalp-and-Runner — Pump.fun Replay Sprint Paper Bot

A deterministic paper trading bot for the [Pump.fun Replay Sprint — Paper Bot, Real Ranking](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122) bounty on make.fun. It trades 10 SOL of paper money on a replay of 24 hours of pump.fun bonding-curve activity, scored by net PnL. Nothing is traded for real.

## How it trades

The dev window's own tape says most fresh coins dump (the median coin is down ~30% six hundred slots after it first prints 1.5x), but the mean forward return is strongly positive because a few runners go 5–15x — and the 35 coins that graduate do it within a few slots of creation, before any bot can buy. So this bot:

- **Waits 150 slots after creation.** Younger coins are mostly bundle dumps (entering at 30 slots scores −0.25 SOL on the dev window).
- **Buys only real crowd demand:** at least 15 distinct buyers and a +50% rise inside a 10-slot window, price near its window high, with net inflow — one wallet pumping alone does not qualify.
- **Buys small and early on the second wave**, building each position in 0.15 SOL slices (one reply may spend at most 1% of a curve's real SOL reserve), up to 0.6 SOL per coin, at most 5 positions open.
- **Cuts every loser at −8%** and **takes profit at +50%**, with a trailing stop behind any runner that arms at +25%.
- **Keeps a guardrail probe** that opens tiny 0.02 SOL round trips when fills or coins lag the pace the minimum bar needs (20 coins with ≥0.01 SOL round trips).

Everything is deterministic: no clock, no randomness, no network — the only seed is the one the harness hands over in `hello`.

## Files

- `main.ts` — entrypoint: hands the strategy to the kit's wire shim.
- `strategy.ts` — the whole strategy, parameters included.
- `vendor/makefun-bot.ts` — the kit's `sdk/ts/makefun-bot.ts`, vendored byte for byte.

## Local grade (dev window)

Run from the unpacked kit:

```sh
node cli/makefun.mjs grade-local --kit . --bot <this repository> --driver process --worktree
```

Dev-window result with the shipped parameters (local simulator on all three dataset parts, confirmed against `grade-local`):

- **Net PnL +0.14 SOL** on 10 SOL capital (265 fills, 44 coins, 131 round trips, 10 wins)
- **Max drawdown 1.6%** (guardrail: ≤50%)
- **At 2x fees: +0.01 SOL** — the edge survives doubled fees
- 0 rejected orders

Honest caveat: the dev gain rides on one coin (+0.28 SOL); without it the run is about −0.14 SOL, and the final window is a fresh 24 hours. This is a disciplined lottery ticket, not a guaranteed profit.

## License

MIT — see [LICENSE](LICENSE).
