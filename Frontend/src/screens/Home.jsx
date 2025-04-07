import { SafeAreaView, Image, StyleSheet, Text, View,Button } from 'react-native'
import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{flex: 1,padding:20}}>

      <View style={{flex:0,justifyContent:'center',alignItems:'center',width:'100%',height:'20%',backgroundColor:''}}>
        {/* <Text style={{fontSize:26,fontWeight:500}}>Edutrack</Text> */}
        <Image
  source={{ uri: "https://res.cloudinary.com/dsctxyrvw/image/upload/v1743089371/image_6_mjlkbn.png" }}
  style={{ width: '50%', height: '70%' }}
/>

      </View>
      <View style={{flex:0,alignItems:'center',justifyContent:'center',width:'100%',height:'10%',top:'65'}}>
        <Text style={{ fontSize:45,fontWeight:'bold'}}>Sign up as</Text>
      </View>

      <View style={{flex:4,justifyContent:'center',alignItems:'center',width:'100%',height:'80%',gap:30 }}>

        <View style={{flex:0,flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%',height:'23%' ,backgroundColor:'black',gap:23}}>
          <View style={{width:70,height:70,borderRadius:50,backgroundColor:'green',left:-20}}></View>
          <Text style={{color:'white', fontSize:33,fontWeight:600}} onPress={() => navigation.navigate('TeacherSignUp')}>Teacher</Text>

        </View>

        <View style={{flex:0,flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10,width:'100%',height:'23%' ,backgroundColor:'purple',gap:23}}>
        <View style={{width:70,height:70,borderRadius:50,backgroundColor:'green',left:-20}}></View>
        <Text style={{color:'white', fontSize:33,fontWeight:600}} onPress={()=>navigation.navigate('HomePage')}>Student</Text>
        </View>

        <Text style={{fontSize:20,fontWeight:400}}>Already have an account? Log in</Text>
        {/* <Button title="SignUpAsTeacher"></Button> */}
      </View>

    </SafeAreaView>
    )
  }
}