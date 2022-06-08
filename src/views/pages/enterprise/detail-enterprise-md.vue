<template>
<!--<vue-scroll class="page-typography">-->
<div class="page-table scrollable only-y" id="affix-container">
    <p class="font-weight-600 mt-40">INFO</p>
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="20">
            <el-button @click="backLCorp">Back</el-button>
            <center>
                <div class="greyh3">
                    <el-col :span="7">
                        <h3>COMPANY</h3>
                        <el-col>
                            <div v-if='enterprise.image_logo == "" || enterprise.image_logo == null'>
                                <img src="../../../../src/assets/images/Oper_Logo_Landscape_Red.png" class="image middle">
                            </div>
                            <div v-else>
                                <img :src="enterprise.image_logo" class="image">
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="1">
                        <br>
                        <el-col>
                            <div class="vl"></div>
                        </el-col>
                    </el-col>
                    <!-- <div v-if="enterprise.enterprise_type.identerprise_type == 2">
                        <el-col :span="8">
                            <h3>DISPATCHER</h3>
                            <div v-if="enterprise.dispatcher">
                                <el-col :span="8">
                                    <PopupDispatcher :identerprise="enterprise.identerprise" :picture="enterprise.dispatcher.profile_picture">
                                    </PopupDispatcher>
                                </el-col>
                            </div>
                            <div v-else>
                                <el-col style="width: 100%" :span="8">
                                    <PopupDispatcher :identerprise="enterprise.identerprise" :picture="99">
                                    </PopupDispatcher>
                                </el-col>
                            </div>
                            <el-col :span="15">
                                <div class="left">
                                    <br>
                                    <div v-if="enterprise.dispatcher">
                                        <b>{{enterprise.dispatcher.name}}</b>
                                        <br>
                                        <span style="font-size: 14px; word-wrap: break-word;">
                                            {{enterprise.vendor.name}}
                                        </span>
                                    </div>
                                </div>
                            </el-col>
                        </el-col>
                        <el-col :span="16">
                            <h3>ADMIN</h3>
                            <el-col :span="10">
                                <div v-if='enterprise.admins[0].profile_picture == "" || enterprise.admins[0].profile_picture == null'>
                                    <PopupAdmin>
                                    </PopupAdmin>
                                </div>
                                <div v-else>
                                    <PopupAdmin>
                                    </PopupAdmin>
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <div class="right" style="margin-top: 30px">
                                    <b>{{enterprise.admins[0].name}}</b>
                                    <br>
                                    <span style="font-size: 14px">
                                        {{enterprise.admins[0].phonenumber}}
                                        <br>
                                        <span style="font-size: 12px; word-wrap: break-word;">
                                            {{enterprise.admins[0].email}}
                                        </span>
                                        <br>
                                        {{enterprise.vendor.name}}
                                    </span>
                                </div>
                            </el-col>
                        </el-col>
                    </div> -->
                    <!-- <div v-else> -->
                        <el-col :span="16">
                            <h3>ADMIN</h3>
                            <el-col :span="8">
                                <PopupAdmin>
                                </PopupAdmin>
                            </el-col>
                            <el-col :span="16">
                                <div class="right" style="margin-top: 30px">
                                    <b>{{enterprise.admins[0].name}}</b>
                                    <br>
                                    <span style="font-size: 14px">
                                        {{enterprise.admins[0].phonenumber}}
                                        <br>
                                        <span style="font-size: 12px; word-wrap: break-word;">
                                               {{enterprise.admins[0].email}}
                                        </span>
                                        <br>
                                        {{enterprise.vendor.name}}
                                    </span>
                                </div>
                            </el-col>
                        </el-col>
                    <!-- </div> -->
                </div>
            </center>
        </el-row>
        <el-row style="margin-top: 20px" :gutter="20">
            <el-col :span="8">
                <b>NAME</b>
                <br>
                {{enterprise.name}}
                <br>
                <br>
                <b>PHONE</b>
                <br>
                {{enterprise.office_phone}}
                <br>
                <br>
                <b>EMAIL</b>
                <br>
                <span style="word-wrap: break-word;">
                    {{enterprise.email}}
                </span>
                <br>
                <br>
                <b>ADDRESS</b>
                <br>
                <span style="word-wrap: break-word;">
                    {{enterprise.office_address}}
                </span>
            </el-col>
            <el-col :span="8">
                <b>VENDOR</b>
                <br>
                {{enterprise.vendor.name}}
                <br>
                <br>
                <b>TYPE</b>
                <br>
                <span style="text-transform: capitalize;">
                    {{enterprise.enterprise_type.name}}
                </span>
                <br>
                <br>
                <b>DESCRIPTION</b>
                <br>
                <span style="word-wrap: break-word;">
                    {{enterprise.description}}
                </span>
            </el-col>
            <el-col :span="8">
                <br><br><br><br><br>
                <div v-if="buttonStatus">
                    <el-row>
                        <el-button @click="inspector" style="width: 100%; border-color: #f4f4f5;" type="info" plain>
                            <span style=" text-align: justify;">
                                <h2>&nbsp; Inspector</h2>
                            </span>
                        </el-button>
                    </el-row>
                    <el-row style="margin-top: 10px;">
                        <el-button @click="templateTask" style="width: 100%; border-color: #f4f4f5;" type="info" plain>
                            <span style=" text-align: justify;">
                                <h2>&nbsp; Template Task</h2>
                            </span>
                        </el-button>
                    </el-row>
                </div>
                <div v-else>
                    <el-row>
                        <PopupDispatcher :identerprise="enterprise.identerprise">
                        </PopupDispatcher>
                    </el-row>
                    <el-row>
                        <el-button @click="enterpriseDriver" style="width: 100%; border-color: #f4f4f5; margin-top: 10px;" type="info" plain>
                            <span style=" text-align: justify;">
                                <h2><img src="../../../assets/oper_asset/driver_grey.png" class="drive-acount">&nbsp; Driver List</h2>
                            </span>
                        </el-button>
                    </el-row>
                    <el-row style="margin-top: 10px;">
                        <el-button @click="location" style="width: 100%; border-color: #f4f4f5;" type="info" plain>
                            <span style=" text-align: justify;">
                                <h2><i class="mdi mdi-map-marker mdi-36px"></i>&nbsp; List Location</h2>
                            </span>
                        </el-button>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="24" style="margin-top: 20px">
                <div v-if="buttonStatus">
                    <el-col :lg="offsetV">
                        <el-button type="primary" @click="editCorp(enterprise.identerprise)">Edit</el-button>
                    </el-col>
                    <!-- <el-col :offset="1" :span="6">
                    <el-button type="danger" @click="deleteB" v-if="buttonStatus">Delete</el-button>
                </el-col> -->
                    <div v-if="enterpriseStatus">
                        <el-col :offset="2" :lg="2">
                            <el-button type="success" @click="resendActivation">Resend Activation</el-button>
                        </el-col>
                    </div>
                    <div v-if="enterprise.status==1">
                        <el-col :offset="offsetY" :lg="4">
                            <el-button style="width: 100%" type="danger" @click="suspend">Suspend</el-button>
                        </el-col>
                    </div>
                    <div v-else-if="enterprise.status==3 || enterprise.status===2">
                        <el-col :offset="offsetActive" :lg="3">
                            <el-button style="width: 100%" @click="activeButton" type="success">Activate</el-button>
                        </el-col>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</div>
