import React, { useContext } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filter food items based on category
  const filteredFood = (food_list || []).filter(
    (item) =>
      category === "All" ||
      (item.category && category.toLowerCase() === item.category.toLowerCase())
  );

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>

      <div className="food-display-list">
        {filteredFood.length > 0 ? (
          filteredFood.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image || "/default-food.png"}
            />
          ))
        ) : (
          <p>No dishes available.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
