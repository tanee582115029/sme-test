<template>
    <div class="detail-page">
        <loading :loading="loading" />
        <div class="cover">
            <card-detail
                :shop="shop"
            />
            <card-menu
                :shop="shop"
            />
            <area-detail
                :shop="shop"
                :coordinate="coordinate"
            />
            <process
                :process="shop"
            />
            <a-button @click="getUserId"  class="my-qr">
                QR ของฉัน
            </a-button>
        </div>
    </div>
</template>

<script>

import md5 from 'md5'
import axios from 'axios'
import base64 from 'base-64'
import moment from 'moment'
import toastr from 'toastr'
import { Button } from 'ant-design-vue'

import CardDetail from '~/components/pages/CardDetail'
import CardMenu from '~/components/pages/CardMenu'
import AreaDetail from '~/components/pages/AreaDetail'
import Process from '~/components/pages/Process'
import Loading from '~/components/global/Loading'
export default {
    components: {
        CardDetail,
        CardMenu,
        AreaDetail,
        Process,
        Loading,
        AButton: Button
    },
    data() {
        return {
            restaurantId: $nuxt._route.params.restaurantId,
            shop: null,
            loading: true,
            coordinate: ''
        }
    },
    head() {
        return {
            title: this.shop ? this.shop.food_shop.name : 'ร้านอาหาร',
        }
    },
    mounted() {
        this.getLocation()
    },
    methods: {
        async getApi() {
            const encode = (base64.encode(md5("yesUoiasJ78#w$"))).toString().replace('=', '%3D')
            const restaurantDetail = await axios.get(`https://backend.halalhero.co/?JSON=yes&jkey=${encode}`)
            this.loading = false
            if (restaurantDetail.data !== null) {
            // if (restaurantDetail.data.length > 0) {
                const responseRestaurant = restaurantDetail.data.find(restaurant => restaurant.food_shop.phone === this.restaurantId)
                this.shop = responseRestaurant
                this.shop.distance = ''
            }
        },
        async getLocation() {
            const options = {
                enableHighAccuracy: true,
                timeout: 3000,
                maximumAge: 0
            }
            const encode = (base64.encode(md5("yesUoiasJ78#w$"))).toString().replace('=', '%3D')
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const userLat = position.coords.latitude
                    const userLon = position.coords.longitude
                    this.coordinate = `${userLat},${userLon}`
                    const restaurantDetail = await axios.get(`https://backend.halalhero.co/?JSON=yes&jkey=${encode}`)
                    if (restaurantDetail.data.length > 0) {
                        const responseRestaurant = restaurantDetail.data.find(restaurant => restaurant.food_shop.phone === this.restaurantId)
                        this.shop = responseRestaurant
                        if (responseRestaurant.food_shop.location !== '' && responseRestaurant.food_shop.location !== null) {
                            const location = responseRestaurant.food_shop.location.split(",")
                            const shopLat = Number(location[0].trim())
                            const shopLon = Number(location[1].trim())

                            const φ1 = Math.PI * userLat/180
                            const φ2 = Math.PI * shopLat/180
                            const theta = shopLon - userLon
                            const Δλ = Math.PI * theta/180
                            const R = 6371e3 // gives d in metres
                            const responseMetres = Math.acos(Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ)) * R
                            this.shop.distance = parseFloat((responseMetres / 1000).toFixed(2))
                            this.loading = false
                        }
                        else {
                            this.shop.distance = ''
                            this.loading = false
                        }
                    }
                    else {
                        this.getApi()
                    }
                },
                () => {
                    this.getApi()
                },
                options
                )
            }
            else {
                this.getApi()
            }
        },
        getUserId () {
            const today = moment().format('YYYY MM DD')
            const encode = base64.encode(md5(today+"A578RT"))
            const userId = this.$store.state.userId
            window.location.href = `https://backend.halalhero.co/register/?line=${userId}&key=${encode}`
        },
    }
}
</script>

<style lang="scss" scoped>
@font-face {
        font-family: Sarabun;
        src: url('~assets/fonts/Sarabun/Sarabun-Regular.ttf');
}
@font-face {
    font-family: Maledpan;
    font-weight: normal;
    src: url('~assets/fonts/maledpan/webfonts/maledpan-regular-webfont.ttf');
    src: url('~assets/fonts/maledpan/webfonts/maledpan-regular-webfont.woff') format('woff'),
         url('~assets/fonts/maledpan/webfonts/maledpan-regular-webfont.eot') format('eot');
}
.detail-page {
    font-family: Sarabun;
    width: 100%;
    & .cover {
        padding: 0 8px 30px;
        & .my-qr {
            width: 100%;
            font-family: Maledpan;
            font-size: 1rem;
            font-weight: 700;
            color: #FFF;
            background-color: #F36F2F;
            height: 50px;
            border-color: #F36F2F;
        }
    }
}
</style>
