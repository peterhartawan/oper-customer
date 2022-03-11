<template>
  <div class="page-table scrollable only-y" id="affix-container">
    <div class="card-base card-shadow--medium bg-white">
      <el-form ref="form" :rules="rules" :model="form">
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
              <el-form-item label="Location" label-width="120px" prop="loc">
                <el-select
                  v-model="form.place_id"
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
            <el-form-item
              prop="number_of_drivers"
              label="Jumlah Driver"
              label-width="120px"
            >
              <el-input-number
                v-model="form.number_of_drivers"
                :min="1"
                @change="changeDriverNumber"
              ></el-input-number>
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
      vendor_profile: null,
      form: {
        number_of_drivers: "",
        fullscreen_loading: false,
        enterprise_id: "",
        place_id: "",
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
        number_of_drivers: [
          {
            required: true,
            message: "Please input the number of drivers",
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
      let obj = {
        enterprise_id: this.form.enterprise_id,
        place_id: this.form.place_id,
        number_of_drivers: this.form.number_of_drivers,
        note: this.form.note,
        purpose_time: this.form.purpose_time,
      };
      this.$refs[formName].validate((valid) => {
        this.loading = true;
        if (valid) {
          this.$store.commit(mutation.BUTTON_STATUS, true);
          this.$store.dispatch(action.CREATE_REQ_DRIVER, obj);
        } else {
          return false;
        }
      });
    },
    isCancel() {
      this.$router.push("/driver/request-list");
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
      this.form.place_id = val;
    },
    changeDriverNumber(val) {
      this.form.number_of_drivers = parseInt(val);
    },
    formatTime() {
      this.form.purpose_time = moment(
        this.form.date + " " + this.form.time
      ).format("YYYY-MM-DD hh:mm:ss");
    },
  },
  computed: {
    ...mapGetters({
      error: getter.GET_ERROR,
      venID: getter.GET_VENDOR_PROFILE,
      button: getter.GET_BUTTON,
      data: getter.GET_TEMPLATE_ID,
      profile: getter.GET_DATA_PROFILE,
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
    this.form.enterprise_id = this.profile.enterprise.identerprise;
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
