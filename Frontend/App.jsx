// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Button,
//   TouchableOpacity,
//   onPress,
//   Alert,
//   TouchableHighlight,
//   Pressable,
//   SafeAreaView,
//   FlatList,
//   TextInput,
//   // QRCode,
// } from 'react-native';
// import React, {useContext, useState} from 'react';
// import AttendanceScreen from './src/screens/Teacher/AttendanceScreen';
// import TeacherSignUp from './src/screens/Teacher/TeacherSignUp';
// import Home from './src/screens/Home';
// import TeacherGenerateQr from './src/screens/Teacher/TeacherGenerateQr';
// // import { Button } from 'react-native-paper';



// //screens

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// const Stack = createNativeStackNavigator();

// import HomePage from './src/screens/HomePage';
// import LogIn from './src/screens/LogIn';
// import CourseDetailPage from './src/screens/CourseDetailPage';

// /// import context 
// import { AuthProvider, useAuth } from './src/AuthContext';
// // import AuthContext from './src/AuthContext';

// const AppStack = () => {
//   return (
//     <Stack.Navigator>
//       {/* <Stack.Screen name="Home" component={Home} /> */}
//       <Stack.Screen name="HomePage" component={HomePage} />
//       <Stack.Screen name="TeacherSignUp" component={TeacherSignUp} />
//       <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
//       <Stack.Screen name="TeacherGenerateQr" component={TeacherGenerateQr} />
//       <Stack.Screen name="CourseDetailPage" component={CourseDetailPage} />
//       <Stack.Screen name="LogIn" component={LogIn} />

//     </Stack.Navigator>
//   );
// }

// const AuthStack=()=>{
//   return(
//     <Stack.Navigator>
//       <Stack.Screen name="LogIn" component={LogIn} />
//     </Stack.Navigator>
//   )
// }
// const RootNavigator = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <NavigationContainer>
//       {isAuthenticated ? <AppStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };

// const students = [
//   {
//     id: '1',
//     firstName: 'Aarav',
//     lastName: 'Sharma',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '2',
//     firstName: 'Ishita',
//     lastName: 'Patel',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '3',
//     firstName: 'Rohan',
//     lastName: 'Verma',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '4',
//     firstName: 'Sanya',
//     lastName: 'Kapoor',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '5',
//     firstName: 'Vikram',
//     lastName: 'Singh',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '6',
//     firstName: 'Meera',
//     lastName: 'Chopra',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '7',
//     firstName: 'Aditya',
//     lastName: 'Joshi',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '8',
//     firstName: 'Ananya',
//     lastName: 'Mishra',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '9',
//     firstName: 'Kunal',
//     lastName: 'Bajpai',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '10',
//     firstName: 'Riya',
//     lastName: 'Malhotra',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '11',
//     firstName: 'Ananya',
//     lastName: 'Mishra',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '12',
//     firstName: 'Kunal',
//     lastName: 'Bajpai',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '13',
//     firstName: 'Riya',
//     lastName: 'Malhotra',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '14',
//     firstName: 'Ananya',
//     lastName: 'Mishra',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '15',
//     firstName: 'Kunal',
//     lastName: 'Bajpai',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '16',
//     firstName: 'Riya',
//     lastName: 'Malhotra',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '17',
//     firstName: 'Ananya',
//     lastName: 'Mishra',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '18',
//     firstName: 'Kunal',
//     lastName: 'Bajpai',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
//   {
//     id: '19',
//     firstName: 'Riya',
//     lastName: 'Malhotra',
//     image:
//       'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//   },
// ];  
// const App = () => {

//   const {isAuthenticated, setIsAuthenticated}=useAuth();

//   return (

//     // List of student in class
//     // <SafeAreaView style={{flex: 1, padding: 20}}>
//     //   <Text style={styles.textsm}>Teachers</Text>

//     //   <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
//     //     <Image
//     //       style={styles.image}
//     //       source={{
//     //         uri: 'https://tse4.mm.bing.net/th?id=OIP.OPX1WmXsI-HUmzQJfcCqyAHaHa&pid=Api&P=0&h=180',
//     //       }}></Image>
//     //     <Text style={styles.textsm}>Vijay</Text>
//     //   </View>

//     //   <Text style={styles.textsm}>Students</Text>

//     //   <FlatList
//     //     styles={{flex: 1, gap: 100, flexDirection: 'column'}}
//     //     data={students}
//     //     keyExtractor={item => item.id}
//     //     renderItem={({item}) => (
//     //       <View style={styles.card}>
//     //         <Image source={{uri: item.image}} style={styles.image} />
//     //         <Text style={styles.name}>
//     //           {item.firstName} {item.lastName}
//     //         </Text>
//     //       </View>
//     //     )}

