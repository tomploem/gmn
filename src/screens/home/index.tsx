import {SafeAreaView, View} from "react-native";
import React, {useRef, useState} from "react";
import {Props} from "../../typings/router";
import tailwind from "twrnc";

import Mapbox, { ShapeSource, HeatmapLayer, Camera, MapView, CircleLayer } from '@rnmapbox/maps';
import Config from "react-native-config";
import {useMediaContent} from "../../hooks/useMediaContent";
import {OnPressEvent} from "@rnmapbox/maps/lib/typescript/types/OnPressEvent";

Mapbox.setAccessToken(Config.MAPBOX_API_KEY || '');


export default function Home ({ navigation }: Props<'Home'>) {
  const { data } = useMediaContent();
  const [zoomLevel, setZoomLevel] = useState(14);
  const mapRef = useRef<MapView>(null);

  const onRegionDidChange = async () => {
    if (mapRef.current) {
      const currentZoomLevel = await mapRef.current.getZoom();
      setZoomLevel(currentZoomLevel);
    }
  };

  const heatmapRadius = Math.max(10, 70 - (2 * zoomLevel)); // Adjusted formula

  function handleOnPress (event: OnPressEvent) {
    const feature = event.features[0];
    const id = feature?.id?.toString();
    if (id) {
      navigation.navigate('Post', { id });
    }
  }

  return (
    <SafeAreaView >
      <View style={tailwind`h-full`}>
        <MapView style={tailwind`h-full flex-1`} onMapIdle={onRegionDidChange} ref={mapRef}>
          <Camera zoomLevel={zoomLevel} centerCoordinate={[4.4780, 51.0250]} />
          <ShapeSource
            id="heatmapSource"
            onPress={handleOnPress}
            shape={{
              type: 'FeatureCollection',
              features: data.map((item) => ({
                type: 'Feature',
                id: item.id,
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [item.location.longitude, item.location.latitude],
                },
              })),
            }}
          >
            <HeatmapLayer id="heatmapLayer" sourceID="heatmapSource" style={{ heatmapRadius }} />
            <CircleLayer
              id="circleLayer"
              sourceID="heatmapSource"
              style={{
                circleRadius: 5,
                circleOpacity: 0.1,  // Make it barely visible for testing
              }}
            />
          </ShapeSource>
        </MapView>
      </View>
    </SafeAreaView>
  )
}
