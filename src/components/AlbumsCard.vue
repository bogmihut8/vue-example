<template>
  <div id="album-card">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">Albums</span>
      </div>
      <div class="album-card-body">
          <div v-for="album in albums" class="text item">
              <router-link tag="a" :to="'/albums/' + album.id">
                  <i class="el-icon-view"></i>
              </router-link>
              {{ album.title }}
          </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AlbumCard',
  props: {
    'userId': {
      type: String
    }
  },
  data () {
    return {
        albums: []
    }
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData() {
        const userRequest = new Request('https://jsonplaceholder.typicode.com/albums?userId=' + this.userId)
      
        fetch(userRequest)
            .then((response) => { return response.json() })
            .then((data) => {
                this.albums = data;
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
  
  .album-card-body {
      max-height:200px;
      overflow-y: scroll;
  }

</style>
