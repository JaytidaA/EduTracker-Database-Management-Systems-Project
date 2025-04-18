// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Image,
//   Button
// } from 'react-native';
// import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// //
// // const {useAuth} from "../AuthContext";
// import {useAuth} from "../AuthContext";
// // Dummy user data
// const dummyUserData = {
//   username: 'jsmith2023',
//   studentName: 'John Smith',
//   registrationNumber: 'REG20240315',
//   email: 'john.smith@university.edu',
//   courses: [
//     {name: 'Advanced Data Structures', faculty: 'Computer Science'},
//     {name: 'Machine Learning Fundamentals', faculty: 'Artificial Intelligence'},
//     {name: 'Design Thinking Workshop', faculty: 'Design & Innovation'},
//   ],
// };

// // async function Request(){
// //   const d = await fetch('192.168.0.69:3000/home?ID=2&role=student', method=get);
// //   console.log(d)
// // }

// // const Request = async () => {
// //   try {
// //     const response = await fetch(
// //       'http://192.168.0.69:3000/home?ID=2&role=student',
// //     );
// //     const data = await response.json();
// //     console.log('Fetched Data:', data);
// //     return data;
// //   } catch (error) {
// //     console.error('Error fetching data:', error);
// //   }
// // };

// // useEffect(() => {
// //   const getAuthState = async () => {
// //     const value = await AsyncStorage.getItem("isAuthenticated");
// //     if (value === "false") setIsAuthenticated(false); // 🟢 Use context's setter
// //   };
// //   getAuthState();
// // }, []);

// // const handleLogout = async () => {
//   //   await AsyncStorage.setItem("isAuthenticated", "false");
//   //   setIsAuthenticated(false); // 🟢 This updates context and triggers re-render
//   //   // console.log("Saved Auth State: false");
//   // };

//   const HomePage= ({navigation}) => {
//     // const value = async () => await AsyncStorage.getItem('isAuthenticated');
//     // const value = async () => await AsyncStorage.getItem('isAuthenticated');
//     const [value,setValue]=useState(false);
//     const [userData, setUserData] = useState(dummyUserData);
//     const { isAuthenticated, setIsAuthenticated } = useAuth();
//     useEffect(() => {
//       const getAuthState = async () => {
//         try {
//           const value = await AsyncStorage.getItem("isAuthenticated");
//           if (value === "true") {
//             setIsAuthenticated(true);
//           } else {
//             setIsAuthenticated(false);
//           }
//           console.log("Auth state on load:", value);
//         } catch (error) {
//           console.error("Error reading auth state:", error);
//         }
//       };

//       getAuthState();
//     }, [setIsAuthenticated]);

//       // const getItem = async () => {
//       //   try {
//       //     const storedValue = await AsyncStorage.getItem('isAuthenticated');
//       //     if (storedValue !== null) {
//       //       setValue(storedValue); // Update state
//       //       console.log('Retrieved item:', storedValue); // Log the value here
//       //     } else {
//       //       console.log('No item found');
//       //     }
//       //   } catch (error) {
//       //     console.log('Error retrieving item:', error);
//       //   }
//       // };
//       const getItem = async () => {
//         try {
//           const storedValue = await AsyncStorage.getItem('isAuthenticated');
//           console.log('Retrieved item:', storedValue); // 👈 This will print it to the debug console
//           setValue(storedValue); // This updates the state variable `value`
//         } catch (error) {
//           console.log('Error retrieving item:', error);
//         }
//       };

//       const handleLogout = async () => {
//         try {
//           await AsyncStorage.setItem("isAuthenticated", "false");
//           setIsAuthenticated(false);
//           console.log("Logged out successfully");
//         } catch (error) {
//           console.error("Error during logout:", error);
//         }
//       };
//   // const d = Request();

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#3b5998" />
//       <View style={styles.background}>
//         <ScrollView>
//           <View style={styles.header}>
//             {/* <Image
//               source={require('./assets/logo.png')} // Make sure to add a logo.png file to your assets folder
//               style={styles.logo}
//             /> */}
//             <Text style={styles.headerTitle}>Student Dashboard</Text>
//           </View>

