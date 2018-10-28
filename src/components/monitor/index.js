// @vendors
import React from 'react';
import moment from 'moment';
import gql from 'graphql-tag';
import { LocationMonitor } from 'react-native-location-monitor';
import { MediaMonitor } from 'react-native-media-monitor';
// @components
import { appSyncClient } from '../../../App';
import { cacheStorage } from '../../config/storage';

let Monitor;
(function (Monitor) {

    class _Monitor {

        start() {
            console.log("[_Monitor] starting");
            LocationMonitor.configure();
            LocationMonitor.start(
                location => this.addLocation(location),
                err => console.error(err)
            );

            MediaMonitor.configure({ first: 1000000000000 });
            MediaMonitor.start(
                media => {
                    console.log("Length", media.edges.length)
                    cacheStorage.totalMediaLength = media.edges.length;
                    media.edges.map((edge, i) => {
                        let addMedia = edge.node;
                        this.addMedia(addMedia);
                    })
                },
                error => console.log(error)
            );
        }

        addLocation(location) {
            console.log("[_Monitor] adding location", location);
            const formattedLocation = {
                connectionType: location.connection ? location.connection.type : 'no',
                effectiveType: location.connection ? location.connection.effectiveType : 'no',
                ip: location.connection ? location.connection.ip : 'no',
                ipv4: location.connection ? location.connection.ipv4 : 'no',
                address: location.connection ? location.connection.address : 'no',
                ssid: location.connection ? location.connection.ssid : 'no',
                bssid: location.connection ? location.connection.bssid : 'no',
                wifiConnectionName: 'JC´s Coffee',
                latitude: "11",
                longitude: String(location.geoLocation.longitude),
                altitude: String(location.geoLocation.altitude)
            };
            this.mutateLocation(formattedLocation);
        }

        addMedia(media) {
            console.log("[_Monitor] adding media", media);
            const { image, location = {}, timestamp } = media;
            const { uri } = image;
            const { latitude = 0, longitude = 0 } = location;

            const formattedMedia = {
                uri: String(uri),
                longitude: String(longitude),
                latitude: String(latitude),
                created: moment.unix(timestamp).utc().format("YYYY-MM-DD HH:mm:ss")
            };

            this.mutateMedia(formattedMedia);
        };

        mutateLocation(location) {
            const created = moment.utc().format("YYYY-MM-dd HH:mm:ss");
            console.log("[_Monitor] mutating");
            appSyncClient.mutate({
                mutation: gql`
                mutation PutUserLocation(
                    $connectionType: String,
                    $effectiveType: String,
                    $ip: String,
                    $ipv4: String,
                    $address: String,
                    $ssid: String,
                    $bssid: String,
                    $wifiConnectionName: String,
                    $latitude: String,
                    $longitude: String,
                    $altitude: String,
                    $created: String
                ) {
                    createUserLocation(
                        connectionType: $connectionType,
                        effectiveType: $effectiveType,
                        ip: $ip,
                        ipv4: $ipv4,
                        address: $address,
                        ssid: $ssid,
                        bssid: $bssid,
                        wifiConnectionName: $wifiConnectionName,
                        latitude: $latitude,
                        longitude: $longitude,
                        altitude: $altitude,
                        created: $created
                    ) {
                    __typename
                    userId
                    created
                    }
                }
            `,
                variables: {
                    connectionType: location.connectionType,
                    effectiveType: location.effectiveType,
                    ip: location.ip,
                    ipv4: location.ipv4,
                    address: location.address,
                    ssid: location.ssid,
                    bssid: location.bssid,
                    wifiConnectionName: location.wifiConnectionName,
                    altitudeAccuracy: location.altitudeAccuracy,
                    accuracy: location.accuracy,
                    heading: location.heading,
                    longitude: location.longitude,
                    altitude: location.altitude,
                    latitude: location.latitude,
                    speed: location.speed,
                    created
                },
                name: 'createUserLocation',
                errorPolicy: 'all',
                fetchPolicy: 'no-cache',
                optimisticResponse: {
                    __typename: 'Mutation',
                    createUserLocation: {
                        __typename: 'UserStoryline',
                        userId: '',
                        connectionType: location.connectionType,
                        effectiveType: location.effectiveType,
                        ip: location.ip,
                        ipv4: location.ipv4,
                        address: location.address,
                        ssid: location.ssid,
                        bssid: location.bssid,
                        wifiConnectionName: location.wifiConnectionName,
                        altitudeAccuracy: location.altitudeAccuracy,
                        accuracy: location.accuracy,
                        heading: location.heading,
                        longitude: location.longitude,
                        altitude: location.altitude,
                        latitude: location.latitude,
                        speed: location.speed,
                        created
                    }
                },
            })
                .then(data => console.log("[_Monitor] success", data))
                .catch(error => console.error("[_Monitor] error", error));
            console.log("[_Monitor] added location", location);
            console.log("[_Monitor] mutated");
        };

        mutateMedia(media) {
            console.log("[_Monitor] mutating", media);
            appSyncClient.mutate({
                mutation: gql`
                mutation PutUserMedia (
                    $uri: String,
                    $longitude: String,
                    $latitude: String,
                    $created: String
                ) {
                    createUserMedia(
                        uri: $uri,
                        longitude: $longitude,
                        latitude: $latitude,
                        created: $created
                    ) {
                        __typename
                        userId
                        created
                    }
                }
            `,
                variables: {
                    uri: media.uri,
                    longitude: media.longitude,
                    latitude: media.latitude,
                    created: media.created,
                },
                name: 'createUserMedia',
                errorPolicy: 'all',
                fetchPolicy: 'no-cache',
                optimisticResponse: {
                    __typename: 'Mutation',
                    createUserMedia: {
                        __typename: 'UserStoryline',
                        userId: '',
                        uri: media.uri,
                        longitude: media.longitude,
                        latitude: media.latitude,
                        created: media.created
                    }
                },
            })
                .then(data => console.log("[_Monitor] success", data))
                .catch(error => console.error("[_Monitor] error", error));
            console.log("[_Monitor] added media", media);
            console.log("[_Monitor] mutated");
        };
    }

    const _singleton = new _Monitor();

    Monitor.start = () => _singleton.start();
})(Monitor = exports.Monitor || (exports.Monitor = {}));

export default Monitor;
