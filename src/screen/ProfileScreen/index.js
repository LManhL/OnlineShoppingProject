import { View, Text,Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import ButtonCustom from '../../components/Button';
import { getUser } from '../../graphql/queries';
import { UserContext } from '../../router/UserContext';
import { useContext } from 'react';
import { API, graphqlOperation } from "aws-amplify";


const ProfileScreen = () => {
  const idUser=useContext(UserContext)
  const [user,setUser]=useState({});
  async function getOneUser(){
    // Get a specific item
      const oneUser = await API.graphql({
        query: getUser,
        variables: { id: idUser }
      });
      console.log(oneUser.data.getUser)
      setUser(oneUser.data.getUser);
  }
  useEffect(()=>{
    getOneUser();
  },[])
  return (
    <ScrollView style={styles.container}>
        <Image
              style={styles.image}
              source={{
              uri: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png',
            }}
        />
        <View style={{backgroundColor:'white', flex: 1, borderWidth: 2,borderColor:'#808fa8'}}>
          <Text style={styles.rowText}>Username: {user.AccountName}</Text>
          <Text style={styles.rowText}>Full Name: {user.FullName}</Text>
          <Text style={styles.rowText}>Birth: {user.Date}</Text>
          <Text style={styles.rowText}>SDT: {user.PhoneNumber}</Text>
        </View>
    </ScrollView>
  )
}

export default ProfileScreen;