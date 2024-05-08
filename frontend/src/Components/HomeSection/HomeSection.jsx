import React from "react";
import { connect } from "react-redux";
import MealPost from "./MealPost";
import { addPost } from "../Store/Action";

const HomeSection = ({ meals, dispatch }) => {
  const handlePost = (newMeal) => {
    // Dispatch the addPost action to add the new meal to the store
    dispatch(addPost(newMeal));
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

const mapStateToProps = (state) => {
  return {
    meals: state.post.posts,
  };
};

export default connect(mapStateToProps)(HomeSection);
