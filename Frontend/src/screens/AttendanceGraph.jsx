import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
  ActivityIndicator
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const AttendanceGraph = ({ courseId, studentId }) => {
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [courseInfo, setCourseInfo] = useState(null);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        // Assume we have the authentication token in storage or context
        const token = await getAuthToken(); // Implement this function based on your auth system
        
        const response = await fetch(`/api/attendance/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch attendance data');
        }
        
        setCourseInfo(data.courseInfo);
        
        // Process the attendance data for the graph
        if (data.attendanceInfo && Array.isArray(data.attendanceInfo)) {
          setAttendanceData(data.attendanceInfo);
          
          // Calculate attendance percentage
          const totalLectures = data.lectureInfo ? data.lectureInfo.length : 0;
          const attendedLectures = data.attendanceInfo.filter(item => item.status === 'p').length;
          
          const percentage = totalLectures > 0 
            ? Math.round((attendedLectures / totalLectures) * 100) 
            : 0;
            
          setAttendancePercentage(percentage);
        }
      } catch (err) {
        console.error('Error fetching attendance data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [courseId, studentId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b5998" />
        <Text style={styles.loadingText}>Loading attendance data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.graphContainer}>
      <View style={styles.graphHeader}>
        <Text style={styles.graphTitle}>Attendance Record</Text>
      </View>
      
      {attendanceData.length > 0 ? (
        <View style={styles.graph}>
          {attendanceData.map((day, index) => {
            // Format date - assuming day has a date property like "2023-04-10"
            const dateObj = new Date(day.date);
            const dateStr = `${dateObj.getMonth()+1}/${dateObj.getDate()}`;
            
            // Status - typically 'p' for present or 'a' for absent
            const isPresent = day.status === 'p';
            
            return (
              <View key={index} style={styles.graphDayColumn}>
                <View 
                  style={[
                    styles.graphBar, 
                    {backgroundColor: isPresent ? "#4CAF50" : "#FF5252"}
                  ]}
                />
                <Text style={styles.graphDate}>{dateStr}</Text>
                <Text style={styles.graphStatus}>{isPresent ? "P" : "A"}</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <Text style={styles.noDataText}>No attendance data available</Text>
      )}
      
      {/* Attendance Alert */}
      <View style={styles.attendanceAlertContainer}>
        <Text style={styles.attendanceText}>
          Attendance in percentage: 
          <Text style={[
            styles.attendancePercentage, 
            {color: attendancePercentage < 75 ? '#FF5252' : '#4CAF50'}
          ]}>
            {` ${attendancePercentage}%`}
          </Text>
        </Text>
        {attendancePercentage < 75 && (
          <View style={styles.alertBox}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <Text style={styles.alertText}>
              Warning: Your attendance is below 75%. Please attend more lectures.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
  },
  errorText: {
    color: '#D32F2F',
  },
  graphContainer: {
    marginBottom: 10,
  },
  graphHeader: {
    marginBottom: 15,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noDataText: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
  },
  graph: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    alignItems: 'flex-end',
  },
  graphDayColumn: {
    alignItems: 'center',
    width: 20, // This will be adjusted dynamically based on data length
    marginHorizontal: 2,
  },
  graphBar: {
    width: 8,
    height: 70, // This will be dynamic based on attendance status
    borderRadius: 4,
  },
  graphDate: {
    fontSize: 8,
    color: '#666',
    marginTop: 5,
    transform: [{ rotate: '-45deg' }],
  },
  graphStatus: {
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 2,
  },
  attendanceAlertContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  attendanceText: {
    fontSize: 14,
    color: '#333',
  },
  attendancePercentage: {
    fontWeight: 'bold',
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  alertIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#D32F2F',
    flex: 1,
  },
});

export default AttendanceGraph;