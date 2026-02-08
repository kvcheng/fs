import {createSlice} from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        updateNotificationName(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        }
    }
})

const { updateNotificationName, clearNotification } = notificationSlice.actions
export const setNotification = (message, timer) => {
    return async (dispatch) => {
        dispatch(updateNotificationName(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timer)
    }
}

export default notificationSlice.reducer
