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
        // 1654109263-01oqemwP
        liff.init({ liffId: "1654109263-01oqemwP" }, () => {
            const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "")
            const params = new URLSearchParams(queryString)
            this.params = params
            this.action = params.get('action')
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    const today = moment().format('YYYY MM DD')
                    const encode = base64.encode(md5(today+"A578RT"))
                    const userId = profile.userId
                    if (this.action === 'register') {
                        window.location.href = `https://backend.halalhero.co/register/?line=${userId}&key=${encode}`
                    }
                    else {
                        window.location.href = `https://hlc.avalue.co.th/restaurant?userId=${userId}`
                    }
                }).catch(err => console.log(err))
            } else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    },
    head() {
        return {
            title: 'QR ของฉัน',
        }
    }
}
</script>

<style lang="scss" scoped>
    //
</style>
