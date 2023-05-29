import { ReactElement } from 'react';
import { IClusterMapProps } from './typings';
export declare const formatChildren: (children: ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)> | ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>[], isInCluster: boolean) => any[];
export declare const serializeProps: (userProps: IClusterMapProps) => {};
export declare const makeId: () => string;
export declare const calculateDelta: (x: number, y: number) => number;
export declare const calculateAverage: (...args: number[]) => number;
