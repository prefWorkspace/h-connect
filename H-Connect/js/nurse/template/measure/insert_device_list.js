function Create_new_DeviceList(device, serial){
    console.log("test")
    const data = `
        <div id="device">
            <p>${device}</p>
            <p>${serial}</p>

            <div class="btn_list">
                <button type="button" class="btn bl btn_modify">수정</button>
                <button type="button" class="btn rd btn_delete">삭제</button>
            </div>
        </div>
    `;

    $(".section.new_hospital .container .device_room .btn_add").before(data);
}