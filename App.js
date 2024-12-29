import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native'

import React, { useState, useEffect } from 'react'

import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health'

import { Colors } from './utils/colors'
import { StatusBarHeight } from './utils/Dimensions'

import ButtonTile from './Components/ButtonTile'

import getHealthData from './utils/HealthKitProcess'

const days = [
  { 'day': 'Sun', 'count': 50 },
  { 'day': 'Mon', 'count': 70 },
  { 'day': 'Tue', 'count': 40 },
  { 'day': 'Wed', 'count': 80 },
  { 'day': 'Thu', 'count': 30 },
  { 'day': 'Fri', 'count': 90 },
  { 'day': 'Sat', 'count': 20 }]
const calorie = ['0', '1k', '2k', '3k', '4k']
const App = () => {

  const Base_Url = 'https://e8c086f7-a5c9-4752-b81f-bfac0d0dc5d2.mock.pstmn.io/cosmos'

  useEffect(() => {
    // getHealthData()
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  const callAPI = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(Base_Url, {
        method: 'get', headers: {
          // "Accept": "application/json"
        }
      })

      console.log('callAPI_response=>', JSON.stringify(response.status))

      if (response.status === 200) {
        Alert.alert("API Response", JSON.stringify(response._bodyInit._data))
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('callAPI_Error=>', error)
      alert('something went wrong')
    }
  }
  const header = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Calories Burned</Text>
      </View>
    )
  }

  const renderGraph = () => {
    return (
      <View style={styles.graphContainer}>
        <View style={{ justifyContent: 'flex-end', paddingBottom: 50 }}>
          {
            calorie.reverse().map((item) => {
              return (
                <Text style={{ marginTop: 30 }}>{item}</Text>
              )
            })
          }

        </View>
        <View style={{ flexDirection: 'row', marginLeft: 15, alignSelf: 'flex-end' }}>
          {
            days.map((item) => {
              return (
                <View style={{ justifyContent: 'flex-end' }}>
                  <View style={{ width: 15, marginLeft: 20, backgroundColor: '#f5794b', height: item.count * 2, borderRadius: 10 }} />
                  <Text style={{ marginLeft: 20 }}>{item.day}</Text>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }

  const timeSeeker = () => {
    return (
      <View style={styles.timeSeekerContainer}>
        <TouchableOpacity style={[styles.timeBackButton, { borderRightWidth: 1 }]}>
          <Image
            source={require('./Assets/Images/previousArrow.png')}
            style={styles.prevArrow}
            resizeMode='cover'
          />
        </TouchableOpacity>
        <View style={styles.timeSeekerMiddleContainer}>
          <Text style={{ color: Colors.charcoalGrey, fontSize: 14 }}> {`Last Week`}</Text>
          <TouchableOpacity>
            <Image
              source={require('./Assets/Images/arrowDown.png')}
              style={{
                height: 13,
                width: 13,
                marginLeft: 10
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.timeBackButton, { borderLeftWidth: 1 }]}>
          <Image
            source={require('./Assets/Images/previousArrow.png')}
            style={[styles.prevArrow, { transform: [{ rotate: '180deg' }] }]}
            resizeMode='cover'
          />
        </TouchableOpacity>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      {header()}
      <View style={styles.innerContainer}>
        {timeSeeker()}
        <View style={{ marginTop: 50 }}>
          {renderGraph()}
        </View>
        <View style={{ marginTop: 50 }}>
          <ButtonTile
            label={'In-Active Calories Burned'}
            vitalLabel={'1,793 BPM'}
            calorieButton={true}
            onPress={() => callAPI()} />
          <ButtonTile
            label={'Workout Calories Burned'}
            vitalLabel={'587'}
            onPress={() => callAPI()} />
        </View>
      </View>
      {isLoading &&
        <ActivityIndicator size="large" color={Colors.azure} />
      }
    </View>
  )
}

export default App

const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: Colors.azure,
    minHeight: 65 + StatusBarHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 11
  },
  innerContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  headerText: {
    color: Colors.white,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    fontWeight: 'bold'
  },
  timeSeekerContainer: {
    borderWidth: 1,
    borderColor: Colors.silver,
    height: 44,
    flexDirection: 'row'
  },
  prevArrow: {
    height: 10,
    width: 10,
  },
  timeBackButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderColor: Colors.silver
  },
  timeSeekerMiddleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  graphContainer: {
    height: 300,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  }
})