//           {/* User Profile Section */}
//           <View style={styles.profileCard}>
//             <View style={styles.avatarContainer}>
//               <Text style={styles.avatarText}>
//                 {userData.studentName
//                   .split(' ')
//                   .map(name => name[0])
//                   .join('')}
//               </Text>
//             </View>
//             <View style={styles.profileInfo}>
//               <Text style={styles.welcomeText}>Welcome back,</Text>
//               <Text style={styles.nameText}>{userData.studentName}</Text>
//             </View>
//           </View>

//           {/* Personal Information Card */}
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Personal Information</Text>
//             <View style={styles.infoContainer}>
//               <View style={styles.infoRow}>
//                 <Text style={styles.infoLabel}>Username:</Text>
//                 <Text style={styles.infoValue}>{userData.username}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.infoLabel}>Student Name:</Text>
//                 <Text style={styles.infoValue}>{userData.studentName}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.infoLabel}>Registration Number:</Text>
//                 <Text style={styles.infoValue}>
//                   {userData.registrationNumber}
//                 </Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.infoLabel}>Email:</Text>
//                 <Text style={styles.infoValue}>{userData.email}</Text>
//               </View>
//             </View>
//           </View>

//           {/* Enrolled Courses */}
//           <Text style={styles.sectionTitle}>Enrolled Courses</Text>

//           {userData.courses.map((course, index) => (
//             <View key={index} style={styles.courseCard}>
//               <View style={styles.courseHeader}>
//                 <Text style={styles.courseNumber}>Course {index + 1}</Text>
//                 <View style={styles.statusBadge}>
//                   <Text style={styles.statusText}>Active</Text>
//                 </View>
//               </View>
//               <View style={styles.infoContainer}>
//                 <View style={styles.infoRow}>
//                   <Text style={styles.infoLabel}>Course Name:</Text>
//                   <Text style={styles.courseValue}>{course.name}</Text>
//                 </View>
//                 <View style={styles.infoRow}>
//                   <Text style={styles.infoLabel}>Faculty:</Text>
//                   <Text style={styles.courseValue}>{course.faculty}</Text>
//                 </View>
//               </View>
//               <TouchableOpacity style={styles.courseButton}>
//                 <Text style={styles.courseButtonText} onPress={()=>navigation.navigate('CourseDetailPage')}>View Details</Text>
//               </TouchableOpacity>
//             </View>
//           ))}

//           {/* Add New Course Button */}
//           <TouchableOpacity style={styles.addCourseButton}>
//             <Text style={styles.addCourseButtonText} onPress={() => Request}>
//               + Add New Course
//             </Text>
//           </TouchableOpacity>

//           {/* Quick Links */}
//           <View style={styles.quickLinksContainer}>
//             <Text style={styles.sectionTitle}>Quick Links</Text>
//             <View style={styles.linksGrid}>
//               <TouchableOpacity style={styles.linkCard}>
//                 <Text style={styles.linkIcon}>📚</Text>
//                 <Text style={styles.linkText}>Course Catalog</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.linkCard}>
//                 <Text style={styles.linkIcon}>📝</Text>
//                 <Text style={styles.linkText}>Assignments</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.linkCard}>
//                 <Text style={styles.linkIcon}>📊</Text>
//                 <Text style={styles.linkText}>Grades</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.linkCard}>
//                 <Text style={styles.linkIcon}>📅</Text>
//                 <Text style={styles.linkText}>Schedule</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={{justifyContent:'center',alignItems:'center',width:'100%',height:'10%'}}>
//             {/* <Text style={{fontSize: 20,color:'white'}}>{storedValue?storedValue:"false"}</Text> */}
//             <Text style={{fontSize: 20,color:'white'}}>{isAuthenticated}</Text>
//             <Button title="Logout" onPress={handleLogout}></Button>
//           </View>

