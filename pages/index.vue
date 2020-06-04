<template>
    <div>
        hi
    </div>
</template>
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
    head() {
        return {
            title: 'QR ของฉัน',
        }
    }
}
</script>

<style lang="scss" scoped>
    //
</style>
