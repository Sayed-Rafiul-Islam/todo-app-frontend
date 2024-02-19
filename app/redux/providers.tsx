"use client"
const { Provider } = require("react-redux");
import React from 'react';
import {store} from './store'

export const Providers = ({children} : any) => {
    return <Provider store={store}>{children}</Provider>
}