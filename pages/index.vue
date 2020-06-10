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
            <a-button class="next-btn" :href="`https://community.smeconnext.com/register/?line=${userId}&key=${encode}`">ดำเนินการต่อ</a-button>
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
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    const today = moment().format('YYYY MM DD')
                    const encode = base64.encode(md5(today+"A578RT"))
                    const userId = profile.userId
                    this.userId = userId
                    this.encode = encode
                    this.title = 'ประกาศขาย'
                    window.location.href = `https://community.smeconnext.com/register/?line=${userId}&key=${encode}`
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
<style>
.loading-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    z-index: 2000;
}
.btn-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2000;
}
.next-btn {
    font-size: 16px;
}
</style>
