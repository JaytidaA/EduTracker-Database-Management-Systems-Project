// import React, { useState, useEffect } from "react";
// import { Text, SafeAreaView, View, TextInput, Button } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { useAuth } from "../path/to/AuthProvider"; // make sure this path is correct
// // import { useAuth } from "../context/AuthContext";
// import {useAuth} from "../AuthContext";

// const LogIn = ({navigation}) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const { isAuthenticated, setIsAuthenticated } = useAuth(); // 🟢 Use context state

//   // useEffect(() => {
//   //   const getAuthState = async () => {
//   //     try {
//   //       const value = await AsyncStorage.getItem("isAuthenticated");
//   //       console.log("Initial auth state:", value);
//   //       if (value === "true") {
//   //         setIsAuthenticated(true);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error reading auth state:", error);
//   //     }
//   //   };
//   //   getAuthState();
//   // }, []);
//   // const handleLogin = async () => {
//   //   await AsyncStorage.setItem("isAuthenticated", "true");
//   //   setIsAuthenticated(true); // 🟢 This updates context and triggers re-render
//   //   console.log("Saved Auth State: true");
//   // };

//   useEffect(() => {
//     const getAuthState = async () => {
//       try {
//         const value = await AsyncStorage.getItem("isAuthenticated");
//         console.log("Initial auth state:", value);
//         if (value === "true") {
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error("Error reading auth state:", error);
//       }
//     };
//     getAuthState();
//   }, [setIsAuthenticated]); // Add setIsAuthenticated to the dependency array

//   // const handleLogin = async () => {
//   //   try {
//   //     await AsyncStorage.setItem("isAuthenticated", "true");
//   //     setIsAuthenticated(true);
//   //     console.log("Saved Auth State: true");
//   //     // Optional: Add a log to confirm the state changed
//   //     console.log("Updated auth state:", true);
//   //   } catch (error) {
//   //     console.error("Error during login:", error);
//   //   }
//   // };

//   // const handleLogin = async () => {
//   //   try {
//   //     await AsyncStorage.setItem("isAuthenticated", "true");

//   //     // Small timeout to ensure AsyncStorage has completed
//   //     setTimeout(() => {
//   //       setIsAuthenticated(true);
//   //       console.log("Saved Auth State: true");
//   //     }, 100);
//   //   } catch (error) {
//   //     console.error("Error during login:", error);
//   //   }
//   // };

//   // In your LogIn.jsx file, modify your handleLogin function:
// // const handleLogin = async () => {
// //   try {
// //     // First update AsyncStorage
// //     await AsyncStorage.setItem("isAuthenticated", "true");

// //     // Then update the context state directly
// //     setIsAuthenticated(true);

// //     // Add a log to confirm state change
// //     console.log("Authentication state updated:", true);
// //   } catch (error) {
// //     console.error("Error during login:", error);
// //   }
// // };

// const handleLogin = async () => {
//   try {
//     await AsyncStorage.setItem("isAuthenticated", "true");
//     setIsAuthenticated(true);
//     console.log("Saved Auth State: true");

//     // Add direct navigation
//     if (navigation) {
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'HomePage' }],
//       });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//   }
// };

//   return (
//     <SafeAreaView style={{ padding: 20, flex: 1 }}>
//       <View style={{ justifyContent: "center", alignItems: "center" }}>
//         <Text style={{ fontSize: 26, fontWeight: "600" }}>LogIn</Text>
//       </View>

//       <Text style={{ fontSize: 20, fontWeight: "600" }}>Username</Text>
//       <TextInput
//         placeholder="Enter Username"
//         value={username}
//         onChangeText={setUsername}
//         style={{
//           borderWidth: 1,
//           borderColor: "gray",
//           borderRadius: 5,
//           marginVertical: 10,
//           paddingHorizontal: 10,
//         }}
//       />

//       <Text style={{ fontSize: 20, fontWeight: "600" }}>Password</Text>
//       <TextInput
//         placeholder="Enter Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={{
//           borderWidth: 1,
//           borderColor: "gray",
//           borderRadius: 5,
//           marginVertical: 10,
//           paddingHorizontal: 10,
//         }}
//       />

//       <Text style={{ fontSize: 20, fontWeight: "600" }}>Role</Text>
//       <TextInput
//         placeholder="Student or Teacher"
//         value={role}
//         onChangeText={setRole}
//         style={{
//           borderWidth: 1,
//           borderColor: "gray",
//           borderRadius: 5,
//           marginTop: 10,
//           marginBottom: 20,
//           paddingHorizontal: 10,
//         }}
//       />

//       <Button title="Log In" onPress={handleLogin} />

//       <View style={{ marginTop: 20, alignItems: "center" }}>
//         <Text style={{ fontSize: 16 }}>
//           Authenticated: {isAuthenticated ? "Yes" : "No"}
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LogIn;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuth } from '../AuthContext';

// const LogIn = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { setIsAuthenticated } = useAuth();
//   const [userRole, setUserRole] = useState('student'); // Default to student

//   const handleLogin = async () => {
//     if (!username || !password) {
//       Alert.alert('Error', 'Please enter both username and password');
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // Replace with your actual API endpoint
//       const response = await fetch('http://192.168.0.69:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           password,
//           role: userRole,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Store authentication state
//         await AsyncStorage.setItem('isAuthenticated', 'true');
//         // Store user ID and role
//         await AsyncStorage.setItem('userId', data.userId.toString());
//         await AsyncStorage.setItem('userRole', userRole);

