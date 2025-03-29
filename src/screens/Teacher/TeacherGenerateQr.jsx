import {SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

export default class TeacherGenerateQr extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Labels and Input Fields */}
        {["Connected Wifi", "Teacher’s name", "Subject", "Time", "Something"].map((label, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} />
          </View>
        ))}

        {/* Generate QR Button */}
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("AttendanceScreen")}>
          <Text style={styles.buttonText}>Generate QR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
  }
}


const styles=StyleSheet.create({

  safeContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
    padding: 20,
    marginVertical:80
  },
  inputContainer: {
    marginBottom: 26,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
})