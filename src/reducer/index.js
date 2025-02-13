import { filterPedidos } from '../actions';
import {
  ADD_PRODUCT,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  POST_PRODUCT,
  RATE_PRODUCT,
  SEARCH_PRODUCT,
  SEARCH_LOCAL_PRODUCT,
  PAGAR_PEDIDO,
  GETTING_PRODUCTS,
  SET_PRODUCTS,
  SET_FILTERED_PRODUCTS,
  ORDER_PRODUCTS,
  GETTING_PRODUCT_DETAILS,
  SET_PRODUCT_DETAILS,
  SET_PRODUCT_DETAILS_FRONT,
  ADD_CART_ITEM,
  UPDATE_USER,
  DELETE_CART_ITEM,
  FLUSH_CART,
  ADD_PRODUCT_COMMENT,
  ADD_CATEGORY,
  SET_CATEGORIES,
  DELETE_CATEGORY,
  DELETE_PRODUCT_COMMENT,
  SET_USERS,
  DELETE_USER,
  GETTING_USERS,
  FILTER_PRODUCTS,
  FILTERING_PRODUCTS,
  FORCE_PASSWORD_RESET,
  GET_COMMENTS,
  GET_SALES,
  EDIT_SALE_STATUS,
  ORDER_PRECIO,
  SET_CART_ITEM,
  USERLOGIN,
  USERCREATE,
  FILTER_AUTO,

  ADD_REVIEW,


  USERLOGINOK,

  USERLOGOUT,
  
  DELIVERY_CART_ITEMS,
  ADD_ORDER_DATE,
  POST_PEDIDO,
  LOADING,
  GET_PEDIDOS,
  GET_PEDIDO_ID,
  SET_PLATFORM_USER,
  PUT_PEDIDO_STATE,
  FILTER_PEDIDO,
  PUT_CATEGORY,
  ACT_CART,
  ADD_PRESENTATION,
  PUT_PRESENTATION,
  SET_PRESENTATIONS,
  DELETE_PRESENTATION,
  GET_USER_BY_ID,
  GET_PORDUCT_PROMO,
  SET_PROMOCIONES,
  PUT_PROMOCION,
  ADD_PROMOCION,
  GET_WISHLIST
} from './../action-types/index';


const initialState = {
  //usuario actual
  user: { administrador: false, nombre: "Invitado", email: localStorage.mail, token: localStorage.token },
  userLogin: [],
  userAuthenticated: {},
  promos:[],
  gettingProducts: false,
  products: [],
  filteringProducts: false,
  filteredProducts: [],
  adminFilteredProducts: [],
  productDetails: { id: null },
  userDetail: {},//detalle de usuario para editar // admin
  cart: [],
  despacho: null,
  categories: [],//[{id:XXX,name:'sadasd'},...]
  presentations: [],
  userRegistred: [],
  pedido: {},
  pedidoId: {},
  pedidos: [],
  filterPedidos: [],
  idPago: {},
  productsAuto:[],
  productOnSale:[],
  sales: [],//lista de ventas
  users: [],//lista de usuarios para borrar / forzar password
  categoryFilterStatus: true,
  searchFilterStatus: true,
  loading: false,
};

//establece el valor inicial del carrito. Si el usuario estuvo cargando productos, quedaran en el localStorage
localStorage.getItem("cart")
  ? initialState.cart = JSON.parse(localStorage.getItem("cart"))


  : initialState.cart = [];


