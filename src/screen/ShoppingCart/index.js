import { FlatList, StyleSheet, View,Text,Button, ActivityIndicator,Alert } from 'react-native';
import ItemCartShopping from '../../components/ItemCartShopping';
import {useNavigation,useRoute} from '@react-navigation/native'
import { useEffect, useState } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { listCartProducts, getCartProduct } from "../../graphql/queries";
import { CartProduct,Product } from '../../models/index';
import { getProduct } from "../../graphql/queries";
import { onCreateCartProduct, onDeleteCartProduct, onUpdateCartProduct } from '../../graphql/subscriptions';
import { UserContext } from '../../router/UserContext';
import { useContext } from 'react';

const ShoppingCartScreen = () =>{
    const [products,setProducts]=useState([]);
    const [AllCartProducts, setAllCartProducts] = useState([]);
    const [totalPrice,setTotalPrice]=useState(0);
    const [cart,setCart]=useState([])
    const [checkLoad,setCheckLoad]=useState(false);
    const navigation=useNavigation();
    const idUser=useContext(UserContext)

    const onPress = ()=>{
        navigation.navigate('Address',{cart: AllCartProducts, totalMoney: totalPrice})
    }

    async function getOneProduct(value){
        const oneProduct = await API.graphql({
          query: getProduct,
          variables: { id: value.productID }
        });
        return oneProduct.data.getProduct;
    }

    async function fetchCartProduct(){
        // List all items
        const allCartProducts = await API.graphql({
            query: listCartProducts
        });
        let resultCartProducts = allCartProducts.data.listCartProducts.items;
        resultCartProducts=resultCartProducts.filter(value=>value.userSub===idUser)
        const resultProducts =[]
        for(let i in resultCartProducts ){
            const item = await getOneProduct(resultCartProducts[i]);
            resultProducts.push(item)
        }
        setProducts(resultProducts);
        setAllCartProducts(resultCartProducts);
        setCheckLoad(true);
    }

    useEffect(()=>{
        fetchCartProduct();
    },[])

    useEffect(()=>{
        const cartResult = AllCartProducts.map((value,index)=>{
            return {id: value.id,
                    quantity: value.quantity,
                    option: value.option,
                    item: products[index]
                    }
        })
        setCart(cartResult)
    },[AllCartProducts])

    useEffect(()=>{
        const totalPricerResult=cart.reduce((sum,cur)=>sum+ cur.quantity*cur.item.price ,0);
        setTotalPrice(totalPricerResult)
    },[cart])

    useEffect(()=>{
        const subscription = API.graphql(graphqlOperation(onCreateCartProduct)).subscribe({
            next: (data)=>{fetchCartProduct()},
            error: (error)=>console.warn(error)
        })
        return ()=>{
            subscription.unsubscribe()
        };
    },[])

    useEffect(()=>{
        const subscription = API.graphql(graphqlOperation(onUpdateCartProduct)).subscribe({
            next: (data)=>{fetchCartProduct()},
            error: (error)=>console.warn(error)
        })
        return ()=>{
            subscription.unsubscribe()
        };
    },[])

    useEffect(()=>{
        const subscription = API.graphql(graphqlOperation(onDeleteCartProduct)).subscribe({
            next: (data)=>{fetchCartProduct()},
            error: (error)=>console.warn(error)
        })
        return ()=>{
            subscription.unsubscribe()
        };
    },[])
    
    if(checkLoad==false){
        return <ActivityIndicator/>
    }
    if(checkLoad==true && products.length==0){
        return (
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:16}}>You have no item in cart</Text>
        </View>
        )
    }
    return ( 
        <View style={styles.container}>
            {/* Render product components */}
            <FlatList
                 style={styles.list}
                data={cart}
                renderItem = {({item})=><ItemCartShopping props={item}/>}
                keyExtractor={item=>item.id}
                showsHorizontalScrollIndicator = {false}
                ListHeaderComponent = {()=>(
                    <View>
                <Text style={styles.text}>Subtotal: ${totalPrice.toFixed(2)} </Text>
                <Button 
                    title="Procedd to checkout"
                    onPress={onPress}
                    color="#27a0b0"
                />
            </View>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        
        padding: 10,
    },
    text: {
        marginTop: 10,
        fontWeight:'bold',
        fontSize:18
    },
    list: {
        
    }
})
export default ShoppingCartScreen;