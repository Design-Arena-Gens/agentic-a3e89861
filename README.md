# AP MSME AI DPR Studio

AI-powered Detailed Project Report (DPR) design studio for Andhra Pradesh MSME entrepreneurs. The solution integrates with the AP MSME ONE portal, enabling bilingual onboarding, policy-grade financial intelligence, advanced visual analytics, and compliance-ready exports for bankers, investors, and subsidy committees.

## 🚀 Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS for theming
- Chart.js + html-to-image + jsPDF for exportable visuals
- D3 Geo rendering over AP state GeoJSON
- Framer Motion for motion micro-interactions

## ✨ Key Capabilities

- Conversational onboarding (voice + text) blueprint supporting Telugu and English.
- Intelligent financial engine with scenario planning, cluster benchmarks, and ratio diagnostics.
- Real-time scheme matcher aligned with AP MSME ONE APIs and compliance guardrails.
- Policy-grade NLG studio producing bilingual narratives and exportable DPR artefacts (SVG/PNG/PDF).
- Geospatial supply-chain explorer with interactive sensitivity heatmaps and bankability insights.
- Inclusive enhancements: voice-to-DPR, offline-first mobile companion, AI bankability score, collaborative review, predictive funding advisor, policy analytics hub.

## 🧪 Local Development

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Quality Gates

- `npm run lint` – ESLint (Next.js + Tailwind rules)
- `npm run build` – Type check + production bundle validation

## 📦 Production Build

```bash
npm run build
npm run start
```

The build emits static assets optimised for deployment on Vercel. Use the provided production command to serve locally.

## 🔐 Compliance Notes

- Aligns with India DPDP Act guidelines (consent ledger, data minimisation, retention limits).
- Designed for AP Digital Governance Policy and MeitY-empanelled cloud hosting.
- Supports audit trails for SIDBI, NABARD, and state subsidy committees.

## 🗺️ Data & Training Inputs

Use the datasets from the AP MSME ONE knowledge base (Drive link shared in brief) to populate the financial benchmarks, scheme catalogue, mentor FAQs, and export console intelligence referenced in the UI.

## 📄 License

MIT
