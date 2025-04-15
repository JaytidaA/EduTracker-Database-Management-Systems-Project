// AttendanceRequest.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AttendanceRequest = ({ navigation, route }) => {
  // Set initial timeout value to 15 minutes (in seconds)
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [marked, setMarked] = useState(false);
  
  // Course information (would typically come from props/context/API)
  const courseInfo = route.params?.courseInfo || {
    name: 'Database Management System',
    faculty: 'Computer Science',
    time: new Date().toLocaleTimeString()
  };

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time left as minutes:seconds
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleMarkAttendance = () => {
    setMarked(true);
    // In a real app, you would send an API request here
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <View style={styles.card}>
        <Text style={styles.label}>course :</Text>
        <Text style={styles.value}>{courseInfo.name}</Text>
        
        <Text style={styles.label}>Faculty :</Text>
        <Text style={styles.value}>{courseInfo.faculty}</Text>
        
        <Text style={styles.label}>Timing :</Text>
        <Text style={styles.value}>{courseInfo.time}</Text>
        
        <Text style={styles.label}>deadline : {formatTimeLeft()} mins</Text>
        
        <TouchableOpacity 
          style={[styles.markButton, marked && styles.markedButton]}
          onPress={handleMarkAttendance}
          disabled={marked}
        >
          <Text style={styles.markButtonText}>{marked ? 'Marked' : 'Mark'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 350,
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#555',
  },
  markButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markedButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  markButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AttendanceRequest;