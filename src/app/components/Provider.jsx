"use client"
import React from 'react'
import { store } from '../../redux/store'
import { Provider } from 'react-redux'
import Socket from "./Socket"

const GeneralProviders = ({children}) => {
  return (
    <Provider store={store}>
        <Socket>
          {children}
        </Socket>
    </Provider>
  )
}

export default GeneralProviders
