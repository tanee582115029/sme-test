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
        liff.init({ liffId: "1654312520-GlMnRVqX" }, () => {
            // const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "")
            // const params = new URLSearchParams(queryString)
            // this.params = params
            // this.action = params.get('action')
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    const today = moment().format('YYYY MM DD')
                    const encode = base64.encode(md5(today+"A578RT"))
                    const userId = profile.userId
                    window.location.href = `http://reg.advicesys.com/register/?line=${userId}&key=${encode}`
                    // window.location.href = `https://www.google.com/`
                }).catch(err => console.log(err))
            } else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    },
    head() {
        return {
            title: 'ประกาศขายสินค้า',
        }
    }
}
</script>

<style lang="scss" scoped>
    //
</style>
