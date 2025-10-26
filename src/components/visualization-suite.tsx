"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";
import { toPng, toSvg } from "html-to-image";
import jsPDF from "jspdf";
import { useLanguage } from "@/components/language-provider";
import clsx from "clsx";
import {
  Download,
  Factory,
  Map as MapIcon,
  Pipette,
  RefreshCw,
} from "lucide-react";
import { geoMercator, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Polygon, MultiPolygon } from "geojson";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
);

type ScenarioKey = "baseline" | "expansion" | "subsidy";

const scenarioLabels: Record<ScenarioKey, Record<"en" | "te", string>> = {
  baseline: {
    en: "Baseline",
    te: "ప్రారంభ స్థితి",
  },
  expansion: {
    en: "Capacity Expansion",
    te: "సామర్థ్య విస్తరణ",
  },
  subsidy: {
    en: "Capital Subsidy",
    te: "క్యాపిటల్ సబ్సిడీ",
  },
};

const cashflowScenarios: Record<
  ScenarioKey,
  { label: string; inflow: number; outflow: number }[]
> = {
  baseline: [
    { label: "Q1", inflow: 42, outflow: 28 },
    { label: "Q2", inflow: 46, outflow: 32 },
    { label: "Q3", inflow: 51, outflow: 35 },
    { label: "Q4", inflow: 55, outflow: 38 },
  ],
  expansion: [
    { label: "Q1", inflow: 48, outflow: 34 },
    { label: "Q2", inflow: 58, outflow: 38 },
    { label: "Q3", inflow: 68, outflow: 42 },
    { label: "Q4", inflow: 80, outflow: 46 },
  ],
  subsidy: [
    { label: "Q1", inflow: 45, outflow: 28 },
    { label: "Q2", inflow: 50, outflow: 30 },
    { label: "Q3", inflow: 60, outflow: 33 },
    { label: "Q4", inflow: 70, outflow: 36 },
  ],
};

const costBreakdown = {
  capex: 42,
  workingCapital: 28,
  rAndD: 8,
  marketing: 12,
  compliance: 6,
  contingency: 4,
};

const heatmapMatrix = [
  { variable: "Interest Rate", low: 0.92, medium: 0.84, high: 0.68 },
  { variable: "Raw Material", low: 1.06, medium: 0.94, high: 0.72 },
  { variable: "Demand Index", low: 0.78, medium: 0.9, high: 1.08 },
  { variable: "Exchange Rate", low: 0.96, medium: 0.82, high: 0.7 },
];

type HeatmapBand = "low" | "medium" | "high";

const bandLabels: Record<HeatmapBand, Record<"en" | "te", string>> = {
  low: { en: "Low", te: "తక్కువ" },
  medium: { en: "Moderate", te: "మధ్యస్థ" },
  high: { en: "High", te: "అధిక" },
};

type SupplyNode = {
  name: string;
  coordinates: [number, number];
  type: "input" | "market" | "cluster";
};

const supplyChainNodes: SupplyNode[] = [
  {
    name: "Visakhapatnam Port",
    coordinates: [83.31, 17.72],
    type: "market",
  },
  {
    name: "Vijayawada Auto Cluster",
    coordinates: [80.64, 16.51],
    type: "cluster",
  },
  {
    name: "Anantapur Groundnut Processing",
    coordinates: [77.6, 14.68],
    type: "input",
  },
  {
    name: "Tirupati Electronics SEZ",
    coordinates: [79.42, 13.63],
    type: "market",
  },
];

const nodeColor: Record<SupplyNode["type"], string> = {
  input: "#f97316",
  market: "#0ea5e9",
  cluster: "#22c55e",
};

