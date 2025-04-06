import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useAuth } from "../path/to/AuthProvider"; // make sure this path is correct
// import { useAuth } from "../context/AuthContext";
import {useAuth} from "../AuthContext";

const LogIn = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useAuth(); // 🟢 Use context state

  // useEffect(() => {
  //   const getAuthState = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("isAuthenticated");
  //       console.log("Initial auth state:", value);
  //       if (value === "true") {
  //         setIsAuthenticated(true);
  //       }
  //     } catch (error) {
  //       console.error("Error reading auth state:", error);
  //     }
  //   };
  //   getAuthState();
  // }, []);
  // const handleLogin = async () => {
  //   await AsyncStorage.setItem("isAuthenticated", "true");
  //   setIsAuthenticated(true); // 🟢 This updates context and triggers re-render
  //   console.log("Saved Auth State: true");
  // };

   
  useEffect(() => {
    const getAuthState = async () => {
      try {
        const value = await AsyncStorage.getItem("isAuthenticated");
        console.log("Initial auth state:", value);
        if (value === "true") {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error reading auth state:", error);
      }
    };
    getAuthState();
  }, [setIsAuthenticated]); // Add setIsAuthenticated to the dependency array
  
  // const handleLogin = async () => {
  //   try {
  //     await AsyncStorage.setItem("isAuthenticated", "true");
  //     setIsAuthenticated(true);
  //     console.log("Saved Auth State: true");
  //     // Optional: Add a log to confirm the state changed
  //     console.log("Updated auth state:", true);
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // };

  // const handleLogin = async () => {
  //   try {
  //     await AsyncStorage.setItem("isAuthenticated", "true");
      
  //     // Small timeout to ensure AsyncStorage has completed
  //     setTimeout(() => {
  //       setIsAuthenticated(true);
  //       console.log("Saved Auth State: true");
  //     }, 100);
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // };

  // In your LogIn.jsx file, modify your handleLogin function:
// const handleLogin = async () => {
//   try {
//     // First update AsyncStorage
//     await AsyncStorage.setItem("isAuthenticated", "true");
    
//     // Then update the context state directly
//     setIsAuthenticated(true);
    
//     // Add a log to confirm state change
//     console.log("Authentication state updated:", true);
//   } catch (error) {
//     console.error("Error during login:", error);
//   }
// };


const handleLogin = async () => {
  try {
    await AsyncStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    console.log("Saved Auth State: true");
    
    // Add direct navigation
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomePage' }],
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};

  return (
    <SafeAreaView style={{ padding: 20, flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 26, fontWeight: "600" }}>LogIn</Text>
      </View>

      <Text style={{ fontSize: 20, fontWeight: "600" }}>Username</Text>
      <TextInput
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
          marginVertical: 10,
          paddingHorizontal: 10,
        }}
      />

      <Text style={{ fontSize: 20, fontWeight: "600" }}>Password</Text>
      <TextInput
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
          marginVertical: 10,
          paddingHorizontal: 10,
        }}
      />

      <Text style={{ fontSize: 20, fontWeight: "600" }}>Role</Text>
      <TextInput
        placeholder="Student or Teacher"
        value={role}
        onChangeText={setRole}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
          marginTop: 10,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
      />

      <Button title="Log In" onPress={handleLogin} />

      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 16 }}>
          Authenticated: {isAuthenticated ? "Yes" : "No"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LogIn;
