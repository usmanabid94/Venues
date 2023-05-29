import { act } from 'react-test-renderer';
import TYPES from '../actions/Types';

const initialState = {
    loading:false,
    venues:{}

}
const reducer = (state = initialState, actions) => {
    switch (actions.type) {

            case TYPES.LISTVENUES:
                return{
                    ...state,
                    loading:true,
                    venues:actions.data
                }
                case TYPES.LISTVENUESRES:
                    return{
                        ...state,
                        loading:false,
                        venues:actions.data
                    }
    
        default:
            return state

    }

}
export default reducer