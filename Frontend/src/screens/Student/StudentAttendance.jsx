// StudentAttendanceComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';

const StudentAttendanceComponent = ({ studentName, courses = [] }) => {
  const [attendanceRequests, setAttendanceRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // This would be replaced with actual API calls to fetch attendance requests
  useEffect(() => {
    // Simulate fetching data
    if (courses.length > 0) {
      const sampleRequest = {
        id: Date.now().toString(),
        courseName: courses[0].name,
        teacherName: 'Prof. Smith',
        created: new Date().toISOString(),
        expires: new Date(Date.now() + 15 * 60000).toISOString(),
        status: 'pending'
      };

      setAttendanceRequests([sampleRequest]);
    }
  }, [courses]);

  const markAttendance = async (requestId) => {
    setLoading(true);
    try {
      // In a real app, you would call your API here

      // Update local state
      setTimeout(() => {
        const updatedRequests = attendanceRequests.map(req =>
          req.id === requestId ? { ...req, status: 'marked' } : req
        );

        setAttendanceRequests(updatedRequests);
        setLoading(false);

        Alert.alert(
          "Success",
          "Your attendance has been marked successfully!"
        );
      }, 1000);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Could not mark attendance. Please try again.");
    }
  };

  const renderAttendanceRequest = ({ item }) => {
    const isExpired = new Date(item.expires) < new Date();
    const isPending = item.status === 'pending' && !isExpired;

    return (
      <View style={styles.requestCard}>
        <Text style={styles.courseName}>{item.courseName}</Text>
        <Text style={styles.teacherName}>Teacher: {item.teacherName}</Text>

        <Text style={styles.requestTime}>
          Requested: {new Date(item.created).toLocaleTimeString()}
        </Text>

        <Text style={styles.expiryTime}>
          Expires: {new Date(item.expires).toLocaleTimeString()}
        </Text>

        {isPending ? (
          <TouchableOpacity
            style={styles.markButton}
            onPress={() => markAttendance(item.id)}
            disabled={loading}
          >
            <Text style={styles.markButtonText}>
              {loading ? "Marking..." : "Mark Present"}
            </Text>
          </TouchableOpacity>
        ) : item.status === 'marked' ? (
          <View style={styles.markedContainer}>
            <Text style={styles.markedText}>✓ Attendance Marked</Text>
          </View>
        ) : (
          <View style={styles.expiredContainer}>
            <Text style={styles.expiredText}>Expired</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {studentName}</Text>

      <Text style={styles.subtitle}>Your Courses</Text>
      {courses.map(course => (
        <View key={course.id} style={styles.courseCard}>
          <Text style={styles.courseCardTitle}>{course.name}</Text>
        </View>
      ))}

      <Text style={styles.subtitle}>Attendance Requests</Text>

      {attendanceRequests.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No active attendance requests</Text>
        </View>
      ) : (
        <FlatList
          data={attendanceRequests}
          renderItem={renderAttendanceRequest}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  courseCardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  teacherName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  requestTime: {
    fontSize: 14,
    marginBottom: 5,
  },
  expiryTime: {
    fontSize: 14,
    marginBottom: 15,
    color: '#D32F2F',
  },
  markButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  markButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  markedContainer: {
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  markedText: {
    color: '#2E7D32',
    fontWeight: '500',
  },
  expiredContainer: {
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  expiredText: {
    color: '#D32F2F',
    fontWeight: '500',
  },
  emptyState: {
    marginTop: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#757575',
  },
});

export default StudentAttendanceComponent;
