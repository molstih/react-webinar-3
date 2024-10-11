const initialState = {
  name: 'comment'
};

function reducer (state=initialState, action){
  console.log(action.type);
  switch (action.type) {
    case 'form/open':
      return { ...state, name: action.payload.name };
    default:
      return state;
  }

}

export default reducer
