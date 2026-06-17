# Godspeed War Room

A dependency-free static website for planning team bike races. It is designed to deploy cleanly to Vercel from GitHub without Next.js, React, or npm dependency resolution issues.

## Deploy to Vercel

1. Upload these files to the root of your GitHub repo.
2. In Vercel project settings:
   - Framework Preset: Other
   - Root Directory: blank/default
   - Install Command: `npm ci` or blank
   - Build Command: `npm run build` or blank
   - Output Directory: blank/default
3. Redeploy without build cache.

## Local use

Open `index.html` in a browser. Data is saved to browser localStorage.

## Features

- Rider metrics and tactical traits
- Course demand scoring
- Role recommendations
- Phase-based race plan
- Rules of engagement
- Scenario prompts
- JSON export/import
- Print-friendly race plan
