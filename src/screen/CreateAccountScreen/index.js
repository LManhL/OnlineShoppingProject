import { View, Text,StyleSheet,TextInput,TouchableOpacity,Button,Key, KeyboardAvoidingView, Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useRoute,useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { API,graphqlOperation } from "aws-amplify";
import { createUser } from '../../graphql/mutations';
import { listUsers } from '../../graphql/queries';
import { onCreateUser } from '../../graphql/subscriptions';


const CreateAccountScreen = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date(2000,1,1));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false)
  const [users,setUsers]=useState([])

  const navigation=useNavigation();

  async function getAllUser(){
    const allUsers = await API.graphql({
        query: listUsers
    });
    console.log(allUsers.data.listUsers.items)
    setUsers(allUsers.data.listUsers.items)
  }
  
  async function createNewUserGraphQL(){
    const newUser = await API.graphql({
        query: createUser,
        variables: {
            input: {
            "FullName": fullName,
            "PhoneNumber": phoneNumber,
            "Date": dateOfBirth.toLocaleDateString(),
            "AccountName": username,
            "Password": password
        }
        }
    });
    console.log(newUser)
  }

  async function handleCreateNewUser(){
        if(users.length==0){
          Alert.alert("Try again in a minute")
          return false;
        }
        const checkPhoneNumber=users.find((value)=>value.PhoneNumber==phoneNumber);
        const checkUserName=users.find((value)=>value.AccountName==username);

        if(checkPhoneNumber==undefined && checkUserName==undefined){
          await createNewUserGraphQL();
          return true;
        }
        else{
          Alert.alert('PhoneNumber or Username has existed!')
          return false;
        }
  }

  async function Signup(){
      const check = await handleCreateNewUser()
      if(check==true)
          navigation.navigate("LoginScreen")
  }

  async function handleSignup(){
        Alert.alert('Confirm', 'Are you sure to confirm?', [
          {text: 'Yes', onPress: () => Signup()},
          {
            text: 'Cancel',
            style:'cancel'
          },
        ]);
  };

  useEffect(()=>{
      getAllUser()
  },[])

  useEffect(()=>{
    const subscription = API.graphql(graphqlOperation(onCreateUser)).subscribe({
        next: (data)=>{getAllUser()},
        error: (error)=>console.warn(error)
    })
    return ()=>{
        subscription.unsubscribe()
    };
  },[])

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <View style={styles.inputContainer}>
        <FontAwesome name="user-o" size={24} color="black" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="phone" size={24} color="black" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="calendar" size={24} color="black" style={styles.inputIcon} />
        <Button title="Choose date" onPress={() => setOpen(true)} />
        <DatePicker
            mode="date"
            modal
            open={open}
            date={dateOfBirth}
            onConfirm={(date) => {
            setOpen(false)
            setDateOfBirth(date)
            }}
            onCancel={() => {
            setOpen(false)
            }}
        />
        <Text style={{
            width: '52%',
            height: 40,
            padding: 10,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            marginLeft:5,
            }}
        >{dateOfBirth.toLocaleDateString()}</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="user-o" size={24} color="black" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={24} color="black" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      width: '80%',
      height: 40,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 10,
    },
    button: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 20,
      width: '50%',
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default CreateAccountScreen