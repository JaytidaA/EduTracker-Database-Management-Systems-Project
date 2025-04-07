import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

const studentsData = [
  { id: '1', name: 'John Doe', image: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Jane Smith', image: 'https://via.placeholder.com/50' },
];

const AttendanceScreen = () => {
  const [attendanceCount, setAttendanceCount] = useState(studentsData.length);

  return (
    <View style={styles.container}>
      {/* QR Code */}
      {/* <QRCode value="https://example.com" size={150} /> */}

      <View style={{ flex: 3, flexDirection: 'column', width: '100%', height: '60%', alignItems: 'center', justifyContent: 'center' }}>
        <Image source={{ uri: "https://tse2.mm.bing.net/th?id=OIP.yNhEU48kUAE37NleMUMZMwHaHS&pid=Api&P=0&h=180" }} style={{ width: '80%', height: '70%', resizeMode: 'contain' }} />
      </View>

      {/* Publish QR Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Publish QR</Text>
      </TouchableOpacity>

      {/* WiFi Details */}
      <Text style={styles.wifiText}>Connected Wifi</Text>
      <Text style={styles.routerText}>
        <Text style={styles.boldText}>Router:</Text> 192.168.1.1
      </Text>

      {/* Attendance Count */}
      <Text style={styles.attendanceCount}>Attendance count: {attendanceCount}</Text>

      {/* Student List */}
      <FlatList
        data={studentsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.studentContainer}>
            <Image source={{ uri: "https://tse4.mm.bing.net/th?id=OIP.Yaficbwe3N2MjD2Sg0J9OgHaHa&pid=Api&P=0&h=180" }} style={styles.profileImage} />
            <Text style={styles.studentName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#4ecdc4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  wifiText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  routerText: {
    fontSize: 18,
    paddingHorizontal: 60,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 60,
  },
  attendanceCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  studentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: 300,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'red',
  },
  studentName: {
    right: -10,
    fontSize: 19,
  },
});
