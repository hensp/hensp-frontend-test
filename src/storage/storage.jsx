export const storage = {
  get(key){
    const token = window.localStorage.getItem(key);
    if(!token){
        return null;
    }
    return JSON.parse(token);
  },
  set(key,token){
    window.localStorage.setItem(key,JSON.stringify(token))
  },
  remove(key){
    window.localStorage.removeItem(key)
  },
  clear(){
    window.localStorage.clear()
  }
}

export default storage