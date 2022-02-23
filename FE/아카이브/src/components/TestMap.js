import React from "react";
import { GeoJSON } from "react-leaflet";
import { useDispatch } from "react-redux";
import geoData from "../assets/test.json";
import { gpsActions } from "../store/gps";

function TestJson() {
  const dispatch = useDispatch();

  const areaHandler = (area) => {
    dispatch(gpsActions.AREASET(area));
  };

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
        layer.on("click", () => {
          areaHandler(feature.properties.name);
        });
      }}
    />
  );
}

export default TestJson;
