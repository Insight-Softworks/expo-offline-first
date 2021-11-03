const getReceipts = () => ({
  type: 'GET_RECEIPTS_REQUEST',
  meta: {
    offline: {
      // the network action to execute:
      effect: {
        url: 'http://localhost:3000/api/receipts',
        method: 'GET',
      },
      // action to dispatch when effect succeeds:
      commit: {
        type: 'GET_RECEIPTS_COMMIT',
      },
      // action to dispatch if network action fails permanently:
      rollback: {
        type: 'GET_RECEIPTS_ROLLBACK',
      },
    },
  },
});

const createReceipt = ({ title, description, amount, createdAt }) => ({
  type: 'CREATE_RECEIPT_REQUEST',
  payload: {
    title,
    description,
    amount,
    createdAt,
  },
  meta: {
    offline: {
      // the network action to execute:
      effect: {
        url: 'http://localhost:3000/api/receipts',
        method: 'POST',
        json: { title, description, amount },
      },
      // action to dispatch when effect succeeds:
      commit: {
        type: 'CREATE_RECEIPT_COMMIT',
        meta: { title, description, amount, createdAt },
      },
      // action to dispatch if network action fails permanently:
      rollback: {
        type: 'CREATE_RECEIPT_ROLLBACK',
        meta: { title, description, amount, createdAt },
      },
    },
  },
});

export { getReceipts, createReceipt };
