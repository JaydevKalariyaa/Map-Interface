"use client";

import {
  APIProvider,
  Map,
  ControlPosition,
  MapControl,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import * as turf from "@turf/turf";
import { useEffect, useState } from "react";
import ParcelPopupCard from "./ParcelPopupCard";
import { Polyline } from "./polyline";
import React from "react";
import { getColor } from "@/utils/common";
import Timeline from "./Timeline";
import Loader from "./Loader";

export default function GoogleMapComponent({ filters, categories, selectedAddress }) {
  // Use the selected address' coordinates for the center
  const center = {
    lat: selectedAddress?.value?.lat,
    lng: selectedAddress?.value?.lng,
  };

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [parcelData, setParcelData] = useState([]);
  const [filteredParcelData, setFilteredParcelData] = useState([]);
  const [mainParcel, setMainParcel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isLoading, setIsLoading] = useState(true);

  //add useEffect with fetch for data/categoryByParcel.json and store in one state
  const [categoryByParcel, setCategoryByParcel] = useState([]);
  const fetchCategoryByParcel = async () => {
    const response = await fetch("/data/categoryByParcel.json");
    const data = await response.json();
    setCategoryByParcel(data);
  };
  useEffect(() => {
    fetchCategoryByParcel();
  }, []);
  



  useEffect(() => {
    try{
      setIsLoading(true); 
      // Choose GeoJSON file based on the selected address
      const path =
        selectedAddress?.value?.address === "The Edison Arrowood"
          ? "/data/deep.geojson"
          : "/data/parcel2.geojson";
  
      fetch(path)
        .then((res) => res.json())
        .then((data) => {
  
         
          // Map your new GeoJSON into the fields your app expects.
          const features = data.map((item, idx) => ({
            ...item,
            mainCategory:categoryByParcel?.find((cat) => cat.PARCEL_LID === item.properties.id)?.ZONING_CATEGORY,
            properties: {
              ...item.properties,
              prclId: item.properties.apn,
              id: item.properties.id, // using APN as the unique id (alternatively you could use legalDescription)
              category: item.properties.category,
              fullAddress: `${item.properties.address.street}, ${item.properties.address.city}, ${item.properties.address.state} ${item.properties.address.zip}`,
         
              // you can pass additional fields if needed
            },
            geometry: item.geometry, // geometry is directly here now
          }));
  
          setParcelData(features);
          setFilteredParcelData(features);
  
          const point = turf.point([center.lng, center.lat]);
  
          // // Find the parcel that contains the given center point.
          const containingParcel = features.find((parcel) => {
  
           
            // Create a polygon feature from geometry.coordinates[0]
            const polygon = turf.polygon(parcel.geometry.coordinates);
            return turf.booleanPointInPolygon(point, polygon);
          });
         
           setMainParcel(containingParcel);
            setIsLoading(false);
        });
    }catch (error) {    
      console.error("Error fetching parcel data:", error);
       setIsLoading(false);
    }finally{
       setIsLoading(false);
    }
   
  }, [selectedAddress, center.lng, center.lat,categoryByParcel]);

  useEffect(() => {
    if (parcelData) {
      // Filter based on the provided filters and parcel category.
      const newFeatures = parcelData.filter((feature) => {
        const category = feature?.mainCategory;

    
        return (
          filters.length === 0 ||
          filters.includes(category)
        );
      });

     
      setFilteredParcelData(newFeatures);
    }
  }, [filters, parcelData]);
  console.log(isLoading,"isLoading")

 if(isLoading) {
  return <Loader text="Loading map data..." />
}
  return (
    
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="relative w-full h-screen">
        <Map
          defaultCenter={center}
          // center={center}
          defaultZoom={16}
          mapTypeId="satellite"
          mapId={"satellite"}
          style={{ width: "100%", height: "100%" }}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
          }}
          onLoad={() => setIsLoading(false)}
        >
       
            <AdvancedMarker
              position={center}
              title="Map Center"
              options={{
                icon: {
                  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  size: { width: 64, height: 64 },
                  scaledSize: { width: 108, height: 64 },
                },
              }}
            />
        

          <MapControl position={ControlPosition.TOP_RIGHT}>
            {parcelData?.map((parcel, index) => {

            
              // Get the coordinates from parcel.geometry
              const coordinates = parcel.geometry.coordinates?.[0];
              if (!coordinates) return null;

              // Convert coordinates for the Polyline:
              const polygonPath = parcel.geometry.coordinates[0]
              .filter(([lng, lat]) => typeof lat === "number" && typeof lng === "number" && !isNaN(lat) && !isNaN(lng))
              .map(([lng, lat]) => ({ lat, lng }));

              const centroid = polygonPath.reduce(
                (acc, point, _, arr) => ({
                  lat: acc.lat + point.lat / arr.length,
                  lng: acc.lng + point.lng / arr.length,
                }),
                { lat: 0, lng: 0 }
              );

              // Calculate centroid using Turf’s centerOfMass:
              // const centroidFeature = turf.centerOfMass({
              //   type: "Feature",
              //   geometry: parcel.geometry,
              // });
              // const [lng, lat] = centroidFeature.geometry.coordinates;
              // // Alternatively, you can compute an average if needed:
              // const centroid = { lat, lng };

              return (
                <React.Fragment key={parcel.properties.id || index}>
                  {/* Parcel polygon */}
                  <Polyline
                    path={polygonPath}
                    options={{
                      strokeColor:
                        mainParcel?.properties?.id === parcel.properties.id
                          ? "red"
                          : "white",
                      strokeOpacity: 1,
                      strokeWeight:
                        mainParcel?.properties?.id === parcel.properties.id
                          ? 6
                          : 4,
                    
                    }}
                  />

{centroid &&
                    filteredParcelData.some(
                      (item) => item.properties.id === parcel.properties.id
                    ) && (
                      <AdvancedMarker
                        position={centroid}
                        title={parcel?.properties?.fullAddress}
                        onClick={() => setSelectedParcel(parcel)}
                      >
                        <div
                          className="bg-white p-1 border rounded shadow text-xs font-semibold"
                          style={{
                            backgroundColor: getColor(
                              parcel?.mainCategory
                            )?.background,
                            color: getColor(
                              parcel?.mainCategory
                            )?.text,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {index + 1}
                        </div>
                      </AdvancedMarker>
                    )}

                
                </React.Fragment>
              );
            })}
          </MapControl>
        </Map>

       
        {selectedParcel && (
          <div className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
            <ParcelPopupCard
              feature={selectedParcel}
              setSelectedFeature={setSelectedParcel}
            />
          </div>
        )}

       
      </div>
    </APIProvider>
  );
}
