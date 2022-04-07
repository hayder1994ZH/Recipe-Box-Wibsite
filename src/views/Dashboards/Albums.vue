<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12">
           <!-- <Slick >
              <div class="iq-card ">
                <div class="iq-card-body p-0">
                  <div class="iq-thumb">
                    <video controls>
                      <source src="http://localhost:8080/video.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <div class="feature-list text-center">
                    <h6 class="font-weight-600  mb-0">asdsad </h6>
                    <p class="mb-0">test test</p>
                  </div>
                </div>
              </div>
          </Slick> -->
        <div class="iq-card">
          <div class="iq-card-header d-flex justify-content-between">
            <div class="iq-header-title">
              <h4 class="card-title">{{ $t('albums.all_videos') }}</h4>
            </div>
            <div class="d-flex align-items-center iq-view">
              <b class="mb-0 text-primary">
                <!-- <router-link to="/latest">{{ $t('albums.view_more') }}<i class="las la-angle-right"></i></router-link> -->
                </b>
            </div>
          </div>
          <div class="iq-card-body">
            <ul class="list-unstyled row iq-box-hover mb-0">
              <li v-for="(item,index) in videos" :key="index"  class="col-xl-3 col-lg-3 col-md-4 iq-music-box">
                <div class="iq-card">
                  <div class="iq-card-body p-0">
                    <div class="iq-thumb">
                      <div class="iq-music-overlay"></div>
                      <router-link to="/music-player">
                        <img :src="item.imagePosters" class="img-border-radius img-fluid w-100" alt="">
                      </router-link>
                      <div class="overlay-music-icon">
                        <router-link to="/music-player">
                          <i class="las la-play-circle"></i>
                        </router-link>
                      </div>
                    </div>
                    <div class="feature-list text-center">
                      <div class="d-flex justify-content-between">
                      <h6 class="font-weight-600  mb-0">{{ item.title }}</h6>
                       <div class="iq-card-header-toolbar iq-music-drop d-flex align-items-center col-2 col-md-1">
                            <b-dropdown :id="`dropdownMenuButton${index}`" right variant="none" data-toggle="dropdown">
                              <template v-slot:button-content>
                                <span class="text-primary"><i class="ri-more-fill" style="margin-left: -1rem"></i></span>
                              </template>
                              <b-dropdown-item><i class="ri-eye-fill mr-2"></i>{{ $t('dropdown.view') }}</b-dropdown-item>
                              <b-dropdown-item><i class="ri-delete-bin-6-fill mr-2"></i>{{ $t('dropdown.delete') }}</b-dropdown-item>
                              <b-dropdown-item><i class="ri-file-download-fill mr-2"></i>{{ $t('dropdown.download') }}</b-dropdown-item>
                            </b-dropdown>
                       </div>
                      </div>
                      <p class="mb-0">{{ item.details }}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
import { player } from '../../mixins/player-mixin'
import { musics } from '../../StaticData/json/musics'
export default {
  name: 'Albums',
  mixins: [player],
  components: { },
  mounted () {
    core.index()
    this.track = musics[0]
    this.loadTrack()
  },
  data () {
    return {
      videos: []
    }
  },
  beforeMount () {
    this.getVideo()
  },
  methods: {
    beforePrevTrackLoad () {
      this.track = musics[0]
    },
    getVideo () {
      this.axios
        .get('video/client?take=25&skip=0&category_id=1&token=1213435646473452342')
        .then((res) => {
          this.videos = res.data.data.items
        })
        .catch(() => {
        })
    },
    beforeNextTrackLoad () {
      this.track = musics[1]
    }
  }
}
</script>
<style scoped>
.slick-track{
  width: 50rem;
  transform: none !important;
}
</style>
