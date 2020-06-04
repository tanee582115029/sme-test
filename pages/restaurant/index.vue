<template>
    <div class="list-page">
        <loading :loading="loading" />
        <div
            class="banner"
        >
            <a
                href="javascript:void(0)"
                @click="getUserId"
            >
                <img
                    class="img-banner"
                    src="~assets/images/image-banner.png"
                >
                <div class="qr">
                    <div class="qr-side">
                        <img
                            class="img-qr"
                            src="~assets/images/ic-qr.svg"
                        >
                    </div>
                    <div class="text-side">
                        <div class="title">
                            QR ของฉัน / ลงทะเบียน
                        </div>
                        <div class="sub-title">
                            กดที่นี่เพื่อแสดง QR Code ในการใช้สิทธิ์รับอาหาร
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div
            v-if="isEmpty"
            class="notfound"
        >
            <img
                class="img-food-notfound"
                src="~assets/images/empty.svg"
            >
            <div class="info-text">
                <div class="title">
                    ไม่พบร้านอาหาร
                </div>
                <div class="text">
                    ขออภัย, ไม่พบร้านอาหารในพื้นที่ของท่านในเวลานี้
                </div>
            </div>
        </div>
        <div>
            <div
                class="loop"
                v-for="(restaurant) in restaurants"
                :key="restaurant.food_shop.phone"
            >
                <card-list
                    v-if="restaurant.food_shop.phone !== ''"
                    :restaurant="restaurant"
                />
            </div>
        </div>
    </div>
</template>

<script>

import md5 from 'md5'
import axios from 'axios'
import base64 from 'base-64'
import moment from 'moment'
import toastr from 'toastr'

import CardList from '~/components/pages/CardList'
import Loading from '~/components/global/Loading'
export default {
    // layout: 'mobile',
    components: {
        CardList,
        Loading,
    },
    data() {
        return {
            restaurants: [],
            data: null,
            distance: null,
            loading: true,
            isEmpty: false,
        }
    },
    head() {
        return {
            title: 'ร้านอาหาร',
        }
    },
    async mounted() {
        liff.init({ liffId: "1654037688-aRQJdQdZ" }, () => {
                if (liff.isLoggedIn()) {
                    liff.getProfile().then(profile => {
                        this.$store.commit('add', profile.userId )
                    }).catch(err => console.log(err))
                } else {
                    liff.login()
                }
        }, err => console.log(err))

        // -------------
        const encode = (base64.encode(md5("yesUoiasJ78#w$"))).toString().replace('=', '%3D')
        const options = {
            enableHighAccuracy: true,
            timeout: 3000,
            maximumAge: 0
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLat = position.coords.latitude
                const userLon = position.coords.longitude
                axios.get(`https://backend.halalhero.co/?JSON=yes&jkey=${encode}`)
                    .then(response => {
                        if (response.data === null) {
                            this.loading = false
                            this.isEmpty = true
                        }
                        const restaurantList = response.data.map(restaurant => {
                            if (restaurant.food_shop.location !== '' && restaurant.food_shop.location !== null) {
                                const location = restaurant.food_shop.location.split(",")
                                const shopLat = Number(location[0].trim())
                                const shopLon = Number(location[1].trim())

                                const φ1 = Math.PI * userLat/180
                                const φ2 = Math.PI * shopLat/180
                                const theta = shopLon - userLon
                                const Δλ = Math.PI * theta/180
                                const R = 6371e3 // gives d in metres
                                const responseMetres = Math.acos(Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ)) * R
                                const distance = parseFloat((responseMetres / 1000).toFixed(2))

                                return { ...restaurant, distance }
                            }
                            return { ...restaurant, distance: 0.00 }
                        })
                        this.restaurants = restaurantList.filter(item => item.distance <= 100.00).sort((a, b) => (a.distance - b.distance))
                        this.loading = false
                        if (this.restaurants.length <= 0) {
                            this.isEmpty = true
                        }
                    })
            },
            () => {
                axios.get(`https://backend.halalhero.co/?JSON=yes&jkey=${encode}`)
                    .then(response => {
                        if (response.data !== null) {
                            let cmProvince = response.data.filter((data)=>{
                                return [ "เชียงใหม่" ].indexOf(data.food_shop.provide) >= 0
                            }).sort((a, b) => a.food_shop.name.localeCompare(b.food_shop.name, 'th'))

                            let bkkProvince = response.data.filter((data)=>{
                                return ["กรุงเทพมหานคร"].indexOf(data.food_shop.provide) >= 0
                            }).sort((a, b) => a.food_shop.name.localeCompare(b.food_shop.name, 'th'))
                            let ptnProvince = response.data.filter((data)=>{
                                return ["ปัตตานี"].indexOf(data.food_shop.provide) >= 0
                            }).sort((a, b) => a.food_shop.name.localeCompare(b.food_shop.name, 'th'))
                            const otherFound= response.data.filter((data)=>{
                                return ["เชียงใหม่","กรุงเทพมหานคร", "ปัตตานี"].indexOf(data.food_shop.provide) < 0
                            }).sort((a, b) => a.food_shop.provide.localeCompare(b.food_shop.provide, 'th'))
                            this.restaurants = this.restaurants.concat(cmProvince, bkkProvince, ptnProvince, otherFound)
                            this.loading = false
                        }
                        else {
                            // do something when res.data == null
                            this.loading = false
                            this.isEmpty = true
                        }
                    })
            },
            options
            )
        }
        else {
            axios.get(`https://backend.halalhero.co/?JSON=yes&jkey=${encode}`)
                .then(response => {
                    if (response.data !== null) {
                        let cmProvince = response.data.filter((data)=>{
                            return ["เชียงใหม่"].indexOf(data.food_shop.provide) >= 0
                        }).sort((a, b) => a.food_shop.name.localeCompare(b.food_shop.name, 'th'))

                        let bkkProvince = response.data.filter((data)=>{
                            return ["กรุงเทพมหานคร"].indexOf(data.food_shop.provide) >= 0
                        }).sort((a, b) => a.food_shop.name.localeCompare(b.food_shop.name, 'th'))
                        let ptnProvince = response.data.filter((data)=>{
                            return ["ปัตตานี"].indexOf(data.food_shop.provide) >= 0
                        }).sort((a, b) => a.food_shop.name.localeCompare(b.food_shop.name, 'th'))
                        const otherFound= response.data.filter((data)=>{
                            return ["เชียงใหม่","กรุงเทพมหานคร", "ปัตตานี"].indexOf(data.food_shop.provide) < 0
                        }).sort((a, b) => a.food_shop.provide.localeCompare(b.food_shop.provide, 'th'))
                        this.restaurants = this.restaurants.concat(cmProvince, bkkProvince, ptnProvince, otherFound)
                        this.loading = false
                    }
                    else {
                        // do something when res.data == null
                        this.loading = false
                        this.isEmpty = true
                    }
                })
        }
    },
    methods: {
        getUserId () {
            liff.init({ liffId: "1654037688-aRQJdQdZ" }, () => {
                const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "")
                const params = new URLSearchParams(queryString)
                this.params = params
                this.action = params.get('action')
                if (liff.isLoggedIn()) {
                    liff.getProfile().then(profile => {
                        const today = moment().format('YYYY MM DD')
                        const encode = base64.encode(md5(today+"A578RT"))
                        const userId = profile.userId
                        window.location.href = `https://backend.halalhero.co/register/?line=${userId}&key=${encode}`
                    }).catch(err => console.log(err))
                } else {
                    liff.login()
                }
            }, err => console.log(err))
        }
    }
}
</script>

