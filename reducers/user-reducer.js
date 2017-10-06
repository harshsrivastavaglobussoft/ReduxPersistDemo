const initialstate={
  UserArray:[]
};

export default function(state=initialstate,action){
   switch (action.type) {
     case 'ADD_ITEM':
     return {
        UserArray: [ ...state.UserArray, action.payload]
      };
      break;
    case 'RETURN_ARRAY':
             return {...state};
             break;
    default : return {...state};
   }
  return {
    ...state
  };
}
