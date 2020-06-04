<template>
    <nuxt-link
        :to="`/restaurant/${restaurant.food_shop.phone}/`"
        class="card-list"
    >
        <div class="image">
            <img
                v-if="restaurant.food_shop.image_small"
                class="img-food"
                :src="restaurant.food_shop.image_small"
            >
            <img
                v-else
                class="img-food"
                src="~assets/images/defualt-image.svg"
            >
        </div>
        <div class="detail">
            <div class="restaurant-detail">
                <div class="title">
                    {{ restaurant.food_shop ? restaurant.food_shop.name : '-' }}
                </div>
                <div class="area">
                    {{ restaurant.food_shop.provide }} {{ restaurant.food_shop.area? '('+restaurant.food_shop.area+')' : '' }} {{ restaurant.distance ? '•': '' }} {{ restaurant.distance ? restaurant.distance+' km' : '' }} 
                </div>
            </div>
            <div class="food-section">
                <div
                    v-if="restaurant.available > 0"
                    class="status"
                >
                    <img
                        class="plate"
                        src="~assets/images/ic-plate-rice-active.svg"
                    >
                    <div class="menu">
                        {{ restaurant.food_title }}
                    </div>
                    <div class="clearbox">
                        {{ restaurant.available }} ชุด
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
                        {{ restaurant.food_title }}
                    </div>
                    <div class="soldout">
                        หมด
                    </div>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    props: [ 'restaurant', 'restaurantId' ],
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
.card-list {
    text-decoration: none;
    padding: 12px 0 20px;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 80px auto;
    color: #000;
    & .image {
        // margin-right: 16px;
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
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        & .restaurant-detail {
            & .title {
                font-size: 1rem;
                font-weight: 700;
                color: #000;
                font-family: Maledpan;
            }
            & .area {
                font-size: .875rem;
                color: rgba(0, 0, 0, 0.45);
            }
        }
        & .food-section {
            font-size: .75rem;
            & .status {
                display: grid;
                grid-template-columns: 20px auto 56px;
                grid-gap: 8px;
                align-items: center;
                & .plate {
                    width: 20px;
                    height: 20px;
                }
                & .menu {
                    width: 145px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    color: rgba(0, 0, 0, 0.85);
                }
                & .clearbox {
                    font-size: .75rem;
                    color: #0AC775;
                    background-color: rgba(10, 199, 117, 0.08);
                    padding: 4px 0;
                    text-align: center;
                    border-radius: 5px;
                }
            }
            & .status-soldout {
                // display: none;
                display: grid;
                grid-template-columns: 20px auto 56px;
                grid-gap: 8px;
                align-items: center;
                & .menu {
                    width: 145px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    color: rgba(0, 0, 0, 0.85);
                }
                & .soldout {
                    font-size: .75rem;
                    color: #FF3B30;
                    background-color: rgba(255, 59, 48, 0.06);
                    padding: 4px 0;
                    text-align: center;
                    border-radius: 5px;
                }
            }
        }
    }
}
.page-enter-active, .page-leave-active {
    transition: all .3s ease;
}
.page-enter {
    transform: translateY(30px);
    opacity: 0;
}
.page-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}

.layout-enter-active, .layout-leave-active {
    transition: all .3s ease;
}
.layout-enter {
    transform: translateY(30px);
    opacity: 0;
}
.layout-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}

.slideLeftAb-enter-active, .slideLeftAb-leave-active {
    transition: all .3s ease-out;
}
.slideLeftAb-enter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateX(30px);
    opacity: 0;
}
.slideLeftAb-leave-to {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateX(-30px);
    opacity: 0;
}
</style>
