import jwtDecode from 'jwt-decode'
import streams from '../apis/streams'
import {  } from './types'
import {
    SIGN_IN,
    SIGN_OUT,
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types'

export const signIn = (response)=>{
    document.getElementById('signIn').hidden = true
    return{
        type:SIGN_IN,
        payload: jwtDecode(response.credential)
    }
}
export const signOut = ()=>{
    document.getElementById('signIn').hidden = false
    return{
        type:SIGN_OUT
    }
}

export const fetchStream = id => async dispatch =>{
    const response = await streams.get(`/streams/${id}`)
    dispatch({type:FETCH_STREAM , payload: response.data})
}
export const fetchStreams = () => async dispatch =>{
    const response = await streams.get('streams')
    dispatch({type:FETCH_STREAMS, payload:response.data})
}
export const createStream = formValues => async dispatch =>{
    const response = await streams.post('streams', formValues)
    dispatch({type: CREATE_STREAM, payload: response.data})
}
export const editStream = (id, formValues) => async dispatch =>{
    const response = await streams.put(`streams/${id}`, formValues)
    dispatch({type: EDIT_STREAM, payload: response.data})
}
export const deleteStream = id => async dispatch =>{
    await streams.delete(`streams/${id}`)
    dispatch({type: DELETE_STREAM, payload: id})
}

