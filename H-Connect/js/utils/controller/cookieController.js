
const cookieController = {
    setCookie: (key, value, time)  => {
        let toDay = new Date();
        toDay.setDate(toDay.getDate() + time);
        document.cookie = `${key}=${value};path=/;expires=${toDay.toGMTString()};`
    },
    getCookie: (key) => {
        if(document.cookie === "") return; 
        let arr = document.cookie.split(";");
        let str;
        for(let i =0; i < arr.length; i++){
            if(arr[i].includes(key)){
                str = arr[i]
            }
        }
        let res = str.split("=");
        // let matches = documnet.cookie.match(new RegExp(
        //     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        //   ));
        //   return matches ? decodeURIComponent(matches[1]) : undefined;
        return res[1];
    },
    removeCookie: (key) => {
        let toDay = new Date();
        document.cookie = `${key}=;path=/;expires=${toDay.toGMTString()};` 
    }
}


// export default cookieController;