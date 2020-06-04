<template>
    <div>
        <div class="content" @submit.prevent="addData">
            Name: <input v-model="name" value="info.name"/> <br/>
            Province: <input v-model="province" value="info.province"/><br/>
            <button color="success" @click="updateData">Update</button><br/>
        </div>
        {{ info }}
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
                            this.info = doc.data()
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
.content {
    margin-top: 40px;
    display: flex;
    justify-content: center;
}
</style>
