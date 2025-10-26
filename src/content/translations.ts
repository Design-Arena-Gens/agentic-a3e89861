import type { Locale } from "@/components/language-provider";

type ArchitectureModule = {
  id: string;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  bullets: Record<Locale, string[]>;
};

type Enhancement = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  impact: Record<Locale, string>;
};

export const locales: Locale[] = ["en", "te"];

export const heroCopy: Record<
  Locale,
  { headline: string; subline: string; ctaPrimary: string; ctaSecondary: string }
> = {
  en: {
    headline:
      "AI-powered DPR preparation for Andhra Pradesh MSMEs with policy-grade rigor.",
    subline:
      "Create investor-grade business plans, match live schemes, and generate bilingual reports that impress bankers, investors, and subsidy committees.",
    ctaPrimary: "Launch DPR Designer",
    ctaSecondary: "View Architecture",
  },
  te: {
    headline:
      "రాష్ట్ర విధాన ప్రమాణాలతో ఆంధ్రప్రదేశ్ MSME ల కోసం AI ఆధారిత DPR సిద్ధం.",
    subline:
      "బ్యాంకులు, ఇన్వెస్టర్లు, సబ్సిడీ కమిటీలను మెప్పించేలా ద్విభాషా నివేదికలు, ప్రత్యక్ష పథకాలు, పెట్టుబడి-సిద్ధ ప్రణాళికలు రూపొందించండి.",
    ctaPrimary: "DPR డిజైనర్ ప్రారంభించండి",
    ctaSecondary: "వ్యవస్థ నిర్మాణం చూడండి",
  },
};

export const onboardingCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    flows: {
      label: string;
      details: string[];
    }[];
  }
> = {
  en: {
    title: "Conversational onboarding that meets entrepreneurs where they are.",
    description:
      "Voice-first and text co-pilot guides first-time founders through sector discovery, data capture, and financial hygiene with adaptive prompts in English and Telugu.",
    flows: [
      {
        label: "Voice + Text Journey",
        details: [
          "Smart IVR greets entrepreneurs in Telugu or English and captures intent via ASR.",
          "Progressive disclosure forms gather business, financial, and collateral metrics.",
          "Dynamic hints and glossary tooltips clarify banking terminology for low-literacy users.",
        ],
      },
      {
        label: "Mentor Assisted Mode",
        details: [
          "Shared whiteboard lets SIDBI mentors or DIC officials co-create inputs in real time.",
          "Secure chat memory stores verified facts for reuse across future DPR iterations.",
          "Proactive nudges surface missing documents before scheduling a banker review.",
        ],
      },
    ],
  },
  te: {
    title: "వ్యవసాయదారుల అవసరాలకు తగ్గట్టుగా సంభాషణ ఆధారిత ఆన్‌బోర్డింగ్.",
    description:
      "ఆంగ్లం లేదా తెలుగు లో అడాప్టివ్ ప్రశ్నలతో వాయిస్/టెక్స్ట్ కో-పైలట్, రంగం ఎంపిక నుండి ఆర్థిక సమాచారం వరకు సులభంగా సూచిస్తుంది.",
    flows: [
      {
        label: "వాయిస్ + టెక్స్ట్ ప్రయాణం",
        details: [
          "తెలుగు లేదా ఆంగ్లంలో IVR స్వాగతం చెప్పి ASR ద్వారా అవసరాలను తెలుసుకుంటుంది.",
          "ప్రమోక్ష ప్రశ్నల ద్వారా వ్యాపారం, ఆర్థిక, తాకట్టు వివరాలు సేకరిస్తుంది.",
          "సులభ గ్లోసరీలు, హింట్లు బ్యాంకింగ్ పదజాలాన్ని అర్థమయ్యేలా చేయడం.",
        ],
      },
      {
        label: "మెంటర్ సహాయ మోడ్",
        details: [
          "SIDBI మెంటర్లు లేదా DIC అధికారులు కలసి రియల్ టైమ్ లో డేటా నమోదు చేయగలిగే షేర్డ్ వైట్‌బోర్డ్.",
          "భద్రమైన చాట్ మెమరీ ధృవీకరించిన సమాచారాన్ని భవిష్యత్ DPRలకు నిల్వ చేస్తుంది.",
          "బ్యాంకర్ సమీక్షకు ముందు లోపాలైన డాక్యుమెంట్లను గుర్తు చేసే చురుకైన సూచనలు.",
        ],
      },
    ],
  },
};

