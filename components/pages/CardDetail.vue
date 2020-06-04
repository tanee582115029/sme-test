<template>
    <div
        v-if="shop"
        class="card-detail"
    >
        <div class="image">
            <img
                v-if="shop && shop.food_shop.image_small"
                class="img-food"
                :src="shop.food_shop.image_small"
            >
            <img
                v-else
                class="img-food"
                src="~assets/images/defualt-image.svg"
            >
        </div>
        <div class="detail">
            <div class="title">
                {{ shop ? shop.food_shop.name: '' }}
            </div>
            <div class="area">
                {{ shop.food_shop.provide }} {{ shop.food_shop.area? '('+shop.food_shop.area+')' : '' }} {{ shop.distance ? '•': '' }} {{ shop.distance ? shop.distance+' km' : '' }} 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'shop' ],
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
.card-detail {
    padding: 12px 20px;
    display: flex;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    color: #000;
    & .image {
        margin-right: 16px;
        & .img-food {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            & img {
                width: 100%;
            }
        }
    }
    & .detail {
        & .title {
            font-size: 1rem;
            font-weight: 700;
            color: #000;
            font-family: Maledpan;
            font-weight: 700;
        }
        & .area {
            font-size: .875rem;
            color: rgba(0,0,0,0.45);
        }
    }
}
</style>
