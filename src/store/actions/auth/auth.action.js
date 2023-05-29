import TYPES from '../Types';

export const saveUser = (user) => {
    return {
        type: TYPES.ADD_USER,
        user: user
    }
}

