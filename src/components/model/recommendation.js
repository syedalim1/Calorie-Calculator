import { useState } from "react";

export const RecommendationModal = ({ show, onClose, calorieData }) => {
  const [activeTab, setActiveTab] = useState("breakfast");

  if (!show || !calorieData) return null;

  const { calories } = calorieData;

  // Generate meal recommendations based on the calculated calories
  const getMealRecommendations = () => {
    // This is a simplified version - in a real app, these would come from a proper nutrition API
    const breakfastOptions = [
      {
        name: "Avocado Toast with Egg",
        calories: 350,
        description:
          "Whole grain toast topped with smashed avocado and a poached egg",
        protein: 15,
        carbs: 25,
        fat: 20,
      },
      {
        name: "Greek Yogurt Parfait",
        calories: 280,
        description: "Greek yogurt with mixed berries, honey, and granola",
        protein: 18,
        carbs: 30,
        fat: 10,
      },
      {
        name: "Oatmeal with Fruits",
        calories: 320,
        description:
          "Steel cut oats cooked with milk, topped with banana and blueberries",
        protein: 12,
        carbs: 45,
        fat: 8,
      },
    ];

    const lunchOptions = [
      {
        name: "Quinoa Salad Bowl",
        calories: 420,
        description:
          "Quinoa with mixed vegetables, chickpeas, and lemon vinaigrette",
        protein: 15,
        carbs: 50,
        fat: 18,
      },
      {
        name: "Turkey Wrap",
        calories: 380,
        description:
          "Whole grain wrap with lean turkey, vegetables, and hummus",
        protein: 25,
        carbs: 35,
        fat: 15,
      },
      {
        name: "Vegetable Soup with Grilled Cheese",
        calories: 450,
        description:
          "Vegetable soup paired with a small whole grain grilled cheese sandwich",
        protein: 18,
        carbs: 40,
        fat: 22,
      },
    ];

    const dinnerOptions = [
      {
        name: "Grilled Salmon with Vegetables",
        calories: 480,
        description:
          "Grilled salmon fillet with roasted Brussels sprouts and sweet potatoes",
        protein: 30,
        carbs: 30,
        fat: 25,
      },
      {
        name: "Chicken Stir Fry",
        calories: 420,
        description:
          "Lean chicken breast stir-fried with mixed vegetables and brown rice",
        protein: 28,
        carbs: 40,
        fat: 15,
      },
      {
        name: "Vegetarian Lentil Curry",
        calories: 390,
        description:
          "Spiced lentil curry with mixed vegetables served over brown rice",
        protein: 20,
        carbs: 45,
        fat: 12,
      },
    ];

    const snackOptions = [
      {
        name: "Apple with Almond Butter",
        calories: 180,
        description: "Fresh apple slices with 1 tbsp of almond butter",
        protein: 5,
        carbs: 25,
        fat: 8,
      },
      {
        name: "Hummus with Vegetables",
        calories: 150,
        description:
          "2 tbsp hummus with carrot, cucumber, and bell pepper sticks",
        protein: 5,
        carbs: 15,
        fat: 7,
      },
      {
        name: "Trail Mix",
        calories: 200,
        description: "Small handful of nuts, seeds, and dried fruits",
        protein: 6,
        carbs: 18,
        fat: 12,
      },
    ];

    return {
      breakfast: breakfastOptions,
      lunch: lunchOptions,
      dinner: dinnerOptions,
      snacks: snackOptions,
    };
  };

  const recommendations = getMealRecommendations();

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

          <div className="space-y-4">
            {recommendations[activeTab].map((meal, index) => (
              <MealCard key={index} meal={meal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
