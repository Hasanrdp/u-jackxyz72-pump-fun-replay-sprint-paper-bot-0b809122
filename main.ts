// Second-Wave Scalp-and-Runner: a paper trading bot for the pump.fun replay sprint.
//
// The grader runs `node /bot/main.ts`; the strategy lives in strategy.ts and the wire
// shim is the kit's sdk/ts/makefun-bot.ts, vendored byte for byte under vendor/.

import { runBot } from './vendor/makefun-bot.ts';
import { createStrategy, DEFAULT_PARAMS } from './strategy.ts';

await runBot(createStrategy(DEFAULT_PARAMS));
