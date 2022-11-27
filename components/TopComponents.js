import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { Icon } from '@rneui/themed'
import CalendarPicker from 'react-native-calendar-picker'
import { BaoContext } from '../Global/BaoProvider'

const TopComponents = () => {
    const { fixture,setFixture,
        continent,setContinent,
        league,setLeague,
        leagueId, setLeagueId,team,setTeams,
        calender, setCalender,
        selectedStartDate,setselectedStartDate,
        selectedEndDate,setselectedEndDate} = useContext(BaoContext)


    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
          setselectedEndDate(
            moment(date).format('YYYY-MM-DD'),
          );
          onLoad();

          console.log({'End Date':selectedEndDate})
        } else {
            setselectedStartDate(
                moment(date).format('YYYY-MM-DD'),
              );
              setselectedEndDate(
                null,
              );
              console.log({'Start Date':selectedStartDate})
        }
      }

    const baseUrl = "https://api.sportmonks.com/v3/"
    const requestOptions = {
        headers : {
            "x-rapidapi-key": "389819bb0efeba2cf7a8965984247165",
            "x-rapidapi-host": "v3.football.api-sports.io"
          },
    }

    const getLeague = async () => {
        alert("Fixing Fixtures")
        await axios.get(`https://v3.football.api-sports.io/leagues`, requestOptions)
        .then(response => {
            if (response.status === 200) {
                setLeague(response.data.response);
                return;
          } else {
            throw new Error("Failed to fetch Leagues");
          }
    })
        // .then(console.log(league))
}
    const getTeams = async () => {
        alert("Fixing Fixtures")
        await axios.get(`https://v3.football.api-sports.io/teams`, requestOptions)
        .then(response => {
            if (response.status === 200) {
            setTeams(response.data.response);
            alert(false);
            // console.log(team)
            return;
          } else {
            throw new Error("Failed to fetch Leagues");
          }
    })}
    const getContinents =async () => {
        alert("Fixing Fixtures")
        await axios.get(`https://api.sportmonks.com/v3/core/continents?api_token=ZPodW5aYPggvlTJDTKfRubcIw0DUKpvMMPH8inDYiDdsNV5UEJezwHXTFVQp`)
        .then(response => {
            if (response.status === 200) {
            setFixture(response.data.data);
            alert(false);
            console.log(fixture)
            return;
          } else {
            throw new Error("Failed to fetch Continents");
          }
    })}
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

    useEffect(() => {
        getLeague();
        getTeams()
    }, [])
    
  return (
    <View style={{width:"100%", flexDirection:'column', backgroundColor:'#000'}}>
        <View style={{}}>
            <View style={styles.sport}>
                <FlatList data={continent}
                keyExtractor={item =>item.id}
                horizontal
                ItemSeparatorComponent={() => <View style={{margin:6}}/>}
                renderItem={({item})=>{
                    return(
                        <View style={{backgroundColor:'orange', borderRadius:20, paddingHorizontal:10}}>
                        <Text style={styles.Mtext}>{item.name}</Text>
                        </View>
                    )
                }} />
            </View>
            <View style={styles.sport}>
                <FlatList data={league} 
                keyExtractor={item =>item.id}
                horizontal
                ItemSeparatorComponent={() => <View style={{margin:6}}/>}
                renderItem={({item})=>{
                    return(
                        <View style={{backgroundColor:'orange', borderRadius:20, paddingHorizontal:10}}>
                        <Text style={styles.Mtext} 
                            onPress={() => {alert('This is a button'); 
                                setLeagueId(item.league.id); 
                                console.log(item.league.id)
                            }}>{item.league.name}</Text>
                        </View>
                    )
                }} />
            </View>
            <View style={styles.sport}>
                <FlatList data={team} 
                keyExtractor={item =>item.index}
                horizontal
                ItemSeparatorComponent={() => <View style={{margin:6}}/>}
                renderItem={({item})=>{
                    return(
                        <View style={{backgroundColor:'orange', borderRadius:20, paddingHorizontal:10}}>
                            <Text style={styles.Mtext}>{item.team.name}</Text>
                        </View>
                    )
                }} />
            </View>
            <View style={{width:"100%", margin:5, flexDirection:'column', justifyContent:'center', textAlign:'center'}}>
                <Icon name='today' type='material' size={40} color='white'
                        onPress={() => {setCalender(!calender); navigation.navigate('Stream')}}
                    />
                {calender ? 
                <View style={{flex:1, position:'absolute', top:40, minHeight:'80%', zIndex:1000, backgroundColor:'black'}}>
                    <CalendarPicker
                    onDateChange={onDateChange}
                    startFromMonday={true}
                    textStyle={{
                        color: '#FFF',
                    }}
                    todayBackgroundColor="orange"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    allowRangeSelection
                    />
                </View>
            :
                <></>
}
            </View>
        </View>
    </View>
  )
}

export default TopComponents

const styles = StyleSheet.create({
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
})