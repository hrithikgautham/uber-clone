import { View, Text, Alert, TouchableOpacity, } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import { useDispatch, } from 'react-redux';
import MapViewDirections from "react-native-maps-directions"
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

const Map = ({ origin, destination, setTravelTimeInformation, }) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      }
    });

    async function getDistanceMatrix() {
      const data = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.location.lat},${destination.location.lng}&origins=${origin.location.lat},${origin.location.lng}&units=imperial&key=AIzaSyAkN7wB8muFPgM7E1Y_RmQ74llRXqhG2YQ`).then(res => res.json());
      dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
    }

    getDistanceMatrix();
  }, [origin, destination,]);

  return (
    <View>
      <TouchableOpacity className="absolute bg-gray-300 top-20 left-5 p-3 rounded-full shadow-md" onPress={() => {
        navigation.navigate("Home");
      }}>
        <Icon name="menu" color="black" />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        className="h-full"
        provider={PROVIDER_GOOGLE}
        mapType='standard'
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {
          origin && destination && <MapViewDirections
            origin={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            destination={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            apikey='AIzaSyAkN7wB8muFPgM7E1Y_RmQ74llRXqhG2YQ'
            strokeWidth={3}
            strokeColor='black' />
        }
        {
          origin?.location && <Marker coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }} description={origin.description}
            title="Origin"
            identifier='origin' />
        }
        {
          destination?.location && <Marker coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }} description={destination.description}
            title="Destination"
            identifier='destination' />
        }
      </MapView>
    </View>
  )
}

export default Map