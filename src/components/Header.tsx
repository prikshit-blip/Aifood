import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Header</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
    height: 40,
    width: '100%',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    justifyContent: 'center',
    
    elevation: 4,
    },
    text:{
        color:'#fff',
        fontSize:14,
        
    }
})