const { selectMeasurementInfoList } = await import(
    importVersion(
        '/H-Connect/js/nurse/management/measure/actions/measureAPI.js'
    )
);

const { measurementInfoSimpleList } = await selectMeasurementInfoList();
console.log(measurementInfoSimpleList);
