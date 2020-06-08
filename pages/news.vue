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
        liff.init({ liffId: "1654312520-0dkM8qQj" }, () => {
            if (liff.isLoggedIn()) {
                window.location.href = `http://reg.advicesys.com/news/`
            }
            else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    },
    head() {
        return {
            title: 'ข่าว',
        }
    }
}
</script>

<style lang="scss" scoped>
    //
</style>
