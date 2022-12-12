import * as url from './url_helper'
import axiosApi from "./api_helper"
import store from '@/store'

export const getChangeInventory = () => {
    return axiosApi.get(url.GET_CHANGE_INVENTORY)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) {
        return response.data
      }
      throw response.data
    })
    .catch(err=> {
      store.dispatch('notifications/setNotificationsList', {text: 'Not able to fetch data currently',color: 'red'})
      console.log(err)
    })
  }

export const editChangeInventory = (payload) => {
  return axiosApi.put(`${url.GET_CHANGE_INVENTORY}/${payload.changeNum}`,payload)
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      store.dispatch('notifications/setNotificationsList', {text: 'Change Edited Successfully',color: 'green'})
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Not able to edit change currently. Please retry',color: 'red'})
    console.log(err)
  })
}

export const deleteChangeInventory = (payload) => {
  return axiosApi.delete(`${url.GET_CHANGE_INVENTORY}/${payload.changeNum}`)
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      store.dispatch('notifications/setNotificationsList', {text: 'Change Deleted Successfully',color: 'green'})
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Not able to delete this change',color: 'red'})
    console.log(err)
  })
}

export const addChangeInventory = (payload) =>{
  return axiosApi.post(url.GET_CHANGE_INVENTORY,payload)
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      store.dispatch('notifications/setNotificationsList', {text: 'Change Added Successfully',color: 'green'})
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Not able to add change. Please retry',color: 'red'})
    console.log(err)
  })
}

export const calculateEfforts = (description, dcCount) =>{
  return axiosApi.get(url.GET_SCHEDULE_DATA + '?description=' + description + '&dcCount=' + dcCount)
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Not able to calculate efforts.',color: 'red'})
    console.log(err)
  })
}

export const findSlots = (application) => {
  return axiosApi.get(url.GET_SLOTS_DATA + '?application=' + application)
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Not able to find slots.',color: 'red'})
    console.log(err)
  })
}

export const getChangeRequests = () =>{
  return axiosApi.get(url.GET_CHANGE_REQUESTS)
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Not able to fetch data currently', color: 'red'})
    console.log(err)
  })
}

export const getWeeklyCapacityData = (payload) =>{
  return axiosApi.post(url.GET_WEEKLY_TEAMCAPACITY_DATA,payload)
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Not able to fetch team capacity data for this week.', color: 'red'})
    console.log(err)
  })
}

export const postCapacityInventory = (payload) =>{
  return axiosApi.post(url.POST_SHIFT_ROSTER,payload)
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      store.dispatch('notifications/setNotificationsList', {text: 'File Uploaded Successfully', color: 'green'})
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Not able to upload. Please check file formatting.', color: 'red'})
    console.log(err)
  })
}