import { View, Text,Pressable } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

const ButtonCustom = ({text,onPress,rootStyle}) => {
  return (
    <View style={styles.container}>
      <Pressable 
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#f2b566' : '#e68c4c',
          },
          styles.button,
        ]}
        onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  )
}
const styles=StyleSheet.create({
    container: {

    },
    button: {
        alignItems:'center',
        justifyContent:'center',
        margin: 10,
        height: 50,
        with: '100%',
        borderRadius: 15,
        borderWidth: 1,
    },
    text: {
        fontSize: 14,
        fontWeight:'500',
    }
})
export default ButtonCustom;