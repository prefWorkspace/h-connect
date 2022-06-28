import { CustomSocket } from '/H-Connect/js/lib/socket/custom/customSocket.js';
import { MessageDelegate } from '/H-Connect/js/message/messageDelegate.js';
import { commonRequest } from '/H-Connect/js/utils/controller/commonRequest.js';
import { CustomD3 } from '/H-Connect/js/lib/d3/custom/customD3.js';
import { CreateVitalLineD3 } from '/H-Connect/js/utils/module/d3js/d3Module.js';
import { toFixedFloat } from '/H-Connect/js/utils/common/utils.js';

window.CustomSocket = CustomSocket;
window.MessageDelegate = MessageDelegate;
window.commonRequest = commonRequest;
window.CustomD3 = CustomD3;
window.CreateVitalLineD3 = CreateVitalLineD3;
window.toFixedFloat = toFixedFloat;