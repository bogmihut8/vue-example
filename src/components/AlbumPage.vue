<template>
  <div id="album-page">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-row :gutter="20">
            <el-col :span="6" v-for="photo in photos" :key="photo.id" class="photo">
              <el-card :body-style="{ fontSize: '12px', padding: '0' }">
                <img :src="photo.thumbnailUrl" class="image">
                <div style="padding: 10px 5px;" class="title">
                  <span>{{photo.title}}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'AlbumPage',
  data () {
    return {
      albumId: String(this.$route.params.id),
      photos: []
    }
  },
  created(){
    this.fetchData();
  },
  beforeMount() {
    const loggedId = localStorage.getItem("logged_id");
    if(!loggedId) {
      this.$router.push({ name: 'Login' })
    }
  },
  methods: {
    fetchData() {
        const userRequest = new Request('https://jsonplaceholder.typicode.com/photos?albumId=' + this.albumId)
        fetch(userRequest)
            .then((response) => { return response.json() })
            .then((data) => {
                this.photos = data;
            }).catch( error => { console.log(error); });    
    }
  }
}
</script>

<style scoped>
#album-page{
  padding-top:20px;
  padding-bottom:20px;
}
.photo {
  margin-bottom:20px;
}
.photo img{
  width: 100%;
}
.card{
  background-color:#fefefe;
  border-radius:5px;
}
.title {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
  
}
</style>
