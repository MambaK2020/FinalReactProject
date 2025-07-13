export const selectCategories = (state) => state.pet.categories.all || [];
export const selectCategoriesLoading = (state) => state.pet.categories.isLoading;
export const selectCategoriesError = (state) => state.pet.categories.error;
export const selectCurrentCategory = (state) => state.pet.categories.current;

export const selectProducts = (state) => state.pet.products.all || []; 
export const selectProductsLoading = (state) => state.pet.products.isLoading; 
export const selectProductByCategory = (state) => state.pet.products.byCategory || []; 
export const selectCurrentProduct = (state) => state.pet.products.current; 

export const selectAllProductsLoading = (state) => state.pet.products.allLoading; 



