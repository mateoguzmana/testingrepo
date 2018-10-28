import { PermissionsAndroid } from 'react-native';

export const requestGeolocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Geolocation',
                'message': 'We require geolocation'
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use geolocation");
        } else {
            console.log("Geolocation permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

export const requestExternalStorageRead = async (callback) => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                'title': 'Cool App ...',
                'message': 'App needs access to external storage'
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can read external storage");
            callback();
        } else {
            console.log("external storage permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

export const requestAndroidPermissions = () => {
    requestExternalStorageRead(requestGeolocationPermission);
}
