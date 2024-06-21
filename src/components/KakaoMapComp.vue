<template>
  <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" :width="1200" :height="600">
    <KakaoMapMarker v-for="program in programAllReadResponse" :key="program.id"
                    :lat="program.latitude"
                    :lng="program.longitude"
                    :clickable="true"
                    @onClickKakaoMapMarker="onClickKakaoMapMarker(program.id)">
    </KakaoMapMarker>
  </KakaoMap>
</template>

<script>
import {useKakao} from 'vue3-kakao-maps/@utils';
import {KakaoMap, KakaoMapMarker} from 'vue3-kakao-maps';
import axios from "axios";

export default {
  name: 'KakaoMapComponent',
  data() {
    return {
      coordinate: {
        lat: 35.8240759101236,
        lng: 128.633555577344,
      },
      radius: 5,
      programAllReadResponse: [],
    };
  },
  methods: {
    getNearByPrograms() {
      axios.get(`${this.$store.state.host}/geometry`, {
        params: {
          radius: this.radius
        },
        headers: {
          Accesstoken: this.$store.state.accessToken,
        }
      }).then((response) => {
        this.programAllReadResponse = response.data.response;
        console.log(this.programAllReadResponse);
      }).catch((error) => {
        console.log('지도 불러오기 오류 ' + error);
      })
    },
    onClickKakaoMapMarker(id) {
      this.$router.push(`/board/${id}`)
    }
  },
  created() {
    useKakao('YOUR_API_KEY');
    this.getNearByPrograms();
  },
  components: {
    KakaoMap,
    KakaoMapMarker
  }
};
</script>

<style scoped>
</style>
