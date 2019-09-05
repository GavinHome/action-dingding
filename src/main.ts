import * as core from '@actions/core';

import * as https from 'https'

async function run() {
  try {
    const token = core.getInput('token');
    if (!token) {
      core.setFailed('dingding token is required!');
    }

    const body = core.getInput('body ');
    if (!body) {
      core.setFailed('post body is required!');
    }

    //var url = `https://oapi.dingtalk.com/robot/send?access_token=${token}`

    const req = https.request({
      hostname: `https://oapi.dingtalk.com`,
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

    //core.debug(`Hello ${myInput}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
