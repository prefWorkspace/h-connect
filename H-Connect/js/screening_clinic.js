window.addEventListener('DOMContentLoaded', () => {
   // modal on 기능 
   function md() {
        const modalBtn = document.querySelectorAll('.modal_btn');

        modalBtn.forEach(item => {
            let dataHas = item.getAttribute('data-modal');
            let has = item.classList.contains('off');

            if(dataHas !== null && has !== true) {
                item.addEventListener('click',  modalFuc);
            } else {
                return false;
            };
        });
    };

    function modalFuc(e) {
        let target = e.target;
        let dataId = target.getAttribute('data-modal');
        
        
        if(dataId === 'retouch') {
            target.setAttribute('data-rethis', 'this');
            let par = target.parentNode.parentNode.getElementsByTagName('span')[0];
            let id = document.getElementById(dataId);
            let input = id.getElementsByTagName('input')[0];
            let sureBtn = id.querySelector('.sure_btn');
            
            id.classList.add('on');
            input.value = par.innerText;
            
            sureBtn.addEventListener('click', reModalClick);

        } else if(dataId === 'deleteList') {
            target.setAttribute('data-delthis', 'this');
            
            let id = document.getElementById(dataId);
            let sureBtn = id.querySelector('.sure_btn');

            id.classList.add('on');
            sureBtn.addEventListener('click', delModalClick);


        } else {
            let id = document.getElementById(dataId);
            id.classList.add('on');
        };
    };

    // 수정 모달 기능
    function reModalClick(e) {
        const _modalBtn = document.querySelectorAll('.modal_btn');
        
        let _target = e.target;
        let _modal = _target.parentNode.parentNode.parentNode;
        let _input = _target.parentNode.parentNode.getElementsByTagName('input')[0];
        let _span;
        let _btn;
        
        _modalBtn.forEach(item => {
            let has = item.getAttribute('data-rethis');
            if(has === 'this') {
                _span = item.parentNode.parentNode.getElementsByTagName('span')[0];
                _btn = item;
            };
        });
        
        if(_input.value === '') {
            alert('글자을 입력해주세요');
            return;
        } else {
            _span.innerText = _input.value;
            _modal.classList.remove('on');
            _btn.removeAttribute('data-rethis');
        };
    };

    // 삭제 모달 기능
    function delModalClick(e) {
        const _modalBtn = document.querySelectorAll('.modal_btn');
        let target = e.target;
        let parent = target.parentNode.parentNode.parentNode;
        let list, ulId, _btn;
        
        _modalBtn.forEach(item => {
            let has = item.getAttribute('data-delthis');
            if(has === 'this') {
                _btn = item;
                list = item.parentNode.parentNode;
                
                let _has = item.parentNode.parentNode.getAttribute('data-clinic');

                let _dataId = has !== null ? ulId = _has :  ulId = null;
            };
        });

        if(ulId !== null) {
            let thisUl = document.getElementById(ulId);

            _btn.removeAttribute('data-delthis');
            list.remove();
            thisUl.remove();
            parent.classList.remove('on');
        } else {
            _btn.removeAttribute('data-delthis');
            list.remove();
            parent.classList.remove('on');
        };
    };

    md();


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


    // card - list 클릭
    function listClickFuc() {
        const card = document.querySelectorAll('.card');
        card.forEach((li, idx) => {
            if(idx !== 0) {
                const list = li.querySelectorAll('.card_cont_list');

                list.forEach(item => {
                    let bool = item.getAttribute('data-bool');
                    
                    if(idx === 1) {
                        if(bool === null) {
                            item.setAttribute('data-bool', 'yes'); 
                            item.addEventListener('click', () => {
                                listSelect(item, idx, card, 1);
                            });
                
                            return false;
                        } else {
                            return;
                        };
                    } else {
                        if(bool === null) {
                            item.setAttribute('data-bool', 'yes'); 
                            item.addEventListener('click', () => {
                                listSelect(item, idx, card, 2);
                            });
                
                            return false;
                        } else {
                            return;
                        };
                    }
                });
            } else {
                return false;
            };
        });
    };


    function listSelect(_item, i, c, n) {
        let has = _item.classList.contains('btn_active');

        if(has !== true) {
            let li = document.querySelectorAll('.card')[n].querySelectorAll('.card_cont_list');
            li.forEach(it => {it.classList.remove('btn_active')});
            
            if(i !== 2) {
                _item.classList.add('btn_active');

                let createBtn = c[2].querySelector('.modal_btn');

                if(createBtn !== null) {
                    createBtn.classList.remove('off');
                };
            } else {
                _item.classList.add('btn_active');
            };
        } else {
            return;
        };
    };


    // 진료소 list클릭시 마다 다른 card3 - ul 기능
    function tabListFuc() {
        let card2 = document.getElementById('selClicList');
        let card2List = card2.querySelectorAll('.card_cont_list');
        let leng = card2List.length - 1;

        card2List.forEach((item, idx) => {
            if(leng <= idx) {
                eachListClick(item);
            } else {
                return false;
            };
        });

    };

    // card2의 리스트 클릭 이벤트
    function eachListClick(it) {
        let data = it.getAttribute('data-clinic');

        it.removeEventListener('click', () => allFuc(data));
        it.addEventListener('click', () => allFuc(data));

    };

    // 묶은 함수
    function allFuc(d) {
        selectListUl(d);
        card3AddFuc();
        md();
    }

    // ul들 탭메뉴 기능
    function selectListUl(i) {
        let card3Ul = document.querySelectorAll('.clic_care_box');
        let thisUl = document.getElementById(i);

        card3Ul.forEach(it => {it.style.display = 'none'});
        thisUl.style.display = 'block';

        return false;
    };

    // card3의 모달 확인 버튼 클릭
    function card3AddFuc() {
        const card3 = document.querySelector('.card3');
        const modalBox = card3.querySelector('.modal_btn');
        const modalId = modalBox.getAttribute('data-modal');
        const thisModal = document.getElementById(modalId);
        const card3Sure = thisModal.querySelector('.sure_btn');

        card3Sure.addEventListener('click', card3AddListFuc);
    };

    // card3의 모달 확인 버튼 클릭시, 데이터값을 참고해 생성
    function card3AddListFuc() {
        const _card3 = document.querySelector('.card3');
        const _modalBox = _card3.querySelector('.modal_btn');
        const _careListBox = _card3.querySelectorAll('.clic_care_box');
        const _modalId = _modalBox.getAttribute('data-modal');
        const _thisModal = document.getElementById(_modalId);
        const _thisModalInput = _thisModal.getElementsByTagName('input')[0];
        let thisVal = _thisModalInput.value;
        
        
        if(thisVal === '') {
            alert('이름을 입력해 주세요');
            return;
        } else {
            _careListBox.forEach(ul => {
                let display = ul.style.display;

                if(display !== 'none') {

                    // 감 쌀 li
                    let li = document.createElement('li');

                    // li의 이름
                    let span = document.createElement('span');

                    // 버튼 감 쌀 div
                    let div = document.createElement('div');

                    //버튼들
                    let reButton = document.createElement('button');
                    let delButton = document.createElement('button');


                    // 생성한 요소의 속성 부여
                    li.setAttribute('class', 'no_arrow_list card_cont_list card_btn');
                    div.setAttribute('class', 're_del_box');
        
                    reButton.setAttribute('class', 'retouch_btn re_del_btn btn1 modal_btn');
                    delButton.setAttribute('class', 'delete_btn re_del_btn btn1 modal_btn');
                    reButton.setAttribute('data-modal', 'care_retouch');
                    delButton.setAttribute('data-modal', 'deleteList');

                    reButton.setAttribute('type', 'button');
                    delButton.setAttribute('type', 'button');

                    span.innerText = thisVal;
                    reButton.innerText = '수정';
                    delButton.innerText = '삭제';


                    // 만든 요소 정리
                    div.append(reButton);
                    div.append(delButton);

                    li.append(span);
                    li.append(div);

                    ul.append(li);

                    
                    //   모달 off
                    _thisModalInput.value = '';
                    _thisModal.classList.remove('on');

                    md();

                } else {
                    return false;
                };
            });
        };
    };


    // card2 - data create
    const selClicCreate = document.getElementById('selectClinic');
    const nameInput = selClicCreate.getElementsByTagName('input')[0];


    function createData() {
        let id = selClicCreate.getAttribute('data-box');
        let card3 = document.querySelector('.card3');
        let sureBtn = selClicCreate.querySelector('.sure_btn');
        
        
        
        sureBtn.addEventListener('click', () => {
            let dataName = nameInput.value;
            let day = new Date();
            let year = day.getFullYear();
            let month = day.getMonth();
            let date = day.getDate();
            let hour = day.getHours();
            let min = day.getMinutes();
            let sec = day.getSeconds();
            
            if(dataName === '') {
                alert('이름을 입력해 주세요');
                return;
            } else {
                let listBox = document.getElementById(id);
                let listLength = listBox.querySelectorAll('.card_cont_list').length;
                let crId = listLength + '_' + year + (month + 1) + date + hour + min + sec;

                // 감쌀 li
                let li = document.createElement('li');

                // li의 이름
                let span = document.createElement('span');

                // 버튼 감쌀 div
                let div = document.createElement('div');

                //버튼들
                let reButton = document.createElement('button');
                let delButton = document.createElement('button');

                // card3 - ul
                let clicCareUl = document.createElement('ul');


                // 생성한 요소의 속성 부여
                li.setAttribute('class', 'card_cont_list card_btn');
                li.setAttribute('data-clinic', `clicCare_${crId}`);
                div.setAttribute('class', 're_del_box');

                reButton.setAttribute('class', 'retouch_btn re_del_btn btn1 modal_btn');
                delButton.setAttribute('class', 'delete_btn re_del_btn btn1 modal_btn');
                reButton.setAttribute('data-modal', 'retouch');
                delButton.setAttribute('data-modal', 'deleteList');

                reButton.setAttribute('type', 'button');
                delButton.setAttribute('type', 'button');

                clicCareUl.setAttribute('class', 'card_cont_box clic_care_box');
                clicCareUl.setAttribute('id', `clicCare_${crId}`);

                span.innerText = dataName;
                reButton.innerText = '수정';
                delButton.innerText = '삭제';


                // 만든 요소 정리
                div.append(reButton);
                div.append(delButton);

                li.append(span);
                li.append(div);

                listBox.append(li);
                card3.append(clicCareUl);

                
                //   모달 off
                nameInput.value = '';
                selClicCreate.classList.remove('on');

                listClickFuc();
                tabListFuc();
                md();
            };
        });
        
    };

    createData();



});