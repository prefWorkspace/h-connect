'use strict';

//병동 리스트 탬플릿
export function wardList(item) {
    return `
        <div class="cont">
            <div class="ward_list" data-wardcode=${item.wardCode}>
                <p>${item.ward}</p>
                <div class="ward_count">
                    <p>
                        <span>${item.wardPatientCount}</span> 명의 환자 입원 중
                    </p>
                    <p>
                        <span>${item.wardDeviceCount}</span> 개의 장치 운영 중
                    </p>
                </div>
                <div class="btn_list">
                    <button type="button" class="btn btn_modify bl" data-wardcode=${item.wardCode} data-oN=${item.orderNumber} data-deactivate=${item.deactivate} >수정</button>
                    <button type="button" class="btn btn_delete rd" data-wardcode=${item.wardCode}>삭제</button>
                </div>
                <div>
                    <img src="/H-Connect/img/right_arrow.svg" alt="오른쪽 화살표 아이콘">
                </div>
            </div>
        </div>
    `;
}
