import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Styles } from "../styles/GlobalStyles";
import { create, all } from "mathjs";

export default function KeyBoard() {
  const [value, setValue] = useState("113467");
  //const [lastNumber, setLastNumber] = useState("");
  const buttons = [
    "AC",
    "%",
    "C",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    "00",
    ".",
    "=",
  ];
  const math = create(all);

  const handlePress = (val) => {
    if (val == "AC") {
      setValue("0");
    } else if (val == "=") {
      try {
        if (
          (value.match(/\(/g) || []).length == (value.match(/\)/g) || []).length
        ) {
          if (
            (console.log(value.slice(-1)),
            value.slice(-1) == "+" ||
              value.slice(-1) == "-" ||
              value.slice(-1) == "*" ||
              value.slice(-1) == "%" ||
              value.slice(-1) == "/")
          ) {
            setValue(
              `${math.evaluate(value.replace("()", "(0)").slice(0, -1))}`
            );
          } else {
            setValue(`${math.evaluate(value.replace("()", "(0)") + "*1")}`);
          }
        }
      } catch (e) {
        setValue("Format Error");
      }
    } else if (val == "C") {
      setValue(value.slice(0, -1));
    } else if (val == "()") {
      if (value == "0") {
        setValue("(");
        setBracketOpen(true);
      } else if (
        value.slice(-1) == "+" ||
        value.slice(-1) == "-" ||
        value.slice(-1) == "*" ||
        value.slice(-1) == "/"
      ) {
        setValue(value + "(");
        setBracketOpen(true);
      } else {
        if (bracketopen == true) {
          setValue(value + ")");
          setBracketOpen(false);
        } else {
          setValue(value + "(");
          setBracketOpen(true);
        }
      }
    } else {
      if (value == "0") {
        if (
          val == "+" ||
          val == "-" ||
          val == "*" ||
          val == "/" ||
          val == "." ||
          val == "%"
        ) {
          setValue(value + val);
        } else {
          setValue(val);
        }
      }
      // console.log(val)
      else if (isNaN(val)) {
        //console.log(value.slice(-1));
        if (
          value.slice(-1) == "+" ||
          value.slice(-1) == "-" ||
          value.slice(-1) == "*" ||
          value.slice(-1) == "/" ||
          value.slice(-1) == "." ||
          value.slice(-1) == "%"
        ) {
          setValue(value.slice(0, -1) + val);
        } else {
          setValue(value + val);
        }
      } else if (!isNaN(val)) {
        setValue(value + val);
      }
    }
  };

  return (
    <View
      style={{ justifyContent: "space-between", alignContent: "space-between" }}
    >
      <View style={Styles.inputView}>
        <Text cursorColor={"black"} style={Styles.inputTextStyle1}>
          {value}
        </Text>
      </View>
      <View
        style={{
          //flex: 1,
          margin: 5,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-evenly",
          width: "95%",
          backgroundColor: "#EDEDED",
        }}
      >
        {buttons.map((button) => {
          return button === "=" ||
            button === "/" ||
            button === "*" ||
            button === "-" ||
            button === "+" ? (
            <TouchableOpacity
              key={button}
              style={Styles.keyboard}
              onPress={() => handlePress(button)}
            >
              <Text style={[Styles.key, { color: "green" }]}>{button}</Text>
            </TouchableOpacity>
          ) : button === 0 ? (
            <TouchableOpacity
              key={button}
              style={Styles.keyboard}
              onPress={() => handlePress(button)}
            >
              <Text style={Styles.key}>{button}</Text>
            </TouchableOpacity>
          ) : button === "." || button === "AC" ? (
            <TouchableOpacity
              key={button}
              style={Styles.keyboard}
              onPress={() => handlePress(button)}
            >
              <Text style={[Styles.key, { color: "green" }]}>{button}</Text>
            </TouchableOpacity>
          ) : button === "C" || button === "%" ? (
            <TouchableOpacity
              key={button}
              style={Styles.keyboard}
              onPress={() => handlePress(button)}
            >
              <Text style={[Styles.key, { color: "green" }]}>{button}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={button}
              style={Styles.keyboard}
              onPress={() => handlePress(button)}
            >
              <Text style={Styles.key}>{button}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
