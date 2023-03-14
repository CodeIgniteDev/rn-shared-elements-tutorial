import { Dimensions } from "react-native"

export const SPACING = 12

const { width } = Dimensions.get("window")

const s = width * 0.68

export const specs = {
  ITEM_WIDTH: s,
  ITEM_HEIGHT: s * 1.5,
  RADIUS: 18,
  SPACING,
  FULL_SIZE: s + SPACING * 2,
  SCREEN_WIDTH: width,
}
