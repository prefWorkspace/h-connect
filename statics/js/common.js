window.onload = function() {
    let thisIndexName = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);
    console.log(thisIndexName);


    // header btn - profile popup
    const headerBrn = document.querySelector('.header_btn');
    const headerPopup = document.querySelector('.profile_popup');
    
    headerBrn.addEventListener('click', () => {
        let has = headerPopup.classList.contains('active');

        if(has) {
            headerPopup.classList.remove('active');
            setTimeout(() => {
                headerPopup.style.display = 'none';
            }, 300);
        } else {
            headerPopup.style.display = 'flex';
            headerPopup.classList.add('active');
        };
    });


    // gnb menu
    const gnbList = document.querySelectorAll('.gnb > .gnb_list');

    gnbList.forEach(list => {
        list.addEventListener('click', () => {
            let has = list.classList.contains('active');
            
            if(has !== true) {
                for(let i = 0; i < gnbList.length; i++) {gnbList[i].classList.remove('active')};
                list.classList.add('active');
            } else {
                return;
            }
        });
    });



    

};