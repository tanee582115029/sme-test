<template>
    <div>
        <div class="content" @submit.prevent="addData">
            Name: <input v-model="name" value="name"/> <br/>
            Province: <input v-model="province" value="province"/><br/>
            <button color="success" @click="updateData">Update</button><br/>
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
            userId: '',
            info: {},
            isUpdate: false,
        }
    },
    head() {
        return {
            title: 'EDIT',
        }
    },
    methods: {
        updateData() {
            liff.init({ liffId: "1654304970-L4lnxxxl" }, () => {
                if (liff.isLoggedIn()) {
                    liff.getProfile().then(profile => {
                        const data = {
                            name: this.name,
                            userId: profile.userId,
                            province: this.province,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        }
                        db.collection("user").doc(profile.userId).set(data)
                            .then(function() {
                                console.log("Document successfully written!")
                                this.isUpdate = true
                            })
                            .catch(function(error) {
                                console.error("Error writing document: ", error)
                                this.isUpdate = false
                            })
                    }).catch(err => console.log(err))
                } else {
                    liff.login()
                }
            }, err => console.error(err.code, error.message))
        },
    },
    mounted() {
        liff.init({ liffId: "1654304970-L4lnxxxl" }, () => {
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    db.collection("user").doc(profile.userId)
                        .onSnapshot(function(doc) {
                            this.name = doc.data().name
                            this.province = doc.data().province
                        })
                }).catch(err => console.log(err))
            }
            else {
                liff.login()
            }
        }, err => console.error(err.code, error.message))
    }
}
</script>

<style>
</style>
