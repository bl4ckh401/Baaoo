import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import {Icon} from '@rneui/themed'

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
        <Icon name='settings' type='material' size={40} color='black'/>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
    }
})