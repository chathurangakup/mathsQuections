
export const setConfig = async (key, value) => {
   global.username = true
}

export const getConfig = async (key, value) => {
    try{
        const username = global.username;
        return  username
    }catch(e){
        console.log(e)
    }
    
 }