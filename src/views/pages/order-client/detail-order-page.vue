<template>
    <!--<vue-scroll class="page-typography">-->
    <div class="page-table scrollable only-y" id="affix-container">
        <order-bar />
        <div class="card-base card-shadow--medium bg-white">
            <el-form v-if="form.statusButtonAssign">
                <div class="grid-content">
                    <el-form-item prop="task_template_id">
                        <span style="font-size: 16px">
                            <b style="padding-left: 0.8em"> Assign Order</b> <span style="padding-left: 1.9em"></span>
                        </span> :
                        <el-select
                        filterable
                        remote
                        reserve-keyword
                        :disabled="form.disableSelect"
                        :loading="loading"
                        v-model="form.driver_userid"
                        :placeholder="form.placeholderName" >
                            <el-option
                                    v-for="item in dropDown"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>

            <el-row :gutter="20">
                <el-col :span="11">
                    <el-row :gutter="20" class="line margin-top-25">
                        <el-col :span="8">
                            <div class="avatar2 align-vertical text-center">
                                <img src="../../../assets/images/avatar-2.jpg" class="align-vertical-middle" alt="user avatar" @error="imgAlt">
                            </div>
                        </el-col>
                        <el-col :span="16" style="overflow-wrap: break-word">
                            <span class="p-name">{{ order.user_fullname }}</span>
                            <span class="p">{{order.user_phonenumber}}</span>
                            <span class="p">{{order.email}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="13">
                    <h3 class="margin-bottom-1 margin-top-0 margin-left-10"> DETAIL </h3>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <dl>

                                <dt>TRANSACTION ID</dt>
                                <dd>{{ order.trx_id }}</dd>

                                <dt>BOOKING TIME</dt>
                                <dd>{{ order.booking_time }}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="8">
                            <dl>
                                <dt> TYPE </dt>
                                <dd>{{ order.enterprise.enterprise_type.name }}</dd>

                                <dt>PLACE</dt>
                                <dd>{{order.enterprise.office_address}}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="8">
                            <dl>
                                <dt>VEHICLE</dt>
                                <dd> {{ order.vehicle_type }} </dd>

                                <dt>POLICE NO.</dt>
                                <dd> {{ order.client_vehicle_license }} </dd>
                            </dl>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <hr>

            <el-row class="margin-top-25">
                <el-col :span="11">
                    <h3>TASK AND TEMPLATE</h3>
                    <!--<h1 class="font-size-40">Lorem Ipsum</h1>-->
                </el-col>

                <el-col :span="8" class="line">
                    <dl>
                        <dt>MESSAGE</dt>
                        <dd style="overflow-wrap: break-word">{{ `${order.message}` }}</dd>
                    </dl>
                </el-col>
                <el-col :span="5" class="text-center">
                    <span class="p font-weight-600 margin-bottom-10">STATUS</span>
                    <div>
                        <img src="../../../assets/oper_asset/open.png" alt="" style="width: 20%">
                        <span class="p margin-top-10">OPEN</span>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-table
                            :data="templateS.tasks"
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
                                prop="last_update_status"
                                label="Last Update">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-top: 20px">
                <el-col :span="10">
                    <el-button
                            type="info"
                            size="small"
                            @click="backLCorp">
                        <span class="padding-left-10 padding-right-10"> Back </span>
                    </el-button>
                    <el-button
                            type="primary"
                            size="small"
                            v-if="form.statusButtonEdit"
                            @click="edit">
                        <span class="padding-left-10 padding-right-10">Edit </span>
                    </el-button>
                </el-col>
                <el-col :lg="{span: 2, offset: 11}" v-if="form.statusButtonAssign">
                    <el-button
                            size="small"
                            @click="saveButton"
                            v-loading.fullscreen.lock="buttonStatuz"
                            type="success">
                        <span class="padding-left-10 padding-right-10"> Dispatch </span>
                    </el-button>
                </el-col>
            </el-row>
        </div>
    </div>
    <!--</vue-scroll>-->
</template>

<script>
    import  OrderBar from '../../../components/order/order-bar'
    import router from '../../../router'
    import { mapGetters } from 'vuex'
    import * as getter from '../../../store/getters-types'
    import * as action from '../../../store/action-types'
    import * as mutation from '../../../store/mutation-types'
    import Swal from 'sweetalert2'
    import Order from "./order";

    export default {
        data() {
            return {
                dropDown: null,
                alt: require("@/assets/images/avatar-2.jpg"),
                form: {
                    placeholderName     : 'Select Driver',
                    disableSelect       : false,
                    driver_userid       : '',
                    fullscreen_loading  : false,
                    statusButtonEdit    : null,
                    statusButtonAssign  : null,
                }
            }
        },
        components: {
            Order,
            OrderBar
        },
        computed: {
            ...mapGetters({
                order           : getter.GET_ORDER_DETAIL,
                button          : getter.GET_BUTTON,
                path            : getter.GET_PATH,
                dropdownDriver  : getter.GET_DRIVER_A_LIST,
                identerpriseS   : getter.GET_ID_ENTERPRISE,
                templateS       : getter.GET_TEMPLATE_ID,
                loading         : getter.GET_LOADING,
            }),
            buttonStatuz: function  () {
                return this.form.fullscreen_loading = this.button
            },
            status(){
                if(this.order.order_status === 1 ) {return "ORDER_OPEN" }
                if(this.order.order_status === 2 ) {return "ORDER_INPROGRESS" }
                if(this.order.order_status === 3 ) {return "ORDER_COMPLETED" }
                if(this.order.order_status === 4 ) {return "ORDER_MOVED" }
                if(this.order.order_status === 5 ) {return "ORDER_CANCELED" }
                if(this.order.order_status === 6 ) {return "ORDER_DELETED" }
            },
        },
       async created() {
            await this.$store.dispatch(action.DROPDOWN_D_AVAILABLE, this.identerpriseS);
           if(this.dropdownDriver.data.length == 0) {
               this.form.placeholderName = 'No Driver Available'
               this.form.disableSelect = true
           }else {
               this.dropDown = this.dropdownDriver.data;
           }
            let userProfile = JSON.parse(localStorage.getItem('user'));
            ( userProfile.idrole === 5 || userProfile.idrole == 3) ? this.form.statusButtonEdit =  true : this.form.statusButtonEdit = false,
            ( userProfile.idrole === 5 || userProfile.idrole == 4) ? this.form.statusButtonAssign =  true : this.form.statusButtonAssign = false
        },
        async mounted() {
            await this.$store.dispatch(action.DROPDOWN_DRIVER, null)
        },
        methods:    {
            edit(){
                this.$store.commit(mutation.ID_ORDER, this.order.idorder)
                router.replace('/edit-order')
            },
            // async remoteMethod2(query) {
            //     let trimName = query.trim()
            // if (trimName.length > 0) {
            //     await this.$store.commit(mutation.SET_LOADING, true);
            //     await this.$store.dispatch(action.DROPDOWN_DRIVER, trimName);
            // } else {
            //     await this.$store.commit(mutation.SET_LOADING, true);
            //     await this.$store.dispatch(action.DROPDOWN_DRIVER, trimName);
            // }
            //  this.dropDown = this.dropdownDriver;
            // },
            saveButton(){
                let obj = {
                    driver_userid   : this.form.driver_userid,
                    idorder         : this.order.idorder
                };
                this.$store.commit(mutation.BUTTON_STATUS, true)
                this.$store.dispatch(action.ASSIGN_ORDER_CLIENT, obj)
            },
            enterpriseDriver(){
            },
            backLCorp(){
                router.replace('/order/open')
            },
            buttonSearch() {
            },
            imgAlt(event) {
                event.target.src = this.alt;
            },
        },

    }

</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/_variables";
    hr {
        border-top : 1px solid $line-color
    }
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
    .thumbnail {
        border-radius: 0px;
        position: relative;
        width: 290px;
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

    .h3 {
        display: inline;
    }
    .p {
        display: block;
    }
    .p-name {
        display: block;
        font-size: 2em;
        font-weight: bold;
        margin-top: 10px
    }
    .line {
        border-right: 1px solid $line-color;
    }
    .word-wrap {
        word-wrap: break-word;
        overflow-wrap: break-word;
    }

    .center {
        text-align: center;
        vertical-align: middle;
        line-height: 470px;
    }

    .middle {
        text-align: center;
        vertical-align: middle;
        line-height: 280px;
    }
    .avatar2 {
        img {
            border: 1px solid transparentize($text-color, .9);
            box-sizing: border-box;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            transition: all .5s .25s;
        }
    }

</style>