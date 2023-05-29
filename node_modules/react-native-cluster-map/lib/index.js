'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var reactNative = require('react-native');
var MapView = require('react-native-maps');
var MapView__default = _interopDefault(MapView);
var isEqual = _interopDefault(require('lodash.isequal'));
var SuperCluster = _interopDefault(require('supercluster'));

const ClusterMarker = (props) => {
    const { coordinates, pointCount, children, onClusterMarkerPress, clusterId, clusterMarkerProps, } = props;
    if (pointCount < 0) {
        return null;
    }
    const onClusterPress = (e) => {
        const { coordinate } = e.nativeEvent;
        onClusterMarkerPress({ clusterId, coordinate });
    };
    const [longitude, latitude] = coordinates;
    return (React.createElement(MapView.Marker, Object.assign({ coordinate: { longitude, latitude }, onPress: onClusterPress }, clusterMarkerProps), children || (React.createElement(reactNative.View, { style: styles.clusterBox },
        React.createElement(reactNative.Text, { style: styles.clusterText }, pointCount)))));
};
const styles = reactNative.StyleSheet.create({
    clusterBox: {
        height: 60,
        width: 60,
        borderWidth: 2,
        borderColor: '#5694f7',
        backgroundColor: '#fff',
        borderRadius: 31,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clusterText: {
        fontSize: 19,
        color: '#5694f7',
    },
});

const PACKAGE_PROPS = [
    'isClusterExpandClick',
    'superClusterOptions',
    'renderClusterMarker',
    'style',
    'onMapReady',
    'onRegionChangeComplete',
    'region',
    'onClusterClick',
    'priorityMarker',
    'onZoomChange',
];
const formatChildren = (children, isInCluster) => {
    if (!children) {
        return [];
    }
    const childrenList = !Array.isArray(children) ? [children] : children;
    return childrenList
        .flat(1)
        .filter((child) => isInCluster && child.props
        ? child.props.isOutsideCluster !== true
        : child.props.isOutsideCluster);
};
const serializeProps = (userProps) => {
    return Object.keys(userProps).reduce((newProps, propKey) => {
        if (PACKAGE_PROPS.find((prop) => prop === propKey)) {
            return newProps;
        }
        return Object.assign({}, newProps, { [propKey]: userProps[propKey] });
    }, {});
};
const makeId = () => {
    let id = '';
    const possibleChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
        id += possibleChar.charAt(Math.floor(Math.random() * possibleChar.length));
    }
    return id;
};
const calculateDelta = (x, y) => x > y ? x - y : y - x;
const calculateAverage = (...args) => {
    const argList = [...args];
    if (!argList.length) {
        return 0;
    }
    return argList.reduce((sum, num) => sum + num, 0) / argList.length;
};

const DEFAULT_SUPERCLUSTER_OPTIONS = {
    radius: 16,
    maxZoom: 15,
    minZoom: 1,
    nodeSize: 16,
};
const INCREASE_RATE = 2;
class ClusterService {
    constructor() {
        this.superCluster = null;
        this.markers = null;
        this.getCurrentZoom = (region) => {
            const bBox = this.regionTobBox(region);
            return this.getBoundsZoomLevel(bBox);
        };
        this.getClusterChildren = (id) => {
            return this.superCluster.getLeaves(id);
        };
        // TODO: Add unit test
        this.getClustersOptions = (region, currentZoom) => {
            const bBox = this.regionTobBox(region);
            const zoom = currentZoom || this.getBoundsZoomLevel(bBox);
            return {
                markers: this.superCluster.getClusters(bBox, zoom),
                zoom,
            };
        };
        // TODO: Add unit test
        this.expandCluster = (clusterId) => {
            const clusterMarkersCoordinates = this.getClusterMarkers(clusterId).map(this.getMarkersCoordinates);
            return this.getMarkersRegion(clusterMarkersCoordinates);
        };
        this.createGeoJsonFeature = (element) => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    element.props.coordinate.longitude,
                    element.props.coordinate.latitude,
                ],
            },
            properties: { element },
        });
        // TODO: Add unit test
        this.getBoundsZoomLevel = (bounds) => {
            const ZOOM_MAX = 20;
            const WORLD_DIM = this.getDimensions();
            function latRad(lat) {
                const sin = Math.sin((lat * Math.PI) / 180);
                const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
                return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
            }
            function zoom(mapPx, worldPx, fraction) {
                return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
            }
            const latFraction = (latRad(bounds[3]) - latRad(bounds[1])) / Math.PI;
            const lngDiff = bounds[2] - bounds[0];
            const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;
            const latZoom = zoom(WORLD_DIM.height, WORLD_DIM.height, latFraction);
            const lngZoom = zoom(WORLD_DIM.width, WORLD_DIM.width, lngFraction);
            return Math.min(latZoom, lngZoom, ZOOM_MAX);
        };
        this.regionTobBox = (region) => {
            const lngD = region.longitudeDelta < 0
                ? region.longitudeDelta + 360
                : region.longitudeDelta;
            return [
                region.longitude - lngD,
                region.latitude - region.latitudeDelta,
                region.longitude + lngD,
                region.latitude + region.latitudeDelta,
            ];
        };
        this.getDimensions = () => {
            return {
                height: reactNative.Dimensions.get('window').height,
                width: reactNative.Dimensions.get('window').width,
            };
        };
        // TODO: Add unit test
        this.getClusterMarkers = (clusterId) => {
            const clusterChildren = this.superCluster.getChildren(clusterId);
            if (clusterChildren.length > 1) {
                return clusterChildren;
            }
            return this.getClusterMarkers(clusterChildren[0].id);
        };
        this.getMarkersRegion = (points) => {
            const coordinates = {
                minX: points[0].latitude,
                maxX: points[0].latitude,
                maxY: points[0].longitude,
                minY: points[0].longitude,
            };
            const { maxX, minX, maxY, minY } = points.reduce((acc, point) => ({
                minX: Math.min(acc.minX, point.latitude),
                maxX: Math.max(acc.maxX, point.latitude),
                minY: Math.min(acc.minY, point.longitude),
                maxY: Math.max(acc.maxY, point.longitude),
            }), Object.assign({}, coordinates));
            const deltaX = calculateDelta(maxX, minX);
            const deltaY = calculateDelta(maxY, minY);
            return {
                latitude: calculateAverage(minX, maxX),
                longitude: calculateAverage(minY, maxY),
                latitudeDelta: deltaX * INCREASE_RATE,
                longitudeDelta: deltaY * INCREASE_RATE,
            };
        };
        this.getMarkersCoordinates = (markers) => {
            const [longitude, latitude] = markers.geometry.coordinates;
            return { longitude, latitude };
        };
    }
    createClusters(propsOptions, children) {
        const options = propsOptions || DEFAULT_SUPERCLUSTER_OPTIONS;
        this.superCluster = new SuperCluster(options);
        this.markers = formatChildren(children, true).map(this.createGeoJsonFeature);
        this.superCluster.load(this.markers);
    }
}
const clusterService = new ClusterService();

