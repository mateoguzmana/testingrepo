import gql from 'graphql-tag';

export const ListUserStorylines = gql`
    query GetUserStorylines {
        getUserStorylines {
            userId
            type
            metaData {
                key
                value
            }
            created
        }
    }
`;

export const SubscribeToUserStorylines = gql`
    subscription subscribeToUserStoryline {
        createUserMedia(
            uri: "uri://someuri",
            longitude: "-82.4424211"
            latitude: "27.9295095"
            created: "2018-09-01 00:00:15.016"
        ) {
            userMediaId
            userId
            uri
            longitude
            latitude
            created
        }
    }
`;

export const CreateUserLocation = gql`
    mutation PutUserLocation {
        createUserLocation(
            connectionType: "wifi",
            effectiveType:  "effectiveType",
            ip:  "ip",
            ipv4: "ipv4",
            address:  "address",
            ssid:  "ssid",
            bssid:  "bssid",
            wifiConnectionName: "FederalMarineTerminalsMateo"
            longitude: "-82.4424211"
            latitude: "27.9295095"
            created: "2018-09-01 00:00:15.different"
        )
        {
            userId
            created
        }
    }
`;
