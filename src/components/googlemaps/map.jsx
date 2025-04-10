"use client";

import {
  APIProvider,
  Map,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Marker,
  InfoWindow
} from "@vis.gl/react-google-maps";
import * as turf from '@turf/turf'
import { useEffect, useState } from "react";
import ParcelPopupCard from "./ParcelPopupCard";
import { Polyline } from "./polyline";
import React from "react";
import { getColor } from "@/utils/common";
import Timeline from "./Timeline";



export default function GoogleMapComponent({ filters,categories, selectedAddress }) {
  const center ={ lat:selectedAddress?.value?.lat, lng: selectedAddress?.value?.lng };
  // const center={lat:41.4378,lng:-81.6852}
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [parcelData, setParcelData] = useState([]);
  const [filteredParcelData, setFilteredParcelData] = useState([]);
 const [mainParcel,setMainParcel]=useState(null)
 const [selectedYear,setSelectedYear]=useState(2025)



  const getcategoryFromSubCategory =(subcategory) => {
   
    const category = categories.find((cat) => cat.subcategories.includes(subcategory));
    return category ? category.name : null;
  }

  useEffect(() => {
    const path=selectedAddress?.value?.address==="701 NICOLLET MALL, MINNEAPOLIS, MN 55402"?"/data/newParcels.geojson":'/data/parcel2.geojson'
    //  const path='/data/parcel2.geojson'
   
    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        const features = data.map((item, idx) => ({
          ...item,
          properties: {
            prclId: item.PARCEL_LID,
            category:item.USE_CODE_MUNI_DESC, // Update if you have real category
            address: item.SITE_ADDR || item.BUILDING_ADDRESS || "Unknown"
          },
          geometry: item.PARCEL_GEOJSON,
          buildingGeometry: item.BUILDING_GEOJSON,
          buildingAddress: item.BUILDING_ADDRESS,
          buildingInfo: {
            height: item.HEIGHT_MAX_FT,
            area: item.AREA_SQFT
          }
        }));

        setParcelData(features);
        setFilteredParcelData(features);

        const point = turf.point([center.lng, center.lat]);

        // Loop and find the parcel that contains the point
        const containingParcel = features?.find(parcel => {
          const polygon = turf.polygon(parcel.PARCEL_GEOJSON.coordinates[0]);
          return turf.booleanPointInPolygon(point, polygon);
        });
        
        setMainParcel(containingParcel);
      

      });
  }, [selectedAddress]);

  useEffect(() => {
    if (parcelData) {


      const newFeatures = parcelData.filter((feature) => {
        const  category  = feature.USE_CODE_MUNI_DESC || "COMMERCIAL"; 
        return filters.length === 0 || filters.some((filter) => filter.subcategories.some((sub) => sub === category));
      });
      setFilteredParcelData(newFeatures);
    }
  }, [filters, parcelData]);

  useEffect(() => {
    if (selectedYear) {
   
      setFilteredParcelData((old)=>old.slice(2));
      
    }
  }, [selectedYear]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="relative w-full h-screen">
        <Map
          defaultCenter={center}
          center={center}
          defaultZoom={17}
          mapTypeId="satellite"
           mapId={"satellite"}
          style={{ width: "100%", height: "100%" }}
          options={{
            fullscreenControl: false, // ❌ disables the fullscreen button
            streetViewControl: false, // ❌ disables the street view button
            // Optionally:
            // disableDefaultUI: true, // disables ALL controls if you want a clean map
          }}
          // onClick={() => setSelectedParcel(null)}
        >
{ selectedYear % 2 === 1 && <AdvancedMarker
  position={center}
  title="Map Center"
  options={{
    icon: {
      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      size: { width: 64, height: 64 }, // fallback scaling
      scaledSize: { width: 108, height: 64 }, // increases visible size
    },
  }}
/>}

          <MapControl position={ControlPosition.TOP_RIGHT}>


        
            {filteredParcelData?.map((parcel, index) => {

             
              const coordinates = parcel.geometry.coordinates?.[0]?.[0];
             
              if (!coordinates) return null;

              const polygonPath = coordinates.map(([lng, lat]) => ({
                lat,
                lng
              }));
              const centroidFeature = turf.centerOfMass({
                type: "Feature",
                geometry: parcel?.geometry
              });
              const [lng, lat] = centroidFeature.geometry.coordinates;

// Now use lat/lng to place your marker or whatever
// const centroid = { lat, lng };
        
               // Calculate centroid for placing marker
          const centroid = polygonPath.reduce(
            (acc, point, _, arr) => ({
              lat: acc.lat + point.lat / arr.length,
              lng: acc.lng + point.lng / arr.length,
            }),
            { lat: 0, lng: 0 }
          );

          

              return (
                <React.Fragment key={parcel.properties.prclId || index}>
                  {/* Parcel polygon */}
                  <Polyline
                    path={polygonPath}
                    options={{
                      strokeColor: mainParcel?.PARCEL_LID===parcel?.PARCEL_LID?"red": "white",
                     
                      strokeOpacity: 1,
                      strokeWeight: mainParcel?.PARCEL_LID===parcel?.PARCEL_LID? 6:4
                    }}
                  
                  />

                  {/* Building marker */}
                  {centroid  && (
                    <AdvancedMarker
                      position={centroid}
                      title={ parcel?.BUILDING_ADDRESS}
                      onClick={() => setSelectedParcel(parcel)}
                    >
                      <div
                        className="bg-white p-1 border rounded shadow text-xs font-semibold"
                        style={{
                          backgroundColor: getColor(getcategoryFromSubCategory(parcel.properties.category))?.background,
                          color: getColor(getcategoryFromSubCategory(parcel.properties.category))?.text,
                        
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                      {index+1}
                      </div>
                    </AdvancedMarker>
                  )}
                </React.Fragment>
              );
            })}
          </MapControl>
        </Map>

        {/* Popup card */}
        {selectedParcel && (
          <div className="fixed top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
            <ParcelPopupCard
              feature={selectedParcel}
              setSelectedFeature={setSelectedParcel}
            />
          </div>
        )}

<div className="absolute top-4 right-4 z-50">
    <Timeline year={selectedYear} onChange={setSelectedYear} />
  </div>
      </div>
    </APIProvider>
  );
}
