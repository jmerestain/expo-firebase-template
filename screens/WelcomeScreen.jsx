import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { Layout, Button, Text } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authOnOpen } from "../services/auth";

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("firstTime");
    if (value == null) {
      return true;
    }
    return value;
  } catch (e) {
    console.log(e);
  }
};

const setData = async () => {
  try {
    const value = await AsyncStorage.setItem("firstTime", false);
    return value;
  } catch (e) {
    console.log(e);
  }
};

const WelcomeScreen = ({ navigation }) => {
  const [firstTime, setFirstTime] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const value = await getData();
      setFirstTime(value);
    }
    fetchData();
    authOnOpen(navigation);
  }, []);

  return (
    <Layout style={styles.container}>
      {firstTime ? (
        <OnboardingScreen setFirstTime={setFirstTime} />
      ) : (
        <AuthOptions navigation={navigation} />
      )}
    </Layout>
  );
};

const OnboardingScreen = ({ setFirstTime }) => {
  const [screen, setScreen] = useState(1);

  return (
    <Layout style={styles.container}>
      {screen == 1 ? <OScreen1 setScreen={setScreen} setFirstTime={setFirstTime}/> : null}
      {screen == 2 ? <OScreen2 setScreen={setScreen} setFirstTime={setFirstTime} /> : null}
      {screen == 3 ? <OScreen3 setScreen={setScreen} setFirstTime={setFirstTime} /> : null}
      {screen == 4 ? <OScreen4 setScreen={setScreen} setFirstTime={setFirstTime} /> : null}
      {screen == 5 ? <OScreen5 setScreen={setScreen} setFirstTime={setFirstTime} /> : null}
      {screen == 6 ? (
        <OScreen6 setScreen={setScreen} setFirstTime={setFirstTime} />
      ) : null}
    </Layout>
  );
};

const OScreen1 = ({ setFirstTime, setScreen }) => {
  return (
    <Layout style={styles.onBoardScreen}>
      <Image
        style={styles.onBoardImage}
        source={require("../assets/welcome/onboard1.png")}
      />
      <Layout style={styles.onBoardText}>
        <Text>
          <Text category="h5" style={{ fontFamily:"Quicksand-Regular", textAlign: "center", lineHeight: 32}}>
          Welcome to the Survival Shop of the MSMEs of Nueva Ecija!{" "}
          </Text>
        </Text>
      </Layout>
      <Layout style={{paddingBottom:60}}>
        <Button style={styles.onBoardText}
          style={[styles.onBoardButton, { marginBottom: 10 }]}
          onPress={() => {
            setScreen(2);
          }}
        >
          Next
        </Button>
        <Button
          appearance="ghost"
          style={styles.onBoardButton}
          onPress={() => {
            setFirstTime(false);
          }}
        >
        <Text style={{color:"#00000090"}}>
          Skip
        </Text>
      </Button>
      </Layout>
    </Layout>
  );
};

const OScreen2 = ({ setFirstTime, setScreen }) => {
  return (
    <Layout style={styles.onBoardScreen}>
      <Image
        style={styles.onBoardImage}
        source={require("../assets/welcome/onboard2.png")}
      />
      <Layout style={styles.onBoardText}>
        <Text category="h6" style={{ fontFamily:"Quicksand-Regular", textAlign: "center", marginTop: -40, lineHeight: 28}}>
        Bagong Inspirasyon at Likha ng Nueva Ecija (BILI NE!) is an association that leads in
        promoting social entrepreneurship and diversified livelihood among NE’s agro-based
        families.
        </Text>
      </Layout>
      <Layout style={{paddingBottom:60}}>
        <Button style={styles.onBoardText}
          style={[styles.onBoardButton, { marginBottom: 10 }]}
          onPress={() => {
            setScreen(3);
          }}
        >
          Next
        </Button>
        <Button
          appearance="ghost"
          style={styles.onBoardButton}
          onPress={() => {
            setFirstTime(false);
          }}
        >
        <Text style={{color:"#00000090"}}>
          Skip
        </Text>
      </Button>
      </Layout>
    </Layout>
  );
};

