import { View, Text, SafeAreaView, Pressable, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Carousel from '../components/Carousel';



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

    return (
        <SafeAreaView>
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

            <Carousel />
        </SafeAreaView>
    )
}

export default HomeScreen