<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-form-item prop="name">
                        <el-input placeholder="Vendor Name" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12">
                    <el-form-item prop="office_phone_number">
                        <el-input v-on:keypress.native="isNumber" placeholder="Vendor Office Phone Number" v-model="form.office_phone_number"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-form-item prop="email">
                        <el-input placeholder="Vendor Email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24">
                    <el-form-item prop="office_address">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" placeholder="Vendor Address" v-model="form.office_address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div style="margin: 40px 0;"></div>
            <el-row :gutter="20">
                <el-col>PIC
                    <hr color="#dcdfe6">
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="8">
                    <el-form-item prop="pic_name">
                        <el-input placeholder="Pic Name" v-model="form.pic_name">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8">
                    <el-form-item prop="pic_mobile_number">
                        <el-input v-on:keypress.native="isNumber" placeholder="Pic Mobile Phone" v-model="form.pic_mobile_number">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8">
                    <el-form-item prop="pic_email">
                        <el-input placeholder="Pic Email" v-model="form.pic_email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col>Admin
                    <hr color="#dcdfe6">
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="8">
                    <el-form-item prop="admin_name">
                        <el-input placeholder="Admin Name" v-model="form.admin_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8">
                    <el-form-item prop="admin_mobile_number">
                        <el-input v-on:keypress.native="isNumber" placeholder="Admin Mobile Phone" v-model="form.admin_mobile_number">
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
            <el-col :lg="2">
                <el-button @click="Cancel()" type="succes" index="/vendor">Cancel</el-button>
            </el-col>
        </el-row>
    </div>
</div>
</template>

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
export default {
    name: "NewVendor",
    data() {
        return {
            form: {
                name: "",
                email: "",
                office_phone_number: "",
                office_address: "",
                pic_name: "",
                pic_mobile_number: "",
                pic_email: "",
                admin_name: "",
                admin_mobile_number: "",
                admin_email: ""
            },
            rules: {
                name: [{
                    required: true,
                    message: "Vendor Name is required!",
                    trigger: "blur"
                }],
                email: [{
                    required: true,
                    message: "Vendor Email is required!",
                    trigger: "blur"
                }],
                office_phone_number: [{
                    required: true,
                    message: "Vendor Office Phone Number is required!",
                    trigger: "blur"
                }],
                office_address: [{
                    required: true,
                    message: "Vendor Office Address is required!",
                    trigger: "blur"
                }],
                pic_name: [{
                    required: true,
                    message: "PIC Name is required!",
                    trigger: "blur"
                }],
                pic_mobile_number: [{
                    required: true,
                    message: "PIC Mobile Number is required!",
                    trigger: "blur"
                }],
                pic_email: [{
                    required: true,
                    message: "PIC Email is required!",
                    trigger: "blur"
                }],
                admin_name: [{
                    required: true,
                    message: "Admin Name is required!",
                    trigger: "blur"
                }],
                admin_mobile_number: [{
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
    methods: {
        onSubmit() {
            this.$store.commit(mutation.BUTTON_STATUS, true)
            this.$store.dispatch(action.CREATE_DATA_VENDOR, this.form);
        },
        Cancel() {
            this.$router.push({
                name: "IndexVendor"
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
    },
    computed: {
        ...mapGetters({
            button: getter.GET_BUTTON,
            error: getter.GET_ERROR
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
