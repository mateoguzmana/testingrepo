import moment from "moment";
import { compose, graphql } from 'react-apollo';
import React, { Component } from "react";
import { TextInput, View } from "react-native";

/*
 * Creates Location props
 */
export const createLocation = component => compose(
    graphql(CreateLocationGraphQLQuery, {
        options: {
            fetchPolicy: 'cache-and-network',
            refetchQueries: [{ query: ListLocationsGraphQLQuery }]
        },
        props: props => ({
            onAddLocation: location => {
                console.log("[createLocation] creating");
                props.mutate({
                    variables: location,
                    optimisticResponse: {
                        __typename: 'Mutation',
                        createLocation: {
                            ...location,
                            __typename: 'Location'
                        }
                    }
                });
                console.log("[createLocation] created");
            },
            /* onAddMedia: media => {
             console.log("creating");
             props.mutate({
             variables: media,
             optimisticResponse: {
             __typename: 'Mutation',
             createMedia: {
             ...media,
             __typename: 'media'
             }
             }
             });
             console.log("created");
             }, */
            update: (dataProxy, { data: { createLocation } }) => {
                console.log("updating");
                const query = ListLocationsGraphQLQuery;
                const data = dataProxy.readQuery({ query });
                data.listLocations = {
                    ...data.listLocations,
                    items: [
                        ...data.listLocations.items,
                        createLocation
                    ]
                };
                dataProxy.writeQuery({ query, data });
                console.log("updated");
            }
        })
    })
)(component); // Create Location

/**
 * Wraps Create Location component.
 */
export const CreateLocation = createLocation(
    class _CreateLocation extends Component {
        constructor(props) {
            super(props);
            this.state = this.initialState = {
                id: '',
                name: ''
            };
            this._addLocation = this._addLocation.bind(this);
            this._SaveButton = (style) => LocationButton('Save', style, () => this._addLocation());
        }

        _addLocation() {
            const { id, name } = this.state;
            this.setState(this.initialState, () => {
                let created = moment.utc().format();
                let location = {
                    id, name, created
                };
                this.props.onAddLocation(location);
                this.props.navigation.goBack();
            });
        };

        render() {
            return (
                <View style={ styles.addLocationContainer }>
                    <View style={ styles.addLocationContentContainer }>
                        <TextInput autoFocus={ true }
                                   style={ styles.locationName }
                                   multiline={ false }
                                   value={ this.state.name }
                                   spellCheck={ false }
                                   onChangeText={ (value) => this.setState({ name: value }) }
                                   placeholderTextColor="#C1C1C1"
                                   placeholder="Name"/>
                    </View>
                    { iOS() ?
                        <View style={ styles.footer }>
                            { this._SaveButton(styles.buttonColor) }
                        </View>
                        :
                        this._SaveButton(styles.saveButtonStyle)
                    }
                </View>
            );
        }
    }
);
