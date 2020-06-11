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
            <a-button class="next-btn" :href="`https://community.smeconnext.com/lists/?GID=${action}&line=${userId}&key=${encode}`">ดำเนินการต่อ</a-button>
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
    components: {
        AIcon: Icon,
        AButton: Button
    },
    data() {
        return {
            action: "",
            params: "",
            title: '',
            isLoading: true,
            userId: "",
            encode: "",
        }
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 3000)
        liff.init({ liffId: "1654312520-eXRvWOa1" }, () => {
            const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "")
            const params = new URLSearchParams(queryString)
            this.params = params
            this.action = params.get('GID')
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    const today = moment().format('YYYY MM DD')
                    const encode = base64.encode(md5(today+"A578RT"))
                    const userId = profile.userId
                    this.userId = userId
                    this.encode = encode
                    window.location.href = `https://community.smeconnext.com/lists/?GID=${this.action}&line=${userId}&key=${encode}`
                    // this.userId = userId
                    // this.encode = encode
                    // if (this.action === '93') {
                    //     // this.title = 'ข้าว'
                    //     window.location.href = `https://community.smeconnext.com/lists/?GID=93&line=${userId}&key=${encode}`
                    // }
                    // else if (this.action === '94') {
                    //     // this.title = 'น้ำดื่ม'
                    //     window.location.href = `https://community.smeconnext.com/lists/?GID=94&line=${userId}&key=${encode}`
                    // }
                    // else if (this.action === '95') {
                    //     // this.title = 'ผ้า/เสื้อผ้า'
                    //     window.location.href = `https://community.smeconnext.com/lists/?GID=95&line=${userId}&key=${encode}`
                    // }
                    // else if (this.action === '96') {
                    //     // this.title = 'ผลไม้/อาหารแปรรูป'
                    //     window.location.href = `https://community.smeconnext.com/lists/?GID=96&line=${userId}&key=${encode}`
                    // }
                    // else if (this.action === '97') {
                    //     // this.title = 'ขนมขบเคี้ยว'
                    //     window.location.href = `https://community.smeconnext.com/lists/?GID=97&line=${userId}&key=${encode}`
                    // }
                    // else if (this.action === '98') {
                    //     // this.title = 'ผลิตภัณฑ์เพื่อสุขภาพ'
                    //     window.location.href = `https://community.smeconnext.com/lists/?GID=98&line=${userId}&key=${encode}`
                    // }
                    // else if (this.action === '99') {
                    //     // this.title = 'ของใช้/ของตกแต่ง'
                    //     window.location.href = `https://community.smeconnext.com/lists/?GID=99&line=${userId}&key=${encode}`
                    // }
                    // else {
                    //     // this.title = 'ผลิตภัณฑ์บำรุงดิน'
                    //     window.location.href = `https://community.smeconnext.com/lists/?GID=100&line=${userId}&key=${encode}`
                    // }

                }).catch(err => console.log(err))
            }
            else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    },
    head() {
        return {
            title: 'กำลังโหลด...',
        }
    }
}
</script>
