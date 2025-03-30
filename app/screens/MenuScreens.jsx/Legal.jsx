import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Legal = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <Text>Copyrights@Savaram Venkata Sri Charitha</Text>
    </SafeAreaView>
  )
}

export default Legal

const styles = StyleSheet.create({
  Container:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  }
})