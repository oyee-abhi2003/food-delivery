import { createContext, useEffect, useState } from "react";
import { food_list as foodData } from "../assets/assets/frontend_assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState(foodData); // local fallback
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const url = "http://localhost:4000";

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.log("Add to cart failed:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      if (prev[itemId] === 1) {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      }
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.log("Remove from cart failed:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = food_list.find((p) => p._id === itemId);
      if (item) totalAmount += item.price * cartItems[itemId];
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(url + "/api/food/list");
      // Only overwrite if API returns non-empty array
      if (res.data && res.data.data && res.data.data.length > 0) {
        setFoodList(res.data.data);
      }
    } catch (error) {
      console.log("Failed to fetch food list:", error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      if (response.data && response.data.cartData) setCartItems(response.data.cartData);
    } catch (error) {
      console.log("Failed to load cart:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }

    loadData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
