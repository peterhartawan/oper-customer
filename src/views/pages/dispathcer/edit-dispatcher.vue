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
                        <div class="grid-content">
                            <el-form-item prop="radio">
                                <el-radio-group v-model="form.gender">
                                <el-radio  :label="1">Male</el-radio>
                                <el-radio  :label="2">Female</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
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

                    <el-col :span="12">
                        <el-form-item prop="email">
                            <el-input  placeholder="Dispatcher Email" v-model="form.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">

                    <el-col :span="12" :offset="12">
                        <div class="grid-content">
                            <el-form-item prop="address" >
                                <el-input
                                        type="textarea"
                                        v-model="form.address"
                                        placeholder="Enterprise Office Address"
                                        :autosize="{ minRows: 5, maxRows: 7}"></el-input>
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
                                        v-loading.fullscreen.lock="buttonStatuz"
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
    import * as mutation from '../../../store/mutation-types'
    import * as action from '../../../store/action-types'
    export default {
        data() {
            return {
                form: {
                    name                : '',
                    fullscreen_loading  : false,
                    nik                 : '',
                    email               : '',
                    phone               : '',
                    birthdate           : '',
                    gender              : '',
                    address             : '',
                    id_dispatcher_type  : '',
                    idDispatch          : '',
                    id                  : ''
                },
                rules: {
                    name: [
                        { required: true, message:'Please Input Dispatcher Name', trigger: ['blur', 'change']}
                    ],
                    nik: [
                        { required: true, message:'Please Input Dispatcher Nik', trigger: ['blur', 'change']}
                    ],
                    email:  [
                        { required: true, message:'Please Input Dispatcher Email', trigger: ['blur', 'change']},
                        {type: 'email', message:'Pleas Input Valid Email', trigger:['blur', 'change']}
                    ],
                    phone:  [
                        { required: true, message:'Please Input Dispatcher Phone Number', trigger: ['blur', 'change']}
                    ],
                    gender: [
                        { required: true, message:'Please Select Gender', trigger: ['blur', 'change']}
                    ],
                    id_dispatcher_type: [
                        { required: true, message:'Please Input Id Dispatcher Type', trigger: ['blur', 'change']}
                    ],
                    file: [
                        { required: true, message:'Please Input Description', trigger: ['blur', 'change']}
                    ],
                    browse: [
                        { required: true, message:'Please Upload Foto', trigger: ['blur', 'change']}
                    ],
                    birthdate: [
                        { required: true, message:'Please Fill Birth Date', trigger: ['blur', 'change']}
                    ],
                    address: [
                        { required: true, message:'Please Input Address', trigger: ['blur', 'change']}
                    ]
                }
            }
        },
        async created(){
             let data = await this.$store.dispatch(action.DATA_ID_DISPATCHER, this.iddispatcher)
                this.form.name                  = data.name
                this.form.nik                   = data.dispatcher_profile.nik
                this.form.email                 = data.email
                this.form.phone                 = data.phonenumber
                this.form.birthdate             = data.dispatcher_profile.birthdate
                this.form.gender                = data.dispatcher_profile.gender
                this.form.address               = data.dispatcher_profile.address
                this.form.id_dispatcher_type    = data.idrole
                this.form.idDispatch            = data.vendor.idvendor
                this.form.id                    = data.id
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.UPDATE_DISPATCHER, this.form)
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
                this.$router.push('dispatcher')
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
                iddispatcher: getter.ID_DISPATCHER,
                button : getter.GET_BUTTON
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
