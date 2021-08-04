<template>
<div class="page-table scrollable only-y" id="affix-container">
    <TaskEmployee />
    <div class="card-base card-shadow--medium bg-white">
        <el-row :gutter="20">
            <el-col :span="11">
                <el-row :gutter="20" class="line margin-top-25">
                    <el-col :span="8">
                        <div class="avatar2 align-vertical text-center">
                            <img :src="order.employee.user.profile_picture" class="align-vertical-middle" alt="user avatar" @error="imgAlt">
                        </div>
                    </el-col>
                    <el-col :span="16" style="overflow-wrap: break-word">
                        <span class="p-name">{{ order.employee.user.name }}</span>
                        <span class="p">{{order.employee.user.phonenumber}}</span>
                        <span class="p">{{order.employee.user.email}}</span>
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

                        </dl>
                    </el-col>
                    <el-col :span="8">
                        <dl>
                            <!--<dt> TYPE </dt>-->
                            <!--<dd>{{ order.enterprise.enterprise_type.name }}</dd>-->
                            <dt>BOOKING TIME</dt>
                            <dd>{{ order.booking_time }}</dd>
                        </dl>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <hr>
        <el-row class="margin-top-25">
            <el-col :span="11">
                <h3>TASK</h3>
                <!--<h1 class="font-size-40">Lorem Ipsum</h1>-->
            </el-col>

            <el-col :span="8" class="line">
                <dl>
                    <dt>MESSAGE</dt>
                    <dd style="overflow-wrap: break-word">{{ `${order.message}` }}</dd>
                </dl>
            </el-col>
            <el-col :span="5"class="text-center">
                <span class="p font-weight-600 margin-bottom-10">STATUS</span>
                <div v-if="status === 'ORDER_INPROGRESS'">
                    <img src="../../../../assets/oper_asset/progress.png" alt="" style="width: 20%">
                    <span class="p margin-top-10">IN PROGRESS</span>
                </div>
                <div v-else>
                    <img src="../../../../assets/oper_asset/completed.png" alt="" style="width: 20%">
                    <span class="p margin-top-10">COMPLETED</span>
                </div>
            </el-col>
        </el-row>

        <!--<el-row :gutter="20">-->
            <!--<el-col :span="24">-->
                <!--<span>-->
                    <!--<b> Employee Name</b> <span style="padding-left: 0.8em"> : {{ order.employee.user.name }} </span>-->
                <!--</span> <br>-->
                <!--<span>-->
                    <!--<b> Transaction ID </b> <span style="padding-left: 1.5em"> : {{ order.trx_id }} </span>-->
                <!--</span> <br>-->
                <!--<span>-->
                    <!--<b> Booking Time </b> <span style="padding-left: 1.8em"> : {{ order.booking_time }} </span>-->
                <!--</span> <br>-->
                <!--<span>-->
                    <!--<b> Message </b> <span style="padding-left: 4.15em"> : {{ order.message }} </span>-->
                <!--</span> <br>-->
                <!--&lt;!&ndash;<span>&ndash;&gt;-->
                <!--&lt;!&ndash;<b> Vehicle </b> <span style="padding-left: 4.7em"> : {{ order.client_vehicle_license }} - {{ order.vehicle_owner }} ( {{ order.vehicle_type }} - {{ order.vehicle_transmission }} ) </span>&ndash;&gt;-->
                <!--&lt;!&ndash;</span> <br>&ndash;&gt;-->
                <!--<span>-->
                    <!--<b> Order Status </b> <span style="padding-left: 2.3em"> : {{ status }} </span>-->
                <!--</span>-->
            <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
            <!--<el-col :span="24">-->
                <!--<el-col>-->
                    <!--<p>Task</p>-->
                    <!--<hr>-->
                <!--</el-col>-->
            <!--</el-col>-->
        <!--</el-row>-->

        <el-row>
            <el-col :span="24">
                <el-table :data="order.order_tasks" stripe @row-click="getId" style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="TASK NAME">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="TASK DESCRIPTION">
                    </el-table-column>
                    <el-table-column
                            prop="last_update_status"
                            label="COMPLETED_DATE">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="STATUS">
                        <template slot-scope="scope">
                            {{(scope.row.order_task_status === 0) ? 'NOT STARTED'
                            : (scope.row.order_task_status === 1) ? 'IN PROGRESS'
                            : (scope.row.order_task_status === 2) ? 'COMPLETED'
                            : 'SKIPPED'}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="7" style="margin-top: 20px;">
                <el-button @click="backLCorp" type="info" size="small">
                    <span class="padding-left-10 padding-right-10">
                        Back
                    </span>
                </el-button>
            </el-col>
            <el-col :span="4" :offset="12" style="margin-top: 20px;">
                <el-button
                        type="danger"
                        v-loading.fullscreen.lock="loading"
                        v-if="cancelButton"
                        size="small"
                        @click="cancelTask">
                    <span class="padding-left-10 padding-right-10">
                        Cancel Task
                    </span>
                </el-button>
            </el-col>
        </el-row>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="70%">
        <el-row :gutter="20">
            <el-col :span="8">
                <div v-if='!map.taskphoto == null || !map.taskphoto == ""'>
                    <el-card class="middle" :body-style="{ padding: '0px' }" style="width: 100%; height: 300px">
                        <div class="thumbnail">
                            <img class="potrait" :src="map.taskphoto">
                        </div>
                    </el-card>
                </div>
                <div v-else>
                    <el-card class="middle" :body-style="{ padding: '0px' }" style="width: 100%; height: 300px">
                        <h3>User has not taken a picture</h3>
                    </el-card>
                </div>
                <el-col :span="24" style="margin-bottom: 5px">
                    <h3>
                        <el-col :span="16" style="margin-bottom: 10px">Task Name</el-col>
                    </h3>
                    <el-col :span="20">{{map.taskname}}</el-col>
                </el-col>
                <el-col :span="24" style="margin-bottom: 5px">
                    <h3>
                        <el-col :span="16" style="margin-bottom: 10px">Completed Date</el-col>
                    </h3>
                    <el-col :span="20">{{map.lastupdate}}</el-col>
                </el-col>
                <el-col :span="24">
                    <h3>
                        <el-col :span="16" style="margin-bottom: 10px">Description</el-col>
                    </h3>
                    <el-col :span="20">
                        <span class="word-wrap">{{map.description}}</span>
                    </el-col>
                </el-col>
            </el-col>
            <el-col :span="16">
                <div v-if="location">
                    <el-card :body-style="{ padding: '0px' }" style="width: 100%; height: 500px">
                        <gmap-map ref="map" :center="location" :zoom="14" :options="{gestureHandling:'cooperative'}" map-type-id="roadmap" style="width: 100%; height: 500px">
                            <GmapMarker :position="location" label="S" />
                        </gmap-map>
                    </el-card>
                </div>
                <div v-else>
                    <el-card class="center" :body-style="{ padding: '0px' }" style="width: 100%; height: 500px">

                        <h1>User has not completed the task</h1>

                    </el-card>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px">
            <el-col :offset="10">
                <el-checkbox :checked="map.required" disabled>Is Required</el-checkbox>
                <el-checkbox :checked="map.photo" disabled>Is Required Photo</el-checkbox>
                <el-checkbox :checked="map.inspector" disabled>Is Required Inspector Validation</el-checkbox>
            </el-col>
        </el-row>
    </el-dialog>
</div>
</template>

<script>
    import TaskEmployee from '../../../../components/employee/task-employee'
    import router from '../../../../router'
    import {
        mapGetters,
        mapMutations
    } from 'vuex'
    import * as getter from '../../../../store/getters-types'
    import * as action from '../../../../store/action-types'
    import * as mutation from '../../../../store/mutation-types'
    import Swal from 'sweetalert2'

export default {
    data() {
        return {
            alt: require("@/assets/images/avatar-2.jpg"),
            dialogVisible: false,
            location: null,
            map: {
                taskname: '',
                lastupdate: '',
                photo: '',
            },
            payload: {
                reason_cancel: "",
                idorder: null,
            },
        }
    },
    components: {
        TaskEmployee
    },
    computed: {
        ...mapGetters({
            order: getter.GET_DETAIL_EMPLOYEE,
            path: getter.GET_PATH,
            loading: getter.GET_LOADING
        }),
        status() {
            if (this.order.order_status === 1) {
                return "ORDER_OPEN"
            }
            if (this.order.order_status === 2) {
                return "ORDER_INPROGRESS"
            }
            if (this.order.order_status === 3) {
                return "ORDER_COMPLETED"
            }
            if (this.order.order_status === 4) {
                return "ORDER_MOVED"
            }
            if (this.order.order_status === 5) {
                return "ORDER_CANCELED"
            }
            if (this.order.order_status === 6) {
                return "ORDER_DELETED"
            }
        },
        cancelButton() {
            let idrole = JSON.parse(localStorage.getItem('user')).idrole
            if (idrole === 2 && this.order.order_status === 2) {
                return true
            } else {
                return false
            }
        }
    },
    async created() {
        this.idOrderButton();
    },
    methods: {
        ...mapMutations({
            type: mutation.TRACKING_TYPE,
            id: mutation.ID_ORDER,
            pathType: mutation.SET_PATH
        }),
        imgAlt(event) {
            event.target.src = this.alt;
        },
        editButton() {},
        enterpriseDriver() {},
        backLCorp() {
            router.replace('/employee/inprogress')
        },
        async cancelTask() {
            const {
                value: reason
            } = await Swal.fire({
                title: 'Enter the reason for cancellation',
                input: 'text',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Cancel it!',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
            });
            if (reason) {
                this.payload.reason_cancel = reason;
                this.payload.idorder = this.order.idorder;
                this.$store.commit(mutation.SET_LOADING, true)
                this.$store.dispatch(action.CANCEL_TASK, this.payload)
            }
        },
        idOrderButton() {
            this.type('task?idorder=');
            this.id(this.order.idorder);
            this.pathType(this.path);
        },
        async getId(id) {
            if (id.attachment_url == "" || id.attachment_url == null) {
                this.map.taskphoto = null
            } else {
                this.map.taskphoto = id.attachment_url
            }
            this.map.description = id.description
            this.map.taskname = id.name
            this.map.lastupdate = id.last_update_status
            this.map.required = id.is_required
            this.map.photo = id.is_need_photo
            this.map.inspector = id.is_need_inspector_validation
            this.dialogVisible = true
            if (!id.latitude == null || !id.latitude == "") {
                let obj = {
                    lat: Number(id.latitude),
                    lng: Number(id.longitude)
                }
                this.location = obj
            } else if (!id.submit_latitude == null || !id.submit_latitude == "") {
                let obj = {
                    lat: Number(id.submit_latitude),
                    lng: Number(id.submit_longitude)
                }
                this.location = obj
            } else {
                this.location = null
            }

        },
    }

}
</script>

<style lang="scss" scoped>
    @import "../../../../assets/scss/_variables";
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