<style lang="scss">
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
.list-page {
    font-family: Sarabun;
    position: relative;
    & .banner {
        width: 100%;
        height: 160px;
        padding: 0 8px;
        & a {
            text-decoration: none;
            color: #FFF;
            & .img-banner {
                width: 100%;
                height: 160px;
                border-radius: 10px;
            }
            & .qr {
                width: 100%;
                z-index: 1;
                position: absolute;
                top: 18px;
                left: 0;
                right: 3%;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                & .qr-side {
                    background-color:rgba(255, 255, 255, 0.57);
                    border-radius: 100%;
                    width: 64px;
                    height: 64px;
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    & .img-qr {
                        width: 60px;
                        height: 60px;
                        & img {
                            width: 100%;
                        }
                    }
                }
                & .text-side {
                    text-align: center;
                    & .title {
                        font-size: 1.25rem;
                        font-family: Maledpan;
                    }
                    & .sub-title {
                        font-size: .875rem;
                        font-family: Maledpan;
                    }
                }
            }
        }
    }
    & .notfound {
        justify-content: center;
        align-items: center;
        flex-direction: column;
        display: flex;
        z-index: 2000;
        position: fixed;
        top: 220px;
        left: 0;
        right: 0;
        & .img-food-notfound {
            width: 120px;
            height: 120px;
            & img {
                width: 100%;
                height: 100%;
            }
        }
        & .info-text {
            margin-top: 18px;
            line-height: 24px;
            & .title {
                font-family: Maledpan;
                font-size: 1.5rem;
                color: #000;
                text-align: center;
            }
            & .text {
                margin-top: 12px;
                font-family: Sarabun;
                font-size: .875rem;
                color: rgba(0, 0, 0, 0.65);
                width: 200px;
                text-align: center;
            }
        }
    }
    & div {
        & .loop {
            padding: 0 20px 0;
        }
    }
}

    //
</style>
