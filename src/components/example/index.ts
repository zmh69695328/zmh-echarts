/* eslint-disable vue/multi-word-component-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  defineComponent,
  shallowRef,
  toRefs,
  watch,
  computed,
  inject,
  onMounted,
  onBeforeUnmount,
  h,
  nextTick,
  watchEffect,
  getCurrentInstance,
  Vue2,
  type PropType,
  type InjectionKey
} from "vue-demi";
import { init as initChart } from "echarts/core";
import type {
  EChartsType,
  EventTarget,
  Option,
  Theme,
  ThemeInjection,
  InitOptions,
  InitOptionsInjection,
  UpdateOptions,
  UpdateOptionsInjection,
  Emits
} from "../../types";
import {
  usePublicAPI,
  useAutoresize,
  autoresizeProps,
  useLoading,
  loadingProps
} from "../../composables";
import { omitOn, unwrapInjected } from "../../utils";
import { register, TAG_NAME, type EChartsElement } from "../../wc";
import "./style.css";
import PuiEcharts from "../../ECharts";

export default defineComponent({
  name: "example",
  props: {
    id: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: true
    },
    desc: String,
    split: Boolean
  },
  emits: {} as unknown as Emits,
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    const nonEventAttrs = computed(() => omitOn(attrs));

    return {
      nonEventAttrs
    };
  },
  render() {
    // Vue 3 and Vue 2 have different vnode props format:
    // See https://v3-migration.vuejs.org/breaking-changes/render-function-api.html#vnode-props-format
    const attrs = (
      Vue2 ? { attrs: this.nonEventAttrs } : { ...this.nonEventAttrs }
    ) as any;
    attrs.ref = "example";
    attrs.class = attrs.class ? ["example"].concat(attrs.class) : "example";
    const { default: defaultSlot = () => h("div") } = this.$slots;
    const title = this.$props.title;
    return h("div", [
      h("h3", [
        h("a", Vue2 ? { domProps: { innerHTML: title } } : { innerHTML: title })
      ]),
      h("section", [
        h("figure", { class: "fig hero" }, Vue2 ? defaultSlot : [defaultSlot()])
      ])
    ]);
  }
});
