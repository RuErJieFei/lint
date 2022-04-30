<template>
  <div class="by row">
    <v-card class="col" hover>
      <div class="bg">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <v-form v-model="valid" lazy-validation ref="form">
        <h3>欢迎登录</h3>
        <!-- 手机号和密码 -->
        <v-text-field v-model="phone" required label="Phone" :rules="phoneRules"></v-text-field>
        <v-text-field v-model="password" required label="Password" :rules="passwordRules"></v-text-field>

        <!-- 验证码 -->
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field v-model="verifyCode" label="verifyCode" required></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <img class="verify" @click.prevent="getVerifyCode" ref="codeImg" :src="url" />
          </v-col>
        </v-row>

        <!-- 复选框 -->
        <v-checkbox v-model="checkbox" label="同意协议？" required :rules="[(v) => !!v || '同意才能继续!']">
        </v-checkbox>

        <!-- 按钮区 -->
        <!-- <v-btn color="success" class="mr-3" @click="validate" :disabled="!valid">验证</v-btn> -->
        <v-btn color="primary" class="mr-4 btn" @click="submit" :disabled="!valid">登录</v-btn>
        <v-btn color="warning" class="btn" @click="reset">重置</v-btn>
      </v-form>
    </v-card>

    <!-- 遮罩层 -->
    <v-overlay absolute z-index="5" class="mask"></v-overlay>
  </div>
</template>

<script>
export default {
  name: 'JS',
  data () {
    return {
      valid: true,
      phone: '15005172973',
      password: '123123',
      verifyCode: '',
      checkbox: true,
      url: '',
      phoneRules: [(v) => !!v || '手机号不能为空', (v) => (v && v.length === 11) || '手机号必须为11位'],
      passwordRules: [
        (v) => !!v || '密码不能为空',
        (v) => (v && v.length >= 6 && v.length <= 10) || '密码长度必须在6-10位之间'
      ]
    }
  },
  created () {
    // 手机号有效才请求获得验证码去填充图片标签
    if (this.phoneRules) {
      this.getVerifyCode()
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    getVerifyCode () {
      // 点击验证码图片，重新请求验证码
      this.axios.get('/captcha?phone=' + this.phone, { responseType: 'blob' }).then((res) => {
        this.url = window.URL.createObjectURL(res.data)
      })
    },
    submit () {
      // this.$refs.form.validate()
      this.validate()
      this.axios({
        method: 'post',
        url: '/user/login',
        data: {
          phone: this.phone,
          password: this.password
        }
      }).then((res) => {
        // console.log(res.data);
        if (res.data.code === 1) {
          console.log(res.data.data)
          this.$layer.alert(
            '登录成功！',
            {
              title: '提示',
              icon: 2
            },
            (layerid) => {
              this.$layer.close(layerid)
              this.$store.commit('login', res.data.data)
              localStorage.setItem('login', res.data.data)
              this.$router.push('/index')
            }
          )
        } else {
          this.$layer.alert('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
*,
*:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.by {
  width: 100vw;
  height: 100vh;
  background: url('https://cdn.jsdelivr.net/gh/casdxz/image@master/head/banner21.webp');

}

.bg{
  width: 600px;
  height: 500px;
  position: absolute;
  transform: translate(-50%,-50%);
  left: 50%;
  top: 50%;
}

.bg .shape{
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 50%;
}

.shape:first-child {
  background: linear-gradient( #ec31df, #f09819);
  right: -90px;
  top: -80px;
}

.shape:last-child {
  background: linear-gradient(to right,hsl(96, 100%, 59%),#31a5df);
  left: -90px;
  bottom: -80px;
}
.mask {
  // background-image: linear-gradient(to right, #8fe451 0%, #0f9d58 100%);
  opacity: 0.7;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .col {
    flex: 0 0 35%;
    height: 400px;
    right: 9%;
    background-color: rgb(255, 255, 255,0.7);
    border-radius: 10px;
    z-index: 10;
    text-align: center;
  }
  form{
      width: 600px;
      height: 500px;
      background-color: rgba(25, 174, 215, 0.13);
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
      padding: 35px 35px;
  }

  form * {
      font-family: 'Poppins', sans-serif;
      color: #ffffff;
      letter-spacing: 0.5px;
      outline: none;
      border: none;
  }

  form h3 {
      font-size: 24px;
      font-weight: 500;
      line-height: 42px;
      text-align: center;
  }

  label {
      display: block;
      margin-top: 30px;
      font-size: 16px;
      font-weight: 500;
  }

  input {
      display: block;
      height: 50px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.07);
      border-radius: 3px;
      padding: 0 10px;
      margin-top: 8px;
      font-size: 14px;
      font-weight: 300;
  }

  ::placeholder {
      color: #e5e5e5;
  }

  .btn {
      margin-top: 50px;
      width: 45%;
      background-color: rgb(0, 81, 255);
      color: #eaf0fb;
      text-align: center;
      padding: 15px 0;
      font-size: 18px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
  }
  .btn:hover {
      background-color: rgba(255, 255, 255, 0.47);
  }
}
</style>
