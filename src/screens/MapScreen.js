import { TouchableOpacity, View, } from 'react-native'
import React from 'react'
import Map from '../components/Map';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationCard from '../components/NavigationCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';

const Stack = createStackNavigator();

const MapScreen = () => {


  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  return (
    <View>


      <View style={{ backgroundColor: "red" }} className="h-1/2">
        <Map origin={origin} destination={destination} setTravelTimeInformation={setTravelTimeInformation} />
      </View>
      <View style={{ backgroundColor: "blue" }} className="h-1/2">
        <Stack.Navigator>
          <Stack.Screen
            name="NavigationCard"
            component={NavigationCard}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }} />
        </Stack.Navigator>
      </View>
    </View >
  )
}

export default MapScreen