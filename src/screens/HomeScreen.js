import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin, } from "../slices/navSlice";
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {

  const dispatch = useDispatch();

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <View className="p-5">
        <Image
          style={{
            resizeMode: "contain"
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
          className="h-20 w-20"
        />
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18
            }
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={500}
          placeholder='Search'
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.descripiton,
            }))
          }}
          enablePoweredByContainer={false}
          query={{
            key: 'AIzaSyAkN7wB8muFPgM7E1Y_RmQ74llRXqhG2YQ',
            language: 'en',
          }}
        />
        <NavOptions />
        <NavFavourites navigateTo={"Map"} dispatchParam={setOrigin} />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;