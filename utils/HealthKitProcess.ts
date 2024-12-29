import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
  } from 'react-native-health'
  
  /* Permission options */
  const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.HeartRate],
    },
  } as HealthKitPermissions
  
  const getHealth = ()=>{

  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */
  
    if (error) {
      console.log('[ERROR] Cannot grant permissions!')
    }
  
    /* Can now read or write to HealthKit */
  
    const options = {
      startDate: new Date().toISOString(),
    }
  
    AppleHealthKit.getHeartRateSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        console.log('health==>>',results)
        alert('health value'+results)
      },
    )
  })
}

export default getHealth;