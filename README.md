# Push DingDing Notification Action

This action offers an easy way to push message to your group bot of DingDing support. It runs on all operating systems types offered by GitHub.

## Input variables

You must provide:

- `token`: Usually you'll want to set this to `${{ secrets.DING_TOKEN }}`.
- `body`: Put any kind of message body. 

See the walkthrough located [dingding](https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq), support into `body` and `token` fields.


## Getting Started

This usage assumes you want to send dingding message only.
- First, set up DingDing group [bot](https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq).
- Second, This is a common use case as you will want to send DingDing message.

Simple example:

```yaml
- name: Send dingding notify
  uses: GavinHome/action-dingding@v1.0
  with:
    token: ${{ secrets.DING_TOKEN }}
    body: |
      {
         "msgtype": "markdown",
         "markdown": {
             "title":"杭州天气",
             "text": "#### 杭州天气\n" +
                     "> 9度，西北风1级，空气良89，相对温度73%\n\n" +
                     "> ![screenshot](https://gw.alicdn.com/tfs/TB1ut3xxbsrBKNjSZFpXXcXhFXa-846-786.png)\n"  +
                     "> ###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n"
         }
     }
```



