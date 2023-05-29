import TYPES from '../actions/Types';

const initialState = {
    loading:false,
    data:null

}
const reducer = (state = initialState, actions) => {
    switch (actions.type) {

        case TYPES.LISTVENUES:
            return{

                ...state,
                loading:true,
                data:actions.data
            }
            case TYPES.LISTVENUESRES:
                return{
                    ...state,
                    loading:false,
                    data:actions.data
                    
                }
            

        default:
            return state

    }

}
export default reducer