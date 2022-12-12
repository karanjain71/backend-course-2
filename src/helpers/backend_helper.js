import * as url from './url_helper'
// import axiosApi from "./api_helper"
// import store from '@/store'
import axios from 'axios'

export const postLogin = (email, password) => {
  const payload = {
    "email": email,
    "password": password
  }
  console.log(payload, url.POST_LOGIN, " payload")
  return axios.post("http://localhost:8080/api/auth/login", payload)
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    console.log(err)
  })
}

export const postRegister = (payload) => {

  return axios.post("http://localhost:8080/api/auth/register", payload)
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    console.log(err)
  })
}

export const postForgotPassword = (payload) => {

  return axios.post("http://localhost:8080/api/auth/forgot-password", payload)
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    console.log(err)
  })
}