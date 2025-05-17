import React, { useState } from "react";
import { Pie, Doughnut } from "react-chartjs-2";

const FoodDetection = ({
  foodItems,
  totalCalories,
  nutritionInfo,
  onRecommend,
  onShare,
  onPrint,
  onClear,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (foodItems.length === 0) {
    return (
      <div
        className="w-full lg:flex-1 h-auto flex flex-col justify-between bg-gradient-to-br from-indigo-900/70 to-violet-900/70 rounded-xl shadow-xl backdrop-blur-sm border border-white/10 p-6 animate-fadeSlideUp hover:shadow-indigo-500/10 transition-all duration-300"
        style={{ animationDelay: "0.4s" }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent drop-shadow-sm relative inline-flex justify-center w-full">
          Your Food Analysis Report
          <div
            className="absolute -right-2 -top-2 text-lg animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            📊
          </div>
        </h2>
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-500/20 to-violet-500/20 p-6 rounded-full mx-auto mb-6 w-24 h-24 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-400/30 animate-ping-slow"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No Food Detected Yet
            </h3>
            <p className="text-white/70 max-w-xs mx-auto">
              Upload a photo of your meal to get detailed nutrition information
              and calorie analysis
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-center">
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-500/20 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent relative z-10">
                  0
                </div>
                <div className="text-xs text-blue-300 font-medium mt-1 relative z-10">
                  Calories
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-sm border border-pink-500/20 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent relative z-10">
                  0g
                </div>
                <div className="text-xs text-pink-300 font-medium mt-1 relative z-10">
                  Protein
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-sm border border-emerald-500/20 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent relative z-10">
                  0g
                </div>
                <div className="text-xs text-emerald-300 font-medium mt-1 relative z-10">
                  Carbs
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="bg-gradient-to-r from-violet-500/20 to-indigo-500/20 backdrop-blur-sm px-5 py-3 rounded-full text-sm text-white/80 inline-flex items-center shadow-lg border border-white/10 transition-all duration-300 hover:shadow-violet-500/20">
                <span className="mr-2">🔄</span> Upload an image to get started
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for the pie chart
  const chartData = {
    labels: ["Carbs", "Protein", "Fat"],
    datasets: [
      {
        data: nutritionInfo
          ? [
              nutritionInfo.totalCarbs * 4, // Carbs in calories
              nutritionInfo.totalProtein * 4, // Protein in calories
              nutritionInfo.totalFat * 9, // Fat in calories
            ]
          : [0, 0, 0],
        backgroundColor: [
          "rgba(56, 189, 248, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(250, 204, 21, 0.8)",
        ],
        borderColor: [
          "rgba(56, 189, 248, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(250, 204, 21, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}% (${value.toFixed(0)} cal)`;
          },
        },
      },
    },
    cutout: "70%",
    borderRadius: 8,
    rotation: 270,
  };

  // Doughnut chart for daily calories
  const dailyRecommendedCalories = 2000; // Can be dynamic based on user profile
  const caloriesPercentage = Math.min(
    100,
    Math.round((totalCalories / dailyRecommendedCalories) * 100)
  );

  const dailyCaloriesData = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: [
          totalCalories,
          Math.max(0, dailyRecommendedCalories - totalCalories),
        ],
        backgroundColor: [
          "rgba(139, 92, 246, 0.85)",
          "rgba(255, 255, 255, 0.1)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const dailyCaloriesOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            if (context.dataIndex === 0) {
              return `Consumed: ${totalCalories} cal (${caloriesPercentage}%)`;
            } else {
              return `Remaining: ${Math.max(
                0,
                dailyRecommendedCalories - totalCalories
              )} cal`;
            }
          },
        },
      },
    },
    cutout: "75%",
    circumference: 360,
    rotation: 270,
  };

  // Calculate health score based on nutrition balance
  const calculateHealthScore = () => {
    if (!nutritionInfo) return 0;

    // Simple algorithm - can be refined with more nutrition science
    const proteinScore =
      (Math.min((nutritionInfo.totalProtein * 100) / totalCalories, 30) / 30) *
      100;
    const carbScore =
      (Math.min((nutritionInfo.totalCarbs * 4 * 100) / totalCalories, 60) /
        60) *
      100;
    const fatScore =
      (Math.min((nutritionInfo.totalFat * 9 * 100) / totalCalories, 35) / 35) *
      100;
    const fiberScore =
      nutritionInfo.fiber > 3 ? 100 : (nutritionInfo.fiber / 3) * 100;
    const sugarScore = 100 - (Math.min(nutritionInfo.sugar, 25) / 25) * 100;

    // Weighted average
    return Math.round(
      proteinScore * 0.3 +
        carbScore * 0.2 +
        fatScore * 0.2 +
        fiberScore * 0.15 +
        sugarScore * 0.15
    );
  };

  const healthScore = calculateHealthScore();
  const scoreColor =
    healthScore > 75
      ? "text-emerald-400"
      : healthScore > 50
      ? "text-amber-400"
      : "text-rose-400";

  const scoreGradient =
    healthScore > 75
      ? "from-emerald-500 to-green-500"
      : healthScore > 50
      ? "from-amber-500 to-yellow-500"
      : "from-rose-500 to-red-500";

  const scoreGlow =
    healthScore > 75
      ? "glow-effect-success"
      : healthScore > 50
      ? "glow-effect-warning"
      : "glow-effect-error";

  // Feedback based on health score
  const healthFeedback =
    healthScore > 75
      ? "Excellent nutritional balance! This meal has a good ratio of proteins, carbs, and healthy fats."
      : healthScore > 50
      ? "Decent nutritional profile. Consider adjusting the macronutrient balance for optimal health."
      : "This meal could be more balanced. Try adding more protein and reducing sugar content.";

  return (
    <div
      className="w-full lg:flex-1 h-auto flex flex-col justify-between card-gradient-alt rounded-xl shadow-xl backdrop-blur-sm border border-white/10 animate-fadeSlideUp overflow-hidden"
      style={{ animationDelay: "0.4s" }}
    >
      <div className="p-6 pb-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-5 text-gradient-2 relative">
          Detected Food Items
          <div className="absolute -right-1 -top-2 text-lg">🍽️</div>
        </h2>
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {foodItems.map((item, index) => (
            <span
              key={index}
              className="badge bg-gradient-to-r from-violet-500 to-purple-500 text-white border-none py-3 px-4 text-sm md:text-base animate-fadeSlideIn shadow-md shadow-purple-500/20 rounded-lg"
              style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>

      <div className="py-4 px-6 text-center">
        {/* Tabs for different views */}
        <div className="tabs mb-4 flex justify-center">
          <button
            className={`px-4 py-1 text-sm rounded-lg transition-all duration-300 ${
              activeTab === "overview"
                ? "bg-white/10 text-white font-medium"
                : "text-white/60 hover:text-white/80"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-1 text-sm rounded-lg transition-all duration-300 ${
              activeTab === "details"
                ? "bg-white/10 text-white font-medium"
                : "text-white/60 hover:text-white/80"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`px-4 py-1 text-sm rounded-lg transition-all duration-300 ${
              activeTab === "suggestions"
                ? "bg-white/10 text-white font-medium"
                : "text-white/60 hover:text-white/80"
            }`}
            onClick={() => setActiveTab("suggestions")}
          >
            Suggestions
          </button>
        </div>

        {activeTab === "overview" && (
          <>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="w-full md:w-1/2 text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Doughnut
                      data={dailyCaloriesData}
                      options={dailyCaloriesOptions}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs text-white/60">Calories</span>
                      <span className="text-2xl font-bold text-white">
                        {totalCalories}
                      </span>
                      <span className="text-xs text-white/60">
                        of {dailyRecommendedCalories}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className={`text-lg font-semibold ${scoreColor}`}>
                        Score
                      </div>
                      <div
                        className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${scoreGradient}`}
                      >
                        {healthScore}
                      </div>
                    </div>
                    <Pie data={chartData} options={chartOptions} />
                  </div>
                </div>

                <div className="flex justify-center mt-3 gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
                    <span className="text-xs text-white/60">Carbs</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-pink-400 mr-1"></div>
                    <span className="text-xs text-white/60">Protein</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-400 mr-1"></div>
                    <span className="text-xs text-white/60">Fat</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-white/5 text-sm text-white/70">
              {healthFeedback}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg glass-effect">
                <div className="text-lg font-bold text-blue-400">
                  {nutritionInfo?.totalCarbs || 0}g
                </div>
                <div className="text-xs text-white/60 mt-1">Carbs</div>
              </div>
              <div className="p-3 rounded-lg glass-effect">
                <div className="text-lg font-bold text-pink-400">
                  {nutritionInfo?.totalProtein || 0}g
                </div>
                <div className="text-xs text-white/60 mt-1">Protein</div>
              </div>
              <div className="p-3 rounded-lg glass-effect">
                <div className="text-lg font-bold text-amber-400">
                  {nutritionInfo?.totalFat || 0}g
                </div>
                <div className="text-xs text-white/60 mt-1">Fat</div>
              </div>
            </div>
          </>
        )}

        {activeTab === "details" && nutritionInfo && (
          <div className="animate-fadeIn">
            <div className="mb-4">
              <div className="mb-2 text-left">
                <h3 className="text-sm uppercase tracking-wide text-white/60 mb-1">
                  Detailed Nutrition
                </h3>
                <div className="h-px bg-white/10 w-full"></div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-left">
                <div className="flex justify-between">
                  <span className="text-white/70">Carbohydrates</span>
                  <span className="font-medium text-blue-400">
                    {nutritionInfo.totalCarbs}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Protein</span>
                  <span className="font-medium text-pink-400">
                    {nutritionInfo.totalProtein}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Fat</span>
                  <span className="font-medium text-amber-400">
                    {nutritionInfo.totalFat}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Sugar</span>
                  <span className="font-medium text-white">
                    {nutritionInfo.sugar}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Fiber</span>
                  <span className="font-medium text-white">
                    {nutritionInfo.fiber}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Sodium</span>
                  <span className="font-medium text-white">
                    {nutritionInfo.sodium}mg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Calories</span>
                  <span className="font-medium text-white">
                    {totalCalories}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Health Score</span>
                  <span className={`font-medium ${scoreColor}`}>
                    {healthScore}/100
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-4">
              <div className="mb-2 text-left">
                <h3 className="text-sm uppercase tracking-wide text-white/60 mb-1">
                  Daily Value
                </h3>
                <div className="h-px bg-white/10 w-full"></div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white/70">Carbs</span>
                    <span className="text-sm text-white/70">
                      {Math.round((nutritionInfo.totalCarbs / 300) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round((nutritionInfo.totalCarbs / 300) * 100)
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white/70">Protein</span>
                    <span className="text-sm text-white/70">
                      {Math.round((nutritionInfo.totalProtein / 50) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-400 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round((nutritionInfo.totalProtein / 50) * 100)
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white/70">Fat</span>
                    <span className="text-sm text-white/70">
                      {Math.round((nutritionInfo.totalFat / 65) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round((nutritionInfo.totalFat / 65) * 100)
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white/70">Calories</span>
                    <span className="text-sm text-white/70">
                      {Math.round((totalCalories / 2000) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-400 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round((totalCalories / 2000) * 100)
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "suggestions" && (
          <div className="animate-fadeIn">
            <div className="glass-effect p-4 rounded-xl mb-4 text-left">
              <h3 className="text-gradient-3 text-lg font-semibold mb-2">
                Meal Analysis
              </h3>
              <p className="text-white/70 text-sm mb-3">{healthFeedback}</p>

              {healthScore < 75 && (
                <div className="mt-2 p-3 bg-white/5 rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-2">
                    Improvement Tips:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
                    {healthScore < 50 && (
                      <>
                        <li>Add more protein sources to balance your meal</li>
                        <li>
                          Reduce processed sugars and increase fiber intake
                        </li>
                      </>
                    )}
                    {healthScore >= 50 && healthScore < 75 && (
                      <>
                        <li>
                          Consider adding more vegetables for additional
                          nutrients
                        </li>
                        <li>
                          Balance your carbohydrate intake with healthy fats
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {nutritionInfo?.alternatives &&
              nutritionInfo.alternatives.length > 0 && (
                <div className="mt-4 animate-fadeSlideUp">
                  <h3 className="text-sm uppercase tracking-wide text-white/60 mb-3">
                    Healthier Alternatives
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {nutritionInfo.alternatives.map((alt, index) => (
                      <div
                        key={index}
                        className="glass-effect p-3 rounded-lg flex items-center animate-fadeIn text-left"
                        style={{ animationDelay: `${0.9 + index * 0.2}s` }}
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2">
                          <span className="text-xs">🥗</span>
                        </div>
                        <span className="text-sm text-white/80">{alt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

           
          </div>
        )}

      </div>
    </div>
  );
};

export default FoodDetection;
