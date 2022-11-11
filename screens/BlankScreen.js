import React from 'react';
import { MapView } from '@draftbit/maps';
import { ScreenContainer } from '@draftbit/ui';
import { StyleSheet } from 'react-native';

const BlankScreen = props => {
  const mapViewaHf0RvycRef = React.useRef();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <MapView
        style={styles.MapViewc992f941}
        latitude={37.40241}
        longitude={-122.12125}
        zoom={8}
        zoomEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        loadingEnabled={true}
        showsPointsOfInterest={true}
        ref={mapViewaHf0RvycRef}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({ MapViewc992f941: { flex: 1 } });

export default BlankScreen;