function rootReducer(state = initialState, action) {
  if (action.type === DELIVERY_CART_ITEMS) {
    return {
      ...state,
      despacho: action.payload
    };
  }

  if (action.type === ADD_ORDER_DATE) {
    return {
      ...state,
      despacho: { ...state.despacho, ...action.payload }


    };

  }

  if (action.type === SET_PROMOCIONES) {
    return {
      ...state,
      promos:action.payload
    }
  }

  if (action.type === PUT_PROMOCION) {
    
    let newPromos = state.promos.map(sP => {
      if (sP.id === action.payload.id) {
        return action.payload
      }
      return sP
    })
    
    return {
      ...state,
      promos:newPromos
    }
  }

  if (action.type === ADD_PROMOCION) {    
    return {
      ...state,
      promos:[action.payload,...state.promos]
    }
  }

  if (action.type === GET_PORDUCT_PROMO) {
    return {
      ...state,
      productOnSale: action.payload


    };

  }

  if (action.type === SET_PLATFORM_USER) {
    return {
      ...state,
      user: action.payload
    };
  }

  if (action.type === ADD_CART_ITEM) {
    return {
      ...state,
      cart: [...action.payload]
    };
  }

  if (action.type === FLUSH_CART) {
    return {
      ...state,
      cart: action.payload
    };
  }

  if (action.type === ACT_CART) {        
    return {
      ...state,
      cart: [...state.cart,...action.payload]
    };
  }

  if (action.type === POST_PEDIDO) {
    return {
      ...state,
      pedido: action.payload
    };
  }

  if (action.type === PAGAR_PEDIDO) {


    console.log(state.loading);
    return {
      ...state,
      idPago: action.payload,
      loading: false
    };
  }

  if (action.type === LOADING) {
    console.log(state.loading);
    return {
      ...state,
      loading: true
    };
  }

  if (action.type === SET_CART_ITEM) {
    return {
      ...state,
      cart: [...action.payload]
    };
  }

  if (action.type === DELETE_CART_ITEM) {
    return {
      ...state,
      cart: [...action.payload]
    };
  }

  if (action.type === ADD_REVIEW) {    
    let newProductDetails = { ...state.productDetails };
    newProductDetails.Reviews?.unshift(action.payload);
    return {
      ...state,
      productDetails: newProductDetails
    };
  }

  if (action.type === USERCREATE) {
    return {
      ...state,
      userRegistred: [action.payload]
    };
  }


  if (action.type === USERLOGINOK) {
    return {
      ...state,
      userAuthenticated: action.payload,
    };
  }
  if (action.type === USERLOGIN) {
    if (action.payload.userEmail) {
      return {
        ...state,
        userLogin: action.payload,
        user: action.payload.userEmail
      };
    }
    else {
      return {
        ...state,
        userLogin: action.payload
      };
    }

  }

  if (action.type === USERLOGOUT) {
    return {
      ...state,
      userAuthenticated: action.payload,
    };
  }

  if (action.type === ADD_PRODUCT) {
    //agrego el producto del arreglo una vez tenemos la confirmacion desde el back        
    return {
      ...state,
      products: [...state.products, action.payload],
      adminFilteredProducts: [action.payload, ...state.adminFilteredProducts]
    };
  }

  if (action.type === PUT_PRODUCT) {
    //agrego el producto del arreglo una vez tenemos la confirmacion desde el back 

    let newProducts = state.products.map(p => {
      if (p.id === action.payload.id) {

        return action.payload;
      }
      return p;
    });

    let filteredProducts = state.adminFilteredProducts.map(fp => {
      if (fp.id === action.payload.id) {
        return action.payload;

      }
      return fp;
    });
    return {
      ...state,
      products: newProducts,
      adminFilteredProducts: filteredProducts,
      filteredProducts: filteredProducts.filter(p => (p.stock > 0 && p.activo))
    };
  }

  if (action.type === SET_CATEGORIES) {
    //seteo categorias desde el back
    return {
      ...state,
      categories: action.payload
    };
  }

  if (action.type === PUT_CATEGORY) {
    //seteo categorias desde el back
    const updatedCategories = state.categories.map(c => {
      if (c.id === action.payload.id) {
        return action.payload;
      }
      return c;
    });  
    return {
      ...state,
      categories: updatedCategories
    };
  }

  if (action.type === SET_PRESENTATIONS) {
    //seteo categorias desde el back
    return {
      ...state,
      presentations: action.payload
    };
  }
  
  if (action.type === PUT_PRESENTATION) {
    //seteo categorias desde el back
    const updatedPresentations = state.presentations.map(p => {
      if (p.id === action.payload.id) {
        return action.payload;
      }
      return p;
    });  
    return {
      ...state,
      presentations: updatedPresentations
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

  if (action.type === SET_FILTERED_PRODUCTS) {
    return {
      ...state,
      filteredProducts: action.payload.filter(p => (p.stock > 0 && p.activo)),
      adminFilteredProducts: action.payload
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
        e.score = action.payload.score;
        return e;
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
      users: action.payload,
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

  if (action.type === UPDATE_USER) {
    return {
      ...state,
      users: state.users.filter(u => u.correo !== action.payload.correo).concat(action.payload)
    };
  }

  if (action.type === DELETE_USER) {
    return {
      ...state,
      users: state.users.filter(u => u.correo !== action.payload)
    };
  }


  if (action.type === ADD_CATEGORY) {
    //agrego categoria al arreglo una vez tenemos la confirmacion desde el back
    return {
      ...state,
      categories: [...state.categories, action.payload],
    };
  }

  if (action.type === ADD_PRESENTATION) {
    //agrego categoria al arreglo una vez tenemos la confirmacion desde el back
    return {
      ...state,
      presentations: [...state.presentations, action.payload],
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

  if (action.type === DELETE_PRESENTATION) {
    //agrego categoria al arreglo una vez tenemos la confirmacion desde el back
    const newPresentations = state.presentations.filter(
      (e) => e.id !== action.payload.id
    );
    return {
      ...state,
      categories: newPresentations,
    };
  }

  if (action.type === FILTER_PRODUCTS) {

    let filteredProducts = [...state.products];//.filter(e => e.stock > 0);

    let categoryStatus = false;
    if (action.payload.promo) {
      filteredProducts = filteredProducts.filter(e=>e.hasOwnProperty('promocion'))
    }
    if (action.payload.category !== "all") {
      filteredProducts = filteredProducts.filter(e => e.Categoria.find(i => parseInt(i.id) === parseInt(action.payload.category)));
      if (filteredProducts.length !== 0) {
        categoryStatus = true;
      }
    } else {
      categoryStatus = true;
    }
    if (action.payload.order === "A-Z") {
      filteredProducts = filteredProducts.sort(function (a, b) {
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
        if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) return -1;
        return 0;
      });
    } else if (action.payload.order === "Z-A") {
      filteredProducts = filteredProducts.sort(function (a, b) {
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return -1;
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
        return 0;
      });
    } else if (action.payload.order === "priceLower-Higher") {
      filteredProducts = filteredProducts.sort(function (a, b) {
        if (Number(a.precio) > Number(b.precio)) return 1;
        if (Number(b.precio) > Number(a.precio)) return -1;
        return 0;
      });
    } else if (action.payload.order === "priceHigher-Lower") {
      filteredProducts = filteredProducts.sort(function (a, b) {
        if (Number(a.precio) > Number(b.precio)) return -1;
        if (Number(b.precio) > Number(a.precio)) return 1;
        return 0;
      });
    }

    let searchStatus = false;
    if (action.payload.input.length > 0) {
      filteredProducts = filteredProducts.filter(p => p.nombre.toLowerCase().includes(action.payload.input.toLowerCase()));
      if (filteredProducts.length !== 0) {
        searchStatus = true;
      }
    } else {
      searchStatus = true;
    }

    let userProducts = filteredProducts.filter(e => (e.stock > 0 && e.activo)); 
    return {
      ...state,
      filteredProducts: userProducts,
      adminFilteredProducts: filteredProducts,
      categoryFilterStatus: categoryStatus,
      searchFilterStatus: searchStatus,
    };
    
  }

  if(action.type===FILTER_AUTO){
  
    let filteredProducts = [...state.products]
   let result = filteredProducts.filter(p=>p.nombre===action.payload)

   return {
     ...state,
     filteredProducts:result
   }

  }

  if (action.type === ORDER_PRODUCTS) {

    console.log(action.type);
    let sortArray = action.payload === "A-Z" ?

      state.products.sort(function (a, b) {

        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
        if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) return -1;
        return 0;
      }) :
      state.products.sort(function (a, b) {
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return -1;
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
        return 0;
      });

    return {
      ...state,
      products: sortArray,
    };

  }

  if (action.type === ORDER_PRECIO) {

    console.log(action.type);
    let sortArrayPrecio = action.payload === "priceLower-Higher" ?
      state.products.sort(function (a, b) {
        if (Number(a.precio) > Number(b.precio)) return 1;
        if (Number(b.precio) > Number(a.precio)) return -1;
        return 0;
      }) :

      state.products.sort(function (a, b) {
        if (Number(a.precio) > Number(b.precio)) return -1;
        if (Number(b.precio) > Number(a.precio)) return 1;
        return 0;
      });
    return {
      ...state,
      products: sortArrayPrecio
    };
  }

  if (action.type === SEARCH_PRODUCT) {
    const busqueda = action.payload.busq.data.filter(p => p.nombre.toLowerCase().includes(action.payload.producto.toLowerCase()));
    console.log(busqueda);
    return {
      ...state,
      products: busqueda
    };
  }

  if (action.type === GET_PEDIDOS) {
    return {
      ...state,
      pedidos: action.payload,
      filterPedidos: action.payload
    };
  }

  if (action.type === GET_PEDIDO_ID) {
    return {
      ...state,
      pedidoId: action.payload
    };
  }

  if (action.type === PUT_PEDIDO_STATE) {
    //agrego el producto del arreglo una vez tenemos la confirmacion desde el back 

    let newState = state.pedidos.map(p => {
      if (p.id === action.payload.id) {

        return action.payload;
      }
      return p;
    });

  }

  if (action.type === GET_USER_BY_ID) {
    return {
      ...state,
      userDetail: action.payload
    };
  }

  if (action.type === FILTER_PEDIDO) {
    let filtro;
    if (action.payload !== 'all') {
      filtro = state.filterPedidos.filter(p => p.status === action.payload)
    } else {
      filtro = state.filterPedidos
    }
    return {
      ...state,
      pedidos: filtro
    };
  }

  // if (action.type === GET_WISHLIST) {
  //   return {
  //     ...state,
  //     wishlist: action.payload
  //   };
  // }

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
