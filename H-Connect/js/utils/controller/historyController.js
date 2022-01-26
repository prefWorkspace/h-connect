const history = {
    push: (link, target)=> {
        if(!target || target === "_self" || target === "self"){
            window.location.href = link;
        }else if(target === "_blank" || target === "blank"){
            window.open(link, target);
        }
    },
    getParams: (params)=> {
        if(params){
            const name = params.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }else{
            return null;
        }
    }
}