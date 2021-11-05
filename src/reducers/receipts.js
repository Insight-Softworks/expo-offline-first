const initialState = [];

export default function reducer(state = initialState, action) {
  if (action.type === 'GET_RECEIPTS_COMMIT') {
    return action.payload;
  }

  if (action.type === 'CREATE_RECEIPT_REQUEST') {
    return [action.payload, ...state];
  }

  if (action.type === 'CREATE_RECEIPT_COMMIT') {
    return state.map((receipt) =>
      receipt.createdAt === action.meta.createdAt ? action.payload : receipt
    );
  }

  if (action.type === 'CREATE_RECEIPT_ROLLBACK') {
    return state.filter((receipt) => receipt.createdAt !== action.meta.createdAt);
  }

  return state;
}
