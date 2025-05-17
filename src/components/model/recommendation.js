import { useState } from "react";

export const RecommendationModal = ({ show, onClose, calorieData }) => {
  const [activeTab, setActiveTab] = useState("breakfast");

  if (!show || !calorieData) return null;

  const { calories } = calorieData;

  // Generate meal recommendations based on the calculated calories

  // Calculate calorie adjustment based on original calorie count
  const getCalorieAdjustment = () => {
    if (calories < 300)
      return "These options may exceed your current meal's calories. Consider these for a more nutritious option.";
    if (calories > 800)
      return "These options have fewer calories than your current meal. They provide balanced nutrition with fewer calories.";
    return "These options are similar in calories to your current meal but may offer more balanced nutrition.";
  };

  const adjustmentMessage = getCalorieAdjustment();

  // Renders a meal recommendation card
  const MealCard = ({ meal }) => (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <h4 className="font-semibold text-lg">{meal.name}</h4>
      <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
      <div className="flex justify-between text-sm mt-2">
        <span className="font-medium">{meal.calories} cal</span>
        <div className="flex gap-2">
          <span className="text-blue-600">{meal.carbs}g carbs</span>
          <span className="text-red-600">{meal.protein}g protein</span>
          <span className="text-yellow-600">{meal.fat}g fat</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <h3 className="text-xl font-bold">Meal Recommendations</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm mb-4">{adjustmentMessage}</p>

          <div className="tabs tabs-boxed mb-4">
            <a
              className={`tab ${activeTab === "breakfast" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("breakfast")}
            >
              Breakfast
            </a>
            <a
              className={`tab ${activeTab === "lunch" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("lunch")}
            >
              Lunch
            </a>
            <a
              className={`tab ${activeTab === "dinner" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("dinner")}
            >
              Dinner
            </a>
            <a
              className={`tab ${activeTab === "snacks" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("snacks")}
            >
              Snacks
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
