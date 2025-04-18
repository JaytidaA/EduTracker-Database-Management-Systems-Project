// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Alert,
//   Dimensions,
//   ActivityIndicator
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const screenWidth = Dimensions.get('window').width;
// // const configIp from '../../config/config';
// const {configIp}=require("../../config/config.js");

// // The component properly accepts route and navigation as props
// const CourseDetailPage = ({ route, navigation }) => {
//   // Safely extract courseId from route params with a fallback
//   const courseId = route?.params?.courseId || 'default';
//   const [activeTab, setActiveTab] = useState('overview');
//   const [requestSent, setRequestSent] = useState(false);
//   const [isRequestLoading, setIsRequestLoading] = useState(false);
//   const [courseData, setCourseData] = useState(null);
//   const [lectureInfo, setLectureInfo] = useState([]);
//   const [attendanceInfo, setAttendanceInfo] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userRole, setUserRole] = useState(null);
  
//   // Fetch user role when component mounts
//   useEffect(() => {
//     const getUserRole = async () => {
//       try {
//         const role = await AsyncStorage.getItem('userRole');
//         setUserRole(role);
//       } catch (error) {
//         console.error('Error getting user role:', error);
//       }
//     };
    
//     getUserRole();
//   }, []);
  
//   // Fetch course data, lecture info, and attendance data
//   useEffect(() => {
//     fetchAttendanceData(courseId);
//   }, [courseId]);
  
//   const fetchAttendanceData = async (cID) => {
//     setLoading(true);
//     setError(null);
  
//     try {
//       const token = await getAuthToken();
//       console.log('Using token:', token);
    
//       const url = `http://${configIp.IP_ADDRESS}:${configIp.PORT}/attendance/${cID}`;
//       console.log('Fetching from URL:', url);
    
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         }
//       });
    
//       console.log('Response status:', response.status);
//       const data = await response.json();
//       console.log('Response data:', data);
//       if (!response.ok) {
//         throw new Error(data.message || `Failed to fetch: ${response.status}`);
//       }
  
//       setCourseData(data.courseInfo);
//       setLectureInfo(data.lectureInfo);
//       setAttendanceInfo(data.attendanceInfo);
//       // Rest of your code...
//     } catch (err) {
//       console.error('Error fetching attendance data:', err);
//       setError(err.message);
//     }
//     finally {
//       setLoading(false);
//     }
//   };
  
//   // Function to get auth token - replace with your actual implementation
//   const getAuthToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       console.log('Retrieved token:', token); // Add this
//       if (!token) {
//         console.warn('No authentication token found');
//       }
//       return token;
//     } catch (err) {
//       console.error('Error getting token from storage', err);
//       return null;
//     }
//   };
  
//   // Function to send attendance request to students
//   const sendAttendanceRequest = async () => {
//     setIsRequestLoading(true);
  
//     try {
//       const token = await getAuthToken(); // ⬅️ Fetch token here
  
//       const response = await fetch(`http://${configIp.IP_ADDRESS}:${configIp.PORT}}/mark`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           course_ID: courseId,
//           lecture_Number: lectureInfo.length + 1
//         }),
//       });
  
//       const data = await response.json();
  
//       if (data.success) {
//         setRequestSent(true);
//         Alert.alert("Attendance Request Sent", "Attendance request has been sent to all students.", [{ text: "OK" }]);
//         setTimeout(() => setRequestSent(false), 5000);
//       } else {
//         Alert.alert("Error", data.message || "Failed to send attendance request");
//       }
//     } catch (err) {
//       console.error('Error sending attendance request:', err);
//       Alert.alert("Error", "Network error while sending attendance request");
//     } finally {
//       setIsRequestLoading(false);
//     }
//   };
  
//   // Navigate to the Attendance component
//   const navigateToAttendance = () => {
//     navigation.navigate('Attendance', { sessions: lectureInfo, courseId });
//   };
  
//   // Calculate attendance percentage
//   const calculateAttendancePercentage = () => {
//     if (!attendanceInfo || attendanceInfo.length === 0 || !lectureInfo || lectureInfo.length === 0) {
//       return 0;
//     }
    
//     const presentCount = attendanceInfo.filter(item => item.status === 'p').length;
//     return Math.round((presentCount / lectureInfo.length) * 100);
//   };
  
