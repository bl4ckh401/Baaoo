import {
     View, Text, SafeAreaView, ScrollView, FlatList, StyleSheet, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopComponents from '../components/TopComponents';
import { BaoContext } from '../Global/BaoProvider';

const Home = ({navigation}) => {

    const { fixture,setFixture,
        continent,setContinent,
        league,setLeague,
        leagueId, setLeagueId,team,setTeams,
        calender, setCalender,
        selectedStartDate,setselectedStartDate,
        selectedEndDate,setselectedEndDate} = useContext(BaoContext)

    const requestOptions = {
        headers : {
            "x-rapidapi-key": "389819bb0efeba2cf7a8965984247165",
            "x-rapidapi-host": "v3.football.api-sports.io"
          },
    }
    const onLoadRange =async () => {
        alert("Fixing Fixtures")
        console.log(selectedStartDate)
        await axios.get(`https://api.sportmonks.com/v3/football/fixtures/between/${selectedStartDate}/${selectedEndDate}?api_token=ZPodW5aYPggvlTJDTKfRubcIw0DUKpvMMPH8inDYiDdsNV5UEJezwHXTFVQp`)
        .then(response => {
            if (response.status === 200) {
            setFixture(response.data.data);
            alert(false);
            return;
          } else {
            throw new Error("Failed to fetch Fixture");
          }
    })}

    
const getData = async () => {
    try {
      const savedFixture = await AsyncStorage.getItem('allfixture')
      return savedFixture != null ? JSON.parse(savedFixture) : onLoad();
    } catch(e) {
      // error reading value
      console.error(e)
    }
  }


    const onLoad =async () => {
        await axios.get(`https://v3.football.api-sports.io/fixtures?date=2022-10-17`, requestOptions)
        .then(response => {
            if (response.status === 200) {
            setFixture(response.data.response);
            AsyncStorage.setItem("allfixtures",
            JSON.stringify(response.data.response));
            return;
          } else {
            throw new Error("Failed to fetch Fixture");
          }
    })
    .then(console.log(AsyncStorage.getItem("allfixtures")))
}

    useEffect(() => {
        onLoad();
    }, [])

    
  return (
        <View style={{width:"100%", flexDirection:'column', backgroundColor:'#000'}}>
            <TopComponents />
            <FlatList 
            data={fixture} 
            keyExtractor={item =>item.index}
            ItemSeparatorComponent={() => <View style={{borderBottomColor:'orange', borderBottomWidth:1}}/>}
            renderItem={({item})=>{
                // leagueId == 0 ? () => {
                    return(
                        <View style={{width:"100%", flexDirection:'row', justifyContent:'center',alignItems:'center',marginTop:'auto' }} >
                            <View style={{width:"100%", flexDirection:'column', justifyContent:'center',alignItems:'center' }}>
                                <View style={styles.Team}>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={{
                                        uri: item.teams.home.logo,
                                        }}
                                    />  
                                    <Text style={styles.Mtext} onPress={() => {navigation.navigate('Live Score');}}>
                                        {item.teams.home.name}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{color:'white'}}>vs</Text>
                                </View>
                                <View style={styles.Team}>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={{
                                        uri: item.teams.away.logo,
                                        }}
                                    />
                                    <Text style={styles.Mtext}>{item.teams.away.name}</Text>
                                </View>
                                <View style={{width:"100%", flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                                    {/* <View style={styles.Team}>
                                        <Text style={styles.Mtext}>{item.away_score}</Text>
                                    </View>
                                </View>
                                <View style={{width:"100%", flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{textAlign:'center', color:'white'}}>{item.starting_at.toString()}</Text>
                                */}
                                </View> 
                            </View>
                        </View>
                    )
                }
            // :
            // item.league.id == leagueId ? () => {
            //     return(
            //         <View style={{width:"100%", flexDirection:'row', justifyContent:'center',alignItems:'center',marginTop:'auto' }} >
            //             <View style={{width:"100%", flexDirection:'column', justifyContent:'center',alignItems:'center' }}>
            //                 <View style={styles.Team}>
            //                     <Image
            //                         style={styles.tinyLogo}
            //                         source={{
            //                         uri: item.teams.home.logo,
            //                         }}
            //                     />  
            //                     <Text style={styles.Mtext} onPress={() => {navigation.navigate('Live Score');}}>
            //                         {item.teams.home.name}
            //                     </Text>
            //                 </View>
            //                 <View>
            //                     <Text style={{color:'white'}}>vs</Text>
            //                 </View>
            //                 <View style={styles.Team}>
            //                     <Image
            //                         style={styles.tinyLogo}
            //                         source={{
            //                         uri: item.teams.away.logo,
            //                         }}
            //                     />
            //                     <Text style={styles.Mtext}>{item.teams.away.name}</Text>
            //                 </View>
            //                 <View style={{width:"100%", flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
            //                     {/* <View style={styles.Team}>
            //                         <Text style={styles.Mtext}>{item.away_score}</Text>
            //                     </View>
            //                 </View>
            //                 <View style={{width:"100%", flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
            //                     <Text style={{textAlign:'center', color:'white'}}>{item.starting_at.toString()}</Text>
            //                 */}
            //                 </View> 
            //             </View>
            //         </View>
            //     )
            // }
            // : <View>
            //     <Text>Not filtering at all</Text>
            // </View>
         } />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        color:'#FFF',
        position:'relative',
        top:0,
        minHeight:'80%'
      },
    sport:{
        width:"100%", 
        marginTop:5,
        flexDirection:'row'
    },
    Mtext:{
        fontSize:20,
        textAlign:'left', 
        color:'white'
    },
    Team: {
        width:"100%", 
        flexDirection:'row', 
        justifyContent:'flex-start',
        alignItems:'flex-start',
        backgroundColor:'#000'
    },
    tinyLogo: {
        width: 20,
        height: 20,
      },
  });