import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Video } from "expo-av";

const Stream = () => {
  return (
    <View style={styles.container}>
      <Video
        style={styles.video}
        resizeMode="cover"
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls={true}
        isLooping={false}
      />    
    </View>
  )
}

export default Stream

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    color:'#000',
    position:'relative',
    top:0,
    minHeight:'80%'
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    marginTop:10,
    height: 300,
  },
})