//   const renderAttendanceGraph = () => {
//     if (!attendanceInfo || attendanceInfo.length === 0) {
//       return (
//         <View style={styles.noDataContainer}>
//           <Text style={styles.noDataText}>No attendance data available</Text>
//         </View>
//       );
//     }
  
//     // Format attendance data for graph - this needs to be here for all users
//     const graphData = attendanceInfo.map(item => ({
//       date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       status: item.status === 'p' ? "Present" : "Absent"
//     }));
    
//     return (
//       <View style={styles.graphContainer}>
//         <View style={styles.graphHeader}>
//           <Text style={styles.graphTitle}>Attendance Record</Text>
//         </View>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View style={styles.graph}>
//             {graphData.map((day, index) => (
//               <View key={index} style={styles.graphDayColumn}>
//                 <View 
//                   style={[
//                     styles.graphBar, 
//                     {backgroundColor: day.status === "Present" ? "#4CAF50" : "#FF5252"}
//                   ]}
//                 />
//                 <Text style={styles.graphDate}>{day.date}</Text>
//                 <Text style={styles.graphStatus}>{day.status === "Present" ? "P" : "A"}</Text>
//               </View>
//             ))}
//           </View>
//         </ScrollView>
//       </View>
//     );
//   };

//   const renderAssignments = () => {
//     // Since we don't have assignments data in the API yet, we'll use placeholder data or an empty state
//     const assignments = [
//       { id: 1, title: "Binary Tree Implementation", dueDate: "Apr 10, 2025", status: "Pending" },
//       { id: 2, title: "Graph Algorithms Quiz", dueDate: "Apr 15, 2025", status: "Pending" },
//       { id: 3, title: "Hash Table Report", dueDate: "Mar 28, 2025", status: "Submitted" }
//     ];
    
//     if (assignments.length === 0) {
//       return (
//         <View style={styles.noDataContainer}>
//           <Text style={styles.noDataText}>No assignments available</Text>
//         </View>
//       );
//     }
    
//     return (
//       <View style={styles.assignmentsContainer}>
//         <Text style={styles.sectionSubtitle}>Upcoming and Recent Assignments</Text>
//         {assignments.map((assignment) => (
//           <View key={assignment.id} style={styles.assignmentItem}>
//             <View style={styles.assignmentHeader}>
//               <Text style={styles.assignmentTitle}>{assignment.title}</Text>
//               <View style={[
//                 styles.statusBadge, 
//                 {backgroundColor: assignment.status === "Submitted" ? "#4CAF50" : "#FF9800"}
//               ]}>
//                 <Text style={styles.statusText}>{assignment.status}</Text>
//               </View>
//             </View>
//             <Text style={styles.assignmentDueDate}>Due: {assignment.dueDate}</Text>
//           </View>
//         ))}
//       </View>
//     );
//   };
  
//   // Render loading state
//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#ffffff" />
//           <Text style={styles.loadingText}>Loading course data...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }
  
//   // Render error state
//   if (error) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>Error: {error}</Text>
//           <TouchableOpacity 
//             style={styles.retryButton}
//             onPress={() => fetchAttendanceData(courseId)}
//           >
//             <Text style={styles.retryButtonText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }
  
//   // If no courseData yet, show a placeholder
//   if (!courseData) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.background}>
//           <Text style={styles.loadingText}>No course data available</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }
  
//   const attendancePercentage = calculateAttendancePercentage();
//   const hasUpcomingClasses = lectureInfo && lectureInfo.length > 0;
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#3b5998" />
//       <View style={styles.background}>
//         <ScrollView>
//           {/* Header with Back Button */}
//           <View style={styles.header}>
//             <TouchableOpacity 
//               style={styles.backButton}
//               onPress={() => navigation.goBack()}
//             >
//               <Text style={styles.backButtonText}>←</Text>
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Course Details</Text>
//             <TouchableOpacity style={styles.moreButton}>
//               <Text style={styles.moreButtonText}>⋮</Text>
//             </TouchableOpacity>
//           </View>
          
