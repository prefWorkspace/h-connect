const { SelectBioSignalsTrendDataPage } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/common/actions/patientMonitoringAPI.js'
    )
);

const { CreatePagination } = await import(
    importVersion('/H-Connect/js/utils/module/pagination/pagination.js')
);

const { tabularTrendListTmpl } = await import(
    importVersion(
        '/H-Connect/js/nurse/patientMonitoring/patient/tabularTrend/templates/tabularTrendTmpl.js'
    )
);

const tabularTrendListPagination = new CreatePagination({
    API: SelectBioSignalsTrendDataPage,
    target: {
        listWrap: '#tabular_table_wrap .table_body',
        pagination: '#tabular_table_wrap .table_page',
    },
    templates: {
        listItem: tabularTrendListTmpl,
    },
    link: {
        keepParams: ['measurement_code', 'tab'],
    },
});
