import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { db } from '../firebase'; // Импортируйте вашу конфигурацию Firebase
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
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

// Асинхронное действие для получения транзакций
export const fetchTransactions = createAsyncThunk<Transaction[]>(
  'finance/fetchTransactions',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'transactions'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Transaction[];
  }
);

// Асинхронное действие для добавления транзакции
export const addTransaction = createAsyncThunk<
  Transaction,
  Omit<Transaction, 'id'>
>('finance/addTransaction', async (transaction) => {
  const docRef = await addDoc(collection(db, 'transactions'), transaction);
  return { id: docRef.id, ...transaction };
});

// Асинхронное действие для удаления транзакции
export const deleteTransaction = createAsyncThunk<string, string>(
  'finance/deleteTransaction',
  async (id) => {
    await deleteDoc(doc(db, 'transactions', id));
    return id;
  }
);

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    editTransaction: (state, action: PayloadAction<Transaction>) => {
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
