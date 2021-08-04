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
                    <el-button
                            @click="onSubmit('form')"
                            type="success"
                            v-loading.fullscreen.lock="loadingButt"
                            index="/vendor">Save</el-button>
                </el-col>
                <el-col :lg="2">
                    <el-button @click="Cancel()" type="succes" index="/vendor">Cancel</el-button>
                </el-col>
                <div v-if="form.status==1">
                    <el-col :offset="18" :lg="2">
                        <el-button type="danger" @click="suspend">Suspend</el-button>
                    </el-col>
                </div>
                <!-- <div v-else>
                      <el-col :offset="15" :lg="3">
                     <el-button type="danger">Delete</el-button>
                     </el-col>
                       <el-col :lg="2">
                      <el-button type="success">Active</el-button>
                      </el-col>
                </div> -->
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
    import {
        mapGetters,
        mapActions
    } from "vuex";
    import * as getter from "../../../store/getters-types";
    import * as action from "../../../store/action-types";
    import * as mutation from "../../../store/mutation-types";
    import Swal from "sweetalert2";
    export default {
        name: "EditAdminVendor",
        data() {
            let validatePhone = (rule, value, callback) => {
                if((value+'').length > 13 ) {
                    callback(new Error('Phone must be less than 13 digits'))
                } else {
                    if((value+'').length < 10){
                        callback(new Error('Phone must be more than 10 digits'))
                    }else {
                        callback()
                    }
                }
            };
            return {
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
                    admin_phonenumber: [
                        {
                            required: true,
                            message: "Admin Mobile Number is required!",
                            trigger: "blur"
                        },
                        {
                            validator: validatePhone,
                            trigger:['change', 'blur']
                        }],
                    admin_email: [
                        {
                            required: true,
                            message: "Admin Email is required!",
                            trigger: "blur"
                        },
                        {
                            type: 'email',
                            message: 'Please input correct email address',
                            trigger: ['blur', 'change']
                        }]
                }
            };
        },
        created(){
            this.form.idvendor =  this.vendor.idvendor
        },
        computed: {
            ...mapGetters({
                vendor: getter.VENDOR,
                loadingButt: getter.GET_LOADING
            })
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.commit(mutation.SET_LOADING, true);
                        this.$store.dispatch(action.NEW_DATA_ADMIN, this.form);
                    } else {
                        return false;
                    }
                });
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
            }
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