//         setIsAuthenticated(true);
//         navigation.replace('HomePage');
//       } else {
//         Alert.alert('Login Failed', data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Login Error', 'Network error. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleRole = () => {
//     setUserRole(userRole === 'student' ? 'faculty' : 'student');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoidView}
//       >
//         <View style={styles.loginContainer}>
//           <Text style={styles.title}>University Portal</Text>
//           <Text style={styles.subtitle}>Sign in to continue</Text>

//           <View style={styles.form}>
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Username</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your username"
//                 value={username}
//                 onChangeText={setUsername}
//                 autoCapitalize="none"
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Password</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//               />
//             </View>

//             <View style={styles.roleToggleContainer}>
//               <Text style={styles.label}>Login as:</Text>
//               <View style={styles.roleButtonsContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.roleButton,
//                     userRole === 'student' && styles.roleButtonActive,
//                   ]}
//                   onPress={() => setUserRole('student')}
//                 >
//                   <Text
//                     style={[
//                       styles.roleButtonText,
//                       userRole === 'student' && styles.roleButtonTextActive,
//                     ]}
//                   >
//                     Student
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={[
//                     styles.roleButton,
//                     userRole === 'faculty' && styles.roleButtonActive,
//                   ]}
//                   onPress={() => setUserRole('faculty')}
//                 >
//                   <Text
//                     style={[
//                       styles.roleButtonText,
//                       userRole === 'faculty' && styles.roleButtonTextActive,
//                     ]}
//                   >
//                     Faculty
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <TouchableOpacity
//               style={styles.loginButton}
//               onPress={handleLogin}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" size="small" />
//               ) : (
//                 <Text style={styles.loginButtonText}>Login</Text>
//               )}
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.forgotPasswordLink}
//               onPress={() => navigation.navigate('ForgotPasswordPage')}
//             >
//               <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.registerContainer}>
//             <Text style={styles.registerText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
//               <Text style={styles.registerLink} onPress={()=>{
//                 if(userRole === 'student'){
//                   navigation.navigate('StudentSignUp');
//                 }else{
//                   navigation.navigate('TeacherSignUp');
//                 }
//               }}>Register</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#3b5998',
//   },
//   keyboardAvoidView: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   loginContainer: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 24,
//     marginHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#3b5998',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   form: {
//     marginBottom: 20,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   roleToggleContainer: {
//     marginBottom: 20,
//   },
//   roleButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   roleButton: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 12,
//     borderRadius: 8,
//     marginHorizontal: 5,
//     alignItems: 'center',
//   },
//   roleButtonActive: {
//     backgroundColor: '#3b5998',
//   },
//   roleButtonText: {
//     fontWeight: '600',
//     color: '#666',
//   },
//   roleButtonTextActive: {
//     color: 'white',
//   },
//   loginButton: {
//     backgroundColor: '#3b5998',
//     borderRadius: 8,
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   loginButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   forgotPasswordLink: {
//     alignItems: 'center',
//   },
//   forgotPasswordText: {
//     color: '#3b5998',
//     fontSize: 14,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   registerText: {
//     color: '#666',
//   },
//   registerLink: {
//     color: '#3b5998',
//     fontWeight: 'bold',
//   },
// });

// export default LogIn;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../AuthContext';

const {configIp} = require('../../config/config');

const LogIn = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {setIsAuthenticated} = useAuth();
  const [userRole, setUserRole] = useState('student');
  const [userID, setUserID] = useState('');
  const IP_ADDRESS = configIp.IP_ADDRESS;
  const PORT = configIp.PORT;

  const handleLogin = async () => {
    console.log("login button pressed!");

    if (!username || !password || !userID) {
      Alert.alert('Error', 'Please enter ID, username and password');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`http://${IP_ADDRESS}:${PORT}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: userID,
          username: username,
          password: password,
          role: userRole,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and other data to AsyncStorage
        if (data.jwt) {
          await AsyncStorage.setItem('token', data.jwt);
        }

        await AsyncStorage.setItem('isAuthenticated', 'true');
        await AsyncStorage.setItem('userId', userID);
        await AsyncStorage.setItem('userRole', userRole);

        // Set authenticated state
        setIsAuthenticated(true);

        // Navigate
        navigation.replace('HomePage');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>University Portal</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your ID"
                value={userID}
                onChangeText={setUserID}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.roleToggleContainer}>
              <Text style={styles.label}>Login as:</Text>
              <View style={styles.roleButtonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    userRole === 'student' && styles.roleButtonActive,
                  ]}
                  onPress={() => setUserRole('student')}>
                  <Text
                    style={[
                      styles.roleButtonText,
                      userRole === 'student' && styles.roleButtonTextActive,
                    ]}>
                    Student
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    userRole === 'faculty' && styles.roleButtonActive,
                  ]}
                  onPress={() => setUserRole('faculty')}>
                  <Text
                    style={[
                      styles.roleButtonText,
                      userRole === 'faculty' && styles.roleButtonTextActive,
                    ]}>
                    Faculty
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.forgotPasswordLink}
              onPress={() => navigation.navigate('ForgotPasswordPage')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                if (userRole === 'faculty') {
                  navigation.navigate('TeacherSignUp');
                } else {
                  Alert.alert(
                    'Access Restricted',
                    'You don’t have an account. The admin will create your account.',
                    [{text: 'OK'}],
                  );
                }
              }}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b5998',
  },
  keyboardAvoidView: {
    flex: 1,
    justifyContent: 'center',
  },
  loginContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b5998',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  roleToggleContainer: {
    marginBottom: 20,
  },
  roleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#3b5998',
  },
  roleButtonText: {
    fontWeight: '600',
    color: '#666',
  },
  roleButtonTextActive: {
    color: 'white',
  },
  loginButton: {
    backgroundColor: '#3b5998',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPasswordLink: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#3b5998',
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#666',
  },
  registerLink: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
});

export default LogIn;
