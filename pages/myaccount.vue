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
        liff.init({ liffId: "1654312520-gER41Pep" }, () => {
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    const today = moment().format('YYYY MM DD')
                    const encode = base64.encode(md5(today+"A578RT"))
                    const userId = profile.userId
                    window.location.href = `http://reg.advicesys.com/profile/?line=${userId}&key=${encode}`
                }).catch(err => console.log(err))
            } else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    },
    head() {
        return {
            title: 'บัญชีของฉัน',
        }
    }
}
</script>

<style lang="scss" scoped>
    //
</style>
