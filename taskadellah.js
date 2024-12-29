import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'


const dummydata = [{ 'name': 'this' }, { 'name': 'this' }]

const App = () => {

  const [userData, setUserData] = useState()

  useEffect(() => {
    getUsersData()
  }, [])

  const getUsersData = async () => {
    try {
      const response = await axios.get('https://random-data-api.com/api/users/random_user?size=10')
      console.log('getUser response.Status ', response.status)
      setUserData(response.data)

    } catch (error) {
      console.log('getUser Error ', error)
    }
  }

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.avatar }}
          style={styles.userImageStyle}
          resizeMode='contain'
        />
        <View>
          <Text style={styles.userName}>{`${item.first_name}`}</Text>
          <Text style={styles.userTitle}>{`${item?.employment?.title}`}</Text>
        </View>

        <Text>{`call`}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={userData}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => `${item.id} ${index}`}
      />

    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6FA',
    padding: 16
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderColor: '#E7E7E7',
    borderWidth: 1,
    borderRadius: 12,
    padding:16,
    // alignItems:'center',
    justifyContent:'space-between'
  },
  userImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  userName:{
    fontWeight:'bold',
    textAlign:'center',
    fontSize:15
  },
  userTitle:{
    fontSize:12
  },
})