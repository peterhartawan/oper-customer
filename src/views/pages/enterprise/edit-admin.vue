<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form :model="form" :rules="rules" ref="form">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="name">
                            <el-input placeholder="Admin Name" v-model="form.name"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="phone">
                            <el-input v-on:keypress.native="isNumber" placeholder="Admin Phone Number" v-model="form.phone"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="email">
                            <el-input placeholder="Admin Email" v-model="form.email"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :lg="2">
                    <el-button :loading="button" @click="onSubmit('form')" type="success">Save</el-button>
                </el-col>
                <el-col :offset="1" :lg="2">
                    <el-button @click="Cancel()" type="succes">Cancel</el-button>
                </el-col>
                <div v-if="form.status===1">
                    <el-col :offset="16" :lg="2">
                        <el-button :loading="button" type="danger" @click="suspend">Suspend</el-button>
                    </el-col>
                </div>
                <div v-else-if="form.status===3">
                    <el-col :offset="13" :lg="3">
                        <el-button :loading="button" @click="deleteB" type="danger">Delete</el-button>
                    </el-col>
                    <el-col :lg="3">
                        <el-button :loading="button" @click="activeButton" type="primary">Active</el-button>
                    </el-col>
                </div>
            </el-row>
        </el-form>
    </div>
</div>
</template>

<script>
import router from '../../../router'
import * as action from '../../../store/action-types'
import * as getter from '../../../store/getters-types'
import * as mutation from '../../../store/mutation-types'
import {
    mapGetters
} from 'vuex'
import Swal from "sweetalert2";
export default {
    name: 'new-pic',
    data() {
        return {
            form: {
                fullscreen_loading: false,
                name: '',
                phone: '',
                email: '',
                idAdmin: '',
                status: '',
            },
            payload: {
                idadmin: "",
                reason_suspend: null,
                identerprise: "",

            },
            rules: {
                name: [{
                    required: true,
                    message: 'Please input Activity name',
                    trigger: ['blur', 'change']
                }],
                phone: [{
                    required: true,
                    message: 'Please input Admin Phone Number',
                    trigger: ['blur', 'change']
                }],
                email: [{
                        required: true,
                        message: 'Please input Admin Email',
                        trigger: ['blur', 'change']
                    },
                    {
                        type: 'email',
                        message: 'Please input valid Email',
                        trigger: ['blur', 'change']
                    }
                ]
            }
        };
    },
    created() {
        this.form.idAdmin = this.adminEnterprise.id;
        this.form.name = this.adminEnterprise.name;
        this.form.phone = this.adminEnterprise.phonenumber;
        this.form.email = this.adminEnterprise.email;
        this.form.status = this.adminEnterprise.status;
        this.payload.idadmin = this.adminEnterprise.id;
        this.payload.identerprise = this.identer;
    },
    methods: {
        onSubmit(formName) {
            let newForm = {
                name: this.form.name,
                phone: this.form.phone,
                email: this.form.email,
                idAdmin: this.form.idAdmin,
                identer: this.identer
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.UPDATE_ADMIN_CLIENT, newForm)
                } else {
                    return false;
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
                this.$store.commit(mutation.BUTTON_STATUS, true)
                this.payload.reason_suspend = reason;
                this.$store.dispatch(action.SUSPEND_ADMIN_ENTERPRISE, this.payload)
            }
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
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.ACTIVATE_ADMIN_ENTERPRISE, this.payload);
                }
            });
        },
        deleteB() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.$store.commit(mutation.BUTTON_STATUS, true);
                    this.$store.dispatch(action.DELETE_ADMIN_ENTERPRISE, this.payload);
                }
            });
        },
        isNumber(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57)
            ) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        Cancel() {
            router.replace(`/detail-enterprise/${this.identer}`)
        }
    },
    computed: {
        ...mapGetters({
            identer: getter.GET_ID_ENTERPRISE,
            button: getter.GET_BUTTON,
            adminEnterprise: getter.GET_ADMIN_DATA_ENTERPRISE
        }),
        buttonStatus: function () {
            return this.form.fullscreen_loading = this.button
        }
    },
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
</style>
