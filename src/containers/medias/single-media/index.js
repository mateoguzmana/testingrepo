import React, { Component } from "react";
import { Rating } from 'react-native-elements';
import Swipeout from "react-native-swipeout";
import { Alert, Image, Text, View } from "react-native";
import images from "../../assets/images";

class SingleMedia extends Component {
    state = {
        rating: false
    };

    onRate(rate) {
        const { image, onRate } = this.props;
        Alert.alert(
            'Rate Location',
            `Are you sure you want to rate this place with ${rate} stars?`,
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                {
                    text: 'Yes', onPress: () => {
                        //onRate(image.id, rate);
                        this.setState({ rating: false });
                    }
                },
            ],
            { cancelable: false }
        );
    }

    renderImage = image => {
        const { uri } = image;
        
        return (
            <Image source={{ uri }} style={styles.image} />
        );
    }
    
    renderLocation = location => {
        const { altitude, heading, latitude, longitude, speed } = location;
    
        return (
            <View>
                <Text>Altitude: {altitude}</Text>
                <Text>Heading: {heading}</Text>
                <Text>Latitude: {latitude}</Text>
                <Text>Longitude: {longitude}</Text>
                <Text>Speed: {speed}</Text>
            </View>
        );
    }

    render () {
        const { image, location, timestamp } = this.props.media;

        return this.state.rating ? (
            <Rating
                imageSize={25}
                onFinishRating={rate => this.onRate(rate)}
                showRating
                style={styles.rate}
            />
        ) : (
            <Swipeout 
                right={[
                    {
                        text: "Rate",
                        backgroundColor: "#1DACD6",
                        color: "#ffffff",
                        onPress: () => this.setState({ rating: true })
                    }
                ]}
                style={styles.swipeableItem}
            >
                <View style={styles.item}>
                    <View style={styles.firstColumn}>
                        <Text style={styles.whenStyle}>
                            {formatDate(timestamp, "MMM Do")}
                        </Text>
                        <Text style={styles.dayStyle}>
                            {formatDate(timestamp, "ddd")}
                        </Text>
                    </View>
                    {/*this.renderLocation(location)*/}
                    <View style={styles.rowSeparator} />
                        <View style={styles.itemColumn}>
                            <Text style={styles.locationHeader}>{this.renderImage(image)}</Text>
                            <Text style={styles.locationTime}>
                                {formatDate(timestamp, "HH:mm A")}
                            </Text>
                        </View>
                        <View style={styles.itemColumn}>
                            <Image source={images.eyeIcon} style={styles.eyeIcon} />
                        </View>
                </View>
            </Swipeout>
        );
    }
}

export default SingleMedia;
