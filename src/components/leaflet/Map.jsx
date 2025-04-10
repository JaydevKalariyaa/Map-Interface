"use client";

import { MapContainer, TileLayer, GeoJSON, useMap,ZoomControl } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RefreshIcon from "@mui/icons-material/Refresh";
import ReactDOMServer from "react-dom/server";
import ParcelPopupCard from "./ParcelPopupCard";
export default function Map({ filters }) {
  const [parcelData, setParcelData] = useState(null);
  const [filteredParcelData, setFilteredParcelData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [popupPos, setPopupPos] = useState(null);
  useEffect(() => {
    fetch("/data/parcels.geojson")
      .then((res) => res.json())
      .then((data) => {
        setParcelData({
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {
                  "category": "residential",
                  "owner": "Jane Doe",
                  "area": "4500 sqft",
                  "propertyType": "Single Family Home",
                  "address": "Chastain Meadows Pkwy NW, GA",
                  "lastUpdated": "2025-03-01",
                  "estimatedValue": "$550,000",
                  "image": "https://source.unsplash.com/600x400/?house"
                },
                "geometry": {
                  "type": "Polygon",
                  "coordinates": [
                    [
                      [-84.554619, 34.0320025],
                      [-84.5546725, 34.0320035],
                      [-84.554575, 34.0324385],
                      [-84.5556235, 34.0326105],
                      [-84.5556275, 34.0324835],
                      [-84.55564, 34.0320325],
                      [-84.55564, 34.032017499999995],
                      [-84.5556395, 34.031948],
                      [-84.5556415, 34.031866],
                      [-84.5556465, 34.031781],
                      [-84.55565399999999, 34.0316995],
                      [-84.55566449999999, 34.031615],
                      [-84.5556775, 34.031534],
                      [-84.55569299999999, 34.031453],
                      [-84.555711, 34.031372],
                      [-84.55563, 34.0312685],
                      [-84.555375, 34.031213],
                      [-84.5553175, 34.031201],
                      [-84.555257, 34.03119],
                      [-84.5551955, 34.0311805],
                      [-84.555137, 34.031173],
                      [-84.555078, 34.031167],
                      [-84.555016, 34.0311625],
                      [-84.554957, 34.0311595],
                      [-84.554895, 34.031158],
                      [-84.554636, 34.0311545],
                      [-84.554621, 34.0319205],
                      [-84.554619, 34.0320025]
                    ]
                  ]
                }
              }
            ]
          }
          );
        setFilteredParcelData({
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {
                  "category": "residential",
                  "owner": "Jane Doe",
                  "area": "4500 sqft",
                  "propertyType": "Single Family Home",
                  "address": "Chastain Meadows Pkwy NW, GA",
                  "lastUpdated": "2025-03-01",
                  "estimatedValue": "$550,000",
                  "image": "https://source.unsplash.com/600x400/?house"
                },
                "geometry": {
                  "type": "Polygon",
                  "coordinates": [
                    [
                      [-84.554619, 34.0320025],
                      [-84.5546725, 34.0320035],
                      [-84.554575, 34.0324385],
                      [-84.5556235, 34.0326105],
                      [-84.5556275, 34.0324835],
                      [-84.55564, 34.0320325],
                      [-84.55564, 34.032017499999995],
                      [-84.5556395, 34.031948],
                      [-84.5556415, 34.031866],
                      [-84.5556465, 34.031781],
                      [-84.55565399999999, 34.0316995],
                      [-84.55566449999999, 34.031615],
                      [-84.5556775, 34.031534],
                      [-84.55569299999999, 34.031453],
                      [-84.555711, 34.031372],
                      [-84.55563, 34.0312685],
                      [-84.555375, 34.031213],
                      [-84.5553175, 34.031201],
                      [-84.555257, 34.03119],
                      [-84.5551955, 34.0311805],
                      [-84.555137, 34.031173],
                      [-84.555078, 34.031167],
                      [-84.555016, 34.0311625],
                      [-84.554957, 34.0311595],
                      [-84.554895, 34.031158],
                      [-84.554636, 34.0311545],
                      [-84.554621, 34.0319205],
                      [-84.554619, 34.0320025]
                    ]
                  ]
                }
              }
            ]
          }
          );
      });
  }, []);

  useEffect(() => {
    if (parcelData) {
      const newFeatures = parcelData.features.filter((feature) => {
        const { category } = feature.properties;
        return filters.length === 0 || filters.includes(category);
      });
      setFilteredParcelData({ ...parcelData, features: newFeatures });
    }
  }, [filters, parcelData]);

  const getColor = (category) => {
    switch (category) {
      case "agricultural":
        return "#7CFC00";
      case "residential":
        return "#1E90FF";
      case "industrial":
        return "#FF8C00";
      default:
        return "#CCCCCC";
    }
  };

  const onEachFeature = (feature, layer) => {
    const popupHtml = ReactDOMServer.renderToString(
      <ParcelPopupCard feature={feature} />
    );
  
    layer.setStyle({
      fillColor: getColor(feature.properties.category),
      color: "#333",
      weight: 1,
      fillOpacity: 0.6,
    });
  
    layer.on("click", (e) => {
    //   layer.bindPopup(popupHtml, {
    //     maxWidth: 820,
    //     className: "custom-popup",
    //   }).openPopup();

    setSelectedFeature(feature);
    setPopupPos(e.latlng);
    });
  };
  console.log("Selected Feature:", selectedFeature);
    console.log("Popup Position:", popupPos);

  const ControlPanel = () => {
    const map = useMap();

    return (
        <div className="absolute top-4 right-4 z-[1000] bg-white rounded-xl shadow-xl p-2 flex flex-col gap-2">
        <button
          onClick={() => map.setZoom(map.getZoom() + 1)}
          className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition"
          title="Zoom In"
        >
          <ZoomInIcon className="text-blue-700" />
        </button>
        <button
          onClick={() => map.setZoom(map.getZoom() - 1)}
          className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition"
          title="Zoom Out"
        >
          <ZoomOutIcon className="text-blue-700" />
        </button>
        <button
          onClick={() => map.setView([34.0167, -84.5636], 16)}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          title="Reset View"
        >
          <RefreshIcon className="text-gray-800" />
        </button>
      </div>
    );
  };
console.log("Filtered Parcel Data:", filteredParcelData);
  return (
    <div className="relative flex-1">
      <MapContainer
         center={[34.03185555334993, -84.55514101758651]}
        zoom={16}
        zoomControl={false}
        className="h-full w-full z-0"
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Earthstar Geographics' />
        {filteredParcelData && (
          <GeoJSON data={filteredParcelData} onEachFeature={onEachFeature} key={JSON.stringify(filteredParcelData)}/>
        )}

{selectedFeature && (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      zIndex: 1000,
      transform: "translate(-50%, -50%)",
    }}
  >
    <ParcelPopupCard feature={selectedFeature} setSelectedFeature={setSelectedFeature}/>
  </div>
)}

         <ZoomControl position="topright" />
     
        <ControlPanel />
      </MapContainer>
    </div>
  );
}
