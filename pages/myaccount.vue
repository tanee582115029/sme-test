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
            <a-button class="next-btn" :href="`https://community.smeconnext.com/profile/?line=${userId}&key=${encode}`">ดำเนินการต่อ</a-button>
        </div>
</div>
</template>
<script>
import base64 from 'base-64'
import md5 from 'md5'
import moment from 'moment'
import { Icon, Button } from 'ant-design-vue'
export default {
    components: {
        AIcon: Icon,
        AButton: Button
    },
    layout: 'mobile',
    data() {
        return {
            action: "",
            params: "",
            isLoading: true,
            userId: "",
            encode: "",
        }
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 3000)
        liff.init({ liffId: "1654312520-gER41Pep" }, () => {
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    const today = moment().format('YYYY MM DD')
                    const encode = base64.encode(md5(today+"A578RT"))
                    const userId = profile.userId
                    this.userId = userId
                    this.encode = encode
                    window.location.href = `https://community.smeconnext.com/profile/?line=${userId}&key=${encode}`
                }).catch(err => console.log(err))
            } else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    },
    head() {
        return {
            title: 'บัญชีผู้ใช้',
        }
    }
}
</script>
