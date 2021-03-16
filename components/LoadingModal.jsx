import React from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, Modal } from '@ui-kitten/components';

const LoadingModal = ({loading}) => {
    return (
        <Modal 
            visible={loading}
            style={styles.modal}
            backdropStyle={styles.backdrop}
        >
            <Spinner size='giant' />
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        alignContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
})

export default LoadingModal;
