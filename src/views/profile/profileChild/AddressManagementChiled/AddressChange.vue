<template>
  <div class="address-change">
    <div class="nav">
      <nar-bar leftArrow leftText="返回" title="编辑地址" />
    </div>
    <div class="address-goods-box">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="姓名"
          label="姓名"
          placeholder="收货人姓名"
          :rules="[
            { required: true, message: '请填写用户名' },
            { pattern: nameReg, message: '姓名格式不正确' },
          ]"
        />
        <van-field
          v-model="phone"
          name="电话"
          label="电话"
          placeholder="收货人手机号"
          :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: phoneReg, message: '手机格式不正确' },
          ]"
        />
        <van-field
          readonly
          clickable
          name="area"
          :value="value"
          label="地区"
          placeholder="选择省/市/区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirm"
            @cancel="showArea = false"
          />
        </van-popup>
        <van-field
          v-model="address"
          name="详细地址"
          label="详细地址"
          placeholder="街道门牌、楼层房间等信息"
          :rules="[
            { required: true, message: '请填写详情地址' },
            { pattern: addressReg, message: '地址不正确' },
          ]"
        />
        <van-field
          v-model="office"
          name="邮政编码"
          label="邮政编码"
          placeholder="邮政编码"
          :rules="[{ required: true, message: '请填写邮政编码' }]"
        />
      </van-form>
    </div>
    <div class="switch">
      <van-field name="switch" label="设置为默认收货地址">
        <template #input>
          <van-switch v-model="switchChecked" size="25" />
        </template>
      </van-field>
    </div>
    <div class="submit">
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" @click="sub"
          >保存地址</van-button
        >
      </div>
    </div>
    <div class="submit active">
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" @click="del"
          >删除地址</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import NarBar from 'components/common/NavBar/NarBar.vue'
import { areaList } from '@vant/area-data';
import { getEditAddress, getDeleteAddress } from "network/menu"
import { mapState } from "vuex"

export default {
  name: 'AddressChnage',
  data() {
    return {
      username: '',
      phone: '',
      address: '',
      office: '',
      isDefault: '',
      code: '',
      info: {
        name: "姓名",
        tel: "电话",
        province: "省份",
        city: "市",
        county: " 区县",
        addressDetail: "详细地址",
        areaCode: "地区编号",
        postalCode: " 邮政编码",
        isDefault: "默认地址",
        aid: '',
      },
      infe: {
        aid: '',
      },
      timer: null,
      areaArray: [],

      areaList,
      value: '',
      showArea: false,

      switchChecked: false,

      //验证姓名
      nameReg: /^[\u4e00-\u9fa5]{2,6}$/,
      //验证手机号
      phoneReg: /^1[3-9]\d{9}$/,
      //验证地址
      addressReg: /^.+(路|街|里).+号.+(室|户).*$/,//A区A路A号楼A单元A室

      //验证邮政
      officeReg: /[1-9]d{5}(?!d)/,
    };

  },
  computed: {
    ...mapState({
      addressObj: state => state.addressObj
    })
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
    sub() {
      if (this.switchChecked) {
        this.isDefault = 1
      } else {
        this.isDefault = 0
      }
      this.areaArray = this.value.split("/")

      let arr = this.areaList.county_list;
      for (let i in arr) {
        if (arr[i] === "东城区") {
          this.code = i;
        }
      }

      this.info.name = this.username;
      this.info.tel = this.phone;
      this.info.province = this.areaArray[0];
      this.info.city = this.areaArray[1];
      this.info.county = this.areaArray[2];
      this.info.addressDetail = this.address;
      this.info.areaCode = this.code;
      this.info.postalCode = this.office;
      this.info.isDefault = this.isDefault;
      console.log(this.info);
      this.getEditAddress(this.info)



    },
    del() {
      this.$dialog.alert({
        message: "确认删除该地址吗", //改变弹出框的内容
        showCancelButton: true //展示取水按钮
      })
        .then(() => { //点击确认按钮后的调用
          this.infe.aid = this.info.aid
          this.getDeleteAddress(this.infe)
        })
        .catch(() => { //点击取消按钮后的调用

        })

    },
    getDeleteAddress(aids) {
      getDeleteAddress(aids).then(res => {
        if (res.data.code == 10000) {
          this.$toast(res.data.msg + "正在返回上一级...")
          clearTimeout(this.timer)
          this.timer = null
          this.timer = setTimeout(() => {
            this.$router.go(-1);
          }, 2000)

        }

      })
    },

    getEditAddress(info) {
      getEditAddress(info).then(res => {
        if (res.data.code === 30000) {
          this.$toast(res.data.msg)

        }
      })
    },
    onConfirm(values) {
      this.value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
      this.showArea = false;
    },
    change() {
      this.info.aid = this.$route.params.aid
      this.username = this.addressObj.name;
      this.phone = this.addressObj.tel;
      this.address = this.addressObj.addressDetail;
      this.office = this.addressObj.postalCode;
      if (this.addressObj.isDefault == 1) {
        this.switchChecked = true
      } else {
        this.switchChecked = false
      }
      this.value = `${this.addressObj.province}/${this.addressObj.city}/${this.addressObj.county}`
    }
  },
  mounted() {
  },

  activated() {
    this.change()

  },
  components: {
    NarBar,
  }
}
</script>

<style lang="scss" scoped>
.address-change {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  .address-goods-box {
    position: relative;
    top: 20px;
    width: 96%;
    min-height: 200px;
    margin: auto;
    border-radius: 10px 10px 0 0;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
  }
  .switch {
    position: relative;
    top: 40px;
    width: 96%;
    margin: auto;
    border-radius: 10px 10px 0 0;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    ::v-deep.van-cell.van-field {
      align-items: center;
      span {
        display: inline-block;
        width: 200px;
      }
    }
    ::v-deep.van-field__control--custom {
      width: 50px;
      position: absolute;
      right: 5px;
    }
  }
  .active {
    ::v-deep.van-button {
      background: #fff;
      color: #000;
    }
  }
  .submit {
    position: relative;
    top: 60px;
  }
}
</style>