const CLUSTER_EXPAND_TIME = 100;
class ClusterMap extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            markers: [],
            isMapLoaded: false,
            currentZoom: null,
        };
        this.onRegionChangeComplete = (region) => {
            const zoom = clusterService.getCurrentZoom(region);
            if (this.state.currentZoom !== zoom) {
                this.setState({
                    currentZoom: zoom,
                });
            }
            if (this.props.onRegionChangeComplete) {
                this.props.onRegionChangeComplete(region);
            }
        };
        this.clusterize = () => {
            const { superClusterOptions, region, children } = this.props;
            clusterService.createClusters(superClusterOptions, children);
            this.generateMarkers(region);
        };
        this.onClusterMarkerPress = (event) => {
            const { isClusterExpandClick, onClusterClick } = this.props;
            const { clusterId } = event;
            if (isClusterExpandClick) {
                const region = clusterService.expandCluster(clusterId);
                this.mapRef.animateToRegion(region, CLUSTER_EXPAND_TIME);
            }
            if (onClusterClick) {
                const clusterChildren = clusterService.getClusterChildren(clusterId);
                onClusterClick(event, clusterChildren);
            }
        };
        this.renderContent = () => {
            return this.renderMarkers().concat(formatChildren(this.props.children, false));
        };
        this.renderMarkers = () => {
            const { markers } = this.state;
            const { renderClusterMarker, clusterMarkerProps } = this.props;
            return markers.map((marker) => {
                const { properties, geometry } = marker;
                const { cluster, element, point_count } = properties;
                const key = makeId();
                if (!cluster && element) {
                    return element;
                }
                return (React.createElement(ClusterMarker, { pointCount: point_count, coordinates: geometry.coordinates, onClusterMarkerPress: this.onClusterMarkerPress, clusterId: marker.properties.cluster_id, clusterMarkerProps: clusterMarkerProps, key: key }, renderClusterMarker && renderClusterMarker({
                    pointCount: point_count, clusterId: marker.properties.cluster_id
                })));
            });
        };
        this.onMapReady = () => {
            this.setState({
                isMapLoaded: true,
            }, () => this.props.onMapReady && this.props.onMapReady());
        };
    }
    render() {
        const { style, region, priorityMarker, provider } = this.props;
        return (React.createElement(MapView__default, Object.assign({}, serializeProps(this.props), { ref: (ref) => (this.mapRef = ref), style: style || styles$1.map, onMapReady: this.onMapReady, initialRegion: region, onRegionChangeComplete: this.onRegionChangeComplete, provider: provider === MapView.PROVIDER_DEFAULT ? null : MapView.PROVIDER_GOOGLE }),
            this.state.isMapLoaded && this.renderContent(),
            priorityMarker ? priorityMarker : null));
    }
    componentDidMount() {
        this.clusterize();
    }
    componentDidUpdate(prevProps, prevState) {
        if (isEqual(this.props.children, prevProps.children) &&
            isEqual(this.state.currentZoom, prevState.currentZoom)) {
            return;
        }
        this.clusterize();
    }
    generateMarkers(region) {
        const { markers, zoom } = clusterService.getClustersOptions(region, this.state.currentZoom);
        if (this.props.onZoomChange) {
            this.props.onZoomChange(zoom);
        }
        this.setState({
            markers,
        });
    }
}
ClusterMap.defaultProps = {
    isClusterExpandClick: true,
};
const styles$1 = reactNative.StyleSheet.create({
    map: Object.assign({}, reactNative.StyleSheet.absoluteFillObject),
});

exports.ClusterMap = ClusterMap;
