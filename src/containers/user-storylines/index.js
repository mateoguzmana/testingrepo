// @vendors
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome'
// @styling
import styles from './styles';
// @queries
import { ListUserStorylines } from './queries';
// @utils
import { formatDate, sortByDate } from '../../utils/format-date';

// @storage
import { cacheStorage } from '../../config/storage';

const UserStorylines = ({ loading, userStorylines }) => {
    console.log(userStorylines);
    return (
        loading ? (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Hey, we're creating your Storyline. It could take a while. :)</Text>
                <ActivityIndicator/>
            </View>
        ) : (
            <View style={ styles.allEventPageStyle }>
                <ScrollView contentContainerStyle={ styles.scroller } refreshing={ true }>
                    <View style={ styles.container }>
                        {
                            userStorylines ?
                                sortByDate(userStorylines, 'created')
                                    .map(({ created, metaData, type }, index) => {
                                        return (
                                            <Swipeout
                                                right={ [
                                                    {
                                                        text: 'Rate',
                                                        backgroundColor: '#1DACD6',
                                                        color: '#ffffff',
                                                        onPress: () => this.setState({ rating: true })
                                                    }
                                                ] }
                                                key={ index }
                                                style={ styles.swipeableItem }
                                                autoClose={ true }>
                                                <View style={ styles.item }>
                                                    <View style={ styles.firstColumn }>
                                                        <Text
                                                            style={ styles.whenStyle }>{ formatDate(created, 'MMM Do') }</Text>
                                                        <Text
                                                            style={ styles.dayStyle }>{ formatDate(created, 'ddd') }</Text>
                                                        <Text
                                                            style={ styles.yearStyle }>{ formatDate(created, 'YYYY') }</Text>
                                                    </View>
                                                    <View style={ styles.rowSeparator }/>
                                                    {
                                                        type === 'BUSINESS' ?
                                                            <View style={ styles.itemColumn }>
                                                                <Text
                                                                    style={ styles.locationHeader }>{ `${metaData[0].value}` }</Text>
                                                            </View>
                                                            :
                                                            type === "MEDIA" ?
                                                                null
                                                                :
                                                                <View style={ styles.itemColumn }>
                                                                    <Text
                                                                        style={ styles.locationHeader }>{ `${metaData[2].value}, ${metaData[1].value}, ${metaData[0].value}` }</Text>
                                                                </View>
                                                    }
                                                    {

                                                        type === 'BUSINESS' ?
                                                            <View style={ styles.itemColumn }>
                                                                <Icon
                                                                    name={ 'building-o' }
                                                                    size={ 30 }
                                                                    style={ styles.icon }/>
                                                            </View>
                                                            :
                                                            type === "MEDIA" ?
                                                                <View
                                                                    style={ styles.itemColumn }>
                                                                    <Image
                                                                        source={ { uri: metaData[0].value } }
                                                                        style={ styles.image }/>
                                                                </View>
                                                                :
                                                                null
                                                    }
                                                </View>
                                            </Swipeout>
                                        )
                                    }) : null
                        }
                    </View>
                </ScrollView>
            </View>
        )
    )
}

export default compose(
    graphql(ListUserStorylines, {
        options: { fetchPolicy: 'cache-and-network', pollInterval: 15000 },
        props: props => {
            console.log(props);
            console.log("Cache", cacheStorage)
            /* if(props.data.getUserStorylines && props.data.getUserStorylines.length !== cacheStorage.totalMediaLength + 1) {
                return {
                    loading: true,
                    userStorylines: []
                }
            } */
            return {
                loading: false,
                userStorylines: props.data ? props.data.getUserStorylines : []
            }
        }
    })
)(UserStorylines);
