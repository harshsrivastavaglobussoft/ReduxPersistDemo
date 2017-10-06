export const signup =(name,emailid,password,array)=>{
  return {
     type: "SIGNUP_ACTION",
     payload: {name:name,emailid : emailid , password : password,array:array}
  }
};
export const login =(emailid,password,array)=>{
  return {
     type: "LOGNIN_ACTION",
     payload: {emailid : emailid , password : password , array:array}
  }
};
export const resetAuthUser=()=>{
  return{
    type : 'RESET',
  }
};
export const logout = (pointer)=>{
  return {
    type: 'LOG_OUT_ACTION',
    payload : pointer
  }
};

export const nametext  = (name)=>{
  return {
    type : 'NAME',
    payload : name
  }
};

export const emailtext = (emailid)=>{
  return{
    type : "EMAIL",
    payload : emailid
  }
};
export const passwordtext = (password)=>{
  return{
    type : 'PASSWORD',
    payload : password
  }
};

export const emaillogin = (emailid)=>{
  return{
    type : "EMAIL_LOGIN",
    payload : emailid
  }
};
export const passwordlogin = (password)=>{
  return{
    type : 'PASSWORD_LOGIN',
    payload : password
  }
};
export const AddElements = (user)=>{
  console.log("inside action ======",user);
  return{
    type : 'ADD_ITEM',
    payload : user
  }
};
export const returnArray = ()=>{
  return {
    type : 'RETURN_ARRAY'
  }
};
