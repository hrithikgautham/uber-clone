import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from "@rneui/base";
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street, London, UK",
    coordinates: {
      lat: 47.5072178,
      lng: -0.1288862,
    }
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye, London, UK",
    coordinates: {
      lat: 49.5072178,
      lng: 1.1275862,
    }
  },
]

const NavFavourites = ({ navigateTo, dispatchParam, }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <FlatList className="mt-5 pl-5" data={data} keyExtractor={item => item.id} renderItem={({ item: {
      location, destination, icon, coordinates,
    } }) => (
      <TouchableOpacity onPress={() => {
        dispatch(dispatchParam({
          location: coordinates,
          description: location,
        }));
        navigation.navigate(navigateTo);
      }} className="flex-row items-center mb-5">
        <Icon
          className="m-4 rounded-full"
          name={icon}
          type='ionicon'
          color="black"
          size={20} />

        <View className="ml-3">
          <Text className="font-bold text-lg">{location}</Text>
          <Text className="text-gray-400">{destination}</Text>
        </View>
      </TouchableOpacity>
    )}
      ItemSeparatorComponent={() => (
        <View className="bg-gray-200" style={[{ height: 0.5, }]} />
      )} />
  )
}

export default NavFavourites