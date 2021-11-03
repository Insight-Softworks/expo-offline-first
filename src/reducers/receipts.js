const initialState = {
  receipts: [],
};

export default function reducer(state = initialState, action) {
  if (action.type === 'GET_RECEIPTS_COMMIT') {
    return {
      ...state,
      receipts: action.payload,
    };
  }

  if (action.type === 'CREATE_RECEIPT_COMMIT' || action.type === 'CREATE_RECEIPT_ROLLBACK') {
    return {
      ...state,
      receipts: [action.payload, ...state.receipts],
    };
  }

  return state;
}
