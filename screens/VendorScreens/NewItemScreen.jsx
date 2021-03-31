import React, { useState, useEffect } from "react";
import {
  Layout,
  Input,
  Text,
  Button,
  Card,
  Modal,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, Image, ScrollView } from "react-native";
import { getShopDetails } from "../../services/vendor";
import {
  postMyProduct,
  getCategories,
  getProductByID,
  updateProduct,
  deleteProduct
} from "../../services/products";

const NewItemScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  //   Selected categories of the product
  const [category, setCategory] = useState([]);
  const [weight, setWeight] = useState("");

  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState(null);

  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [vendor, setVendor] = useState(null);
  const [message, setMessage] = useState(null);

  //   List of ALL categories
  const [categories, setCategories] = useState([]);

  const { isUpdating, productId } = route.params;

  useEffect(() => {
    getShopDetails(setVendor);
  }, []);

  useEffect(() => {
    if (isUpdating) {
      const updateDetails = (product) => {
        const {
          imageUrl,
          title,
          description,
          category,
          price,
          weight,
          stock,
        } = product;
        setImage(imageUrl);
        setTitle(title);
        setDescription(description);
        setCategory(category);
        setPrice(price);
        setWeight(weight);
        setStock(stock);

        setDisabled(false);
      };

      getProductByID(productId, updateDetails);
    }
  }, []);

  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);

  const clearFields = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setImage(null);
    setStock("");
    setCategory([]);
    setBlob(null);
    setWeight("");
  };

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  useEffect(() => {
    if (
      title != "" &&
      description != "" &&
      price != "" &&
      image != null &&
      stock != "" &&
      category != [] &&
      // blob != null &&
      weight != ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [title, description, price, image, blob, stock, category]);

  return (
    <ScrollView style={styles.container}>
      <Layout style={styles.inner}>
        <PreviewComponent
          title={title}
          description={description}
          price={price}
          image={image}
          setImage={setImage}
          setBlob={setBlob}
        />
        <Layout styles={styles.field}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "NunitoSans-Bold",
              marginVertical: 4,
            }}
          >
            Product Title
          </Text>
          <Input
            onChangeText={(value) => setTitle(value)}
            placeholder="Set Product Title"
            value={title}
          />
        </Layout>
        <Layout styles={styles.field}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "NunitoSans-Bold",
              marginVertical: 4,
            }}
          >
            Description
          </Text>
          <Input
            multiline={true}
            textStyle={{ minHeight: 64 }}
            onChangeText={(value) => setDescription(value)}
            placeholder="Describe your product here"
            value={description}
          />
        </Layout>
        <Layout style={styles.field}>
          <Text
            category="label"
            style={{
              fontSize: 12,
              fontFamily: "NunitoSans-Bold",
              marginBottom: 4,
            }}
          >
            Categories
          </Text>
          <CategoryComponent
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
        </Layout>
        <Layout styles={styles.field}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "NunitoSans-Bold",
              marginVertical: 4,
            }}
          >
            Price
          </Text>
          <Input
            keyboardType="decimal-pad"
            onChangeText={(value) => setPrice(value)}
            accessoryLeft={() => (
              <Text style={{ fontFamily: "NunitoSans-Bold" }}>php</Text>
            )}
            value={price}
          />
        </Layout>
        <Layout styles={styles.field}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "NunitoSans-Bold",
              marginVertical: 4,
            }}
          >
            Weight
          </Text>
          <Input
            keyboardType="decimal-pad"
            onChangeText={(value) => setWeight(value)}
            accessoryLeft={() => (
              <Text style={{ fontFamily: "NunitoSans-Bold" }}>kg/pc</Text>
            )}
            placeholder="20"
            value={weight}
          />
        </Layout>
        <Layout styles={styles.field}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "NunitoSans-Bold",
              marginVertical: 4,
            }}
          >
            Stock Quantity
          </Text>
          <Input
            keyboardType="decimal-pad"
            onChangeText={(value) => setStock(value)}
            placeholder="10"
            accessoryLeft={() => (
              <Text style={{ fontFamily: "NunitoSans-Bold" }}>pc(s)</Text>
            )}
            value={stock}
          />
        </Layout>
        <Layout style={styles.field}>
          <Button
            disabled={disabled}
            onPress={() => {
              const productData = {
                title,
                category,
                description,
                price,
                stock,
                weight,
                vendor: vendor.id,
                vendorName: vendor.shop.name,
              };
              if (isUpdating) {
                updateProduct(
                  productId,
                  productData,
                  blob,
                  setMessage,
                  setVisible
                );
              } else {
                postMyProduct(productData, blob, setMessage, setVisible);
              }
              clearFields();
            }}
          >
            {isUpdating ? "Update" : "Add New"} Product
          </Button>
          {isUpdating && (
            <Button appearance="outline" style={{ marginTop: 12 }} onPress={
              () => {
                deleteProduct(productId, setMessage, setVisible);
              }
            }>
              Delete Product
            </Button>
          )}
        </Layout>
        <MessageComponent
          visible={visible}
          setVisible={setVisible}
          setMessage={setMessage}
          message={message}
        />
      </Layout>
    </ScrollView>
  );
};

const CategoryComponent = ({ category, setCategory, categories }) => {
  const [selectedIndex, setSelectedIndex] = useState([]);

  const groupDisplayValues = selectedIndex.map((index) => {
    return categories[index.row]["title"];
  });

  const selectedCategoryIds = selectedIndex.map((index) => {
    return categories[index.row]["id"];
  });

  const renderOption = ({ title }) => <SelectItem title={title} key={title} />;

  useEffect(() => {
    setCategory(selectedCategoryIds);
  }, [selectedIndex]);

  return (
    <Select
      style={styles.select}
      size="medium"
      placeholder="Add Categories"
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
      multiSelect={true}
      value={groupDisplayValues.join(", ")}
    >
      {categories.map(renderOption)}
    </Select>
  );
};

const MessageComponent = ({ message, visible, setVisible, setMessage }) => {
  return (
    <Modal visible={visible}>
      <Card disabled={true}>
        <Text>{message}</Text>
        <Button
          style={{ marginTop: 12 }}
          onPress={() => {
            console.log(visible);
            setVisible(false);
            setMessage(null);
          }}
        >
          Done
        </Button>
      </Card>
    </Modal>
  );
};

const PreviewComponent = ({ setImage, setBlob, image }) => {
  return (
    <Layout style={styles.field}>
      <Card>
        <Image
          source={{ uri: image }}
          style={{
            width: 250,
            height: 150,
            resizeMode: "contain",
            marginVertical: 10,
            alignSelf: "center",
            borderWidth: 1,
            borderColor: "#BDBDBD",
          }}
        />
        <ImagePickerComponent
          setImage={setImage}
          setBlob={setBlob}
          image={image}
        />
      </Card>
    </Layout>
  );
};

function ImagePickerComponent({ setImage, setBlob, image }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to add images");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      setBlob(blob);
    }
  };

  return (
    <Layout style={{ flex: 1, justifyContent: "center", marginVertical: 10 }}>
      <Button onPress={pickImage} size="small" appearance="outline">
        {image != null ? "Change Image" : "Set Feature Image"}
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  inner: {
    padding: 20,
  },
  field: {
    marginVertical: 10,
  },
});

export default NewItemScreen;