export const architectureModules: ArchitectureModule[] = [
  {
    id: "conversational",
    title: {
      en: "Conversational Onboarding & Knowledge Graph",
      te: "సంభాషణ ఆన్‌బోర్డింగ్ & నాలెడ్జ్ గ్రాఫ్",
    },
    subtitle: {
      en: "ASR + NLU stack orchestrated for bilingual rural users.",
      te: "రెండు భాషల గ్రామీణ వినియోగదారులకు అనుకూలమైన ASR + NLU స్టాక్.",
    },
    bullets: {
      en: [
        "Fine-tuned Indic ASR with auto language detection and noise suppression.",
        "Vector knowledge graph linking MSME ONE content, district profiles, and scheme FAQs.",
        "Sentiment-aware agent routes complex cases to human mentors with context snapshot.",
      ],
      te: [
        "నాయిస్ సప్రెషన్‌తో కూడిన ఇండిక్ ASR ఆటో భాష గుర్తింపుతో.",
        "MSME ONE కంటెంట్, జిల్లా ప్రొఫైల్‌లు, పథక FAQs ను కలిపే వెక్టర్ నాలెడ్జ్ గ్రాఫ్.",
        "సెంటిమెంట్ గుర్తింపు ద్వారా క్లిష్టమైన కేసులు మెంటర్లకు సంబంధిత కాంటెక్స్ట్‌తో పంపడం.",
      ],
    },
  },
  {
    id: "financial",
    title: {
      en: "Intelligent Financial Engine",
      te: "స్మార్ట్ ఫైనాన్షియల్ ఇంజిన్",
    },
    subtitle: {
      en: "Benchmarks tuned for 40+ MSME clusters in Andhra Pradesh.",
      te: "ఆంధ్రప్రదేశ్ లోని 40+ MSME క్లస్టర్లకు సరిపడే బెంచ్‌మార్క్‌లు.",
    },
    bullets: {
      en: [
        "Pre-built models for capex, working capital, DSCR, and break-even tailored by sector and district.",
        "Scenario generator blends RBI, SIDBI, and state incentives with applicant inputs.",
        "Automated ratio analysis flags bankability risks with bilingual remediation guidance.",
      ],
      te: [
        "రంగం, జిల్లా స్పెసిఫిక్‌గా Capex, వర్కింగ్ క్యాపిటల్, DSCR, బ్రేక్ ఈవెన్ ల కోసం రెడీ మోడల్స్.",
        "RBI, SIDBI, రాష్ట్ర ఇన్సెంటివ్స్‌ను యూజర్ డేటాతో కలిపే సెనారియో జనరేటర్.",
        "ఆటో రేషియో విశ్లేషణ ద్వారా బ్యాంకబిలిటీ రిస్క్ గుర్తించి ద్విభాషా పరిష్కార సూచనలు.",
      ],
    },
  },
  {
    id: "scheme",
    title: {
      en: "Real-time Scheme & Compliance Matcher",
      te: "రియల్ టైమ్ పథకం & соответствение మ్యాచ్ ఇంజిన్",
    },
    subtitle: {
      en: "Continuously synced with AP MSME ONE APIs and central portals.",
      te: "AP MSME ONE API లు మరియు కేంద్ర పోర్టల్స్ తో నిరంతరం సింక్ అవుతుంది.",
    },
    bullets: {
      en: [
        "Graph queries map DPR attributes to subsidy, credit guarantee, and export incentives.",
        "Geo-tagged regulatory checklist ensures district-level approvals and DPDP compliance.",
        "Webhook listener ingests new circulars and retrains retrieval index nightly.",
      ],
      te: [
        "గ్రాఫ్ క్వెరీస్ DPR లక్షణాలను సబ్సిడీ, క్రెడిట్ గ్యారంటి, ఎగుమతి ప్రోత్సాహకాలతో మేప్ చేస్తాయి.",
        "జియో-ట్యాగ్ చెక్‌లిస్టు జిల్లా స్థాయి అనుమతులు మరియు DPDP సరళతను నిర్ధారిస్తుంది.",
        "వెబ్‌హుక్ లిసనర్ కొత్త సర్క్యులర్‌లను ఇంపోర్ట్ చేసి ప్రతిరోజు రిట్రీవల్ ఇండెక్స్‌ను అప్‌డేట్ చేస్తుంది.",
      ],
    },
  },
  {
    id: "nlg",
    title: {
      en: "Narrative Generation & Design Studio",
      te: "నారేటివ్ జనరేషన్ & డిజైన్ స్టూడియో",
    },
    subtitle: {
      en: "Policy-grade storytelling with data-backed visuals.",
      te: "డేటా ఆధారిత గ్రాఫిక్స్ తో విధాన ప్రమాణ స్థాయి కథనాలు.",
    },
    bullets: {
      en: [
        "Retrieval-augmented NLG crafts sector primers, promoter profiles, and market analysis.",
        "Layout engine exports bank-ready DOCX, PDF, and bilingual executive summaries.",
        "Auto-branding aligns color palettes with AP MSME guidelines and partner banks.",
      ],
      te: [
        "రెట్రీవల్ ఆధారిత NLG రంగం పరిచయాలు, ప్రమోటర్ ప్రొఫైల్స్, మార్కెట్ విశ్లేషణ రూపొందిస్తుంది.",
        "లేఅవుట్ ఇంజిన్ బ్యాంకులకు సిద్ధమైన DOCX, PDF మరియు ద్విభాషా సమ్మరీలను ఎగుమతి చేస్తుంది.",
        "ఆటో-బ్రాండింగ్ AP MSME మార్గదర్శకాలు మరియు భాగస్వామ్య బ్యాంకుల రంగులతో సరిపోలుతుంది.",
      ],
    },
  },
  {
    id: "deployment",
    title: {
      en: "Secure Cloud-native Deployment",
      te: "భద్రమైన క్లౌడ్-నేటివ్ అమలు",
    },
    subtitle: {
      en: "Government-grade security with inclusive access.",
      te: "ప్రభుత్వ స్థాయి భద్రతతో సహా అందుబాటు.",
    },
    bullets: {
      en: [
        "Deployed on MeitY empanelled cloud with zero-trust network segmentation.",
        "Field officer mobile app works offline-first with encrypted edge storage.",
        "Fine-grained consent ledger aligns with India DPDP Act obligations.",
      ],
      te: [
        "MeitY గుర్తింపు పొందిన క్లౌడ్ పై జీరో-ట్రస్ట్ నెట్వర్క్ విభజనతో అమలు.",
        "ఫీల్డ్ అధికారుల మొబైల్ యాప్ ఆఫ్‌లైన్-ఫస్ట్ విధానం, ఎన్క్రిప్ట్ చేసిన ఎడ్జ్ స్టోరేజ్‌తో.",
        "ఇండియా DPDP చట్టానికి అనుగుణంగా సూక్ష్మ అనుమతి లెడ్జర్.",
      ],
    },
  },
];

