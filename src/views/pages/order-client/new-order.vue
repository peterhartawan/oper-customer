<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
      <el-form ref="form" :rules="rules" :model="form">
        <el-row>
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
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content">
              <el-form-item prop="message">
                <el-input
                  type="textarea"
                  v-model="form.message"
                  placeholder="Order Message"
                  :autosize="{ minRows: 5, maxRows: 7 }"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-col>
              <p>User</p>
              <hr />
            </el-col>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item prop="user_fullname">
                <el-input
                  placeholder="Name"
                  v-model="form.user_fullname"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="user_phonenumber">
              <el-input
                placeholder="Phone"
                v-on:keypress.native="isNumber"
                v-model="form.user_phonenumber"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
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
                  filterable
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
                filterable
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
        </el-row>
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
                  >Create</el-button
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
import { mapGetters } from "vuex";
import * as getter from "../../../store/getters-types";
import * as action from "../../../store/action-types";
import * as mutation from "../../../store/mutation-types";

export default {
  data() {
    let validateVehicleNum = (rule, value, callback) => {
      if (!value.match(/^[A-Z0-9 _]*[A-Z0-9][A-Z0-9 _]*$/g)) {
        callback(new Error("Please Input Valid Vehicle Number"));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if ((value + "").length > 13) {
        callback(new Error("Phone must be less than 13 digits"));
      } else {
        if ((value + "").length < 10) {
          callback(new Error("Phone must be more than 10 digits"));
        } else {
          callback();
        }
      }
    };
    return {
      options: null,
      vehicle_brands: null,
      origin: "",
      destination: "",
      form: {
        fullscreen_loading: false,
        task_template_id: "",
        booking_time: "",
        origin_latitude: "",
        origin_longitude: "",
        destination_latitude: "",
        destination_longitude: "",
        client_vehicle_license: "",
        user_fullname: "",
        user_phonenumber: "",
        vehicle_owner: "",
        vehicle_brand: "",
        vehicle_type: "",
        vehicle_transmission: "",
        vehicle_year: "",
        vehicle_color: "",
        message: "",
        order_type: "",
        origin_name: "",
        destination_name: "",
        tasks: null,
      },
      rules: {
        task_template_id: [
          {
            required: true,
            message: "Please Input Task Template ID",
            trigger: ["blur", "change"],
          },
        ],
        booking_time: [
          {
            required: true,
            message: "Please Input Date & Time",
            trigger: ["blur", "change"],
          },
        ],
        origin_latitude: [
          {
            required: true,
            message: "Please Select Origin",
            trigger: ["blur", "change"],
          },
        ],
        destination_latitude: [
          {
            required: true,
            message: "Please Select Destination",
            trigger: ["blur", "change"],
          },
        ],
        client_vehicle_license: [
          {
            required: false,
            message: "Please Input Vehicle License",
            trigger: ["blur", "change"],
          },
          { validator: validateVehicleNum, trigger: ["change", "blur"] },
        ],
        user_fullname: [
          {
            required: true,
            message: "Please Input FullName",
            trigger: ["blur", "change"],
          },
        ],
        user_phonenumber: [
          {
            required: true,
            message: "Please Input Phone Number",
            trigger: ["blur", "change"],
          },
          { validator: validatePhone, trigger: ["change", "blur"] },
        ],
        vehicle_owner: [
          {
            required: false,
            message: "Please Input Vehicle Owner",
            trigger: ["blur", "change"],
          },
        ],
        vehicle_brand: [
          {
            required: true,
            message: "Please Input Vehicle Brand",
            trigger: ["blur", "change"],
          },
        ],
        vehicle_type: [
          {
            required: true,
            message: "Please Input Vehicle Type",
            trigger: ["blur", "change"],
          },
        ],
        vehicle_transmission: [
          {
            required: true,
            message: "Please Input Vehicle Transmission",
            trigger: ["blur", "change"],
          },
        ],
        vehicle_year: [
          {
            required: true,
            message: "Please Input Vehicle Year",
            trigger: ["blur", "change"],
          },
        ],
        vehicle_color: [
          {
            required: true,
            message: "Please Input Vehicle Color",
            trigger: ["blur", "change"],
          },
        ],
        message: [
          {
            required: true,
            message: "Please Input Message",
            trigger: ["blur", "change"],
          },
        ],
        order_type: [
          {
            required: true,
            message: "Please Input Order Type",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit(mutation.BUTTON_STATUS, true);
          this.$store.dispatch(action.CREATE_ORDER_CLIENT, this.form);
        } else {
          return false;
        }
      });
    },
    addButton() {
      this.form.inspectors.push({
        key: Date.now(),
        name: "",
        phone: "",
      });
    },
    isCancel() {
      this.$router.replace("/order/open");
    },
    removeDomain(item) {
      let index = this.form.inspectors.indexOf(item);
      if (index !== -1) {
        this.form.inspectors.splice(index, 1);
      }
    },
    remoteMethod(query) {},
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    taskT(value) {
      this.$store.dispatch(action.TEMPLATE_ID, value);
    },
    originL(val) {
      this.form.origin_longitude = val.longitude;
      this.form.origin_latitude = val.latitude;
      this.form.origin_name = val.name;
    },
    destionationL(val) {
      this.form.destination_longitude = val.longitude;
      this.form.destination_latitude = val.latitude;
      this.form.destination_name = val.name;
    },
    vehicleBrand(val) {
      this.$store.dispatch(action.VEHICLE_TYPE, val);
    },
    querySearch(queryString, cb) {
      var links = this.vehicleTypeS;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return (link) => {
        return (
          link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
  },
  computed: {
    ...mapGetters({
      error: getter.GET_ERROR,
      button: getter.GET_BUTTON,
      templateTasks: getter.GET_TEMPLATE_LIST,
      data: getter.GET_TEMPLATE_ID,
      locationZ: getter.GET_LIST_LOCATION,
      vehicleTypeS: getter.GET_VEHICLE_TYPE,
    }),
    buttonStatuz: function () {
      return (this.form.fullscreen_loading = this.button);
    },
    dataTAsk() {
      return this.data != null
        ? (this.form.tasks = this.data.tasks)
        : (this.form.tasks = []);
    },
  },
  async created() {
    let data = await this.$store.dispatch(action.DROPDOWN_LOCATION);
    let dataVehicle = await this.$store.dispatch(action.VEHICLE_BRAND);
    this.options = data;
    this.vehicle_brands = dataVehicle;
    this.$store.commit(mutation.SET_TEMPLATE_ID, null);
    this.$store.dispatch(action.TEMPLATE_LIST, 1);
  },
};
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
