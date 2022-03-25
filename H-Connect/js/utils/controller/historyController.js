export const history = {
    linkTo: (link, target) => {
        if (!target || target === '_self' || target === 'self') {
            window.location.href = link;
        } else if (target === '_blank' || target === 'blank') {
            window.open(link, target);
        }
    },
    getLink: () => {
        const locationObj = window.location;
        return {
            pathname: locationObj.pathname,
        };
    },
    getParams: (params) => {
        if (params.length > 0) {
            //js 내장함수로 replace안쓰고 좀더 쉽게 객체로 파람스 가져올수 있음
            let obj = {};
            const search = window.location.search;
            const paramsObj = new URLSearchParams(search);
            for (let i = 0; i < params.length; i++) {
                const name = params[i];
                const res = paramsObj.get(params[i]);
                obj = { ...obj, [name]: res };
            }
            return obj;

            // const name = params.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            // const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            //     results = regex.exec(location.search);
            // return results === null
            //     ? ''
            //     : decodeURIComponent(results[1].replace(/\+/g, ' '));
        } else {
            return null;
        }
    },
};
