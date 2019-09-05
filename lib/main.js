"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const https = __importStar(require("https"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var token = core.getInput('token');
            if (!token) {
                core.setFailed('dingding token is required!');
            }
            var body = core.getInput('body');
            if (!body) {
                core.setFailed('post body is required!');
            }
            if (!token || !body) {
                return;
            }
            const req = https.request({
                protocol: 'https:',
                hostname: `oapi.dingtalk.com`,
                port: 443,
                path: `/robot/send?access_token=${token}`,
                method: "POST",
                headers: {
                    'Content-Type': "application/json; charset=utf-8"
                }
            });
            req.on('error', function (err) {
                core.setFailed('post message is failed!');
                console.error('post message is failed! error: ' + err);
            });
            req.write(body);
            req.end();
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
