<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div v-if="dashboard">
        <ChartDashboard />
        <!-- <div v-if="role===vendor||role===superadmin||role===enterprise||role===dispatcherreg||role===dispatcherplus">
            <el-row :gutter="20">
                <center>
                    <h2>Order</h2>
                </center>
                <el-col :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i
                style="color:#c62828;"
                class="widget-icon mdi mdi-comment-account-outline accent-text fs-50"
                ></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Order Open</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_order_open}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i style="color:#c62828;" class="widget-icon mdi mdi-comment-account accent-text fs-50"></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Order Inprogress</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_order_inprogress}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i style="color:#c62828;" class="widget-icon mdi mdi-comment-check accent-text fs-50"></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Order Complete</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_order_complete}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-if="role===dispatcherreg">
            <el-row :gutter="20">
                <center>
                    <h2>Enterprise</h2>
                </center>
                <el-col :offset="8" :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i style="color:#ffa000;" class="widget-icon mdi mdi-account-outline accent-text fs-50"></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Enterprise Regular</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_enterprise_regular}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-if="role===vendor||role===superadmin">
            <el-row :gutter="20">
                <center>
                    <h2>Enterprise</h2>
                </center>
                <el-col :offset="4" :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i style="color:#ffa000;" class="widget-icon mdi mdi-account-outline accent-text fs-50"></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Enterprise Regular</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_enterprise_regular}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i
                style="color:#ffa000;"
                class="widget-icon mdi mdi-account-plus-outline accent-text fs-50"
                ></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Enterprise Plus</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_enterprise_plus}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-if="role===dispatcherreg">
            <el-row :gutter="20">
                <center>
                    <h2>Dispatcher</h2>
                </center>
                <el-col :offset="8" :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i style="color:#4caf50;" class="widget-icon mdi mdi-account accent-text fs-50"></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Dispatcher Regular</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_dispatcher_reguler}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-if="role===vendor">
            <el-row :gutter="20">
                <center>
                    <h2>Dispatcher</h2>
                </center>
                <el-col :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i style="color:#4caf50;" class="widget-icon mdi mdi-account accent-text fs-50"></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Dispatcher Regular</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_dispatcher_regular}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i
                style="color:#4caf50;"
                class="widget-icon mdi mdi-account-multiple-plus accent-text fs-50"
                ></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Dispatcher Plus</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_dispatcher_plus}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i
                style="color:#4caf50;"
                class="widget-icon mdi mdi-account-multiple accent-text fs-50"
                ></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Dispatcher Ondemand</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_dispatcher_ondedmand}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <center>
                    <h2>Driver</h2>
                </center>
                <el-col :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i
                style="color:#03a9f4;"
                class="widget-icon mdi mdi-account-card-details accent-text fs-50"
                ></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Driver PKWT Backup</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_driver_pkwt_backup}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i
                style="color:#03a9f4;"
                class="widget-icon mdi mdi-account-card-details accent-text fs-50"
                ></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Driver Contract</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_driver_contract}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i
                style="color:#03a9f4;"
                class="widget-icon mdi mdi mdi-account-card-details accent-text fs-50"
                ></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Driver Freelance</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_driver_freelance}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-if="role===dispatcherplus">
            <el-row :gutter="20">
                <center>
                    <h2>Driver</h2>
                </center>
                <el-col :offset="8" :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i
                style="color:#03a9f4;"
                class="widget-icon mdi mdi-account-card-details accent-text fs-50"
                ></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Driver</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_driver}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-if="role===superadmin">
            <el-row :gutter="20">
                <center>
                    <h2>Vendor</h2>
                </center>
                <el-col :offset="8" :lg="8">
                    <div class="card-base card-shadow--medium mb-30 widget small-widget">
                        <div class="widget-header ph-10 pt-10">
                            <i
                style="color:#00897b;"
                class="widget-icon mdi mdi-account-card-details accent-text fs-50"
                ></i>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-070 widget-title text-truncate pt-5 pb-10">Total Vendor</div>
                                <h2 class="m-0 text-truncate">{{dashboard.total_vendor}}</h2>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div> -->
    </div>
</div>
</template>

<script>
import router from "../../../router";
import Affix from "@/components/Affix";
import {
    mapGetters
} from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from "../../../store/mutation-types";
import Swal from "sweetalert2";
import ChartDashboard from './chart-dashboard'

export default {
    data() {
        return {
            role: null,
            tabPosition: 'today',
            superadmin: 1,
            vendor: 2,
            enterprise: 3,
            dispatcherreg: 4,
            dispatcherplus: 5,
            firstPayload: {
                idrole: 0,
                page: 1
            },
            secondPayload: {
                idrole: 99
            }
        };
    },
    components: {
        Affix,
        ChartDashboard
    },

    computed: {
        ...mapGetters({
            dashboard: getter.GET_DASHBOARD
        }),
        payload() {
            if (this.role === 1) {
                return this.firstPayload
            } else {
                return this.secondPayload
            }
        },
    },
    async created() {
        let dash = {
                order_today: 1,
                order_week: '',
                order_month: '',
                task_today: 1,
                task_week: '',
                task_month: ''
            }
        await this.$store.dispatch(action.GRAFIK_DASHBOARD);
        await this.$store.dispatch(action.LIST_DASHBOARD, dash);
        await this.$store.dispatch(action.LIST_FAQ, this.payload);
        let userProfile = JSON.parse(localStorage.getItem("user")).idrole;
        this.role = userProfile;
        // console.log('hey', this.role, this.enterprise)
        let idRole = JSON.parse(localStorage.getItem('user')).idrole + '' || '5';
        if (idRole === process.env.VUE_APP_ROLE_DISPATCHER_ENTERPRISE || idRole === process.env.VUE_APP_ROLE_DISPATCHER_ENTERPRISE_PLUS) {
            this.$store.dispatch(action.NOTIFICATION, 1);
        }
    }
};
</script>

<style lang="scss" scoped>
.card-base {
    padding: 15px;
}



.el-row {
    padding: 0 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

// .box-card {
//     width: 300px;
//     height: 200px;
// }

</style>
