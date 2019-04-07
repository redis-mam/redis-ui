<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable">
                <el-table-column prop="name" label="名称" width="150" />
                <el-table-column prop="create" label="添加KEY" :formatter="state" />
                <el-table-column prop="delete" label="删除KEY" :formatter="state" />
                <el-table-column prop="read" label="读取KEY" :formatter="state" />
                <el-table-column prop="exclusiveKey" label="KEY不包含正则" />
                <el-table-column prop="includeKey" label="KEY包含正则" />
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
                url: "/dev/role.json",
                dev_url:"./dev/role.json",
                form: {
                    name: '',
                    create: '',
                    delete: '',
                    read: '',
                    exclusiveKey: '',
                    includeKey: ''
                }
            })
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    if (d.name.indexOf(this.select_word) > -1){
                        return d;
                    }
                })
            }
        }
    }
</script>

