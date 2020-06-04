<template>
    <div>
        <div class="content" @submit.prevent="addData">
            Name: <input v-model="name"/> <br/>
            Province: <input v-model="province"/><br/>
            <button color="success" @click="updateData">Update</button><br/>
        </div>
        {{ name }} {{ province }} {{ userId }}
    </div>
</template>

<script>
import { db } from '~/firebaseConfig.js'
import firebase from 'firebase'
export default {
    data: function () {
        return {
            name: '',
            province: '',
            userList: [],
            userId: ''
        }
    },
    head() {
        return {
            title: 'EDIT',
        }
    },
    methods: {
        updateData() {
        },
    },
    mounted() {
        liff.init({ liffId: "1654304970-L4lnxxxl" }, () => {
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    db.collection("user").doc(profile.userId)
                        .onSnapshot(function(doc) {
                            this.name = doc.data().name,
                            this.province = doc.data().province
                            this.userId = doc.data().userId
                        })
                }).catch(err => console.log(err))
            } else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    }
}
</script>

<style>
</style>
