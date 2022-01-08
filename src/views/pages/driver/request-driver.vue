<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
      <el-form ref="form" :rules="rules" :model="form">
        <!-- <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <el-form-item prop="booking_time">
                <el-date-picker
                  v-model="form.booking_time"
                  type="datetime"
                  placeholder="Booking Time"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="large"
                  prefix-icon="el-icon-date"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row> -->

        <el-row>
          <el-col :span="24">
            <el-col>
              <p>Request Driver</p>
              <hr />
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item
                label="Location"
                label-width="120px"
                prop="location"
              >
                <el-select
                  v-model="loc"
                  @change="changeLocation"
                  placeholder="Order location"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.idplaces"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item prop="date" label="Date" label-width="120px">
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="Date"
                  format="dd MMM yyyy"
                  value-format="dd MMM yyyy"
                  size="large"
                  prefix-icon="el-icon-date"
                  :picker-options="pickerOptions"
                  @change="formatTime"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="time" label="Time" label-width="120px">
              <el-time-picker
                v-model="form.time"
                type="time"
                placeholder="00:00"
                format="HH:mm"
                value-format="HH:mm"
                size="large"
                prefix-icon="el-icon-date"
                @change="formatTime"
              >
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="note" label="Note" label-width="120px">
              <el-input
                type="textarea"
                placeholder="Request Driver 10"
                v-model="form.note"
                :autosize="{ minRows: 5, maxRows: 7 }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-col>
              <p>Locations</p>
              <hr />
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item prop="origin_latitude">
                <el-select
                  v-model="origin"
                  @change="originL"
                  placeholder="Select Origin"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="destination_latitude">
              <el-select
                v-model="destination"
                @change="destionationL"
                placeholder="Select Destination"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-col>
              <p>Vehicle</p>
              <hr />
            </el-col>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item prop="vehicle_brand">
                <el-select
                  style="width: 100%"
                  v-model="form.vehicle_brand"
                  @change="vehicleBrand"
                  filterable
                  placeholder="Vehicle Brand"
                >
                  <el-option
                    v-for="item in vehicle_brands"
                    :key="item.id"
                    :label="item.brand_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item prop="vehicle_type">
                <el-autocomplete
                  class="inline-input"
                  v-model="form.vehicle_type"
                  :fetch-suggestions="querySearch"
                  placeholder="Vehicle Type"
                  :trigger-on-focus="false"
                  style="width: 100%"
                ></el-autocomplete>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item prop="vehicle_transmission">
                <el-select
                  v-model="form.vehicle_transmission"
                  style="width: 100%"
                  placeholder="Select Vehicle Transmission"
                >
                  <el-option label="Manual" value="Manual"></el-option>
                  <el-option label="Automatic" value="Automatic"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content">
              <el-form-item prop="client_vehicle_license">
                <el-input
                  placeholder="Vehicle Number"
                  v-model="form.client_vehicle_license"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="vehicle_owner">
              <el-input
                placeholder="Vehicle Owner / License"
                v-model="form.vehicle_owner"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="vehicle_year">
              <el-input
                placeholder="Vehicle Year"
                v-on:keypress.native="isNumber"
                v-model="form.vehicle_year"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-col>
              <p>Template & Task</p>
              <hr />
            </el-col>
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
                  placeholder="Select Template"
                >
                  <el-option
                    v-for="item in templateTasks"
                    :key="item.task_template_id"
                    :label="item.task_template_name"
                    :value="item.task_template_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-col>
              <p>
                <b> Description </b>
                <span style="padding-left: 1.8em" v-if="data != null">
                  : {{ data.task_template_description }}</span
                >
              </p>
            </el-col>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-table :data="dataTAsk" stripe style="width: 100%">
              <el-table-column prop="name" label="Task Name"> </el-table-column>
              <el-table-column prop="description" label="Task Description">
              </el-table-column>
              <el-table-column prop="updated_at" label="Last Update">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col
            :lg="{ offset: 18, span: 6 }"
            style="display: flex; justify-content: flex-end; margin-top: 20px"
          >
            <div class="grid-content">
              <el-form-item>
                <el-button @click="isCancel">Cancel</el-button>
                <el-button
                  type="success"
                  v-loading.fullscreen.lock="buttonStatuz"
                  @click="onSubmit('form')"
                  >Send Request</el-button
                >
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import router from "../../../router";
import moment from "moment";
import Affix from "@/components/Affix";
import { mapGetters, mapActions } from "vuex";
import * as mutation from "../../../store/mutation-types";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
export default {
  name: "RequestDriver",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          let date = new Date();
          return time.getTime() < date.setDate(date.getDate() - 1);
        },
      },
      options: null,
      loc: null,
      form: {
        fullscreen_loading: false,
        enterprise_id: "",
        place_id: "",
        location: "",
        date: "",
        time: "",
        purpose_time: "",
        note: "",
      },
      rules: {
        location: [
          {
            required: true,
            message: "Please choose the location",
            trigger: ["blur", "change"],
          },
        ],
        date: [
          {
            required: true,
            message: "Please input the date",
            trigger: ["blur", "change"],
          },
        ],
        time: [
          {
            required: true,
            message: "Please input the time",
            trigger: ["blur", "change"],
          },
        ],
        note: [
          {
            required: true,
            message: "Please input the note",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      console.log(this.form);
      // let obj = {
      //   location: this.form.location,
      //   date: this.form.date,
      //   time: this.form.time,
      //   note: this.form.note,
      // };
      // this.$refs[formName].validate((valid) => {
      //   this.loading = true;
      //   if (valid) {
      //     this.$store.commit(mutation.BUTTON_STATUS, true);
      //     this.$store.dispatch(action.CREATE_DATA_DRIVER, obj);
      //   } else {
      //     return false;
      //   }
      // });
    },
    isCancel() {
      this.$router.replace("/driver/request-list");
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    changeLocation(val) {
      this.form.location = val;
      console.log(this.form);
    },
    formatTime() {
      this.form.purpose_time =
        moment(this.form.date).format("YYYY-MM-DD") + " " + this.form.time;
    },
  },
  computed: {
    ...mapGetters({
      error: getter.GET_ERROR,
      venID: getter.GET_VENDOR_PROFILE,
      button: getter.GET_BUTTON,
      data: getter.GET_TEMPLATE_ID,
    }),
    buttonStatuz: function () {
      return (this.form.fullscreen_loading = this.button);
    },
  },
  mounted() {
    this.$store.dispatch(action.VENDOR_PROFILE);
  },
  async created() {
    let data = await this.$store.dispatch(action.DROPDOWN_LOCATION);
    this.options = data;
    console.log("options ", this.options);
    this.form.enterprise_id = this.venID;
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
