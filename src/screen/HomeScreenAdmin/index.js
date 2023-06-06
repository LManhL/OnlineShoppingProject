import { ActivityIndicator,Text, FlatList, StyleSheet, View,Pressable } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import  React,{useState,useEffect} from 'react';
import { listProducts, getProduct } from "../../graphql/queries";
import { useRoute } from '@react-navigation/native';
import { onCreateProduct, onDeleteProduct } from '../../graphql/subscriptions';
import ProductItemAdmin from '../../components/ProductItemAdmin';
import { useNavigation } from '@react-navigation/native';

const HomeScreenAdmin = ({searchValue}) =>{
    const [products,setProducts]=useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigation=useNavigation();

    const onPressCreateProduct=()=>{
        navigation.navigate("CreateProductScreen")
    }

    async function getAllData(){
        const allProducts = await API.graphql({
            query: listProducts
        });
        setProducts(allProducts.data.listProducts.items)
        setFilteredData(allProducts.data.listProducts.items)
    }

    const searchFilterFunction = (text) => {
        if(products.length==0){
            return;
        }
        if(text.length==0) {
            setFilteredData(products)
            return;
        }

        const newData = products.filter((item) => {
          const itemData = item.title.toUpperCase();
          const searchTextData = text.toUpperCase();
          return itemData.indexOf(searchTextData) > -1;
        });
        setFilteredData(newData);
      };

    useEffect(()=>{
        getAllData()
     },[]);

    useEffect(()=>{
        searchFilterFunction(searchValue)
     },[searchValue])
    
    useEffect(()=>{
        const subscription = API.graphql(graphqlOperation(onCreateProduct)).subscribe({
            next: (data)=>{getAllData()},
            error: (error)=>console.warn(error)
        })
        return ()=>{
            subscription.unsubscribe()
        };
    },[])

    useEffect(()=>{
        const subscription = API.graphql(graphqlOperation(onDeleteProduct)).subscribe({
            next: (data)=>{getAllData()},
            error: (error)=>console.warn(error)
        })
        return ()=>{
            subscription.unsubscribe()
        };
    },[])
    if(products.length==0) return <ActivityIndicator/>
    return (
        <View style={styles.container}>
            <Pressable onPress={onPressCreateProduct}
                       style={{height:35,backgroundColor:'#eaff05',
                               width:150,borderRadius:5,alignItems:'center',
                               justifyContent:'center',borderWidth:1}}>
                  <Text style={{fontWeight:'bold',fontSize:14}}>ADD MORE PRODUCT</Text>
            </Pressable>
            {/* Render product components */}
            <FlatList
                data={filteredData}
                renderItem = {({item})=><ProductItemAdmin props={item}/>}
                keyExtractor={item=>item.id}
                showsHorizontalScrollIndicator = {false}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        paddingBottom: 50,
        padding: 10,
    },
})
export default HomeScreenAdmin;