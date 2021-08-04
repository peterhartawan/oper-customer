<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item prop="name">
                        <el-input placeholder="Employee Name" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="nik">
                        <el-input placeholder="Employee NIK" v-model="form.nik"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item prop="email">
                        <el-input placeholder="Employee Email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="phonenumber">
                        <el-input v-on:keypress.native="isNumber" placeholder="Employee Phone Number" v-model="form.phonenumber"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item prop="gender">
                        <el-col :span="12">
                            <el-radio v-model="form.gender" label="1">Male</el-radio>
                        </el-col>
                        <el-col :span="12">
                            <el-radio v-model="form.gender" label="2">Female</el-radio>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="birthdate">
                        <el-date-picker onkeydown="return false" value-format="yyyy-MM-dd" style="width: 100%;" v-model="form.birthdate" type="date" placeholder="Employee Birthdate"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-select v-model="form.position" filterable placeholder="Select">
                        <el-option v-for="item in position" :key="item.idemployee_position" :label="item.job_name" :value="item.idemployee_position"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="9">
                    <el-form-item prop="attendance_latitude">
                        <el-input v-on:keypress.native="isGeo" placeholder="Employee Checkin Latitude" v-model="form.attendance_latitude"></el-input>
                        <small>
                            <i>This field will be used for location lock while checkin</i>
                        </small>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item prop="attendance_longitude">
                        <el-input v-on:keypress.native="isGeo" placeholder="Employee Checkin Longitude" v-model="form.attendance_longitude"></el-input>
                        <small>
                            <i>This field will be used for location lock while checkin</i>
                        </small>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item prop="address">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" placeholder="Employee Address" v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-form-item prop="photoname">
                        <div class="grid-content">
                            <el-input disabled placeholder="Profile Picture" v-model="form.photoname" disable></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content">
                        <el-form-item prop="photo">
                            <el-button @click="onPickFile">Browse</el-button>
                            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="handleFileChange">
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="9">
                    <el-form-item prop="photoname2">
                        <div class="grid-content">
                            <el-input disabled placeholder="Additional Image" v-model="form.photoname2" disable></el-input>
                        </div>
                        <small style="float: right;">
                            <i>This photo field is optional</i>
                        </small>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content">
                        <el-form-item prop="photo2">
                            <el-button @click="onPickFile2">Browse</el-button>
                            <input type="file" style="display: none" ref="fileInput2" accept="image/*" @change="handleFileChange2">
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :offset="20" :span="2">
                <el-button :loading="button" @click="onSubmit('form')" type="success" index="/employee">Save</el-button>
            </el-col>
            <el-col :span="2">
                <el-button @click="Cancel()" type="succes">Cancel</el-button>
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
    name: "EditEmployee",
    data() {
        return {
            form: {
                name: "",
                email: "",
                phonenumber: "",
                birthdate: "",
                address: "",
                nik: "",
                gender: null,
                photo: null,
                photo2: null,
                position: null,
                photoname: '',
                photoname2: '',
                idemployee: null,
                users_id: null,
                attendance_longitude: "",
                attendance_latitude: ""

            },
            loading: 'null',
            rules: {
                name: [{
                    required: true,
                    message: "Employee Name is required!",
                    trigger: "blur"
                }],
                email: [{
                    required: true,
                    message: "Employee Email is required!",
                    trigger: "blur"
                }],
                nik: [{
                    required: true,
                    message: "Employee NIK is required!",
                    trigger: "blur"
                }],
                phonenumber: [{
                    required: true,
                    message: "Employee Phone Number is required!",
                    trigger: "blur"
                }],
                address: [{
                    required: true,
                    message: "Employee Address is required!",
                    trigger: "blur"
                }],
                gender: [{
                    required: true,
                    message: "Employee Gender is required!",
                    trigger: "blur"
                }],
                birthdate: [{
                    required: true,
                    message: "Employee Birthdate is required!",
                    trigger: "blur"
                }],
            }
        };
    },
    methods: {
        onSubmit(formName) {
            let obj = {
                name: this.form.name,
                email: this.form.email,
                phonenumber: this.form.phonenumber,
                birthdate: this.form.birthdate,
                nik: this.form.nik,
                address: this.form.address,
                gender: this.form.gender,
                position: this.form.position,
                photo: this.form.photo,
                photo2: this.form.photo2,
                idemployee: this.form.idemployee,
                users_id: this.form.users_id,
                attendance_longitude: this.form.attendance_longitude,
                attendance_latitude: this.form.attendance_latitude
            };
            this.$refs[formName].validate((valid) => {
                this.loading = true
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.UPDATE_EMPLOYEE, obj)
                } else {
                    return false;
                }
            });
        },
        Cancel() {
            this.$router.replace('/employee')

        },
        onPickFile() {
            this.$refs.fileInput.click();
        },
        onPickFile2() {
            this.$refs.fileInput2.click();
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
        handleFileChange(event) {
            this.form.photo = event.target.files[0]
            this.form.photoname = event.target.files[0].name
        },
        handleFileChange2(event) {
            this.form.photo2 = event.target.files[0]
            this.form.photoname2 = event.target.files[0].name
        },
        isGeo(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode >= 44 && charCode <= 46) {
                return true
            } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
    },
    computed: {
        ...mapGetters({
            button: getter.GET_BUTTON,
            error: getter.GET_ERROR,
            position: getter.GET_DROPDOWN_POSITION,
            employee: getter.GET_DETAIL_EMPLOYEE
        }),
    },
    mounted() {
        this.$store.dispatch(action.DROPDOWN_POSITION)
    },
    created() {
        this.form.name = this.employee.name;
        this.form.nik = this.employee.nik;
        this.form.email = this.employee.email;
        this.form.phonenumber = this.employee.phonenumber;
        this.form.birthdate = this.employee.birthdate;
        this.form.address = this.employee.address;
        this.form.idemployee = this.employee.idemployee;
        this.form.gender = this.employee.gender.toString();
        this.form.users_id = this.employee.users_id;
        this.form.position = this.employee.employee_position.idemployee_position;
        this.form.attendance_latitude = this.employee.attendance_latitude;
        this.form.attendance_longitude = this.employee.attendance_longitude;

    },
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
    margin-bottom: 10px;

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
</style>
