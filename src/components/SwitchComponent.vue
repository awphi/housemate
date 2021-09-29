<template>
  <div class="text-header border-b-2 border-border flex mb-2 p-2 h-16 text-xl">
    <div class="flex-1 flex justify-center flex-col">
      <p>{{ this.switch.name }}</p>
      <small v-if="this.switch.enabled" class="text-xs opacity-50">{{
        this.smallText
      }}</small>
    </div>

    <div class="flex flex-col">
      <Switch
        :checked="this.switch.enabled"
        class="switch-base w-20 h-10 relative inline-flex items-center"
        :class="this.switch.enabled ? 'bg-green-600' : 'bg-gray-700'"
        @click="onSwitchToggle"
      >
        <span className="sr-only">Toggle {{ this.switch.name }}</span>
        <span
          v-if="!this.switch.timed"
          aria-hidden="true"
          :class="this.switch.enabled ? 'translate-x-11' : 'translate-x-1'"
          class="h-8 w-8 rounded-full bg-white shadow-lg switch-ball-base"
        />
        <svg
          v-else
          class="h-8 w-8 switch-ball-base"
          :class="this.switch.enabled ? 'translate-x-11' : 'translate-x-1'"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="11"
            stroke="currentColor"
            stroke-width="2"
          ></circle>
          <path
            stroke="currentColor"
            stroke-width="2"
            d="M12 5V12L16 16"
          ></path>
        </svg>
      </Switch>
    </div>
    <TimePickerModal
      :isOpen="isModalOpen"
      @close="modalClosed"
      @confirm="modalConfirmed"
    />
  </div>
</template>

<script>
import { Switch } from "@headlessui/vue";
import { getDatabase, ref, update } from "firebase/database";
import { mapGetters } from "vuex";
import TimePickerModal from "./TimePickerModal.vue";

export default {
  data() {
    return {
      awaitingTimerLength: false,
      commit: null,
      isModalOpen: false,
      timerModalLength: 0,
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
    modalClosed() {
      this.isModalOpen = false;
      this.commit = null;
    },
    modalConfirmed(secs) {
      if (secs <= 0) {
        this.modalClosed();
        return;
      }

      this.commit[`switches/${this.index}/timer_start`] = Math.round(
        Date.now() / 1000
      );
      this.commit[`switches/${this.index}/timer_length`] = secs;

      this.updateRemote(this.commit);
      this.modalClosed();
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
    Switch,
    TimePickerModal,
  },
  props: ["index", "switch", "now"],
};
</script>
