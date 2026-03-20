import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState, useRef } from 'react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const CENTER = { lat: 6.2058, lng: -1.6841 }; // Obuasi, Ashanti Region, Ghana

export function Map({ pickup, dropoff, onLocationSelect, onRouteCalculated }: { pickup: any, dropoff: any, onLocationSelect: (loc: any) => void, onRouteCalculated?: (info: any) => void }) {
  if (!hasValidKey) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 rounded-xl">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Google Maps API Key Required</h2>
          <p className="text-sm">Please add GOOGLE_MAPS_PLATFORM_KEY to your secrets.</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <div className="w-full h-full rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <GoogleMap
          defaultCenter={CENTER}
          defaultZoom={13}
          mapId="GHANA_RICKSHAW_MAP"
          // @ts-ignore
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          onClick={(e) => {
            if (e.detail.latLng) {
              onLocationSelect({ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng });
            }
          }}
        >
          {pickup && (
            <AdvancedMarker position={pickup}>
              <Pin background="#22c55e" glyphColor="#fff" borderColor="#16a34a" />
            </AdvancedMarker>
          )}
          {dropoff && (
            <AdvancedMarker position={dropoff}>
              <Pin background="#ef4444" glyphColor="#fff" borderColor="#dc2626" />
            </AdvancedMarker>
          )}
          <RouteDisplay origin={pickup} destination={dropoff} onRouteCalculated={onRouteCalculated} />
        </GoogleMap>
      </div>
    </APIProvider>
  );
}

function RouteDisplay({ origin, destination, onRouteCalculated }: { origin: any, destination: any, onRouteCalculated?: (info: any) => void }) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!routesLib || !map || !origin || !destination) return;
    
    polylinesRef.current.forEach(p => p.setMap(null));

    // @ts-ignore
    routesLib.Route.computeRoutes({
      origin,
      destination,
      travelMode: 'DRIVING',
      routingPreference: 'TRAFFIC_AWARE',
      fields: ['path', 'viewport', 'distanceMeters', 'durationMillis'],
    }).then(({ routes }: any) => {
      if (routes?.[0]) {
        const newPolylines = routes[0].createPolylines();
        newPolylines.forEach((p: any) => p.setMap(map));
        polylinesRef.current = newPolylines;
        if (routes[0].viewport) map.fitBounds(routes[0].viewport);
        if (onRouteCalculated) {
          onRouteCalculated({
            distanceMeters: routes[0].distanceMeters,
            durationMillis: routes[0].durationMillis
          });
        }
      } else {
        if (onRouteCalculated) onRouteCalculated(null);
      }
    }).catch(() => {
      if (onRouteCalculated) onRouteCalculated(null);
    });

    return () => polylinesRef.current.forEach(p => p.setMap(null));
  }, [routesLib, map, origin, destination, onRouteCalculated]);

  return null;
}
