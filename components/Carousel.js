import { View, Text } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";


const Carousel = () => {
    const images = [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
    ]
    return (
        <View>
            <SliderBox
                images={images}
                autoPlay
                circleloop
                dotColor={'#13274F'}
                inactiveDotColor='#90A4AE'
                ImageComponentStyle={{
                    borderRadirus: 6,
                    width: '94%',

                }} />
        </View>
    )
}

export default Carousel