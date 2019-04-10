export enum Color {
    green = 'green',
    blue = 'blue'
}

export type Dimension = string; // 连续的， 概念参考 G2 和 Tableau
export type Measure = string; // 离散的
export type Field = string; // 字段，包含 dimension 和 measure

export type GeomType = string; // 几何标记的类型，如 line, point 等
export type GeomAttr = string; // 几何标记的属性，如 color, size 等

export enum AxisType { //  笛卡尔坐标系 x 轴 或 y 轴
    x = 'x',
    y = 'y'
}

export enum DropDownOperation { // 下拉框的操作类型
    remove
}
