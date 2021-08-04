<template>
<vue-scroll class="page-typography">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content">
                        <el-form-item prop="name">
                            <el-input style="width: 70%" placeholder="Template Name" v-model="form.name">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content">
                        <el-form-item prop="description">
                            <el-input type="textarea" v-model="form.description" placeholder="Template Description" :autosize="{ minRows: 5, maxRows: 7}"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-col>
                        <span>Task</span>
                        <el-button class="el-icon-plus" type="success" size="mini" @click="addButton" circle style="margin-left: 10px">
                        </el-button>
                        <hr>
                    </el-col>
                </el-col>
            </el-row>

            <div v-for="(domain, index) in form.tasks" :key="domain.key">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content">
                            <el-form-item :prop="'tasks.' + index + '.name'" :rules="{
                                            required: true, message: 'Task Name can not be null', trigger: 'blur'
                                         }">
                                <el-input placeholder="Task Name" v-model="domain.name"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item :prop="'tasks.' + index + '.task_description'" :rules="{
                                            required: true, message: 'Task Description can not be null', trigger: 'blur'
                                         }">
                            <el-input type="textarea" v-model="domain.task_description" placeholder="Task Description" :autosize="{ minRows: 5, maxRows: 7}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-if="!buttonStatus">
                    <el-col :span="24">
                        <el-form-item :prop="'tasks.' + index + '.location_name'">
                            <el-input class="sixsix" disabled type="textarea" v-model="domain.location_name" placeholder="Location Name" :autosize="{ minRows: 1, maxRows: 3}">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content">
                            <el-form-item :prop="'tasks.' + index + '.lat'">
                                <el-input class="sixsix" placeholder="Latitude" disabled v-model="domain.lat"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item :prop="'tasks.' + index + '.long'">
                            <el-input class="sixsix" v-model="domain.long" disabled placeholder="Longitude">
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="2">
                        <el-button type="primary" @click="dialogTrack(domain)" icon="el-icon-location" circle></el-button>
                    </el-col>

                </el-row>

                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-checkbox label="is Required" v-model="domain.is_required"></el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox label="need Foto" v-model="domain.is_need_photo"></el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-checkbox label="need Validation" v-if="buttonStatus" v-model="domain.is_need_inspector_validation"></el-checkbox>
                    </el-col>
                    <el-col :span="6">
                        <el-button class="el-icon-minus" type="danger" size="mini" @click.prevent="removeDomain(domain)" circle style="margin-bottom: 11px; margin-left: 20px">
                        </el-button>
                    </el-col>
                </el-row>
                <hr>
            </div>

            <el-row>
                <el-col :lg="{offset:18, span:6}" style="display: flex; justify-content: flex-end">
                    <div class="grid-content">
                        <el-form-item>
                            <el-button type="success" v-loading.fullscreen.lock="buttonStatuz" @click="onSubmit('form')">Create</el-button>
                            <el-button @click="isCancle">Cancel</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
        </el-form>

        <el-dialog :visible.sync="dialogV" :before-close="handleClose" width="70%">
            <div class="card-base card-shadow--medium">
                <gmap-map ref="map" :center="center" :zoom="12" :options="{gestureHandling:'cooperative'}" map-type-id="roadmap" style="width: 100%; height: 500px">
                    <GmapMarker @drag="updateCoordinates" :draggable="true" :position="markers" label="S" />

                </gmap-map>
            </div>
            <el-button @click="closeDialog" class="mt-10">Save</el-button>
        </el-dialog>
    </div>
</vue-scroll>
</template>

<script>
import router from '../../../router'
import * as action from '../../../store/action-types'
import * as getter from '../../../store/getters-types'
import * as mutation from '../../../store/mutation-types'
import {
    mapGetters
} from 'vuex'

export default {
    data() {
        return {
            buttonStatus: null,
            dialogVisible: false,
            currentPlace: null,
            markers: {
                lat: -6.193619252954559,
                lng: 106.76330885229345,
            },
            center: {
                lat: -6.193619252954559,
                lng: 106.76330885229345,
            },
            keyVal: '',
            form: {
                name: '',
                fullscreen_loading: false,
                description: '',
                tasks: [{
                    key: 1,
                    name: '',
                    task_description: '',
                    location_name: '',
                    lat: '',
                    long: '',
                    is_required: false,
                    is_need_photo: false,
                    is_need_inspector_validation: false
                }],
            },
            rules: {
                name: [{
                    required: true,
                    message: 'Please Input Template Name',
                    trigger: 'blur'
                }],
                description: [{
                    required: true,
                    message: 'Please Input Description',
                    trigger: 'blur'
                }],

            }
        }
    },
    methods: {
        onSubmit(formName) {
            let obj = {
                name: this.form.name,
                description: this.form.description,
                tasks: this.form.tasks,
                identerprise: this.identer
            };
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.CREATE_TEMPLATE_TASK, obj)
                } else {
                    return false;
                }
            });
        },
        dialogTrack(domain) {
            this.keyVal = domain.key
            this.$store.commit(mutation.SET_DIALOG_VISIBLE, true)
        },
        addButton() {
            this.form.tasks.push({
                key: Date.now(),
                name: '',
                task_description: '',
                lat: '',
                long: '',
                location_name: '',
                is_required: false,
                is_need_photo: false,
                is_need_inspector_validation: false
            })
        },
        isCancle() {
            router.push('/template-list')
        },
        removeDomain(item) {
            let index = this.form.tasks.indexOf(item);
            if (index !== -1) {
                this.form.tasks.splice(index, 1);
            }
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
                    let objIndex = this.form.tasks.findIndex((obj => obj.key == this.keyVal))

                    this.form.tasks[objIndex].lat = location.latLng.lat(),
                        this.form.tasks[objIndex].long = location.latLng.lng(),
                        this.form.tasks[objIndex].location_name = result[0].formatted_address
                }
            })
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
            identer: getter.GET_ID_ENTERPRISE,
            button: getter.GET_BUTTON,
            positionT: getter.GET_POSITION_TEMPLATE,
            dialogV: getter.GET_DIALOG_VISIBLE
        }),
        buttonStatuz: function () {
            return this.form.fullscreen_loading = this.button
        }
    },
    created() {
        let roleId = Number(process.env.VUE_APP_ROLE_VENDOR);
        let roleId2 = Number(process.env.VUE_APP_ROLE_SUPERADMIN);
        if (JSON.parse(localStorage.getItem('user')).idrole === roleId || JSON.parse(localStorage.getItem('user')).idrole === roleId2 ) {
            this.buttonStatus = false;
        } else {
            this.buttonStatus = true;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variables';

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
<style lang="scss">
.sixsix {
    .el-input__inner {
        color: #666666 !important;
    }

    .el-textarea__inner {
        color: #666666 !important;
    }
}
</style>
