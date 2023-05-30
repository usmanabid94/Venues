import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";

import * as Actions from "../../store/actions/allActions";
import * as Helpers from "../../helpers/Exporter";
import { WP as wp } from "../../helpers/Exporter";
import { connect } from "react-redux";
import { styles } from "./Mapviewlist.style";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { FlatList } from "react-native-gesture-handler";

class Mapviewlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultRegion: {
        latitude: 25.2009, //39.743943,
        longitude: 55.250585, //-105.020089,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      maplist: [],
      showBottom: false,
      currentItem: null,
      count: 0,
      currentPage: 0,
      totalPages: 0,
      updatedVenues: [],
      scrollOffset: 0,
    };
    this.scrollRef = React.createRef();
  }
  componentDidMount() {
    this.fetchVenues();
  }
  loadMore = () => {
    const { currentPage, totalPages } = this.state;

    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      this.setState({ currentPage: nextPage }, () => {
        this.fetchmoreVenues(nextPage);
      });
    } else {
      console.log("checkPages", this.state.currentPage);
      console.log("checkTPages", this.state.totalPages);
    }
  };
  onRefresh = () => {
    const { currentPage, totalPages } = this.state;

    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      this.setState({ currentPage: nextPage }, () => {
        this.fetchmoreVenues(nextPage);
      });
    }
  };
  fetchmoreVenues = (page) => {
    const apiUrl = `https://staging.letswork.io/api/branch/newlisting/?p=${page}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Process the response data
        console.log("fetchmore", data);
        this.props.updateVenues(data);
        this.props.updateVenuesRes(data);
        this.setState({ count: data.total_count });
        this.setState({ currentPage: data.current_page });
        this.setState({ totalPages: data.total_pages });
        // Get the current scroll offset
        const currentOffset = this.scrollRef.current
          ? this.scrollRef.current._listRef._scrollMetrics.offset
          : 0;
        this.setState({
          updatedVenues: [
            ...this.state.updatedVenues,
            ...this.props.venueLists.results,
          ],
        });
        // Restore the scroll position
        if (this.scrollRef.current) {
          this.scrollRef.current.scrollToOffset({
            offset: currentOffset,
            animated: false,
          });
        }
        const loadmoreupdatedVenues = [
          ...this.props.venueLists.results,
          ...data.results,
        ];

        var maplistx = loadmoreupdatedVenues.filter(
          (item) => item.lat != null && item.lat != ""
        );
        this.setState({ maplist: maplistx });
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  fetchVenues = () => {
    fetch("https://cx6bmbl1e3.execute-api.us-east-2.amazonaws.com/venues")
      .then((response) => response.json())
      .then((data) => {
        // Process the response data
        console.log(data);
        this.props.updateVenues(data);
        this.props.updateVenuesRes(data);
        this.setState({ count: data.total_count });
        this.setState({ currentPage: data.current_page });
        this.setState({ totalPages: data.total_pages });
        this.setState({ updatedVenues: data.results });
        var maplistx = data.results.filter(
          (item) => item.lat != null && item.lat != ""
        );
        this.setState({ maplist: maplistx });
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  markerPressed = (item) => {
    this.setState({ currentItem: item, showBottom: true });
  };

  renderItem = ({ item, index }) => {
    // List item component code
    return (
      <View
        style={{
          height: wp(44),
          width: wp("95"),
          alignSelf: "center",
          borderWidth: 1,
          borderColor: Helpers.Theme.blueBtnBorder,
          borderRadius: wp(1.3),
          backgroundColor: Helpers.Theme.light,
          flexDirection: "row",
          margin: wp(2),
          paddingLeft: wp(2),
        }}
      >
        <TouchableOpacity
          onPress={() => console.log("listingdetail", item.id)}
          style={{
            height: wp(40),
            width: "40%",
            marginTop: wp("2"),
            borderTopLeftRadius: wp(1.3),
            borderBottomLeftRadius: wp(1.3),
          }}
        >
          <Image
            source={{ uri: item.thumbnail }}
            style={Helpers.GLOBAL_SHEET.maxHW}
          />

          {item.is_premium == "1"
            ? [
                <Image
                  source={Helpers.Images.featuredBadge}
                  style={styles.listBtn_leftVw_featureImg}
                />,
              ]
            : []}
        </TouchableOpacity>

        <View style={styles.listBtn_rightVw}>
          <TouchableOpacity style={styles.listBtn_rightVw_heartBtn}>
            <Image
              source={
                item.is_favorite
                  ? Helpers.Images.heartfilled
                  : Helpers.Images.heartEmpty
              }
              style={[
                styles.listBtn_rightVw_heartBtn_Img,
                item.isfav ? { tintColor: Helpers.Theme.red } : {},
              ]}
            />
          </TouchableOpacity>

          <Text style={[Helpers.Typography.four, { color: "red" }]}>
            {item.main_price}
            <Text
              style={[Helpers.Typography.three, { color: Helpers.Theme.black }]}
            >
              {item.is_branch_open}
            </Text>
          </Text>
          <Text
            style={[Helpers.Typography.four, styles.listBtn_rightVw_titleTxt]}
          >
            {item.name}
          </Text>
          {item.address != null
            ? [
                <View style={styles.listBtn_rightVw_addressVw}>
                  <Image
                    source={Helpers.Images.pinpoint}
                    style={{
                      height: wp(2.5),
                      width: wp(2.5),
                      tintColor: "red",
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={[
                      Helpers.Typography.three,
                      {
                        color: Helpers.Theme.darkgrey,
                        width: wp(45),
                        marginLeft: wp(1),
                      },
                    ]}
                  >
                    {item.address}
                  </Text>
                </View>,
              ]
            : []}

          <View style={styles.listBtn_rightVw_bedbathVw}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={Helpers.Images.tag}
                style={[
                  styles.listBtn_rightVw_bedbathVw_Img,
                  { tintColor: "red" },
                ]}
              />
              <Text
                style={[
                  Helpers.Typography.three,
                  { color: Helpers.Theme.darkgrey },
                ]}
              >
                {item.total_capacity}
              </Text>
            </View>
            <View style={styles.listBtn_rightVw_bedbathVw_twoVws}>
              <Image
                source={Helpers.Images.tick}
                style={[
                  styles.listBtn_rightVw_bedbathVw_Img,
                  { tintColor: "red" },
                ]}
              />
              <Text
                style={[
                  Helpers.Typography.three,
                  styles.listBtn_rightVw_bedbathVw_bedsTxt,
                ]}
              >
                {item.spotLeft}
              </Text>
            </View>
            <View style={styles.listBtn_rightVw_bedbathVw_twoVws}>
              <Image
                source={Helpers.Images.clock}
                style={[
                  styles.listBtn_rightVw_bedbathVw_Img,
                  { tintColor: "red" },
                ]}
              />

              <Text
                style={[
                  Helpers.Typography.three,
                  styles.listBtn_rightVw_bedbathVw_bedsTxt,
                ]}
              >
                {item.timings}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  handleScrollToIndexFailed = () => {
    setTimeout(() => {
      if (this.scrollRef.current) {
        this.scrollRef.current.scrollToIndex({ index: this.state.updatedVenues.length - 1, animated: false, viewPosition: 0 });
      }
    }, 200);
  };
  render() {
    console.log("this.state.updatedVenues", this.state.updatedVenues);
    return (
      <View style={Helpers.GLOBAL_SHEET.maxHWCC}>
        {this.props.loading ? (
          <ActivityIndicator color={"blue"} size={"small"} />
        ) : (
          <>
            {/* MapStart */}
            <MapView
              onPress={() => this.setState({ showBottom: false })}
              initialRegion={
                this.state.maplist.length > 0
                  ? {
                      latitude: parseFloat(this.state.maplist[0].lat),
                      longitude: parseFloat(this.state.maplist[0].lon),
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }
                  : this.state.defaultRegion
              }
              style={[
                Helpers.GLOBAL_SHEET.maxHW,
                { height: Helpers.HP("70%") },
              ]}
            >
              {this.state.maplist.length > 0
                ? [
                    this.props.venueLists.results.map((item) => {
                      return (
                        <Marker
                          key={item.id}
                          coordinate={{
                            latitude: parseFloat(item.lat),
                            longitude: parseFloat(item.lon),
                          }}
                          onPress={() => this.markerPressed(item)}
                        >
                          <Image
                            source={Helpers.Images.customMarker}
                            style={{
                              height: Helpers.WP(12),
                              width: Helpers.WP(12),
                            }}
                          />
                        </Marker>
                      );
                    }),
                  ]
                : []}
            </MapView>
            {/* map End */}
            <View style={{ width: wp("100"), margin: wp("1") }}>
              {/*Venue count Start  */}
              <Text>
                {"Count"}:{this.state.count}
              </Text>
              {/* Venue count Ends */}
            </View>
            {this.state.showBottom
              ? [
                  <View style={styles.listBtn}>
                    <TouchableOpacity
                      onPress={() =>
                        console.log("listingdetail", this.state.currentItem.id)
                      }
                      style={styles.listBtn_leftVw}
                    >
                      <Image
                        source={{ uri: this.state.currentItem.thumbnail }}
                        style={Helpers.GLOBAL_SHEET.maxHW}
                      />

                      {this.state.currentItem.is_premium == "1"
                        ? [
                            <Image
                              source={Helpers.Images.featuredBadge}
                              style={styles.listBtn_leftVw_featureImg}
                            />,
                          ]
                        : []}
                    </TouchableOpacity>

                    <View style={styles.listBtn_rightVw}>
                      <TouchableOpacity style={styles.listBtn_rightVw_heartBtn}>
                        <Image
                          source={
                            this.state.currentItem.is_favorite
                              ? Helpers.Images.heartfilled
                              : Helpers.Images.heartEmpty
                          }
                          style={[
                            styles.listBtn_rightVw_heartBtn_Img,
                            this.state.currentItem.isfav
                              ? { tintColor: Helpers.Theme.red }
                              : {},
                          ]}
                        />
                      </TouchableOpacity>

                      <Text style={[Helpers.Typography.four, { color: "red" }]}>
                        {this.state.currentItem.main_price}
                        <Text
                          style={[
                            Helpers.Typography.three,
                            { color: Helpers.Theme.black },
                          ]}
                        >
                          {this.state.currentItem.is_branch_open}
                        </Text>
                      </Text>
                      <Text
                        style={[
                          Helpers.Typography.four,
                          styles.listBtn_rightVw_titleTxt,
                        ]}
                      >
                        {this.state.currentItem.name}
                      </Text>
                      {this.state.currentItem.address != null
                        ? [
                            <View style={styles.listBtn_rightVw_addressVw}>
                              <Image
                                source={Helpers.Images.pinpoint}
                                style={{
                                  height: wp(2.5),
                                  width: wp(2.5),
                                  tintColor: "red",
                                  resizeMode: "contain",
                                }}
                              />
                              <Text
                                style={[
                                  Helpers.Typography.three,
                                  {
                                    color: Helpers.Theme.darkgrey,
                                    width: wp(45),
                                    marginLeft: wp(1),
                                  },
                                ]}
                              >
                                {this.state.currentItem.address}
                              </Text>
                            </View>,
                          ]
                        : []}

                      <View style={styles.listBtn_rightVw_bedbathVw}>
                        <View style={{ flexDirection: "row" }}>
                          <Image
                            source={Helpers.Images.tag}
                            style={[
                              styles.listBtn_rightVw_bedbathVw_Img,
                              { tintColor: "red" },
                            ]}
                          />
                          <Text
                            style={[
                              Helpers.Typography.three,
                              { color: Helpers.Theme.darkgrey },
                            ]}
                          >
                            {this.state.currentItem.total_capacity}
                          </Text>
                        </View>
                        <View style={styles.listBtn_rightVw_bedbathVw_twoVws}>
                          <Image
                            source={Helpers.Images.tick}
                            style={[
                              styles.listBtn_rightVw_bedbathVw_Img,
                              { tintColor: "red" },
                            ]}
                          />
                          <Text
                            style={[
                              Helpers.Typography.three,
                              styles.listBtn_rightVw_bedbathVw_bedsTxt,
                            ]}
                          >
                            {this.state.currentItem.spotLeft}
                          </Text>
                        </View>
                        <View style={styles.listBtn_rightVw_bedbathVw_twoVws}>
                          <Image
                            source={Helpers.Images.clock}
                            style={[
                              styles.listBtn_rightVw_bedbathVw_Img,
                              { tintColor: "red" },
                            ]}
                          />

                          <Text
                            style={[
                              Helpers.Typography.three,
                              styles.listBtn_rightVw_bedbathVw_bedsTxt,
                            ]}
                          >
                            {this.state.currentItem.timings}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>,
                ]
              : [
                  this.state.maplist.length > 0 ? (
                    <FlatList
                      ref={this.scrollRef}
                      data={this.state.updatedVenues} //this.props.venueLists.results}
                      keyExtractor={(item, index) => index.toString()}
                      key={(item) => item.id}
                      horizontal={true}
                      pagingEnabled={true}
                      onEndReached={() => this.loadMore()}
                      onRefresh={() => this.onRefresh()}
                      renderItem={this.renderItem}
                      onEndReachedThreshold={0.1} // Adjust this threshold to trigger pagination appropriately
                      initialScrollIndex={this.state.updatedVenues.length - 1}
                      onScrollToIndexFailed={this.handleScrollToIndexFailed}
                    />
                  ) : (
                    <></>
                  ),
                ]}
          </>
        )}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    loading: state.search.loading,
    venueLists: state.search.venues,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateVenues: (params) => dispatch(Actions.updateVenues(params)),
    updateVenuesRes: (params) => dispatch(Actions.updateResVenues(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Mapviewlist);
