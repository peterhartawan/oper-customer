<template>
    <div class="card-base card-shadow--medium bg-white">
        <div class="card-base card-shadow--medium bg-white">
            <el-form :model="form" :rules="rules"  ref="form">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item prop="name">
                                <el-input
                                        placeholder="Inspector Name"
                                        v-model="form.name"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item prop="phone">
                                <el-input
                                        placeholder="Inspector Phone Number"
                                        v-on:keypress.native="isNumber"
                                        v-model="form.phone"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

                <el-row >
                    <el-col :lg="{offset:18, span:6}" style="display: flex; justify-content: flex-end">
                        <el-button @click="cancleButton">Cancel</el-button>
                        <el-button
                                type="success"
                                v-loading.fullscreen.lock="buttonStatuz"
                                @click="onSubmit('form')">Save</el-button>
                    </el-col>
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
    import { mapGetters } from 'vuex'

    export default {
        name: 'new-pic',
        data() {
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
                form : {
                    name   : '',
                    phone  : '',
                    fullscreen_loading: false
                },
                rules: {
                    name: [
                        { required: true, message: 'Please Input Inspector Name', trigger: ['blur', 'change'] }
                    ],
                    phone: [
                        { required: true, message: 'Please Input Inspector Phone Number', trigger: ['blur', 'change']},
                        { validator: validatePhone, trigger: ['change', 'blur'] }
                    ]

                }
            };
        },
        async created(){
            let data        = await this.$store.dispatch(action.ID_INSPECTOR, this.idinspec)

            this.form.name  = data.name
            this.form.phone = data.phonenumber
        },
        methods : {
            onSubmit(formName) {
                let newForm = {
                    name            : this.form.name,
                    phone           : this.form.phone,
                    identerprise    : this.identer,
                    idinspector     : this.idinspec
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.commit(mutation.SET_LOADING, true);
                        this.$store.commit(mutation.BUTTON_STATUS, true);
                        this.$store.dispatch(action.UPDATE_INSPECTOR, newForm)
                    } else {
                        return false;
                    }
                });
            },
            cancleButton(){
                router.replace('/pic-task-list')
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
        computed: {
            ...mapGetters({
                identer     : getter.GET_ID_ENTERPRISE,
                idinspec    : getter.GET_ID_INSPECTOR,
                button      : getter.GET_BUTTON
            }),
            buttonStatuz: function () {
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
