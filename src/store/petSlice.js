import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  requeestCategoryAll,
  requeestCategoryById,
  requeestProductsAll,
  requeestProductById,
} from '../services/api.js'


export const fetchCategoriesAll = createAsyncThunk(
  'pet/categoriesAll',
  async (_, thunkApi) => {
    try {
      const categories = await requeestCategoryAll()
      return categories
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const fetchCategoryById = createAsyncThunk(
  'pet/categoryById',
  async (params, thunkApi) => {
    try {
      const data = await requeestCategoryById(params.categoryId, params)
      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const fetchProductsAll = createAsyncThunk(
  'pet/productsAll',
  async (params, thunkApi) => {
    try {
      const products = await requeestProductsAll(params)
      return products
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'pet/productById',
  async (productId, thunkApi) => {
    try {
      const product = await requeestProductById(productId)
      return product
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

// --- initial state ---
const INITIAL_STATE = {
  categories: {
    all: [],
    current: null,
    isLoading: false,
    error: null,
  },
  products: {
    all: [],
    categoryProducts: [],
    current: null,
    isLoading: false,
    allLoading: false,
    error: null,
  },
}

// --- slice ---
const petSlice = createSlice({
  name: 'pet',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CATEGORIES
      .addCase(fetchCategoriesAll.pending, (state) => {
        state.categories.isLoading = true
        state.categories.error = null
      })
      .addCase(fetchCategoriesAll.fulfilled, (state, action) => {
        state.categories.isLoading = false
        state.categories.all = action.payload
      })
      .addCase(fetchCategoriesAll.rejected, (state, action) => {
        state.categories.isLoading = false
        state.categories.error = action.payload
      })

      .addCase(fetchCategoryById.pending, (state) => {
        state.products.isLoading = true
        state.products.error = null
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.products.isLoading = false
        state.categories.current = action.payload.category
        state.products.categoryProducts = action.payload.products
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.products.isLoading = false
        state.products.error = action.payload
      })

      // PRODUCTS
      .addCase(fetchProductsAll.pending, (state) => {
        state.products.allLoading = true
        state.products.error = null
      })
      .addCase(fetchProductsAll.fulfilled, (state, action) => {
        state.products.allLoading = false
        state.products.all = action.payload
      })
      .addCase(fetchProductsAll.rejected, (state, action) => {
        state.products.allLoading = false
        state.products.error = action.payload
      })

      .addCase(fetchProductById.pending, (state) => {
        state.products.isLoading = true
        state.products.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.products.isLoading = false
        state.products.current = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.products.isLoading = false
        state.products.error = action.payload
      })
  },
})

export const petReducer = petSlice.reducer
