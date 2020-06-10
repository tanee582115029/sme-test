<template>
<div>
        <div v-if="isLoading">
            <a-icon
                type="loading"
                style="color: #FF9D1A; fontSize: 50px;"
                theme="outlined"
            />
        </div>
        <div v-else-if="!isLoading">
            <a :href="`https://community.smeconnext.com/lists/?GID=${action}`">next</a>
        </div>
</div>
</template>
<script>
import base64 from 'base-64'
import md5 from 'md5'
import moment from 'moment'
import { Icon } from 'ant-design-vue'
export default {
    layout: 'mobile',
    data() {
        return {
            action: "",
            params: "",
            title: '',
            isLoading: true,
        }
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 5000)
        liff.init({ liffId: "1654312520-GlMnRVqX" }, () => {
            const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "")
            const params = new URLSearchParams(queryString)
            this.params = params
            this.action = params.get('GID')
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    const today = moment().format('YYYY MM DD')
                    const encode = base64.encode(md5(today+"A578RT"))
                    const userId = profile.userId
                    if (this.action === '2') {
                        this.title = 'ข้าวและผลิตภัณฑ์จากข้าว'
                        window.location.href = `https://community.smeconnext.com/lists/?GID=2`
                    }
                    else if (this.action === '3') {
                        this.title = 'ผักและผลไม้'
                        window.location.href = `https://community.smeconnext.com/lists/?GID=3`
                    }
                    else if (this.action === '4') {
                        this.title = 'อาหารกระป๋องและอาหารสำเร็จรูป'
                        window.location.href = `https://community.smeconnext.com/lists/?GID=4`
                    }
                    else if (this.action === '5') {
                        this.title = 'สมุนไพรที่ไม่ใช่อาหาร'
                        window.location.href = `https://community.smeconnext.com/lists/?GID=5`
                    }
                    else if (this.action === '6') {
                        this.title = 'เครื่องดื่ม'
                        window.location.href = `https://community.smeconnext.com/lists/?GID=6`
                    }
                    else if (this.action === '7') {
                        this.title = 'ซอส,น้ำจิ้มและเครื่องปรุง'
                        window.location.href = `https://community.smeconnext.com/lists/?GID=7`
                    }
                    else if (this.action === '8') {
                        this.title = 'เสื้อผ้า,เครื่องแต่งกายและสิ่งทอ'
                        window.location.href = `https://community.smeconnext.com/lists/?GID=8`
                    }
                    else if (this.action === '9') {
                        this.title = 'ขอใช้,ประดับและตกแต่ง'
                        window.location.href = `https://community.smeconnext.com/lists/?GID=9`
                    }
                    else if (this.action === '10') {
                        this.title = 'ขนมขบเคี้ยว'
                        window.location.href = `https://community.smeconnext.com/lists/?GID=10`
                    }
                    else if (this.action === '11') {
                        this.title = 'สินค้าอื่นๆ'
                        window.location.href = `https://community.smeconnext.com/lists/?GID=11`
                    }
                    else {
                        this.title = 'ประกาศขาย'
                        window.location.href = `https://community.smeconnext.com/register/?line=${userId}&key=${encode}`
                    }
                }).catch(err => console.log(err))
            } else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    },
    head() {
        return {
            title: this.title,
        }
    }
}
</script>

<style lang="scss" scoped>
    //
</style>
