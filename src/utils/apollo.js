import ApolloClient, { gql } from 'apollo-boost'
import { Portal, Toast } from '@ant-design/react-native'
import { setData, getData } from './AsyncStorage'

const onError = err => {
  Toast.info(err.graphQLErrors[0].message, 3)
}

const options = {
  uri: 'http://192.168.1.13:4001/',
  onError: onError,
}

const query = async (body, variables) => {
  const global = Toast.loading('加载中', 0)
  const token = await getData('token')
  return new ApolloClient({
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .query({
      query: gql`
        ${body}
      `,
      variables,
    })
    .then(res => {
      Portal.remove(global)
      return res.data
    })
    .catch(err => {
      Portal.remove(global)
      console.log(err)
    })
}

const mutation = async (body, variables) => {
  const global = Toast.loading('加载中', 0)
  const token = await getData('token')
  return new ApolloClient({
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .mutate({
      mutation: gql`
        ${body}
      `,
      variables,
    })
    .then(res => {
      Portal.remove(global)
      return res.data
    })
    .catch(err => {
      Portal.remove(global)
      console.log(err)
    })
}

export { query, mutation }
