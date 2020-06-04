<template>
    <div>
        <div v-if="userList.length < 0">
            <div class="content" @submit.prevent="addData">
                Name: <input v-model="name" /> <br/>
                Province: <input v-model="province" /><br/>
                <button color="success" class="mr-4" @click="addData">Submit</button><br/>
                <form method="get" action="/edit">
                    <button type="submit">edit</button>
                </form>
            </div>
        </div>
        <div v-else>
            <div class="content"
                v-for="(user, key) in userList"
                :key=key outlined tile
            >
                {{'Name:'+ user.name }} <br/><br/>
                {{'Province:'+ user.province }} <br/><br/>
                {{'UserId:'+ user.userId }}<br/><br/>
                {{'TimeStamp:'+ user.timestamp }}
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
            userId: '',
            isCreate: false
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
                                isCreate = true
                            })
                            .catch(function(error) {
                                console.error("Error writing document: ", error)
                                isCreate = false
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
.content {
    margin-top: 40px;
    display: flex;
    justify-content: center;
}
</style>