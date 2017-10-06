//import{getArray,addUser} from './user-reducer';
export var initialstate = {
  emailid : '',
  password : '',
  error : ''
};

export default function(state=initialstate,action){

   switch (action.type) {
     case "LOGNIN_ACTION":
          let array = action.payload.array;
          console.log('inside reducer',array);
          for (var i = 0; i < array.length; i++) {
             if (array[i].emailid === action.payload.emailid) {
                if(array[i].password === action.payload.password){
                    return {code:200, emailid:array[i].emailid ,name:array[i].name,password:array[i].password};
                }
                else {
                  return state
                }
             }
          }
          return state
          break;
      case "LOG_OUT_ACTION":
             action.payload.props.navigation.goBack();
             return {...state,emailid:'',password:'',code:''};
             break;

       case "EMAIL_LOGIN":
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
          if(reg.test(action.payload) === false)
          {
           return{...state, emailid:action.payload, error:"Enter a valid Email Id"};
          }
          return{...state, emailid:action.payload, error:""};
          break;
      case "PASSWORD_LOGIN":
          let val = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ ;
          if(val.test(action.payload) === false)
          {
           return{...state, password:action.payload, error:"Password must have min 8 characters,1 uppercase, 1 lowercase letter and 1 number"};
          }
          return{...state, password:action.payload,error:""};
          break;
   }
   return state;
}
