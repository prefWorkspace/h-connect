window.onload = function() {
    let thisIndexName = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);
    console.log(thisIndexName);


    //  btn - popup
    const PopuprBrn = document.querySelectorAll('.popup_btn');
    
    if(PopuprBrn.length !== 0) {
        PopuprBrn.forEach(btn => {
            const Popup = btn.nextElementSibling;

            btn.addEventListener('click', () => {
                let has = Popup.classList.contains('active');
        
                if(has) {
                    Popup.classList.remove('active');
                  
                } else {
                    Popup.style.display = 'flex';
                    Popup.classList.add('active');
                };
            });
        });
    };

    // popup off 기능
    const popup = document.querySelectorAll('.profile_popup');

    if(popup.length !== 0) {
        popup.forEach(pop => {
            let thisClass = pop.className;

            pop.addEventListener('click', (e) => {
                let target = e.target;
                let currtarget = e.currentTarget.querySelector('.profile_popup');
                let tarClass = target.className;

                console.log(currtarget, target);

                if(tarClass !== thisClass) {return};
                pop.classList.remove('active');

                setTimeout(() => {
                    pop.style.display = 'none';
                }, 300);
            });
        });
    };


    // gnb menu
    const gnbList = document.querySelectorAll('.gnb > .gnb_list');

    if(gnbList !== null) {
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


    // modal on 기능 
   function commonMd() {
        const modalBtn = document.querySelectorAll('.modal_btn');

        modalBtn.forEach(item => {
            let dataHas = item.getAttribute('data-modal');

            if(dataHas !== null) {
                item.addEventListener('click', () => {
                    let modal = document.getElementById(dataHas);
                    modal.classList.add('on');
                });
            } else {
                return false;
            };
        });
    };
   
    

    
    // modal off 기능
    const modal = document.querySelectorAll('.modal');

    modal.forEach(modal => {
        let _id = modal.getAttribute('id');
        let modalInput = modal.getElementsByTagName('input')[0];

        modal.addEventListener('click', (e) => {
            let target = e.target;
            if(target.id !== _id) {return};
            modal.classList.remove('on');

            if(modalInput !== undefined) {
                modalInput.value = '';
            };
        });
        
        let close = modal.querySelector('.cancel_btn');
        
        
        close.addEventListener('click', () => {
            modal.classList.remove('on');
            
            if(modalInput !== undefined) {
                modalInput.value = '';
            };
        });
    });
    





    // modal
    commonMd();
};