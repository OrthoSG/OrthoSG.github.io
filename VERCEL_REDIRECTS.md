# Optional Vercel redirects

This repository does not currently use Vercel routing. Do not add this configuration while GitHub Pages remains the host.

If the canonical site is later served through Vercel, add these `permanent: true` redirects to `vercel.json` and validate them in a preview deployment before release:

```json
{
  "redirects": [
    { "source": "/part-b-osce.html", "destination": "/", "permanent": true },
    { "source": "/orthopaedic-xrays.html", "destination": "/", "permanent": true },
    { "source": "/sba.html", "destination": "/", "permanent": true },
    { "source": "/weak-areas.html", "destination": "/", "permanent": true }
  ]
}
```

This is documentation only; no Vercel configuration has been introduced.
