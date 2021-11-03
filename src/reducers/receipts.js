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

  if (action.type === 'CREATE_RECEIPT_REQUEST') {
    return {
      ...state,
      receipts: [action.payload, ...state.receipts],
    };
  }

  if (action.type === 'CREATE_RECEIPT_COMMIT') {
    return {
      ...state,
      receipts: state.receipts.map((receipt) =>
        receipt.createdAt === action.meta.createdAt ? action.payload : receipt
      ),
    };
  }

  if (action.type === 'CREATE_RECEIPT_ROLLBACK') {
    return {
      ...state,
      receipts: state.receipts.filter((receipt) => receipt.createdAt !== action.meta.createdAt),
    };
  }

  return state;
}