//           <View style={styles.footer}>
//             <Text style={styles.footerText}>
//               © 2025 University Student Portal
//             </Text>
//             <Text style={styles.footerText}>Version 2.4.1</Text>
//           </View>
//         </ScrollView>
//       </View>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//     backgroundColor: '#3b5998',
//     paddingTop: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//   },
//   logo: {
//     width: 30,
//     height: 30,
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   profileCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     marginHorizontal: 20,
//     marginVertical: 10,
//     padding: 15,
//     borderRadius: 15,
//   },
//   avatarContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   avatarText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#3b5998',
//   },
//   profileInfo: {
//     flex: 1,
//   },
//   welcomeText: {
//     fontSize: 14,
//     color: 'rgba(255,255,255,0.7)',
//   },
//   nameText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 16,
//     margin: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   infoContainer: {
//     marginTop: 5,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   infoLabel: {
//     fontSize: 15,
//     fontWeight: '600',
//     width: 150,
//     color: '#666',
//   },
//   infoValue: {
//     fontSize: 15,
//     flex: 1,
//     color: '#333',
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//     marginLeft: 20,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   courseCard: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 16,
//     marginHorizontal: 20,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   courseHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   courseNumber: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   statusBadge: {
//     backgroundColor: '#4caf50',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   statusText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   courseValue: {
//     fontSize: 15,
//     flex: 1,
//     color: '#333',
//     fontWeight: '500',
//   },
//   courseButton: {
//     backgroundColor: '#3b5998',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   courseButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   addCourseButton: {
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.3)',
//     borderStyle: 'dashed',
//     borderRadius: 15,
//     padding: 14,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   addCourseButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   quickLinksContainer: {
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   linksGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   linkCard: {
//     backgroundColor: 'white',
//     width: '48%',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   linkIcon: {
//     fontSize: 28,
//     marginBottom: 8,
//   },
//   linkText: {
//     color: '#333',
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   footer: {
//     marginTop: 20,
//     marginBottom: 30,
//     alignItems: 'center',
//   },
//   footerText: {
//     color: 'rgba(255,255,255,0.6)',
//     fontSize: 12,
//     marginBottom: 4,
//   },
// });

// export default HomePage;
import React, {useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../AuthContext';

const {configIp} = require('../../config/config');

import axios from 'axios';

const HomePage = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const {isAuthenticated, setIsAuthenticated} = useAuth();
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // async function sendAttendanceMarkRequest() {
  //   try {
  //     console.log('I m triggered!');
  //     const params = new URLSearchParams();
  //     params.append('course_ID', '1');
  //     params.append('lectureDate', '15-04-25');
  //     params.append('lectureNumber', '1');

  //     const response = await axios.get(
  //       `http://${configIp.IP_ADDRESS}:${configIp.PORT}/home`,
  //       {
  //         params: {
  //           course_ID: 1,
  //           lectureDate: '15-04-25',
  //           lectureNumber: 1,
  //         },
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //       },
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error sending request:', error);
  //   }
  // }

  // sendAttendanceMarkRequest();

  useEffect(() => {
    const getAuthState = async () => {
      try {
        const value = await AsyncStorage.getItem('isAuthenticated');
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedUserRole = await AsyncStorage.getItem('userRole');

        if (value === 'true' && storedUserId && storedUserRole) {
          setIsAuthenticated(true);
          setUserId(storedUserId);
          setUserRole(storedUserRole);
        } else {
          setIsAuthenticated(false);
          navigation.replace('LogIn');
        }
      } catch (error) {
        console.error('Error reading auth state:', error);
      }
    };

    getAuthState();
  }, []);

  useEffect(() => {
    if (userId && userRole) {
      fetchUserData();
    }
  }, [userId, userRole]);

  // Process faculty or student data to a consistent format
  useEffect(() => {
    if (userData) {
      const processed = processUserData(userData, userRole);
      setProcessedData(processed);
    }
  }, [userData, userRole]);

  // Function to process user data based on role
  const processUserData = (data, role) => {
    if (role === 'faculty') {
      return {
        name: data.facName || 'Unknown Faculty',
        email: data.facEmail || 'No Email',
        ID: data.ID || 'Unknown ID',
        phone: data.facPhone || 'Not provided',
        dep_ID: data.dep_ID || 'Not assigned',
        courses: data.courses || [],
        isAdmin: data.facIsAdmin === 1,
      };
    } else {
      // Student data format - assuming original structure
      return {
        name: data.name || 'Unknown Student',
        email: data.email || 'No Email',
        ID: data.ID || 'Unknown ID',
        phone: data.phone || 'Not provided',
        dep_ID: data.dep_ID || 'Not assigned',
        courses: data.courses || [],
      };
    }
  };

  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert(
          'Error',
          'Authentication token not found. Please login again.',
        );
        handleLogout();
        return;
      }

      const response = await fetch(
        `http://${configIp.IP_ADDRESS}:${configIp.PORT}/home`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await response.json();

      if (result.success) {
        setUserData(result.data);
      } else {
        Alert.alert('Error', result.message || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('isAuthenticated', 'false');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('token');
      setIsAuthenticated(false);
      navigation.replace('LogIn');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.background,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <ActivityIndicator size="large" color="white" />
          <Text style={{color: 'white', marginTop: 10}}>
            Loading your data...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!processedData) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.background,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              textAlign: 'center',
              marginHorizontal: 20,
            }}>
            Could not load user data. Please try again later.
          </Text>
          <TouchableOpacity
            style={[styles.courseButton, {marginTop: 20}]}
            onPress={fetchUserData}>
            <Text style={styles.courseButtonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.courseButton,
              {marginTop: 10, backgroundColor: '#d32f2f'},
            ]}
            onPress={handleLogout}>
            <Text style={styles.courseButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3b5998" />
      <View style={styles.background}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {userRole === 'student'
                ? 'Student Dashboard'
                : 'Faculty Dashboard'}
            </Text>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {processedData.name
                  ? processedData.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                  : '?'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.nameText}>{processedData.name}</Text>
              {userRole === 'faculty' && processedData.isAdmin && (
                <View style={styles.adminBadge}>
                  <Text style={styles.adminText}>Admin</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Personal Information</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{processedData.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  {userRole === 'student' ? 'Student Name:' : 'Faculty Name:'}
                </Text>
                <Text style={styles.infoValue}>{processedData.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  {userRole === 'student' ? 'Registration No:' : 'Employee ID:'}
                </Text>
                <Text style={styles.infoValue}>{processedData.ID}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoValue}>{processedData.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Department:</Text>
                <Text style={styles.infoValue}>
                  {processedData.dep_ID
                    ? `Department ${processedData.dep_ID}`
                    : 'Not assigned'}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            {userRole === 'student' ? 'Enrolled Courses' : 'Assigned Courses'}
          </Text>

          {processedData.courses && processedData.courses.length > 0 ? (
            processedData.courses.map((course, index) => (
              <View key={index} style={styles.courseCard}>
                <View style={styles.courseHeader}>
                  <Text style={styles.courseNumber}>Course {index + 1}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Active</Text>
                  </View>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Course Name:</Text>
                    <Text style={styles.courseValue}>{course.courseName}</Text>
                  </View>
                  {userRole === 'student' && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Faculty:</Text>
                      <Text style={styles.courseValue}>
                        {course.facName || 'N/A'}
                      </Text>
                    </View>
                  )}
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Department:</Text>
                    <Text style={styles.courseValue}>
                      {course.depName || 'N/A'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.courseButton}
                  onPress={() =>
                    navigation.navigate('CourseDetailPage', {
                      courseId: course.ID,
                    })
                  }>
                  <Text style={styles.courseButtonText}>Course Details</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.noCourseCard}>
              <Text style={styles.noCourseText}>
                {`No ${
                  userRole === 'student' ? 'enrolled' : 'assigned'
                } courses found.`}
              </Text>
            </View>
          )}

          {userRole === 'student' && (
            <TouchableOpacity
              style={styles.addCourseButton}
              onPress={() =>
                navigation.navigate('CourseDetailPage', {
                  courseId: course.ID,
                })
              }>
              <Text style={styles.addCourseButtonText}>+ Add New Course</Text>
            </TouchableOpacity>
          )}

          <View style={styles.quickLinksContainer}>
            <Text style={styles.sectionTitle}>Quick Links</Text>
            <View style={styles.linksGrid}>
              {userRole === 'student' ? (
                <>
                  <TouchableOpacity
                    style={styles.linkCard}
                    onPress={() =>
                      navigation.navigate('StudentAttendanceComponent')
                    }>
                    <Text style={styles.linkIcon}>✓</Text>
                    <Text style={styles.linkText}>Mark Attendance</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.linkCard}
                    onPress={() => navigation.navigate('AssignmentsPage')}>
                    <Text style={styles.linkIcon}>📝</Text>
                    <Text style={styles.linkText}>Assignments</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.linkCard}
                    onPress={() => navigation.navigate('GradesPage')}>
                    <Text style={styles.linkIcon}>📊</Text>
                    <Text style={styles.linkText}>Grades</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.linkCard}
                    onPress={() =>
                      navigation.navigate('TeacherAttendanceComponent')
                    }>
                    <Text style={styles.linkIcon}>📅</Text>
                    <Text style={styles.linkText}>Schedule</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.linkCard}
                    onPress={() => {
                      sendAttendanceMarkRequest();
                      navigation.navigate('TeacherAttendanceComponent');
                    }}>
                    <Text style={styles.linkIcon}>📋</Text>
                    <Text style={styles.linkText}>Take Attendance</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.linkCard}
                    onPress={() => navigation.navigate('AssignmentsPage')}>
                    <Text style={styles.linkIcon}>📝</Text>
                    <Text style={styles.linkText}>Manage Assignments</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.linkCard}
                    onPress={() => navigation.navigate('GradingPage')}>
                    <Text style={styles.linkIcon}>📊</Text>
                    <Text style={styles.linkText}>Grading</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.linkCard}
                    onPress={() => navigation.navigate('SchedulePage')}>
                    <Text style={styles.linkIcon}>📅</Text>
                    <Text style={styles.linkText}>My Schedule</Text>
                  </TouchableOpacity>
                  {processedData.isAdmin && (
                    <TouchableOpacity
                      style={styles.linkCard}
                      onPress={() => navigation.navigate('AdminPanel')}>
                      <Text style={styles.linkIcon}>⚙️</Text>
                      <Text style={styles.linkText}>Admin Panel</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            <Button title="Logout" onPress={handleLogout} color="#d32f2f" />
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
  },
  background: {
    flex: 1,
    backgroundColor: '#3b5998',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 15,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b5998',
  },
  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  adminBadge: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  adminText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoContainer: {
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    width: 150,
    color: '#666',
  },
  infoValue: {
    fontSize: 15,
    flex: 1,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  noCourseCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  noCourseText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  courseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  courseValue: {
    fontSize: 15,
    flex: 1,
    color: '#333',
    fontWeight: '500',
  },
  courseButton: {
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  courseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addCourseButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderStyle: 'dashed',
    borderRadius: 15,
    padding: 14,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  addCourseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickLinksContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  linkCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  linkIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  linkText: {
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginBottom: 4,
  },
});

export default HomePage;
