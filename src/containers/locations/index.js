// @vendors
import React from 'react';
import { ScrollView, Text, View } from "react-native";
import { compose, graphql } from 'react-apollo';

// @components
import SingleLocation from './single-location';

// @styling
import styles from './styles';

// @queries
import { DeleteLocationGraphQLQuery, ListLocationsGraphQLQuery } from './queries';

class Locations extends Component {
    constructor(props) {
        super(props);
    }

    onRate(location, rate) {
       // call the graphql mutation here with onRate prop
       // this.props.onRate(location)
       alert(`rating location ${location} with ${rate} stars.`);
    }

    render() {
        const { locations, error, userStorylines } = this.props;
        console.log("userstorylines", userStorylines);
        return (
            error ?
                <Text>{ error.message }</Text>
                :
                <View style={ styles.allEventPageStyle }>
                    <ScrollView contentContainerStyle={ styles.scroller } refreshing={ true }>
                        <View style={ styles.container }>{
                            [].concat(locations).sort(LocationsComparator.byCreated).map((location, i) =>
                                <SingleLocation key={i} location={location} onRate={(location, rate) => this.onRate(location, rate)}/>
                            )
                        }
                        {
                            // render mock images
                            // mockMedia.map((media, i) => <SingleMedia media={media} key={i}/>)
                        }
                        </View>
                    </ScrollView>
                </View>
        );
    }
}

export default compose(
    graphql(ListLocationsGraphQLQuery, {
        options: { fetchPolicy: 'cache-and-network' },
        props: props => {
            return {
                locations: props.data.listLocations ? props.data.listLocations.items : [],
            }
        }
    }),
    graphql(DeleteLocationGraphQLQuery, {
        options: {
            fetchPolicy: 'cache-and-network',
            refetchQueries: [{ query: ListLocationsGraphQLQuery }],
            update: (dataProxy, { data: { deleteLocation: { id } } }) => {
                console.log('updating');
                const query = ListLocationsGraphQLQuery;
                const data = dataProxy.readQuery({ query });
                data.listLocations.items = data.listLocations.items.filter(location => location.id !== id);
                dataProxy.writeQuery({ query, data });
            }
        },
        props: props => ({
            onDelete: (location) => {
                console.log('deleting: ' + location);
                props.mutate({
                    variables: { id: location.id },
                    optimisticResponse: () => ({
                        deleteLocation: {
                            ...location,
                            __typename: 'Location'
                        }
                    }),
                })
            }
        })
}))(Locations); // Locations