<template>
    <div class="process">
        <div class="title">
            ขั้นตอนการรับอาหาร
        </div>
        <div class="detail">
            <ol>
                <li>เลือก [QR ของฉัน]</li>
                <li>แสดง QR Code ให้ร้านค้า</li>
                <li>รับอาหาร (สงวนสิทธิ์ไม่เกิน {{ process ? process.per_qr : '' }} ชุด/วัน)</li>
            </ol>
            <div class="noti">
                *ขอสงวนสิทธิ์ในการรับอาหารขึ้นอยู่กับทางร้าน
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'process' ],
    //
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
.process {
    padding: 24px 20px;
    & .title {
        font-size: 1rem;
        color: rgba(0, 0, 0, 0.85);
        font-family: Maledpan;
        font-weight: 700;
    }
    & .detail {
        font-size: 14px;
        margin-top: 12px;
        line-height: 25px;
        color: rgba(0, 0, 0, 0.65);
        & ol {
            padding-left: 20px;
        }
    }
}
</style>
