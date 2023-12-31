import { View, Text, SafeAreaView, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { MaterialIcons, Feather } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';



const HomeScreen = () => {

    const [displayCurrentAddress, setdisplayCurrentAddress] = useState('We are loading your location')
    const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);

    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, []);

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                'Location services not enabled',
                'Plase enable the location services',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);

        } else {
            setlocationServicesEnabled(enabled)
        }
    };

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                'Premission denied',
                'Allow the app to use the location services',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
        };

        const { coords } = await Location.getCurrentPositionAsync();
        // console.log(coords)

        if (coords) {
            const { latitude, longitude } = coords;

            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`;
                setdisplayCurrentAddress(address);
            }

        }
    }

    const services = [
        {
            id: "0",
            image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
            name: "shirt",
            quantity: 0,
            price: 10,
        },
        {
            id: "11",
            image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
            name: "T-shirt",
            quantity: 0,
            price: 10,
        },
        {
            id: "12",
            image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
            name: "dresses",
            quantity: 0,
            price: 10,
        },
        {
            id: "13",
            image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
            name: "jeans",
            quantity: 0,
            price: 10,
        },
        {
            id: "14",
            image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
            name: "Sweater",
            quantity: 0,
            price: 10,
        },
        {
            id: "15",
            image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
            name: "shorts",
            quantity: 0,
            price: 10,
        },
        {
            id: "16",
            image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
            name: "Sleeveless",
            quantity: 0,
            price: 10,
        },
    ];


    return (
        <ScrollView style={{ backgroundColor: '#F0F0F0', flex: 1, marginTop: 50 }}>
            {/* Location and Profile */}
            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <MaterialIcons name="location-on" size={24} color="#fd5c63" />
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
                    <Text>{displayCurrentAddress}</Text>
                </View>

                <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                        source={{
                            uri: "https://lh3.googleusercontent.com/ogw/AGvuzYbwCZoJHoW0FYgSyrZTE2J_KiJir0OKCxvJ2qwz=s32-c-mo"
                        }} />
                </Pressable>
            </View>

            {/* Search Bar */}
            <View style={{ padding: 10, margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0.8, borderColor: "#C0C0C0", borderRadius: 7 }}>
                <TextInput placeholder='Search for items for More' />
                <Feather name="search" size={24} color="#fd5c63" />
            </View>
            {/* Image Carousel */}
            <Carousel />

            {/* Services Component */}
            <Services />

            {/* Render all the Products */}
            {services.map((item, index) => (
                <DressItem item={item} key={index} />
            ))}
        </ScrollView>
    )
}

export default HomeScreen