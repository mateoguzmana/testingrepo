// @vendors
import React, { Component } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { compose, graphql } from 'react-apollo';
import uuidV4 from "uuid/v4";
import moment from "moment";

// @queries
import { CommentOnLocationGraphQLQuery, GetLocationGraphQLQuery } from './queries';

class _CreateLocationView extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState = { comment: '' };
    }

    componentDidMount() {
        const { subscribeToNewComments } = this.props;
        subscribeToNewComments();
    }

    render() {
        const { items = [] } = this.props.comments;
        return (
            <View style={ styles.wrapper }>
                <ScrollView contentContainerStyle={ styles.contentContainerStyle }>
                    <View style={ styles.container }>
                        {
                            items.map((comment, index) => (
                                <View key={ index } style={ styles.commentContainer }>
                                    <Text style={ styles.comment }>{ comment.content }</Text>
                                    <Text
                                        style={ styles.date }>{ formatDate(comment.createdAt, 'MMM Do YYYY') }</Text>
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
                <TextInput
                    onChangeText={ value => this.setState({ comment: value }) }
                    placeholder='Comment'
                    style={ styles.input }
                    autoCapitalize='none'
                    value={ this.state.comment }
                    autoCorrect={ false }
                />
                <View style={ styles.buttonContainer }>
                    <TouchableOpacity onPress={ () => {
                        const { comment = '' } = this.state;
                        if (comment !== '') {
                            this.props.createComment({
                                content: comment,
                                locationId: this.props.navigation.state.params,
                                createdAt: moment.utc().format(),
                            });
                            this.setState(this.initialState)
                        }
                    } }>
                        <View style={ styles.button }><Text style={ styles.buttonText }>Add Comment</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export const LocationCommentView = compose(
    graphql(CommentOnLocationGraphQLQuery, {
        options: props => ({
            fetchPolicy: 'cache-and-network',
            update: (proxy, { data: { commentOnLocation } }) => {
                const query = GetLocationGraphQLQuery;
                const variables = { locationId: props.locationId };
                const data = proxy.readQuery({ query, variables });
                data.getLocation = {
                    ...data.getLocation,
                    comments: {
                        ...data.getLocation.comments,
                        items: [
                            ...data.getLocation.comments.items.filter(c => {
                                return c.content !== commentOnLocation.content &&
                                    c.createdAt !== commentOnLocation.createdAt &&
                                    c.commentId !== commentOnLocation.commentId
                            }),
                            commentOnLocation,
                        ]
                    }
                };
                proxy.writeQuery({ query, data });
            },
        }),
        props: props => ({
            createComment: (comment) =>
                props.mutate({
                    variables: comment,
                    optimisticResponse: {
                        commentOnLocation: {
                            ...comment,
                            __typename: 'Comment',
                            commentId: uuidV4()
                        }
                    },
                })
        })
    }), 
    graphql(GetLocationGraphQLQuery, {
        options: ({ locationId }) => ({
            fetchPolicy: 'cache-and-network',
            variables: {
                locationId,
            }
        }),
        props: props => {
            return {
                comments: props.data.getLocation ? props.data.getLocation.comments : [],
                subscribeToNewComments: () => {
                    props.data.subscribeToMore({
                        document: SubscribeToLocationCommentsGraphQLQuery,
                        variables: {
                            locationId: props.ownProps.navigation.state.params.locationId,
                        },
                        updateQuery: (prev, { subscriptionData: { data: { subscribeToLocationComments } } }) => {
                            const res = {
                                ...prev,
                                getLocation: {
                                    ...prev.getLocation,
                                    comments: {
                                        nextToken: null,
                                        __typename: 'CommentConnections',
                                        items: [
                                            ...prev.getLocation.comments.items.filter(c => {
                                                return (
                                                    c.content !== subscribeToLocationComments.content &&
                                                    c.createdAt !== subscribeToLocationComments.createdAt &&
                                                    c.commentId !== subscribeToLocationComments.commentId
                                                )
                                            }),
                                            subscribeToLocationComments,
                                        ]
                                    }
                                },
                            };
                            return res;
                        }
                    })
                }
            }
        }
}))(_CreateLocationView);