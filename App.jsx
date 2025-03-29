import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  onPress,
  Alert,
  TouchableHighlight,
  Pressable,
  SafeAreaView,
  FlatList,
  TextInput,
  // QRCode,
} from 'react-native';
import React, {useState} from 'react';
import AttendanceScreen from './src/screens/Teacher/AttendanceScreen';
import TeacherSignUp from './src/screens/Teacher/TeacherSignUp';
import Home from './src/screens/Home';
import TeacherGenerateQr from './src/screens/Teacher/TeacherGenerateQr';
// import { Button } from 'react-native-paper';



//screens

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TeacherSignUp" component={TeacherSignUp} />
      <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
      <Stack.Screen name="TeacherGenerateQr" component={TeacherGenerateQr} />
    </Stack.Navigator>
  );
}
const students = [
  {
    id: '1',
    firstName: 'Aarav',
    lastName: 'Sharma',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '2',
    firstName: 'Ishita',
    lastName: 'Patel',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '3',
    firstName: 'Rohan',
    lastName: 'Verma',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '4',
    firstName: 'Sanya',
    lastName: 'Kapoor',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '5',
    firstName: 'Vikram',
    lastName: 'Singh',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '6',
    firstName: 'Meera',
    lastName: 'Chopra',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '7',
    firstName: 'Aditya',
    lastName: 'Joshi',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '8',
    firstName: 'Ananya',
    lastName: 'Mishra',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '9',
    firstName: 'Kunal',
    lastName: 'Bajpai',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '10',
    firstName: 'Riya',
    lastName: 'Malhotra',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '11',
    firstName: 'Ananya',
    lastName: 'Mishra',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '12',
    firstName: 'Kunal',
    lastName: 'Bajpai',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '13',
    firstName: 'Riya',
    lastName: 'Malhotra',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '14',
    firstName: 'Ananya',
    lastName: 'Mishra',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '15',
    firstName: 'Kunal',
    lastName: 'Bajpai',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '16',
    firstName: 'Riya',
    lastName: 'Malhotra',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '17',
    firstName: 'Ananya',
    lastName: 'Mishra',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '18',
    firstName: 'Kunal',
    lastName: 'Bajpai',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
  {
    id: '19',
    firstName: 'Riya',
    lastName: 'Malhotra',
    image:
      'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
  },
];  
const App = () => {

  return (

    // List of student in class
    // <SafeAreaView style={{flex: 1, padding: 20}}>
    //   <Text style={styles.textsm}>Teachers</Text>

    //   <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
    //     <Image
    //       style={styles.image}
    //       source={{
    //         uri: 'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
    //       }}></Image>
    //     <Text style={styles.textsm}>Vijay</Text>
    //   </View>

    //   <Text style={styles.textsm}>Students</Text>

    //   <FlatList
    //     styles={{flex: 1, gap: 100, flexDirection: 'column'}}
    //     data={students}
    //     keyExtractor={item => item.id}
    //     renderItem={({item}) => (
    //       <View style={styles.card}>
    //         <Image source={{uri: item.image}} style={styles.image} />
    //         <Text style={styles.name}>
    //           {item.firstName} {item.lastName}
    //         </Text>
    //       </View>
    //     )}

    //     // style={{flex:1,gap:40,flexDirection:'column'}}
    //   />
    // </SafeAreaView>

    // <View>
    //   <Text>Hello</Text>
    // </View>

    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>

    // 

       

      

    //Teacher Sign up
    

    // Teacher Generate QR
  


    
  );
};

export default App;

const styles = StyleSheet.create({
  image:{
    width:50,
    height:50
  }
  ,
  name:{fontSize:20},
  card:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    gap:12
  },
  textsm:{
    fontSize:20,
    margin:20
  }

  /////////////////////////////////////////////////
 
  // Teacher generate qr page
  
  // Teacher survillance view
  
});
