<template>
  <div id="profile">
    <el-row>
      <el-col :span="16" :offset="4" class="content">
        <profile-card :userId="userId" class="card"></profile-card>
        <br>
        <el-row>
          <el-col :span="11" class="card"><todo-card :userId="userId"></todo-card></el-col>
          <el-col :span="11" :offset="2" class="card"><album-card :userId="userId"></album-card></el-col>
        </el-row>
        <br>
        <comments-card :userId="userId" class="card"></comments-card>
      </el-col>
    </el-row>  
  </div>
</template>

<script>
import ProfileCard from '@/components/ProfileCard.vue'
import TodoCard from '@/components/TodoCard.vue'
import AlbumCard from '@/components/AlbumsCard.vue'
import CommentsCard from '@/components/CommentsCard.vue' 
export default {
  name: 'Profile',
  components: { ProfileCard, TodoCard, AlbumCard, CommentsCard },
  data () {
    return {
      userId: localStorage.getItem("logged_id") || String(this.$route.params.userId)
    }
  },
  beforeMount() {
    const loggedId = localStorage.getItem("logged_id");
    if(!loggedId) {
      this.$router.push({ name: 'Login' })
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
#profile{
  padding-top:20px;
}
.card{
  background-color:#fefefe;
  border-radius:5px;
}
</style>
