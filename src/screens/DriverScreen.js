import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Map from '../components/Map'
import { useDispatch, useSelector } from 'react-redux'
import { selectDriverLocation, selectOrigin, setDriverLocation, setDriverTravelTimeToPickUpPoint } from '../slices/navSlice'

const DriverScreen = () => {

  const dispatch = useDispatch();
  const driverLocation = useSelector(selectDriverLocation);
  const origin = useSelector(selectOrigin);

  let timer = null;
  useEffect(() => {

    let lat = driverLocation.location.lat;
    let lng = driverLocation.location.lng;

    if (lat > origin.location.lat) {
      lat -= 0.1;
    }
    else {
      lat = origin.location.lat;
    }

    if (lng > origin.location.lng) {
      lng -= 0.1;
    }
    else {
      lng = origin.location.lng;
    }

    if (lat == origin.location.lat && lng == origin.location.lng) {
      clearInterval(timer);
    }

    dispatch(setDriverLocation({
      ...driverLocation,
      location: {
        lat,
        lng,
      }
    }))

  }, [])



  return (
    <View>
      <Map origin={driverLocation} destination={origin} setTravelTimeInformation={setDriverTravelTimeToPickUpPoint} />
    </View>
  )
}

export default DriverScreen