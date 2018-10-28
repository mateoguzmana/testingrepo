import { AsyncStorage } from 'react-native'

const LocalStorage = (function () {
    let _storeData = async (key, value) => AsyncStorage.setItem(key, value);
    let _fetchData = (key, fn) => {
        console.log('fetching data');
        AsyncStorage.getItem(key).then(value => fn(value));
    };
    let _getUser = function (fn) {
        return _fetchData('user', fn);
    };
    return {
        setUser: user => _storeData('user', JSON.stringify(user)),
        getUser: _getUser
    };
})();

export const cacheStorage = {
    totalMediaLength: null
};

export default LocalStorage;
