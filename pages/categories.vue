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
            <a-button class="next-btn" :href="`https://community.smeconnext.com/lists/?GID=${action}`">ดำเนินการต่อ</a-button>
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
                else {
                    this.title = 'สินค้าอื่นๆ'
                    window.location.href = `https://community.smeconnext.com/lists/?GID=11`
                }
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
