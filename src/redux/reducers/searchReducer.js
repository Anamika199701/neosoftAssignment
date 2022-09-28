let defaultState = {
    apiData:{
        data:[]
    }
}

let searchReducer = (state = defaultState , action) => {
    switch(action.type){
        case 'API_SUCCESS':{
            let newState = {...state};
            newState.apiData = {
                data: [...newState.apiData.data, action.payload]
            }
            return newState;
        }
        
        default: 
        return state;
    }
};

export default searchReducer;