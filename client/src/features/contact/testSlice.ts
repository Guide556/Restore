import { createSlice } from "@reduxjs/toolkit"

export const testSlice = createSlice({
    name: 'testRTK',
    initialState: {
     myname: "5555555555"
    },
    reducers: {
      incre6: state => { state.myname += 122222222 },
      decre7: state => { state.myname += 11111 }
    }
  })
  
  export const { incre6, decre7 } = testSlice.actions