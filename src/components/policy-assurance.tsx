"use client";

import { useLanguage } from "@/components/language-provider";
import { ShieldCheck, FileText, ServerCog } from "lucide-react";

export function PolicyAssurance() {
  const { locale } = useLanguage();

  const checklist = [
    {
      icon: ShieldCheck,
      en: "DPDP Act alignment with consent ledger, purpose limitation, and retention controls.",
      te: "అనుమతి లెడ్జర్, ప్రయోజన పరిమితి, నిల్వ నియంత్రణలతో DPDP చట్ట అనుసరణ.",
    },
    {
      icon: FileText,
      en: "Audit-ready trails for SIDBI, NABARD, and state subsidy committees.",
      te: "SIDBI, NABARD, రాష్ట్ర సబ్సిడీ కమిటీలకు ఆడిట్ సిద్ధ లాగులు.",
    },
    {
      icon: ServerCog,
      en: "Cloud-native microservices with API gateways hardened for MSME ONE integration.",
      te: "MSME ONE ఇంటిగ్రేషన్ కోసం గట్టిపడిన API గేట్వేలతో క్లౌడ్-నేటివ్ మైక్రోసర్వీసులు.",
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 p-8 text-white shadow-sm dark:border-emerald-500/40">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">
            {locale === "en"
              ? "Compliance engineered from the ground up."
              : "ప్రారంభం నుండే నిర్మిత соответствие."}
          </h2>
          <p className="mt-3 text-sm text-emerald-50/90">
            {locale === "en"
              ? "Data minimisation, encryption in transit and at rest, and automated DPIA workflows keep the platform bank-ready."
              : "డేటా మినిమైజేషన్, ప్రయాణంలో/సంరక్షణలో గుప్తీకరణ, ఆటోమేటెడ్ DPIA వర్క్‌ఫ్లోలు ప్లాట్‌ఫారమ్‌ను బ్యాంక్ సిద్ధంగా ఉంచుతాయి."}
          </p>
        </div>
        <ul className="space-y-4 text-sm text-emerald-50/90">
          {checklist.map((item) => (
            <li
              key={item.en}
              className="flex items-start gap-3 rounded-2xl bg-white/10 p-4"
            >
              <item.icon className="mt-1 h-5 w-5 text-white" />
              <span>{locale === "en" ? item.en : item.te}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-xs uppercase tracking-widest text-emerald-100/80">
        <span>ISO 27001</span>
        <span>OWASP ASVS</span>
        <span>MeitY Cloud • Tier-3 DCs</span>
        <span>Role-Based Access Control</span>
      </div>
    </section>
  );
}
