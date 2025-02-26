const sessionIdMap=new Map();

const getUser=(id)=>{
    return sessionIdMap.get(id);
}

const setUser=(id,user)=>{
    sessionIdMap.set(id,user);
}


module.exports={setUser,getUser}