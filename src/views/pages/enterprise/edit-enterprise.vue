<template>
<div class="page-table scrollable only-y" id="affix-container">
    <!--<vue-scroll class="page-typography">-->
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :model="form" :rules="rules">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item prop="name">
                            <el-input placeholder="Enterprise Name" v-model="form.name"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item prop="site_url">
                            <el-input placeholder="Site Url" v-model="form.site_url">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item prop="office_phone">
                            <el-input placeholder="Enterprise Office Phone" @keypress.native="isNumber" v-model="form.office_phone"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item prop="email">
                            <el-input placeholder="Enterprise Email" v-model="form.email"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item prop="id_vendor">
                            <el-select v-model="form.id_vendor" placeholder="Select Vendor">
                                <el-option v-for="(item, i) in vendorS" :key="`${i}-${item.idvendor}`" :label="item.name" :value="item.idvendor"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item prop="id_enterprise_type">
                            <el-select v-model="form.id_enterprise_type" placeholder="Select Enterprise Type">
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
                            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="handleFileChange">
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item prop="office_address">
                            <el-input type="textarea" v-model="form.office_address" placeholder="Enterprise Office Address" :autosize="{ minRows: 5, maxRows: 7}"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <el-form-item prop="description">
                            <el-input type="textarea" v-model="form.description" placeholder="Enterprise Description" :autosize="{ minRows: 5, maxRows: 7}"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-col>
                        <p>PIC</p>
                        <hr>
                    </el-col>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="pic_name">
                            <el-input placeholder="Pic Name" v-model="form.pic_name"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="pic_email">
                            <el-input placeholder="Pic Email" v-model="form.pic_email"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-form-item prop="pic_phone">
                            <el-input placeholder="Pic Phone Number" @keypress.native="isNumber" v-model="form.pic_phone"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :lg="{offset:18, span:6}" style="display: flex; justify-content: flex-end">
                    <div class="grid-content">
                        <el-form-item>
                            <el-button @click="cancButton">Cancel</el-button>
                            <el-button type="success" v-loading.fullscreen.lock="buttonStatuz" @click="onSubmit('form')">Save</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</div>
<!--</vue-scroll>-->
</template>

<script>
import * as action from '../../../store/action-types'
import * as getter from '../../../store/getters-types'
import * as mutation from '../../../store/mutation-types'
import {
    mapActions,
    mapGetters
} from 'vuex'

export default {
    data() {
        let validateUrl = (rule, value, callback) => {
            if (!value.match(/^http[s]?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/g)) {
                callback(new Error('Please Input Valid Url, start with http://'))
            } else {
                callback()
            }
        };
        let validatePhone = (rule, value, callback) => {
            if ((value + '').length > 13) {
                callback(new Error('Phone must be less than 13 digits'))
            } else {
                if ((value + '').length < 10) {
                    callback(new Error('Phone must be more than 10 digits'))
                } else {
                    callback()
                }
            }

        };
        return {
            vendor: '',
            form: {
                fullscreen_loading: false,
                name: '',
                photoname: '',
                photo: null,
                email: '',
                description: '',
                id_enterprise_type: '',
                id_vendor: '',
                office_phone: '',
                office_address: '',
                pic_name: '',
                pic_email: '',
                pic_phone: '',
                id: '',
                site_url: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: 'Please Input Enterprise Name',
                    trigger: ['change', 'blur']
                }],
                site_url: [{
                        required: true,
                        message: 'Please Input Site Url',
                        trigger: ['change', 'blur']
                    },
                    {
                        validator: validateUrl,
                        trigger: 'blur'
                    }
                ],
                description: [{
                    required: true,
                    message: 'Please Input Description',
                    trigger: ['change', 'blur']
                }],
                email: [{
                    required: true,
                    message: 'Please Input Enterprise Email',
                    trigger: ['change', 'blur']
                }],
                id_vendor: [{
                    required: true,
                    message: 'Please select Vendor',
                    trigger: ['change', 'blur']
                }],
                id_enterprise_type: [{
                    required: true,
                    message: 'Please select Enterprise Type',
                    trigger: ['change', 'blur']
                }],
                office_phone: [{
                        required: true,
                        message: 'Please Input Enterprise Phone Number',
                        trigger: ['change', 'blur']
                    },
                    {
                        validator: validatePhone,
                        trigger: ['blur', 'change']
                    }
                ],
                office_address: [{
                    required: true,
                    message: 'Please Input Enterprise Office Address',
                    trigger: ['change', 'blur']
                }],
                pic_name: [{
                    required: true,
                    message: 'Please Input Pic Name',
                    trigger: ['change', 'blur']
                }],
                pic_phone: [{
                        required: true,
                        message: 'Please Input Pic Phone',
                        trigger: ['change', 'blur']
                    },
                    {
                        validator: validatePhone,
                        trigger: ['blur', 'change']
                    }
                ],
                pic_email: [{
                    required: true,
                    message: 'Please Input Pic Email',
                    trigger: ['change', 'blur']
                }],
                admin_name: [{
                    required: true,
                    message: 'Please Input Admin Name',
                    trigger: ['change', 'blur']
                }],
                admin_email: [{
                    required: true,
                    message: 'Please Input Admin Email',
                    trigger: ['change', 'blur']
                }],
                admin_phone: [{
                        required: true,
                        message: 'Please Input Admin Phone',
                        trigger: ['change', 'blur']
                    },
                    {
                        validator: validatePhone,
                        trigger: ['blur', 'change']
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters({
            button: getter.GET_BUTTON,
            vendorS: getter.GET_DROPDOWN_VENDOR
        }),
        buttonStatuz: function () {
            return this.form.fullscreen_loading = this.button
        }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.UPDATE_CORP, this.form);
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
        cancButton() {
            this.$router.push(`/detail-enterprise/${this.form.id}`)
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
    async created() {
        let dat = await this.$store.dispatch(action.DATA_ID_CORP, this.$route.params.id)

        this.form.name = dat.name,
            this.form.email = dat.email,
            this.form.description = dat.description,
            this.form.id_enterprise_type = dat.enterprise_type_identerprise_type + '',
            this.form.id_vendor = dat.vendor.idvendor,
            this.form.office_phone = dat.office_phone,
            this.form.office_address = dat.office_address,
            this.form.pic_name = dat.pic_name,
            this.form.pic_email = dat.pic_email,
            this.form.pic_phone = dat.pic_phone,
            this.form.id = this.$route.params.id
        this.form.site_url = dat.site_url
        await this.$store.dispatch(action.DROPDOWN_VENDOR)
        // console.log('ku ingin marah keduaq :', dat.vendor)
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

.el-select {
    width: 100%;
}
</style>
