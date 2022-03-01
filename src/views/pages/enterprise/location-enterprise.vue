<template>
<div class="page-table scrollable only-y" id="affix-container">
    <p class="font-weight-600 mt-40">LOCATION</p>
    <div class="card-base card-shadow--medium bg-white">
        <!-- <el-row :gutter="10">
            <el-col :span="4" :xl="1">
                <el-button @click="Create()" style="width: 100%" type="primary">New Location</el-button>
            </el-col>
        </el-row> -->
        <el-row :gutter="10">
            <el-col :span="14">
                <gmap-map :center="markDefault" :zoom="16" map-type-id="terrain" style="width: 100%; height: 490px">
                    <div v-if="mapMark">
                        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" @click="openWindow(m.position)"></gmap-marker>
                        <gmap-info-window v-if="infowindow.name" @closeclick="window_open=false" :opened="window_open" :position="infowindow" :options="{ pixelOffset: { width: 0, height: -35},}">
                            {{infowindow.name}}
                        </gmap-info-window>
                    </div>
                </gmap-map>
            </el-col>
            <el-col :span="9">
                <el-row style="margin-top: 10px">
                    <div v-if="isAdminVendor">
                        <el-col :span="4">
                            <el-button @click="Cancel()" size="mini" type="info">Back</el-button>
                        </el-col>
                        <el-col :offset="1" :span="12">
                            <el-input placeholder="Search" @keyup.native="searchChange" v-model="input4">
                                <i slot="suffix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </el-col>
                    </div>
                    <div v-else>
                        <el-col :offset="1" :span="16">
                            <el-input placeholder="Search" @keyup.native="searchChange" v-model="input4">
                                <i slot="suffix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </el-col>
                    </div>
                    <el-col :offset="1" :span="1">
                        <el-button @click="Create()" style="text-align: center; background-color: #D50000;" type="danger"><i class="mdi mdi-plus"></i></el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="contacts-list box grow scrollable only-y">
                        <div v-for="c in listData" :key="c.id" class="flex contact" @click="getId(c)">

                            <div class="info box grow flex">
                                <div class="name box grow flex column justify-center p-10">

                                    <!-- <i class="mdi mdi-tooltip-edit mdi-36px;"></i>
                                    <br>
                                    <i class="mdi mdi-delete mdi-24px"></i> -->

                                    <strong><i style="color: #D50000" class="mdi mdi-map-marker-outline mdi-24px"></i>&nbsp;{{c.name}} </strong>
                                    <div class="phone fs-14 secondary-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{c.address}}</div>
                                    <el-row :gutter="20">
                                        <el-col :offset="18" :span="3">
                                            <i @click="Edit(c)" class="mdi mdi-tooltip-edit mdi-24px"></i>
                                        </el-col>
                                        <el-col :span="3">
                                            <i @click="Delete(c)" class="mdi mdi-delete mdi-24px"></i>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-row>
                <div align="center" class="grid-content">
                    <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="forTotal"></el-pagination>
                </div>
            </el-col>
        </el-row>

    </div>
</div>
</template>

<script>
import router from "../../../router";

import Affix from "@/components/Affix";
import {
    mapGetters,
    mapActions
} from "vuex";
import * as mutation from '../../../store/mutation-types';
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import Swal from "sweetalert2";

