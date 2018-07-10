import API from '../helpers/API'

export const FETCH_REQUESTED = 'houses/FETCH_REQUESTED'
export const FETCH_SUCCESS = 'houses/FETCH_SUCCESS'
export const FETCH_FAILED = 'houses/FETCH_FAILED'
export const CREATE_REQUESTED = 'houses/CREATE_REQUESTED'
export const CREATE_SUCCESS = 'houses/CREATE_SUCCESS'
export const CREATE_FAILED = 'houses/CREATE_FAILED'

const initialState = {
    isFetching: false,
    fetchError: false,
    fetchSuccess: false,
    isPosting: false,
    postSuccess: false,
    postError: false,
    items: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUESTED:
            return {
                ...state,
                isFetching: true
            }

        case FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                fetchSuccess: true,
                fetchError: false,
                items: action.payload
            }

        case FETCH_FAILED:
            return {
                ...state,
                isFetching: false,
                fetchSuccess: false,
                fetchError: true
            }

        default:
            return state
    }
}

export const fetchHouses = () => {
    return dispatch => {
        dispatch({
            type: FETCH_REQUESTED
        })
        API.get('/houses')
        .then(res => {
            console.log('fetch success')
            console.log(res)
            dispatch({
                type: FETCH_SUCCESS,
                payload: res
            })
        })
        .catch(err => {
            console.log('Failed to fetch houses: ')
            console.log(err)
            dispatch({
                type: FETCH_FAILED
            })
        })
    }
}

