"use client";

import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { heroCopy } from "@/content/translations";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const { locale } = useLanguage();
  const copy = heroCopy[locale];

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-8 py-14 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-emerald-950">
      <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
        <div className="md:max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm dark:border-emerald-800/70 dark:bg-emerald-900/30 dark:text-emerald-200">
            <Sparkles className="h-4 w-4" />
            <span>AP MSME ONE • DPR 2.0</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            {copy.headline}
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            {copy.subline}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#visual-intelligence"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              {copy.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="#architecture"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
            >
              {copy.ctaSecondary}
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative w-full max-w-sm shrink-0 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              AP MSME Insight Pulse
            </p>
            <LanguageSwitcher />
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            {locale === "en"
              ? "Daily intelligence on clusters, schemes, and credit gaps ensures DPRs stay policy-aligned."
              : "క్లస్టర్లు, పథకాలు, క్రెడిట్ లోటుపై రోజువారీ ఇన్‌సైట్స్ DPR లను విధాన సరళిలో ఉంచుతాయి."}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm font-medium text-slate-700 dark:text-slate-200">
            <div className="rounded-xl bg-emerald-100/80 p-4 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
              <dt className="text-xs uppercase text-emerald-600 dark:text-emerald-300">
                {locale === "en"
                  ? "Scheme eligibility coverage"
                  : "పథక అర్హత కవరేజ్"}
              </dt>
              <dd className="text-2xl font-bold">96%</dd>
            </div>
            <div className="rounded-xl bg-slate-100/80 p-4 dark:bg-slate-800/60">
              <dt className="text-xs uppercase text-slate-500 dark:text-slate-400">
                {locale === "en"
                  ? "Average approval uplift"
                  : "సగటు ఆమోదం పెరుగుదల"}
              </dt>
              <dd className="text-2xl font-bold text-slate-900 dark:text-white">
                2.8×
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
