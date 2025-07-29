import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
} from 'firebase/firestore';
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}
interface FinanceState {
  transactions: Transaction[];
}

const initialState: FinanceState = {
  transactions: [],
};

export const fetchTransactions = createAsyncThunk(
  'finance/fetchTransactions',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'transactions'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Transaction[];
  }
);

export const addTransaction = createAsyncThunk(
  'finance/addTransaction',
  async (transaction: Omit<Transaction, 'id'>) => {
    const docRef = await addDoc(collection(db, 'transactions'), transaction);
    return { id: docRef.id, ...transaction };
  }
);

export const deleteTransaction = createAsyncThunk(
  'finance/deleteTransaction',
  async (id: string) => {
    await deleteDoc(doc(db, 'transactions', id));
    return id;
  }
);

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    editTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export const { editTransaction } = financeSlice.actions;
export default financeSlice.reducer;
