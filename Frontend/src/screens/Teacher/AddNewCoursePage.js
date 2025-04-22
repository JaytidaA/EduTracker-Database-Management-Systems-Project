import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configIp from '../../../config/config';

const AddNewCoursePage = ({ navigation }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [credits, setCredits] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate form inputs
    if (!courseName || !courseCode || !credits || !department) {
      Alert.alert('Error', 'All fields marked with * are required');
      return;
    }

    try {
      setIsLoading(true);

      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        Alert.alert('Error', 'Authentication error. Please login again.');
        navigation.replace('LogIn');
        return;
      }

      // Create course data object
      const courseData = {
        courseName,
        courseCode,
        credits: parseInt(credits, 10),
        department,
        description,
        facultyId: userId,
      };

      // Send API request
      const response = await fetch(
        `http://${configIp.IP_ADDRESS}:${configIp.PORT}/courses/add`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseData),
        }
      );

      const result = await response.json();

      if (result.success) {
        Alert.alert(
          'Success',
          'Course added successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Error', result.message || 'Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      Alert.alert('Error', 'Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3b5998" />
      <View style={styles.background}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add New Course</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Course Information</Text>
            <View style={styles.formContainer}>
              <Text style={styles.inputLabel}>Course Name *</Text>
              <TextInput
                style={styles.input}
                value={courseName}
                onChangeText={setCourseName}
                placeholder="Enter course name"
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Course Code *</Text>
              <TextInput
                style={styles.input}
                value={courseCode}
                onChangeText={setCourseCode}
                placeholder="e.g. CS101"
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Credits *</Text>
              <TextInput
                style={styles.input}
                value={credits}
                onChangeText={setCredits}
                placeholder="Enter credit hours"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />

              <Text style={styles.inputLabel}>Department *</Text>
              <TextInput
                style={styles.input}
                value={department}
                onChangeText={setDepartment}
                placeholder="Enter department name"
                placeholderTextColor="#999"
              />

              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter course description"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Add Course</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2025 University Student Portal
            </Text>
            <Text style={styles.footerText}>Version 2.5.0</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  background: {
    flex: 1,
    backgroundColor: '#3b5998',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b5998',
    marginBottom: 15,
  },
  formContainer: {
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 20,
  },
  submitButton: {
    backgroundColor: '#4a6da7',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    marginVertical: 3,
    fontSize: 12,
  },
});

export default AddNewCoursePage;