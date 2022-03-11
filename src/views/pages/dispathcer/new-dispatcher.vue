<template>
    <div class="page-table scrollable only-y" id="affix-container">
        <div class="card-base card-shadow--medium bg-white">
            <el-form ref="form" :rules="rules" :model="form">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item prop="name">
                                <el-input
                                        placeholder="Dispatcher Name"
                                        v-model="form.name">
                                </el-input>
                            </el-form-item>
                        </div>
                    </el-col >
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item prop="nik">
                                <el-input
                                        placeholder="Dispatcher NIK"
                                        v-model="form.nik">
                                </el-input>
                            </el-form-item>
                        </div>
                    </el-col >
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="email">
                            <el-input  placeholder="Dispatcher Email" v-model="form.email"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item prop="phone">
                                <el-input
                                        placeholder="Dispatcher Phone Number"
                                        v-model="form.phone"
                                        v-on:keypress.native="isNumber"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item prop="radio">
                                <el-radio v-model="form.gender" label="1">Male</el-radio>
                                <el-radio v-model="form.gender" label="2">Female</el-radio>
                            </el-form-item>
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item prop="birthdate">
                                <el-date-picker
                                        v-model="form.birthdate"
                                        type="date"
                                        placeholder="Birth date"
                                        format="yyyy/MM/dd"
                                        value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item prop="office_address" >
                                <el-input
                                        type="textarea"
                                        v-model="form.office_address"
                                        placeholder="Enterprise Office Address"
                                        :autosize="{ minRows: 5, maxRows: 7}"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>

                    <el-col :span="9">
                        <el-form-item prop="browse">
                            <div class="grid-content">
                                <el-input disabled placeholder="Browse Foto" v-model="form.browse" disable></el-input>
                            </div>
                        </el-form-item>
                    </el-col>

                    <el-col :span="3">
                        <div class="grid-content">
                            <el-form-item prop="file">
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

                <el-row >
                    <el-col :lg="{offset:18, span:6}" style="display: flex; justify-content: flex-end">
                        <div class="grid-content">
                            <el-form-item>
                                <el-button @click="isCancel">Cancel</el-button>
                                <el-button
                                        type="success"
                                        @click="onSubmit('form')">Save</el-button>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

            </el-form>
        </div>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex'
    import * as getter from '../../../store/getters-types'
    import * as action from '../../../store/action-types'
    import * as mutation from '../../../store/mutation-types'
    export default {
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
                    radio: '',
                form: {
                    name                : '',
                    nik                 : '',
                    email               : '',
                    phone               : '',
                    birthdate           : '',
                    gender              : '',
                    office_address      : '',
                    browse              : '',
                    id_dispatcher_type  : '',
                    file                : null,
                    fullscreen_loading  : false
                },
                rules: {
                    name: [
                        { required: true, message:'Please Input Dispatcher Name', trigger: 'blur'}
                    ],
                    nik: [
                        { required: true, message:'Please Input Dispatcher Nik', trigger: 'blur'}
                    ],
                    email:  [
                        { required: true, message:'Please Input Dispatcher Email', trigger: 'blur'},
                        {type: 'email', message:'Pleas Input Valid Email', trigger:['blur', 'change']}
                    ],
                    phone:  [
                        { required: true, message:'Please Input Dispatcher Phone Number', trigger: 'blur'},
                        { validator: validatePhone, trigger : ['change','blur'] }
                    ],
                    gender: [
                        { required: true, message:'Please Select Gender', trigger: 'blur'}
                    ],
                    id_dispatcher_type: [
                        { required: true, message:'Please Input Id Dispatcher Type', trigger: 'blur'}
                    ],
                    browse: [
                        { required: true, message:'Please Upload Foto', trigger: 'blur'}
                    ],
                    birthdate: [
                        { required: true, message:'Please Fill Birth Date', trigger: 'blur'}
                    ],
                    office_address: [
                        { required: true, message:'Please Input Address', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName) {
                let obj = {
                    name            : this.form.name,
                    email           : this.form.email,
                    phonenumber     : this.form.phone,
                    birthdate       : this.form.birthdate,
                    nik             : this.form.nik,
                    address         : this.form.office_address,
                    gender          : this.form.gender,
                    idvendor        : this.form.id_dispatcher_type,
                    photo           : this.form.file
                }
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.CREATE_DISPATCHER, obj)
                } else {
                    return false;
                }
                });
            },
            onPickFile() {
                this.$refs.fileInput.click()
            },
            addButton() {
                this.form.inspectors.push({
                    key: Date.now(),
                    name:'',
                    phone:''
                })
            },
            isCancel()  {
                this.$router.push('/dispatcher')
            },
            removeDomain(item){
                let index = this.form.inspectors.indexOf(item);
                if(index !== -1) {
                    this.form.inspectors.splice(index, 1);
                }
            },
            isNumber(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                    evt.preventDefault();;
                } else {
                    return true;
                }
            },
            handleFileChange(event) {
                this.form.file      = event.target.files[0]
                this.form.browse    = event.target.files[0].name
            }
        },
        computed: {
            ...mapGetters({
                error : getter.GET_ERROR,
                button: getter.GET_BUTTON
            }),
            buttonStatuz: function () {
                return this.form.fullscreen_loading = this.button
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
</style>
