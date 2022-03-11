<template>
  <vue-scroll class="page-layout-element">
    <div class="card-base card-shadow--medium bg-white">
      <el-row :gutter="10">
        <el-col :lg="8" :xl="3">
          <div class="thumbnail">
            <!-- <img class="potrait" :src="url+attendance.image_url" @error="imgAlt"> -->
            <img class="potrait" :src="attendance.image_url" @error="imgAlt">
          </div>
        </el-col>
        <el-col :lg="16" :xl="21">
          <table>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>{{ attendance.name }}</td>
            </tr>
            <tr>
              <td>Checkin</td>
              <td>:</td>
              <td>{{ attendance.clock_in }}</td>
            </tr>
            <tr>
              <td>Checkin Location</td>
              <td>:</td>
              <td>
                <a
                  :href="map+attendance.clock_in_latitude+','+attendance.clock_in_longitude"
                  style="color:#000000;"
                  target="_blank"
                >
                  <b>{{attendance.clock_in_latitude}},{{attendance.clock_in_longitude}}</b>
                </a>
              </td>
            </tr>
            <tr>
              <td>Checkout</td>
              <td>:</td>
              <td>{{ attendance.clock_out }}</td>
            </tr>
            <tr>
              <td>Checkout Location</td>
              <td>:</td>
              <td v-if="attendance.clock_out_latitude">
                <a
                  :href="map+attendance.clock_out_latitude+','+attendance.clock_out_longitude"
                  style="color:#000000;"
                  target="_blank"
                >
                  <b>{{attendance.clock_out_latitude}},{{attendance.clock_out_longitude}}</b>
                </a>
              </td>
            </tr>
            <tr>
              <td>Message</td>
              <td>:</td>
              <td>{{ attendance.remark }}</td>
            </tr>
          </table>
        </el-col>
      </el-row>
        <!--<el-col :lg="2" :xl="1">-->
          <!--<el-button @click="back()" type="primary">Back</el-button>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-row :gutter="20" >
        <el-col :lg="24" style="margin-top: 20px;">
          <el-button @click="back()" type="primary">Back</el-button>
          <el-button @click="TrackingOrder">Track Order</el-button>
        </el-col>
        <!--<el-col :lg="{offset:18, span:2}" style="display: flex; justify-content: flex-end">-->
        <!--<el-button type="danger" @click="deleteB">Delete</el-button>-->
        <!--</el-col>-->
      </el-row>
    </div>
  </vue-scroll>
</template>

<script>

    import router from "../../../router";
    import moment from "moment";
    import Affix from "@/components/Affix";
    import { mapGetters, mapActions, mapMutations } from "vuex";
    import * as getter from "../../../store/getters-types";
    import * as mutation from "../../../store/mutation-types";
    import * as action from "../../../store/action-types";

export default {
  name: "DetailAttendance",
  data() {
    return {
      alt: require("@/assets/images/avatar-2.jpg"),
      map: "https://www.google.com/maps/place/"
    };
  },
  components: {
    Affix
  },
  computed: {
    ...mapGetters({
      attendance: getter.ATTENDANCE
    }),
    forMap() {
      return;
    }
  },

  methods: {
    ...mapMutations({
      type     : mutation.TRACKING_TYPE,
      id       : mutation.ID_ORDER,
      pathType : mutation.SET_PATH
    }),
    back() {
      router.push("/attendance/driver");
    },
    imgAlt(event) {
      event.target.src = this.alt;
    },
    TrackingOrder() {
      this.type('attendance?idattendance=')
      this.id(this.attendance.id)
      this.pathType(this.$route.path)
      router.push('/order/attendance')
    }
  }
};
</script>

<style lang="scss" scoped>
.card-base {
  padding: 20px;
}

.el-row {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  padding: 0px 10px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 5px;
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
