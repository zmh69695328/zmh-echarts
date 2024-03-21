import { unref } from "vue-demi";
import type { Injection } from "./types";

type Attrs = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

// Copied from
// https://github.com/vuejs/vue-next/blob/5a7a1b8293822219283d6e267496bec02234b0bc/packages/shared/src/index.ts#L40-L41
const onRE = /^on[^a-z]/;
export const isOn = (key: string): boolean => onRE.test(key);

export function omitOn(attrs: Attrs): Attrs {
  const result: Attrs = {};
  for (const key in attrs) {
    if (!isOn(key)) {
      result[key] = attrs[key];
    }
  }

  return result;
}

export function unwrapInjected<T, V>(
  injection: Injection<T>,
  defaultValue: V
): T | V {
  const value = unref(injection);

  if (value && typeof value === "object" && "value" in value) {
    return value.value || defaultValue;
  }

  return value || defaultValue;
}

//定义一个用于存储键值对的简单对象类型
type SimpleObject = { [key: string]: any };

// Merge a `source` object to a `target` recursively
export const merge = (
  target: SimpleObject,
  source: SimpleObject
): SimpleObject => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && target[key])
      Object.assign(source[key], merge(target[key], source[key]));
  }

  // Join `target` and modified `source`
  Object.assign(target || {}, source);
  return target;
};


type arrSort = {
  name: string;
  [key: string]: any;
}
// 降序排列
export function sortObject(obj: SimpleObject, name: string): SimpleObject {
  const arr : arrSort[] = [];
  // 假设只有一条x轴
  for (let i = 0; i < obj?.xAxis[0]?.data?.length; i++) {
    const tmp = { name: obj?.xAxis[0]?.data[i] };
    obj?.legend?.data?.forEach((item, index) => {
      tmp[item] = obj?.series[index]?.data[i];
    });
    arr.push(tmp);
  }
  // 排序
  arr.sort((a, b) => {
    return b[name] - a[name];
  });

  // 重新赋值
  for (let i = 0; i < arr.length; i++) {
    obj.xAxis[0].data[i] = arr[i].name;
    obj.legend.data.forEach((item, index) => {
      obj.series[index].data[i] = arr[i][item];
    });
  }
  return obj;
}
