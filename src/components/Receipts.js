import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Button } from 'react-native';
import useReceiptsStore from '../hooks/receiptsStore';

const Receipts = () => {
  const { getReceipts: receipts, getReceiptsRequest, createReceiptRequest } = useReceiptsStore();
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    getReceiptsRequest();
  }, []);

  const handleCreateReceipt = () => {
    createReceiptRequest({
      title: `Offline Receipt ${counter}`,
      description: 'Created Offline',
      amount: 500,
      createdAt: new Date().valueOf(),
    });
    setCounter(counter + 1);
  };

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
};

export default Receipts;
