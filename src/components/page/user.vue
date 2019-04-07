<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" />
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            
            <el-table :data="data" border class="table" ref="multipleTable">
                <el-table-column prop="name" label="用户名" sortable width="150" />
                <el-table-column prop="pwd" label="密码" width="150" />
                <el-table-column prop="state" label="状态" :formatter="state" width="150" />
                <el-table-column prop="description" label="描述" />
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return this.dataForm({
                url: "/dev/user.json", 
                dev_url: "./dev/user.json",
                form: {
                    name: '',
                    state: ''
                },
            })
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.nameFilter()
            }
        }
    }

</script>

