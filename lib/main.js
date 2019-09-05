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
            //const token = 'f8e6693c61f3a970efe789133f5dd4b691ab9a6f0f9058022bf450057a523713'
            const token = core.getInput('token');
            if (!token) {
                core.setFailed('dingding token is required!');
            }
            // const body = {
            //   "msgtype": "link",
            //   "link": {
            //       "text": "这个即将发布的新版本，创始人陈航（花名“无招”）称它为“红树林”。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是“红树林”？",
            //       "title": "时代的火车向前开",
            //       "picUrl": "",
            //       "messageUrl": "https://www.dingtalk.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI"
            //   }
            // }
            const body = core.getInput('body ');
            if (!body) {
                core.setFailed('post body is required!');
            }
            const req = https.request({
                hostname: `oapi.dingtalk.com`,
                port: 443,
                path: `/robot/send?access_token=${token}`,
                method: "POST",
                headers: {
                    'Content-Type': "application/json; charset=utf-8"
                }
            });
            req.write(JSON.stringify(body));
            req.on('error', function (err) {
                core.setFailed('post message is failed!');
                console.error(err);
            });
            req.end();
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
