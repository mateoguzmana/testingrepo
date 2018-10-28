// @vendors
import React from 'react';
import { Alert, Image, Text, View } from "react-native";
import { Rating } from 'react-native-elements';
import Swipeout from "react-native-swipeout";

// @utils
import { formatDate } from '../../../utils/format-date';

// @styling
import styles from './styles';

class SingleLocation extends Component {
    state = {
        rating: false
    };

    onRate(rate) {
        const { location, onRate } = this.props;
        Alert.alert(
            'Rate Location',
            `Are you sure you want to rate this location with ${rate} stars?`,
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                {
                    text: 'Yes', onPress: () => {
                        onRate(location.id, rate);
                        this.setState({ rating: false });
                    }
                },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { location } = this.props;
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
                key={location.id}
                style={styles.swipeableItem}
                autoClose={true}
            >
                <View style={styles.item}>
                    <View style={styles.firstColumn}>
                        <Text style={styles.whenStyle}>
                            {formatDate(location.created, "MMM Do")}
                        </Text>
                        <Text style={styles.dayStyle}>
                            {formatDate(location.created, "ddd")}
                        </Text>
                    </View>
                    <View style={styles.rowSeparator} />
                    <View style={styles.itemColumn}>
                        <Text style={styles.locationHeader}>{location.connection.ip}</Text>
                        <Text style={styles.locationTime}>
                            {formatDate(location.created, "HH:mm A")}
                        </Text>
                        {location.note ? (
                            <Text style={styles.locationNote}>Note: {location.note} </Text>
                        ) : null}
                    </View>
                    <View style={styles.itemColumn}>
                        {location.connection.type === "wifi" ? (
                            <Image source={images.wifiIcon} style={styles.wifiIcon} />
                        ) : (
                                <Text style={styles.locationHeader}>
                                    {location.connection.type}
                                </Text>
                            )}
                    </View>
                </View>
            </Swipeout>
        );
    }
}

export default SingleLocation;
