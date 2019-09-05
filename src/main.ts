import * as core from '@actions/core';
import * as https from 'https';

async function run() {
  try {
    const token = core.getInput('token');
    if (!token) {
      core.setFailed('dingding token is required!');
    }

    const body = core.getInput('body');
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
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
