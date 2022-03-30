const { parseRecord, parsePaginationBlock } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/arteriotony/templates/prerecordTmpl.js'
    )
);

const { selectBloodPressurePage } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/arteriotony/actions/bloodPressureAPI.js'
    )
);

const { history } = await import(
    importVersion('/H-Connect/js/utils/controller/historyController.js')
);

const historyMeasurementCode = history.getParams('measurement_code');

export const renderPrerecordList = async () => {
    const { page, records, totalCount } = await selectBloodPressurePage(1);
    renderPrerecordPagination({ page, list: records, totalCount });
    let _html = '';
    if (totalCount && records) {
        _html = records?.htmlFor((_item) => {
            return parseRecord(_item);
        });
    }
    $('.pre_record .table_body').html(_html);
};
const renderPrerecordPagination = async (_listData) => {
    const { page, list } = _listData || {};
    $('.pre_record .table_page').html(parsePaginationBlock(_listData));
    if (page > 1 && !list) {
        window.history.pushState(
            '',
            '',
            `arteriotony.html?measurement_code=${historyMeasurementCode}&page=${
                page - 1
            }`
        );
        renderPrerecordList();
    }
};
renderPrerecordList();
