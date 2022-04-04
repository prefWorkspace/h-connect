const { device_TypeToName } = await import(
    importVersion('/H-Connect/js/utils/controller/deviceNameController.js')
);

export function deviceTemplate(item) {
    return `
        <div class="temp">
            <p>${device_TypeToName(item.deviceType)}</p>
            <p>${item.serialNumber}</p>

            <div class="btn_list">
                <button
                    type="button"
                    class="btn bl btn_modify"
                >
                    수정
                </button>
                <button
                    type="button"
                    class="btn rd btn_delete"
                >
                    삭제
                </button>
            </div>
        </div>
    `;
}
