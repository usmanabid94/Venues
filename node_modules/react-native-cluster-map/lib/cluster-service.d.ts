import { ReactElement } from 'react';
import SuperCluster from 'supercluster';
import { Feature, Point } from 'geojson';
import { Region } from 'react-native-maps';
export declare const INCREASE_RATE = 2;
export declare class ClusterService {
    private superCluster;
    private markers;
    createClusters(propsOptions: object, children: ReactElement[] | ReactElement): void;
    getCurrentZoom: (region: Region) => number;
    getClusterChildren: (id: number) => (Feature<Point, SuperCluster.AnyProps> | Feature<Point, SuperCluster.ClusterProperties & SuperCluster.AnyProps>)[];
    getClustersOptions: (region: Region, currentZoom: number) => {
        markers: (Feature<Point, SuperCluster.AnyProps> | Feature<Point, SuperCluster.ClusterProperties & SuperCluster.AnyProps>)[];
        zoom: number;
    };
    expandCluster: (clusterId: number) => Region;
    private createGeoJsonFeature;
    private getBoundsZoomLevel;
    private regionTobBox;
    private getDimensions;
    private getClusterMarkers;
    private getMarkersRegion;
    private getMarkersCoordinates;
}
export declare const clusterService: ClusterService;
