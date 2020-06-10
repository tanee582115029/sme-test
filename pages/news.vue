<template>
<div>
        <div
            v-if="isLoading"
            class="loading-wrap"
        >
            <a-icon
                type="loading"
                style="color: #014D87; fontSize: 50px;"
                theme="outlined"
            />
        </div>
        <div class="btn-wrap" v-else-if="!isLoading">
            <a-button class="next-btn" href="https://community.smeconnext.com/news/">ดำเนินการต่อ</a-button>
        </div>
</div>
</template>
<script>
import base64 from 'base-64'
import md5 from 'md5'
import moment from 'moment'
import { Icon, Button } from 'ant-design-vue'
export default {
    layout: 'mobile',
    data() {
        return {
            action: "",
            params: "",
            isLoading: true,
        }
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 3000)
        liff.init({ liffId: "1654312520-0dkM8qQj" }, () => {
            if (liff.isLoggedIn()) {
                window.location.href = `https://community.smeconnext.com/news/`
            }
            else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    },
    head() {
        return {
            title: 'ข่าวสาร',
        }
    }
}
</script>

<style lang="scss" scoped>
    //
</style>
