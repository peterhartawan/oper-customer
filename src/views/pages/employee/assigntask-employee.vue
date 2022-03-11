<template>
    <div class="page-table scrollable only-y" id="affix-container">
        <div class="card-base card-shadow--medium bg-white">
            <el-form ref="form" :rules="rules" :model="form">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item prop="booking_time">
                                <el-date-picker
                                        v-model="form.booking_time"
                                        type="datetime"
                                        placeholder="Booking Time"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        size="large"
                                        popper-class="mantap"
                                        prefix-icon="el-icon-date">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </el-col >
                    
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item prop="employee_userid">
                                <el-select
                                filterable
                                remote
                                reserve-keyword   
                                :loading="loading"                          
                                :remote-method="remoteMethod2"
                                v-model="form.employee_userid"
                                placeholder="Select Employee" >
                                    <el-option
                                            v-for="item in dropDown"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content">
                            <el-form-item prop="message" >
                                <el-input
                                        type="textarea"
                                        v-model="form.message"
                                        placeholder="Input Message"
                                        :autosize="{ minRows: 5, maxRows: 7}"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content">
                            <el-form-item prop="task_template_id">
                                <el-select
                                        v-model="form.task_template_id"
                                        @change="taskT"
                                        :remote-method="remoteMethod"
                                        placeholder="Select Template" >
                                    <el-option
                                            v-for="item in templateTasks"
                                            :key="item.task_template_id"
                                            :label="item.task_template_name"
                                            :value="item.task_template_id"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-table
                                :data="dataTAsk"
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="Task Name">
                            </el-table-column>
                            <el-table-column
                                    prop="description"
                                    label="Task Description">
                            </el-table-column>
                            <el-table-column
                                    prop="updated_at"
                                    label="Last Update">
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>

                <el-row >
                    <el-col :lg="{offset:18, span:6}" style="display: flex; justify-content: flex-end; margin-top: 14px">
                        <div class="grid-content">
                            <el-form-item>
                                <el-button @click="isCancel">Cancel</el-button>
                                <el-button
                                        type="success"
                                        v-loading.fullscreen.lock="button"
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
            return {
                dropDown: null,
                fullscreen_loading  : false,
                form: {
                    task_template_id    : '',
                    booking_time        : '',
                    employee_userid     : '',
                    message             : '',
                },
                rules: {
                    task_template_id: [
                        { required: true, message:'Please Input Task Template', trigger: ['blur','change']}
                    ],
                    booking_time: [
                        { required: true, message:'Please Select Booking Time', trigger: 'blur'}
                    ],
                    employee_userid:  [
                        { required: true, message:'Please Select Employee', trigger: ['blur', 'change']},
                    ],
                    message:  [
                        { required: true, message:'Please Input Message', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.commit(mutation.BUTTON_STATUS, true)
                        this.$store.dispatch(action.ASSIGN_EMPLOYEE_TASK, this.form)
                    } else {
                        return false;
                    }
                });
            },
            async remoteMethod2(query) {
                let trimName = query.trim()
            if (trimName.length > 0) {
                await this.$store.commit(mutation.SET_LOADING, true);
                await this.$store.dispatch(action.DROPDOWN_EMPLOYEE, trimName);
            } else {
                await this.$store.commit(mutation.SET_LOADING, true);
                await this.$store.dispatch(action.DROPDOWN_EMPLOYEE, trimName);
            }
             this.dropDown = this.employeeList;
            },
            isCancel(){
                this.$router.push(`/employee/inprogress`)
            },
            taskT(value){
                this.$store.dispatch(action.TEMPLATE_ID, value)
            },
            remoteMethod(query) {
            },
        },
        computed: {
            ...mapGetters({
                error           : getter.GET_ERROR,
                loading         : getter.GET_LOADING,
                button          : getter.GET_BUTTON,
                templateTasks   : getter.GET_TEMPLATE_LIST,
                data            : getter.GET_TEMPLATE_ID,
                employeeList    : getter.GET_DROPDOWN_EMPLOYEE,
                clearInput      : getter.GET_CLEAR_INPUT
            }),
            buttonStatuz: function () {
                return this.form.fullscreen_loading = this.button
            },
            dataTAsk() {
                return(this.data != null) ? this.form.tasks = this.data.tasks : this.form.tasks = []
            },
            clearinput(){
                if(clearInput){
                    this.form.birthdate = ''
                }
            }
        },
        created(){
            this.$store.commit(mutation.SET_TEMPLATE_ID, null);
            this.$store.dispatch(action.DROPDOWN_TEMPLATE, { page : 1 });
        },
        async mounted() {
            await this.$store.dispatch(action.DROPDOWN_EMPLOYEE, null)
            this.dropDown = this.employeeList
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
