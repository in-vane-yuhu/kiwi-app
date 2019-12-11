import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { query, mutation } from '../utils/apollo'
import { setData } from '../utils/AsyncStorage'
import { Toast } from '@ant-design/react-native'

class DataStore {
  /**
   * observable
   */
  @observable test = false
  /* loading */
  @observable loading = false

  /**
   * action
   */
  @action getData = async param => {
    const variables = {
      param,
    }
    const body = `
      mutation accessApi(
        $param: String!
      ){
        changeOKEXInfo(
          param:$param
        ){
          isSuccess
          errMessage
        }
      }
    `
    let res = await mutation(body, variables)
    if (res.changeOKEXInfo.isSuccess) {
      Actions.pop()
    }
  }
}

const dataStore = new DataStore()

export default dataStore
