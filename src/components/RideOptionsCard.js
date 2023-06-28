import { View, Text, SafeAreaView, Keyboard, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, selectTravelTimeInformation, setDriverLocation } from '../slices/navSlice';

const data = [
  {
    id: "Uber-X-1234",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
  {
    id: "Uber-X-12345",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();

  const [selectedCar, setSelectedCar] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const SURCHARGE_RATE = 1.5;
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => {
          navigation.navigate('NavigationCard')
        }} className="absolute left-0 p-2 m-3 bg-black rounded-full z-10">
          <Icon name="chevron-left" type='fontawesome' color="white" />
        </TouchableOpacity>
        <Text className="text-center text-xl p-5 font-bold">Select a Ride - {travelTimeInformation?.distance.text}</Text>
      </View>

      <FlatList
        data={data}
        className="mb-28"
        keyExtractor={item => item.id}
        renderItem={({ item: { image, id, title, multiplier, } }) => (
          <TouchableOpacity onPress={() => {
            setSelectedCar({ image, id, title, multiplier, })
          }} className={`flex-row items-center justify-between px-3 ${id === selectedCar?.id && 'bg-gray-200'}`}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image, }} />

            <View>
              <Text className="text-xl font-semibold">
                {title}
              </Text>
              <Text>
                {travelTimeInformation?.duration.text} Travel Time
              </Text>

            </View>
            <Text className="text-lg font-bold">
              {
                new Intl.NumberFormat("en-inr", {
                  style: "currency",
                  currency: "INR",
                }).format(
                  travelTimeInformation?.duration.value * SURCHARGE_RATE * multiplier
                )
              }
            </Text>
          </TouchableOpacity>
        )}
      />
      {
        selectedCar && <TouchableOpacity onPress={() => {
          dispatch(setDriverLocation({
            location: {
              lat: origin.location.lat + 1,
              lng: origin.location.lng + 1,
            },
            description: origin.description,
          }))
          navigation.navigate("Driver");
        }} disabled={!selectedCar} className="bg-black p-3 absolute bottom-28 w-10/12 self-center">
          <Text className="text-center font-semibold text-lg text-white">Choose {selectedCar?.title}</Text>
        </TouchableOpacity>
      }
    </SafeAreaView>
  )
}

export default RideOptionsCard