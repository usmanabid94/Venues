import TYPES from '../Types';

export const saveSettings = (data) => {
    return {
        type: TYPES.SAVE_SETTINGS,
        data: data
    }
}

export const loading = (load) => {
    return {
        type: TYPES.LOADING,
        data: load
    }
}
