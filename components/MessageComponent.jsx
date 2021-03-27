import React from "react";
import { Layout, Text, Button, Card, Modal } from "@ui-kitten/components";

const MessageComponent = ({ message, visible, setVisible, setMessage }) => {
  return (
    <Layout style={{ padding: 20 }}>
      <Modal visible={visible}>
        <Card disabled={true}>
          <Text>{message}</Text>
          <Button
            style={{ marginTop: 12 }}
            onPress={() => {
              // console.log(visible);
              setVisible(false);
              setMessage(null);
            }}
          >
            Done
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
};

export default MessageComponent;
