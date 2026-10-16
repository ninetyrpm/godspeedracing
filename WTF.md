# 24-hour Godspeed roster

The isolated `/wtf` endpoint is rendered by `api/wtf.js` (no shared assets or outgoing links). The existing War Room is unchanged.

For preview, deploy with no `GODSPEED_WTF_LAUNCH_AT` environment variable. The endpoint displays PREVIEW / TIMER NOT ARMED.

When ready to share, set `GODSPEED_WTF_LAUNCH_AT` in Vercel Production to a UTC ISO timestamp such as `2026-10-16T20:00:00Z` and redeploy. It serves the roster for 24 hours after that instant, then responds with HTTP 404 and a dead page. The server enforces the deadline; a browser-side countdown is visual only. No caching.

This does not erase GitHub history, deployments, screenshots, or prior copies. Invalid or missing timestamp stays in preview mode.
