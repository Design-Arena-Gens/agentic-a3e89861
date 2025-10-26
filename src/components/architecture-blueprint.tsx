"use client";

import { useLanguage } from "@/components/language-provider";
import { architectureModules } from "@/content/translations";
import { motion } from "framer-motion";
import { BrainCircuit, Cloud, GitBranch, Shield } from "lucide-react";
import clsx from "clsx";

const layerColors = [
  "from-emerald-500/10 to-emerald-500/40",
  "from-blue-500/10 to-blue-500/40",
  "from-amber-500/10 to-amber-500/40",
  "from-purple-500/10 to-purple-500/40",
  "from-rose-500/10 to-rose-500/40",
];

const flowDetails: Record<
  "en" | "te",
  { title: string; stages: { label: string; description: string }[] }
> = {
  en: {
    title: "Secure cloud data plane",
    stages: [
      {
        label: "Edge Capture",
        description:
          "Offline-first mobile SDK encrypts voice, form, and document streams before syncing.",
      },
      {
        label: "Insight Fabric",
        description:
          "Feature store merges bureau data, GST feeds, and cluster benchmarks for ML workloads.",
      },
      {
        label: "Delivery Layer",
        description:
          "Composable NLG templates output DOCX/PDF while APIs push summaries into AP MSME ONE.",
      },
    ],
  },
  te: {
    title: "భద్రమైన క్లౌడ్ డేటా ప్లేన్",
    stages: [
      {
        label: "ఎడ్జ్ క్యాప్చర్",
        description:
          "ఆఫ్‌లైన్-ఫస్ట్ మొబైల్ SDK వాయిస్, ఫారమ్, డాక్యుమెంట్ స్ట్రీమ్‌లను సింక్‌కు ముందు ఎన్క్రిప్ట్ చేస్తుంది.",
      },
      {
        label: "ఇన్‌సైట్ ఫ్యాబ్రిక్",
        description:
          "ఫీచర్ స్టోర్ వేళ్ళు CRIF, GST డేటా, క్లస్టర్ బెంచ్‌మార్క్‌లను ML కోసం కలిపేస్తుంది.",
      },
      {
        label: "డెలివరీ లేయర్",
        description:
          "కంపోజబుల్ NLG టెంప్లేట్‌లు DOCX/PDFని ఉత్పత్తి చేసి అప్లికేషన్ సమ్మరీలను AP MSME ONE కి పంపుతాయి.",
      },
    ],
  },
};

export function ArchitectureBlueprint() {
  const { locale } = useLanguage();

  return (
    <section id="architecture" className="space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            {locale === "en"
              ? "End-to-end architecture across experience, intelligence, and trust."
              : "అనుభవం, తెలివి, విశ్వాసం అంతటా సంపూర్ణ నిర్మాణం."}
          </h2>
          <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            {locale === "en"
              ? "Each module is API-first, zero-trust ready, and co-designed with AP Industries Department for quick integration with MSME ONE."
              : "ప్రతి మాడ్యూల్ API-ఫస్ట్, జీరో-ట్రస్ట్ సిద్ధం, AP పరిశ్రమల శాఖతో సహ-నిర్మాణం అయి MSME ONE తో సులభంగా కలుస్తుంది."}
          </p>
        </div>
        <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <Shield className="h-4 w-4" />
          {locale === "en"
            ? "DPDP & AP Digital Policy compliant"
            : "DPDP & AP డిజిటల్ పాలసీ అనుగుణం"}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {architectureModules.map((module, index) => (
          <motion.article
            key={module.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={clsx(
              "relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900",
              "before:absolute before:-left-40 before:-top-40 before:h-64 before:w-64 before:rounded-full before:bg-gradient-to-br before:opacity-40 before:blur-3xl",
              layerColors[index % layerColors.length],
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {module.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {module.subtitle[locale]}
                </p>
              </div>
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm dark:bg-slate-800/80 dark:text-slate-300">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {module.bullets[locale].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 leading-relaxed shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-emerald-500/60 dark:hover:bg-slate-900/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="grid gap-4 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-sm dark:border-slate-700"
      >
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-emerald-300">
          <BrainCircuit className="h-4 w-4" />
          {locale === "en"
            ? "Cognitive data plane"
            : "కాగ్నిటివ్ డేటా ప్లేన్"}
        </div>
        <h3 className="text-2xl font-semibold">
          {locale === "en"
            ? "Responsible AI fabric governed by transparent data contracts."
            : "పట్టుకట్టిన డేటా ఒప్పందాలతో నడిపే బాధ్యతాయుత AI నిర్మాణం."}
        </h3>
        <p className="text-sm text-slate-200">
          {locale === "en"
            ? "End-to-end observability, consent tracking, and auditor dashboards ensure policy-grade assurance across every DPR the platform generates."
            : "ఎండ్-టు-ఎండ్ అబ్జర్వబిలిటీ, అనుమతి ట్రాకింగ్, ఆడిటర్ డ్యాష్‌బోర్డులు ప్రతి DPR కి విధాన స్థాయి నమ్మకాన్ని అందిస్తాయి."}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {flowDetails[locale].stages.map((stage) => (
            <div
              key={stage.label}
              className="rounded-2xl bg-white/10 p-4 text-sm shadow-sm"
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-200">
                {stage.label}
              </div>
              <p className="mt-2 text-sm text-slate-100">{stage.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-200">
          <Cloud className="h-4 w-4" />
          {locale === "en"
            ? "Hosted on MeitY empanelled sovereign cloud • ISO 27001 • SOC 2"
            : "MeitY అనుమతించిన క్లౌడ్ • ISO 27001 • SOC 2"}
          <GitBranch className="h-4 w-4" />
          {locale === "en"
            ? "CI/CD gates enforce vulnerability scans and audit logging"
            : "CI/CD గేట్లు నలుపుల స్కాన్‌లు, ఆడిట్ లాగింగ్‌ను నిర్ధారిస్తాయి"}
        </div>
      </motion.div>
    </section>
  );
}
