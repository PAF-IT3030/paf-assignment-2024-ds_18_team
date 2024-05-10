import React from "react";
import { connect } from "react-redux";
import MealPost from "./MealPost";
import { addPost, addComment } from "../Store/Action";
import NewPost from "./NewPost";

const HomeSection = ({ meals, dispatch }) => {
  const handlePost = (newMeal) => {
    dispatch(addPost(newMeal));
  };

  const handleAddComment = (postId, comment) => {
    // Dispatch the addComment action to add the new comment to the store
    dispatch(addComment(postId, comment));
  };

  return (
    <div className="space-y-5" style={{ marginTop: "20px" }}>
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      <section className="pb-10">
        {/* Render existing posts */}
        {meals.map((meal, index) => (
          <MealPost
            key={index}
            meal={meal}
            onAddComment={handleAddComment} // Pass onAddComment function
          />
        ))}
        {/* Render new post */}
        <NewPost handlePost={handlePost} />
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
