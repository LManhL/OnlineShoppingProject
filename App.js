import x from '@azure/core-asynciterator-polyfill';
import React from "react";
import { View,Text } from "react-native";
import Router from "./src/router";

import { Amplify } from 'aws-amplify';
import { Auth } from "@aws-amplify/auth";
import { withAuthenticator } from "aws-amplify-react-native";


import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

const App=()=>{
  return (
    <View {...{flex:1}}>
        <Router/>
   </View>
  )
}
export default App;