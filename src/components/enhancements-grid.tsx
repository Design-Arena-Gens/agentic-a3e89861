"use client";

import { useLanguage } from "@/components/language-provider";
import { enhancements } from "@/content/translations";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkle, Users } from "lucide-react";

const iconPalette = [Sparkle, Users, CheckCircle2];

export function EnhancementsGrid() {
  const { locale } = useLanguage();

  return (
    <section
      id="enhancements"
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {locale === "en"
              ? "High-impact enhancements to boost inclusion and efficiency."
              : "అంతర్నిబంధన, సామర్థ్యాన్ని పెంచే హై-ఇంపాక్ట్ మెరుగుదలలు."}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {locale === "en"
              ? "Every capability is production-ready and aligned with AP MSME policy outcomes."
              : "ప్రతి సామర్థ్యము ప్రొడక్షన్-రెడీ, AP MSME విధాన లక్ష్యాలకు అనుసంధానము చేయబడింది."}
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {enhancements.map((enhancement, index) => {
          const Icon = iconPalette[index % iconPalette.length];
          return (
            <motion.article
              key={enhancement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50/60 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-emerald-500/50 dark:hover:bg-slate-900"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex rounded-full bg-emerald-500/20 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-200">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {enhancement.title[locale]}
              </h3>
              <p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-300">
                {enhancement.description[locale]}
              </p>
              <div className="mt-4 rounded-xl border border-emerald-300/60 bg-white/70 px-4 py-3 text-xs font-semibold text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
                {enhancement.impact[locale]}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
