import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GETTING_PRODUCTS, SET_PRODUCTS, GETTING_PRODUCT_DETAILS, SET_PRODUCT_DETAILS, ADD_CART_ITEM, ADD_PRODUCT_COMMENT, ADD_CATEGORY, DELETE_CART_ITEM, DELETE_CATEGORY, DELETE_PRODUCT_COMMENT, DELETE_USER, EDIT_SALE_STATUS, FILTERING_PRODUCTS, FILTER_PRODUCTS, FLUSH_CART, FORCE_PASSWORD_RESET, GETTING_USERS, GET_COMMENTS, GET_SALES, POST_PRODUCT, RATE_PRODUCT, SET_PRODUCT_DETAILS_FRONT, SET_USERS,ORDER_PRODUCTS,ORDER_PRECIO } from './../action-types/index';

const initialState = {
  user: [], //usuario actual usando la app
  gettingProducts: false,
  products: [],
  filteringProducts: false,  
  filteredProducts: [],
  productDetails: { id: null },
  cart: [],
  categories: [],//[{id:XXX,name:'sadasd'},...]

  sales: [],//lista de ventas
  users: [],//lista de usuarios para borrar / forzar password
};

function rootReducer(state = initialState, action) {

  if (action.type === ADD_PRODUCT) {
    //agrego el producto del arreglo una vez tenemos la confirmacion desde el back
    return {
      ...state,
      products: [...state.products, action.payload],
    };
  }

  if (action.type === DELETE_PRODUCT) {
    //borro el producto del arreglo una vez tenemos la confirmacion del back
    const newProducts = state.products.filter(
      (e) => e.id !== action.payload
    );
    return {
      ...state,
      products: newProducts,
    };
  }

  if (action.type === SET_PRODUCT_DETAILS_FRONT) {
    //selecciono producto del arreglo para mostrar los detalles
    const newProductDetail = state.products.find(
      (e) => e.id === action.payload
    ) || { id: null };
    return {
      ...state,
      productDetails: newProductDetail,
      gettingProductDetails: false

    };
  }

  if (action.type === EDIT_PRODUCT) {
    //edito el producto del arreglo una vez tenemos la confirmacion del back
    const newProducts = state.products.map((e) => {
      if (e.id === action.payload.id) {
        return action.payload;
      }
      return e;
    });
    return {
      ...state,
      products: newProducts,
    };
  }

  if (action.type === SET_PRODUCTS) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      products: action.payload,
      gettingProducts: false
    };
  } 

  if (action.type === GETTING_PRODUCTS) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      gettingProducts: action.payload
    };
  } 

  if (action.type === SET_PRODUCT_DETAILS) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      productDetails: action.payload,
      gettingProducts: false
    };
  } 

  if (action.type === GETTING_PRODUCT_DETAILS) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      gettingProductDetails: action.payload
    };
  } 

  if (action.type === RATE_PRODUCT) {
    //edito el score del producto del arreglo una vez tenemos la confirmacion del back
    const newProducts = state.products.map((e) => {
      if (e.id === action.payload.id) {
        e.score = action.payload.score
        return e
      }
      return e;
    });
    return {
      ...state,
      products: newProducts,
    };
  }

  if (action.type === SET_USERS) {
    //cargo el arreglo con todos los usuarios obtenidos
    return {
      ...state,
      allUsers: action.payload,
      gettingUsers: false
    };
  } 

  if (action.type === GETTING_USERS) {
    //cargo el arreglo con todos los productos obtenidos
    return {
      ...state,
      gettingUsers: action.payload
    };
  } 


  if (action.type === ADD_CATEGORY) {
    //agrego categoria al arreglo una vez tenemos la confirmacion desde el back
    return {
      ...state,
      categories: [...state.categories, action.payload],
    };
  }

  if (action.type === DELETE_CATEGORY) {
    //agrego categoria al arreglo una vez tenemos la confirmacion desde el back
    const newCategories = state.categories.filter(
      (e) => e.id !== action.payload.id
    );
    return {
      ...state,
      categories: newCategories,
    };
  }

  if(action.type===ORDER_PRODUCTS){
    console.log(action.type)
    let sortArray = action.payload ==="A-Z"?
    state.products.sort(function(a,b){
        {console.log(state.products)}
      if(a.nombre.toLowerCase()>b.nombre.toLowerCase()) return 1
      if(b.nombre.toLowerCase()>a.nombre.toLowerCase()) return -1
      return 0;
    }) :
    state.products.sort(function(a,b){
      if(a.nombre.toLowerCase()>b.nombre.toLowerCase()) return -1
      if(a.nombre.toLowerCase()>b.nombre.toLowerCase()) return  1
      return 0;
    })   
    return{
      ...state,
      products: sortArray,
    }

  }

  if(action.type===ORDER_PRECIO){
    console.log(action.type)
    let sortArrayPrecio = action.payload ==="priceLower-Higher"?
    state.products.sort(function(a,b){
      if(Number(a.precio)>Number(b.precio)) return 1
      if(Number(b.precio)>Number(a.precio)) return -1
      return 0;
    }) :
    
    state.products.sort(function(a,b){
      if(Number(a.precio)>Number(b.precio)) return -1
      if(Number(b.precio)>Number(a.precio)) return  1
      return 0;
    })   
    return{
      ...state,
      products: sortArrayPrecio
    }
  }


/*   if (action.type === "ORDER_BY_SCORE") {
    const orderedRecipes = orderByScore(
      [...state.filterResult],
      action.payload
    );

    return {
      ...state,
      filterResult: orderedRecipes,
    };
  } */

  /*if (action.type === "SET_RECIPES_AND_FILTER") {
    if (action.payload.filter.title.length) {
      //aplico filtro de título
      action.payload.recipes = action.payload.recipes.filter((r) =>
        r.title
          .toLowerCase()
          .includes(action.payload.filter.title.toLowerCase())
      );
    }
    if (action.payload.filter.dietsArr.length) {
      //aplico filtro de dietas
      action.payload.filter.dietsArr.forEach((diet) => {
        action.payload.recipes = action.payload.recipes.filter((r) =>
          r.diets.includes(diet.toLowerCase())
        );
      });
    }
    const orderedRecipes = orderByAlpha(
      action.payload.recipes,
      action.payload.filter
    );
    return {
      ...state,
      filterResult: orderedRecipes,
    };
  }

  if (action.type === "SET_DIET_TYPES") {
    if (
      !Object.keys(state.dietTypes).length &&
      Object.keys(action.payload).length
    ) {
      return {
        ...state,
        dietTypes: action.payload,
      };
    }
  }

  if (action.type === "SET_FILTERING_STATUS") {
    return {
      ...state,
      filtering: action.payload,
    };
  }

  if (action.type === "SET_RECIPE_DETAIL") {
    return {
      ...state,
      recipeDetail: action.payload, //action.payload
    };
  }*/

  return state;
}

export default rootReducer;
