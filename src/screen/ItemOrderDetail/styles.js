import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    title: {
        marginTop: 20,
        fontSize: 12,
        fontStyle:'italic'
    },
    picker: {
        backgroundColor: '#e6e6ed',
        fontSize:20,
        marginTop: 20,
        marginBottom:20,
    },
    root: {
       padding: 20,
    },
    price: {
        fontSize:20,
        fontWeight: 'bold',
    },
    oldPrice: {
        fontStyle:'italic',
        fontSize: 30,
        marginLeft: 10,
        textDecorationLine: 'line-through',
        textDecorationColor:'yellow',
        textDecorationStyle:'solid'
    },
     priceContainer: {
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    description: {
        margin: 10,
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 19,
    },
    scrollview: {
        
    }
})
export default styles;