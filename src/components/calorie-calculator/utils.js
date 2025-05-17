// Convert file to base64
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Generate mock nutrition data
export const generateNutritionInfo = (items, calories) => {
  const totalFat = Math.round((calories * 0.3) / 9); // 30% of calories from fat
  const totalCarbs = Math.round((calories * 0.5) / 4); // 50% of calories from carbs
  const totalProtein = Math.round((calories * 0.2) / 4); // 20% of calories from protein
  const sugar = Math.round(totalCarbs * 0.3); // 30% of carbs as sugar
  const fiber = Math.round(totalCarbs * 0.15); // 15% of carbs as fiber

  return {
    calories,
    totalFat,
    saturatedFat: Math.round(totalFat * 0.4),
    totalCarbs,
    sugar,
    fiber,
    totalProtein,
    sodium: Math.round(calories * 1.2), // mg of sodium (mock data)
  };
};
