import axios from 'axios'
import { Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { callFailed,  callBegan} from '../apiActions'

const api : Middleware = ({ dispatch, getState } : MiddlewareAPI) => (next : Dispatch) => async (action) => {


    if(action.type !== callBegan.type) {

        next(action)

    }else{
        const {url, method, data, onSuccess, onError, onBegin, payload} = action.payload

        if(onBegin)
                dispatch({ type : onBegin,  payload : payload});

        try {

            const token = getState().auth.token
        
            const response  = await axios.request({ baseURL : process.env.API_URL, url, method, data, headers : token ? {'Authorization' : `Token ${token}` } : null })

            dispatch({type: onSuccess, payload: response.data})
                

        //refactor this in typescript
        } catch(error : any) {

            if(onError){
                dispatch({type: onError, payload: error.response ? error.response.data : error})
            }

            dispatch(callFailed(error));

        }
    }
}


export default api
