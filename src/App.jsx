// import { Routes, Route } from 'react-router-dom'
// import './App.css'
// import MyNavbar from './components/MyNavbar'
// import MyHomePage from './components/MyHomePage'
// import DayWeatherDetails from './components/DayWheaterDetails'

// function App() {
//   return (
//     <>
//       <MyNavbar />
//       <Routes>
//         <Route path="/" element={<MyHomePage />} />
//         <Route path="/details/:date" element={<DayWeatherDetails />} />
//       </Routes>
//     </>
//   )
// }

// export default App


import { useState } from "react";
import MyNavbar from "./components/MyNavbar";
import MyHomePage from "./components/MyHomePage";
import DayWeatherDetails from "./components/DayWeatherDetails";
import { Routes, Route } from "react-router-dom";
import "./App.css";


function App() {
  const [city, setCity] = useState("Rome");

  return (
    <>
      <MyNavbar onSearch={setCity} />
      <Routes>
        <Route path="/" element={<MyHomePage city={city} />} />
        <Route path="/details/:date" element={<DayWeatherDetails city={city} />} />
      </Routes>
    </>
  );
}

export default App;
