const initialState = {
    customer: {
        name: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: ''
    }
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CUSTOMER_DATA':
            return {
                ...state,
                customer: action.payload
            };
        default:
            return state;
    }
};

export default customerReducer;
