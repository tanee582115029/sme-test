<template>
    <div class="area-detail">
        <div class="title">
            รายละเอียด
        </div>
        <div
            v-if="shop"
            class="detail"
        >
            <div class="tel">
                <img
                    class="img"
                    src="~/assets/images/call.svg"
                >
                <div class="info">
                    <div class="contact">
                        {{ shop ? `${shop.food_shop.phone}` : '' }}
                    </div>
                    <a :href="shop ? `tel:${shop.food_shop.phone}` : ''">
                        โทรออก
                    </a>
                </div>
            </div>
            <div class="locate">
                <img
                    class="img"
                    src="~/assets/images/location.svg"
                >
                <div class="info">
                    <div class="contact">
                        {{ shop ? shop.food_shop.direction_des : '' }}
                    </div>
                    <a
                        :href="`https://maps.google.com/?saddr=${ coordinate ? coordinate : 'My Location' }&daddr=${shop.food_shop.location}`"
                        target="_blank"
                    >
                        นำทาง
                    </a>
                </div>
            </div>
            <div class="noti">
                <img
                    class="img"
                    src="~/assets/images/todo.svg"
                >
                <div class="info">
                    รับอาหารในเวลา {{ shop ? shop.food_shop.close_open : '' }} น.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'shop', 'coordinate' ],
    //
}
</script>

<style lang="scss">
@font-face {
    font-family: Maledpan;
    font-weight: normal;
    src: url('~assets/fonts/maledpan/webfonts/maledpan-regular-webfont.ttf');
    src: url('~assets/fonts/maledpan/webfonts/maledpan-regular-webfont.woff') format('woff'),
         url('~assets/fonts/maledpan/webfonts/maledpan-regular-webfont.eot') format('eot');
}
.area-detail {
    padding: 24px 20px 32px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.85);
    & .title {
        font-size: 1rem;
        font-family: Maledpan;
        font-weight: 700;
    }
    & .detail {
        font-size: .875rem;
        display: grid;
        grid-template-rows: auto;
        width: 100%;
        grid-gap: 16px;
        margin-top: 16px;
        & .tel {
            display: flex;
            align-items: center;
            // display: grid;
            // grid-column: 1/ span 3;
            // grid-row: 1;

            & .img {
                width: 16px;
                margin-right: 12px;
                height: 16px;
                & img {
                    width: 100%;
                }
            }
            & .info {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
            }
        }
        & .locate {
            display: flex;
            align-items: flex-start;
            line-height: 20px;
            & .img {
                width: 16px;
                height: 16px;
                margin-right: 12px;
                margin-top: 2px;
                & img {
                    width: 100%;
                }
            }
            & .info {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
                & .contact {
                    padding-right: 32px;
                    // line-height: 20px;
                }
            }
        }
        & .noti {
            display: flex;
            align-items: start;
            // margin: 16px 0 4px;
            align-items: flex-start;
            line-height: 20px;
            padding-right: 65px;
            & .img {
                width: 16px;
                margin-right: 12px;
                height: 16px;
                margin-top: 2px;
                // align-self: start;
                & img {
                    width: 100%;
                }
            }
            & .info {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
        }
    }
}
a {
    text-decoration: none;
    color: #2196F3;
}
</style>
