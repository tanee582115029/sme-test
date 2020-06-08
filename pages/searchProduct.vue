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
                window.location.href = `http://reg.advicesys.com/group/`
                // liff.getProfile().then(profile => {
                // }).catch(err => console.log(err))
            }
            else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    },
    head() {
        return {
            title: 'ซื้อสินค้า',
        }
    }
}
</script>

<style lang="scss" scoped>
    //
</style>
