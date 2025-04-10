// AdminScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const AdminScreen = () => {
  const navigation = useNavigation();
  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin User',
    email: 'admin@university.edu',
    role: 'System Administrator',
    department: 'Information Technology',
    lastLogin: 'April 10, 2025 - 09:45 AM'
  });

  const [students, setStudents] = useState([
    { id: '1', name: 'John Doe', regId: 'REG2025001', email: 'john.doe@university.edu', department: 'Computer Science', phone: '+1-555-123-4567' },
    { id: '2', name: 'Sarah Smith', regId: 'REG2025002', email: 'sarah.smith@university.edu', department: 'Electrical Engineering', phone: '+1-555-987-6543' },
  ]);

  const handleAddStudent = () => {
    navigation.navigate('AddStudent', { 
      onStudentAdded: (newStudent) => {
        setStudents([...students, { id: (students.length + 1).toString(), ...newStudent }]);
      }
    });
  };

  const handleStudentPress = (student) => {
    Alert.alert(
      `${student.name}`,
      `Registration ID: ${student.regId}\nEmail: ${student.email}\nDepartment: ${student.department}\nPhone: ${student.phone}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.adminInfoCard}>
          <Text style={styles.cardTitle}>Admin Information</Text>
          <View style={styles.adminInfoRow}>
            <Text style={styles.adminInfoLabel}>Name:</Text>
            <Text style={styles.adminInfoValue}>{adminInfo.name}</Text>
          </View>
          <View style={styles.adminInfoRow}>
            <Text style={styles.adminInfoLabel}>Email:</Text>
            <Text style={styles.adminInfoValue}>{adminInfo.email}</Text>
          </View>
          <View style={styles.adminInfoRow}>
            <Text style={styles.adminInfoLabel}>Role:</Text>
            <Text style={styles.adminInfoValue}>{adminInfo.role}</Text>
          </View>
          <View style={styles.adminInfoRow}>
            <Text style={styles.adminInfoLabel}>Department:</Text>
            <Text style={styles.adminInfoValue}>{adminInfo.department}</Text>
          </View>
          <View style={styles.adminInfoRow}>
            <Text style={styles.adminInfoLabel}>Last Login:</Text>
            <Text style={styles.adminInfoValue}>{adminInfo.lastLogin}</Text>
          </View>
        </View>

        <View style={styles.studentsSection}>
          <View style={styles.studentsSectionHeader}>
            <Text style={styles.cardTitle}>Student Management</Text>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddStudent}
            >
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {students.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={styles.studentCard}
              onPress={() => handleStudentPress(student)}
            >
              <View style={styles.studentCardContent}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentInfo}>ID: {student.regId}</Text>
                <Text style={styles.studentInfo}>{student.department}</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#0055A4" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#0055A4',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  adminInfoCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0055A4',
    marginBottom: 12,
  },
  adminInfoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  adminInfoLabel: {
    width: 100,
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  adminInfoValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  studentsSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  studentsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#0055A4',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  studentCardContent: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  studentInfo: {
    fontSize: 14,
    color: '#666',
  },
});

export default AdminScreen;