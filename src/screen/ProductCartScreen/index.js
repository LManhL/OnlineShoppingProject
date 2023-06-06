import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector';
import ImageCarousel from '../../components/ImageCarousel';
import { useRoute } from '@react-navigation/native';
import { API } from "aws-amplify";
import { getProduct } from "../../graphql/queries";
import { updateCartProduct } from '../../graphql/mutations';

const ProductCartScreen = () => {
  const [product,setProduct]=useState()
  const route = useRoute();
  const [selectedValue, setSelectedValue] = useState(route.params.option)
  const [quantity,setQuantity]=useState(route.params.quantity)

  async function getOneProduct(){
      const oneProduct = await API.graphql({
        query: getProduct,
        variables: { id: route.params.id }
      });
      setProduct(oneProduct.data.getProduct)
      if(product?.options)
        setSelectedValue(product.options[0])
  }

  useEffect(()=>{
    if(!route.params?.id){
      return;
    }
    getOneProduct()
  },[route.params?.id],[])
  
  async function UpdateProduct(){
    const oneProduct = await API.graphql({
      query: updateCartProduct,
      variables: {
        input: {
            "id": route.params.idCartProduct,
            "quantity": quantity,
            "option":selectedValue
        }
      }
    });
    console.log(oneProduct)
  }

  useEffect(()=>{
      UpdateProduct();
      console.log("change!")
  },[quantity,selectedValue])

  if(!product){
    return <ActivityIndicator/>;
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
      </ScrollView>
    </View>
  )
}

export default ProductCartScreen;