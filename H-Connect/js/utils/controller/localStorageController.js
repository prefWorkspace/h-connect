
export const localStorageController = {
    setLocalS: (key, value) => {
        let setValue = "";
        if(typeof value === "string" || typeof value === "number"){
            setValue = value.toString();
        }else{
            setValue = JSON.stringify(value);
        }
        localStorage.setItem(key, setValue);
    },
    getLocalS: (key, useRemove) => {
        let result = "";
        if(localStorage.getItem(key) !== null){
            result = localStorage.getItem(key);
            if(useRemove){
                removeLocalS(key);
            }
            return result;
        }else{
            return false;
        }
    },
    removeLocalS: (key) => {
        localStorage.removeItem(key)
    },
}

// export default localStorageController;