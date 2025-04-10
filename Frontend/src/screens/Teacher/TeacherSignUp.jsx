// import { Text, View ,StyleSheet,Image,TextInput,TouchableOpacity,Button} from 'react-native'
// import React, { Component } from 'react'

// export default class TeacherSignUp extends Component {
//   render() {
//     const { navigation } = this.props;
//     return (
//       <View style={styles.container}>
//         {/* Logo */}
//         <Image source={{uri:"https://res.cloudinary.com/dsctxyrvw/image/upload/v1743089371/image_6_mjlkbn.png"}} style={styles.logo} />

//         <Text style={styles.title}>Sign Up</Text>

//         {/* Input Fields */}
//         <Text style={styles.label}>Teacher's name</Text>
//         <TextInput style={styles.input} placeholder="Enter your name" />

//         <Text style={styles.label}>Subject</Text>
//         <TextInput style={styles.input} placeholder="Enter subject" />

//         <Text style={styles.label}>Email</Text>
//         <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />

//         <Text style={styles.label}>Password</Text>
//         <TextInput style={styles.input} placeholder="Enter password" secureTextEntry />

//         {/* Forgot Password */}
//         <TouchableOpacity>
//           <Text style={styles.forgotPassword}>Forgot Password ?</Text>
//         </TouchableOpacity>

//         {/* Sign-In Button */}
//         <Button title="Sign Up" mode="contained" style={styles.signInButton} onPress={() => {navigation.navigate("TeacherGenerateQr")}}>Sign In</Button>

//         {/* Google Sign-In Button */}
//         <TouchableOpacity style={styles.googleButton}>
//           <Image source={{uri:"https://tse2.mm.bing.net/th?id=OIP.3Hg4QqMapQoM8GGWqAGcxQHaHa&pid=Api&P=0&h=180"}} style={styles.googleIcon} />
//           <Text style={styles.googleText}>Sign in with Google</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 20,
//     alignItems: 'center',
//   },
//   logo: {
//     width: '60%',
//     height: '16%',
//     resizeMode: 'contain',
//     marginBottom: 20,
//     marginVertical:10
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   label: {
//     alignSelf: 'flex-start',
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   input: {
//     width: '100%',
//     height: 60,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: '#f5f5f5',
//     marginVertical:10
//   },
//   forgotPassword: {
//     alignSelf: 'flex-end',
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 15,
//   },
//   signInButton: {
//     width: '100%',
//     backgroundColor: '#0000ff',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   googleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 10,
//     marginVertical:20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     width: '100%',
//     justifyContent: 'center',
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   googleText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },



// })


import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';

export default class TeacherSignUp extends Component {
  state = {
    name: '',
    subject: '',
    email: '',
    phone: '',
    admin: '',
    password: '',
    confirmPassword: '',
    isPasswordVisible: false,
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dsctxyrvw/image/upload/v1743089371/image_6_mjlkbn.png"
                }}
                style={styles.logo}
              />
              <Text style={styles.title}>Teacher Sign Up</Text>
              <Text style={styles.subtitle}>Create your account to get started</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Teacher's Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={this.state.name}
                  onChangeText={(text) => this.setState({ name: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>ID</Text>
                <TextInput
                  style={styles.input}
                  placeholder="What is your ID?"
                  value={this.state.subject}
                  onChangeText={(text) => this.setState({ subject: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={this.state.email}
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={this.state.phone}
                  onChangeText={(text) => this.setState({ phone: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Admin</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Are you an admin?"
                  value={this.state.admin}
                  onChangeText={(text) => this.setState({ admin: text })}
                />
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Create a strong password"
                    secureTextEntry={!this.state.isPasswordVisible}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() =>
                      this.setState({ isPasswordVisible: !this.state.isPasswordVisible })
                    }
                  >
                    <Text>{this.state.isPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Re-enter your password"
                    secureTextEntry={!this.state.isPasswordVisible}
                    value={this.state.confirmPassword}
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => {
                  const { password, confirmPassword } = this.state;
                  if (password !== confirmPassword) {
                    Alert.alert("Error", "Passwords do not match");
                    return;
                  }
                  navigation.navigate("TeacherGenerateQr");
                }}
              >
                <Text style={styles.signUpText}>Create Account</Text>
              </TouchableOpacity>

              <View style={styles.signInPrompt}>
                <Text style={styles.signInText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                  <Text style={styles.signInLink}> Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  keyboardAvoid: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 30 },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  logo: {
    width: 150,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    marginBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 5,
    marginBottom: 20,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007BFF',
  },
  signUpButton: {
    backgroundColor: '#0000ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 14,
    color: '#333',
  },
  signInLink: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '600',
  },
});
