<template>
    <div
        v-if="loading"
        class="loading-wrap"
    >
        <a-icon
            type="loading"
            style="color: #FF9D1A; fontSize: 50px;"
            theme="outlined"
        />
    </div>
</template>

<script>

import { Icon } from 'ant-design-vue'

export default {
    props: [ 'loading' ],
    components: {
        AIcon: Icon
    },
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
</style>
