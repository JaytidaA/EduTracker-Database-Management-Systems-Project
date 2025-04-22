import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { configIp } = require("../../config/config.js");

const AttendanceRequest = ({ navigation, route }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [marked, setMarked] = useState(false);
  const [Coursedata, setCourseData] = useState(null);

  const courseId = route.params.courseId; // 🟡 make sure you’re passing this from previous screen

  useEffect(() => {
    const setupTimer = async () => {
      const token = await AsyncStorage.getItem('token');
      const url = `http://${configIp.IP_ADDRESS}:${configIp.PORT}/mark`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        const now = new Date();

        // ✅ Filter sessions by course_ID and within 15 minutes
        const validSession = data.activeSessions.find(session => {
          const lectureTime = new Date(session.lectureDate);
          const timeDiff = (now - lectureTime) / 1000; // in seconds
          return session.course_ID === courseId && timeDiff >= 0 && timeDiff <= 15 * 60;
        });

        if (validSession) {
          const lectureTime = new Date(validSession.lectureDate);
          const secondsLeft = 15 * 60 - Math.floor((now - lectureTime) / 1000);
          setTimeLeft(secondsLeft);
          setCourseData(validSession);
        }

      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    setupTimer();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleMarkAttendance = async () => {
    if (timeLeft <= 0) {
      alert("Attendance window is closed!");
      return;
    }

    setMarked(true);
    const token = await AsyncStorage.getItem('token');

    try {
      const res = await fetch(`http://${configIp.IP_ADDRESS}:${configIp.PORT}/mark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          course_ID: Coursedata.course_ID,
          lecture_Number: Coursedata.lectureNumber,
        }),
      });

      const result = await res.json();
      if (result.success) {
        Alert.alert("Success", "Attendance marked successfully!");
      } else {
        Alert.alert("Error", result.message || "Failed to mark attendance");
      }
    } catch (err) {
      console.error("Error marking attendance:", err);
    }

    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  return (
    Coursedata && timeLeft > 0 ? (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.card}>
          <Text style={styles.label}>Faculty:</Text>
          <Text style={styles.value}>{Coursedata.facName}</Text>

          <Text style={styles.label}>Timing:</Text>
          <Text style={styles.value}>{Coursedata.lectureDate}</Text>

          <Text style={styles.label}>Deadline: {formatTimeLeft()} mins</Text>

          <TouchableOpacity
            style={[styles.markButton, marked && styles.markedButton]}
            onPress={handleMarkAttendance}
            disabled={marked}
          >
            <Text style={styles.markButtonText}>{marked ? 'Marked' : 'Mark'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    ) : (
      <View style={styles.container}>
        <Text>No Lectures Scheduled</Text>
      </View>
    )
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