async function exportVisual(id: string, format: "png" | "svg" | "pdf") {
  const node = document.getElementById(id);
  if (!node) return;

  if (format === "png") {
    const dataUrl = await toPng(node, {
      backgroundColor: "#ffffff",
    });
    const link = document.createElement("a");
    link.download = `${id}.png`;
    link.href = dataUrl;
    link.click();
  } else if (format === "svg") {
    const dataUrl = await toSvg(node);
    const blob = new Blob([dataUrl], { type: "image/svg+xml;charset=utf-8" });
    const link = document.createElement("a");
    link.download = `${id}.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  } else {
    const canvasUrl = await toPng(node, { backgroundColor: "#ffffff" });
    const pdf = new jsPDF("landscape", "pt", "a4");
    const imgProps = pdf.getImageProperties(canvasUrl);
    const ratio = Math.min(
      (pdf.internal.pageSize.getWidth() - 80) / imgProps.width,
      (pdf.internal.pageSize.getHeight() - 80) / imgProps.height,
    );
    pdf.addImage(
      canvasUrl,
      "PNG",
      40,
      40,
      imgProps.width * ratio,
      imgProps.height * ratio,
    );
    pdf.save(`${id}.pdf`);
  }
}

type MapFeature = Feature<Polygon | MultiPolygon>;

export function VisualizationSuite() {
  const { locale } = useLanguage();
  const [scenario, setScenario] = useState<ScenarioKey>("baseline");
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [hoverNode, setHoverNode] = useState<SupplyNode | null>(null);

  useEffect(() => {
    fetch("/data/andhra_pradesh.geojson")
      .then((response) => response.json())
      .then((data) => setGeojson(data as FeatureCollection))
      .catch(() => setGeojson(null));
  }, []);

  const chartData = useMemo(() => {
    const data = cashflowScenarios[scenario];
    return {
      labels: data.map((item) => item.label),
      datasets: [
        {
          label: locale === "en" ? "Inflow (₹ Lakhs)" : "ఇన్‌ఫ్లో (₹ లక్షలు)",
          data: data.map((item) => item.inflow),
          borderColor: "#22c55e",
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          tension: 0.4,
          fill: true,
        },
        {
          label: locale === "en" ? "Outflow (₹ Lakhs)" : "అవుట్‌ఫ్లో (₹ లక్షలు)",
          data: data.map((item) => item.outflow),
          borderColor: "#0ea5e9",
          backgroundColor: "rgba(14, 165, 233, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [locale, scenario]);

  const pieData = useMemo(
    () => ({
      labels:
        locale === "en"
          ? [
              "Capex",
              "Working Capital",
              "R&D",
              "Marketing",
              "Compliance",
              "Contingency",
            ]
          : [
              "క్యాపెక్స్",
              "వర్కింగ్ క్యాపిటల్",
              "ఆర్ & డి",
              "మార్కెటింగ్",
              "కంప్లయెన్స్",
              "ప్రత్యామ్నాయం",
            ],
      datasets: [
        {
          label: locale === "en" ? "₹ Lakhs" : "₹ లక్షలు",
          data: Object.values(costBreakdown),
          backgroundColor: [
            "#0ea5e9",
            "#22c55e",
            "#f97316",
            "#a855f7",
            "#facc15",
            "#6366f1",
          ],
          borderWidth: 0,
        },
      ],
    }),
    [locale],
  );

  const barData = useMemo(
    () => ({
      labels: pieData.labels,
      datasets: [
        {
          label: locale === "en" ? "₹ Lakhs" : "₹ లక్షలు",
          data: Object.values(costBreakdown),
          backgroundColor: "rgba(79, 70, 229, 0.6)",
          borderRadius: 12,
          maxBarThickness: 48,
        },
      ],
    }),
    [locale, pieData.labels],
  );

  const projection = useMemo(() => {
    if (!geojson) return null;
    return geoMercator().fitSize([540, 420], geojson as FeatureCollection);
  }, [geojson]);

  const pathGenerator = useMemo(() => {
    if (!projection) return null;
    return geoPath().projection(projection);
  }, [projection]);

  return (
    <section
      id="visual-intelligence"
      className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {locale === "en"
              ? "Visual intelligence embedded into every DPR."
              : "ప్రతి DPR లోనూ విజువల్ ఇంటెలిజెన్స్."}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {locale === "en"
              ? "Generate export-ready charts, heatmaps, and geospatial insights that update in real time as inputs change."
              : "ఇన్‌పుట్లు మారుతుండగానే రియల్ టైమ్ లో అప్‌డేట్ అయ్యే చార్టులు, హీట్‌మ్యాప్‌లు, భౌగోళిక విజువల్స్ ఉత్పత్తి చేయండి."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Pipette className="h-4 w-4" />
          {locale === "en"
            ? "SVG • PNG • PDF exports"
            : "SVG • PNG • PDF ఎగుమతులు"}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div
          id="cashflow-chart"
          className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800/50"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {locale === "en"
                  ? "Dynamic cash flow timeline"
                  : "డైనమిక్ క్యాష్ ఫ్లో టైమ్‌లైన్"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                {locale === "en"
                  ? "Quarterly inflow/outflow projections auto-adjust when incentives or stress factors are toggled."
                  : "ప్రోత్సాహాలు లేదా ఒత్తిడి కారకాలను మార్చినపుడు త్రైమాసిక ఇన్‌ఫ్లో/అవుట్‌ఫ్లో అంచనాలు తక్షణమే సవరిస్తాయి."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(scenarioLabels) as ScenarioKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setScenario(key)}
                  className={clsx(
                    "rounded-full px-4 py-2 text-xs font-semibold transition",
                    scenario === key
                      ? "bg-emerald-600 text-white shadow"
                      : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
                  )}
                >
                  {scenarioLabels[key][locale]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: true },
                  tooltip: { mode: "index", intersect: false },
                },
                scales: {
                  y: {
                    grid: { color: "rgba(148, 163, 184, 0.2)" },
                  },
                  x: {
                    grid: { display: false },
                  },
                },
              }}
              height={320}
            />
          </div>
          <ExportControls targetId="cashflow-chart" locale={locale} />
        </div>
        <div
          id="cost-breakdown"
          className="relative space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800"
        >
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {locale === "en"
                ? "Cost & revenue mix"
                : "ఖర్చు & ఆదాయ మిశ్రమం"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              {locale === "en"
                ? "Switch between pie and bar chart views depending on lender preference."
                : "రుణదాత అభిరుచికి అనుగుణంగా పై/బార్ చార్ట్ వీక్షణలను మార్చండి."}
            </p>
          </div>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: { padding: 14 },
                },
              },
            }}
            height={220}
          />
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
              height={220}
            />
          </div>
          <ExportControls targetId="cost-breakdown" locale={locale} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
        <div
          id="sensitivity-heatmap"
          className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-sm dark:border-slate-700"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">
                {locale === "en"
                  ? "Sensitivity analysis heatmap"
                  : "సెన్సిటివిటీ విశ్లేషణ హీట్‌మ్యాప్"}
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                {locale === "en"
                  ? "Understand how macro variations alter DSCR and bankability scores."
                  : "మాక్రో మార్పులు DSCR, బ్యాంకబిలిటీ స్కోర్‌పై ఎలా ప్రభావం చూపుతాయో తెలుసుకోండి."}
              </p>
            </div>
            <RefreshCw className="h-4 w-4 text-emerald-300" />
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-separate border-spacing-2 text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-widest text-slate-300">
                  <th className="rounded-lg bg-white/10 px-3 py-2 backdrop-blur">
                    {locale === "en" ? "Factor" : "కారకం"}
                  </th>
                  {(Object.keys(bandLabels) as HeatmapBand[]).map((band) => (
                    <th
                      key={band}
                      className="rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur"
                    >
                      {bandLabels[band][locale]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmapMatrix.map((row) => (
                  <tr key={row.variable}>
                    <td className="rounded-lg bg-white/10 px-3 py-2 text-slate-100 backdrop-blur">
                      {row.variable}
                    </td>
                    {(Object.keys(bandLabels) as HeatmapBand[]).map((band) => {
                      const value = row[band];
                      const ratio = Math.min(Math.max((value - 0.6) / 0.6, 0), 1);
                      const background = `rgba(34, 197, 94, ${ratio})`;
                      return (
                        <td
                          key={band}
                          className="rounded-lg px-3 py-2 text-center font-semibold text-slate-900"
                          style={{ backgroundColor: background }}
                        >
                          {value.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ExportControls targetId="sensitivity-heatmap" locale={locale} />
        </div>
        <div
          id="geospatial-visual"
          className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {locale === "en"
                  ? "Geospatial supply chain view"
                  : "జియోస్పేషియల్ సరఫరా గొలుసు వీక్షణ"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                {locale === "en"
                  ? "Visualise input sources, production clusters, and export nodes across Andhra Pradesh."
                  : "ఆంధ్రప్రదేశ్ అంతటా ఇన్‌పుట్ వనరులు, ఉత్పత్తి క్లస్టర్లు, ఎగుమతి పాయింట్లను వీక్షించండి."}
              </p>
            </div>
            <Factory className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
          </div>
          <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-300">
            <MapIcon className="h-4 w-4" />
            {locale === "en"
              ? "Tap nodes to inspect logistics risk parameters."
              : "లాజిస్టిక్స్ రిస్క్ వివరాలను చూడటానికి నోడ్లను ట్యాప్ చేయండి."}
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <svg viewBox="0 0 540 420" className="w-full">
              {geojson &&
                pathGenerator &&
                (geojson.features as MapFeature[]).map((feature, index) => (
                  <path
                    key={String(feature.properties?.id ?? feature.id ?? index)}
                    d={pathGenerator(feature) ?? ""}
                    className="fill-emerald-200 stroke-emerald-600/60 dark:fill-emerald-500/30 dark:stroke-emerald-400/60"
                  />
                ))}
              {projection &&
                supplyChainNodes.map((node) => {
                  const [x, y] = projection(node.coordinates) ?? [0, 0];
                  return (
                    <g
                      key={node.name}
                      onMouseEnter={() => setHoverNode(node)}
                      onMouseLeave={() => setHoverNode(null)}
                      onFocus={() => setHoverNode(node)}
                      onBlur={() => setHoverNode(null)}
                      role="button"
                      tabIndex={0}
                      className="cursor-pointer transition-transform hover:scale-105"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={8}
                        fill={nodeColor[node.type]}
                        stroke="#0f172a"
                        strokeWidth={1.5}
                      />
                      <text
                        x={x + 12}
                        y={y + 4}
                        fontSize={12}
                        fill="#1f2937"
                        className="dark:fill-slate-200"
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
            </svg>
          </div>
          {hoverNode && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 shadow-sm dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-200">
              <div className="font-semibold">{hoverNode.name}</div>
              <p className="mt-1 text-xs">
                {locale === "en"
                  ? "Risk outlook:"
                  : "రిస్క్ అవలోకనం:"}{" "}
                {hoverNode.type === "input"
                  ? locale === "en"
                    ? "Monitor raw material volatility via mandi price integration."
                    : "మండి ధరల ఇంటిగ్రేషన్ ద్వారా ముడి సరుకు ఊగిసలాటను మానిటర్ చేయండి."
                  : hoverNode.type === "market"
                    ? locale === "en"
                      ? "Link export readiness with customs dwell-time benchmarks."
                      : "కస్టమ్స్ డ్వెల్ టైమ్ బెంచ్‌మార్క్‌లతో ఎగుమతి సిద్ధతను అనుసంధానించండి."
                    : locale === "en"
                      ? "Track cluster infra gaps and skill availability through MSME ONE feeds."
                      : "MSME ONE ఫీడ్ల ద్వారా క్లస్టర్ మౌలిక సదుపాయాల లోటులు, నైపుణ్య అందుబాటును ట్రాక్ చేయండి."}
              </p>
            </div>
          )}
          <ExportControls targetId="geospatial-visual" locale={locale} />
        </div>
      </div>
    </section>
  );
}

function ExportControls({
  targetId,
  locale,
}: {
  targetId: string;
  locale: "en" | "te";
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
      <span>{locale === "en" ? "Export chart as:" : "విజువల్ ఎగుమతి:"}</span>
      {(["png", "svg", "pdf"] as const).map((format) => (
        <button
          key={format}
          type="button"
          onClick={() => exportVisual(targetId, format)}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:text-emerald-200"
        >
          <Download className="h-3 w-3" />
          {format.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
