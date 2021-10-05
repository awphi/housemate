<template>
  <div class="switch-box-base border-b-2">
    <div class="flex-1 flex justify-center flex-col">
      <p>{{ this.switch.name }}</p>
      <small v-if="this.switch.enabled" class="text-xs opacity-50">{{
        this.smallText
      }}</small>
    </div>

    <div class="flex flex-col">
      <styled-switch
        :enabled="this.switch.enabled"
        :timed="this.switch.timed"
        :name="this.switch.name"
        @toggle="onSwitchToggle"
      />
    </div>
    <modal v-if="this.switch.timed" v-model:isOpen="isModalOpen">
      <time-picker @confirm="timerLengthConfirmed" />
    </modal>
  </div>
</template>

<script>
import { getDatabase, ref, update } from "firebase/database";
import { mapGetters } from "vuex";
import TimePicker from "./TimePicker.vue";
import Modal from "./Modal.vue";
import StyledSwitch from "./StyledSwitch.vue";

export default {
  data() {
    return {
      commit: null,
      isModalOpen: false,
    };
  },
  computed: {
    timeLeft() {
      const a = this.switch.timer_start + this.switch.timer_length - this.now;
      if (a <= 0 && this.switch.enabled) {
        this.onSwitchToggle();
      }
      return a;
    },
    smallText() {
      var base = this.switch.lastEnabled;
      if (this.switch.timed) {
        base += ` | ${this.toHHMMSS(this.timeLeft)} remaining`;
      }

      return base;
    },
  },
  methods: {
    ...mapGetters(["getSelectedHouse"]),
    timerLengthConfirmed(secs) {
      if (secs <= 0) {
        this.isModalOpen = false;
        return;
      }

      this.commit[`switches/${this.index}/timer_start`] = Math.round(
        Date.now() / 1000
      );
      this.commit[`switches/${this.index}/timer_length`] = secs;

      this.updateRemote(this.commit);
      this.isModalOpen = false;
    },
    onSwitchToggle() {
      const data = {};
      const b = !this.switch.enabled;
      data[`switches/${this.index}/enabled`] = b;

      if (b) {
        data[`switches/${this.index}/lastEnabled`] = this.$store.state.username;
      }

      if (this.switch.timed && b) {
        this.commit = data;
        this.isModalOpen = true;
      } else {
        this.updateRemote(data);
      }
    },
    updateRemote(data) {
      const db = getDatabase();
      update(ref(db, this.getSelectedHouse()), data);
    },
    toHHMMSS(sec_num) {
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    },
  },
  components: {
    TimePicker,
    Modal,
    StyledSwitch,
  },
  props: ["index", "switch", "now"],
};
</script>
