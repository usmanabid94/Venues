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
} from "react-native";

import * as Actions from "../../store/actions/allActions";
import * as Helpers from "../../helpers/Exporter";
import { WP as wp } from "../../helpers/Exporter";
import { connect } from "react-redux";
// import { styles } from "./Mapviewlist.style";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "./Searchlist.style";
import ToggleButton from "./ToggleButton";
import LoginComponent from "../Login/LoginComponent";
// Import the font file
import AsapBold from '../../assets/fonts/Asap-Bold.ttf';
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
          height: wp("50"),
          width: wp("65"),
          alignSelf: "center",
          borderWidth: 1,
          borderColor: Helpers.Theme.blueBtnBorder,
          borderRadius: wp(5),
          backgroundColor: Helpers.Theme.light,
          margin: wp(2),
          // paddingLeft: wp(2),
        }}
      >
        <View style={{ width: wp("65"), height: wp("25") }}>
          <Image
            source={{ uri: item.thumbnail }}
            style={{
              width: wp("65"),
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
        <View style={{ flex: 1, padding: wp("3"), justifyContent: "center" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: Helpers.Theme.darkgrey, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {item.is_branch_open}
            </Text>
          </View>
          <View>
            <Text style={{ color: Helpers.Theme.gryBack, fontWeight: "bold" }}>
              {item.address}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: Helpers.Theme.black, fontWeight: "bold" }}>
              {item.branch_cost} ({item.credits_required} credits)
            </Text>
            <Text
              style={{
                color: Helpers.Theme.light,
                borderRadius: wp("5"),
                paddingTop: wp("1"),
                paddingBottom: wp("1"),
                paddingLeft: wp("2"),
                paddingRight: wp("2"),
                backgroundColor: "#3078ff",
                fontWeight: "bold",
              }}
              onPress={this.toggleModal}
            >
              Buy Credits
            </Text>
          </View>
        </View>
      </View>
      // <View
      //   style={{
      //     height: wp(44),
      //     width: wp("95"),
      //     alignSelf: "center",
      //     borderWidth: 1,
      //     borderColor: Helpers.Theme.blueBtnBorder,
      //     borderRadius: wp(1.3),
      //     backgroundColor: Helpers.Theme.light,
      //     flexDirection: "row",
      //     margin: wp(2),
      //     paddingLeft: wp(2),
      //   }}
      // >
      //   <TouchableOpacity
      //     onPress={() => console.log("listingdetail", item.id)}
      //     style={{
      //       height: wp(40),
      //       width: "40%",
      //       marginTop: wp("2"),
      //       borderTopLeftRadius: wp(1.3),
      //       borderBottomLeftRadius: wp(1.3),
      //     }}
      //   >
      //     <Image
      //       source={{ uri: item.thumbnail }}
      //       style={Helpers.GLOBAL_SHEET.maxHW}
      //     />

      //     {item.is_premium == "1"
      //       ? [
      //           <Image
      //             source={Helpers.Images.featuredBadge}
      //             style={styles.listBtn_leftVw_featureImg}
      //           />,
      //         ]
      //       : []}
      //   </TouchableOpacity>

      //   <View style={styles.listBtn_rightVw}>
      //     <TouchableOpacity style={styles.listBtn_rightVw_heartBtn}>
      //       <Image
      //         source={
      //           item.is_favorite
      //             ? Helpers.Images.heartfilled
      //             : Helpers.Images.heartEmpty
      //         }
      //         style={[
      //           styles.listBtn_rightVw_heartBtn_Img,
      //           item.isfav ? { tintColor: Helpers.Theme.red } : {},
      //         ]}
      //       />
      //     </TouchableOpacity>

      //     <Text style={[Helpers.Typography.four, { color: "#3078ff" }]}>
      //       {item.main_price}
      //       <Text
      //         style={[Helpers.Typography.three, { color: Helpers.Theme.black }]}
      //       >
      //         {item.is_branch_open}
      //       </Text>
      //     </Text>
      //     <Text
      //       style={[Helpers.Typography.four, styles.listBtn_rightVw_titleTxt]}
      //     >
      //       {item.name}
      //     </Text>
      //     {item.address != null
      //       ? [
      //           <View style={styles.listBtn_rightVw_addressVw}>
      //             <Image
      //               source={Helpers.Images.pinpoint}
      //               style={{
      //                 height: wp(2.5),
      //                 width: wp(2.5),
      //                 tintColor: "#3078ff",
      //                 resizeMode: "contain",
      //               }}
      //             />
      //             <Text
      //               style={[
      //                 Helpers.Typography.three,
      //                 {
      //                   color: Helpers.Theme.darkgrey,
      //                   width: wp(45),
      //                   marginLeft: wp(1),
      //                 },
      //               ]}
      //             >
      //               {item.address}
      //             </Text>
      //           </View>,
      //         ]
      //       : []}

      //     <View style={styles.listBtn_rightVw_bedbathVw}>
      //       <View style={{ flexDirection: "row" }}>
      //         <Image
      //           source={Helpers.Images.tag}
      //           style={[
      //             styles.listBtn_rightVw_bedbathVw_Img,
      //             { tintColor: "#3078ff" },
      //           ]}
      //         />
      //         <Text
      //           style={[
      //             Helpers.Typography.three,
      //             { color: Helpers.Theme.darkgrey },
      //           ]}
      //         >
      //           {item.total_capacity}
      //         </Text>
      //       </View>
      //       <View style={styles.listBtn_rightVw_bedbathVw_twoVws}>
      //         <Image
      //           source={Helpers.Images.tick}
      //           style={[
      //             styles.listBtn_rightVw_bedbathVw_Img,
      //             { tintColor: "#3078ff" },
      //           ]}
      //         />
      //         <Text
      //           style={[
      //             Helpers.Typography.three,
      //             styles.listBtn_rightVw_bedbathVw_bedsTxt,
      //           ]}
      //         >
      //           {item.spotLeft}
      //         </Text>
      //       </View>
      //       <View style={styles.listBtn_rightVw_bedbathVw_twoVws}>
      //         <Image
      //           source={Helpers.Images.clock}
      //           style={[
      //             styles.listBtn_rightVw_bedbathVw_Img,
      //             { tintColor: "#3078ff" },
      //           ]}
      //         />

      //         <Text
      //           style={[
      //             Helpers.Typography.three,
      //             styles.listBtn_rightVw_bedbathVw_bedsTxt,
      //           ]}
      //         >
      //           {item.timings}
      //         </Text>
      //       </View>
      //     </View>
      //   </View>
      // </View>
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

    return (
      <View
        style={[
          Helpers.GLOBAL_SHEET.maxHWC,
          styles.container,
          {
            elevation: 3,
            shadowColor: "#e5e7eb", //'#d8d8d8',
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
                { padding: wp("2"), marginBottom: wp("4") },
              ]}>

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
                        fontFamily:
                          "../../assets/fonts/Asap-Bold.ttf",
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
                  // margin: wp("2"),
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  paddingTop: wp("5"),
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
                        height: wp("5"),
                        width: wp("50"),
                        color: "#6b7280",
                        margin: wp("1"),
                        padding: wp("0.5"),
                      },
                    ]}
                    placeholder="Search Locations"
                  />
                </TouchableOpacity>
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
                  onPress={this.toggleModal}
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
                    style={[
                      styles.secondpartHeader_txtVw_first,
                      {
                        color: "#000",
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
                </TouchableOpacity>
              </View>
            </View>

            {/* Header end */}

            <View
              style={{
                backgroundColor: "white",
                // height: this.state.showBottom ? wp("150") : wp("150"),
                width: wp("100"),
                flex: 1,
              }}
            >
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
                style={{ height: "100%", width: "100%", position: "absolute" }}

                // style={[
                //   Helpers.GLOBAL_SHEET.maxHW,
                //   { height: Helpers.HP("70%") },
                // ]}
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
                    <View
                      style={{
                        height: wp("50"),
                        width: wp("65"),
                        alignSelf: "center",
                        borderWidth: 1,
                        borderColor: Helpers.Theme.blueBtnBorder,
                        borderRadius: wp(5),
                        backgroundColor: Helpers.Theme.light,
                        margin: wp(2),
                        position: "absolute",
                        bottom: wp("5"),
                        // paddingLeft: wp(2),
                      }}
                    >
                      <View style={{ width: wp("65"), height: wp("25") }}>
                        <Image
                          source={{ uri: this.state.currentItem.thumbnail }}
                          style={{
                            width: wp("65"),
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
                          flex: 1,
                          padding: wp("3"),
                          justifyContent: "center",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              color: Helpers.Theme.darkgrey,
                              fontWeight: "bold",
                            }}
                          >
                            {this.state.currentItem.name}
                          </Text>
                          <Text style={{ color: "green", fontWeight: "bold" }}>
                            {this.state.currentItem.is_branch_open}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              color: Helpers.Theme.gryBack,
                              fontWeight: "bold",
                            }}
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
                            }}
                          >
                            {this.state.currentItem.branch_cost} (
                            {this.state.currentItem.credits_required} credits)
                          </Text>
                          <TouchableOpacity
                          onPress={this.toggleModal}>
                          <Text
                            style={{
                              color: Helpers.Theme.light,
                              borderRadius: wp("5"),
                              paddingTop: wp("1"),
                              paddingBottom: wp("1"),
                              paddingLeft: wp("2"),
                              paddingRight: wp("2"),
                              backgroundColor: "#3078ff",
                              fontWeight: "bold",
                            }}>
                            Buy Credits
                          </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>,
                    // <View style={styles.listBtn}>
                    //   <TouchableOpacity
                    //     onPress={() =>
                    //       console.log(
                    //         "listingdetail",
                    //         this.state.currentItem.id
                    //       )
                    //     }
                    //     style={styles.listBtn_leftVw}
                    //   >
                    //     <Image
                    //       source={{ uri: this.state.currentItem.thumbnail }}
                    //       style={Helpers.GLOBAL_SHEET.maxHW}
                    //     />

                    //     {this.state.currentItem.is_premium == "1"
                    //       ? [
                    //           <Image
                    //             source={Helpers.Images.featuredBadge}
                    //             style={styles.listBtn_leftVw_featureImg}
                    //           />,
                    //         ]
                    //       : []}
                    //   </TouchableOpacity>

                    //   <View style={styles.listBtn_rightVw}>
                    //     <TouchableOpacity
                    //       style={styles.listBtn_rightVw_heartBtn}
                    //     >
                    //       <Image
                    //         source={
                    //           this.state.currentItem.is_favorite
                    //             ? Helpers.Images.heartfilled
                    //             : Helpers.Images.heartEmpty
                    //         }
                    //         style={[
                    //           styles.listBtn_rightVw_heartBtn_Img,
                    //           this.state.currentItem.isfav
                    //             ? { tintColor: Helpers.Theme.red }
                    //             : {},
                    //         ]}
                    //       />
                    //     </TouchableOpacity>

                    //     <Text
                    //       style={[
                    //         Helpers.Typography.four,
                    //         { color: "#3078ff" },
                    //       ]}
                    //     >
                    //       {this.state.currentItem.main_price}
                    //       <Text
                    //         style={[
                    //           Helpers.Typography.three,
                    //           { color: Helpers.Theme.black },
                    //         ]}
                    //       >
                    //         {this.state.currentItem.is_branch_open}
                    //       </Text>
                    //     </Text>
                    //     <Text
                    //       style={[
                    //         Helpers.Typography.four,
                    //         styles.listBtn_rightVw_titleTxt,
                    //       ]}
                    //     >
                    //       {this.state.currentItem.name}
                    //     </Text>
                    //     {this.state.currentItem.address != null
                    //       ? [
                    //           <View style={styles.listBtn_rightVw_addressVw}>
                    //             <Image
                    //               source={Helpers.Images.pinpoint}
                    //               style={{
                    //                 height: wp(2.5),
                    //                 width: wp(2.5),
                    //                 tintColor: "#3078ff",
                    //                 resizeMode: "contain",
                    //               }}
                    //             />
                    //             <Text
                    //               style={[
                    //                 Helpers.Typography.three,
                    //                 {
                    //                   color: Helpers.Theme.darkgrey,
                    //                   width: wp(45),
                    //                   marginLeft: wp(1),
                    //                 },
                    //               ]}
                    //             >
                    //               {this.state.currentItem.address}
                    //             </Text>
                    //           </View>,
                    //         ]
                    //       : []}

                    //     <View style={styles.listBtn_rightVw_bedbathVw}>
                    //       <View style={{ flexDirection: "row" }}>
                    //         <Image
                    //           source={Helpers.Images.tag}
                    //           style={[
                    //             styles.listBtn_rightVw_bedbathVw_Img,
                    //             { tintColor: "#3078ff" },
                    //           ]}
                    //         />
                    //         <Text
                    //           style={[
                    //             Helpers.Typography.three,
                    //             { color: Helpers.Theme.darkgrey },
                    //           ]}
                    //         >
                    //           {this.state.currentItem.total_capacity}
                    //         </Text>
                    //       </View>
                    //       <View style={styles.listBtn_rightVw_bedbathVw_twoVws}>
                    //         <Image
                    //           source={Helpers.Images.tick}
                    //           style={[
                    //             styles.listBtn_rightVw_bedbathVw_Img,
                    //             { tintColor: "#3078ff" },
                    //           ]}
                    //         />
                    //         <Text
                    //           style={[
                    //             Helpers.Typography.three,
                    //             styles.listBtn_rightVw_bedbathVw_bedsTxt,
                    //           ]}
                    //         >
                    //           {this.state.currentItem.spotLeft}
                    //         </Text>
                    //       </View>
                    //       <View style={styles.listBtn_rightVw_bedbathVw_twoVws}>
                    //         <Image
                    //           source={Helpers.Images.clock}
                    //           style={[
                    //             styles.listBtn_rightVw_bedbathVw_Img,
                    //             { tintColor: "#3078ff" },
                    //           ]}
                    //         />

                    //         <Text
                    //           style={[
                    //             Helpers.Typography.three,
                    //             styles.listBtn_rightVw_bedbathVw_bedsTxt,
                    //           ]}
                    //         >
                    //           {this.state.currentItem.timings}
                    //         </Text>
                    //       </View>
                    //     </View>
                    //   </View>
                    // </View>,
                  ]
                : [
                    this.state.maplist.length > 0 ? (
                      <FlatList
                        style={{
                          height: wp("50"),
                          position: "absolute",
                          bottom: wp("5"),
                        }}
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
            </View>
            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={this.toggleModal}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                activeOpacity={1}
                // onPressOut={this.toggleModal}
                onPress={this.toggleModal}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderTopRightRadius: wp("4"),
                    borderTopLeftRadius: wp("4"),
                    width: wp("100"),
                    height: Helpers.HP("70"),
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
                        source={Helpers.Images.propertyaLogo}
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
                    <ToggleButton activeColor="white" inactiveColor="#cecece" />
                  </View>
                  <View style={{ marginTop: wp("5")}}></View>
                    <LoginComponent />
                </View>
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
