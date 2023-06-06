import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, { useEffect } from 'react';
import styles from './styles';
import countryList from 'country-list'
import {useState} from 'react' 
import { useHeaderHeight } from '@react-navigation/elements'
import {useNavigation,useRoute} from '@react-navigation/native'
import { createOrder,deleteCartProduct } from '../../graphql/mutations';
import { API } from "aws-amplify";
import { listCartProducts, getCartProduct } from "../../graphql/queries";
import { UserContext } from '../../router/UserContext';
import { useContext } from 'react';

const countries=countryList.getData();

const AddressScreen = ({route}) => {
    const navigation=useNavigation();
    const [City, onChangeCity]=useState("")
    const [noOptionalAddress, onChangeNoOptionalAddress]=useState("")
    const [optionalAddress,onChangeOptionalAddress]=useState("")
    const [phoneNumber,onChangePhoneNumber]=useState(null)
    const [name,onChangeName]=useState("")
    const [selecterCountry, setSelectedCountry]=useState(countries[0].code);
    const [errorAddress,setErrorAddress]=useState('')
    const height = useHeaderHeight()
    const [cart,setCart] = useState(route.params.cart);
    const [checkConfirm,setCheckConfirm]=useState(0);
    const idUser=useContext(UserContext)

    async function onPressCreateOrder(){
        const newOrder = await API.graphql({
          query: createOrder,
          variables: {
              input: {
          "FullName": name,
          "PhoneNumber": phoneNumber,
          "Address": optionalAddress+" "+noOptionalAddress,
          "City": City,
          "Country": selecterCountry,
          "CartProducts": cart,
          "TotalMoney":route.params.totalMoney,
          "userSub":idUser,
          "Status":"Unprocessed"
        }
          }
      });
      console.log(newOrder)
    }
    async function deleteCartProducts(){
        // List all items
        const result = await API.graphql({
          query: listCartProducts
        });
        console.log(result);
        const allCartProducts=result.data.listCartProducts.items;
        console.log(allCartProducts);
        for(let i in allCartProducts){
              const deletedCartProduct = await API.graphql({
                query: deleteCartProduct,
                variables: {
                    input: {
                        id: allCartProducts[i].id
                    }
                }
            });
        }
    }
    useEffect(()=>{
      const result=cart.map((value)=>{
        return {
          quantity: value.quantity,
          option: value.option,
          productID: value.productID
        }
      })
      setCart(result)
    },[checkConfirm])

    async function onPress(){
      await onPressCreateOrder();
      await deleteCartProducts();
      navigation.navigate("ShoppingCart");
    }

    const isValidAddress = ()=>{
        if(!noOptionalAddress) {
          setErrorAddress('Please enter address')
          return;
        }
        if(noOptionalAddress.length<10 ) setErrorAddress('Address too short')
        if(noOptionalAddress.length>50) setErrorAddress('Address too long')
    }

    const onPressConfirm= ()=>{
      setCheckConfirm(checkConfirm+1);
      console.log(checkConfirm)
      if(!name){
        Alert.alert('Please enter name!')
        return;
      }
      if(!phoneNumber){
        Alert.alert('Please enter phone Number!')
        return;
      }
      if(!noOptionalAddress){
        Alert.alert('Please enter Address!')
        return;
      }
      if(!City){
        Alert.alert('Please enter City!')
        return;
      }
      if(phoneNumber.length < 10){
        Alert.alert('Phone number is too short!');
        return;
      }
      Alert.alert('Confirm', 'Are you sure to confirm?', [
        {text: 'Yes', onPress: () => onPress()},
        {
          text: 'Cancel',
          style:'cancel'
        },
      ]);
    }
  return (
        <KeyboardAvoidingView 
          keyboardVerticalOffset={-95}
          behavior="position"
          enabled={true}
          style={styles.container}>
          <View>
              <Picker
                  selectedValue={selecterCountry}
                  onValueChange={(val) => setSelectedCountry(val)}
                  style={{ backgroundColor:'#cbccd1'}}
              >
                  {countries.map(val => <Picker.Item label={val.name} value ={val.code} key={val.code}/>)}
            </Picker>
          </View>
          {/* Name */}
        <View style={styles.row}>
            <Text style={styles.label}>Full name(First and Last name)</Text>
            <TextInput style={styles.textInput} placeholder='Full name'
                      onChangeText={onChangeName}
                      value ={name}
            >
            </TextInput>
        </View>
          {/* Phone number */}
        <View style={styles.row}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput style={styles.textInput} placeholder='Phone number'
                      onChangeText={onChangePhoneNumber}
                      keyboardType = "phone-pad"
                      value={phoneNumber}
            >
            </TextInput>
        </View>
        {/* Address */}
        <View
            style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <TextInput onEndEditing={isValidAddress} 
                      style={styles.address} placeholder='Street address or P.O. Box'
                      onChangeText={onChangeNoOptionalAddress}
                      value={noOptionalAddress}
            />
            <TextInput style={styles.address} placeholder='Apt, Suite, Unit, Building (optional)'
                      onChangeText={onChangeOptionalAddress}
                      value={optionalAddress}
            />
           {<Text style={{color:'red',fontSize: 14}}>Invalid Address</Text> && true }
        </View>
        {/* City */}
        <View style={styles.row}>
            <Text style={styles.label}>City</Text>
            <TextInput style={styles.textInput} placeholder='City'
                      onChangeText={onChangeCity}
                      value={City}
            >
            </TextInput>
        </View>
        <Button  title='Confirm' onPress={onPressConfirm}/>
      </KeyboardAvoidingView>
  )
}

export default AddressScreen;