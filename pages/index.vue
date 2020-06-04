<template>
    <div>
        <div class="content" @submit.prevent="addData">
            Name: <input v-model="name" /> <br/>
            Province: <input v-model="province" /><br/>
            <button color="success" class="mr-4" @click="addData">Submit</button><br/>
            <form method="get" action="/edit">
                <button type="submit">edit</button>
            </form>
            {{ name }} <br/><hr/>
            <div
                v-for="(user, key) in userList"
                :key=key outlined tile
            >
                {{ user }}
            </div>
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
    methods: {
        addData() {
            liff.init({ liffId: "1654304970-y8m7gggm" }, () => {
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
        getData() {
            db.collection("user")
                .onSnapshot((querySnapshot) => {
                    var data = []
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data())
                    })
                    this.userList = data
                })
        },
    },
    created() {
        this.getData()
    }
}
</script>

<style>
</style>