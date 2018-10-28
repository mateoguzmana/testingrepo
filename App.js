import React from 'react';
import { View } from 'react-native';
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { ApolloProvider } from 'react-apollo';
import config from './aws-exports'
import AppSync from './AppSync';
import Amplify, { Auth } from 'aws-amplify';
import { Navigator } from "./src/components/router";

Amplify.configure(config);

export const appSyncClient = new AWSAppSyncClient({
    url: AppSync.graphqlEndpoint,
    region: AppSync.region,
    auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
    }
});

const Container = () => (
    <ApolloProvider client={ appSyncClient }>
        <Rehydrated>
            <Navigator/>
        </Rehydrated>
    </ApolloProvider>
);

export default Container;
