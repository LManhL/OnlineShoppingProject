import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, TouchableHighlight,Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector';
import ButtonCustom from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import { useRoute } from '@react-navigation/native';
import { Product } from '../../models/index';
import { API } from "aws-amplify";
import { getProduct } from "../../graphql/queries";
import { createCartProduct } from '../../graphql/mutations';
import { UserContext } from '../../router/UserContext';
import { useContext } from 'react';

const ProductScreen = () => {
  const [product,setProduct]=useState()
  const [selectedValue, setSelectedValue] = useState("default")
  const route = useRoute();
  const [quantity,setQuantity]=useState(1)
  const idUser=useContext(UserContext)
  
  async function getOneProduct(){
      const oneProduct = await API.graphql({
        query: getProduct,
        variables: { id: route.params.id }
      });
      setProduct(oneProduct.data.getProduct)
      console.log(oneProduct.data.getProduct)
      if(product?.options)
      setSelectedValue(product.options[0])
  }
  useEffect(()=>{
    if(!route.params?.id){
      return;
    }
    getOneProduct()
  },[route.params?.id],[])
  
  if(!product){
    return <ActivityIndicator/>;
  }
  async function createCartProductGraphQL(){
      const newCartProduct = await API.graphql({
        query: createCartProduct,
        variables: {
            input: {
        "quantity": quantity,
        "option": selectedValue,
        "productID": route.params.id,
        "userSub":idUser
      }
        }
    });
    console.log(newCartProduct)
  }
  const AddToCart = ()=>{
      Alert.alert('Confirm', 'Do you sure to add the item to cart?', [
        {text: 'Yes', onPress:()=>createCartProductGraphQL()},
        {
          text: 'Cancel',
          style:'cancel'
        },
      ]);
  }
  return (
    <View style={styles.root}>
      <ScrollView 
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}>
          {/* Header*/}
          <Text style={styles.title}> {product.title} </Text>

          {/* Image carousel*/}
          <ImageCarousel images={product.images}/>
          {/* Option selector*/}
          <Picker  
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange = {(val,ind)=>setSelectedValue(val)}
            >
            {product.options.map((val,ind)=><Picker.Item key={ind} label={val} value={val}></Picker.Item>)}
          </Picker>
          {/* Price*/}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            {product.oldPrice && <Text style={styles.oldPrice}>${product.oldPrice}</Text>}
          </View>
          {/* Description*/}
          <Text style={styles.description}>{product.description}</Text>
          {/* Quantity selector */}
          <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>
          {/* Button */}
          <ButtonCustom text={'ADD TO CART'} onPress={AddToCart} rootStyle={{}}/>
      </ScrollView>
    </View>
  )
}

export default ProductScreen;