import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}
export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  function getLocation() {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation capabilities are unavailable",
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Access to location services was denied. Please enable location permissions in your settings";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Unable to retrieve location data at the moment";
            break;
          case error.TIMEOUT:
            errorMessage =
              "The attempt to fetch location data has timed out. Please try again";
            break;
          default:
            errorMessage =
              "An unexpected error has occurred. Please try again later";
        }
                setLocationData({
                    coordinates: null,
                    error: errorMessage,
                    isLoading: false,
                });
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
