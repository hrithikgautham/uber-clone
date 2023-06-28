import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react';
import { Icon } from '@rneui/base';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "Map",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "Eats", // Change in future..
  },
];

const NavOptions = () => {
  const nav = useNavigation();
  const origin = useSelector(selectOrigin)

  return (
    <FlatList
      data={data}
      horizontal
      renderItem={({ item, }) => (<TouchableOpacity disabled={!origin} className="p-4 bg-gray-200 ml-2" style={{ opacity: origin ? 1 : 0.5 }} onPress={() => {
        nav.push(item.screen)
      }}>
        {/* <Text>{item.title}</Text> */}
        <Image
          source={{
            uri: item.image
          }}
          className="h-20 w-20"
        />
        <Text className="font-bold mt-2 text-base">{item.title}</Text>
        <Icon style={tw`bg-black p-2 rounded-full w-10 self-center`} type='antdesign' name='arrowright' color={'white'} />
      </TouchableOpacity>)}
    />
  )
}

export default NavOptions