/* eslint-disable react-native/no-color-literals */
import { StyleSheet, View, TouchableOpacity, Animated, Text } from "react-native"
import React, { useRef } from "react"
import { SLIDER_DATA } from "../config/dataLists"
import { specs } from "../config/theme"
import { navigate } from "../navigators"
import { SharedElement } from "react-navigation-shared-element"
import { SafeAreaView } from "react-native-safe-area-context"

const { ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE, SCREEN_WIDTH } = specs

const HomeScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Upcoming trips</Text>

      <Animated.FlatList
        data={SLIDER_DATA}
        keyExtractor={(item) => item.id}
        horizontal
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        snapToInterval={FULL_SIZE}
        contentContainerStyle={styles.carouselItemContainer}
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 1) * FULL_SIZE, index * FULL_SIZE, (index + 1) * FULL_SIZE]

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
          })
          const scale = scrollX.interpolate({ inputRange, outputRange: [0.9, 1, 0.9] })
          return (
            <TouchableOpacity
              onPress={() => navigate("Details", { item })}
              style={styles.itemWrapper}
            >
              <SharedElement id={`item-photo-${item.id}`} style={StyleSheet.absoluteFill}>
                <View style={[StyleSheet.absoluteFill, styles.imageWrapper]}>
                  <Animated.Image
                    source={{ uri: item.image }}
                    style={[
                      StyleSheet.absoluteFill,
                      { transform: [{ scale }] },
                      styles.backgroundImage,
                    ]}
                  />
                </View>
              </SharedElement>
              <View style={styles.textWrapper}>
                <SharedElement id={`item-date-${item.id}`}>
                  <Animated.Text style={[styles.date, { transform: [{ translateX }] }]}>
                    {item.date}
                  </Animated.Text>
                </SharedElement>
                <SharedElement id={`item-title-${item.id}`}>
                  <Animated.Text style={[styles.title, { transform: [{ translateX }] }]}>
                    {item.title}
                  </Animated.Text>
                </SharedElement>
              </View>

              <Animated.FlatList
                contentContainerStyle={styles.participantsContainer}
                style={[styles.participantsList, { transform: [{ scale }] }]}
                data={item.participants}
                renderItem={({ item: participant }) => (
                  <SharedElement id={`item-participant-${participant.id}`}>
                    <View style={styles.participantImageContainer}>
                      <Animated.Image
                        source={{ uri: participant.image }}
                        style={styles.participant}
                      />
                    </View>
                  </SharedElement>
                )}
              />
            </TouchableOpacity>
          )
        }}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: RADIUS,
    resizeMode: "cover",
  },
  carouselItemContainer: {
    height: ITEM_HEIGHT + 30,
    paddingRight: SCREEN_WIDTH - ITEM_WIDTH - SPACING * 2,
  },
  date: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  imageWrapper: { overflow: "hidden" },
  itemWrapper: {
    borderRadius: RADIUS,
    height: ITEM_HEIGHT,
    margin: SPACING,
    position: "relative",
    width: ITEM_WIDTH,
  },
  participant: {
    backgroundColor: "gray",

    borderRadius: 50,
    fontWeight: "800",
    height: 30,
    resizeMode: "cover",
    width: 30,
  },
  participantImageContainer: {
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: -10,
    padding: 2,
  },
  participantsContainer: {
    bottom: 0,
    flexDirection: "row",
    left: SPACING * 2,
    marginBottom: -15,
    position: "absolute",
    width: "100%",
  },
  participantsList: {
    overflow: "visible",
  },
  screenContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  screenTitle: {
    color: "#181818",
    fontSize: 22,
    fontWeight: "500",
    marginHorizontal: SPACING * 2,
    marginVertical: SPACING * 3,
  },
  textWrapper: {
    bottom: "10%",
    padding: SPACING * 2,
    position: "absolute",
    width: ITEM_WIDTH,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    textTransform: "uppercase",
  },
})
