import TYPES from '../Types';

export const updateList = (data) => {
    if (!data.pagination) {
        return {
            type: TYPES.UPDATE_LIST,
            data: data.data
        }
    } else {
        return {
            type: TYPES.UPDATE_LIST_PAGINATION,
            data: data.data
        }
    }

}


export const updateListingDetail = (data) => {
    return {
        type: TYPES.UPDATE_LISTING_DETAIL,
        data: data
    }
}


export const updateFilters = (data) => {
    return {
        type: TYPES.UPDATE_FILTERS,
        data: data.data
    }
}
