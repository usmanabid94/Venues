import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  TextInput,
  Modal,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";

import * as Actions from "../../store/actions/allActions";
import * as Helpers from "../../helpers/Exporter";
import { WP as wp } from "../../helpers/Exporter";
import { connect } from "react-redux";
// import { styles } from "./Mapviewlist.style";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { styles } from "./Searchlist.style";
import ToggleButton from "./ToggleButton";
import LoginComponent from "../Login/LoginComponent";
// Import the font file
import Carousel from "react-native-snap-carousel";
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
      isModalVisible: false,
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
          height: wp("60"),
          width: "100%",
          alignSelf: "center",
          backgroundColor: Helpers.Theme.light,
          margin: wp(2),
          backgroundColor: "#FFFFFF",
          borderRadius: wp("5"),
          shadowColor: "#000000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <View style={{ width: "100%", height: wp("30") }}>
          <Image
            source={{ uri: item.thumbnail }}
            style={{
              width: "100%",
              height: wp("10"),
              flex: 1,
              borderWidth: 1,
              borderColor: Helpers.Theme.blueBtnBorder,
              borderTopRightRadius: wp(5),
              borderTopLeftRadius: wp(5),
            }}
          />
          <TouchableOpacity style={styles.listBtn_rightVw_heartBtn}>
            <Image
              source={
                item.is_favorite
                  ? Helpers.Images.heartfilled
                  : Helpers.Images.heartEmpty
              }
              style={[
                styles.listBtn_rightVw_heartBtn_Img,
                item.isfav
                  ? { tintColor: Helpers.Theme.red }
                  : { tintColor: "#fff" },
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: wp("3"), justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              bottom: wp("1"),
            }}
          >
            <Text
              style={{
                width: wp("40"),
                color: "#242424",
                fontSize: wp("4.5"),
                fontWeight: "bold",
                fontFamily: "BrandonText-Bold",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
            <Text
              style={{
                color: "green",
                fontWeight: "bold",
                fontSize: wp("3.4"),
              }}
            >
              {item.is_branch_open}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: "#999999",
                fontWeight: "bold",
                fontSize: wp("3"),
                marginBottom: wp("8"),
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.address}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                color: Helpers.Theme.black,
                fontWeight: "bold",
                fontFamily: "BrandonText-Bold",
              }}
            >
              {item.branch_cost} ({item.credits_required} credits)
            </Text>

            <Text
              style={{
                color: Helpers.Theme.light,
                borderRadius: wp("5"),
                backgroundColor: "#3078ff",
                fontWeight: "bold",
                fontSize: wp("3"),
                paddingTop: wp("1"),
                paddingBottom: wp("1"),
                paddingRight: wp("5"),
                paddingLeft: wp("5"),
              }}
              onPress={this.toggleModal}
            >
              Buy Credits
            </Text>
          </View>
        </View>
      </View>
    );
  };
  handleScrollToIndexFailed = () => {
    setTimeout(() => {
      if (this.scrollRef.current) {
        this.scrollRef.current.scrollToIndex({
          index: this.state.updatedVenues.length - 1,
          animated: false,
          viewPosition: 0,
        });
      }
    }, 200);
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  };
  render() {
    console.log("this.state.updatedVenues", this.state.updatedVenues);
    const { isModalVisible } = this.state;

    const horizontalMargin = 1;
    const slideWidth = 300;

    const sliderWidth = Dimensions.get("window").width;
    const itemWidth = slideWidth + horizontalMargin * 2;
    const windowWidth = Dimensions.get("window").width;
    console.log('this.state.showBottom',this.state.showBottom)

    return (
      <View
        style={[
          Helpers.GLOBAL_SHEET.maxHWC,
          styles.container,
          {
            shadowColor: "#000000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4, //'#d8d8d8',
          },
        ]}
      >
        {this.props.loading ? (
          <ActivityIndicator color={"blue"} size={"small"} />
        ) : (
          <>
            {/* Header start */}
            <View
              style={[
                styles.mainHeader,
                styles.boxWithShadow,
                {
                  padding: wp("2"),
                  paddingBottom: wp("9"),
                  shadowColor: "#000000",
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 4,
                },
              ]}
            >
              <View
                style={[
                  styles.header,
                  // styles.secondpartHeader,
                  { justifyContent: "space-between", paddingStart: wp("2") },
                ]}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#3078ff",
                    borderRadius: wp("10"),
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                  onPress={this.toggleModal}
                >
                  <Text
                    style={[
                      Helpers.Typography.four,
                      styles.secondpartHeader_txtVw_first,
                      {
                        color: "#fff",
                        fontFamily: "BrandonText-Regular",
                        fontWeight: "bold",
                        paddingTop: wp("2"),
                        paddingBottom: wp("2"),
                        paddingLeft: wp("4"),
                        paddingRight: wp("4"),
                      },
                    ]}
                  >
                    Get a credit plan
                  </Text>
                </TouchableOpacity>

                <View style={styles.secondpartHeader_BtnVw}>
                  <TouchableOpacity
                    onPress={() => console.log("no")}
                    style={styles.secondpartHeader_BtnVw_firstBtn}
                  >
                    <Image
                      source={Helpers.Images.heartEmpty}
                      style={styles.secondpartHeader_BtnVw_firstBtn_Img}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => console.log("no")}
                    style={styles.secondpartHeader_BtnVw_firstBtn}
                  >
                    <Image
                      source={Helpers.Images.list}
                      style={styles.secondpartHeader_BtnVw_firstBtn_Img}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => console.log("no")}
                    style={styles.secondpartHeader_BtnVw_firstBtn}
                  >
                    <Image
                      source={Helpers.Images.filter}
                      style={styles.secondpartHeader_BtnVw_firstBtn_Img}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  height: wp("10"),
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  paddingTop: wp("5"),
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderColor: "#e5e7eb",
                    borderRadius: wp("8"),
                    borderWidth: wp("0.3"),
                    margin: wp("2"),
                    padding: wp("1"),
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    console.log("mapclick");
                  }}
                >
                  <Image
                    source={require("../../assets/images/search.png")}
                    style={{
                      width: wp("5"),
                      height: wp("5"),
                      margin: wp("2"),
                      tintColor: "#6b7280",
                    }}
                  />

                  <TextInput
                    style={[
                      Helpers.Typography.four,
                      styles.secondpartHeader_txtVw_first,
                      {
                        height: wp("6"),
                        width: wp("50"),
                        fontFamily: "BrandonText-Bold",
                        fontWeight: "bold",
                        color: "#6b7280",
                        margin: wp("0"),
                        padding: wp("0.5"),
                        justifyContent: "center",
                        alignContent: "center",
                      },
                    ]}
                    placeholder="Search Locations"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: windowWidth * 0.3,
                    borderColor: "#e5e7eb",
                    borderRadius: wp("8"),
                    borderWidth: wp("0.3"),
                    margin: wp("2"),
                    padding: wp("1"),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/images/pinpoint.png")}
                    style={{
                      width: wp("5"),
                      height: wp("5"),
                      margin: wp("0.5"),
                      tintColor: "#3078ff",
                    }}
                  />

                  <Text
                    style={{
                      color: "#000",
                      fontFamily: "BrandonText-Bold",
                      fontWeight: "bold",
                      fontSize: wp("4"),
                      margin: wp("1"),
                      padding: wp("0.5"),
                      height: wp("7"),
                      textAlign: "center",
                    }}
                  >
                    Dubai
                  </Text>

                  <Image
                    source={require("../../assets/images/down_arrow.png")}
                    style={{
                      width: wp("3"),
                      height: wp("3"),
                      margin: wp("1"),
                      tintColor: "#6b7280",
                    }}
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={{
                    borderColor: "#e5e7eb",
                    borderRadius: wp("8"),
                    borderWidth: wp("0.3"),
                    margin: wp("2"),
                    padding: wp("1"),
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/images/pinpoint.png")}
                    style={{
                      width: wp("5"),
                      height: wp("5"),
                      margin: wp("0.5"),
                      tintColor: "#3078ff",
                    }}
                  />
                  <Text
                    style={
                      [
                      styles.secondpartHeader_txtVw_first,
                      {
                        color: "#3078ff",
                        fontFamily: "BrandonText-Bold",
                        fontWeight: "bold",
                        fontSize: wp("4"),
                        margin: wp("1"),
                        padding: wp("0.5"),
                      },
                    ]}
                  >
                    Dubai
                  </Text>
                  <Image
                    source={require("../../assets/images/down_arrow.png")}
                    style={{
                      width: wp("3"),
                      height: wp("3"),
                      margin: wp("1"),
                      tintColor: "#6b7280",
                    }}
                  />
                </TouchableOpacity> */}
              </View>
            </View>

            {/* Header end */}

            <View
              style={{
                backgroundColor: "white",
                width: wp("100"),
                height: this.state.showBottom ? wp('150') : wp('150'),
                flex: 1,
              }}
            >
              {/* MapStart */}
              <MapView
                onPress={() => this.setState({ showBottom: !this.state.showBottom })}
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
                style={{ height: "100%", width: "100%", position: "absolute" }}
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
                            onPress={() => {this.markerPressed(item)}}
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
              {this.state.showBottom
                ? [
                    
                    
                      <View
                        style={{
                          height: wp("60"),
                          width: "100%",
                          padding: wp("5"),
                          position: "absolute",
                          bottom: wp("5"),
                        }}
                      >
                        <View
                          style={{
                            height: wp("60"),
                            width: "100%",
                            alignSelf: "center",
                            backgroundColor: Helpers.Theme.light,
                            margin: wp(2),
                            backgroundColor: "#FFFFFF",
                            borderRadius: wp("5"),
                            shadowColor: "#000000",
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 4,
                            position: "absolute",
                            bottom: wp("5"),
                          }}
                        >
                          <View style={{ width: "100%", height: wp("30") }}>
                            <Image
                              source={{ uri: this.state.currentItem.thumbnail }}
                              style={{
                                width: "100%",
                                height: wp("10"),
                                flex: 1,
                                borderWidth: 1,
                                borderColor: Helpers.Theme.blueBtnBorder,
                                borderTopRightRadius: wp(5),
                                borderTopLeftRadius: wp(5),
                              }}
                            />
                            <TouchableOpacity
                              style={styles.listBtn_rightVw_heartBtn}
                            >
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
                                    : { tintColor: "#fff" },
                                ]}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              padding: wp("3"),
                              justifyContent: "center",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                bottom: wp("1"),
                              }}
                            >
                              <Text
                                style={{
                                  width: wp("40"),
                                  color: "#242424",
                                  fontSize: wp("4.5"),
                                  fontWeight: "bold",
                                  fontFamily: "BrandonText-Bold",
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {this.state.currentItem.name}
                              </Text>
                              <Text
                                style={{
                                  color: "green",
                                  fontWeight: "bold",
                                  fontSize: wp("3.4"),
                                }}
                              >
                                {this.state.currentItem.is_branch_open}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  color: "#999999",
                                  fontWeight: "bold",
                                  fontSize: wp("3"),
                                  marginBottom: wp("8"),
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {this.state.currentItem.address}
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text
                                style={{
                                  color: Helpers.Theme.black,
                                  fontWeight: "bold",
                                  fontFamily: "BrandonText-Bold",
                                }}
                              >
                                {this.state.currentItem.branch_cost} (
                                {this.state.currentItem.credits_required}{" "}
                                credits)
                              </Text>

                              <Text
                                style={{
                                  color: Helpers.Theme.light,
                                  borderRadius: wp("5"),
                                  backgroundColor: "#3078ff",
                                  fontWeight: "bold",
                                  fontSize: wp("3"),
                                  paddingTop: wp("1"),
                                  paddingBottom: wp("1"),
                                  paddingRight: wp("5"),
                                  paddingLeft: wp("5"),
                                }}
                                onPress={this.toggleModal}
                              >
                                Buy Credits
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    
                  ]
                : [
                    this.state.maplist.length > 0 ? (
                      <View
                        style={{
                          height: wp("70"),
                          position: "absolute",
                          bottom: wp("2"),
                          justifyContent: "center",
                          // backgroundColor:'blue'
                        }}
                      >
                        <Carousel
                          layout={"default"}
                          loop={true}
                          data={this.state.updatedVenues}
                          renderItem={this.renderItem}
                          sliderWidth={sliderWidth}
                          itemWidth={itemWidth}
                          onEndReached={() => this.loadMore()}
                        ></Carousel>
                      </View>
                    ) : (
                      <></>
                    ),
                  ]}
            </View>

            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={this.toggleModal}
              keyboardShouldPersistTaps="handled" // Prevents view from scrolling to top
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                activeOpacity={1}
                onPress={this.toggleModal}
              >
                <ScrollView>
                  <View
                    style={{
                      backgroundColor: "white",
                      borderTopRightRadius: wp("8"),
                      borderTopLeftRadius: wp("8"),
                      width: wp("100"),
                      height: Helpers.HP("100"),
                      padding: 16,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Image
                          source={Helpers.Images.letsworkLogo}
                          style={styles.mainlogo}
                        />
                      </View>

                      <TouchableOpacity onPress={this.toggleModal}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          X
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: wp("5") }}>
                      <ToggleButton
                        activeColor="white"
                        inactiveColor="#cecece"
                      />
                    </View>
                    <View style={{ marginTop: wp("5") }}></View>
                    <LoginComponent />
                  </View>
                </ScrollView>
              </TouchableOpacity>
            </Modal>
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
