"use client";

import { useLanguage } from "@/components/language-provider";
import { onboardingCopy } from "@/content/translations";
import { motion } from "framer-motion";
import { PanelsTopLeft, Share2 } from "lucide-react";

const iconMap = [PanelsTopLeft, Share2];

export function OnboardingFlows() {
  const { locale } = useLanguage();
  const copy = onboardingCopy[locale];

  return (
    <section
      id="onboarding"
      className="rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="md:max-w-sm">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {copy.title}
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            {copy.description}
          </p>
        </div>
        <div className="flex-1 space-y-6">
          {copy.flows.map((flow, index) => {
            const Icon = iconMap[index] ?? PanelsTopLeft;
            return (
              <motion.div
                key={flow.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800/50"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex rounded-full bg-emerald-500/20 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {flow.label}
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {flow.details.map((detail) => (
                        <li
                          key={detail}
                          className="rounded-lg border border-transparent bg-white/80 px-4 py-2 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/60 dark:bg-slate-900/60 dark:hover:border-emerald-500/40 dark:hover:bg-slate-900"
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
