<template>
    <div class="container">
        <el-row :gutter="20" justify="center">
            <el-col :lg="spanDriver">
                <el-row :gutter="20">
                    <el-col :lg="spanOrder" :xs="spanOrder" :sm="spanOrder">
                        <el-card shadow="always" class="card-drive">
                            <el-row class="bts" :gutter="10" >
                                <el-col :lg="8" :xs="8" :sm="8">
                                    <!--<i class="mdi mdi-account red-icon"></i>-->
                                    <img src="../../../assets/oper_asset/driver.png" class="drive-acount">
                                </el-col>
                                <el-col :lg="6" :xs="6" :sm="8" class="driver">
                                    <span class="driver-man"> Driver </span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col class="text-center">
                                    <span class="num" :style="{marginLeft: marginL +'px'}">{{dashboard.total_driver}}</span>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :lg="12" :xs="12" :sm="12" v-if="rules === 2">
                        <el-card shadow="always" class="card-drive">
                            <el-row class="bts" :gutter="10">
                                <el-col :lg="8" :sm="8" :xs="8">
                                    <!--<i class="mdi mdi-account red-icon"></i>-->
                                    <img src="../../../assets/oper_asset/employee.png" class="drive-acount">
                                </el-col>
                                <el-col :lg="6" :sm="6" :xs="6" class="driver">
                                    <span class="driver-man"> Employee </span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col class="text-center">
                                    <span class="num">{{dashboard.total_employee}}</span>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :lg="12">
                <div>
                <el-row>
                    <el-col :lg="8">
                        <span style="font-weight: bold">TOTAL ORDER</span>
                    </el-col>
                    <el-col
                            :xs="{span:9, offset: 15}"
                            :sm="{span:10, offset: 14}"
                            :lg="{span:11, offset: 13}"
                            :xl="{span:7, offset: 17}">
                        <el-radio-group v-model="tabOrder" @change="totalOrder" fill="#ababab" size="small">
                            <el-radio-button label="today">Today</el-radio-button>
                            <el-radio-button label="week">Week</el-radio-button>
                            <el-radio-button label="month">Month</el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :lg="24">
                        <el-card shadow="always" class="card-border" :body-style="{padding: '5px'}">
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <el-row class="font-icon line" justify="center">
                                        <el-col :span="21">
                                            <!--<span class="mdi mdi-package-variant red-icon"></span>-->
                                            <img src="../../../assets/oper_asset/open.png" class="drive-acount">
                                        </el-col>
                                        <el-col :span="3" class="text-center font-weight-600 font-size-45">
                                                {{dashboard.total_order_open}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <el-row class="font-icon line" justify="center">
                                        <el-col :span="21">
                                            <!--<span class="mdi mdi-clock red-icon"></span>-->
                                            <img src="../../../assets/oper_asset/progress.png" class="drive-acount">
                                        </el-col>
                                        <el-col :span="3" class="text-center font-weight-600 font-size-45">
                                            {{dashboard.total_order_inprogress}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <el-row class="font-icon line" justify="center">
                                        <el-col :span="21">
                                            <img src="../../../assets/oper_asset/cancel_red.png" class="drive-acount">
                                        </el-col>
                                        <el-col :span="3" class="text-center font-weight-600 font-size-45">
                                            {{dashboard.total_order_canceled}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <el-row class="font-icon" justify="center">
                                        <el-col :span="9">
                                            <!--<span class="mdi mdi-check red-icon"></span>-->
                                            <img src="../../../assets/oper_asset/completed.png" class="drive-acount">
                                        </el-col>
                                        <el-col :span="15" class="text-center font-weight-600 font-size-45">
                                            {{dashboard.total_order_complete}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
                </div>
                    <el-row class="mt-task">
                        <el-col :lg="{span:8}">
                            <span style="font-weight: bold">TOTAL TASK</span>
                        </el-col>
                        <el-col
                                :xs="{span:9, offset: 15}"
                                :sm="{span:10, offset: 14}"
                                :lg="{span:11, offset: 13}"
                                :xl="{span:7, offset: 17}">
                            <el-radio-group @change="totalTask" v-model="tabTask" fill="#ababab" size="small">
                                <el-radio-button label="today">Today</el-radio-button>
                                <el-radio-button label="week">Week</el-radio-button>
                                <el-radio-button label="month">Month</el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :lg="24">
                            <el-card shadow="always" class="card-border" :body-style="{padding: '5px'}" >
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-row class="font-icon line" justify="center">
                                            <el-col :span="21">
                                                <!--<span class="mdi mdi-package-variant red-icon"></span>-->
                                                <img src="../../../assets/oper_asset/open.png" class="drive-acount">
                                            </el-col>
                                            <el-col :span="3" class="text-center font-weight-600 font-size-45">
                                                {{dashboard.total_task_open }}
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-row class="font-icon line" justify="center">
                                            <el-col :span="21">
                                                <!--<span class="mdi mdi-clock red-icon"></span>-->
                                                <img src="../../../assets/oper_asset/progress.png" class="drive-acount">
                                            </el-col>
                                            <el-col :span="3" class="text-center font-weight-600 font-size-45">
                                                {{dashboard.total_task_inprogress }}
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-row class="font-icon line" justify="center">
                                            <el-col :span="21">
                                                <!--<span class="mdi mdi-clock red-icon"></span>-->
                                                <img src="../../../assets/oper_asset/cancel_red.png" class="drive-acount">
                                            </el-col>
                                            <el-col :span="3" class="text-center font-weight-600 font-size-45">
                                                {{dashboard.total_task_canceled}}
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-row class="font-icon" justify="center">
                                            <el-col :span="9">
                                                <!--<span class="mdi mdi-check red-icon"></span>-->
                                                <img src="../../../assets/oper_asset/completed.png" class="drive-acount">
                                            </el-col>
                                            <el-col :span="15" class="text-center font-weight-600 font-size-45">
                                                {{dashboard.total_task_complete}}
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-row>
                <el-row class="legend-container">
                    <el-col :lg="{span:14, offset:10}"
                            :xl="{span:10, offset:14}"
                            :sm="{span:14, offset:10}"
                            class="col-legend">
                        legend : 
                        <i class="mdi mdi-package-variant legend-open"> : Open</i>
                        <i class="mdi mdi-lock legend-open"> : In Progress</i>
                        <i class="mdi mdi-check legend-completed"> : Completed</i>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <el-row :gutter="20" justify="center">
            <el-col :sm="24" :lg="spanLine" :xl="spanLine" >
                <h4>GRAFIK</h4>
                <div class="card-base card-shadow--medium p-30 mt-25 bg-white border-line-hight">
                    <vue-chartist :data="lineChart" :options="options1" type="Line"></vue-chartist>
                </div>
            </el-col>

            <el-col :xs="12" :sm="12" :lg="6" :xl="6" v-if="rules === 2"  >
                <h4 >PIE CHART</h4>
                <div class="card-base card-shadow--medium bg-white border-line-hight p-30 mt-25">
                    <!--<div class="bts text-center">-->
                        <!--<h2 class="mt-0 mb-20">Lorem Ipsum</h2>-->
                    <!--</div>-->
                    <div class="chart-box" style="height:400px;">
                        <bulma-chart :type="'pie'" :data="pieData" :options="options"></bulma-chart>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";

export default {
    data(){
        return {
            tabOrder: 'today',
            tabTask: 'today',
            marginL: 0,
            dash : {
                order_today: '',
                order_week: '',
                order_month: '',
                task_today: '',
                task_week: '',
                task_month: ''
            },
			options: {
				segmentShowStroke: false
            },
            	backgroundColor: [
				'#1fc8db',
				'#AB0000',
				'#42afe3',
				'#ed6c63',
				'#97cd76'
			],
            options1: {
                fullWidth: true,
                    chartPadding: {
                    right: 40
                }
            },
            rules: '',
            spanLine: 22,
            spanOrder: 12,
            spanDriver: 12,
        }
    },
    async created(){
        this.rules = await JSON.parse(localStorage.getItem('user')).idrole
        if(this.rules === 2) {
            this.spanLine = 18
        }else {
            this.spanOrder = 16;
            this.spanDriver = 8
        }

        if((this.dashboard.total_driver+'').length > 2){
            this.marginL = -33
        }
    },
    computed: {
        ...mapGetters({
            dashboard: getter.GET_DASHBOARD,
            pieChart: getter.GET_DASHBOARD_PIE,
            grafChart: getter.GET_DASHBOARD_GRAFIK
        }),
        pieData () {
			return {
				labels: this.pieChart.label,
				datasets: [{
					data: this.pieChart.data,
					backgroundColor: this.backgroundColor
				}]
			}
        },
        lineChart (){
            return {
                labels: this.grafChart.label,
                series: this.grafChart.data
                }
        }
    },
    methods: {
        totalOrder(v){
            if(v === 'today'){
                this.dash.order_today = 1;
                this.dash.order_week = '';
                this.dash.order_month = '';
            }
            if(v === 'week'){
                this.dash.order_today = '';
                this.dash.order_week = 1;
                this.dash.order_month = ''
            }
            if(v === 'month'){
                this.dash.order_today = '';
                this.dash.order_week = '';
                this.dash.order_month = 1
            }
                this.$store.dispatch(action.LIST_DASHBOARD, this.dash);

        },
        totalTask(v){
            if(v === 'today'){
                this.dash.task_today = 1;
                this.dash.task_week = '';
                this.dash.task_month = '';
            }
            if(v === 'week'){
                this.dash.task_today = '';
                this.dash.task_week = 1;
                this.dash.task_month = ''
            }
            if(v === 'month'){
                this.dash.task_today = '';
                this.dash.task_week = '';
                this.dash.task_month = 1
            }
            this.$store.dispatch(action.LIST_DASHBOARD, this.dash);
            }
    },
};
</script>

<style lang="scss" scoped>
    @import '../../../assets/scss/_variables';
    .container {
        font-family: Arial;
    }

    .drive-acount {
        height: 44px;
        margin-top: 10px;
    }
    .card-border {
        border-radius: 3%;
    }
    .canvas .chartjs {
        max-width: 80%;
    }
    .font-icon {
        font-size: 40px;
    }
    .line {
        border-right: 1px solid $line-color;
        padding-right: 60px;
    }
    .driver-man {
        font-size:20px;
        font-weight: bold;
        color: #acb4b5;
    }
    .mdi-account:before {
        content: "\F004";
        font-size: 50px;
    }
    .driver {
        margin-top: 18px;
    }
    .num {
        font-size: 9.0625em;
        font-family: Arial;
    }
    .legend-container {
        margin-top: 10px;
    }
    .legend-open {
        margin-left: 10px;
        padding-right: 10px;
        border-right: 1px solid; 
    }
    .legend-completed {
        margin-left: 10px;
        padding-right: 10px; 
    }
    .bts {
        border-bottom: 1px solid $line-color;
        padding-bottom: 12px;
    }
    .red-icon:before {
        color: red;
        font-weight: bold;
    }
    .col-legend {
        font-size: 10px;
    }
    .mt-task {
        margin-top: 10px;
    }
    .border-line-hight {
        height: 200px;
    }
    .margin-pie {
        margin-left: 20px;
    }
    .card-drive {
        width: 90%;
        height: 296px;
    }
    .border-line-hight[data-v-db4e8e96] {
        height: 300px;
    }

    @media only screen and (min-width: 1200px) {
        .border-line-hight[data-v-db4e8e96] {
            height: 161px;
        }
        .font-icon {
            font-size: 28px;
        }
        .num {
            font-size: 8.0625em;
            font-family: Arial;
        }
        .card-drive {
            width: 90%;
            height: 270px;
        }
        .line {
            padding-right: 37px;
        }
    }

    @media only screen and (min-width: 1900px) {
        .border-line-hight[data-v-db4e8e96] {
            height: 399px;
        }
    }

    @media only screen and (min-width: 1600px) {
        .border-line-hight[data-v-db4e8e96] {
            height: 260px;
        }
    }

    /*@media only screen and (min-width: 1920px) {*/
    /*.col-legend {*/
        /*font-size: 11px;*/
    /*}*/
    /*.num {*/
        /*font-size: 12.0625em;*/
    /*}*/
    /*.font-icon {*/
        /*font-size: 40px;*/
    /*}*/
    /*.border-line-hight {*/
        /*height: 358px;*/
    /*}*/
    /*.margin-pie {*/
        /*margin-left: 80px;*/
    /*}*/
    /*.card-drive {*/
        /*width: 90%;*/
        /*height: 380px;*/
    /*}*/
    /*.driver {*/
        /*margin-top: 30px;*/
    /*}*/
    /*.driver-man {*/
        /*font-size:35px;*/
        /*font-weight: bold;*/
        /*color: #acb4b5;*/
    /*}*/
    /*.mt-task {*/
        /*margin-top: 70px;*/
    /*}*/
    /*.mdi-account:before {*/
        /*content: "\F004";*/
        /*font-size: 80px;*/
    /*}*/
/*}*/
</style>