export const enhancements: Enhancement[] = [
  {
    id: "voice-dpr",
    title: {
      en: "Voice-to-DPR Studio",
      te: "వాయిస్-టు-DPR స్టూడియో",
    },
    description: {
      en: "Telugu ASR, neural translation, and adaptive summarization convert raw narratives into structured DPR sections instantly.",
      te: "తెలుగు ASR, న్యూరల్ అనువాదం, అడాప్టివ్ సమ్మరీకరణ ద్వారా స్వయంగా నిర్మిత DPR విభాగాలుగా మారుస్తుంది.",
    },
    impact: {
      en: "Cuts consultant dependency by 60% for rural founders with limited literacy.",
      te: "సాక్షరత తక్కువగా ఉన్న గ్రామీణ వ్యవస్థాపకుల కోసం కన్సల్టెంట్ మీద ఆధారాన్ని 60% తగ్గిస్తుంది.",
    },
  },
  {
    id: "offline-app",
    title: {
      en: "Offline-first Mobile Companion",
      te: "ఆఫ్‌లైన్-ఫస్ట్ మొబైల్ సహాయకుడు",
    },
    description: {
      en: "Progressive web app syncs inputs, financial models, and documents once connectivity is restored.",
      te: "కనెక్టివిటీ వస్తే వెంటనే ఇన్‌పుట్లు, ఫైనాన్షియల్ మోడల్స్, డాక్యుమెంట్లు సమకాలీకరించే ప్రోగ్రెసివ్ వెబ్ యాప్.",
    },
    impact: {
      en: "Handles rural low-bandwidth clusters and field surveys without data loss.",
      te: "గ్రామీణ తక్కువ బ్యాండ్విడ్త్ ప్రాంతాలు, ఫీల్డ్ సర్వేలను డేటా నష్టం లేకుండా నిర్వహిస్తుంది.",
    },
  },
  {
    id: "bankability-score",
    title: {
      en: "AI Bankability Score",
      te: "AI బ్యాంకబిలిటీ స్కోర్",
    },
    description: {
      en: "Gradient boosted model trained on sanctioned DPRs predicts approval probability and highlights improvement levers.",
      te: "ఆమోదిత DPR డేటాపై ట్రైన్ చేసిన గ్రాడియెంట్ బూస్టెడ్ మోడల్ ఆమోద అవకాశాన్ని అంచనా వేసి మెరుగుదల పాయింట్లను చూపిస్తుంది.",
    },
    impact: {
      en: "Speeds up credit committee decisions and equips founders with actionable guidance.",
      te: "క్రెడిట్ కమిటీ నిర్ణయాలను వేగవంతం చేసి వ్యవస్థాపకులకు అమలు చేయగల సూచనలను అందిస్తుంది.",
    },
  },
  {
    id: "collab-mode",
    title: {
      en: "Collaborative Review Workspace",
      te: "సహకార సమీక్ష వర్క్‌స్పేస్",
    },
    description: {
      en: "Role-based dashboards for mentors, bankers, and policy officials to annotate sections and track compliance tasks.",
      te: "మెంటర్లు, బ్యాంకర్లు, అధికారులకు పాత్ర ఆధారిత డ్యాష్‌బోర్డ్‌లు, సెక్షన్ అనోటేషన్, соответствие ట్రాకింగ్.",
    },
    impact: {
      en: "Bridges trust gaps and reduces DPR approval cycles from weeks to days.",
      te: "నమ్మక లోటును భర్తీ చేసి DPR ఆమోద చక్రాలను వారాల నుండి రోజులకు తగ్గిస్తుంది.",
    },
  },
  {
    id: "funding-advisor",
    title: {
      en: "Predictive Funding Advisor",
      te: "ప్రిడిక్టివ్ ఫండింగ్ సలహాదారు",
    },
    description: {
      en: "Recommender maps DPR health to loan, equity, and grant stacks offered by state, SIDBI, NABARD, and DFIs.",
      te: "రాష్ట్ర, SIDBI, NABARD, DFI ల నుంచి లభించే లోన్, ఈక్విటీ, గ్రాంట్ ఎంపికలను DPR నాణ్యతకు తగినట్లు మ్యాచ్ చేసే రికమెండర్.",
    },
    impact: {
      en: "Maximises blended finance opportunities and reduces rejections due to wrong product fit.",
      te: "మిశ్రిత ఫైనాన్స్ అవకాశాలను పెంచి, తప్పు ఉత్పత్తి ఎంపిక వల్ల వచ్చే రిజెక్షన్‌ను తగ్గిస్తుంది.",
    },
  },
  {
    id: "policy-analytics",
    title: {
      en: "Policy Analytics Hub",
      te: "పాలసీ అనలిటిక్స్ హబ్",
    },
    description: {
      en: "Aggregated dashboards uncover sector gaps, gender inclusion metrics, and subsidy utilization insights for the Industries Department.",
      te: "రంగాల లోటులు, మహిళా భాగస్వామ్యం, సబ్సిడీ వినియోగంపై సమీకృత డ్యాష్‌బోర్డులు పరిశ్రమల శాఖకు అందిస్తాయి.",
    },
    impact: {
      en: "Enables data-driven scheme redesign and targeted outreach programmes.",
      te: "డేటా ఆధారిత పథక పునర్నిర్మాణం, లక్ష్యిత అవగాహన కార్యక్రమాలను సాధ్యపరుస్తుంది.",
    },
  },
];
