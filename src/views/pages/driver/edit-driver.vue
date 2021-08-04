<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-form-item prop="name">
                        <el-input placeholder="Driver Name" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12">
                    <el-form-item prop="nik">
                        <el-input placeholder="Driver NIK" v-model="form.nik"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-form-item prop="email">
                        <el-input placeholder="Driver Email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12">
                    <el-form-item prop="phonenumber">
                        <el-input placeholder="Driver Phone Number" v-model="form.phonenumber"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :lg="12">
                    <el-form-item prop="gender">

                        <el-radio v-model="form.gender" label="1">Male</el-radio>
                        <el-radio v-model="form.gender" label="2">Female</el-radio>

                    </el-form-item>
                </el-col>
                <el-col :lg="12">
                    <el-form-item prop="birthdate">
                        <el-date-picker value-format="yyyy-MM-dd" style="width: 100%;" v-model="form.birthdate" type="date" placeholder="Driver Birthdate"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-form-item prop="attendance_latitude">
                        <el-input v-on:keypress.native="isGeo" placeholder="Driver Checkin Latitude" v-model="form.attendance_latitude"></el-input>
                        <small><i>This field will be used for location lock while checkin</i></small>
                    </el-form-item>
                </el-col>
                <el-col :lg="12">
                    <el-form-item prop="attendance_longitude">
                        <el-input v-on:keypress.native="isGeo" placeholder="Driver Checkin Longitude" v-model="form.attendance_longitude"></el-input>
                        <small><i>This field will be used for location lock while checkin</i></small>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24">
                    <el-form-item prop="address">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" placeholder="Driver Address" v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-form-item prop="photoname">
                        <div class="grid-content">
                            <el-input disabled placeholder="Browse Foto" v-model="form.photoname" disable></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-row :gutter="10">
                    <el-col :lg="9">
                        <el-select v-model="form.typedriver" filterable placeholder="Select">
                            <el-option v-for="item in select.select" :key="item.iddrivertype" :label="item.name" :value="item.iddrivertype"></el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <el-col :span="3">
                    <div class="grid-content">
                        <el-form-item prop="photo">
                            <el-button @click="onPickFile">Browse</el-button>
                            <input
                                        type="file"
                                        style="display: none"
                                        ref="fileInput"
                                        accept="image/*"
                                        @change="handleFileChange">
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :offset="20" :lg="2">
                <el-button :loading="button" @click="onSubmit('form')" type="success">Save</el-button>
            </el-col>
            <el-col :lg="2">
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
    name: "EditDriver",
    data() {
        return {
            form: {
                name: "",
                email: "",
                phonenumber: "",
                birthdate: "",
                address: "",
                gender: "",
                nik: "",
                photo: null,
                photoname: "",
                iddriver: "",
                address: "",
                typedriver: null,
                pkwt: 1,
                attendance_latitude: "",
                attendance_longitude: ""
            },
            rules: {
                name: [{
                    required: true,
                    message: "Driver Name is required!",
                    trigger: "blur"
                }],
                email: [{
                    required: true,
                    message: "Driver Email is required!",
                    trigger: "blur"
                }],
                nik: [{
                    required: true,
                    message: "Driver NIK is required!",
                    trigger: "blur"
                }],
                phonenumber: [{
                    required: true,
                    message: "Driver Phone Number is required!",
                    trigger: "blur"
                }],
                address: [{
                    required: true,
                    message: "Driver Address is required!",
                    trigger: "blur"
                }],
                gender: [{
                    required: true,
                    message: "Driver Gender is required!",
                    trigger: "blur"
                }],
                birthdate: [{
                    required: true,
                    message: "Driver Birthdate is required!",
                    trigger: "blur"
                }],
                // photoname: [{
                //     required: true,
                //     message: "Driver Photo is required!",
                //     trigger: "blur"
                // }],
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
                photo: this.form.photo,
                iddriver: this.form.iddriver,
                typedriver: this.form.typedriver,
                pkwt: this.form.pkwt,
                attendance_longitude: this.form.attendance_longitude,
                attendance_latitude: this.form.attendance_latitude,
            };
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.UPDATE_DATA_DRIVER, obj)
                } else {
                    return false;
                }
            });
        },
        Cancel() {
            this.$router.replace({
                path: "/driver"
            });
        },
        onPickFile() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            this.form.photo = event.target.files[0];
            this.form.photoname = event.target.files[0].name;
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
            error: getter.GET_ERROR,
            button: getter.GET_BUTTON,
            driverType: getter.GET_DRIVER_TYPE,
            driver: getter.DRIVER
        }),
        select() {
            if (this.driver.drivertype_iddrivertype === 1) {
                return {
                    select: [{
                            iddrivertype: 1,
                            name: "PKWT",
                            descriptuon: null
                        },
                        {
                            iddrivertype: 2,
                            name: "PKWT BACKUP",
                            descriptuon: null,
                        },
                        {
                            iddrivertype: 3,
                            name: "FREELANCE",
                            descriptuon: null
                        }
                    ],
                }
            } else {
                return {
                    select: [{
                            iddrivertype: 2,
                            name: "PKWT BACKUP",
                            descriptuon: null,
                        },
                        {
                            iddrivertype: 3,
                            name: "FREELANCE",
                            descriptuon: null
                        }
                    ],
                }

            }
        },
    },
    mounted() {
        this.$store.dispatch(action.DRIVER_TYPE);
    },

    created() {
        this.form.name = this.driver.name;
        this.form.nik = this.driver.nik;
        this.form.email = this.driver.email;
        this.form.phonenumber = this.driver.phonenumber;
        this.form.birthdate = this.driver.birthdate;
        this.form.address = this.driver.address;
        this.form.typedriver = this.driver.drivertype_iddrivertype;
        this.form.iddriver = this.driver.users_id;
        this.form.gender = this.driver.gender.toString();
        this.form.attendance_latitude = this.driver.attendance_latitude;
        this.form.attendance_longitude = this.driver.attendance_longitude;
        // this.form.idvendor = this.vendor.idvendor;
        // this.form.idadmin = this.vendor.admins[0].id;
        // this.form.admin_name = this.vendor.admins[0].name;
        // this.form.admin_phonenumber = this.vendor.admins[0].phonenumber;
        // this.form.admin_email = this.vendor.admins[0].email;
    },
     mounted() {
        this.$store.dispatch(action.DRIVER_TYPE);
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
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

.el-radio {
    margin: 0 150px 0 10px;
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
