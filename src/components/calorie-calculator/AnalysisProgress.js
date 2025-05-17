import React from "react";
import {
  Camera,
  Share2,
  Upload,
  X,
  RefreshCw,
  Info,
  Award,
  ChevronDown,
  SparkleIcon,
  BarChart,
  Apple,
} from "lucide-react";

// Enhanced Analysis Progress Component
const AnalysisProgress = ({ stage }) => {
  if (stage === 0 || stage === 5) return null;

  const stages = [
    "Starting analysis...",
    "Detecting food items...",
    "Calculating nutritional information...",
    "Generating recommendations...",
    "Analysis complete!",
  ];

  const stageTips = [
    "Preparing our AI model to analyze your food...",
    "Using visual recognition to identify food items in your image...",
    "Computing calories, macros, and nutritional profile...",
    "Finding healthier alternatives based on your food choices...",
    "Ready to show your detailed food analysis!",
  ];

  const stageColors = [
    "from-indigo-500 to-blue-500",
    "from-blue-500 to-sky-500",
    "from-violet-500 to-purple-500",
    "from-amber-500 to-orange-500",
    "from-emerald-500 to-green-500",
  ];

  const stageIcons = [
    <RefreshCw className="animate-spin" size={32} />,
    <Camera size={32} />,
    <BarChart size={32} />,
    <Apple size={32} />,
    <SparkleIcon size={32} className="text-emerald-500" />,
  ];

  const pulseColor = [
    "bg-indigo-500/20",
    "bg-blue-500/20",
    "bg-violet-500/20",
    "bg-amber-500/20",
    "bg-emerald-500/20",
  ];

  const iconBoxColor = [
    "border-indigo-200 bg-indigo-50",
    "border-blue-200 bg-blue-50",
    "border-violet-200 bg-violet-50",
    "border-amber-200 bg-amber-50",
    "border-emerald-200 bg-emerald-50",
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-40 backdrop-blur-md animate-fadeIn">
      <div
        className={`absolute inset-0 ${
          pulseColor[stage - 1]
        } blur-3xl opacity-30 animate-pulse pointer-events-none`}
      ></div>

      <div className="bg-gradient-to-b from-white to-slate-50 p-8 rounded-2xl max-w-md w-11/12 text-center shadow-2xl border border-white/20 animate-scaleIn relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>

        <div className="mb-8 relative">
          <div
            className={`w-24 h-24 mx-auto flex items-center justify-center rounded-2xl p-5 border-4 ${
              iconBoxColor[stage - 1]
            } text-slate-700 animate-bounceIn`}
          >
            {stageIcons[stage - 1]}
          </div>

          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r from-transparent via-slate-200/50 to-transparent blur-sm"></div>
        </div>

        <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
          Analyzing Your Food
        </h3>

        <p className="text-slate-700 mb-4 text-lg font-medium">
          {stages[stage - 1]}
        </p>
        <p className="text-slate-500 mb-6 text-sm">{stageTips[stage - 1]}</p>

        <div className="w-full bg-slate-100 rounded-full h-3 mb-6 shadow-inner overflow-hidden">
          <div
            className={`bg-gradient-to-r ${
              stageColors[stage - 1]
            } h-3 rounded-full transition-all duration-700 ease-out shadow-lg`}
            style={{ width: `${(stage / 5) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Starting</span>
          <span className="flex items-center font-medium text-sm text-slate-700">
            Stage {stage} of 5
          </span>
          <span>Complete</span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;
