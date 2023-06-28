import { View, SafeAreaView, TouchableOpacity, Text, } from 'react-native'
import React, { useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrigin, setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { Icon } from '@rneui/base'

const NavigationCard = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <SafeAreaView>
      <View>
        <View>
          <GooglePlacesAutocomplete
            placeholder='Where to?'
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={500}
            styles={{
              container: {
                backgroundColor: "white",
                padding: 20,
                flex: 0,
              },

            }}
            enablePoweredByContainer={false}
            fetchDetails
            query={{
              key: "AIzaSyAkN7wB8muFPgM7E1Y_RmQ74llRXqhG2YQ",
              language: "en"
            }}

            onPress={(data, details = null) => {
              dispatch(setDestination({
                location: details.geometry.location,
                description: data.description,
              }));

              navigation.navigate('RideOptionsCard')
            }}

          />
        </View>
        <NavFavourites navigateTo={"RideOptionsCard"} dispatchParam={setDestination} />
      </View>

      <View className="flex-row justify-evenly mt-auto">
        <TouchableOpacity className="bg-black w-24 rounded-full flex-row p-3 justify-between">
          <Icon name='car' type="font-awesome" color="white" size={16} />
          <Text className="text-white text-center font-semibold">Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity className=" w-24 rounded-full flex-row p-3 justify-between">
          <Icon name='fast-food-outline' type="ionicon" color="black" size={16} />
          <Text className="text-black text-center font-semibold">Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigationCard