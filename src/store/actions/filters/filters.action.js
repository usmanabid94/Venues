import TYPES from '../Types';

export const updateVenues = (data) => {
    return {
        type: TYPES.LISTVENUES,
        data: data
    }
}
export const updateResVenues = (data) => {
    return {
        type: TYPES.LISTVENUESRES,
        data: data
    }
}