import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import ProductItem from '../../components/ProductItem';
import { API, graphqlOperation } from 'aws-amplify';
import  React,{useState,useEffect} from 'react';
import { listProducts, getProduct } from "../../graphql/queries";
import { useRoute } from '@react-navigation/native';
import { onCreateProduct } from '../../graphql/subscriptions';

const HomeScreen = ({searchValue}) =>{
    const [products,setProducts]=useState([]);
    const [filteredData, setFilteredData] = useState([]);

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
    if(products.length==0) return <ActivityIndicator/>
    return (
        <View style={styles.container}>
            {/* Render product components */}
            <FlatList
                data={filteredData}
                renderItem = {({item})=><ProductItem props={item}/>}
                keyExtractor={item=>item.id}
                showsHorizontalScrollIndicator = {false}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding: 10,
    },
})
export default HomeScreen;