export default{
    install: function (Vue, opt) {
        Vue.mixin({
            methods: {
                // 初始化元素
                dataForm(opt) {
                    // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                    if (process.env.NODE_ENV === 'development') {
                        opt.url = opt.dev_url;
                    }
                    return Object.assign({
                        url: './notFind',
                        tableData: [],
                        select_word: '',
                        is_search: false,
                        delVisible: false,
                        form: {},
                        idx: -1
                    }, opt);
                },
                // 获取 easy-mock 的模拟数据
                getData() {
                    this.$axios.get(this.url).then((res) => {
                        this.tableData = res.data.list;
                    })
                },
                // 格式化状态
                state(row, column, value) {
                    return value === "1" ? "启用" : "禁用";
                },
                // 条件检索
                search() {
                    this.is_search = true;
                },
                
                // filterTag(value, row) {
                //     return row.tag === value;
                // },
                // 删除操作确认
                handleDelete(index, row) {
                    this.idx = index;
                    this.delVisible = true;
                },
                // 确定删除
                deleteRow(){
                    this.tableData.splice(this.idx, 1);
                    this.$message.success('删除成功');
                    this.delVisible = false;
                },
                
                nameFilter() {
                    return this.tableData.filter((d) => {
                        if (d.name.indexOf(this.select_word) > -1){
                            return d;
                        }
                    })
                }
            }
        });
    }
}