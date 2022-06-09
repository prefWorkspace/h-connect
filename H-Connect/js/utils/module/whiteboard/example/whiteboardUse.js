const { WhiteboardCreator } = await import(
    importVersion('/H-Connect/js/utils/module/whiteboard/whiteboard.js')
);
const whiteboardCreatorOptions = {};

const whiteboardCreatorModule = new WhiteboardCreator(
    '#whiteboard',
    whiteboardCreatorOptions
);
