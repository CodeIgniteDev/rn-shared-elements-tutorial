/* eslint-disable react-native/no-color-literals */
import { StyleSheet, Text, View, Image, FlatList } from "react-native"
import React, { useRef } from "react"
import { SharedElement } from "react-navigation-shared-element"

import { specs } from "../config/theme"
import { Icon } from "../components"
import { navigate } from "../navigators"
import * as Animatable from "react-native-animatable"

const { ITEM_WIDTH, RADIUS, SPACING } = specs

const animationIn = {
  0: { translateX: -40, opacity: 0 },
  1: { translateX: 1, opacity: 1 },
}
const animationOut = {
  0: { translateX: 1, opacity: 1 },
  1: { translateX: -40, opacity: 0 },
}

const PhotosScreen = ({ route }) => {
  const participantsRef = useRef([])

  const { item } = route.params
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Icon
        style={styles.icon}
        icon="back"
        size={20}
        color="#fff"
        onPress={async () => {
          const promises = participantsRef.current.map((element) =>
            element.animate(animationOut, 50),
          )
          Promise.all(promises).then(() => {
            navigate("Home")
          })
        }}
        containerStyle={styles.iconContainer}
      />
      <SharedElement id={`item-photo-${item.id}`} style={StyleSheet.absoluteFillObject}>
        <View style={StyleSheet.absoluteFillObject}>
          <Image
            source={{ uri: item.image }}
            style={[StyleSheet.absoluteFillObject, styles.backgroundImage]}
          />
        </View>
      </SharedElement>
      <View style={styles.textWrapper}>
        <SharedElement id={`item-date-${item.id}`}>
          <Text style={styles.date}>{item.date}</Text>
        </SharedElement>
        <SharedElement id={`item-title-${item.id}`}>
          <Text style={styles.title}>{item.title}</Text>
        </SharedElement>
      </View>
      <FlatList
        contentContainerStyle={styles.participantsContainer}
        style={styles.participantsList}
        data={item.participants}
        renderItem={({ item: participant, index }) => (
          <View style={styles.participantItemWrapper}>
            <SharedElement id={`item-participant-${participant.id}`}>
              <View style={styles.participantImageContainer}>
                <Image source={{ uri: participant.image }} style={styles.participant} />
              </View>
            </SharedElement>

            <Animatable.View
              ref={(el) => (participantsRef.current[index] = el)}
              style={styles.participantNameWrapper}
              useNativeDriver
              animation={animationIn}
              delay={200}
            >
              <Text style={styles.participantName}>{participant.name}</Text>
            </Animatable.View>
          </View>
        )}
      />
    </View>
  )
}

PhotosScreen.sharedElements = (route) => {
  const { item } = route.params

  const participants = item.participants.map((participant) => ({
    id: `item-participant-${participant.id}`,
  }))

  return [
    {
      id: `item-photo-${item.id}`,
    },
    {
      id: `item-title-${item.id}`,
    },
    {
      id: `item-date-${item.id}`,
    },
    ...participants,
  ]
}

export default PhotosScreen

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: "cover",
  },
  date: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: SPACING,
    textTransform: "uppercase",
  },
  icon: {
    left: 10,
    position: "absolute",
    top: 80,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
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
    padding: 2,
  },
  participantItemWrapper: {
    borderRadius: 50,
    flexDirection: "row",
    marginRight: SPACING,
    overflow: "hidden",
  },
  participantName: {
    marginHorizontal: 8,
  },
  participantNameWrapper: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: RADIUS,
    borderTopLeftRadius: 0,
    flexDirection: "row",
    zIndex: -1,
  },
  participantsContainer: {
    bottom: SPACING * 2,
    flexDirection: "row",
    left: SPACING * 2,
    position: "absolute",
  },
  participantsList: {
    overflow: "hidden",
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
    marginBottom: SPACING,
    textTransform: "uppercase",
  },
})
