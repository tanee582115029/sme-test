<script>
import base64 from 'base-64'
import md5 from 'md5'
import moment from 'moment'
export default {
    layout: 'mobile',
    data() {
        return {
            action: "",
            params: "",
        }
    },
    mounted() {
        liff.init({ liffId: "1654312520-x4ByNM87" }, () => {
            if (liff.isLoggedIn()) {
                // window.location.href = `http://reg.advicesys.com/group/`
                // liff.getProfile().then(profile => {
                // }).catch(err => console.log(err))
                if (!liff.isInClient()) {
                    sendAlertIfNotInClient()
                }
                else {
                    liff.sendMessages([ {
                        "type": "flex",
                        "altText": "Flex Message",
                        "contents": {
                            "type": "bubble",
                            "direction": "ltr",
                            "hero": {
                                "type": "image",
                                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_4_news.png",
                                "size": "full",
                                "aspectRatio": "20:13",
                                "aspectMode": "cover",
                                "action": {
                                    "type": "uri",
                                    "label": "Action",
                                    "uri": "https://linecorp.com/"
                                }
                            }
                        }
                    } ]).then(function() {
                        window.alert('Message sent')
                    }).catch(function(error) {
                        window.alert('Error sending message: ' + error)
                    })
                }
            }
            else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    },
    head() {
        return {
            title: 'หาซื้อของ',
        }
    }
}
</script>

<style lang="scss" scoped>
    //
</style>
