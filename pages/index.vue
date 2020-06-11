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
            <div v-if="action==='sellProduct'">
                <a-button class="next-btn" :href="`https://community.smeconnext.com/register/?line=${userId}&key=${encode}`">ดำเนินการต่อ</a-button>
            </div>
            <div v-else>
                <a-button class="next-btn" :href="`https://community.smeconnext.com/lists/?GID=${this.action}&line=${userId}&key=${encode}`">ดำเนินการต่อ</a-button>
            </div>
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
            userId: "",
            encode: "",
            isLoading: true,
        }
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false
        }, 3000)
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
                    this.userId = userId
                    this.encode = encode
                    if (this.action === 'sellProduct') {
                        window.location.href = `https://community.smeconnext.com/register/?line=${userId}&key=${encode}`
                    }
                    else {
                        window.location.href = `https://community.smeconnext.com/lists/?GID=${this.action}&line=${userId}&key=${encode}`
                    }
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
