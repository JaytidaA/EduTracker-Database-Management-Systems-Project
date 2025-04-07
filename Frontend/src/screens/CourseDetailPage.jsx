import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Image,
  Dimensions
} from 'react-native';

// Sample data
const courseData = {
  name: "Advanced Data Structures",
  code: "CS-301",
  credits: 4,
  faculty: "Computer Science",
  instructor: "Dr. Alan Turing",
  schedule: "Mon, Wed, Fri - 10:00 AM to 11:30 AM",
  location: "Building A, Room 204",
  attendancePercentage: 72,
  nextClass: "Wednesday, April 6, 2025",
  assignments: [
    { id: 1, title: "Binary Tree Implementation", dueDate: "Apr 10, 2025", status: "Pending" },
    { id: 2, title: "Graph Algorithms Quiz", dueDate: "Apr 15, 2025", status: "Pending" },
    { id: 3, title: "Hash Table Report", dueDate: "Mar 28, 2025", status: "Submitted" }
  ],
  attendanceData: [
    { date: "Mar 1", status: "Present" },
    { date: "Mar 3", status: "Present" },
    { date: "Mar 6", status: "Absent" },
    { date: "Mar 8", status: "Present" },
    { date: "Mar 10", status: "Present" },
    { date: "Mar 13", status: "Present" },
    { date: "Mar 15", status: "Absent" },
    { date: "Mar 17", status: "Present" },
    { date: "Mar 20", status: "Present" },
    { date: "Mar 22", status: "Present" },
    { date: "Mar 24", status: "Absent" },
    { date: "Mar 27", status: "Present" },
    { date: "Mar 29", status: "Present" },
    { date: "Mar 31", status: "Present" },
    { date: "Apr 3", status: "Present" },
  ]
};

const screenWidth = Dimensions.get('window').width;

const CourseDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const renderAttendanceGraph = () => {
    return (
      <View style={styles.graphContainer}>
        <View style={styles.graphHeader}>
          <Text style={styles.graphTitle}>Attendance Record</Text>
        </View>
        <View style={styles.graph}>
          {courseData.attendanceData.map((day, index) => (
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
      </View>
    );
  };

  const renderAssignments = () => {
    return (
      <View style={styles.assignmentsContainer}>
        <Text style={styles.sectionSubtitle}>Upcoming and Recent Assignments</Text>
        {courseData.assignments.map((assignment) => (
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
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3b5998" />
      <View style={styles.background}>
        <ScrollView>
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
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
                <Text style={styles.infoValue}>{courseData.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Course Code:</Text>
                <Text style={styles.infoValue}>{courseData.code}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Credits:</Text>
                <Text style={styles.infoValue}>{courseData.credits}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Faculty:</Text>
                <Text style={styles.infoValue}>{courseData.faculty}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Instructor:</Text>
                <Text style={styles.infoValue}>{courseData.instructor}</Text>
              </View>
            </View>
          </View>
          
          {/* Next Class Card */}
          <View style={styles.nextClassContainer}>
            <Text style={styles.nextClassTitle}>Next Class</Text>
            <Text style={styles.nextClassDate}>{courseData.nextClass}</Text>
            <Text style={styles.nextClassDetails}>{courseData.schedule}</Text>
            <Text style={styles.nextClassDetails}>{courseData.location}</Text>
          </View>
          
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
                      Attendance in percentage: <Text style={styles.attendancePercentage}>{courseData.attendancePercentage}%</Text>
                    </Text>
                    {courseData.attendancePercentage < 75 && (
                      <View style={styles.alertBox}>
                        <Text style={styles.alertIcon}>⚠️</Text>
                        <Text style={styles.alertText}>
                          Alert: If attendance &lt; 75%: "Attend the lecs"
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                
                {/* Recent Assignments */}
                {renderAssignments()}
              </>
            )}
            
            {activeTab === 'materials' && (
              <View style={styles.materialsContainer}>
                <Text style={styles.sectionSubtitle}>Course Materials</Text>
                
                <TouchableOpacity style={styles.materialItem}>
                  <View style={styles.materialIcon}>
                    <Text style={styles.materialIconText}>📄</Text>
                  </View>
                  <View style={styles.materialInfo}>
                    <Text style={styles.materialTitle}>Week 1: Introduction to Data Structures</Text>
                    <Text style={styles.materialDetails}>PDF • 2.4 MB • Uploaded Mar 1</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.materialItem}>
                  <View style={styles.materialIcon}>
                    <Text style={styles.materialIconText}>📄</Text>
                  </View>
                  <View style={styles.materialInfo}>
                    <Text style={styles.materialTitle}>Week 2: Arrays and Linked Lists</Text>
                    <Text style={styles.materialDetails}>PDF • 3.1 MB • Uploaded Mar 8</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.materialItem}>
                  <View style={styles.materialIcon}>
                    <Text style={styles.materialIconText}>📄</Text>
                  </View>
                  <View style={styles.materialInfo}>
                    <Text style={styles.materialTitle}>Week 3: Stacks and Queues</Text>
                    <Text style={styles.materialDetails}>PDF • 2.8 MB • Uploaded Mar 15</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.materialItem}>
                  <View style={styles.materialIcon}>
                    <Text style={styles.materialIconText}>📄</Text>
                  </View>
                  <View style={styles.materialInfo}>
                    <Text style={styles.materialTitle}>Week 4: Trees</Text>
                    <Text style={styles.materialDetails}>PDF • 4.2 MB • Uploaded Mar 22</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.materialItem}>
                  <View style={styles.materialIcon}>
                    <Text style={styles.materialIconText}>🎥</Text>
                  </View>
                  <View style={styles.materialInfo}>
                    <Text style={styles.materialTitle}>Binary Tree Implementation Demo</Text>
                    <Text style={styles.materialDetails}>MP4 • 28.7 MB • Uploaded Mar 25</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            
            {activeTab === 'assignments' && (
              <View style={styles.fullAssignmentsContainer}>
                <Text style={styles.sectionSubtitle}>All Assignments</Text>
                
                {courseData.assignments.map((assignment) => (
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
                    <TouchableOpacity style={styles.viewAssignmentButton}>
                      <Text style={styles.viewAssignmentText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                
                <View style={styles.assignmentItem}>
                  <View style={styles.assignmentHeader}>
                    <Text style={styles.assignmentTitle}>Final Project</Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>Upcoming</Text>
                    </View>
                  </View>
                  <Text style={styles.assignmentDueDate}>Due: May 20, 2025</Text>
                  <TouchableOpacity style={styles.viewAssignmentButton}>
                    <Text style={styles.viewAssignmentText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>📝</Text>
              <Text style={styles.actionButtonText}>Request Office Hours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>📞</Text>
              <Text style={styles.actionButtonText}>Contact Instructor</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 University Student Portal</Text>
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
  graph: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    alignItems: 'flex-end',
  },
  graphDayColumn: {
    alignItems: 'center',
    width: (screenWidth - 80) / 15,
  },
  graphBar: {
    width: 8,
    height: 70,
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
    color: courseData.attendancePercentage < 75 ? '#FF5252' : '#4CAF50',
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
    marginBottom: 15,
    color: '#333',
  },
  assignmentItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  assignmentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  assignmentDueDate: {
    fontSize: 12,
    color: '#666',
  },
  materialsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  materialItem: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  materialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  materialIconText: {
    fontSize: 20,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  materialDetails: {
    fontSize: 12,
    color: '#666',
  },
  fullAssignmentsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  viewAssignmentButton: {
    backgroundColor: '#f0f2f5',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  viewAssignmentText: {
    color: '#3b5998',
    fontWeight: '500',
    fontSize: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: 'white',
    width: '48%',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionButtonText: {
    color: '#3b5998',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  }
});

export default CourseDetailPage;