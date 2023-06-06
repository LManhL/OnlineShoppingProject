import { View, Text,TextInput,StyleSheet, ScrollView, TouchableHighlight,Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import { API } from 'aws-amplify';
import { createProduct } from '../../graphql/mutations';
import { useNavigation } from '@react-navigation/native';

const CreateProductScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState(['']);
  const [options, setOptions] = useState(['']);
  const [avgRating, setAvgRating] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  
  const navigation=useNavigation();

  async function handleCreateProduct(){
    const newProduct = await API.graphql({
      query: createProduct,
      variables: {
          input: {
      "title": title,
      "description": description,
      "image": image,
      "images":  images.split(","),
      "options": options.split(","),
      "avgRating": avgRating,
      "ratings": ratings,
      "price": price,
      "oldPrice": oldPrice
    }
      }
  });
    console.log(newProduct)

    navigation.navigate("HomeScreenAdmin")
  }

  const handleSubmit=()=>{
      Alert.alert('Confirm', 'Are you sure to confirm?', [
        {text: 'Yes', onPress: () => handleCreateProduct()},
        {
          text: 'Cancel',
          style:'cancel'
        },
      ]);
  }

  return (
    <View style={styles.root}>
    <ScrollView style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Image"
          value={image}
          onChangeText={setImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Images"
          value={images}
          onChangeText={setImages}
        />
        <TextInput
          style={styles.input}
          placeholder="Options"
          value={options}
          onChangeText={setOptions}
        />
        <TextInput
          style={styles.input}
          placeholder="Average Rating"
          value={avgRating}
          onChangeText={setAvgRating}
        />
        <TextInput
          style={styles.input}
          placeholder="Ratings"
          value={ratings}
          onChangeText={setRatings}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Old Price"
          value={oldPrice}
          onChangeText={setOldPrice}
        />
        <TouchableHighlight style={styles.button} onPress={handleSubmit} underlayColor='blue'>
          <View>
              <Text style={styles.buttonText}>CREATE PRODUCT</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
      </View>
  )
}
const styles = StyleSheet.create({
  root:{
    padding:20
  },
  formContainer: {
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    height:30,
    backgroundColor: '#66d5e8',
    borderRadius: 5,
    marginBottom:10,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText: {
    fontSize:16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreateProductScreen