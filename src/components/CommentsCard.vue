<template>
  <div id="comments-card">
    <el-carousel :interval="5000" arrow="always" height="200px">
      <el-carousel-item v-for="comment in comments" :key="comment.id">
        <el-card class="box-card" :body-style="{paddingTop:'10px'}">
            <div slot="header" class="clearfix">
              <p><b>{{comment.email}}</b></p>
              <p><i>{{comment.name}}</i></p>
            </div>
            <div class="text item">
              {{comment.body}} {{comment.body}} {{comment.body}} {{comment.body}} {{comment.body}}
            </div>
          </el-card>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'ComentsCard',
  props: {
    'userId': {
      type: String
    }
  },
  data () {
    return {
        comments: []
    }
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData() {
        const userRequest = new Request('https://jsonplaceholder.typicode.com/comments?postId=' + this.userId)
      
        fetch(userRequest)
            .then((response) => { return response.json() })
            .then((data) => {
                this.comments = data;
                //console.log(this.todos);
            }).catch( error => { console.log(error); });    
    }
  }
}
</script>

<style scoped>
  #comments-card{
      background-color:transparent;
      font-size:13px;
  }
  #comments-card p{
      margin: 0;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
</style>
