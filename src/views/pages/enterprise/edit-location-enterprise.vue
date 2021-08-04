<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-form-item prop="name">
                        <el-input placeholder="Location Name" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12">
                    <el-form-item prop="address">
                        <el-input placeholder="Address" disabled v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-form-item prop="latitude">
                        <el-input placeholder="Latitude"  disabled v-model="form.latitude"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="10">
                    <el-form-item prop="longitude">
                        <el-input placeholder="Longitude" disabled v-model="form.longitude"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="dialogTrack" icon="el-icon-location" circle></el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :offset="20" :lg="2">
                <el-button :loading="button" @click="onSubmit('form')" type="success">Save</el-button>
            </el-col>
            <el-col :lg="2">
                <el-button @click="Cancel()" type="succes">Cancel</el-button>
            </el-col>
        </el-row>
    </div>
    <el-dialog :visible.sync="dialogV" :before-close="handleClose" width="70%">
        <div class="card-base card-shadow--medium">
            <div class="gmap-location-search-bar">
              Search Location:
              <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
            </div>
            <gmap-map ref="map" :center="center" :zoom="12" :options="{gestureHandling:'cooperative'}" map-type-id="roadmap" style="width: 100%; height: 500px">
                <GmapMarker @drag="updateCoordinates" :draggable="true" :position="markers" label="S" />
            </gmap-map>
        </div>
        <el-button @click="closeDialog" class="mt-10">Save</el-button>
    </el-dialog>
</div>
</template>

<script>
import router from "../../../router";
import moment from "moment";
import Affix from "@/components/Affix";
import {
    mapGetters,
    mapActions,
    mapState
} from "vuex";
import * as mutation from '../../../store/mutation-types';
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
export default {
    name: "NewLocation",
    data() {
        return {
            currentPlace: null,
            markers: {
                lat: -6.193619252954559,
                lng: 106.76330885229345,
            },
            center: {
                lat: -6.193619252954559,
                lng: 106.76330885229345,
            },
            form: {
                name: "",
                birthdate: "",
                address: "",
                longitude: "",
                latitude: "",
                identerprise: "",
            },
            payload: {
                identerprise: null,
                page: 1,
            },
            rules: {
                name: [{
                    required: true,
                    message: "Location Name is required!",
                    trigger: "blur"
                }],
                latitude: [{
                    required: true,
                    message: "Location Latitude is required!",
                    trigger: "blur"
                }],
                longitude: [{
                    required: true,
                    message: "Location Longitude is required!",
                    trigger: "blur"
                }],
                address: [{
                    required: true,
                    message: "Address is required!",
                    trigger: "blur"
                }],
            }
        };
    },
    methods: {
        onSubmit(formName) {
            let obj = {
                name: this.form.name,
                birthdate: this.form.birthdate,
                address: this.form.address,
                longitude: this.form.longitude,
                latitude: this.form.latitude,
                identerprise: this.form.identerprise,
            };
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.UPDATE_DATA_LOCATION, this.form);
                } else {
                    return false;
                }
            });
        },
        dialogTrack() {
            this.$store.commit(mutation.SET_DIALOG_VISIBLE, true)
        },
        updateCoordinates(location) {
            const geocoder = new google.maps.Geocoder()
            geocoder.geocode({
                'latLng': location.latLng
            }, (result, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    this.markers = {
                        lat: location.latLng.lat(),
                        lng: location.latLng.lng(),
                    };
                    this.form.latitude = location.latLng.lat()
                    this.form.longitude = location.latLng.lng()
                    this.form.address = result[0].formatted_address
                }
            })
        },
        setPlace(place) {
          if (place) {
            this.updateCoordinates(place.geometry.location)

            this.markers = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };

            this.center = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };

            this.form.latitude = place.geometry.location.lat()
            this.form.longitude = place.geometry.location.lng()
            this.form.address = place.formatted_address
          }
        },
        Cancel() {
            this.$store.dispatch(action.LIST_LOCATION, this.payload);
            this.$router.replace({
                path: "/location-enterprise/" + this.enterprise.identerprise
            });
        },
        closeDialog() {
            this.$store.commit(mutation.SET_DIALOG_VISIBLE, false)
        },
        handleClose(done) {
            this.$confirm('Are you sure to close this map?')
                .then(_ => {
                    this.$store.commit(mutation.SET_DIALOG_VISIBLE, false)
                })
                .catch(_ => {});
        }
    },
    computed: {
        ...mapGetters({
            enterprise: getter.ENTERPRISE,
            button: getter.GET_BUTTON,
            dialogV: getter.GET_DIALOG_VISIBLE,
            location: getter.GET_LOCATION_DETAIL
        }),
    },
    async created() {
        await this.location
        this.form.identerprise = this.enterprise.identerprise;
        this.form.name = this.location.name;
        this.form.address = this.location.address;
        this.form.latitude = this.location.latitude;
        this.form.longitude = this.location.longitude;
        this.form.idplaces = this.location.idplaces;
        this.markers.lat = parseFloat(this.location.latitude);
        this.markers.lng = parseFloat(this.location.longitude);
        this.center.lat = parseFloat(this.location.latitude);
        this.center.lng = parseFloat(this.location.longitude);
    },
    // mounted(){
    //     console.log(this.$route.params);
    //     this.$store.dispatch(action.DETAIL_LOCATION, this.$route.params.id);
    //     console.log(this.location);
    // },
    // watch:{
    //     locationdetail(newValue, oldValue){
    //         console.log('cus', newValue);
    //     }
    // }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables";

.card-base {
    padding: 20px;
}

.gmap-location-search-bar {
  margin: 0 0 20px 0;
}

.el-row {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    padding: 0px 10px;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 5px;
}

.el-radio {
    margin: 0 160px 0 10px;
}

.el-select {
    width: 100%;
}

.thumbnail {
    position: relative;
    width: 300px;
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

a {
    border-style: dotted;
    border-radius: 15px;
    padding: 10px;
    height: 150px;
}

td {
    padding: 10px;
}
</style>
