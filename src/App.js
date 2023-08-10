import React from "react";
import Flowmap from "./MapWithInsets";
import WorldMap from "./WorldMap";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import MapPointSeries from "./MapPointSeries";
import WorldPopulationMap from "./TieldWebMap";

function App() {
  return (
    <div className="demoLayout">
      <div className="cardsLayout">
        <h1>Mapflow demo</h1>
        <div className="link-container">
          <Link to="/">Map Point Series</Link>
          <Link to="/worldmap">World Map</Link>
          <Link to="/flowmap">Flowmap</Link>
          <Link to="/map-bubble">Map Bubble</Link>
        </div>
      </div>
      <div className="resultLayout">
        <Routes>
          <Route path="/" element={<MapPointSeries />} />
          <Route path="/worldmap" element={<WorldMap />} />
          <Route path="/flowmap" element={<Flowmap />} />
          <Route path="/map-bubble" element={<WorldPopulationMap />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
