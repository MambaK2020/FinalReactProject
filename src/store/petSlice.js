import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  requeestCategoryAll,
  requeestCategoryById,
  requeestProductsAll,
  requeestProductById, // <-- правильная функция!
} from '../services/api'

// --- THUNKS --- //

export const fetchCategoriesAll = createAsyncThunk(
  'pet/categoriesAll',
  async (_, thunkApi) => {
    try {
      const categoriesAll = await requeestCategoryAll()
      return categoriesAll
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const fetchCategoryById = createAsyncThunk(
  'pet/categoryById',
  async (categoryId, thunkApi) => {
    try {
      const categoryById = await requeestCategoryById(categoryId)
      return categoryById
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const fetchProductsAll = createAsyncThunk(
  'pet/productsAll',
  async (_, thunkApi) => {
    try {
      const productsAll = await requeestProductsAll()
      return productsAll
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const fetchProductByAId = createAsyncThunk(
  'pet/productByAId',
  async (productId, thunkApi) => {
    try {
      const productById = await requeestProductById(productId)
      return productById
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)


// --- INITIAL STATE --- //

const INITIAL_STATE = {
  categories: {
    all: [],
    current: null,
    isLoading: false,
    error: null,
  },
  products: {
    all: [],
    byCategory: [],
    current: null,  // <-- фикс названия
    isLoading: false,
    error: null,
  },
}

// --- SLICE --- //

const petSlice = createSlice({
  name: 'pet',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      // --- CATEGORIES ALL --- //
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

      // --- CATEGORY BY ID --- //
      .addCase(fetchCategoryById.pending, (state) => {
        state.categories.isLoading = true
        state.products.isLoading = true
        state.categories.error = null
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.categories.isLoading = false
        state.products.isLoading = false
        state.categories.current = action.payload.category
        state.products.byCategory = state.products.all.filter(
          (product) =>
            product.categoryId === Number(action.payload.category.id)
        )
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.categories.isLoading = false
        state.products.isLoading = false
        state.categories.error = action.payload
      })

      // --- PRODUCTS ALL --- //
      .addCase(fetchProductsAll.pending, (state) => {
        state.products.isLoading = true
        state.products.error = null
      })
      .addCase(fetchProductsAll.fulfilled, (state, action) => {
        state.products.isLoading = false
        state.products.all = action.payload
      })
      .addCase(fetchProductsAll.rejected, (state, action) => {
        state.products.isLoading = false
        state.products.error = action.payload
      })

      // --- PRODUCT BY ID --- //
      .addCase(fetchProductByAId.pending, (state) => {
        state.products.isLoading = true
        state.products.error = null
      })
      .addCase(fetchProductByAId.fulfilled, (state, action) => {
        state.products.isLoading = false
        state.products.current = action.payload
      })
      .addCase(fetchProductByAId.rejected, (state, action) => {
        state.products.isLoading = false
        state.products.error = action.payload
      })
  },
})

export const petReducer = petSlice.reducer
