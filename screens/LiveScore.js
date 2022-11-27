import { View, Text, SafeAreaView, ScrollView, FlatList, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { Icon } from '@rneui/themed';
import TopComponents from '../components/TopComponents';
import { BaoContext } from '../Global/BaoProvider';

const LiveScore = ({navigation}) => {
    const { fixture,setFixture,
        continent,setContinent,
        league,setLeague,
        leagueId, setLeagueId,team,setTeams,
        calender, setCalender,
        selectedStartDate,setselectedStartDate,
        selectedEndDate,setselectedEndDate} = useContext(BaoContext)
    const minDate = new Date(); // Today
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';

    const baseUrl = "https://api.sportmonks.com/v3/"
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
    const onLoad =async () => {
        alert("Fixing Fixtures")
        await axios.get(`https://v3.football.api-sports.io/fixtures?date=2022-10-08`, requestOptions)
        .then(response => {
            if (response.status === 200) {
            setFixture(response.data.response);
            alert(false);
            return;
          } else {
            throw new Error("Failed to fetch Fixture");
          }
    })}

    useEffect(() => {
        onLoad();
    }, [])
    
  return (
    <SafeAreaView style={styles.container}>
        <TopComponents />
        <View style={{width:"100%", flexDirection:'column'}}>
            <FlatList data={fixture} 
            keyExtractor={item =>item.index}
            ItemSeparatorComponent={() => <View style={{borderBottomColor:'orange', borderBottomWidth:1}}/>}
            renderItem={({item})=>{
                return(
                    <View style={{width:"100%", flexDirection:'column', justifyContent:'center',alignItems:'center' }} >
                        <View style={{width:"100%", flexDirection:'row', justifyContent:'space-between',alignItems:'flex-start' }}>
                            <Text style={styles.Mtext} onPress={() => {alert('This is a button!'); navigation.navigate('Live Score')}}>
                            {item.teams.home.name}
                            </Text>
                            <Text style={styles.Mtext}>{item.goals.home}</Text>
                        </View>
                        <View style={{width:"100%", flexDirection:'row', justifyContent:'center',alignItems:'center' }}>
                        <Text style={{color:'white'}}>vs</Text>
                        </View>

                        <View style={{width:"100%", flexDirection:'row', justifyContent:'space-between',alignItems:'center' }}>
                            <Text style={styles.Mtext}>{item.teams.away.name}</Text>
                            <Text style={styles.Mtext}>{item.goals.away}</Text>
                        </View>
                    </View>
                )
            }} />
        </View>
    </SafeAreaView>
  )
}

export default LiveScore
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      color:'#000',
    },
    sport:{
        width:"100%", 
        marginTop:5,
        flexDirection:'row'
    },
    Mtext:{
        fontSize:30,textAlign:'center', color:'white'
    },
    Team: {
        width:"48%", 
        flexDirection:'column', 
        justifyContent:'flex-start',
        alignItems:'flex-start',
        backgroundColor:'#000'

    }
  });