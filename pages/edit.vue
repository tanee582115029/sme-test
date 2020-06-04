<template>
    <div>
        <div class="content" @submit.prevent="addData">
            Name: <input v-model="name" value="name"/> <br/>
            Province: <input v-model="province" value="province"/><br/>
            <button color="success" class="mr-4" @click="updateData">Update</button><br/>
        </div>
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
