import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import LoadingSpinner from "@/components/spinner";
import { AlertModal } from "@/components/model/alert";
import { RecommendationModal } from "@/components/model/recommendation";
import HistoryTab from "../historyTab";

// Import separated components
import ImageUpload from "./ImageUpload";
import FoodDetection from "./FoodDetection";
import ShareModal from "./ShareModal";
import Confetti from "./Confetti";
import AnalysisProgress from "./AnalysisProgress";
import { getBase64, generateNutritionInfo } from "./utils";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Decorative shapes component
const DecorativeShapes = () => (
  <>
    <div className="fixed -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
    <div className="fixed top-1/4 -left-20 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
    <div className="fixed bottom-20 right-10 w-64 h-64 bg-pink-600/20 rounded-full filter blur-3xl animate-float"></div>
    <div className="fixed top-1/3 left-1/2 w-72 h-72 bg-teal-600/20 rounded-full filter blur-3xl animate-float animation-delay-3000"></div>
    <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-amber-600/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1000"></div>
  </>
);

// Main component for the calorie calculator page
export const CalorieCalculatorPage = () => {
  // State hooks for managing various states
  const [uploadedImage, setUploadedImage] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("analysis");
  const [showShare, setShowShare] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streakCount, setStreakCount] = useState(0);

  // Load history and streak from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("foodHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    // Load streak data
    const savedStreak = localStorage.getItem("streakCount");
    if (savedStreak) {
      setStreakCount(parseInt(savedStreak, 10));
    }

    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("foodHistory", JSON.stringify(history));
  }, [history]);

  // Update streak when adding new items
  useEffect(() => {
    if (history.length > 0) {
      // Check last entry's date
      const lastEntryDate = new Date(history[0].timestamp).toDateString();
      const todayDate = new Date().toDateString();
      const yesterdayDate = new Date(Date.now() - 86400000).toDateString();

      // Get the last saved date
      const lastSavedDate = localStorage.getItem("lastEntryDate");

      // If today is a new day and the last entry was yesterday, increase streak
      if (lastEntryDate === todayDate && lastSavedDate === yesterdayDate) {
        setStreakCount((prev) => prev + 1);
      }
      // If today is a new day but last entry was not yesterday, reset streak to 1
      else if (
        lastEntryDate === todayDate &&
        lastSavedDate !== yesterdayDate &&
        lastSavedDate !== todayDate
      ) {
        setStreakCount(1);
      }

      // Save today's date and streak count
      localStorage.setItem("lastEntryDate", todayDate);
      localStorage.setItem("streakCount", streakCount.toString());
    }
  }, [history, streakCount]);

  // Show confetti effect when analysis is complete
  useEffect(() => {
    if (foodItems.length > 0 && !isLoading) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [foodItems, isLoading]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Image = await getBase64(file);
        setUploadedImage(base64Image); // Updates state with the base64 encoded image
        sendImageToServer(base64Image); // Sends the base64 encoded image to the server
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  // Sends the base64 encoded image to the server for processing
  const sendImageToServer = (base64Image) => {
    setLoading(true);
    setAnalysisStage(1); // Start analysis

    // Simulate multi-stage analysis process with delays
    const stageTimer = setTimeout(() => {
      setAnalysisStage(2); // Detecting food items
    }, 1000);

    fetch("/api/detect_food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Image }),
    })
      .then((response) => {
        setAnalysisStage(3); // Calculating nutrition
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setAnalysisStage(4); // Generating recommendations

          setTimeout(() => {
            setFoodItems(data.items);
            setTotalCalories(data.count);

            // Use the real nutrition data from API
            if (data.nutrition) {
              setNutritionInfo({
                calories: data.count,
                totalProtein: data.nutrition.protein,
                totalFat: data.nutrition.fat,
                totalCarbs: data.nutrition.carbs,
                fiber: data.nutrition.fiber,
                sugar: data.nutrition.sugar,
                sodium: data.nutrition.sodium,
                alternatives: data.alternatives || [],
              });
            } else {
              // Fallback to generated data if API doesn't return nutrition
              const nutritionData = generateNutritionInfo(
                data.items,
                data.count
              );
              setNutritionInfo(nutritionData);
            }

            // Add to history
            const timestamp = new Date().toLocaleString();
            setHistory((prev) => [
              {
                id: Date.now(),
                timestamp,
                image: base64Image,
                items: data.items,
                calories: data.count,
                nutrition: nutritionInfo,
                alternatives: data.alternatives || [],
              },
              ...prev.slice(0, 9),
            ]); // Keep only last 10 records

            setAnalysisStage(5); // Analysis complete
            setLoading(false);
          }, 800);
        } else {
          clearTimeout(stageTimer);
          setShowAlert(true);
          setAlertMessage(data.message);
          setLoading(false);
          setAnalysisStage(0);
        }
      })
      .catch((error) => {
        clearTimeout(stageTimer);
        console.error("Error:", error);
        // Show AlertModal on error
        setLoading(false);
        setShowAlert(true);
        setAlertMessage("Failed to analyze the image. Please try again.");
        setAnalysisStage(0);
      });
  };

  // Function to share results
  const handleShare = () => {
    setShowShare(true);
  };

  // Function to print results
  const handlePrint = () => {
    window.print();
  };

  // Clears current analysis
  const handleClear = () => {
    setUploadedImage(null);
    setFoodItems([]);
    setTotalCalories(0);
    setNutritionInfo(null);
    setAnalysisStage(0);
  };

  // Delete item from history
  const deleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  // Load item from history
  const loadHistoryItem = (item) => {
    setUploadedImage(item.image);
    setFoodItems(item.items);
    setTotalCalories(item.calories);
    setNutritionInfo(item.nutrition);
    setActiveTab("analysis");
  };

  // Closes the alert modal
  const closeAlertModal = () => setShowAlert(false);

  // Format current time
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen p-2 md:p-4   overflow-hidden">
      <DecorativeShapes />
      {/* <Confetti show={showConfetti} /> */}
      <AnalysisProgress stage={analysisStage} />

      {isLoading && !analysisStage && <LoadingSpinner />}

      {/* Header with time, date and streak */}
      <div className="w-full max-w-5xl mb-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-3 md:mb-0">
          <div className="text-3xl font-bold bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
            {formattedTime}
          </div>
          <div className="text-white/70 text-sm backdrop-blur-sm px-2 py-1 rounded-md bg-white/5">
            {formattedDate}
          </div>
        </div>
        {streakCount > 0 && (
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md shadow-lg py-2 px-4 rounded-full flex items-center gap-2 border border-amber-500/30">
            <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xs">🔥</span>
            </div>
            <span className="text-white/90 text-sm font-medium">
              {streakCount} day streak
            </span>
          </div>
        )}
      </div>

      <div className="w-full max-w-7xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-violet-900/70 to-indigo-900/70 shadow-2xl rounded-2xl backdrop-blur-md border border-white/20 animate-fadeIn overflow-hidden relative transition-all duration-300 hover:shadow-violet-500/10">
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-pink-500/20 rounded-full filter blur-3xl"></div>

        {/* Floating Elements */}
        <div
          className="absolute top-10 right-10 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div className="absolute bottom-16 left-16 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/30 to-sky-500/30 animate-float animation-delay-1000"></div>
        <div className="absolute top-1/3 left-20 w-8 h-8 rounded-full bg-gradient-to-r from-amber-500/30 to-orange-500/30 animate-float animation-delay-3000"></div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 opacity-70 pointer-events-none"></div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4 md:mb-6 bg-gradient-to-r from-violet-300 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-sm animate-fadeSlideUp relative">
          Smart Calorie Calculator
          <div className="absolute -top-6 -right-6 w-12 h-12 text-xl animate-float">
            ✨
          </div>
        </h1>
        <p
          className="text-center text-white/70 mb-8 max-w-xl mx-auto text-sm md:text-base animate-fadeSlideUp"
          style={{ animationDelay: "0.1s" }}
        >
          Upload a food image to instantly get detailed nutrition facts, calorie
          counts, and healthy alternatives powered by AI.
        </p>

        <div className="tabs tabs-boxed mb-8 bg-white/5 p-1.5 rounded-xl flex justify-center max-w-md mx-auto shadow-lg shadow-purple-900/20 border border-white/5">
          <a
            className={`tab flex-1 text-center font-medium text-white/90 rounded-lg transition-all duration-300 ${
              activeTab === "analysis"
                ? "bg-gradient-to-r from-violet-500/50 to-indigo-500/50 text-white font-semibold"
                : "hover:bg-white/10"
            }`}
            onClick={() => setActiveTab("analysis")}
          >
            Food Analysis
          </a>
          <a
            className={`tab flex-1 text-center font-medium text-white/90 rounded-lg transition-all duration-300 ${
              activeTab === "history"
                ? "bg-gradient-to-r from-violet-500/50 to-indigo-500/50 text-white font-semibold"
                : "hover:bg-white/10"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </a>
        </div>

        {activeTab === "analysis" ? (
          <>
            <div
              className="flex justify-center mb-8 animate-fadeSlideUp"
              style={{ animationDelay: "0.2s" }}
            >
              <label
                htmlFor="upload"
                className="btn btn-primary w-full sm:w-auto rounded-xl py-4 px-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-xl shadow-violet-600/20 hover:shadow-violet-500/30 text-lg font-medium relative group overflow-hidden border-0"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-xl"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="relative z-10">Upload Food Image</span>
              </label>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div
                className="flex-1 w-full animate-fadeSlideUp"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="image-upload-area border-2 border-dashed h-[320px] sm:h-[380px] md:h-[420px] border-violet-400/30 rounded-xl flex justify-center items-center relative text-center bg-gradient-to-br from-black/40 to-violet-950/40 backdrop-blur-sm shadow-inner overflow-hidden hover:border-violet-400/50 transition-all duration-300 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <ImageUpload
                    onUpload={handleImageUpload}
                    uploadedImage={uploadedImage}
                  />
                </div>

                {/* Daily Tips Card */}
                <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-cyan-500/5 transition-all duration-300">
                  <h3 className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent text-lg font-bold mb-2 flex items-center">
                    <span className="mr-2">💡</span> Daily Nutrition Tip
                  </h3>
                  <p className="text-white/70 text-sm">
                    Eating colorful fruits and vegetables helps ensure you get a
                    variety of vitamins and antioxidants in your diet.
                  </p>
                </div>
              </div>

              <FoodDetection
                foodItems={foodItems}
                totalCalories={totalCalories}
                nutritionInfo={nutritionInfo}
                onRecommend={() => setShowRecommendations(true)}
                onShare={handleShare}
                onPrint={handlePrint}
                onClear={handleClear}
              />
            </div>

            {/* Quick Facts */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-4 rounded-xl flex items-center border border-blue-500/20 shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
                  <span className="text-white">💧</span>
                </div>
                <div>
                  <h4 className="text-xs text-blue-300 uppercase font-semibold">
                    Daily Water
                  </h4>
                  <p className="text-white font-medium">8 cups recommended</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-sm p-4 rounded-xl flex items-center border border-emerald-500/20 shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center mr-3 shadow-lg shadow-emerald-500/20">
                  <span className="text-white">🥗</span>
                </div>
                <div>
                  <h4 className="text-xs text-emerald-300 uppercase font-semibold">
                    Vegetables
                  </h4>
                  <p className="text-white font-medium">5 servings per day</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 backdrop-blur-sm p-4 rounded-xl flex items-center border border-violet-500/20 shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center mr-3 shadow-lg shadow-violet-500/20">
                  <span className="text-white">🍎</span>
                </div>
                <div>
                  <h4 className="text-xs text-violet-300 uppercase font-semibold">
                    Fruits
                  </h4>
                  <p className="text-white font-medium">2-3 servings per day</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm p-4 rounded-xl flex items-center border border-amber-500/20 shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mr-3 shadow-lg shadow-amber-500/20">
                  <span className="text-white">🏃</span>
                </div>
                <div>
                  <h4 className="text-xs text-amber-300 uppercase font-semibold">
                    Exercise
                  </h4>
                  <p className="text-white font-medium">30 min recommended</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <HistoryTab
            history={history}
            onLoadItem={loadHistoryItem}
            onDeleteItem={deleteHistoryItem}
          />
        )}
      </div>

      <AlertModal
        show={showAlert}
        onClose={closeAlertModal}
        type="error"
        message={alertMessage}
      />
      <ShareModal show={showShare} onClose={() => setShowShare(false)} />
      <RecommendationModal
        show={showRecommendations}
        onClose={() => setShowRecommendations(false)}
        calorieData={nutritionInfo}
      />
    </div>
  );
};
