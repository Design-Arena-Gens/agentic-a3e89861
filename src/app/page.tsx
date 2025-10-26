"use client";

import type { ComponentType, SVGProps } from "react";
import {
  ArchitectureBlueprint,
  EnhancementsGrid,
  Hero,
  OnboardingFlows,
  PolicyAssurance,
  VisualizationSuite,
} from "@/components";
import { LanguageProvider, useLanguage } from "@/components/language-provider";
import { Server, Layers3, Database } from "lucide-react";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-12">
        <Hero />
        <OnboardingFlows />
        <ArchitectureBlueprint />
        <KnowledgeFabric />
        <VisualizationSuite />
        <EnhancementsGrid />
        <PolicyAssurance />
      </div>
    </LanguageProvider>
  );
}

function KnowledgeFabric() {
  const { locale } = useLanguage();

  const cards: KnowledgeCardProps[] = [
    {
      icon: Database,
      title: "Andhra Pradesh MSME data foundation",
      description:
        "Unified data lake consumes the DPR preparation datasets, cluster dossiers, and export console intelligence from the official knowledge base.",
      teluguTitle: "ఆంధ్రప్రదేశ్ MSME డేటా ఫౌండేషన్",
      teluguDescription:
        "అధికారిక నాలెడ్జ్ బేస్ లోని DPR సిద్ధం డేటా సెట్‌లు, క్లస్టర్ వివరాలు, ఎగుమతి కన్‌సోల్ సమాచారం సమీకరించే యూనిఫైడ్ డేటా లేక్.",
    },
    {
      icon: Server,
      title: "Responsible AI lifecycle",
      description:
        "Feature pipelines support bias audits, synthetic data generation, and continuous evaluation against sanctioned DPRs for every district.",
      teluguTitle: "బాధ్యతాయుత AI జీవచక్రం",
      teluguDescription:
        "ప్రతి జిల్లాలో ఆమోదిత DPRలతో పోల్చి బయాస్ ఆడిట్లు, సింథటిక్ డేటా సృష్టి, నిరంతర మదింపు చేసే ఫీచర్ పైప్‌లైన్లు.",
    },
    {
      icon: Layers3,
      title: "Composable DPR templates",
      description:
        "Sector-specific templates snap into the NLG engine to output bilingual executive summaries, cash-flow statements, and compliance annexures.",
      teluguTitle: "కంపోజబుల్ DPR టెంప్లేట్లు",
      teluguDescription:
        "రంగం స్పెసిఫిక్ టెంప్లేట్‌లు NLG ఇంజిన్‌తో కలసి ద్విభాషా సమ్మరీలు, క్యాష్ ఫ్లో స్టేట్‌మెంట్లు, соответствие అనెక్సర్స్ అందిస్తాయి.",
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <KnowledgeCard key={card.title} locale={locale} {...card} />
        ))}
      </div>
    </section>
  );
}

type KnowledgeCardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  teluguTitle: string;
  teluguDescription: string;
  locale?: "en" | "te";
};

function KnowledgeCard({
  icon: Icon,
  title,
  description,
  teluguTitle,
  teluguDescription,
  locale = "en",
}: KnowledgeCardProps) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800/50">
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
        <Icon className="h-4 w-4" />
        AP MSME Data
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {locale === "en" ? title : teluguTitle}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {locale === "en" ? description : teluguDescription}
      </p>
      <div className="mt-auto rounded-xl border border-emerald-200 bg-white/80 px-4 py-3 text-xs text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
        {locale === "en" ? teluguTitle : title}
      </div>
    </div>
  );
}
