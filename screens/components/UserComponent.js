import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
const { useDispacth, useSelector } = require("react-redux");

const UserComponent = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const auth = useSelector((state) => state.auth.token);
  const handleYes = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        "http://172.20.10.3:5000/channel/create",
        {
          name: props.name,
          users: [props._id],
        },
        {
          headers: {
            Authorization: "Bearer " + auth,
          },
        }
      );
      if (result.data.success) {
        props.navigation.navigate("chat-screen", {
          _id: result.data.channel_id,
          name: result.data.channel_name,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErr(error.response.data.message);
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.touchable}
      >
        <Image source={{ uri: props.dp }} style={styles.image} />
        <Text style={styles.text}>{props.name}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text>Start a chat with {props.name} ?</Text>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                {err ? (
                  <Text style={{ color: "red", paddingBottom: 10 }}>{err}</Text>
                ) : null}
                <Button title="Yes" onPress={handleYes} />
                <Button title="No" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchable: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    flex: 1,
    textAlign: "right",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default UserComponent;
