
<template>
<div>
    <div class="content" @submit.prevent="addData">
        Name: <input v-model="name" /> <br/>
        Province: <input v-model="province" /><br/>
        <button color="success" class="mr-4" @click="addData">Submit</button><br/>
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
            userList: []
        }
    },
    methods: {
        addData() {
            const data = {
                name: this.name,
                province: this.province,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
            db.collection("user").doc(this.name).set(data)
                .then(function() {
                    console.log("Document successfully written!")
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error)
                })
        }
    },
    mounted() {
        db.collection("user")
            .onSnapshot((querySnapshot) => {
                var data = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                })
                this.userList = data
            })
    }
}
</script>

<style>
</style>