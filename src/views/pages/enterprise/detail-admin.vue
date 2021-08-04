<template>
    <vue-scroll class="page-typography">
        <div class="card-base card-shadow--medium bg-white">
            <div class="flex center demo-box">
                <div class="right-box box grow">
                    <dl>
                        <dt>Corporate Vendor</dt>
                        <dd>{{ corporateVendor }}</dd>

                        <dt>Corporate Office Address</dt>
                        <dd>{{ corporateAdress }}</dd>

                    </dl>
                </div>
                <div class="right-box box grow">
                    <dl>
                        <dt>Corporate Enterprise Type</dt>
                        <dd>{{ corporateType }}</dd>
                    </dl>
                </div>
            </div>
            <br>
            <el-row>
                <el-col :span="20">
                    <div class="grid-content">
                        <el-button>Done</el-button>
                        <el-button type="primary">Edit</el-button>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <el-button type="danger">Delete</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </vue-scroll>
</template>

<script>
    export default {
        data() {
            return {
                nameOfCorp: 'name of corporation',
                corporateOfPhone: '081908190819',
                corporateVendor: 'Vendor Name',
                corporateAdress: 'jl. K.H mas mansyur',
                corporateEmail: 'harismannugraha@gmail.com',
                corporateType: 'Plus'

            }
        }
    }

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