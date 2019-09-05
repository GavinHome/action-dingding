import * as core from '@actions/core';
import * as https from 'https';

async function run() {
  try {
    var token = core.getInput('token');
    if (!token) {
      core.setFailed('dingding token is required!');
    }

    var body: any = core.getInput('body');

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
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
