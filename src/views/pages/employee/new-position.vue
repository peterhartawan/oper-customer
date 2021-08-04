<template>
<div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
        <el-form ref="form" :rules="rules" :model="form">
            <el-row :gutter="20">
                <el-col :lg="12">
                    <el-form-item prop="job_name">
                        <el-input placeholder="Job Name" v-model="form.job_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12">
                    <div v-if="showPrice === true">
                        <el-form-item prop="price">
                            <el-input placeholder="Price" v-model="form.price"></el-input>
                        </el-form-item>
                    </div>
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
</div>
</template>

<script>
import router from "../../../router";
import moment from "moment";
import Affix from "@/components/Affix";
import {
    mapGetters,
    mapActions
} from "vuex";
import * as mutation from '../../../store/mutation-types';
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
export default {
    name: "NewPosition",
    data() {
        return {
            form: {
                job_name: "",
                price: null,
            },
            rules: {
                job_name: [{
                    required: true,
                    message: "Job Name is required!",
                    trigger: "blur",

                }],
                price: [{
                    required: true,
                    message: "Price is required!",
                    trigger: "blur",

                }],
            }
        };
    },
    methods: {
        onSubmit(formName) {
            if (!this.price) {
                let obj = {
                    job_name: this.job_name,
                };
            } else {
                let obj = {
                    job_name: this.job_name,
                    price: this.price
                };
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store.commit(mutation.BUTTON_STATUS, true)
                    this.$store.dispatch(action.CREATE_POSITION, this.form);
                } else {
                    return false;
                }
            });
        },
        Cancel() {
            this.$store.dispatch(action.LIST_POSITION, {
                page: 1,
                status: this.status
            });
            this.$router.replace({
                path: "/employee/list-position"
            });
        }
    },
    computed: {
        ...mapGetters({
            button: getter.GET_BUTTON,
            error: getter.GET_ERROR,
            profile: getter.GET_DATA_PROFILE
        }),
        showPrice() {
            if (this.profile.vendor.show_employee_price === 1) {
                return true
            } else {
                return false
            }
        }

    },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_variables";

.card-base {
    padding: 20px;
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
</style>