const OScreen3 = ({ setFirstTime, setScreen }) => {
  return (
    <Layout style={styles.onBoardScreen}>
      <Image
        style={styles.onBoardImage}
        source={require("../assets/welcome/onboard3.png")}
      />
      <Layout style={styles.onBoardText}>
      <Text category="h6" style={{ fontFamily:"Quicksand-Regular", textAlign: "center", lineHeight: 28}}>
          Help revive MSMEs, and contain the spread of the COVID19 by doing your
          pamamalengke, as a buyer and/or seller, in this app.
        </Text>
      </Layout>
      <Layout style={{paddingBottom:60}}>
        <Button style={styles.onBoardText}
          style={[styles.onBoardButton, { marginBottom: 10 }]}
          onPress={() => {
            setScreen(4);
          }}
        >
          Next
        </Button>
        <Button
          appearance="ghost"
          style={styles.onBoardButton}
          onPress={() => {
            setFirstTime(false);
          }}
        >
        <Text style={{color:"#00000090"}}>
          Skip
        </Text>
      </Button>
      </Layout>
    </Layout>
  );
};

const OScreen4 = ({ setFirstTime, setScreen }) => {
  return (
    <Layout style={styles.onBoardScreen}>
      <Image
        style={styles.onBoardImage}
        source={require("../assets/welcome/onboard4.png")}
      />
      <Layout style={styles.onBoardText}>
        <Text>
          <Text category="h6" style={{ fontFamily:"Quicksand-Regular", textAlign: "center", lineHeight: 28}}>
          This app envisions to bridge NE’s farmers, craftsmen, manufacturers, couriers, and
          consumers to help build sustainable communities.{" "}
          </Text>
        </Text>
      </Layout>
      <Layout style={{paddingBottom:60}}>
        <Button style={styles.onBoardText}
          style={[styles.onBoardButton, { marginBottom: 10 }]}
          onPress={() => {
            setScreen(5);
          }}
        >
          Next
        </Button>
        <Button
          appearance="ghost"
          style={styles.onBoardButton}
          onPress={() => {
            setFirstTime(false);
          }}
        >
        <Text style={{color:"#00000090"}}>
          Skip
        </Text>
      </Button>
      </Layout>
    </Layout>
  );
};

const OScreen5 = ({ setFirstTime, setScreen }) => {
  return (
    <Layout style={styles.onBoardScreen}>
      <Image
        style={styles.onBoardImage}
        source={require("../assets/welcome/onboard5.png")}
      />
      <Layout style={styles.onBoardText}>
      <Text category="h6" style={{ fontFamily:"Quicksand-Regular", textAlign: "center", lineHeight: 28}}>
        Special note: The app is a work in progress but be assured we are doing our best to
        serve the NE communities only the best.
        </Text>
      </Layout>
      <Layout style={{paddingBottom:60}}>
        <Button style={styles.onBoardText}
          style={[styles.onBoardButton, { marginBottom: 10 }]}
          onPress={() => {
            setFirstTime(false);
          }}
        >
          Next
        </Button>
        <Button
          appearance="ghost"
          style={styles.onBoardButton}
          onPress={() => {
            setFirstTime(false);
          }}
        >
        <Text style={{color:"#00000090"}}>
          Skip
        </Text>
      </Button>
      </Layout>
    </Layout>
  );
};

{/*const OScreen6 = ({ setFirstTime, setScreen }) => {
  return (
    <Layout style={styles.onBoardScreen}>
      <Image
        style={styles.onBoardImage}
        source={require("../assets/welcome/onboard6.png")}
      />
      <Layout style={styles.onBoardText}>
        <Text category="h6">
          The app demonstrates the power of the local community – that if people
          work together, “kayang mabuhay”.
        </Text>
      </Layout>
      <Button
        style={styles.onBoardButton}
        onPress={() => {
          setFirstTime(false);
        }}
      >
        Next
      </Button>
      <Button
        style={[
          styles.onBoardButton,
          {
            marginVertical: 10,
          },
        ]}
        size="small"
        appearance="outline"
        onPress={() => {
          setScreen((value) => value - 1);
        }}
      >
        Back
      </Button>
    </Layout>
  );
};*/}

const AuthOptions = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <Image
        style={styles.onBoardImage}
        source={require("../assets/welcome/logo.png")}
      />
      <Layout style={styles.authInner}>
        <Button
          style={styles.authButton}
          size="large"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          Login
        </Button>
        <Button
          appearance="outline"
          style={styles.authButton}
          size="large"
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          Register
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  authInner: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 20,
    justifyContent: "center",
  },
  onBoardScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  onBoardText: {
    flex: 2,
    marginVertical: 15,
  },
  onBoardImage: {
    flex: 4,
    alignSelf: "center",
    height: 30,
    resizeMode: "contain",
  },
  onBoardButton: {
    alignSelf: "stretch",
  },
  authButton: {
    marginBottom: 10,
  },
});

export default WelcomeScreen;
