<template>
    <div class="card-menu">
        <div
            v-if="shop"
            class="food-section"
        >
            <div
                v-if="shop.available > 0"
                class="status"
            >
                <img
                    class="plate"
                    src="~assets/images/ic-plate-rice-active.svg"
                >
                <div class="menu">
                    {{ shop.food_title }}
                </div>
                <div class="clearbox">
                    เหลือ {{ shop.available }} ชุด
                </div>
            </div>
            <div
                v-else
                class="status-soldout"
            >
                <img
                    class="plate"
                    src="~assets/images/ic-plate-rice-inactive.svg"
                >
                <div class="menu">
                    {{ shop.food_title }}
                </div>
                <div class="soldout">
                    หมด
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'shop' ],
}
</script>

<style lang="scss" scoped>
@font-face {
    font-family: Maledpan;
    font-weight: normal;
    src: url('~assets/fonts/maledpan/webfonts/maledpan-regular-webfont.ttf');
    src: url('~assets/fonts/maledpan/webfonts/maledpan-regular-webfont.woff') format('woff'),
         url('~assets/fonts/maledpan/webfonts/maledpan-regular-webfont.eot') format('eot');
}
.card-menu {
    padding: 20px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    & .food-section {
        border-radius: 4px;
        border: 1px dashed rgba(0,0,0,0.1);
        background-color: #FAFAFA;
        font-size: .875rem;
        padding: 24px 20px;
        & .status {
            display: none;
            display: grid;
            grid-template-columns: 20px auto 80px;
            grid-gap: 12px;
            & .plate {
                width: 20px;
                height: 20px;
                // align-self: start;
                margin: 2px 0;
            }
            & .menu {
                color: #000;
                align-self: center;
                font-family: Maledpan;
            }
            & .clearbox {
                font-size: .75rem;
                color: #0AC775;
                background-color: rgba(10, 199, 117, 0.08);
                padding: 4px 0;
                text-align: center;
                border-radius: 5px;
                align-self: start;
            }
        }
        & .status-soldout {
            // display: none;
            display: grid;
            grid-template-columns: 20px auto 80px;
            grid-gap: 12px;
            & .plate {
                width: 20px;
                height: 20px;
                // align-self: start;
                margin: 2px 0;
            }
            & .menu {
                color: #000;
                align-self: center;
                font-family: Maledpan;
            }
            & .soldout {
                // width: 80px;
                font-size: .75rem;
                color: #FF3B30;
                background-color: rgba(255, 59, 48, 0.06);
                padding: 4px 0;
                text-align: center;
                align-self: start;
                border-radius: 5px;
            }
        }
    }
}
</style>