//           {/* Course Info Card */}
//           <View style={styles.courseInfoCard}>
//             <View style={styles.courseIconContainer}>
//               <Text style={styles.courseIcon}>📚</Text>
//             </View>
//             <View style={styles.infoContainer}>
//               <View style={styles.infoRow}>
//                 <Text style={styles.infoLabel}>Course Name:</Text>
//                 <Text style={styles.infoValue}>{courseData.courseName}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.infoLabel}>Course Code:</Text>
//                 <Text style={styles.infoValue}>{courseData.courseCode}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.infoLabel}>Credits:</Text>
//                 <Text style={styles.infoValue}>{courseData.courseCredits}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.infoLabel}>Faculty:</Text>
//                 <Text style={styles.infoValue}>Faculty {courseData.fac_ID}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.infoLabel}>Department:</Text>
//                 <Text style={styles.infoValue}>Department {courseData.dep_ID}</Text>
//               </View>
//             </View>
//           </View>
          
//           {/* Next Class Card - With conditional rendering based on role */}
//           <View style={styles.nextClassContainer}>
//             <Text style={styles.nextClassTitle}>Next Class</Text>
//             <Text style={styles.nextClassDate}>
//               {hasUpcomingClasses ? 
//                 new Date(lectureInfo[lectureInfo.length - 1].date).toLocaleDateString('en-US', { 
//                   weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
//                 }) : 
//                 "No upcoming classes scheduled"}
//             </Text>
            
//             {/* Only show attendance request button for faculty */}
//             {userRole === "faculty" && (
//               <TouchableOpacity 
//                 style={[
//                   styles.attendanceRequestButton, 
//                   isRequestLoading && styles.attendanceRequestButtonLoading,
//                   requestSent && styles.attendanceRequestButtonSent
//                 ]}
//                 onPress={sendAttendanceRequest}
//                 disabled={isRequestLoading || requestSent}
//               >
//                 <Text style={styles.attendanceRequestButtonText}>
//                   {isRequestLoading ? "Sending Request..." : 
//                    requestSent ? "Request Sent ✓" : 
//                    "Request Attendance"}
//                 </Text>
//               </TouchableOpacity>
//             )}

//             {/* See Attendance Button - Only if there are sessions */}
//             {hasUpcomingClasses && (
//               <TouchableOpacity 
//                 style={styles.seeAttendanceButton} 
//                 onPress={navigateToAttendance}
//               >
//                 <Text style={styles.seeAttendanceButtonText}>See Attendance</Text>
//               </TouchableOpacity>
//             )}
//           </View>
          
//           {/* Tabs */}
//           <View style={styles.tabContainer}>
//             <TouchableOpacity 
//               style={[styles.tab, activeTab === 'overview' && styles.activeTab]} 
//               onPress={() => setActiveTab('overview')}
//             >
//               <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={[styles.tab, activeTab === 'materials' && styles.activeTab]} 
//               onPress={() => setActiveTab('materials')}
//             >
//               <Text style={[styles.tabText, activeTab === 'materials' && styles.activeTabText]}>Materials</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={[styles.tab, activeTab === 'assignments' && styles.activeTab]} 
//               onPress={() => setActiveTab('assignments')}
//             >
//               <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>Assignments</Text>
//             </TouchableOpacity>
//           </View>
          
//           {/* Tab Content */}
//           <View style={styles.tabContent}>
//             {activeTab === 'overview' && (
//               <>
//                 {/* Attendance Graph Card */}
//                 <View style={styles.card}>
//                   {renderAttendanceGraph()}
                  
//                   {/* Attendance Alert */}
//                   <View style={styles.attendanceAlertContainer}>
//                     <Text style={styles.attendanceText}>
//                       Attendance in percentage: <Text style={styles.attendancePercentage}>{attendancePercentage}%</Text>
//                     </Text>
//                     {attendancePercentage < 75 && (
//                       <View style={styles.alertBox}>
//                         <Text style={styles.alertIcon}>⚠️</Text>
//                         <Text style={styles.alertText}>
//                           Alert: Your attendance is below 75%. More absences may affect your grade.
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 </View>
                
//                 {/* Recent Assignments */}
//                 {renderAssignments()}
//               </>
//             )}
            
//             {activeTab === 'materials' && (
//               <View style={styles.card}>
//                 <Text style={styles.sectionSubtitle}>Course Materials</Text>
//                 <View style={styles.noContentContainer}>
//                   <Text style={styles.noContentText}>No course materials available yet.</Text>
//                 </View>
//               </View>
//             )}
            
