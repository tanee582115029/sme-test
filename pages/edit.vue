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
        liff.init({ liffId: "1654304970-L4lnxxxl" }, () => {
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    window.location.href = `http://reg.advicesys.com/group/`
                }).catch(err => console.log(err))
            } else {
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
