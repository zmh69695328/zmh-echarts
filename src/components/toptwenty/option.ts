import type { Option } from "../../types";

const option = {
  // backgroundColor: "white",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999"
      }
    }
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: [
      // "Evaporation",
      // "Precipitation",
      // "Temperature",
      "当日回收金额",
      "目标达成率"
    ]
  },
  xAxis: [
    {
      type: "category",
      data: [],
      axisPointer: {
        type: "shadow"
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "金额",
      min: 0,
      max: 200000,
      interval: 20000,
      axisLabel: {
        formatter: "¥ {value}"
      }
    },
    {
      type: "value",
      name: "达成率",
      min: 0,
      max: 200,
      interval: 50,
      axisLabel: {
        formatter: "{value} %"
      }
    }
  ],
  series: [
    {
      name: "当日回收金额",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return (value as number) + "元";
        }
      },
      data: []
    },
    {
      name: "目标达成率",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return (value as number) + "%";
        }
      },
      data: []
    }
  ]
};

export default function getData(): Option {
  return option;
}
