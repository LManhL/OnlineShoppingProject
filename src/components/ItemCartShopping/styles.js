import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        flexDirection:'row',
        borderWidth: 1,
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
        backgroundColor: '#edebf2',
        borderColor: '#3f3e42',
        marginTop: 20,
    },
    image: {
        flex: 4,
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    containerText:{
        flex:6,
        padding: 10,
        margin: 10
    },
    title: {
        fontSize: 18,

    },
    price: {
        fontSize:16,
        fontWeight: 'bold',
    },
    ratingsContainer:{
        flexDirection: 'row',
        alignItems:'center',
        marginVertical: 5,
    },
    star:{
        padding: 2,
    },
    oldPrice: {
        fontSize: 15,
        marginLeft: 10,
        fontWeight: 'normal',
        textDecorationLine: 'line-through',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        
    }
})
export default styles;