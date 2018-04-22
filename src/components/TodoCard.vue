<template>
  <div id="todo-card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">Todos</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">See more</el-button>-->
      </div>
      <div class="todo-card-body">
          <div v-for="todo in todos" class="text item">
            {{ todo.title }} 
            <i v-if="todo.completed" style="color:green;" class="el-icon-success"></i>
            <i v-if="!todo.completed" style="color:red;" class="el-icon-error"></i>
          </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TodoCard',
  props: {
    'userId': {
      type: String
    }
  },
  data () {
    return {
        todos: []
    }
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData() {
        const userRequest = new Request('https://jsonplaceholder.typicode.com/todos?userId=' + this.userId)
      
        fetch(userRequest)
            .then((response) => { return response.json() })
            .then((data) => {
                this.todos = data;
                //console.log(this.todos);
            }).catch( error => { console.log(error); });    
    }
  }
}
</script>

<style scoped>
  .box-card .title {
      text-align: left;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  
  .todo-card-body {
      max-height:200px;
      overflow-y: scroll;
  }

</style>
