import React, { useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { useTheme } from '../../../Context/ThemeContext'

const AppearancePage = ({navigation}) => {
  const { isDarkMode, toggleTheme } = useTheme()
  useLayoutEffect(() => {
      navigation.setOptions({
        title: 'Appearance',
      });
    }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333333' : '#FFFFFF' }]}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
      />
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        Toggle to switch between Light and Dark Mode
      </Text>
    </View>
  )
}

export default AppearancePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightText: {
    color: '#000000',
    fontSize: 18,
  },
  darkText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
})
