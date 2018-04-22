<template>
  <div id="profile">
    <el-row>
      <el-col :span="16" :offset="4" class="content">
        <el-row :gutter="20" class="header-widgets">
          <el-col :span="8">
            <el-card shadow="always">
              {{welcomeMessage}}
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="always">
              <i class="el-icon-time"></i>&nbsp; {{currentDateAndHour}}
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="always">
              <i class="el-icon-location"></i>&nbsp; {{currentLocation}}
            </el-card>
          </el-col>
        </el-row>
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
      userId: localStorage.getItem("logged_id") || String(this.$route.params.userId),
      welcomeMessage: this.returnWelcomeMessage(),
      currentDateAndHour: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
      currentLocation: ''
    }
  },
  beforeMount() {
    const loggedId = localStorage.getItem("logged_id");
    if(!loggedId) {
      this.$router.push({ name: 'Login' })
    }
    this.updateClock();
    this.getLocation();
  },
  methods: {
    returnWelcomeMessage(){
        const hour = new Date().getHours();
        if((hour > 18 && hour <= 23) || (hour >= 0 && hour <= 2)){
          return "Splendid evening, am I right?";
        }
        else if(hour > 11 && hour < 19){
          return "How is your afternoon going?";
        }
        else return "Isn't this the best morning?";
    },
    updateClock(){
      setInterval(() => {
        this.currentDateAndHour = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
      },
      1000)
    },
    getLocation() {
      fetch('http://ip-api.com/json')
      .then(response => response.json())
      .then(json => {
        this.currentLocation = json.city + ", " + json.country;
      }).catch( error => { console.log(error); });  
    }
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
.header-widgets{
  margin-bottom:20px;
}
</style>
