<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="20">
            <el-col :lg="8" :xl="3">
                <div class="thumbnail">
                    <img class="potrait" :src="profilepicture" @error="imgAlt">
                    </div>
            </el-col>
            <el-col :lg="16" :xl="21">
                <div class="flex center demo-box">
                    <div class="right-box box grow">
                        <dl>
                            <dt>Dispatcher Name</dt>
                            <dd> {{ dispatcher.name }}</dd>
                            <dt>Dispatcher Email</dt>
                            <dd>{{ dispatcher.email }}</dd>
                            <dt>Dispatcher Gender</dt>
                            <dd>{{ (dispatcher.gender = 1) ? 'Male' : 'Female' }}</dd>
                            <dt>Dispatcher Birth Date</dt>
                            <dd>{{ (dispatcher.dispatcher_profile.birthdate || dispatcher.birthdate ) }}</dd>
                        </dl>
                    </div>
                    <div class="left-box box grow">
                        <dl>
                            <dt>Dispatcher NIK</dt>
                            <dd>{{ dispatcher.dispatcher_profile.nik }}</dd>
                            <dt>Dispatcher Phone Number</dt>
                            <dd>{{ dispatcher.phonenumber }}</dd>
                            <dt>Dispatcher Type</dt>
                            <dd>{{ (dispatcher.role.idrole === 4) ? 'REGULER' : 'PLUS' }}</dd>
                            <dt>Dispatcher Address</dt>
                            <dd>{{ dispatcher.dispatcher_profile.address }}</dd>
                        </dl>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
                <div class="grid-content">
                    <el-button @click="backButton"> Back</el-button>
                    <el-button @click="editButton" style="margin-left: 70px" type="primary"> Edit </el-button>
                </div>
            </el-col>
            <div v-if="dispatcher.status==1">
                <el-col :offset="11" :lg="3">
                    <el-button :loading="button" type="danger" @click="suspendButton">Suspend</el-button>
                </el-col>
            </div>
            <div v-else-if="dispatcher.status==2">
                <el-col :offset="10" :lg="3">
                   <el-button type="success" :loading="button" @click="resendActivation">Resend Activation</el-button>
                </el-col>
            </div>
            <div v-else-if="dispatcher.status==3">
                <el-col :offset="8" :lg="3">
                    <el-button :loading="button" @click="deleteB" type="danger"> Delete </el-button>
                </el-col>
                <el-col :lg="3">
                    <el-button :loading="button" @click="activeButton" type="primary">Active</el-button>
                </el-col>
            </div>
        </el-row>
    </div>
</div>
</template>

<script>
import router from '../../../router'
import {
    mapGetters
} from 'vuex'
import * as getter from '../../../store/getters-types'
import * as action from '../../../store/action-types'
import * as mutation from '../../../store/mutation-types'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            payload: {
                reason_suspend: "",
                users_id: null,
                iddispatcher: "",
            },
            alt: require("@/assets/images/avatar-2.jpg")
        };
    },
    computed: {
        ...mapGetters({
            dispatcher: getter.DISPATCHER,
            button: getter.GET_BUTTON,
        }),
        profilepicture() {
            if (this.dispatcher.profile_picture == null) {
                return this.alt
            } else {
                return this.dispatcher.profile_picture
            }
        }
    },
    created() {
        this.payload.iddispatcher = this.dispatcher.dispatcher_profile.iddispatcher
    },
    methods: {
        inspector() {
            router.replace('/pic-task-list')
            this.$store.commit(mutation.SET_ID_ENTERPRISE, this.enterprise.identerprise)
        },
        templateTask() {
            router.replace('/template-list')
            this.$store.commit(mutation.SET_ID_ENTERPRISE, this.enterprise.identerprise)
        },
        editAdmin() {
            router.replace('/edit-admin')
            this.$store.commit(mutation.SET_ID_ENTERPRISE, this.enterprise.identerprise)
        },
        resendActivation(){
            let obj ={
                page : '/dispatcher',
                iddispatcher   : this.payload.iddispatcher
            }
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.RESEND_LINK_ACTIVATION, obj)
        },
        deleteB() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.DELETE_DISPATCHER, this.dispatcher.id)
                }
            })
        },
        activeButton() {
            Swal.fire({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, activate it!"
            }).then(result => {
                if (result.value) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.ACTIVATE_DISPATCHER, this.dispatcher.id);
                }
            });
        },
        async suspendButton() {
            const {
                value: reason
            } = await Swal.fire({
                title: 'Enter the reason of suspending',
                input: 'text',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, suspend it!',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
            })
            if (reason) {
                this.payload.reason_suspend = reason;
                this.payload.users_id = this.dispatcher.id;
                this.$store.commit(mutation.BUTTON_STATUS, true)
                this.$store.dispatch(action.SUSPEND_DISPATCHER, this.payload)
            }
        },
        async editButton() {
            console.log('mantap :', this.dispatcher)
            await this.$store.commit(mutation.SET_ID_DISPATCHER, this.dispatcher.id)
            router.push({
                path: `/edit-dispatcher`
            })
        },
        backButton() {
            router.replace('/dispatcher')
        },
        imgAlt(event) {
            event.target.src = require("@/assets/images/avatar-2.jpg");
        }
    }
}
</script>

<style lang="scss" scoped>
.card-base {
    padding: 20px;
}

.el-row {
    padding: 0px 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

.thumbnail {
    position: relative;
    width: 220px;
    height: 250px;
    overflow: hidden;
}

.thumbnail img {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.thumbnail img.portrait {
    width: 100%;
    height: auto;
}
</style>
