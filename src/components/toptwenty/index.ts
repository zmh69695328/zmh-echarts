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
// import theme from "../demo/theme.json";
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
import Example from "../example";
import getData from "./option";
import { merge, sortObject } from "../../utils";
if (Vue2) {
  Vue2.config.ignoredElements.push(TAG_NAME);
}

import { BarChart, LineChart } from "echarts/charts";

import { use, registerTheme } from "echarts/core";
import getTheme from "../theme/theme";
const theme = getTheme();
registerTheme("ovilia-green", theme);
import {
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

use([
  TooltipComponent,
  ToolboxComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  LineChart,
  CanvasRenderer
]);

export default defineComponent({
  name: "toptwenty",
  props: {
    data: Object as PropType<Option>,
    title: String,
    theme: {
      type: [Object, String] as PropType<Theme>
    },
    initOptions: Object as PropType<InitOptions>,
    updateOptions: Object as PropType<UpdateOptions>,
    group: String,
    manualUpdate: Boolean,
    ...autoresizeProps,
    ...loadingProps
  },
  emits: {} as unknown as Emits,
  inheritAttrs: false,
  setup(props, { attrs }) {
    const nonEventAttrs = computed(() => omitOn(attrs));
    console.log("data", props.data);
    const originOption = merge(getData(), props.data || {});
    console.log("originOption", originOption);
    // 修改原对象
    const sortOption = sortObject(originOption, "目标达成率");
    console.log("sortOption", sortOption);
    const option = shallowRef(originOption);
    // console.log(option.value)
    return {
      nonEventAttrs,
      option
    };
  },
  render() {
    // Vue 3 and Vue 2 have different vnode props format:
    // See https://v3-migration.vuejs.org/breaking-changes/render-function-api.html#vnode-props-format
    const attrs = (
      Vue2 ? { attrs: this.nonEventAttrs } : { ...this.nonEventAttrs }
    ) as any;
    attrs.ref = "toptwenty";
    attrs.class = attrs.class ? ["topTwenty"].concat(attrs.class) : "topTwenty";
    const title = this.$props.title;
    return h("div", attrs, [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      h(Example, Vue2 ? { attrs: { title } } : { title }, [
        h(
          PuiEcharts,
          Vue2 ? { attrs: { option: this.option } } : { option: this.option }
        )
      ])
    ]);
  }
});
