import * as core from '@actions/core';
import * as https from 'https';

async function run() {
  try {
    var token = core.getInput('token');
    token = token ? token : 'f8e6693c61f3a970efe789133f5dd4b691ab9a6f0f9058022bf450057a523713'
    if (!token) {
      core.setFailed('dingding token is required!');
    }

    var body: any = core.getInput('body');
    body = body ? body : {
      "msgtype": "link",
      "link": {
        "text": "test",
        "title": "test",
        "picUrl": "",
        "messageUrl": "https://www.dingtalk.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI"
      }
    }

    if (!body) {
      core.setFailed('post body is required!');
    }

    if (!token || !body) {
      return;
    }

    core.debug(`token: ${token}`);
    core.debug(`body: ${body}`);

    const req = https.request({
      protocol: 'https:',
      hostname: `oapi.dingtalk.com`,
      port: 443,
      path: `/robot/send?access_token=${token}`,
      method: "POST",
      headers: {
        'Content-Type': "application/json; charset=utf-8"
      }
    }, (res) => {
      core.debug(`状态码: ${res.statusCode}`);
      console.log(`状态码: ${res.statusCode}`);
      core.debug(`响应头: ${JSON.stringify(res.headers)}`);
      console.log(`响应头: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`响应主体: ${chunk}`);
        core.debug(`响应主体: ${chunk}`);
      });
      res.on('end', () => {
        console.log('响应中已无数据。');
        core.debug('响应中已无数据。');
      });
    });

    req.on('error', function (err) {
      core.setFailed('post message is failed!');
      console.error(err);
    });

    req.write(JSON.stringify(body));
    req.end();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
