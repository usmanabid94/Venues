import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text, Linking, ActivityIndicator } from "react-native";

import * as Actions from "../../store/actions/allActions";
import * as Helpers from "../../helpers/Exporter";
import { WP as wp } from "../../helpers/Exporter";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { styles } from "./Mapviewlist.style";
import MapView from "react-native-map-clustering";
import { Marker, Callout } from "react-native-maps";
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
    };
  }
  componentDidMount() {
    this.fetchVenues();
  }
  fetchVenues = () => {
    fetch("https://cx6bmbl1e3.execute-api.us-east-2.amazonaws.com/venues")
      .then((response) => response.json())
      .then((data) => {
        // Process the response data
        console.log(data);
        this.props.updateVenues(data);
        this.props.updateVenuesRes(data);
        this.setState({ count: data.total_count });
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
  goback = () => {
    this.props.navigation.goBack();
  };

  markerPressed = (item) => {
    this.setState({ currentItem: item, showBottom: true });
  };
  openExternalApp = (which, val) => {
    switch (which) {
      case "whatsapp":
        Linking.openURL(`whatsapp://send?phone=${val}`);
        return;
      case "phone":
        Linking.openURL(`tel:${val}`);
        return;
      default:
        return;
    }
  };

  navigate = (where, id) => {
    switch (where) {
      case "filter":
        this.props.navigation.navigate(where);
        return;
      case "listingdetail":
        this.props.navigation.navigate(where, { listingId: id });
        return;
      case "mapviewlist":
        this.props.navigation.navigate(where);
        return;
    }
  };
  renderItem = ({ item, index }) => {
    // List item component code
    return (
      <View
        style={{
          height: wp(44),
          width: wp("100"),
          alignSelf: "center",
          borderWidth: 1,
          borderColor: Helpers.Theme.blueBtnBorder,
          borderRadius: wp(1.3),
          backgroundColor: Helpers.Theme.light,
          flexDirection: "row",
          margin: wp(2),
          padding: wp(2),
        }}
      >
        <TouchableOpacity
          onPress={() => console.log("listingdetail", item.id)}
          style={{
            height: wp(40),
            width: "40%",
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

  render() {
    const { data } = this.props;
    console.log("checkprops", this.props);

    return (
      <View style={Helpers.GLOBAL_SHEET.maxHWCC}>
        {
            this.props.loading ? <ActivityIndicator color={"blue"} size={'small'}/> :
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
          style={[Helpers.GLOBAL_SHEET.maxHW, { height: Helpers.HP("70%") }]}
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
        {/* Flat list to load Venues */}
        {this.state.maplist.length > 0 ? (
          <FlatList
            data={this.props.venueLists.results}
            keyExtractor={(item) => item.id}
            horizontal={true}
            pagingEnabled={true}
            renderItem={this.renderItem}
          />
        ) : (
          <></>
        )}
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
          : []}
            </>
       }
       
      </View>
    );
  }
}
const mapStateToProps = (state) => {
    console.log("state",state)
  return {
    loading:state.search.loading,
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