export default {
    name: "ListDriver",
    data() {
        return {
            visible2: false,
            mapMark: null,
            affixEnabled: true,
            resultTrack: null,
            image_url: null,
            info_marker: null,
            markers: [],
            infowindow: {
                lat: 0,
                lng: 0,
                name: null,
            },
            markDefault: {
                lat: -6.21462,
                lng: 106.84513
            },
            indexT: 1,
            idplaces: "",
            payload: {
                idplaces: null,
                identerprise: null,
                page: 1,
            },
            tableData: null,
            input4: null,
            place: null,
            isAdminVendor: false
        };
    },
    components: {
        Affix
    },
    computed: {
        ...mapGetters({
            listData: getter.GET_LIST_LOCATION,
            paginate: getter.GET_PAGINATE_LOCATION,
            enterprise: getter.ENTERPRISE,
            total: getter.GET_LOCATION_TOTAL
        }),
        paginator() {
            return this.paginate;
        },
        indexTam() {
            return this.indexT;
        },
        forTotal() {
            if (this.listData) {
                return this.total;
            }
        }
    },

    methods: {
        openWindow(position) {
            this.window_open = true
            this.infowindow.lat = position.lat;
            this.infowindow.lng = position.lng;
            this.infowindow.name = position.name;
        },
        async searchChange(v) {
            let trimName = this.input4.trim()
            if (trimName.length > 0) {
                this.$store.commit(mutation.BUTTON_STATUS, true);
                await this.$store.dispatch(action.LIST_LOCATION, {
                    page: 1,
                    q: trimName,
                    identerprise: this.enterprise.identerprise
                });
                await this.listData
                this.markers = [];
                for (var i = 0; i < this.listData.length; i++) {
                    const marker = {
                        lat: parseFloat(this.listData[i].latitude),
                        lng: parseFloat(this.listData[i].longitude),
                        name: this.listData[i].name + ', ' + this.listData[i].address,
                        popover: false,
                        id: this.listData[i].idplaces,
                    };
                    this.markDefault.lat = parseFloat(this.listData[i].latitude)
                    this.markDefault.lng = parseFloat(this.listData[i].longitude)
                    this.markers.push({
                        position: marker
                    });
                    this.mapMark = 1;
                }
            } else {
                this.$store.commit(mutation.BUTTON_STATUS, true);
                await this.$store.dispatch(action.LIST_LOCATION, {
                    page: 1,
                    q: trimName,
                    identerprise: this.enterprise.identerprise
                });
                await this.listData
                this.markers = [];
                for (var i = 0; i < this.listData.length; i++) {
                    const marker = {
                        lat: parseFloat(this.listData[i].latitude),
                        lng: parseFloat(this.listData[i].longitude),
                        name: this.listData[i].name + ', ' + this.listData[i].address,
                        popover: false,
                        id: this.listData[i].idplaces,
                    };
                    this.markDefault.lat = parseFloat(this.listData[i].latitude)
                    this.markDefault.lng = parseFloat(this.listData[i].longitude)
                    this.markers.push({
                        position: marker
                    });
                    this.mapMark = 1;
                }
            }
        },
        async handlePageChange(page) {
            this.markers = [];
            this.payload.page = page;
            await this.$store.dispatch(action.LIST_LOCATION, {
                page: page,
                q: this.input4,
                identerprise: this.enterprise.identerprise
            });
            for (var i = 0; i < this.listData.length; i++) {
                const marker = {
                    lat: parseFloat(this.listData[i].latitude),
                    lng: parseFloat(this.listData[i].longitude),
                    name: this.listData[i].name + ', ' + this.listData[i].address,
                    popover: false,
                    id: this.listData[i].idplaces,
                };
                this.markDefault.lat = parseFloat(this.listData[i].latitude)
                this.markDefault.lng = parseFloat(this.listData[i].longitude)
                this.markers.push({
                    position: marker
                });
                this.mapMark = 1;
            }
        },

        Create() {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$router.push({
                name: "NewLocation"
            });
        },
        clearMarkers() {
            this.markers = [];
        },
        async getId(id) {
            await this.clearMarkers();
            const marker = {
                lat: parseFloat(id.latitude),
                lng: parseFloat(id.longitude),
                name: id.name + ', ' + id.address,
                popover: false,

            }
            this.markDefault.lat = parseFloat(id.latitude)
            this.markDefault.lng = parseFloat(id.longitude)
            this.markers.push({
                position: marker
            });
            this.mapMark = 1;

        },
        Cancel() {
            this.$store.dispatch(action.DATA_ID_CORP, this.enterprise.identerprise);
            this.$router.replace({
                path: "/detail-enterprise/" + this.enterprise.identerprise
            });
        },
        Edit(e) {
            this.$store.commit(mutation.BUTTON_STATUS, false)
            this.$store.dispatch(action.DETAIL_LOCATION, e.idplaces);
        },
        Delete(e) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.$store.dispatch(action.DELETE_LOCATION, e);
                }
            });
        }
    },
    async created() {
        this.isAdminVendor = JSON.parse(localStorage.getItem('user')).idrole == 2
        this.payload.identerprise = await this.enterprise.identerprise
        await this.$store.dispatch(action.LIST_LOCATION, this.payload);
        await this.listData
        this.markers = [];
        for (var i = 0; i < this.listData.length; i++) {
            const marker = {
                lat: parseFloat(this.listData[i].latitude),
                lng: parseFloat(this.listData[i].longitude),
                name: this.listData[i].name + ', ' + this.listData[i].address,
                popover: false,
                id: this.listData[i].idplaces,
            };
            this.markDefault.lat = parseFloat(this.listData[i].latitude)
            this.markDefault.lng = parseFloat(this.listData[i].longitude)
            this.markers.push({
                position: marker
            });
            this.mapMark = 1;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables";

.text-p {
    display: block;
    color: white;
    font-weight: 600;
}

.plus-bg {
    background-color: #a31424;
    height: 139px;

}

.avatar {
    img {
        border: 1px solid transparentize($text-color, .9);
        box-sizing: border-box;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        transition: all .5s .25s;
    }
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

.name-of {
    margin-bottom: 10px;
    color: #a31424;
}

.contacts-list {
    //margin: 0 auto;
    height: 400px;
    width: 108%;
    max-width: 965px;
    padding: 0px 30px;
    box-sizing: border-box;

    .contact {
        margin: 10px 0;
        padding: 5px;
        box-sizing: border-box;
        cursor: pointer;

    }
}

.small-edit {
    width: 90px;
}

/*.card-base {*/
/*padding: 20px;*/
/*}*/

/*.el-row {*/
/*// display: flex;*/
/*// align-items: center;*/
/*// justify-content: center;*/
/*padding: 0px 10px;*/
/*margin-bottom: 20px;*/

/*&:last-child {*/
/*margin-bottom: 0;*/
/*}*/
/*}*/

/*.el-col {*/
/*border-radius: 5px;*/
/*}*/

/*.el-select {*/
/*width: 100%;*/
/*}*/
</style>
