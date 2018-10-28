import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    rowSeparator: {
        borderLeftColor: '#42a1f4',
        borderLeftWidth: 2,
    },
    firstColumn: {
        width: '25%'
    },
    whenStyle: {
        color: '#1b1d21',
        marginLeft: 2,
        fontSize: 20,
        padding: 5
    },
    dayStyle: {
        color: '#1b1d21',
        marginLeft: 2,
        fontSize: 15,
        padding: 5
    },
    yearStyle: {
        color: '#1b1d21',
        marginLeft: 2,
        fontSize: 10,
        padding: 5
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#42a1f4',
    },
    icon: {
        alignSelf: 'flex-end',
        marginRight: 20
    },
    image: {
        alignSelf: 'flex-start',
        height: 50,
        marginLeft: 10,
        width: 50
    },
    loadingContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize: 20,
        margin: 10
    },
    locationHeader: {
        marginLeft: 12,
        fontSize: 20,
    },
    locationTime: {
        marginLeft: 12,
        fontSize: 13,
    },
    locationNote: {
        marginLeft: 12,
        fontSize: 12,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10
    },
    itemColumn: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    scroller: {
        flexGrow: 1,
        padding: 2,
    },
    allEventPageStyle: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF'
    },
    swipeableItem: {
        width: '100%',
        backgroundColor: '#ffffff',
    }
});

export default styles;