//             {activeTab === 'assignments' && (
//               <View style={styles.card}>
//                 {renderAssignments()}
//               </View>
//             )}
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// // Define default props to handle the case where props are missing
// CourseDetailPage.defaultProps = {
//   route: { params: { courseId: null } },
//   navigation: { goBack: () => console.log('Navigation not provided') }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//     backgroundColor: '#3b5998',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#3b5998',
//   },
//   loadingText: {
//     color: 'white',
//     marginTop: 10,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#3b5998',
//     padding: 20,
//   },
//   errorText: {
//     color: 'white',
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   retryButton: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   noContentContainer: {
//     padding: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   noContentText: {
//     color: '#666',
//     fontSize: 14,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backButtonText: {
//     fontSize: 20,
//     color: 'white',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   moreButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   moreButtonText: {
//     fontSize: 20,
//     color: 'white',
//   },
//   courseInfoCard: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 16,
//     margin: 20,
//     marginTop: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     flexDirection: 'row',
//   },
//   courseIconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#f0f2f5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   courseIcon: {
//     fontSize: 30,
//   },
//   infoContainer: {
//     flex: 1,
//   },
//   infoRow: {
//     flexDirection: 'row', 
//     marginBottom: 8,
//   },
//   infoLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     width: 100,
//     color: '#666',
//   },
//   infoValue: {
//     fontSize: 14,
//     flex: 1,
//     color: '#333',
//     fontWeight: '500',
//   },
//   nextClassContainer: {
//     backgroundColor: '#4267B2',
//     borderRadius: 15,
//     padding: 16,
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   nextClassTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 8,
//   },
//   nextClassDate: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 8,
//   },
//   nextClassDetails: {
//     fontSize: 14,
//     color: 'rgba(255,255,255,0.8)',
//     marginBottom: 2,
//   },
//   attendanceRequestButton: {
//     backgroundColor: '#FFD700',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   attendanceRequestButtonLoading: {
//     backgroundColor: '#FFF59D',
//   },
//   attendanceRequestButtonSent: {
//     backgroundColor: '#8BC34A',
//   },
//   attendanceRequestButtonText: {
//     color: '#333',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   seeAttendanceButton: {
//     marginTop: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: '#007AFF',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   seeAttendanceButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   markAttendanceButton: {
//     backgroundColor: '#4CAF50',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   markAttendanceButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     marginHorizontal: 20,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   activeTab: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//   },
//   tabText: {
//     color: 'rgba(255,255,255,0.8)',
//     fontWeight: '500',
//   },
//   activeTabText: {
//     color: '#3b5998',
//     fontWeight: 'bold',
//   },
//   tabContent: {
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 16,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   graphContainer: {
//     marginBottom: 16,
//   },
//   graphHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   graphTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   graph: {
//     flexDirection: 'row',
//     height: 150,
//     alignItems: 'flex-end',
//     paddingVertical: 10,
//   },
//   graphDayColumn: {
//     width: 40,
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   graphBar: {
//     width: 20,
//     height: 100,
//     borderRadius: 4,
//   },
//   graphDate: {
//     fontSize: 10,
//     color: '#666',
//     marginTop: 5,
//   },
//   graphStatus: {
//     fontSize: 10,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   attendanceAlertContainer: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//   },
//   attendanceText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   attendancePercentage: {
//     fontWeight: 'bold',
//     color: '#4267B2',
//   },
//   alertBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF3CD',
//     padding: 10,
//     borderRadius: 6,
//     marginTop: 10,
//   },
//   alertIcon: {
//     fontSize: 16,
//     marginRight: 10,
//   },
//   alertText: {
//     fontSize: 12,
//     color: '#856404',
//     flex: 1,
//   },
//   assignmentsContainer: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 16,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionSubtitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 12,
//   },
//   assignmentItem: {
//     backgroundColor: '#f9f9f9',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   assignmentHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   assignmentTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//     flex: 1,
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//   },
//   statusText: {
//     fontSize: 10,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   assignmentDueDate: {
//     fontSize: 12,
//     color: '#666',
//   },
//   noDataContainer: {
//     padding: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   noDataText: {
//     color: '#666',
//     fontSize: 14,
//   }
// });

// export default CourseDetailPage;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;
const {configIp} = require("../../config/config.js");

// The component properly accepts route and navigation as props
const CourseDetailPage = ({ route, navigation }) => {
  // Safely extract courseId from route params with a fallback
  const courseId = route?.params?.courseId || 'default';
  const [activeTab, setActiveTab] = useState('overview');
  const [requestSent, setRequestSent] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [lectureInfo, setLectureInfo] = useState([]);
  const [attendanceInfo, setAttendanceInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [remainingTime, setRemainingTime] = useState(15 * 60); // 15 minutes in seconds
  const [timer, setTimer] = useState(null);
  
  // Fetch user role when component mounts
  useEffect(() => {
    const getUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        setUserRole(role);
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    };
    
    getUserRole();
  }, []);
  
  // Fetch course data, lecture info, and attendance data
  useEffect(() => {
    fetchAttendanceData(courseId);
  }, [courseId]);
  
  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);
  
  const fetchAttendanceData = async (cID) => {
    setLoading(true);
    setError(null);
  
    try {
      const token = await getAuthToken();
      console.log('Using token:', token);
    
      const url = `http://${configIp.IP_ADDRESS}:${configIp.PORT}/attendance/${cID}`;
      console.log('Fetching from URL:', url);
    
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
    
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (!response.ok) {
        throw new Error(data.message || `Failed to fetch: ${response.status}`);
      }
  
      setCourseData(data.courseInfo);
      setLectureInfo(data.lectureInfo);
      setAttendanceInfo(data.attendanceInfo);
    } catch (err) {
      console.error('Error fetching attendance data:', err);
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  };
  
  // Function to get auth token
  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Retrieved token:', token);
      if (!token) {
        console.warn('No authentication token found');
      }
      return token;
    } catch (err) {
      console.error('Error getting token from storage', err);
      return null;
    }
  };
  
  // Format remaining time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Function to send attendance request to students
  // Function to send attendance request to students
const requestAttendance = async () => {
  setIsRequestLoading(true);

  try {
    const token = await getAuthToken();

    const response = await fetch(`http://${configIp.IP_ADDRESS}:${configIp.PORT}/mark`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        course_ID: courseId,
        course_name: courseData?.courseName,
        faculty: courseData?.fac_ID,
        lecture_Number: lectureInfo.length + 1,
      }),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Attendance request response:', data);

    if (response.ok && data.success) {
      // Refetch attendance data to get the latest lecture info
      fetchAttendanceData(courseId);
      
      setRequestSent(true);
      
      // Start 15-minute countdown timer
      setRemainingTime(15 * 60);
      
      const newTimer = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(newTimer);
            setRequestSent(false);
            Alert.alert("Time's up", "The attendance request has expired.");
            return 15 * 60;  
          }
          return prevTime - 1;
        });
      }, 1000);
      
      setTimer(newTimer);
      
      Alert.alert("Attendance Request Sent", "Attendance request has been sent to all students.", [{ text: "OK" }]);
    } else {
      Alert.alert("Error", data.message || "Failed to send attendance request");
    }
  } catch (err) {
    console.error('Error sending attendance request:', err);
    Alert.alert("Error", "Network error while sending attendance request");
  } finally {
    setIsRequestLoading(false);
  }
};
  
  // Navigate to the Attendance component
  // const navigateToAttendance = () => {
  //   navigation.navigate('AttendanceRequest', { sessions: lectureInfo, courseId });
  // };
  
  // Calculate attendance percentage
  const calculateAttendancePercentage = () => {
    if (!attendanceInfo || attendanceInfo.length === 0 || !lectureInfo || lectureInfo.length === 0) {
      return 0;
    }
    
    const presentCount = attendanceInfo.filter(item => item.status === 'p').length;
    return Math.round((presentCount / lectureInfo.length) * 100);
  };
  
  const renderAttendanceGraph = () => {
    if (!attendanceInfo || attendanceInfo.length === 0) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No attendance data available</Text>
        </View>
      );
    }
  
    // Format attendance data for graph
    const graphData = attendanceInfo.map(item => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      status: item.status === 'p' ? "Present" : "Absent"
    }));
    
    return (
      <View style={styles.graphContainer}>
        <View style={styles.graphHeader}>
          <Text style={styles.graphTitle}>Attendance Record</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.graph}>
            {graphData.map((day, index) => (
              <View key={index} style={styles.graphDayColumn}>
                <View 
                  style={[
                    styles.graphBar, 
                    {backgroundColor: day.status === "Present" ? "#4CAF50" : "#FF5252"}
                  ]}
                />
                <Text style={styles.graphDate}>{day.date}</Text>
                <Text style={styles.graphStatus}>{day.status === "Present" ? "P" : "A"}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderAssignments = () => {
    // Since we don't have assignments data in the API yet, we'll use placeholder data or an empty state
    const assignments = [
      { id: 1, title: "Binary Tree Implementation", dueDate: "Apr 10, 2025", status: "Pending" },
      { id: 2, title: "Graph Algorithms Quiz", dueDate: "Apr 15, 2025", status: "Pending" },
      { id: 3, title: "Hash Table Report", dueDate: "Mar 28, 2025", status: "Submitted" }
    ];
    
    if (assignments.length === 0) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No assignments available</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.assignmentsContainer}>
        <Text style={styles.sectionSubtitle}>Upcoming and Recent Assignments</Text>
        {assignments.map((assignment) => (
          <View key={assignment.id} style={styles.assignmentItem}>
            <View style={styles.assignmentHeader}>
              <Text style={styles.assignmentTitle}>{assignment.title}</Text>
              <View style={[
                styles.statusBadge, 
                {backgroundColor: assignment.status === "Submitted" ? "#4CAF50" : "#FF9800"}
              ]}>
                <Text style={styles.statusText}>{assignment.status}</Text>
              </View>
            </View>
            <Text style={styles.assignmentDueDate}>Due: {assignment.dueDate}</Text>
          </View>
        ))}
      </View>
    );
  };


  // async function markStudentAttendance() {
  //   const token = await AsyncStorage.getItem('token');

  //   fetch(`http://${configIp.IP_ADDRESS}:${configIp.PORT}/attendance/mark`, {
  //    method:'POST',
  //    headers:{
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //    },
  //    body: JSON.stringify({
  //      courseId: courseId,
  //      lecture_Number:lectureInfo[0].lecture_Number
  //    })
     
  //   })
  // }
  
  // Render loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading course data...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => fetchAttendanceData(courseId)}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  // If no courseData yet, show a placeholder
  if (!courseData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.background}>
          <Text style={styles.loadingText}>No course data available</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const attendancePercentage = calculateAttendancePercentage();
  const hasUpcomingClasses = lectureInfo && lectureInfo.length > 0;
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3b5998" />
      <View style={styles.background}>
        <ScrollView>
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Course Details</Text>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreButtonText}>⋮</Text>
            </TouchableOpacity>
          </View>
          
          {/* Course Info Card */}
          <View style={styles.courseInfoCard}>
            <View style={styles.courseIconContainer}>
              <Text style={styles.courseIcon}>📚</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Course Name:</Text>
                <Text style={styles.infoValue}>{courseData.courseName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Course Code:</Text>
                <Text style={styles.infoValue}>{courseData.courseCode}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Credits:</Text>
                <Text style={styles.infoValue}>{courseData.courseCredits}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Faculty:</Text>
                <Text style={styles.infoValue}>Faculty {courseData.fac_ID}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Department:</Text>
                <Text style={styles.infoValue}>Department {courseData.dep_ID}</Text>
              </View>
            </View>
          </View>
          
          {/* Request Attendance Button */}
          {userRole === "faculty" && (
            <View style={styles.requestAttendanceCard}>
              {requestSent ? (
                <View style={styles.requestActiveContainer}>
                  <Text style={styles.requestActiveText}>
                    Attendance request active - Time remaining: {formatTime(remainingTime)}
                  </Text>
                  <TouchableOpacity 
                    style={styles.cancelRequestButton}
                    onPress={() => {
                      if (timer) {
                        clearInterval(timer);
                      }
                      setRequestSent(false);
                      setRemainingTime(15 * 60);
                      Alert.alert("Cancelled", "Attendance request has been cancelled");
                    }}
                  >
                    <Text style={styles.cancelRequestButtonText}>Cancel Request</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={[
                    styles.requestAttendanceButton, 
                    isRequestLoading && styles.requestAttendanceButtonLoading
                  ]}
                  onPress={requestAttendance}
                  disabled={isRequestLoading}
                >
                  <Text style={styles.requestAttendanceButtonText}>
                    {isRequestLoading ? "Sending Request..." : "Request Attendance"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {
            userRole === "student" && (
              <View style={styles.requestAttendanceCard}>
                <TouchableOpacity 
                  style={[
                    styles.requestAttendanceButton, 
                    isRequestLoading && styles.requestAttendanceButtonLoading
                  ]}
                  onPress={()=>{

                    requestAttendance,navigation.navigate('AttendanceRequest', { sessions: lectureInfo, courseId });
                  }
                }
                  disabled={isRequestLoading}
                >
                  <Text style={styles.requestAttendanceButtonText}>
                    {isRequestLoading ? "Sending Request..." : "Mark Attendance"}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }
          
          {/* Next Class Card */}

          
          {
            userRole === "faculty" && (
              
              <View style={styles.nextClassContainer}>
                <Text style={styles.nextClassTitle}>Next Class</Text>
                <Text style={styles.nextClassDate}>
                  {hasUpcomingClasses ? 
                    new Date(lectureInfo[lectureInfo.length - 1].date).toLocaleDateString('en-US', { 
                      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
                    }) : 
                    "No upcoming classes scheduled"}
                </Text>
                
                {/* See Attendance Button - Only if there are sessions */}
                {hasUpcomingClasses && (
                  <TouchableOpacity 
                    style={styles.seeAttendanceButton} 
                    // onPress={navigateToAttendance}
                  >
                    <Text style={styles.seeAttendanceButtonText}>See Attendance</Text>
                  </TouchableOpacity>
                )}
              </View>
            )
          }
              
            
          
          
          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'overview' && styles.activeTab]} 
              onPress={() => setActiveTab('overview')}
            >
              <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'materials' && styles.activeTab]} 
              onPress={() => setActiveTab('materials')}
            >
              <Text style={[styles.tabText, activeTab === 'materials' && styles.activeTabText]}>Materials</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'assignments' && styles.activeTab]} 
              onPress={() => setActiveTab('assignments')}
            >
              <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>Assignments</Text>
            </TouchableOpacity>
          </View>
          
          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'overview' && (
              <>
                {/* Attendance Graph Card */}
                <View style={styles.card}>
                  {renderAttendanceGraph()}
                  
                  {/* Attendance Alert */}
                  <View style={styles.attendanceAlertContainer}>
                    <Text style={styles.attendanceText}>
                      Attendance in percentage: <Text style={styles.attendancePercentage}>{attendancePercentage}%</Text>
                    </Text>
                  </View>
                </View>
                
                {/* Recent Assignments */}
                {renderAssignments()}
              </>
            )}
            
            {activeTab === 'materials' && (
              <View style={styles.card}>
                <Text style={styles.sectionSubtitle}>Course Materials</Text>
                <View style={styles.noContentContainer}>
                  <Text style={styles.noContentText}>No course materials available yet.</Text>
                </View>
              </View>
            )}
            
            {activeTab === 'assignments' && (
              <View style={styles.card}>
                {renderAssignments()}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Define default props to handle the case where props are missing
CourseDetailPage.defaultProps = {
  route: { params: { courseId: null } },
  navigation: { goBack: () => console.log('Navigation not provided') }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#3b5998',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b5998',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    padding: 20,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noContentContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noContentText: {
    color: '#666',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonText: {
    fontSize: 20,
    color: 'white',
  },
  courseInfoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    margin: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
  },
  courseIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  courseIcon: {
    fontSize: 30,
  },
  infoContainer: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row', 
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    width: 100,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    flex: 1,
    color: '#333',
    fontWeight: '500',
  },
  requestAttendanceCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requestAttendanceButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestAttendanceButtonLoading: {
    backgroundColor: '#81C784',
  },
  requestAttendanceButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  requestActiveContainer: {
    padding: 15,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  requestActiveText: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 10,
    fontWeight: '500',
  },
  cancelRequestButton: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelRequestButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  nextClassContainer: {
    backgroundColor: '#4267B2',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  nextClassTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  nextClassDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  nextClassDetails: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  seeAttendanceButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  seeAttendanceButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  tabText: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
  tabContent: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  graphContainer: {
    marginBottom: 16,
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  graph: {
    flexDirection: 'row',
    height: 150,
    alignItems: 'flex-end',
    paddingVertical: 10,
  },
  graphDayColumn: {
    width: 40,
    alignItems: 'center',
    marginRight: 10,
  },
  graphBar: {
    width: 20,
    height: 100,
    borderRadius: 4,
  },
  graphDate: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
  graphStatus: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  attendanceAlertContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  attendanceText: {
    fontSize: 14,
    color: '#333',
  },
  attendancePercentage: {
    fontWeight: 'bold',
    color: '#4267B2',
  },
  assignmentsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  assignmentItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  assignmentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  assignmentDueDate: {
    fontSize: 12,
    color: '#666',
  },
  noDataContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    color: '#666',
    fontSize: 14,
  }
});

export default CourseDetailPage;
