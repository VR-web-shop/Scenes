import fetchApi from "./fetchApi.js";

import Material from "./apis/Material.js";
import MaterialTexture from "./apis/MaterialTexture.js";
import MaterialType from "./apis/MaterialType.js";
import Mesh from "./apis/Mesh.js";
import MeshMaterial from "./apis/MeshMaterial.js";
import Product from "./apis/Product.js";
import ProductEntity from "./apis/ProductEntity.js";
import ProductEntityState from "./apis/ProductEntityState.js";
import Scene from "./apis/Scene.js";
import SceneBackground from "./apis/SceneBackground.js";
import SceneBasket from "./apis/SceneBasket.js";
import SceneBasketState from "./apis/SceneBasketState.js";
import SceneCamera from "./apis/SceneCamera.js";
import SceneCharacter from "./apis/SceneCharacter.js";
import SceneCheckout from "./apis/SceneCheckout.js";
import SceneFloor from "./apis/SceneFloor.js";
import SceneLight from "./apis/SceneLight.js";
import SceneLightType from "./apis/SceneLightType.js";
import SceneProduct from "./apis/SceneProduct.js";
import SceneProductState from "./apis/SceneProductState.js";
import SceneStaticObject from "./apis/SceneStaticObject.js";
import Texture from "./apis/Texture.js";
import TextureType from "./apis/TextureType.js";
import Vector3D from "./apis/Vector3D.js";

/**
 * @function SDK
 * @description SDK initializer
 * @param {string} serverURL The server URL.
 * @param {object} options The options.
 * @param {string} options.authTokenKey The auth token key.
 * @param {string} options.apiPath The API path.
 * @param {string} options.apiVersion The API version.
 * @returns {void}
 */
const SDK = (serverURL= 'http://localhost:3003', options={}) => {
    fetchApi.setServerURL(serverURL);

    if (options.authTokenKey)
        fetchApi.setAuthTokenKey(options.authTokenKey);

    if (options.apiPath)
        fetchApi.setAPIPath(options.apiPath);

    if (options.apiVersion)
        fetchApi.setAPIVersion(options.apiVersion);

    return {
        Material,
        MaterialTexture,
        MaterialType,
        Mesh,
        MeshMaterial,
        Product,
        ProductEntity,
        ProductEntityState,
        Scene,
        SceneBackground,
        SceneBasket,
        SceneBasketState,
        SceneCamera,
        SceneCharacter,
        SceneCheckout,
        SceneFloor,
        SceneLight,
        SceneLightType,
        SceneProduct,
        SceneProductState,
        SceneStaticObject,
        Texture,
        TextureType,
        Vector3D,
    };
}
