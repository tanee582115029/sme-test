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
            name: 'name emp',
            province: 'pro emp',
            userList: [],
            userId: 'userId emp'
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
                            })
                            .catch(function(error) {
                                console.error("Error writing document: ", error)
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
                            this.name = doc.data()
                            // console.log(doc.data())
                            // this.province = doc.data().province
                            // this.userId = doc.data().userId
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
