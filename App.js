import { StyleSheet, View } from "react-native";
import KeyBoard from "./src/components/KeyBoard";

export default function App() {
  return (
    <View style={styles.container}>
      <KeyBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BBBEC2",
    alignContent: "center",
    justifyContent: "flex-end",
    paddingLeft: 7,
  },
});
