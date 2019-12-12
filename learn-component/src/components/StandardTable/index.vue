<template>
  <div class="StandardTable clearfix p-w-sm table" style="width: 100%">
    <el-table
      :header-cell-style="{background:'#3a3f4c'}"
      ref="standardTable"
      tooltip-effect="dark"
      style="width: 100% ;"
      :data="list"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      :stripe="true"
      max-height="730"
      :row-style="{height:'40px'}"
      :header-row-style="{height:'40px'}"
    >
      <!-- 复选框 -->
      <template v-if="selection">
        <el-table-column type="selection" width="40" />
      </template>

      <el-table-column
        v-for="(item, key) in tableColumns"
        :key="key"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :min-width="item.minWidth"
        :align="item.align"
        :fixed="item.fixed"
        :sortable="item.sortable ? 'custom' : false "
        :show-overflow-tooltip="item.showOverflowTooltip"
      >
        <template slot-scope="scope">
          <!-- 操作按钮区 array -->
          <template v-if="typeof item.modify === 'object'">
            <template v-for="(v,index) in item.modify">
              <!-- 带弹出框的按钮 -->
              <template v-if="v.popover">
                <el-popover :key="index" placement="left-start" width="300" trigger="hover">
                  <el-table :data="scope.row[v.popover]">
                    <el-table-column width="100" property="contact_time" label="日期"></el-table-column>
                    <el-table-column property="msg" label="内容"></el-table-column>
                  </el-table>
                  <el-button
                    class="m-l-xs"
                    slot="reference"
                    plain
                    :type="v.type ? v.type : 'primary'"
                    size="mini"
                    @click="()=>{v.method(scope.row)}"
                  >{{v.name}}</el-button>
                </el-popover>
              </template>
              <!-- 控制按钮显示隐藏 -->
              <template v-else-if="v.data">
                <!-- :loading="scope.row.loading" -->
                <el-button
                  :key="index"
                  :class="{'m-l-xs': index!=0}"
                  plain
                  :type="v.type ? v.type : 'primary'"
                  size="mini"
                  @click="()=>{v.method(scope.row)}"
                  :disabled="scope.row.disabled==v.data"
                >{{v.statusNo?scope.row[v.statusNo]:v.name}}</el-button>
              </template>
              <!-- 普通按钮 -->
              <template v-else>
                <el-button
                  :key="index"
                  :class="{'m-l-xs': index!=0}"
                  plain
                  :type="v.type ? v.type : 'primary'"
                  size="mini"
                  @click="()=>{v.method(scope.row)}"
                  :disabled="v.disabled"
                >{{v.name}}</el-button>
              </template>
            </template>
          </template>

          <!-- 操作按钮区 function -->
          <template v-else-if="typeof item.modify === 'function'">
            <template v-for="(v,index) in item.modify(scope.row, key)">
              <el-button
                plain
                size="mini"
                :key="index"
                :class="{'m-l-xs': index!=0}"
                :type="v.type ? v.type : 'primary'"
                :disabled="v.disabled"
                @click="()=>{v.method(scope.row)}"
              >{{v.name}}</el-button>
            </template>
          </template>

          <!-- 每列数据 -->
          <template v-else-if="item.formart">
            <div
              @click="nodeMethod($event, item.method, scope.row)"
              v-html="item.formart(key, scope.row)"
            ></div>
          </template>
          <template v-else-if="item.time">
            <div v-html="dateFtt(scope.row[item.prop],item.time)"></div>
          </template>
          <template v-else>{{ scope.row[item.prop] }}</template>
        </template>
      </el-table-column>
      <div slot="empty" class="table-empty-img">
        <div v-if="!list||list.length===0">
          <img src="../../assets/img/empty@2x.png" />
          <p>暂无数据</p>
        </div>
      </div>
    </el-table>

    <!-- 分页 -->
    <div class="m-t-xs pull-right" v-if="isPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 批量操作： -->
    <div class="m-t-xs pull-left" v-if="batchOperations && batchOperations.length > 0">
      <label for>批量操作：</label>
      <el-button
        :type="item.type ? item.type : ''"
        size="mini"
        v-for="item in batchOperations"
        :key="item.value"
        @click="()=>{item.method(selectArr.join(','))}"
      >{{item.label}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableColumns: {
      // 表头设置
      type: Array,
      required: true
    },
    selection: {
      // 复选框
      type: Boolean,
      default: true
    },
    currentPage: {
      // 页数
      type: Number,
      default: 1
    },
    pageSize: {
      // 每页条数
      type: Number,
      default: 10
    },
    pageSizes: {
      // 每页条数select
      type: Array,
      default: () => [10, 20, 30, 50]
    },
    total: {
      // 数据总条数
      type: Number,
      default: 0
    },
    list: Array, // table数据
    batchOperations: Array, // 批量操作按钮
    batchOperationName: {
      // 复选框返回数据关键字
      type: String,
      default: "id"
    },
    isPage: {
      // 是否显示分页
      type: Boolean,
      default: true
    },
    headerCellStyle: {
      // 表头style设置
      type: Function
    }
  },

  data() {
    return {
      batchAction: "",
      selectArr: [],
      backObj: {}
    };
  },
  methods: {
    // checkbox 修改
    handleSelectionChange(selRows) {
      this.selectArr = selRows.map(item => item[this.batchOperationName]);
    },
    // 每页显示的条数修改
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.$emit("changeCurrentData", { pageSize, currentPage: 1 });
    },
    // 页面跳转
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.$emit("changeCurrentData", { currentPage });
    },
    // 页面根据字段排序
    sortChange(column) {
      this.$emit("changeCurrentData", {
        sort_name: column.prop,
        sort_way: column.order
      });
    },
    nodeMethod(event, method = () => {}, row) {
      if (event.target.nodeName === "A") {
        method(row);
      }
    },
    dateFtt(time, format) {
      var t = new Date(time);
      var tf = function(i) {
        return (i < 10 ? "0" : "") + i;
      };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
          case "yyyy":
            return tf(t.getFullYear());
            break;
          case "MM":
            return tf(t.getMonth() + 1);
            break;
          case "mm":
            return tf(t.getMinutes());
            break;
          case "dd":
            return tf(t.getDate());
            break;
          case "HH":
            return tf(t.getHours());
            break;
          case "ss":
            return tf(t.getSeconds());
            break;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.table {
  .el-table {
    font-size: 12px;
    &::before {
      background-color: #fff;
    }
    .table-empty-img {
      width: 100%;
      text-align: center;
      img {
        display: inline-block;
        width: 140px;
      }
      p {
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
    .el-table__header-wrapper {
      .el-table__header {
        thead {
          tr {
            th {
              &:first-child {
                .cell {
                  padding-left: 20px;
                }
              }
            }
          }
        }
      }
    }
    .el-table__body-wrapper {
      .el-table__body {
        .el-table__row {
          padding: 10px 0;
          td {
            &:first-child {
              .cell {
                padding-left: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