<!--</vue-scroll>-->
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
import PopupDispatcher from '../../../components/enterprise/popup_multi_dispatcher'
import PopupAdmin from '../../../components/enterprise/popup_admin'
import enterprise from '../../../router/enterprise';

export default {
    components: {
        PopupDispatcher,
        PopupAdmin
    },
    data() {
        return {
            nameOfCorp: null,
            corporateOfPhone: null,
            corporateVendor: null,
            corporateAdress: null,
            corporateEmail: null,
            corporateType: null,
            corporateOAddress: null,
            dispatcherMount: null,
            buttonStatus: null,
            dialogTableVisible: false,
            currentPage: 1,
            payload: {
                identerprise: null,
                page: 1,
                reason_suspend: null,
            },
            enterpriseStatus: null,
            offsetV: null,
            offsetY: null,
            offsetActive: null,

        }
    },
    computed: {
        ...mapGetters({
            enterprise: getter.ENTERPRISE,
            adminEnterprise: getter.ADMIN_ENTERPRISE,
            button: getter.GET_BUTTON,
            profile: getter.GET_DATA_PROFILE
        }),
        showAdmin() {
            if (this.profile.idrole === 1) {
                return true
            } else {
                return false
            }
        },
    },
    async created() {
        let userProfile = JSON.parse(localStorage.getItem('user')).idrole;
        this.buttonStatus = userProfile === 1;
        this.payload.identerprise = this.enterprise.identerprise;
        // let obj = {
        //     role: 4,
        //     page: 1
        // };
        if (!this.buttonStatus) {
            let form = {
                assignEnterprise: this.enterprise.identerprise
            }
            await this.$store.commit(mutation.SET_SELECTED_DISPATCHERS, null)
            await this.$store.dispatch(action.MULTI_DISPATCHER_AVAILABLE, form);
        }
        (this.enterprise.enterprise_type.identerprise_type === 2) ? this.dispatcherMount = true: this.dispatcherMount = false;

        for (let i = 0; i < this.enterprise.admins.length; i++) {
            if (this.enterprise.admins[i].status === 2 || this.enterprise.status === 2) {
                this.enterpriseStatus = true;
                this.offsetV = 9
                this.offsetY = 7
                this.offsetActive = 8
            } else {
                this.enterpriseStatus = false;
                this.offsetV = 9
                this.offsetY = 11
                this.offsetActive = 12
            }
        }
    },
    methods: {
        async inspector() {
            this.$store.commit(mutation.SET_LOADING, true);
            await this.$store.commit(mutation.SET_ID_ENTERPRISE, this.enterprise.identerprise)
            router.push('/pic-task-list')
        },
        templateTask() {
            router.push('/template-list')
            this.$store.commit(mutation.SET_ID_ENTERPRISE, this.enterprise.identerprise)
        },
        addButton() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            router.push(`/new-admin-enterprise/${this.enterprise.identerprise}`)
        },
        editAdmin(e) {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$store.commit(mutation.SET_DATA_ADMIN_ENTERPRISE, e);
            this.$store.commit(mutation.SET_ID_ENTERPRISE, this.enterprise.identerprise)
            router.push('/edit-admin')
        },
        resendActivation() {
            let obj = {
                page: '/enterprise',
                id: this.payload.identerprise
            }
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.RESEND_LINK_ACTIVATION, obj)
        },
        async created() {
            let userProfile = JSON.parse(localStorage.getItem('user')).idrole;
            this.buttonStatus = userProfile === 1;
            this.payload.identerprise = this.enterprise.identerprise;
            let obj = {
                role: 4,
                page: 1
            };
            if (!this.buttonStatus) {
                await this.$store.dispatch(action.LIST_DISPATCHER_ROLE, obj);
            }
            (this.enterprise.enterprise_type.identerprise_type === 2) ? this.dispatcherMount = true: this.dispatcherMount = false;
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
                    this.$store.dispatch(action.DELETE_CORP_ID, this.enterprise.identerprise)
                }
            })
        },
        activeButton() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, activate it!"
            }).then(result => {
                if (result.value) {
                    this.$store.dispatch(action.ACTIVATE_ENTERPRISE, this.payload);
                }
            });
        },
        async suspend() {
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
                this.$store.dispatch(action.SUSPEND_ENTERPRISE, this.payload)
            }
        },
        editCorp(item) {
            router.push({
                path: `/edit-enterprise/${item}`
            })
        },
        enterpriseDriver() {

            router.push({
                path: `/list-driver-enterprise/` + this.enterprise.identerprise
            })
        },
        backLCorp() {
            router.push('/enterprise')

        },
        async location() {
            this.$store.dispatch(action.LIST_LOCATION, this.payload);
            this.$router.push({
                path: "/location-enterprise/" + this.enterprise.identerprise
            });
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

.greyh3 h3 {
    color: #A9A9A9;
}

.image {
    max-width: 100%;
    height: 150px;
    display: block;
}

.vl {
    border-left: 3px solid #f2f2f2;
    height: 90%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.avatar {
    border-radius: 50%;
    max-width: 80px;
    height: 80px;
    border: 1px solid #fff;
    box-sizing: border-box;
    display: block;
    box-shadow: 0 2px 5px 0 rgba(49, 49, 93, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.5s;
}

.left {
    text-align: left;
    position: absolute;
    top: 50%;
    max-width: 150px;
    transform: translateY(-50%);
}

.right {
    text-align: left;
    position: absolute;
    top: 50%;
    max-width: 250px;
    transform: translateY(-50%);
}

.middle {
    margin-top: -30px
}

.drive-acount {
    height: 39px;
    margin-top: -11px;
    margin-bottom: -10px;
}

.hoverhand:hover {
    cursor: pointer;
}
</style>
