import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import React, { Component } from 'react'

export default class StudentSignUp extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Image 
                source={{uri:"https://res.cloudinary.com/dsctxyrvw/image/upload/v1743089371/image_6_mjlkbn.png"}} 
                style={styles.logo} 
                resizeMode="contain"
              />
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Enter your details to get started</Text>
            </View>
            
            {/* Form Container */}
            <View style={styles.formContainer}>
              {/* Input Fields */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Student Name</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Enter your full name" 
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Dep. ID</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput 
                      style={styles.input} 
                      placeholder="02" 
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Phone No.</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput 
                      style={styles.input} 
                      placeholder="8956234556" 
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Roll No.</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="231180033" 
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="xyz_b23@it.vjti.ac.in" 
                    keyboardType="email-address" 
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Create a strong password" 
                    secureTextEntry 
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotContainer}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Sign-Up Button */}
              <TouchableOpacity 
                style={styles.signUpButton}
                onPress={() => navigation.navigate("StudentDashboard")}
              >
                <Text style={styles.signUpButtonText}>Create Account</Text>
              </TouchableOpacity>

              {/* Divider */}
              {/* <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View> */}

              {/* Google Sign-In Button */}
              {/* <TouchableOpacity style={styles.googleButton}>
                <Image 
                  source={{uri:"https://tse2.mm.bing.net/th?id=OIP.3Hg4QqMapQoM8GGWqAGcxQHaHa&pid=Api&P=0&h=180"}} 
                  style={styles.googleIcon} 
                  resizeMode="contain"
                />
                <Text style={styles.googleText}>Continue with Google</Text>
              </TouchableOpacity> */}

              {/* Already have account */}
              <View style={styles.accountContainer}>
                <Text style={styles.accountText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#333',
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginVertical: 8,
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a6fff',
  },
  signUpButton: {
    backgroundColor: '#4a6fff',
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#4a6fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    paddingHorizontal: 12,
    color: '#999',
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    height: 54,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  accountText: {
    fontSize: 14,
    color: '#666',
  },
  loginText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a6fff',
  },
})