import React, { useEffect } from "react";
import { Route, Routes,  } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer, AboutUsContainer, Dashboard, FavouriteContainer, UserDashboardContainer,CheckOut,Success } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllBbtItems, getAllPromos } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
// import UserDashboardContainer from "./components";



const App = () => {
  const [{ bbtItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllBbtItems().then((data) => {
      dispatch({
        type: actionType.SET_BBT_ITEMS,
        bbtItems: data,
      });
    });
    await getAllPromos().then((data) => {
      dispatch({
        type: actionType.SET_PROMOS,
        promos: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode='wait'>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/aboutUs" element={<AboutUsContainer />} />
            
            <Route path="/user/*" element={<UserDashboardContainer />} />
            <Route path="/favourites" element={<FavouriteContainer />} />
            <Route path="/checkout" element={ <CheckOut /> } />
            <Route path="/success" element = {<Success/>} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
