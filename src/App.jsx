

// import { useState } from "react";
// import MyNavbar from "./components/MyNavbar";
// import MyHomePage from "./components/MyHomePage";
// import DayWeatherDetails from "./components/DayWeatherDetails";
// import { Routes, Route } from "react-router-dom";
// import "./App.css";
// import MyFooter from "./components/MyFooter";

// function App() {
//   const [city, setCity] = useState("Rome");

//   return (
//     <>
//       <MyNavbar onSearch={setCity} />
//       <Routes>
//         <Route path="/" element={<MyHomePage city={city} />} />
//         <Route path="/details/:date" element={<DayWeatherDetails city={city} />} />
//       </Routes>
//       <MyFooter/>
//     </>
//   );
// }

// export default App;


import { useState } from "react";
import MyNavbar from "./components/MyNavbar";
import MyHomePage from "./components/MyHomePage";
import DayWeatherDetails from "./components/DayWeatherDetails";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MyFooter from "./components/MyFooter";

function App() {
  const [city, setCity] = useState("Rome");

  return (
    <div className="d-flex flex-column min-vh-100">
      <MyNavbar onSearch={setCity} />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<MyHomePage city={city} />} />
          <Route path="/details/:date" element={<DayWeatherDetails city={city} />} />
        </Routes>
      </main>
      <MyFooter />
    </div>
  );
}

export default App;
