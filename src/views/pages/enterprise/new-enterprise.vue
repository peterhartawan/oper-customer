<template>
    <div class="page-table scrollable only-y" id="affix-container">
        <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item prop="name">
                            <el-input
                                    placeholder="Enterprise Name"
                                    v-model="form.name">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col >
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item prop="site_url">
                            <el-input
                                    placeholder="Site Url"
                                    v-model="form.site_url">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col >
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item prop="office_phone">
                            <el-input
                                    placeholder="Enterprise Phone Number"
                                    v-model="form.office_phone"
                                    v-on:keypress.native="isNumber"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="email">
                        <el-input  placeholder="Enterprise Email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item prop="id_vendor">
                            <el-select
                                    v-model="form.id_vendor"
                                    placeholder="Select Vendor" >
                                <el-option
                                        v-for="(item, i) in vendor"
                                        :key="`${i}-${item.idvendor}`"
                                        :label="item.name"
                                        :value="item.idvendor"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item prop="id_enterprise_type">
                            <el-select v-model="form.id_enterprise_type"  placeholder="Select Enterprise Type" >
                                <el-option label="REGULAR" value=1></el-option>
                                <el-option label="PLUS" value=2></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="9">
                    <el-form-item prop="photoname">
                        <div class="grid-content">
                            <el-input disabled placeholder="Browse Foto" v-model="form.photoname" disable></el-input>
                        </div>
                    </el-form-item>
                </el-col>
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
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item prop="description" >
                            <el-input
                                    type="textarea"
                                    v-model="form.description"
                                    placeholder="Description"
                                    :autosize="{ minRows: 5, maxRows: 7}"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-col>
                        <p>Pic</p>
                        <hr>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="pic_name">
                            <el-input  placeholder="Pic Name" v-model="form.pic_name"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="pic_email">
                            <el-input  placeholder="Pic Email"  v-model="form.pic_email"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="pic_phone">
                            <el-input
                                    placeholder="Pic Phone Number"
                                    v-model="form.pic_phone"
                                    v-on:keypress.native="isNumber"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-col>
                        <p>Admin</p>
                        <hr>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="admin_name" >
                            <el-input
                                    placeholder="Admin Name"
                                    v-model="form.admin_name">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="admin_email">
                            <el-input
                                    placeholder="Admin Email"
                                    v-model="form.admin_email">
                            </el-input>
                        </el-form-item >
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="admin_phone">
                            <el-input
                                    placeholder="Admin Mobile Phone"
                                    v-on:keypress.native="isNumber"
                                    v-model="form.admin_phone">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-col>
                        <span>Pic Task</span>
                        <el-button
                                class="el-icon-plus"
                                type="success" size="mini"
                                @click="addButton"
                                circle style="margin-left: 10px">
                        </el-button>
                        <hr>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <div v-for="(domain, index) in form.inspectors" :key="domain.key" >
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item
                                :prop="'inspectors.' + index + '.name'"
                                :rules="{
                                            required: true, message: 'Pic Task Name can not be null', trigger: 'blur'
                                     }">
                            <el-input  placeholder="Pic Task Name" v-model="domain.name"  class="leb_same"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="11">
                    <div class="grid-content">
                        <el-form-item
                                :prop="'inspectors.' + index + '.name'"
                                :rules="{
                                        required: true, message: 'Pic Task Phone Number can not be null', trigger: 'blur'
                                     }">
                            <el-input
                                    placeholder="Pic Task Phone Number"
                                    v-model="domain.phone" class="leb_same"
                                    v-on:keypress.native="isNumber"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content">
                        <el-button
                                class="el-icon-minus"
                                type="danger" size="mini"
                                @click.prevent="removeDomain(domain)"
                                circle style="margin-top: 13px">
                        </el-button>
                    </div>
                </el-col>
                </div>
            </el-row>
            <el-row >
                <el-col :lg="{offset:18, span:6}" style="display: flex; justify-content: flex-end">
                    <div class="grid-content">
                        <el-form-item>
                            <el-button @click="isCancel">Cancel</el-button>
                            <el-button
                                    type="success"
                                    v-loading.fullscreen.lock="buttonStatuz"
                                    @click="onSubmit('form')">Create</el-button>
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
            let validateUrl = (rule, value, callback) => {
                if(!value.match(/^http[s]?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/g)) {
                    callback(new Error('Please Input Valid Url, start with http://'))
                } else {
                    callback()
                }
            };
            let validatePhone = (rule, value, callback) => {
                if((value+'').length > 13) {
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
                    fullscreen_loading  : false,
                    name                : '',
                    photoname           : '',
                    photo               : null,
                    site_url            : '',
                    description         : '',
                    email               : '',
                    id_enterprise_type  : '',
                    id_vendor           : '',
                    office_phone        : '',
                    office_address      : '',
                    pic_name            : '',
                    pic_phone           : '',
                    pic_email           : '',
                    admin_name          : '',
                    admin_email         : '',
                    admin_phone         : '',
                    inspectors          : [
                        {
                            key: 0,
                            name: '',
                            phone:''
                        }
                    ]
                },
                rules: {
                    name: [
                        { required: true, message:'Please Input Enterprise Name', trigger: 'blur'}
                    ],
                    photoname: [
                        { required: true, message: "Driver Photo is required!", trigger: "blur"}
                        ],
                    site_url: [
                        { required: true, message:'Please Input Site Url', trigger: 'blur'},
                        { validator: validateUrl, trigger: ['blur', 'change']}
                    ],
                    description: [
                        { required: true, message:'Please Input Description', trigger: 'blur'}
                    ],
                    email:  [
                        { required: true, message:'Please Input Enterprise Email', trigger: 'blur'}
                    ],
                    id_vendor: [
                        { required: true, message: 'Please select Vendor', trigger: 'change' }
                    ],
                    id_enterprise_type: [
                        { required: true, message: 'Please select Enterprise Type', trigger: 'change' }
                    ],
                    office_phone: [
                        { required: true, message:'Please Input Enterprise Phone Number', trigger: 'blur'},
                        { validator: validatePhone, trigger: ['blur', 'change']}
                    ],
                    office_address: [
                        { required: true, message: 'Please Input Enterprise Office Address', trigger: 'blur' }
                    ],
                    pic_name:   [
                        { required: true, message: 'Please Input Pic Name', trigger: 'blur' }
                    ],
                    pic_phone:   [
                        { required: true, message: 'Please Input Pic Phone', trigger: 'blur' },
                        { validator: validatePhone, trigger: ['blur', 'change']}
                    ],
                    pic_email:   [
                        { required: true, message: 'Please Input Pic Email', trigger: 'blur' }
                    ],
                    admin_name:   [
                        { required: true, message: 'Please Input Admin Name', trigger: 'blur' }
                    ],
                    admin_email:   [
                        { required: true, message: 'Please Input Admin Email', trigger: 'blur' }
                    ],
                    admin_phone:   [
                        { required: true, message: 'Please Input Admin Phone', trigger: 'blur' },
                        { validator: validatePhone, trigger: ['blur', 'change']}
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.commit(mutation.BUTTON_STATUS, true)
                        this.$store.dispatch(action.CREATE_DATA_CORP, this.form)
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
             onPickFile() {
            this.$refs.fileInput.click();
            },
            handleFileChange(event) {
            this.form.photo = event.target.files[0]
            this.form.photoname = event.target.files[0].name
            },
            addButton() {
                this.form.inspectors.push({
                    key: Date.now(),
                    name:'',
                    phone:''
                })
            },
            isCancel()  {
                this.$router.push('enterprise')
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
            }
        },
        created(){
            this.$store.dispatch(action.DROPDOWN_VENDOR)
        },
        computed: {
            ...mapGetters({
                error : getter.GET_ERROR,
                button: getter.GET_BUTTON,
                vendor: getter.GET_DROPDOWN_VENDOR
            }),
            buttonStatuz: function  () {
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
    .el-select {
    width: 100%;
    }
</style>