//     //     // style={{flex:1,gap:40,flexDirection:'column'}}
//     //   />
//     // </SafeAreaView>

//     // <View>
//     //   <Text>Hello</Text>
//     // </View>

//   <AuthProvider>

//     {/* <NavigationContainer> */}
//      {/* {isAuthenticated?<AppStack/>:<AuthStack/>}
//       */}
//       <RootNavigator />
//     {/* </NavigationContainer> */}
//   </AuthProvider>

//     // 

       

      

//     //Teacher Sign up
    

//     // Teacher Generate QR
  


    
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   image:{
//     width:50,
//     height:50
//   }
//   ,
//   name:{fontSize:20},
//   card:{
//     flex:1,
//     flexDirection:'row',
//     alignItems:'center',
//     gap:12
//   },
//   textsm:{
//     fontSize:20,
//     margin:20
//   }

//   /////////////////////////////////////////////////
 
//   // Teacher generate qr page
  
//   // Teacher survillance view
  
// });



import React,{useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';

import AttendanceScreen from './src/screens/Teacher/AttendanceScreen';
import TeacherSignUp from './src/screens/Teacher/TeacherSignUp';
import TeacherGenerateQr from './src/screens/Teacher/TeacherGenerateQr';
import HomePage from './src/screens/HomePage';
import LogIn from './src/screens/LogIn';
import CourseDetailPage from './src/screens/CourseDetailPage';
import StudentSignUp from './src/screens/Student/StudentSignUP';

//yadnyesh
import StudentAttendanceComponent from './src/screens/Student/StudentAttendance';
// import TeacherAttendanceComponent from './src/screens/Teacher/TeacherAttendanceCoomponent';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from './src/AuthContext';
import { useState } from 'react';
// import { AuthProvider, useAuth } from './src/path/to/AuthProvider';
// import {AuthProvider, useAuth  }  from './src/AuthContext'
import AdminScreen from './src/screens/AdminScreen';
import AddStudentScreen from './src/screens/Student/StudentScreen';
// import CourseDetailPage from './src/screens/CourseDetailPage';
// import StudentAttendanceComponent from './src/screens/Student/StudentAttendance';
import TeacherAttendanceComponent from './src/screens/Teacher/TeacherAttendanceCoomponent';
import AttendanceRequest from './src/screens/AttendanceRequest';
import AttendanceGraph from './src/screens/AttendanceGraph';
// import CourseDetail from './src/screens/CourseDetailPage';
// import CourseDetailPage from './src/screens/CourseDetailPage';
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="TeacherSignUp" component={TeacherSignUp} />
      <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
      <Stack.Screen name="TeacherGenerateQr" component={TeacherGenerateQr} />
      {/* <Stack.Screen name="CourseDetailPage" component={FacultyCourseDetailPage} />
       */}

      <Stack.Screen name="CourseDetailPage" component={CourseDetailPage} />
      <Stack.Screen name="StudentAttendanceComponent" component={StudentAttendanceComponent} />
      <Stack.Screen name="StudentScreen" component={AddStudentScreen} />
      <Stack.Screen name="StudentSignUp" component={StudentSignUp} />
      <Stack.Screen name="AdminScreen" component={AdminScreen} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="TeacherAttendanceComponent" component={TeacherAttendanceComponent}/>
      <Stack.Screen name="AttendanceRequest" component={AttendanceRequest} />
      <Stack.Screen name="AttendanceGraph" component={AttendanceGraph} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="AdminScreen" component={AdminScreen} />  */}
      {/* <Stack.Screen name="AddStudent" component={AddStudentScreen} /> */}
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="TeacherSignUp" component={TeacherSignUp} />
      {/* <Stack.Screen name="StudentSignUp" component={StudentSignUp} /> */}
      <Stack.Screen name="TeacherAttendanceCompnent" component={TeacherAttendanceComponent}/>
      <Stack.Screen name="StudentAttendanceComponent" component={StudentAttendanceComponent} />
    </Stack.Navigator>
  );
};

// const RootNavigator = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <NavigationContainer>
//       {isAuthenticated ? <AppStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };

// const RootNavigator = () => {
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     console.log("RootNavigator - Auth state changed:", isAuthenticated);
//   }, [isAuthenticated]);

//   return (
//     <NavigationContainer>
//       {isAuthenticated ? <AppStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a loading screen while checking authentication
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3b5998' }}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{ color: 'white', marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};


const App = () => {
  return (
    <AuthProvider>
    <RootNavigator />
  </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 20,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textsm: {
    fontSize: 20,
    margin: 20,
  },
});

