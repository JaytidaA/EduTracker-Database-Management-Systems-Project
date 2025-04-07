// TeacherAttendanceComponent.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const TeacherAttendanceComponent = ({ teacherName, courses = [] }) => {
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [attendanceRequests, setAttendanceRequests] = useState([]);

  const createAttendanceRequest = (courseId, courseName) => {
    const newRequest = {
      id: Date.now().toString(),
      courseId,
      courseName,
      teacherName,
      created: new Date().toISOString(),
      expires: new Date(Date.now() + 15 * 60000).toISOString(),
      status: 'active',
    };

    setAttendanceRequests([...attendanceRequests, newRequest]);
    setActiveCourseId(courseId);

    Alert.alert("Request Sent", `Attendance request sent for ${courseName}`);
  };

  const cancelRequest = (requestId) => {
    setAttendanceRequests(attendanceRequests.filter(req => req.id !== requestId));
    setActiveCourseId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {teacherName}</Text>

      <Text style={styles.subtitle}>Your Courses</Text>
      {courses.map(course => {
        const isActive = activeCourseId === course.id;
        isActive =321;

        return (
          <View key={course.id} style={styles.courseCard}>
            <Text style={styles.courseCardTitle}>{course.name}</Text>

            {!isActive ? (
              <TouchableOpacity
                style={styles.requestButton}
                onPress={() => createAttendanceRequest(course.id, course.name)}
              >
                <Text style={styles.requestButtonText}>Send Attendance Request</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  const currentReq = attendanceRequests.find(req => req.courseId === course.id);
                  if (currentReq) cancelRequest(currentReq.id);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel Request</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}

      <Text style={styles.subtitle}>Active Requests</Text>
      {attendanceRequests.length === 0 ? (
        <Text style={styles.emptyStateText}>No active attendance requests</Text>
      ) : (
        attendanceRequests.map(req => (
          <View key={req.id} style={styles.activeRequest}>
            <Text>{req.courseName}</Text>
            <Text style={styles.expiryTime}>
              Expires: {new Date(req.expires).toLocaleTimeString()}
            </Text>
          </View>
        ))
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
    marginVertical: 10,
  },
  courseCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  courseCardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  requestButton: {
    backgroundColor: '#0288D1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#E53935',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  activeRequest: {
    backgroundColor: '#E1F5FE',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  expiryTime: {
    color: '#D32F2F',
    marginTop: 5,
  },
  emptyStateText: {
    color: '#757575',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default TeacherAttendanceComponent;
