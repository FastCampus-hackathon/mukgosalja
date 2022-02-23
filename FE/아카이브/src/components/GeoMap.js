import React from "react";
import { GeoJSON } from "react-leaflet";
import geoData from "../assets/TL_SCCO_CTPRVN.json";
import { useState } from "react";

function GeoJson() {
  const [hovered, setHovered] = useState(false);

  return (
    <GeoJSON
      data={geoData.features}
      style={{
        fillColor: "#dbdfea",
        fillOpacity: 1,
        color: "white",
        weight: 0.4,
      }}
      onEachFeature={(feature, layer) => {
        layer.on("mouseover", function () {
          this.setStyle({
            fillColor: "#4877EF",
          });
        });
        layer.on("mouseout", function () {
          this.setStyle({
            fillColor: "#dbdfea",
          });
        });
      }}
    />
  );
}

export default GeoJson;
