import { Text, View ,StyleSheet,Image,TextInput,TouchableOpacity,Button} from 'react-native'
import React, { Component } from 'react'

export default class TeacherSignUp extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {/* Logo */}
        <Image source={{uri:"https://res.cloudinary.com/dsctxyrvw/image/upload/v1743089371/image_6_mjlkbn.png"}} style={styles.logo} />

        <Text style={styles.title}>Sign Up</Text>

        {/* Input Fields */}
        <Text style={styles.label}>Teacher's name</Text>
        <TextInput style={styles.input} placeholder="Enter your name" />

        <Text style={styles.label}>Subject</Text>
        <TextInput style={styles.input} placeholder="Enter subject" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Enter password" secureTextEntry />

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password ?</Text>
        </TouchableOpacity>

        {/* Sign-In Button */}
        <Button title="Sign Up" mode="contained" style={styles.signInButton} onPress={() => {navigation.navigate("TeacherGenerateQr")}}>Sign In</Button>

        {/* Google Sign-In Button */}
        <TouchableOpacity style={styles.googleButton}>
          <Image source={{uri:"https://tse2.mm.bing.net/th?id=OIP.3Hg4QqMapQoM8GGWqAGcxQHaHa&pid=Api&P=0&h=180"}} style={styles.googleIcon} />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    height: '16%',
    resizeMode: 'contain',
    marginBottom: 20,
    marginVertical:10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    marginVertical:10
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    fontSize: 14,
    color: 'black',
    marginBottom: 15,
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginVertical:20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },



})