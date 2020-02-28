import AsyncStorage from '@react-native-community/async-storage'

const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (err) {
    console.log({ setData: err })
  }
}

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (err) {
    console.log({ getData: err })
  }
}

const clear = async () => {
  await AsyncStorage.clear()
}

export { setData, getData, clear }
