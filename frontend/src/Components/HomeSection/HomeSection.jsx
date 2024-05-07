import React, { useState } from "react";
import MealPost from "./MealPost";

const HomeSection = () => {
  const [meals, setMeals] = useState([]);

  const handlePost = (newMeal) => {
    setMeals([...meals, newMeal]);
  };

  return (
    <div className="space-y-5" style={{ marginTop: "20px" }}>
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      <section className="pb-10">
        {/* Render existing posts */}
        {meals.map((meal, index) => (
          <MealPost key={index} meal={meal} />
        ))}
        {/* Render new post */}
        <MealPost handlePost={handlePost} />
      </section>
    </div>
  );
};

export default HomeSection;
