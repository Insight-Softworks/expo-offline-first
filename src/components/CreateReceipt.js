import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReceipts, createReceipt } from '../actions/receipts';

function CreateReceipt(props) {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    props.onGetReceipts();
  }, []);

  const handleCreateReceipt = () => {
    props.onCreateReceipt({
      title: `Offline Receipt ${counter}`,
      description: 'Created Offline',
      amount: 500,
      createdAt: new Date().toString(),
    });
    setCounter(counter + 1);
  };

  const { receipts } = props;
  return (
    <ScrollView style={{ paddingVertical: 50 }}>
      <Button onPress={handleCreateReceipt} title="Create Receipt" />
      {receipts.map((receipt) => (
        <Text key={receipt?.id ?? receipt?.createdAt}>
          {JSON.stringify(receipt)}
          {'\n'}
          {'\n'}
        </Text>
      ))}
    </ScrollView>
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
      onGetReceipts: getReceipts,
      onCreateReceipt: createReceipt,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreateReceipt);
