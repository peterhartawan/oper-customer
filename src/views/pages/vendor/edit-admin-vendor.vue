<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col>Admin</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="8">
                    <el-form-item prop="admin_name">
                        <el-input placeholder="Admin Name" v-model="form.admin_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8">
                    <el-form-item prop="admin_phonenumber">
                        <el-input v-on:keypress.native="isNumber" placeholder="Admin Mobile Phone" v-model="form.admin_phonenumber">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8">
                    <el-form-item prop="admin_email">
                        <el-input placeholder="Admin Email" v-model="form.admin_email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div style="margin: 50px 0;"></div>
        <el-row>
            <el-col :lg="2">
                <el-button :loading="button" @click="onSubmit('form')" type="success" index="/vendor">Save</el-button>
            </el-col>
            <el-col :offset="1" :lg="2">
                <el-button @click="Cancel()" type="succes" index="/vendor">Cancel</el-button>
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
    </div>
</div>
</template>

<style lang="scss" scoped>
.el-row {
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>

<script>
import router from "../../../router";
import moment from "moment";
import Affix from "@/components/Affix";
import {
    mapGetters,
    mapActions
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from '../../../store/mutation-types';
import Swal from "sweetalert2";
export default {
    name: "EditAdminVendor",
    data() {
        return {
            payload: {
                idadmin: "",
                reason_suspend: null,
                idvendor: "",

            },
            form: {
                idvendor: "",
                idadmin: "",
                admin_name: "",
                admin_phonenumber: "",
                admin_email: "",
                status: "",
            },
            rules: {
                admin_name: [{
                    required: true,
                    message: "Admin Name is required!",
                    trigger: "blur"
                }],
                admin_phonenumber: [{
                    required: true,
                    message: "Admin Mobile Number is required!",
                    trigger: "blur"
                }],
                admin_email: [{
                    required: true,
                    message: "Admin Email is required!",
                    trigger: "blur"
                }]
            }
        };
    },
    created() {
        this.form.idvendor = this.vendor.idvendor;
        this.form.idadmin = this.adminVendor.id;
        this.form.admin_name = this.adminVendor.name;
        this.form.status = this.adminVendor.status;
        this.form.admin_phonenumber = this.adminVendor.phonenumber;
        this.form.admin_email = this.adminVendor.email;
        this.payload.idadmin = this.adminVendor.id;
        this.payload.idvendor = this.vendor.idvendor;
    },
    methods: {
        onSubmit() {
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.UPDATE_DATA_ADMIN, this.form);
        },
        Cancel() {
            this.$router.replace({
                path: "/detail-vendor/" + this.vendor.idvendor
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
                this.$store.dispatch(action.SUSPEND_ADMIN, this.payload)
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
                    this.$store.dispatch(action.ACTIVATE_ADMIN_VENDOR, this.payload);
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
                    this.$store.dispatch(action.DELETE_ADMIN_VENDOR, this.payload);
                }
            });
        }
    },
    computed: {
        ...mapGetters({
            button: getter.GET_BUTTON,
            vendor: getter.VENDOR,
            adminVendor: getter.GET_ADMIN_DATA_VEND
        })
    }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/_variables";

.card-base {
  padding: 20px;
}

.el-row {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  padding: 0px 10px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 5px;
}

.el-select {
  width: 100%;
}

.thumbnail {
  position: relative;
  width: 300px;
  height: 300px;
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

a {
  border-style: dotted;
  border-radius: 15px;
  padding: 10px;
  height: 150px;
}

td {
  padding: 10px;
}
</style>
