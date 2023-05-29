import React from 'react';
import MapView from 'react-native-maps';
import { IClusterMapProps, IClusterMapState } from './typings';
export declare class ClusterMap extends React.PureComponent<IClusterMapProps, IClusterMapState> {
    static defaultProps: Partial<IClusterMapProps>;
    mapRef: MapView;
    state: IClusterMapState;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IClusterMapProps, prevState: IClusterMapState): void;
    private generateMarkers;
    private onRegionChangeComplete;
    private clusterize;
    private onClusterMarkerPress;
    private renderContent;
    private renderMarkers;
    private onMapReady;
}
