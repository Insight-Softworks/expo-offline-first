import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createReceipt } from '../actions/receipts';

function CreateReceipt(props) {
  const handleCreateReceipt = () =>
    props.onCreateReceipt({
      title: 'Offline Receipt',
      description: 'Created Offline',
      amount: 500,
    });

  const { receipts } = props;

  return (
    <View>
      {receipts.map((receipt) => (
        <Text key={receipt?.id}>
          {JSON.stringify(receipt)}
          {'\n'}
          {'\n'}
        </Text>
      ))}
      <Button onPress={handleCreateReceipt} title="Create Receipt" />
    </View>
  );
}

const mapStateToProps = (state) => {
  const { receipts } = state.receipts;
  return {
    receipts,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onCreateReceipt: createReceipt,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreateReceipt);
